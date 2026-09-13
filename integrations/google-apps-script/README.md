# Lead attribution receiver

`Code.gs` is the source for the existing bound Google Apps Script web app. Deploy it to the existing deployment so Vercel's `GOOGLE_SHEETS_WEBAPP_URL` remains valid. Preserve the current execution identity and access permissions.

## Web Forms column mapping

Only the `Web Forms` tab is used. The three manual tabs are outside this integration.

| Column | Header | Payload |
| --- | --- | --- |
| A | Timestamp | Server-generated Date |
| B | Name | name |
| C | Email | email |
| D | Phone | phone |
| E | Message | message |
| F | Lead Source | leadSource |
| G | Campaign | campaign |
| H | Source / Medium | sourceMedium |
| I | First Source | firstSource |
| J | Landing Page | landingPage |
| K | Referring Site | referringSite |
| L | Attribution Details | attributionDetails |
| M | Google Ads Lead ID | Native Google lead ID; website submissions leave this blank |

Lead Source is the last identifiable non-direct source within 30 days, or the first/direct observation when none is available. First Source is the first retained observation within that window. Landing Page and Campaign correspond to the selected lead source, not necessarily the submission page. Details include observation time, evidence type, ad/content and term when supplied. This is browser-reported, best-effort information, not verified identity or an exact GA4 conversion-attribution result. Historical rows cannot be reliably backfilled from this feature.

## Rollout

1. Verify the current sheet has its original A:E headers and F:L is unused; retain any existing user edits. Add the seven F:L headers with the existing header formatting. Do not insert columns or edit the other tabs.
2. Save `Code.gs` into the existing bound project. Use Manage deployments to update the existing web-app deployment to a new version. The receiver remains compatible with the old website payload, recording unknown attribution until the website is updated.
3. Deploy the website. It expects the receiver's JSON `{ "status": "success" }` receipt. An HTTP 200 with an error or non-JSON page must still trigger the Sheets failure banner in email.
4. With authorization, submit clearly labeled test leads through tagged landing pages and verify the Web Forms row and notification email. Those submissions fire the site's normal lead conversion events; use mocked local tests where production test conversions are undesirable.
5. Confirm the live ads' URL parameters. Existing ad budgets, targeting and creative need no changes for this feature.

The receiver never infers columns from the current selection and never selects the spreadsheet's active tab. It escapes formula-like text and uses a script lock to serialize appends. The website preserves email delivery if Sheets fails. Deploying this receiver does not retroactively edit existing rows.

## Tagging

For a Meta ad, use explicit parameters such as:

```
utm_source=facebook&utm_medium=paid_social&utm_campaign=picture_frame_moulding&utm_content=ad_name
```

Use actual campaign/ad names or the platform's supported dynamic substitutions. A bare `fbclid` is not evidence that a click was paid.

Google auto-tagging supplies a `gclid`, `gbraid`, or `wbraid` marker when available. To include readable campaign information and provide a fallback if the marker is absent, add a final URL suffix using the real campaign name, for example:

```
utm_source=google&utm_medium=cpc&utm_campaign=picture_frame_moulding_search
```

Never discard or replace existing Google auto-tagging. Keep Google Ads auto-tagging enabled. Explicit UTMs should describe the actual ad, not be attached to ordinary navigation links. Search queries are generally not available from organic referrers.

## Testing

### Native Google Ads lead forms

Delivery path: Google Ads → `https://mouldingstl.com/api/google-ads-leads` → existing Apps Script web app → `Web Forms`.

The Next.js endpoint validates `google_key`, then waits for the receiver's explicit `google_ads_lead_forms_v1` receipt. Storage/network errors return 5xx so Google can retry. Apps Script validates the same key before processing native payloads. Do not point Google directly at the Apps Script URL: its redirects/application-error responses are not the Google webhook HTTP contract.

The receiver maps `FULL_NAME` (or first/last), `EMAIL`, `PHONE_NUMBER`, city/address region and custom question answers into A:E. F is `Google Ads Lead Form`, G is the mapped campaign name or the campaign ID for newly created campaigns, H is `google / cpc`, and I repeats the known submission source (there is no website first-touch history). J:K remain blank because this form does not require a website visit. L records form/campaign IDs and timestamp evidence, M holds the lead ID. Google click IDs and the verification key are not saved to sheet rows. Update the four-name campaign map after renames if desired; new campaign IDs still work.

When supplied, `lead_submit_time` sets the timestamp; otherwise use receipt time and identify that fallback in L. Tests (`is_test: true`) have `[TEST]` names, a `TEST - Google Ads Lead Form` source and a separate test ID namespace. Existing Google lead notification emails remain enabled; this endpoint does not send duplicate emails or trigger website GA4/Meta conversion events.

Duplicate handling uses the existing script lock, column M and a hashed receipt ledger in Script Properties. Receipts persist for 90 days even when a spam/test row is manually deleted; retained rows provide deduplication after that window. A row append interrupted before saving its receipt is still found by column M on retry. At substantially higher lead volume, move the receipt ledger to a database before Apps Script storage quotas become relevant.

Rollout:

1. Preserve A:L and all manually maintained tabs. Add `Google Ads Lead ID` to unused M1 with matching header formatting.
2. Generate a private random key. Save it as production Vercel secret `GOOGLE_ADS_LEAD_WEBHOOK_KEY` and the Apps Script property of the same name. Never store it in the repository.
3. Save the updated `Code.gs`; update the existing web-app deployment version while preserving its URL, execution identity and access settings.
4. Deploy the website endpoint. Configure each existing Google lead-form asset with `https://mouldingstl.com/api/google-ads-leads` and the same key. Changing the key later requires updating all three locations together.
5. Use Google's **Send test data** and verify its success status plus a correctly mapped, labeled row. Repeat to check duplicate suppression. This uses Google's test payload rather than submitting a real ad conversion.
6. Existing/manual leads are not automatically backfilled by the webhook. On September 13, Elmer's September 11 lead was already manually entered in row 9 and was left untouched.

Run `node --test scripts/test-google-ads-leads.cjs scripts/test-lead-attribution.cjs`, targeted ESLint and the production build. Tests mock external services and do not send email or create real leads.

References: [Google webhook schema and retry contract](https://developers.google.com/google-ads/webhook/docs/implementation), [Google's test procedure](https://developers.google.com/google-ads/webhook/docs/testing).

Run `node --test scripts/test-lead-attribution.cjs`, targeted ESLint and the production build. Tests mock Sheets and Resend and do not send emails or create real leads. Production end-to-end verification requires separate authorization because it sends notifications to the configured recipients and fires conversion events.
