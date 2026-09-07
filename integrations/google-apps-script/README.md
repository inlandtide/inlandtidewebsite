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

Run `node --test scripts/test-lead-attribution.cjs`, targeted ESLint and the production build. Tests mock Sheets and Resend and do not send emails or create real leads. Production end-to-end verification requires separate authorization because it sends notifications to the configured recipients and fires conversion events.
