# Moulding Saint Louis — Website

Welcome to the repository for the Moulding Saint Louis website. This document provides architectural context, integration details, brand direction, page structure, and environment variable requirements for developers or AI agents working on this project in the future.

## Instructions for AI Agents & Developers

Please follow these rules on every contribution:

**1. Update the Changelog before every push.**
Before committing and pushing any changes, open `CHANGELOG.md` and add a short summary of what was changed, added, or fixed under a new dated entry. This keeps a human-readable history of the project that any future agent or developer can rely on.

**2. All images must be committed directly to this repository.**
Do not upload images to any external CDN, including Manus's built-in CDN, Cloudinary, or similar services. All image files must be placed in the `/public` directory and committed to GitHub. This ensures images remain under version control, are served directly by Vercel, and are never lost if a third-party CDN account changes or expires.

---

## Architecture & Infrastructure

This project is built using modern, serverless web technologies designed for high performance and zero-maintenance scaling.

* **Framework:** [Next.js 16](https://nextjs.org/) using the App Router.
* **Language:** TypeScript.
* **Styling:** Tailwind CSS v4, shared base styles in `app/globals.css`, and the responsive design system in `app/design.css`.
* **Fonts:** Cormorant Garamond for headlines and Manrope for supporting content and form controls, self-hosted through `next/font`.
* **Hosting:** [Vercel](https://vercel.com/).
* **Deployment:** Continuous deployment is configured. Any push to the `main` branch on GitHub automatically triggers a build and deployment on Vercel.
* **Domain:** `mouldingstl.com` with DNS managed via Cloudflare and pointed to Vercel.

## Brand System

The current visual identity uses the following brand palette throughout the website:

| Role | Name | Hex |
| :--- | :--- | :--- |
| Primary Dark | Saint Louis Navy | `#081828` |
| Primary Light | Moulding Ivory | `#FEFAF1` |
| Primary Accent | Antique Brass | `#B4904E` |
| Secondary Text | Blue Charcoal | `#2E404E` |
| Secondary Neutral | Warm Stone | `#D6D2C6` |

The primary visible logo file currently used by the redesigned site is stored at:

```text
/public/moulding-stl-inverted-logo.webp
```

The current design uses committed site imagery at:

```text
/public/images/placeholders/
```

Most active service and hero images use committed high-resolution imagery documented in `docs/drive-photo-asset-mapping.md`. Earlier Google Drive browser downloads produced small thumbnail-sized files for several categories, so sharper replacement imagery was used where needed. The Contact page intentionally preserves the previously approved fireplace surround image as `/public/images/placeholders/contact-fireplace-surround.jpg`.

## Site Structure

### Private staging

The `staging/conversion-redesign` branch is a Vercel Preview, separate from the production `main` branch. Its private share link is managed in the deployment's Share dialog. Anyone possessing that link can view it; it is not an identity restriction. Keep the token out of this public repository.

`next.config.ts` sets `NEXT_PUBLIC_SITE_MODE` from Vercel's build environment. Only production builds enable real lead delivery, attribution capture, and Meta/GA scripts. Preview and local builds validate and simulate contact submission without storing or emailing it, reject Google Ads webhook requests, display a preview notice, and set noindex via metadata, robots.txt and response headers. Do not set `VERCEL_ENV=production` while testing against real credentials. Promotion to production requires separate owner approval.

The staging redesign uses a navy, warm ivory, and brass palette, clear free-consultation calls to action, and short inline forms. Only name and email are required; phone, project type, city, timing, and project details are optional. The extra details are included in the existing message field so the email and CRM payload remains compatible. No minimum project price or required budget is advertised.

`/preview-guide` is a review hub available only in preview. Dedicated ad destinations are `/lp/picture-frame-moulding`, `/lp/wainscoting-beadboard`, and `/lp/crown-moulding`. They are noindex, excluded from the sitemap, and canonicalize to the corresponding existing service routes. Ad destination URLs must not change until the owner approves launch. The crawlable service routes retain their original titles, descriptions, detailed service guidance, questions, and structured data.

Known client project photos (the eight `IMG_` source records in the gallery data) are presented as completed work. Stock and otherwise unverified images are labeled design inspiration, not claimed as company projects. The gallery includes keyboard-accessible full-image viewing.

Production analytics retain `generate_lead` on confirmed receipt, with additional `consultation_start`, `consultation_submit`, `consultation_error`, and `consultation_cta_click` diagnostic events. These events contain only page/placement identifiers, never entered contact details. They are not automatically configured as advertising conversions. Preview disables all of them.

| Page | Route | Purpose |
| :--- | :--- | :--- |
| Home | `/` | Premium landing page with brand positioning, service tiles, customer-experience messaging, ownership details, and consultation form. |
| Services | `/services` | Services hub for all finish carpentry offerings. |
| Luxury & Decorative Moulding | `/services/luxury-decorative-moulding` | Dedicated service page for custom moulding and decorative profiles. |
| Picture Frame Moulding | `/services/picture-frame-moulding` | Dedicated page for wall panel moulding and formal wall treatments. |
| Crown Moulding | `/services/crown-moulding` | Dedicated page for crown moulding and ceiling transition details. |
| Wainscoting & Beadboard | `/services/wainscoting-beadboard` | Dedicated page for premium wall treatments. |
| Chair Rail & Picture Rail | `/services/chair-rail-picture-rail` | Dedicated page for rail details and proportional wall design. |
| Fireplace Mantels & Surrounds | `/services/fireplace-mantels-surrounds` | Dedicated page for fireplace focal point details. |
| Window & Door Casing | `/services/window-door-casing` | Dedicated page for upgraded interior casing. |
| Archways & Entryways | `/services/archways-entryways` | Dedicated page for entry transitions and cased openings. |
| Gazebos & Pergolas (Archived) | `/services/gazebos-pergolas` | Source content and image records are retained for future restoration; the route returns a noindex 404 and is excluded from visitor-facing navigation, the gallery, and the sitemap. |
| About | `/about` | Local ownership and company values page for Moulding Saint Louis. |
| Gallery | `/gallery` | Rebuilt visual portfolio organized by uploaded photo filename categories. |
| Contact | `/contact` | Dedicated consultation request page. |
| SEO Dashboard | `/seo-dashboard` | Internal noindex dashboard based on the SEO implementation report for tracking SEO foundations and next actions. |

The gallery page has been rebuilt as a curated, image-forward portfolio organized from uploaded photo filename categories. Active gallery images are committed under `/public/images/gallery/`, with source-to-site mapping documented in `docs/gallery-image-asset-mapping.md`.

## Business Positioning

Moulding Saint Louis focuses on high-end moulding, finish carpentry, and quality wood products for St. Louis homes. The company is independently owned and operated in St. Louis. Wood is the primary specialty, but similar or requested materials may be discussed when they fit the design, performance needs, and finish expectations of the project.

The site should maintain a refined, premium, customer-care-focused tone. Preferred language includes terms such as **luxury moulding**, **architectural wood finishes**, **finish carpentry specialists**, **custom wood details**, **clear expectations**, and **exceptional customer care**.

## SEO & Search Visibility

The site includes foundational SEO support for local search visibility in St. Louis. Current SEO files and conventions include:

| SEO Area | File or Location | Purpose |
| :--- | :--- | :--- |
| Sitewide metadata | `app/layout.tsx` | Defines default titles, descriptions, Open Graph, Twitter cards, robots directives, and canonical metadata. |
| Page metadata | Individual `page.tsx` files | Defines page-specific titles, descriptions, canonical URLs, and social metadata. |
| Structured data helpers | `app/data/seo.ts` and `app/components/JsonLd.tsx` | Provides JSON-LD for local business, website, services, and breadcrumbs. |
| Sitemap | `app/sitemap.ts` | Generates `https://mouldingstl.com/sitemap.xml` for the homepage, service pages, and supporting pages. |
| Robots | `app/robots.ts` | Allows crawler access and points search engines to the sitemap. |
| Service planning content | `app/data/service-guidance.ts` | Supplies installation-focused metadata, introductions, and visible FAQs for picture frame moulding, crown moulding, and wainscoting. |
| SEO Dashboard | `app/seo-dashboard/page.tsx` | Presents a manual SEO checklist, keyword targets, and links to Search Console and Analytics. It has no live data connection and remains noindex. |

Google Search Console access to the `mouldingstl.com` domain property was verified on September 7, 2026, and the existing sitemap was submitted and processed successfully with 13 discovered pages. Performance data is available in Search Console. The website dashboard does not fetch that data: its keyword list is a set of targets, not measured rankings. Historical SimilarWeb estimates were unavailable, which does not imply zero visitors.

The sitemap excludes the dashboard and archived service. It omits `lastModified` until accurate page-edit dates are maintained; rebuilding the website should not mark every page as substantively updated. Service pages include visible breadcrumbs and links to related services and matching gallery sections.

## Integrations & Data Flow

The contact form uses a secure Next.js serverless API route at `app/api/contact/route.ts`. The form gathers customer details and enriches the message with project type and project location, while preserving the backend payload shape used by the existing Google Sheets integration.

The execution order on every form submission is:

1. **Validate** — Server validates that `name`, `email`, and `message` are present and that the email address is well formed.
2. **Secure the notification email** — Send the full lead and attribution to Tim and Ryan via Resend. Wait for Resend's accepted-message ID before acknowledging receipt to the visitor. The email request has a 10-second timeout.
3. **Confirm promptly, then update Google Sheets** — Next.js `after()` runs the Apps Script call on Vercel after the response, including CRM intake. It continues independently of the visitor's browser, with a 20-second request timeout inside a 60-second function budget. If the save is not acknowledged, send a separate `⚠️ [CHECK SHEETS]` email with the full lead. Check Web Forms before adding manually, since a timeout can hide a successful append.
4. **Handle an email outage** — If email is not acknowledged, wait for a confirmed Sheets save as the fallback before returning success, then retry the same email once using a Resend idempotency key. If neither destination confirms receipt, return an error and keep the visitor's form filled in.

The normal success response means the email provider has accepted the lead; it does not promise inbox delivery or an already-completed spreadsheet save. `after()` is bounded background work, not a durable retry queue: platform termination can still interrupt it. The accepted email provides a recoverable copy if Sheets or CRM processing fails. Spreadsheet appends are not automatically retried because the existing receiver does not deduplicate website submissions. Logs record a reference and timings without lead details. No new service or Apps Script deployment is needed for this flow.

### Google Sheets Integration

Form data is sent to a Google Apps Script Webhook as a JSON POST request.

* **Payload keys:** `name`, `email`, `phone`, `message`, plus the normalized attribution fields documented in `integrations/google-apps-script/README.md`.
* **Requirement:** The Apps Script must be deployed with "Execute as: Me" and "Who has access: Anyone" — otherwise Vercel's server-to-server request will receive a 403.

### Lead Source Attribution

Native Google Ads lead forms use a separate authenticated endpoint, `/api/google-ads-leads`, which forwards to the same Apps Script receiver and `Web Forms` tab. Google continues sending its native lead notification emails; this endpoint does not send extra emails or fire website conversion events. See `integrations/google-apps-script/README.md` for deployment, field mapping and duplicate handling.

`LeadAttribution` captures the initial browser landing visit sitewide. First-party local storage preserves the first observed source and latest identifiable non-direct source within 30 days. The shared contact form attaches this data without adding a visible input. The server bounds the fields and derives a readable lead source for notification emails and the spreadsheet.

Google advertising click markers or explicit Google paid UTMs indicate Google Ads. Meta Ads requires explicit paid campaign tagging; `fbclid` or a Facebook referrer alone is labeled paid/organic unknown. Search-engine referrers indicate organic search as a best-effort inference. Blocked storage, stripped referrers, other devices, and untagged ads may remain unknown; these labels do not reproduce GA4's attribution model. Raw advertising click IDs, arbitrary URL parameters, and referrer query strings are not copied into lead records.

See `integrations/google-apps-script/README.md` for the coordinated deployment order and campaign-tag examples. Run `node --test scripts/test-contact-delivery.cjs scripts/test-lead-attribution.cjs scripts/test-google-ads-leads.cjs scripts/test-crm.cjs` for delivery, attribution and CRM regression tests.

### Email Notifications Using Resend

The [Resend API](https://resend.com/) sends a transactional notification email to the team after every valid submission. The direct API request supports an abort timeout; notification and spreadsheet-alert emails have separate idempotency keys.

* **From Address:** `contact@mouldingstl.com`.
* **To Addresses:** `tim@inlandtide.com`, `ryan@inlandtide.com`.
* **Reply-To:** The visitor's submitted email address, so the team can reply directly from their inbox.

## Environment Variables

The following environment variables must be configured in Vercel, or locally in a `.env.local` file, for the backend to function correctly:

| Variable Name | Description |
| :--- | :--- |
| `RESEND_API` | API key for the Resend account. Used to authenticate the Resend Node.js SDK. |
| `GOOGLE_SHEETS_WEBAPP_URL` | Full URL of the deployed Google Apps Script Webhook. |
| `GOOGLE_ADS_LEAD_WEBHOOK_KEY` | Production-only secret shared with Google Ads lead form delivery settings and the bound Apps Script property of the same name. Never commit it or expose it to browser code. |

## Getting Started Locally

If you are an AI or developer picking up this project:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/inlandtide/inlandtidewebsite.git
   cd inlandtidewebsite
   ```
2. **Install dependencies:**
   The project uses `pnpm`.
   ```bash
   pnpm install
   ```
3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the required variables listed above.
4. **Run the development server:**
   ```bash
   pnpm dev
   ```
5. **View the site:**
   Open `http://localhost:3000` in your browser.

---

*Document prepared for future development context.*
