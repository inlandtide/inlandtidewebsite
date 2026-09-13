// Bound to the lead spreadsheet. Update the existing web-app deployment after saving.
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Web Forms');
    if (!sheet) throw new Error('Web Forms sheet is missing');
    var data = JSON.parse(e.postData.contents);
    if (data && ('user_column_data' in data || 'google_key' in data || 'lead_id' in data)) {
      return saveGoogleAdsLead(sheet, data);
    }
    if (!data.name || !data.email || !data.message) throw new Error('Required fields missing');
    var row = [
      new Date(), cellText(data.name), cellText(data.email), cellText(data.phone), cellText(data.message),
      cellText(data.leadSource || 'Direct / unknown'), cellText(data.campaign), cellText(data.sourceMedium),
      cellText(data.firstSource), cellText(data.landingPage), cellText(data.referringSite), cellText(data.attributionDetails)
    ];
    sheet.appendRow(row);
    if (typeof crmAfterIntake_ === 'function') crmAfterIntake_(sheet);
    return jsonResponse({ status: 'success' });
  } catch (error) {
    return jsonResponse({ status: 'error', message: 'Lead could not be saved' });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function saveGoogleAdsLead(sheet, data) {
  var properties = PropertiesService.getScriptProperties();
  var key = properties.getProperty('GOOGLE_ADS_LEAD_WEBHOOK_KEY');
  if (!key || data.google_key !== key) throw new Error('Unauthorized Google lead');
  if (typeof data.lead_id !== 'string' || !data.lead_id.trim() || data.lead_id.length > 2000 ||
      !Array.isArray(data.user_column_data) || data.user_column_data.length > 100 ||
      (data.is_test !== undefined && typeof data.is_test !== 'boolean')) throw new Error('Invalid Google lead');
  if (sheet.getRange(1, 13).getValue() !== 'Google Ads Lead ID') throw new Error('Lead ID column missing');

  var leadId = (data.is_test === true ? 'TEST:' : '') + data.lead_id;
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, leadId);
  var marker = 'google_lead_' + Utilities.base64EncodeWebSafe(digest);
  var lastRow = sheet.getLastRow();
  // Check the sheet as well as the receipt ledger: an append might have succeeded
  // just before an interrupted execution failed to save its receipt.
  var existing = properties.getProperty(marker) || (lastRow > 1 &&
    sheet.getRange(2, 13, lastRow - 1, 1).createTextFinder(leadId).matchEntireCell(true).useRegularExpression(false).findNext());
  if (existing) return jsonResponse({ status: 'success', integration: 'google_ads_lead_forms_v1', duplicate: true });

  var fields = {};
  var details = [];
  var known = ['FULL_NAME', 'FIRST_NAME', 'LAST_NAME', 'EMAIL', 'PHONE_NUMBER', 'CITY', 'REGION', 'POSTAL_CODE', 'COUNTRY'];
  data.user_column_data.forEach(function (field) {
    if (!field || typeof field.column_id !== 'string' || typeof field.string_value !== 'string') return;
    var value = field.string_value.slice(0, 10000);
    fields[field.column_id] = value;
    if (known.indexOf(field.column_id) === -1 && value) {
      details.push(String(field.column_name || field.column_id).slice(0, 300) + ': ' + value);
    }
  });
  var name = fields.FULL_NAME || [fields.FIRST_NAME, fields.LAST_NAME].filter(Boolean).join(' ') || 'Name not provided';
  var location = [fields.CITY, fields.REGION, fields.POSTAL_CODE, fields.COUNTRY].filter(Boolean).join(', ');
  var message = (location ? 'Project location: ' + location + '\n\n' : '') +
    (details.length ? details.join('\n\n') : 'No additional project details provided.');
  var campaigns = {
    '24067738044': 'Campaign #1 (Performance Max)',
    '24219846858': 'Search | Crown Moulding | STL',
    '24230855023': 'Search | Picture Frame Moulding | STL',
    '24230858851': 'Search | Wainscoting | STL'
  };
  var campaignId = String(data.campaign_id || '');
  var campaign = Object.prototype.hasOwnProperty.call(campaigns, campaignId) ? campaigns[campaignId] : campaignId;
  var source = data.is_test === true ? 'TEST - Google Ads Lead Form' : 'Google Ads Lead Form';
  var submitted = typeof data.lead_submit_time === 'string' ? new Date(data.lead_submit_time) : new Date(NaN);
  var validTime = !isNaN(submitted.getTime());
  var attribution = [
    'Submission: built-in Google Ads form', 'Campaign ID: ' + campaignId,
    'Form ID: ' + String(data.form_id || ''),
    validTime ? 'Timestamp: Google submission time' : 'Timestamp: webhook receipt time'
  ];
  if (data.asset_group_id) attribution.push('Asset group ID: ' + String(data.asset_group_id));
  if (data.lead_stage) attribution.push('Lead stage: ' + String(data.lead_stage));
  sheet.appendRow([
    validTime ? submitted : new Date(), cellText((data.is_test === true ? '[TEST] ' : '') + name),
    cellText(fields.EMAIL), cellText(fields.PHONE_NUMBER), cellText(message), cellText(source),
    cellText(campaign), 'google / cpc', cellText(source), '', '', cellText(attribution.join('\n')), cellText(leadId)
  ]);
  SpreadsheetApp.flush();
  properties.setProperty(marker, String(Date.now()));
  if (typeof crmAfterIntake_ === 'function') crmAfterIntake_(sheet);
  // Retain receipts for 90 days even if a spam row is manually deleted.
  // Older retained sheet rows still provide deduplication through column M.
  var cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000;
  var receipts = properties.getProperties();
  Object.keys(receipts).forEach(function (property) {
    if (property.indexOf('google_lead_') === 0 && Number(receipts[property]) < cutoff) properties.deleteProperty(property);
  });
  return jsonResponse({ status: 'success', integration: 'google_ads_lead_forms_v1', duplicate: false });
}

function cellText(value) {
  var text = String(value == null ? '' : value).slice(0, 45000);
  // Untrusted form fields and campaign tags must be text, never spreadsheet formulas.
  return /^[\s\u0000-\u001f]*[=+@-]/.test(text) ? "'" + text : text;
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
