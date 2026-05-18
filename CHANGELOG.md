# Changelog

All notable changes to the Moulding Saint Louis website are recorded here. Any AI agent or developer pushing changes to this repository **must** add a brief entry to this file before committing.

---

## [2026-05-18]

### Added
- Added a temporary `hello world` test phrase under the landing page contact form.

## [2026-05-16]

### Added
- Initial Next.js 16 (App Router) project scaffold with TypeScript and Tailwind CSS.
- Coming Soon landing page using brand colors (Deep Espresso, Antique Gold, Aged Cream) and Google Fonts (Playfair Display, Lora).
- Moulding Saint Louis combined logo added to `/public/logo.png`.
- Contact form with fields: name, email, phone, message.
- Serverless API route (`/app/api/contact/route.ts`) to handle form submissions server-side.
- Resend integration: sends transactional notification email to `tim@inlandtide.com` and `ryan@inlandtide.com` on every submission, with the visitor's email mapped to `Reply-To`.
- Google Sheets integration: POSTs lead data to a Google Apps Script Webhook (`GOOGLE_SHEETS_WEBAPP_URL`) before sending the notification email.
- Updated email-always-fires logic: Google Sheets save is now non-blocking. If Sheets fails, the notification email still sends and includes a bold red alert banner in the subject and body warning the team to check the integration.
- `README.md` with full architecture, integration, and environment variable documentation.
