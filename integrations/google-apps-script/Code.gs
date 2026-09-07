// Bound to the lead spreadsheet. Update the existing web-app deployment after saving.
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Web Forms');
    if (!sheet) throw new Error('Web Forms sheet is missing');
    var data = JSON.parse(e.postData.contents);
    if (!data.name || !data.email || !data.message) throw new Error('Required fields missing');
    var row = [
      new Date(), cellText(data.name), cellText(data.email), cellText(data.phone), cellText(data.message),
      cellText(data.leadSource || 'Direct / unknown'), cellText(data.campaign), cellText(data.sourceMedium),
      cellText(data.firstSource), cellText(data.landingPage), cellText(data.referringSite), cellText(data.attributionDetails)
    ];
    sheet.appendRow(row);
    return jsonResponse({ status: 'success' });
  } catch (error) {
    return jsonResponse({ status: 'error', message: 'Lead could not be saved' });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function cellText(value) {
  var text = String(value == null ? '' : value).slice(0, 45000);
  // Untrusted form fields and campaign tags must be text, never spreadsheet formulas.
  return /^[\s\u0000-\u001f]*[=+@-]/.test(text) ? "'" + text : text;
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
