# Changelog

All notable changes to the Moulding Saint Louis website are recorded here. Any AI agent or developer pushing changes to this repository **must** add a brief entry to this file before committing.

---

## [2026-05-20]

### Added
- Added license-free placeholder images under `/public/images/placeholders/` for the hero, service tiles, service detail pages, gallery, about, and contact sections.
- Replaced the temporary coming-soon landing page with a full conversion-focused website using the new Moulding Saint Louis brand system.
- Added the new logo asset to `/public/moulding-saint-louis-logo.png` and updated the site to use Saint Louis Navy, Moulding Ivory, Antique Brass, Blue Charcoal, and Warm Stone.
- Added Cormorant Garamond and Zilla Slab as the primary brand fonts.
- Added a services hub and individual service pages for luxury and decorative moulding, picture frame moulding, crown moulding, wainscoting and beadboard, chair rail and picture rail, fireplace mantels and surrounds, window and door casing, and archways and entryways.
- Added About, Process, Gallery, and Contact pages with conversion-focused content and local ownership messaging for Tim Hebel and Ryan Hall.

### Changed
- Updated the home page hero headline to display only `Moulding` above `Saint Louis`, using Moulding Ivory for `Moulding` and Antique Brass for `Saint Louis`, in place of the former luxury wood details headline.
- Refreshed the visual design with a more immersive, image-forward editorial layout while preserving the approved Moulding Saint Louis colors, fonts, sitemap, and service structure.
- Updated the contact form with project type, location, timeline, and customer-experience-focused messaging while preserving the existing backend payload shape.
- Updated contact notification email styling to match the new brand palette and safely escape submitted form content.
- Added a Services dropdown menu in the desktop navigation with links to every individual service page.
- Removed the standalone Process page and its direct navigation links for now.

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
