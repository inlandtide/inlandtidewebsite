const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
function setup(){
  let next=0;const sheets={};
  function sheet(name,headerRows=5){
    const rows=Array.from({length:headerRows},()=>Array(28).fill(''));
    const sh={rows,getName:()=>name,getLastRow:()=>rows.length,getMaxRows:()=>1000,insertRowsAfter(){},setRowHeight(){},deleteRow(r){rows.splice(r-1,1);},appendRow(v){rows.push(v.slice());},
      getRange(r,c,n=1,w=1){return {getValues:()=>Array.from({length:n},(_,i)=>Array.from({length:w},(_,j)=>rows[r+i-1]?.[c+j-1]??'')),getValue:()=>rows[r-1]?.[c-1]??'',
        setValues(v){v.forEach((a,i)=>a.forEach((x,j)=>{rows[r+i-1]??=Array(28).fill('');rows[r+i-1][c+j-1]=x;}));return this;},setValue(v){return this.setValues([[v]]);},setFormula(v){return this.setValue(v);},setNumberFormat(){return this;},setDataValidation(){return this;}};}};
    sheets[name]=sh;return sh;
  }
  ['Lead Tracking','Closed Won','Closed Lost'].forEach(n=>sheet(n));sheet('Web Forms',1);sheet('Activity',1);
  const builder={requireValueInList(){return this;},setAllowInvalid(){return this;},requireCheckbox(){return this;},build(){return {};}};
  const context={Date,console,PropertiesService:{getScriptProperties:()=>({getProperty:()=> 'v1'})},LockService:{getScriptLock:()=>({waitLock(){},releaseLock(){}})},Utilities:{getUuid:()=>String(++next),formatDate:d=>d.toISOString().slice(0,10),parseDate:s=>new Date(s+'T12:00:00Z')},SpreadsheetApp:{flush(){},newDataValidation:()=>builder,getActiveSpreadsheet:()=>({getSheetByName:n=>sheets[n],getSpreadsheetTimeZone:()=> 'America/Chicago'})}};
  vm.createContext(context);vm.runInContext(fs.readFileSync('integrations/google-apps-script/Code.gs','utf8'),context);vm.runInContext(fs.readFileSync('integrations/google-apps-script/CRM.gs','utf8'),context);
  return {c:context,sheets};
}
const intake=()=>[new Date('2026-09-13'),'Example Client','sample@example.com','+13145550123','Project type: Crown moulding\n\nProject location: Kirkwood','Google Ads Lead Form','Campaign #1'];
test('Intake IDs survive repeats and the raw archive remains intact through all stage moves',()=>{
  const {c,sheets:s}=setup();const original=intake();s['Web Forms'].appendRow(original);const known={};
  assert.equal(c.crmImportRow_(s['Web Forms'],2,known),true);assert.equal(c.crmImportRow_(s['Web Forms'],2,known),false);
  const id=s['Web Forms'].rows[1][13];assert.equal(c.crmFind_(id).values[12],'Kirkwood');
  for(const stage of ['Closed Won','Closed Lost','Follow-up']){const r=c.crmFind_(id);r.values[1]=stage;c.crmWrite_(r.sheet,r.row,r.values);c.crmMove_(r);assert.equal(c.crmFind_(id).sheet.getName(),c.crmDestination_(stage));assert.equal(c.crmRows_().length,1);assert.deepEqual(s['Web Forms'].rows[1].slice(0,7),original);}
  assert.equal(c.crmFind_(id).values[19],'');
});
test('Test and spam submissions never enter the real CRM',()=>{const {c,sheets:s}=setup();for(const mutate of [v=>v[1]='[TEST] Name',v=>v[5]='TEST - Google Ads Lead Form',v=>v[12]='TEST:123',v=>v[14]='Spam']){const v=intake();mutate(v);s['Web Forms'].appendRow(v);assert.equal(c.crmImportRow_(s['Web Forms'],s['Web Forms'].getLastRow(),{}),false);}assert.equal(c.crmRows_().length,0);});
test('A new inquiry from an existing email is a distinct opportunity',()=>{const {c,sheets:s}=setup();const known={};for(let i=0;i<2;i++){s['Web Forms'].appendRow(intake());c.crmImportRow_(s['Web Forms'],i+2,known);}assert.equal(c.crmRows_().length,2);assert.notEqual(c.crmRows_()[0].values[25],c.crmRows_()[1].values[25]);});
test('Lead card rejects stale saves, preserves blanks, and does not execute form text',()=>{
  const {c}=setup();const r=c.crmSaveCard({fields:{0:'Example',1:'New',2:'Tim',6:'',7:'2500',8:'0',14:'=IMPORTXML("https://example.com")'}});
  assert.equal(c.crmFind_(r.id).values[6],'');assert.equal(c.crmFind_(r.id).values[7],2500);assert.equal(c.crmFind_(r.id).values[8],0);assert.match(c.crmFind_(r.id).values[14],/^'=/);
  assert.throws(()=>c.crmSaveCard({id:r.id,revision:0,fields:{0:'Overwrite'}}),/Someone edited/);
  assert.throws(()=>c.crmSaveCard({id:r.id,revision:r.revision,fields:{6:'-1'}}),/Money fields/);
  assert.equal(c.crmFind_(r.id).values[0],'Example');
});
test('Won and lost records stay closed on intake reconciliation',()=>{const {c,sheets:s}=setup();const known={};s['Web Forms'].appendRow(intake());c.crmImportRow_(s['Web Forms'],2,known);const id=s['Web Forms'].rows[1][13];const r=c.crmFind_(id);r.values[1]='Closed Won';c.crmWrite_(r.sheet,r.row,r.values);c.crmMove_(r);c.crmSyncSilent_();assert.equal(c.crmFind_(id).sheet.getName(),'Closed Won');assert.equal(c.crmRows_().length,1);});
test('Lead-card HTML uses textContent for data and parses separately from Apps Script',()=>{const {c}=setup();const html=c.crmCardHtml_();new vm.Script(html.match(/<script>([\s\S]*)<\/script>/)[1]);assert.ok(!html.includes('innerHTML'));assert.ok(html.includes('textContent=r.values[26]'));});
