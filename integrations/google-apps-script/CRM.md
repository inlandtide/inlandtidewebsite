# Moulding CRM

The existing lead workbook is now a spreadsheet-bound CRM. `CRM.gs` runs in the same Apps Script project as `Code.gs`; it is not a public website page. No CRM read or edit method is exposed through the webhook. The sidebar uses the signed-in spreadsheet editor's Apps Script session.

## Workflow

- `Web Forms` keeps original submissions in A:M. N is the stable CRM Lead ID; O is Intake disposition (`Ready`, `Spam`, `Test`). Preserve the first thirteen columns and header row.
- `Lead Tracking`, `Closed Won`, and `Closed Lost` are editable record stores with identical layouts. Headers are row 5; records start on row 6.
- A Stage edit routes the whole record to the corresponding sheet. Reopening a record clears its close date. Original intake rows stay in Web Forms.
- `Moulding CRM` menu: open a lead card, add a lead, synchronize intake/reconcile pending stage moves, or open Dashboard.
- `Dashboard` contains live all-time counts, known monetary totals, win rate, follow-ups, and missing-data prompts. `CRM Guide` explains everyday use. `Activity` begins recording changes from the CRM upgrade onward.

## Columns A:AB

Client; Stage; Owner; Next action; Follow-up date; Attention (formula); Proposal amount; Contract value; Collected revenue; Balance remaining (formula); Phone; Email; Location / address; Project type; Notes; Consultation date; Proposal sent date; Deposit received; Install complete; Closed date; Lost reason; Lead source; Campaign; Lead received; Updated; Lead ID; Original inquiry; Revision.

Unknown values stay blank. Contract value is booked work, collected revenue is money received, and lost proposal value is the quote attached to lost opportunities. A remaining balance is calculated only when both contract and collected values are present. Historical closed dates are not inferred.

## Automation and reliability

`Code.gs` calls `crmAfterIntake_` after saving website or Google Ads submissions. The archive receipt remains successful if CRM copying temporarily fails; `onOpen` or the Sync menu reconciles pending archive records. `onEdit` handles direct spreadsheet edits, including multi-row edits from bottom to top. Script/API edits do not fire Google's edit trigger; callers should run reconciliation afterward.

Import writes a stable intake ID before appending the CRM row. Repeated syncs find that ID across all three tabs. Repeat inquiries from the same email are separate opportunities; legacy email matching was used only for the one-time migration. Google test payloads and rows marked Spam/Test are excluded. Mark an already-imported spam lead Closed Lost with reason Spam / invalid; changing the archive disposition does not delete an existing CRM record.

All scripted imports/edits/moves use the same script lock as the webhook. Moves copy and verify the target ID before removing the source. Reconciliation only removes a duplicate when its contents match and its proper destination is unambiguous; differing records are preserved for review. The sidebar refuses stale revision saves. Direct simultaneous cell edits retain normal Google Sheets collaboration behavior.

The script operates only within the bound workbook. It adds no email, calendar, third-party CRM, or scheduled trigger permissions. Public form text is escaped before writing cells; sidebar data is assigned via textContent/value, never injected as HTML.

## Deployment

1. Back up the existing workbook. Preserve existing contacts, addresses, notes, and won/lost classification; do not infer old dates or monetary amounts.
2. Ensure identical CRM headers and positions, N/O archive headers, and the Dashboard, CRM Guide and Activity sheets exist.
3. Save both `Code.gs` and `CRM.gs` in the bound project. Run `crmEnable` once after the workbook migration. This sets Script Property `CRM_READY=v1` and registers the menu.
4. Update the **existing web-app deployment** to a new version; keep its URL, execute-as identity and access unchanged. Saving editor code alone updates sheet triggers/menu functions, but does not update the deployed webhook version.
5. Reload the workbook to get the menu. `crmVerification` creates one isolated, clearly marked test record, verifies intake/deduplication/Won/Lost/reopen routing and archive retention, then removes only its own test rows. It sends no messages and records no ad conversion.

The September 13, 2026 migration retained 10 unique leads: seven active, two won, one lost; eight historical submissions were linked. Existing active records are `Needs review`, with no inferred owner or progress. A pre-upgrade workbook copy is linked from CRM Guide.

## Tests

Run `node --test scripts/test-crm.cjs scripts/test-google-ads-leads.cjs scripts/test-lead-attribution.cjs` from the repository root. This covers intake exclusions, stable IDs, routing, archive retention, separate repeat inquiries, closed-record reconciliation, stale edits, blank amounts, formula escaping and existing form delivery.
