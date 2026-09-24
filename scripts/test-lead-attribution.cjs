const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(path, dependencies = {}, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  vm.runInNewContext(code, { exports, require: id => dependencies[id] ?? require(id), URL, URLSearchParams, console, ...globals });
  return exports;
}
const core = load('app/lib/lead-attribution.ts');
const now = Date.now();
const touch = (query = '', referrer = '') => core.captureTouch('https://mouldingstl.com/services/crown-moulding' + query, referrer, now);

test('Google ad markers take precedence; paid Meta requires paid tagging', () => {
  for (const marker of ['gclid', 'gbraid', 'wbraid']) assert.equal(core.channel(touch(`?${marker}=test`)), 'Google Ads');
  assert.equal(core.channel(touch('?gclid=test&utm_source=facebook&utm_medium=cpc')), 'Google Ads');
  assert.equal(core.channel(touch('?utm_source=fb&utm_medium=paid_social')), 'Meta Ads');
  assert.equal(core.channel(touch('?fbclid=test')), 'Meta social (paid/organic unknown)');
  assert.equal(core.channel(touch('', 'https://l.facebook.com/')), 'Meta social (paid/organic unknown)');
});
test('Search referrers, own-site navigation, and missing referrers are distinguished', () => {
  assert.equal(core.channel(touch('', 'https://www.google.com/search?q=trim')), 'Organic search / SEO');
  assert.equal(core.channel(touch('', 'https://www.google.com.attacker.test/')), 'Referral');
  assert.equal(core.channel(touch('', 'https://mouldingstl.com/services')), 'Direct / unknown');
  assert.equal(core.channel(touch()), 'Direct / unknown');
});
test('Direct returns retain prior source; a new campaign updates last source, not first', () => {
  const first = core.advanceAttribution(null, touch('?utm_source=facebook&utm_medium=paid_social&utm_campaign=Rooms'));
  const direct = core.advanceAttribution(first, touch());
  assert.equal(core.summarizeAttribution(direct).leadSource, 'Meta Ads');
  const next = core.advanceAttribution(direct, touch('?gclid=example'));
  assert.equal(core.summarizeAttribution(next).leadSource, 'Google Ads');
  assert.equal(core.summarizeAttribution(next).firstSource, 'Meta Ads');
});
test('Expired, future, and malformed attribution cannot produce a stale ad claim', () => {
  const ad = touch('?gclid=example');
  assert.equal(core.normalizeAttribution({first:ad}, now + core.ATTRIBUTION_TTL + 1), null);
  assert.equal(core.normalizeAttribution({first:{...ad,capturedAt:now + 120000}}, now), null);
  assert.equal(core.summarizeAttribution({first:'invalid'}).leadSource, 'Direct / unknown');
  assert.equal(core.summarizeAttribution(null).leadSource, 'Direct / unknown');
});
test('Only bounded campaign fields, clean paths and referring hostnames are retained', () => {
  const data = core.advanceAttribution(null, touch('?gclid=SECRET&utm_campaign=' + 'A'.repeat(1000) + '&email=private@example.com', 'https://google.com/search?q=private'));
  const result = core.summarizeAttribution(data);
  assert.equal(result.campaign.length, 160);
  assert.equal(result.landingPage, '/services/crown-moulding');
  assert.equal(result.referringSite, 'google.com');
  assert.ok(!JSON.stringify(data).includes('SECRET'));
  assert.ok(!JSON.stringify(data).includes('private'));
});
test('Blocked or corrupt local storage does not block attribution or a form submission', () => {
  for (const storage of [{getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}}, {getItem(){return 'broken JSON'},setItem(){}}]) {
    const browser = load('app/lib/browser-attribution.ts', {'./lead-attribution':core}, {window:{location:{href:'https://mouldingstl.com/?gclid=test'},localStorage:storage},document:{referrer:''}});
    assert.equal(core.summarizeAttribution(browser.getLeadAttribution()).leadSource, 'Google Ads');
  }
});
test('Email preserves attribution and escaping; unconfirmed background storage sends a separate alert', async () => {
  for (const receipt of [{status:'success'}, {status:'error'}, null]) {
    const sent = [], pending = [];
    let posted;
    const delivery = load('app/lib/contact-delivery.ts', {'./lead-attribution':core}, {
      process:{env:{RESEND_API:'test',GOOGLE_SHEETS_WEBAPP_URL:'https://example.test'}}, AbortSignal,
      fetch:async (url,init)=>{
        if (url === 'https://api.resend.com/emails') {
          sent.push(JSON.parse(init.body)); return {ok:true,status:200,json:async()=>({id:'test'})};
        }
        posted=JSON.parse(init.body); return {ok:true,status:200,json:async()=>receipt};
      },
    });
    const route = load('app/api/contact/route.ts', {
      '../../lib/site-environment':{isPreview:false},
      '../../lib/lead-attribution':core,
      '../../lib/contact-delivery':delivery,
      'next/server':{after:callback=>pending.push(callback),NextResponse:{json:(body,init)=>({body,...init})}},
    });
    const attribution = core.advanceAttribution(null,touch('?utm_source=facebook&utm_medium=paid_social&utm_campaign=%3Cscript%3Ex%3C%2Fscript%3E'));
    const result = await route.POST({json:async()=>({name:'Test',email:'test@example.com',message:'Example',attribution})});
    assert.equal(result.status,200);
    assert.equal(posted,undefined);
    assert.equal(sent.length,1);
    await pending[0]();
    assert.equal(posted.leadSource,'Meta Ads');
    assert.equal(sent.length,receipt?.status==='success'?1:2);
    assert.ok(sent[0].subject.includes('[Meta Ads]'));
    assert.equal(sent.at(-1).subject.includes('[CHECK SHEETS]'),receipt?.status!=='success');
    assert.ok(sent[0].html.includes('&lt;script&gt;'));
    assert.ok(!sent[0].html.includes('<script>'));
  }
});
test('Apps Script writes only Web Forms, preserves original columns, escapes formulas and acknowledges errors', () => {
  let chosen, row, released = false;
  const context = {SpreadsheetApp:{getActiveSpreadsheet:()=>({getSheetByName:name=>{chosen=name;return {appendRow:value=>{row=value}}}})},
    LockService:{getScriptLock:()=>({waitLock(){},hasLock:()=>true,releaseLock(){released=true}})},
    ContentService:{MimeType:{JSON:'json'},createTextOutput:value=>({value,setMimeType(){return this}})}};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('integrations/google-apps-script/Code.gs','utf8'),context);
  const response = context.doPost({postData:{contents:JSON.stringify({name:'Test',email:'test@example.com',phone:'+13145550100',message:'Test',leadSource:'Meta Ads',campaign:'=IMPORTXML("bad")'})}});
  assert.equal(JSON.parse(response.value).status,'success');
  assert.equal(chosen,'Web Forms'); assert.equal(row.length,12); assert.equal(row[1],'Test');
  assert.equal(row[5],'Meta Ads'); assert.ok(row[6].startsWith("'=")); assert.ok(released);
  assert.equal(JSON.parse(context.doPost({postData:{contents:'invalid'}}).value).status,'error');
});
