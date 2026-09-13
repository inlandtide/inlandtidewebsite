// Private, spreadsheet-bound CRM. Never expose these methods from doGet/doPost.
var CRM = {
  sheets: ['Lead Tracking', 'Closed Won', 'Closed Lost'], first: 6, width: 28,
  stages: ['New', 'Needs review', 'Contacted', 'Consultation booked', 'Proposal sent', 'Follow-up', 'On hold', 'Closed Won', 'Closed Lost'],
  owners: ['Unassigned', 'Tim', 'Ryan'],
  losses: ['Price', 'Timing', 'No response', 'Went another direction', 'Outside service area', 'Spam / invalid', 'Other'],
  fields: ['Client','Stage','Owner','Next action','Follow-up date','Attention','Proposal amount','Contract value','Collected revenue','Balance remaining','Phone','Email','Location / address','Project type','Notes','Consultation date','Proposal sent date','Deposit received','Install complete','Closed date','Lost reason','Lead source','Campaign','Lead received','Updated','Lead ID','Original inquiry','Revision']
};
function crmReady_() { return PropertiesService.getScriptProperties().getProperty('CRM_READY') === 'v1'; }
function crmBook_() { return SpreadsheetApp.getActiveSpreadsheet(); }
function crmLock_(fn) {
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try { return fn(); } finally { lock.releaseLock(); }
}
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Moulding CRM')
    .addItem('Open lead card', 'crmOpenCard').addItem('Add a lead', 'crmNewCard')
    .addSeparator().addItem('Sync intake & reconcile stages', 'crmSync')
    .addItem('Open dashboard', 'crmDashboard').addToUi();
  if (crmReady_()) { try { crmSyncSilent_(); } catch (err) { console.error('CRM open sync: ' + err.message); } }
}
function crmDashboard() { crmBook_().setActiveSheet(crmBook_().getSheetByName('Dashboard')); }
function crmId_() { return 'ML-' + Utilities.getUuid(); }
function crmDestination_(stage) { return stage === 'Closed Won' || stage === 'Closed Lost' ? stage : 'Lead Tracking'; }
function crmRows_() {
  var all = [];
  CRM.sheets.forEach(function(name) {
    var sh = crmBook_().getSheetByName(name), count = sh.getLastRow() - CRM.first + 1;
    if (count > 0) sh.getRange(CRM.first, 1, count, CRM.width).getValues().forEach(function(v, i) {
      if (v[0] || v[25]) all.push({sheet:sh, row:i+CRM.first, values:v});
    });
  }); return all;
}
function crmFind_(id) {
  var matches = crmRows_().filter(function(r) { return r.values[25] === id; });
  if (matches.length > 1) throw new Error('Duplicate lead ID found. Use Sync intake & reconcile stages, then reload.');
  return matches[0] || null;
}
function crmFormula_(sheet, row) {
  sheet.getRange(row,6).setFormula('=IF(A'+row+'="","",IF(B'+row+'="Closed Lost","Closed",IF(B'+row+'="Closed Won",IF(H'+row+'="","Add contract value",IF(I'+row+'="","Add collected amount",IF(I'+row+'<H'+row+',"Payment outstanding","Won"))),IF(E'+row+'="","Set follow-up",IF(E'+row+'<TODAY(),"Overdue",IF(E'+row+'=TODAY(),"Due today","Scheduled"))))))');
  sheet.getRange(row,10).setFormula('=IF(OR(A'+row+'="",H'+row+'="",I'+row+'=""),"",MAX(0,H'+row+'-I'+row+'))');
}
function crmWrite_(sheet, row, values) {
  if (row > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(),100);
  var safe = values.map(function(v, i) { return i === 5 || i === 9 ? '' : typeof v === 'string' ? cellText(v) : v; });
  sheet.getRange(row,1,1,CRM.width).setValues([safe]); crmFormula_(sheet,row);
  sheet.getRange(row,5).setNumberFormat('mmm d, yyyy');
  sheet.getRange(row,7,1,4).setNumberFormat('$#,##0.00;[Red]($#,##0.00);$0.00');
  [16,17,20,24].forEach(function(c){sheet.getRange(row,c).setNumberFormat('mmm d, yyyy');});
  sheet.getRange(row,25).setNumberFormat('mmm d, yyyy h:mm am/pm');
  sheet.getRange(row,2).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(CRM.stages,true).setAllowInvalid(false).build());
  sheet.getRange(row,3).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(CRM.owners,true).setAllowInvalid(false).build());
  sheet.getRange(row,21).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(CRM.losses,true).setAllowInvalid(false).build());
  sheet.getRange(row,18,1,2).setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build());
  sheet.setRowHeight(row,44);
}
function crmAppend_(name, values) {
  var sh = crmBook_().getSheetByName(name), row = Math.max(CRM.first, sh.getLastRow()+1);
  crmWrite_(sh,row,values); return {sheet:sh,row:row,values:values};
}
function crmLog_(v, action, detail) {
  if (String(v[0]).indexOf('[TEST CRM]') === 0) return;
  var sh=crmBook_().getSheetByName('Activity');
  if (sh) sh.appendRow([new Date(),cellText(v[0]),cellText(action),cellText(detail||''),cellText(v[25])]);
}
function crmMove_(record, oldStage) {
  var v=record.values, target=crmDestination_(v[1]);
  if(target === record.sheet.getName()) return record;
  if(target !== 'Lead Tracking' && !v[19]) v[19]=new Date();
  if(target === 'Lead Tracking') v[19]='';
  // Copy first. If interrupted, reconcile detects identical IDs and retains the destination.
  var dest=crmAppend_(target,v); SpreadsheetApp.flush();
  if(dest.sheet.getRange(dest.row,26).getValue() !== v[25]) throw new Error('Move could not be verified; source retained.');
  record.sheet.deleteRow(record.row);
  crmLog_(v,'Stage moved',(oldStage||record.sheet.getName())+' → '+v[1]);
  return dest;
}
function crmIsExcluded_(v) { return /^\[TEST\]/i.test(String(v[1])) || /^TEST/i.test(String(v[5])) || /^TEST:/i.test(String(v[12])) || /^(Spam|Test)$/i.test(String(v[14])); }
function crmIntakeValues_(v,id) {
  var a=Array(CRM.width).fill('');
  var location=String(v[4]||'').match(/Project location:\s*([^\n]+)/i);
  var project=String(v[4]||'').match(/Project type:\s*([^\n]+)/i);
  a[0]=v[1]; a[1]='New'; a[2]='Unassigned'; a[3]='Contact lead and set next step';
  a[10]=String(v[3]||''); a[11]=v[2]||''; a[12]=location?location[1]:''; a[13]=project?project[1]:'';
  a[17]=false; a[18]=false; a[21]=v[5]||'Unknown'; a[22]=v[6]||'';
  a[23]=v[0]||''; a[24]=new Date(); a[25]=id; a[26]=v[4]||''; a[27]=1; return a;
}
function crmImportRow_(sheet,row,known) {
  var v=sheet.getRange(row,1,1,15).getValues()[0];
  if (!v[1] || (!v[2] && !v[3]) || crmIsExcluded_(v)) return false;
  var id=v[13] || crmId_();
  // Persist the ID before copying so a retry cannot produce a second opportunity.
  if(!v[13]) sheet.getRange(row,14).setValue(id);
  if(known[id]) return false;
  var result=crmAppend_('Lead Tracking',crmIntakeValues_(v,id)); known[id]=result;
  crmLog_(result.values,'Lead added','From Web Forms'); return true;
}
function crmAfterIntake_(sheet) {
  if(!crmReady_()) return;
  try {
    var known={}; crmRows_().forEach(function(r){known[r.values[25]]=r;});
    crmImportRow_(sheet,sheet.getLastRow(),known);
  } catch(err) { console.error('CRM intake pending reconciliation: '+err.message); }
}
function crmReconcile_() {
  var rows=crmRows_(), groups={};
  rows.forEach(function(r){if(r.values[25]) (groups[r.values[25]]||(groups[r.values[25]]=[])).push(r);});
  Object.keys(groups).forEach(function(id){
    var g=groups[id]; if(g.length<2) return;
    var target=g.filter(function(r){return crmDestination_(r.values[1])===r.sheet.getName();});
    if(g.length!==2 || target.length!==1 || JSON.stringify(g[0].values.map(function(v,i){return i===5||i===9?'':v;}))!==JSON.stringify(g[1].values.map(function(v,i){return i===5||i===9?'':v;}))) throw new Error('Duplicate records differ; both were preserved. Review Lead ID '+id);
    var stale=g.filter(function(r){return r!==target[0];})[0]; stale.sheet.deleteRow(stale.row);
  });
  // Refresh row positions after each move because deleting a row changes later positions.
  crmRows_().filter(function(r){return crmDestination_(r.values[1])!==r.sheet.getName();}).map(function(r){return r.values[25];}).filter(Boolean).forEach(function(id){var r=crmFind_(id); if(r) crmMove_(r);});
}
function crmSyncSilent_() { return crmLock_(function(){
  if(!crmReady_()) return 0;
  crmReconcile_(); var known={}, added=0; crmRows_().forEach(function(r){known[r.values[25]]=r;});
  var sh=crmBook_().getSheetByName('Web Forms');
  for(var row=2;row<=sh.getLastRow();row++) if(crmImportRow_(sh,row,known)) added++;
  return added;
}); }
function crmSync() { var n=crmSyncSilent_(); crmBook_().toast(n+' new lead(s) added. Stages reconciled.','Moulding CRM',5); }
function onEdit(e) {
  if(!e || !crmReady_()) return;
  try { crmLock_(function(){
    var sh=e.range.getSheet(), name=sh.getName();
    if(name==='Web Forms') {
      var known={};crmRows_().forEach(function(r){known[r.values[25]]=r;});
      for(var r=Math.max(2,e.range.getRow());r<=e.range.getLastRow();r++) crmImportRow_(sh,r,known);
      return;
    }
    if(CRM.sheets.indexOf(name)<0 || e.range.getLastRow()<CRM.first) return;
    // Bottom to top keeps multi-row paste positions stable during moves.
    for(var row=e.range.getLastRow();row>=Math.max(CRM.first,e.range.getRow());row--) {
      var v=sh.getRange(row,1,1,CRM.width).getValues()[0]; if(!v[0]) continue;
      if(!v[25]) {v[25]=crmId_(); v[1]=v[1]|| (name==='Lead Tracking'?'New':name);v[2]=v[2]||'Unassigned';v[21]=v[21]||'Manual / unknown';}
      if(CRM.stages.indexOf(v[1])<0) throw new Error('Choose a Stage from the dropdown.');
      v[24]=new Date();v[27]=(Number(v[27])||0)+1;
      // Only derived/system fields are rewritten; another editor's other cells remain intact.
      sh.getRange(row,2,1,2).setValues([[v[1],v[2]]]);sh.getRange(row,25,1,2).setValues([[v[24],v[25]]]);sh.getRange(row,28).setValue(v[27]);
      crmFormula_(sh,row);
      if(e.range.getColumn()<=2 && e.range.getLastColumn()>=2) crmLog_(v,'Stage changed',String(e.oldValue||'')+' → '+v[1]);
      else crmLog_(v,'Lead updated',e.range.getNumRows()===1&&e.range.getNumColumns()===1?CRM.fields[e.range.getColumn()-1]:'Multiple fields');
      crmMove_({sheet:sh,row:row,values:v},e.oldValue);
    }
  }); } catch(err) { crmBook_().toast(err.message+' Use Moulding CRM → Sync if a move is pending.','CRM needs attention',10);console.error(err.message); }
}
function crmDateText_(value) {
  return value instanceof Date && !isNaN(value) ? Utilities.formatDate(value,crmBook_().getSpreadsheetTimeZone(),'yyyy-MM-dd') : '';
}
function crmSerialize_(r) {
  if(!r) return {id:'',revision:0,values:crmIntakeValues_(['','','','',''], '') .map(function(v){return v instanceof Date?'':v;})};
  return {id:r.values[25],revision:Number(r.values[27])||0,sheet:r.sheet.getName(),values:r.values.map(function(v,i){return [4,15,16,19,23,24].indexOf(i)>=0?crmDateText_(v):v;})};
}
function crmGetSelected() {
  var sh=crmBook_().getActiveSheet(), range=sh.getActiveRange();
  if(CRM.sheets.indexOf(sh.getName())<0 || !range || range.getRow()<CRM.first) throw new Error('Select a lead row in Lead Tracking, Closed Won or Closed Lost, then click Load selected lead.');
  var id=sh.getRange(range.getRow(),26).getValue(); if(!id) throw new Error('This row has no saved lead yet. Use Add a lead.');
  return crmSerialize_(crmFind_(id));
}
function crmSaveCard(input) { return crmLock_(function(){
  if(!crmReady_()) throw new Error('CRM setup is not complete.');
  var existing=input.id?crmFind_(input.id):null;
  if(input.id&&!existing) throw new Error('Lead no longer exists. Reload the card.');
  if(existing&&Number(input.revision)!==(Number(existing.values[27])||0)) throw new Error('Someone edited this lead. Reload it before saving. Your unsaved entries remain visible.');
  var v=existing?existing.values.slice():Array(CRM.width).fill(''), fields=input.fields||{};
  var editable=[0,1,2,3,4,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  editable.forEach(function(i){
    if(!Object.prototype.hasOwnProperty.call(fields,String(i)))return;
    var x=fields[i];
    if([6,7,8].indexOf(i)>=0){if(x!==''&&(!isFinite(Number(x))||Number(x)<0))throw new Error('Money fields must be zero or a positive number.');v[i]=x===''?'':Number(x);}
    else if([4,15,16,19,23].indexOf(i)>=0){if(x&&!/^\d{4}-\d{2}-\d{2}$/.test(x))throw new Error('Choose a valid date.');v[i]=x?Utilities.parseDate(x,crmBook_().getSpreadsheetTimeZone(),'yyyy-MM-dd'):'';}
    else if(i===17||i===18)v[i]=x===true;
    else v[i]=String(x==null?'':x).slice(0,20000);
  });
  if(!String(v[0]).trim()) throw new Error('Client name is required.');
  if(CRM.stages.indexOf(v[1])<0 || CRM.owners.indexOf(v[2])<0) throw new Error('Choose a valid stage and owner.');
  if(v[20]&&CRM.losses.indexOf(v[20])<0)throw new Error('Choose a lost reason from the list.');
  v[25]=input.id||crmId_();v[24]=new Date();v[27]=(Number(v[27])||0)+1;
  if(!existing && crmDestination_(v[1])!=='Lead Tracking'&&!v[19])v[19]=new Date();
  var old=existing?existing.values[1]:'';
  var r=existing||crmAppend_(crmDestination_(v[1]),v);
  if(existing){crmWrite_(r.sheet,r.row,v);r.values=v;r=crmMove_(r,old);}
  crmLog_(v,existing?'Lead card saved':'Lead added',existing?'':'Manual entry');
  return crmSerialize_(r);
}); }
function crmOpenCard(){crmShowCard_(false);}
function crmNewCard(){crmShowCard_(true);}
function crmShowCard_(isNew){
  var html=HtmlService.createHtmlOutput(crmCardHtml_().replace('__NEW_CARD__',isNew?'true':'false'));
  SpreadsheetApp.getUi().showSidebar(html.setTitle('Moulding CRM'));
}
function crmEnable(){
  CRM.sheets.forEach(function(n){if(crmBook_().getSheetByName(n).getRange(5,26).getValue()!=='Lead ID')throw new Error('CRM schema missing');});
  PropertiesService.getScriptProperties().setProperty('CRM_READY','v1');onOpen();
  crmBook_().toast('CRM is ready. Use the Moulding CRM menu to open a lead card.','Setup complete',8);
}
function crmVerification(){return crmLock_(function(){
  var id='VERIFY-'+Utilities.getUuid(), sh=crmBook_().getSheetByName('Web Forms'), before=sh.getLastRow(), counts=crmRows_().length;
  try {
    sh.appendRow([new Date(),'[TEST CRM] Workflow verification','crm-verification@example.com','5550100','Project location: Test city','Internal CRM check','','','','','','', '',id]);
    var known={};crmRows_().forEach(function(r){known[r.values[25]]=r;});
    if(!crmImportRow_(sh,sh.getLastRow(),known)||crmImportRow_(sh,sh.getLastRow(),known))throw new Error('Intake dedupe failed');
    ['Closed Won','Closed Lost','Follow-up'].forEach(function(stage){var r=crmFind_(id);r.values[1]=stage;crmWrite_(r.sheet,r.row,r.values);crmMove_(r);if(crmFind_(id).sheet.getName()!==crmDestination_(stage))throw new Error('Stage routing failed');});
    if(sh.getLastRow()!==before+1 || sh.getRange(before+1,14).getValue()!==id)throw new Error('Archive changed during move');
    console.log('CRM check passed: intake, duplicate prevention, Won/Lost/reopen routing, archive retention.');
  } finally {
    var r=crmFind_(id);if(r)r.sheet.deleteRow(r.row);
    if(sh.getLastRow()===before+1&&sh.getRange(before+1,14).getValue()===id)sh.deleteRow(before+1);
    if(crmRows_().length!==counts)throw new Error('CRM record count changed unexpectedly');
  }
});}
function crmCardHtml_(){return `<!doctype html><html><head><base target="_top"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box}body{margin:0;background:#f7f6f2;color:#081828;font:13px Arial,sans-serif}header{background:#081828;color:#fefaf1;padding:20px 17px}small{letter-spacing:2px;color:#c5a86f;font-size:10px}h1{font:25px Georgia,serif;margin:8px 0}header p{font-size:12px;color:#d6d2c6;line-height:1.5;margin:0}.toolbar{padding:12px 16px;display:flex;gap:8px}button{cursor:pointer;border:1px solid #c7c9ca;border-radius:6px;background:white;padding:9px;font-weight:600;color:#081828}main{padding:0 16px 85px}section{background:white;border:1px solid #e0e1dc;border-radius:9px;padding:13px;margin-bottom:12px}h2{font-size:11px;text-transform:uppercase;letter-spacing:1.1px;margin:0 0 12px;color:#63717b}label{display:block;font-size:12px;font-weight:600;margin-top:12px}input,select,textarea{display:block;width:100%;border:1px solid #ccd1d3;border-radius:5px;padding:9px;background:#fff;font:13px Arial;color:#081828;margin-top:5px}textarea{min-height:80px;resize:vertical}.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}.check{display:flex;align-items:center;gap:8px}.check input{width:auto;margin:0}#message{font-size:12px;line-height:1.5;white-space:pre-wrap;padding:0 17px 12px;color:#52626e}footer{position:fixed;bottom:0;background:#f7f6f2;padding:12px 16px;width:100%;border-top:1px solid #d6d2c6}#save{width:100%;background:#b4904e;color:#081828;border:0;padding:12px}.hint{font-size:11px;color:#63717b;line-height:1.5}#original{white-space:pre-wrap;font-size:12px;line-height:1.5}details{margin-top:10px}summary{cursor:pointer;font-size:12px;font-weight:bold}button:disabled{opacity:.5;cursor:wait}.error{color:#9b3030!important}
</style></head><body><header><small>MOULDING SAINT LOUIS</small><h1>Lead workspace</h1><p>Keep the next step clear.<br>Everything saves back to your CRM.</p></header><div class="toolbar"><button onclick="load()">Load selected lead</button><button onclick="fresh()">+ New</button></div><div id="message" role="status"></div><main><form id="form" onsubmit="save(event)"></form><details><summary>Original form submission</summary><p id="original">No linked submission.</p></details></main><footer><button id="save" type="submit" form="form">Save lead</button></footer><script>
var current={id:'',revision:0}, dirty=false;
var stages=['New','Needs review','Contacted','Consultation booked','Proposal sent','Follow-up','On hold','Closed Won','Closed Lost'];
var owners=['Unassigned','Tim','Ryan'], losses=['','Price','Timing','No response','Went another direction','Outside service area','Spam / invalid','Other'];
var groups=[['Next step',[[0,'Client name','text'],[1,'Stage','select',stages],[2,'Owner','select',owners],[3,'Next action','text'],[4,'Follow-up date','date']]],['Contact & project',[[10,'Phone','tel'],[11,'Email','email'],[12,'Location / address','text'],[13,'Project type','text'],[14,'Working notes','textarea']]],['Value & milestones',[[6,'Proposal amount ($)','number'],[7,'Contract value ($)','number'],[8,'Collected revenue ($)','number'],[15,'Consultation date','date'],[16,'Proposal sent date','date'],[17,'Deposit received','checkbox'],[18,'Install complete','checkbox'],[19,'Closed date','date'],[20,'Lost reason','select',losses]]],['Attribution',[[21,'Lead source','text'],[22,'Campaign','text'],[23,'Lead received','date']]]];
var form=document.getElementById('form');groups.forEach(function(g){var s=document.createElement('section'),h=document.createElement('h2');h.textContent=g[0];s.appendChild(h);g[1].forEach(function(f){var l=document.createElement('label');l.textContent=f[1];var el=document.createElement(f[2]==='select'?'select':f[2]==='textarea'?'textarea':'input');el.id='f'+f[0];if(el.tagName==='INPUT')el.type=f[2];if(f[2]==='number'){el.min=0;el.step='.01';}if(f[2]==='select')f[3].forEach(function(v){var o=document.createElement('option');o.value=v;o.textContent=v||'Select when closing lost';el.appendChild(o);});if(f[0]===0)el.required=true;if(f[2]==='checkbox')l.className='check';el.oninput=function(){dirty=true;};l.appendChild(el);s.appendChild(l);});if(g[0]==='Value & milestones'){var p=document.createElement('p');p.className='hint';p.textContent='Leave unknown amounts blank. Contract value is booked work; collected revenue is money actually received. Lost value uses the proposal amount.';s.appendChild(p);}form.appendChild(s);});
function message(s,error){var m=document.getElementById('message');m.textContent=s;m.className=error?'error':'';}
function busy(on){document.querySelectorAll('button').forEach(function(b){b.disabled=on;});}
function show(r){current=r;groups.forEach(function(g){g[1].forEach(function(f){var el=document.getElementById('f'+f[0]),v=r.values[f[0]];if(f[2]==='checkbox')el.checked=v===true;else el.value=v==null?'':v;});});document.getElementById('original').textContent=r.values[26]||'No linked submission.';dirty=false;busy(false);message(r.id?'Loaded from '+r.sheet+'.':'New lead — fill in the details, then Save.');}
function allowed(){return !dirty||confirm('Discard unsaved changes and load another lead?');}
function load(){if(!allowed())return;busy(true);message('Loading selected lead…');google.script.run.withSuccessHandler(show).withFailureHandler(fail).crmGetSelected();}
function fresh(){if(!allowed())return;var v=Array(28).fill('');v[1]='New';v[2]='Unassigned';v[21]='Manual / unknown';show({id:'',revision:0,values:v});}
function fail(e){busy(false);message(e.message||String(e),true);}
function save(e){e.preventDefault();var fields={};groups.forEach(function(g){g[1].forEach(function(f){var el=document.getElementById('f'+f[0]);fields[f[0]]=f[2]==='checkbox'?el.checked:el.value;});});busy(true);message('Saving…');google.script.run.withSuccessHandler(function(r){show(r);message('Saved to '+r.sheet+'.');}).withFailureHandler(fail).crmSaveCard({id:current.id,revision:current.revision,fields:fields});}
if(__NEW_CARD__)fresh();else load();
</script></body></html>`;}
