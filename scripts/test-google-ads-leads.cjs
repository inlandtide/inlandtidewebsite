const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const ts = require('typescript');

const key = 'test-only-verification-key';
const payload = (overrides = {}) => ({
  lead_id: 'sample-lead-1', google_key: key, campaign_id: 24067738044, form_id: 123,
  lead_submit_time: '2026-09-11T20:15:00Z', future_property: { ignored: true },
  user_column_data: [
    { column_id: 'FULL_NAME', string_value: 'Sample Person' },
    { column_id: 'EMAIL', string_value: 'sample@example.com' },
    { column_id: 'PHONE_NUMBER', string_value: '+13145550123' },
    { column_id: 'CITY', string_value: 'Chesterfield' },
    { column_id: 'CUSTOM_QUESTION', column_name: 'Additional details about your project', string_value: 'Crown molding in two rooms' },
  ], ...overrides,
});

function receiver() {
  const rows = [];
  const props = { GOOGLE_ADS_LEAD_WEBHOOK_KEY: key };
  let failAppend = false;
  let failReceipt = false;
  let released = 0;
  const properties = {
    getProperty: name => props[name] || null,
    setProperty(name, value) { if (failReceipt) throw Error('receipt interrupted'); props[name] = value; },
    getProperties: () => ({ ...props }),
    deleteProperty: name => { delete props[name]; },
  };
  const sheet = {
    getLastRow: () => rows.length + 1,
    getRange(row, column) {
      assert.equal(column, 13);
      return {
        getValue: () => 'Google Ads Lead ID',
        createTextFinder(value) {
          assert.equal(row, 2);
          return { matchEntireCell() { return this; }, useRegularExpression() { return this; },
            findNext: () => rows.find(r => r[12] === value) || null };
        },
      };
    },
    appendRow(row) { if (failAppend) throw Error('storage unavailable'); rows.push(row); },
  };
  const context = {
    Date, console,
    LockService: { getScriptLock: () => ({ waitLock() {}, hasLock: () => true, releaseLock: () => { released++; } }) },
    SpreadsheetApp: { getActiveSpreadsheet: () => ({ getSheetByName(name) { assert.equal(name, 'Web Forms'); return sheet; } }), flush() {} },
    PropertiesService: { getScriptProperties: () => properties },
    Utilities: { DigestAlgorithm: { SHA_256: 'sha256' }, computeDigest: (algorithm, value) => crypto.createHash(algorithm).update(value).digest(), base64EncodeWebSafe: bytes => Buffer.from(bytes).toString('base64url') },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: value => ({ setMimeType: () => JSON.parse(value) }) },
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('integrations/google-apps-script/Code.gs', 'utf8'), context);
  return { rows, props, post: body => context.doPost({ postData: { contents: JSON.stringify(body) } }),
    failAppend: value => { failAppend = value; }, failReceipt: value => { failReceipt = value; }, released: () => released };
}

test('Native form maps contacts, city, custom answers, campaign and Google timestamp', () => {
  const r = receiver();
  assert.equal(r.post(payload()).status, 'success');
  const row = r.rows[0];
  assert.equal(row[0].toISOString(), '2026-09-11T20:15:00.000Z');
  assert.equal(row[1], 'Sample Person');
  assert.equal(row[2], 'sample@example.com');
  assert.equal(row[3], "'+13145550123");
  assert.match(row[4], /Chesterfield/);
  assert.match(row[4], /Additional details about your project: Crown molding in two rooms/);
  assert.equal(row[5], 'Google Ads Lead Form');
  assert.equal(row[6], 'Campaign #1 (Performance Max)');
  assert.equal(row[7], 'google / cpc');
  assert.equal(row[9], '');
  assert.equal(row[12], 'sample-lead-1');
  assert.ok(!JSON.stringify(row).includes(key));
  assert.equal(r.released(), 1);
});

test('Retries deduplicate; manually deleted rows remain protected by receipt ledger', () => {
  const r = receiver();
  r.post(payload());
  assert.equal(r.post(payload()).duplicate, true);
  assert.equal(r.rows.length, 1);
  r.rows.length = 0;
  assert.equal(r.post(payload()).duplicate, true);
  assert.equal(r.rows.length, 0);
});

