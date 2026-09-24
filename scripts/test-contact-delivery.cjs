const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(path, dependencies = {}, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  vm.runInNewContext(code, { exports, require: id => dependencies[id] ?? require(id), URL, URLSearchParams, console: {info(){},error(){}}, ...globals });
  return exports;
}
const core = load('app/lib/lead-attribution.ts');
const valid = {name:'Test <Lead>',email:'test@example.com',phone:'+13145550100',message:'<b>Example inquiry</b>'};
const deferred = () => { let resolve; const promise = new Promise(r=>{resolve=r}); return {promise,resolve}; };
function setup({email = async()=>true, sheet = async()=>true, preview = false} = {}) {
  const pending = [], calls = [];
  const route = load('app/api/contact/route.ts', {
    '../../lib/site-environment':{isPreview:preview},
    '../../lib/lead-attribution':core,
    '../../lib/contact-delivery':{
      sendNotification: async(...args)=>{calls.push(['email',...args]);return email(...args)},
      saveToSheets: async(...args)=>{calls.push(['sheet',...args]);return sheet(...args)},
    },
    'next/server':{after:fn=>pending.push(fn),NextResponse:{json:(body,init)=>({body,...init})}},
  });
  return {...route,pending,calls,submit:(body=valid)=>route.POST({json:async()=>body})};
}

test('Preview validates the form but never sends email, appends Sheets, or schedules work', async()=>{
  const app = setup({preview:true});
  const result = await app.submit();
  assert.equal(result.status,200);
  assert.equal(result.body.preview,true);
  assert.equal(app.calls.length,0);
  assert.equal(app.pending.length,0);
  assert.equal((await app.submit({...valid,email:'bad'})).status,400);
});

test('Success waits for email acceptance, then returns before any spreadsheet work', async()=>{
  const email = deferred(), sheet = deferred();
  const app = setup({email:()=>email.promise,sheet:()=>sheet.promise});
  let returned = false;
  const request = app.submit().then(r=>{returned=true;return r});
  await new Promise(r=>setImmediate(r));
  assert.equal(returned,false);
  assert.deepEqual(app.calls.map(x=>x[0]),['email']);
  email.resolve(true);
  const response = await request;
  assert.equal(response.status,200);
  assert.equal(response.body.success,true);
  assert.deepEqual(app.calls.map(x=>x[0]),['email']);
  assert.equal(app.pending.length,1);
  const background = app.pending[0]();
  assert.deepEqual(app.calls.map(x=>x[0]),['email','sheet']);
  sheet.resolve(true);
  await background;
  assert.equal(app.calls.length,2);
});

test('A missing sheet receipt alerts the team without undoing success or blindly appending twice', async()=>{
  const app = setup({sheet:async()=>false});
  assert.equal((await app.submit()).status,200);
  await app.pending[0]();
  assert.deepEqual(app.calls.map(x=>x[0]),['email','sheet','email']);
  assert.equal(app.calls[2][3],true);
  assert.equal(app.calls[0][2],app.calls[2][2]);
});

test('An email outage waits for a confirmed Sheets fallback and retries notification with the same reference', async()=>{
  const sheet = deferred();
  const app = setup({email:async()=>false,sheet:()=>sheet.promise});
  let returned = false;
  const request=app.submit().then(r=>{returned=true;return r});
  await new Promise(r=>setImmediate(r));
  assert.equal(returned,false);
  sheet.resolve(true);
  assert.equal((await request).status,200);
  await app.pending[0]();
  assert.deepEqual(app.calls.map(x=>x[0]),['email','sheet','email']);
  assert.equal(app.calls[0][2],app.calls[2][2]);
});

test('Never report success when both delivery destinations fail', async()=>{
  const app=setup({email:async()=>false,sheet:async()=>false});
  const response=await app.submit();
  assert.equal(response.status,503);
  assert.equal(response.body.success,undefined);
  assert.equal(app.pending.length,0);
  assert.ok(response.body.error.includes('(314) 818-0815'));
});

test('Invalid JSON, wrong types, blank or oversize values never send a lead', async()=>{
  const app=setup();
  for(const body of [null,[],{}, {...valid,name:' '},{...valid,email:'invalid'},{...valid,phone:{}},{...valid,message:'a'.repeat(10001)}]) {
    assert.equal((await app.submit(body)).status,400);
  }
  assert.equal((await app.POST({json:async()=>{throw Error('bad JSON')}})).status,400);
  assert.equal(app.calls.length,0);
});

function deliveryWith(fetch, env={RESEND_API:'test',GOOGLE_SHEETS_WEBAPP_URL:'https://sheets.example.test'}) {
  const timeouts=[];
  const delivery=load('app/lib/contact-delivery.ts', {'./lead-attribution':core}, {
    fetch,process:{env},AbortSignal:{timeout:ms=>{timeouts.push(ms);return AbortSignal.timeout(ms)}},
  });
  return {...delivery,timeouts};
}
const lead={...valid,attribution:core.summarizeAttribution(null)};
test('Resend request preserves recipients/reply-to, escapes lead fields and separates alert idempotency', async()=>{
  const sent=[];
  const d=deliveryWith(async(url,init)=>{sent.push({url,...init});return {ok:true,status:200,json:async()=>({id:'receipt'})}});
  assert.equal(await d.sendNotification(lead,'ref1'),true);
  assert.equal(await d.sendNotification(lead,'ref1'),true);
  assert.equal(await d.sendNotification(lead,'ref1',true),true);
  const payload=JSON.parse(sent[0].body);
  assert.deepEqual(payload.to,['tim@inlandtide.com','ryan@inlandtide.com']);
  assert.equal(payload.reply_to,valid.email);
  assert.ok(payload.html.includes('&lt;b&gt;Example inquiry&lt;/b&gt;'));
  assert.ok(payload.html.includes('Reference: ref1'));
  assert.equal(sent[0].headers['Idempotency-Key'],sent[1].headers['Idempotency-Key']);
  assert.notEqual(sent[0].headers['Idempotency-Key'],sent[2].headers['Idempotency-Key']);
  assert.deepEqual(d.timeouts,[10000,10000,10000]);
});

test('Storage uses existing flat payload and accepts only an explicit success receipt', async()=>{
  for (const receipt of [{status:'success'},{status:'error'},null]) {
    let sent;
    const d=deliveryWith(async(url,init)=>{sent={url,...init};return {ok:true,status:200,json:async()=>receipt}});
    assert.equal(await d.saveToSheets(lead,'ref'),receipt?.status==='success');
    assert.equal(sent.url,'https://sheets.example.test');
    const payload=JSON.parse(sent.body);
    assert.equal(payload.name,valid.name);
    assert.equal(payload.leadSource,'Direct / unknown');
    assert.deepEqual(d.timeouts,[20000]);
  }
});

test('Missing config, rejected receipts, malformed bodies and timeouts are safe failures', async()=>{
  const noConfig=deliveryWith(async()=>{throw Error('must not fetch')},{});
  assert.equal(await noConfig.sendNotification(lead,'ref'),false);
  assert.equal(await noConfig.saveToSheets(lead,'ref'),false);
  for (const fetch of [
    async()=>{throw Error('AbortError')},
    async()=>({ok:false,status:500,json:async()=>({id:'not-accepted',status:'success'})}),
    async()=>({ok:true,status:200,json:async()=>{throw Error('HTML login response')}}),
    async()=>({ok:true,status:200,json:async()=>({})}),
  ]) {
    const d=deliveryWith(fetch);
    assert.equal(await d.sendNotification(lead,'ref'),false);
    assert.equal(await d.saveToSheets(lead,'ref'),false);
  }
});
