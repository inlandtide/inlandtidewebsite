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
function setup({email = async()=>true, crm = async()=>true} = {}) {
  const pending = [], calls = [];
  const route = load('app/api/contact/route.ts', {
    '../../lib/lead-attribution':core,
    '../../lib/contact-delivery':{
      sendNotification: async(...args)=>{calls.push(['email',...args]);return email(...args)},
      saveToCRM: async(...args)=>{calls.push(['crm',...args]);return crm(...args)},
    },
    'next/server':{after:fn=>pending.push(fn),NextResponse:{json:(body,init)=>({body,...init})}},
  });
  return {...route,pending,calls,submit:(body=valid)=>route.POST({json:async()=>body})};
}

test('Success waits for email acceptance, then returns before any CRM work', async()=>{
  const email = deferred(), crm = deferred();
  const app = setup({email:()=>email.promise,crm:()=>crm.promise});
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
  assert.deepEqual(app.calls.map(x=>x[0]),['email','crm']);
  crm.resolve(true);
  await background;
  assert.equal(app.calls.length,2);
});

test('A missing crm receipt alerts the team without undoing success or blindly appending twice', async()=>{
  const app = setup({crm:async()=>false});
  assert.equal((await app.submit()).status,200);
  await app.pending[0]();
  assert.deepEqual(app.calls.map(x=>x[0]),['email','crm','email']);
  assert.equal(app.calls[2][3],true);
  assert.equal(app.calls[0][2],app.calls[2][2]);
});

test('An email outage waits for a confirmed CRM fallback and retries notification with the same reference', async()=>{
  const crm = deferred();
  const app = setup({email:async()=>false,crm:()=>crm.promise});
  let returned = false;
  const request=app.submit().then(r=>{returned=true;return r});
  await new Promise(r=>setImmediate(r));
  assert.equal(returned,false);
  crm.resolve(true);
  assert.equal((await request).status,200);
  await app.pending[0]();
  assert.deepEqual(app.calls.map(x=>x[0]),['email','crm','email']);
  assert.equal(app.calls[0][2],app.calls[2][2]);
});

test('Never report success when both delivery destinations fail', async()=>{
  const app=setup({email:async()=>false,crm:async()=>false});
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

function deliveryWith(fetch, env={RESEND_API:'test',CRM_INGEST_SECRET:'mock-crm-key'}) {
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

test('Direct CRM delivery keeps a stable ID and requires an explicit committed receipt',async()=>{
  let sent;
  const d=deliveryWith(async(url,init)=>{sent={url,...init};return {ok:true,status:200,json:async()=>({status:'success',integration:'crm_intake_v1',id:'crm-record'})}});
  assert.equal(await d.saveToCRM(lead,'ref'),true);
  assert.equal(sent.url,'https://crm.ckcwoodworks.com/api/intake/website_msl');
  assert.equal(sent.headers['x-crm-key'],'mock-crm-key');
  const payload=JSON.parse(sent.body);
  assert.equal(payload.externalId,'ref');assert.equal(payload.name,valid.name);
  assert.equal(payload.sourceLabel,'Direct / unknown');assert.deepEqual(d.timeouts,[8000]);
});

test('A lost CRM acknowledgement retries the exact same ID/content; permanent errors stop immediately',async()=>{
  const sent=[];
  const d=deliveryWith(async(url,init)=>{sent.push(init);if(sent.length===1)throw Error('response lost');return {ok:true,status:200,json:async()=>({status:'success',integration:'crm_intake_v1',id:'saved-once'})}});
  assert.equal(await d.saveToCRM(lead,'ref'),true);
  assert.equal(sent.length,2);assert.equal(sent[0].body,sent[1].body);
  let calls=0;const bad=deliveryWith(async()=>{calls++;return {ok:false,status:401,json:async()=>({})}});
  assert.equal(await bad.saveToCRM(lead,'ref'),false);assert.equal(calls,1);
});

test('Missing config, rejected receipts, malformed bodies and timeouts are safe failures', async()=>{
  const noConfig=deliveryWith(async()=>{throw Error('must not fetch')},{});
  assert.equal(await noConfig.sendNotification(lead,'ref'),false);
  assert.equal(await noConfig.saveToCRM(lead,'ref'),false);
  for (const fetch of [
    async()=>{throw Error('AbortError')},
    async()=>({ok:false,status:500,json:async()=>({id:'not-accepted',status:'success'})}),
    async()=>({ok:true,status:200,json:async()=>{throw Error('HTML login response')}}),
    async()=>({ok:true,status:200,json:async()=>({})}),
  ]) {
    const d=deliveryWith(fetch);
    assert.equal(await d.sendNotification(lead,'ref'),false);
    assert.equal(await d.saveToCRM(lead,'ref'),false);
  }
});