test('Interrupted receipt and failed appends do not lose or duplicate a lead', () => {
  const r = receiver();
  r.failAppend(true);
  assert.equal(r.post(payload()).status, 'error');
  assert.equal(r.rows.length, 0);
  r.failAppend(false);
  r.failReceipt(true);
  assert.equal(r.post(payload()).status, 'error');
  assert.equal(r.rows.length, 1);
  r.failReceipt(false);
  assert.equal(r.post(payload()).duplicate, true);
  assert.equal(r.rows.length, 1);
});

test('Wrong keys, missing IDs, malformed fields and test flags never append', () => {
  const r = receiver();
  for (const patch of [{ google_key: 'wrong' }, { lead_id: '' }, { user_column_data: null }, { is_test: 'true' }]) {
    assert.equal(r.post(payload(patch)).status, 'error');
  }
  assert.equal(r.rows.length, 0);
});

test('Test leads are explicit, separate from real leads, and tolerate phone-only forms', () => {
  const r = receiver();
  r.post(payload({ is_test: true, lead_submit_time: 'invalid', campaign_id: 987654,
    user_column_data: [{ column_id: 'PHONE_NUMBER', string_value: '+13145550123' }] }));
  assert.match(r.rows[0][1], /^\[TEST\]/);
  assert.equal(r.rows[0][2], '');
  assert.match(r.rows[0][5], /^TEST/);
  assert.equal(r.rows[0][6], '987654');
  assert.match(r.rows[0][11], /webhook receipt time/);
  assert.equal(r.rows[0][12], 'TEST:sample-lead-1');
  r.post(payload());
  assert.equal(r.rows.length, 2);
});

test('Old website payload stays compatible and formula-like fields remain text', () => {
  const r = receiver();
  assert.equal(r.post({ name: '=1+1', email: 'sample@example.com', message: '@danger' }).status, 'success');
  assert.equal(r.rows[0].length, 12);
  assert.equal(r.rows[0][1], "'=1+1");
  assert.equal(r.rows[0][4], "'@danger");
  assert.equal(r.rows[0][5], 'Direct / unknown');
});

function route(fetch, env = { GOOGLE_ADS_LEAD_WEBHOOK_KEY: key, GOOGLE_SHEETS_WEBAPP_URL: 'https://example.test/receiver' }) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync('app/api/google-ads-leads/route.ts', 'utf8'),
    { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  vm.runInNewContext(code, { exports, require: id => id === 'next/server' ? { NextResponse: { json: (body, init) => ({ body, status: init?.status || 200 }) } } : require(id),
    Buffer, AbortSignal, process: { env }, fetch });
  return exports.POST;
}
const request = body => ({ text: async () => JSON.stringify(body) });

test('HTTP handler refuses invalid or unauthenticated requests before forwarding', async () => {
  let calls = 0;
  const post = route(async () => { calls++; });
  assert.equal((await post(request(payload({ google_key: 'wrong' })))).status, 401);
  assert.equal((await post(request(payload({ lead_id: '' })))).status, 400);
  assert.equal((await post({ text: async () => '{' })).status, 400);
  assert.equal((await post({ text: async () => 'a'.repeat(100001) })).status, 413);
  assert.equal((await route(async () => {}, {})(request(payload()))).status, 503);
  assert.equal(calls, 0);
});

test('Google receives 200 only for confirmed native saves/duplicates; storage errors stay retryable', async () => {
  for (const receipt of [null, { status: 'error' }, { status: 'success' }, { status: 'success', integration: 'google_ads_lead_forms_v1' }]) {
    const post = route(async () => ({ ok: true, json: async () => receipt }));
    assert.equal((await post(request(payload()))).status, receipt?.integration ? 200 : 502);
  }
  const failed = route(async () => { throw Error('timeout'); });
  assert.equal((await failed(request(payload()))).status, 503);
  const html = route(async () => ({ ok: true, json: async () => { throw Error('HTML response'); } }));
  assert.equal((await html(request(payload()))).status, 502);
});

test('HTTP receiver and Apps Script integration save once across a repeated delivery', async () => {
  const r = receiver();
  const post = route(async (_url, init) => ({ ok: true, json: async () => r.post(JSON.parse(init.body)) }));
  assert.equal((await post(request(payload()))).status, 200);
  assert.equal((await post(request(payload()))).status, 200);
  assert.equal(r.rows.length, 1);
});
