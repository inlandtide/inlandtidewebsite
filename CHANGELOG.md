# Changelog

All notable changes to the Moulding Saint Louis website are recorded here. Any AI agent or developer pushing changes to this repository **must** add a brief entry to this file before committing.

---

## [2026-05-20]

### Added
- Added SEO foundations including page-specific metadata, canonical URLs, Open Graph/Twitter metadata, LocalBusiness JSON-LD, WebSite JSON-LD, Service JSON-LD, breadcrumb JSON-LD, sitemap generation, and robots.txt generation.
- Added a concise SEO implementation report based on available SimilarWeb analytics context.
- Added a live noindex SEO dashboard at `/seo-dashboard` to visualize the report findings, implemented SEO foundations, crawl/indexing links, and next actions.
- Updated browser favicon and touch icon assets to use the Moulding Saint Louis logo.
- Added a keyword rankings section to the SEO dashboard showing target keywords, target pages, and current unverified ranking status until Search Console or a rank tracker is connected.
- Replaced the numeric labels on the home page service tiles with service-specific line icons while preserving the hover inversion treatment.
- Replaced website placeholder imagery with selected assets from the Google Drive Photo Library while preserving the existing Contact page fireplace surround image.
- Replaced low-quality thumbnail-derived site photos with sharper high-resolution imagery and reduced the home page hero title/supporting copy by roughly 25%.
- Reworked the Luxury & Decorative Moulding service page `Best For` section as an editorial design test while leaving other service pages unchanged.
- Applied the editorial `Best For` design to all service pages with service-specific copy and replaced the repeated Next Step image with each service’s own quality image.
- Fixed Request a Consultation dropdown option readability by setting option text to Saint Louis Navy on a light background.
- Replaced the home page hero image with the uploaded high-quality interior moulding photo and optimized it for correct hero scaling.
- Updated the Window & Door Casing service hero with the uploaded high-quality casing photo and documented the forward-looking image quality standard.
- Updated the Luxury & Decorative Moulding service hero to use the uploaded high-quality grey panel moulding hallway photo instead of the prior `finishprimed.jpg` treatment.
- Replaced the second home page photo in the Experience section with the uploaded high-quality moulding lounge photo.
- Updated the Picture Frame Moulding service hero with the uploaded high-quality moulding fireplace photo.
- Updated the Crown Moulding service hero with the uploaded high-quality living room crown moulding photo.
- Updated the Gazebos & Pergolas service hero with the uploaded high-quality pergola photo.
- Updated the Wainscoting & Beadboard service hero with the uploaded high-quality bathroom beadboard photo.
- Updated the SEO dashboard keyword rankings section to show verified Google Search Console access for `mouldingstl.com` with current processing/no-query-data status.
- Added license-free placeholder images under `/public/images/placeholders/` for the hero, service tiles, service detail pages, gallery, about, and contact sections.
- Replaced the temporary coming-soon landing page with a full conversion-focused website using the new Moulding Saint Louis brand system.
- Added the new logo asset to `/public/moulding-saint-louis-logo.png` and updated the site to use Saint Louis Navy, Moulding Ivory, Antique Brass, Blue Charcoal, and Warm Stone.
- Added Cormorant Garamond and Zilla Slab as the primary brand fonts.
- Added a services hub and individual service pages for luxury and decorative moulding, picture frame moulding, crown moulding, wainscoting and beadboard, chair rail and picture rail, fireplace mantels and surrounds, window and door casing, and archways and entryways.
- Added About, Process, Gallery, and Contact pages with conversion-focused content and local ownership messaging for Tim Hebel and Ryan Hall.

### Changed
- Updated the home page hero headline to display only `Moulding` above `Saint Louis`, using Moulding Ivory for `Moulding` and Antique Brass for `Saint Louis`, in place of the former luxury wood details headline.
- Increased the home page hero supporting statement size and confirmed the small gold hero eyebrow above the main title is removed.
- Substantially increased the homepage hero brand title size so the stacked `Moulding` / `Saint Louis` mark is visibly larger.
- Updated the home page `Our Work` headline to `It's all in the details` and redesigned the service tiles into a cleaner, readable benefits-style grid.
- Removed pictures from the home page service tiles and added a new `Gazebos & Pergolas` service tile, service route, contact form option, and placeholder image asset.
- Applied the hover inversion effect to all home page service tiles so each uses the normal light tile style by default and switches to the Saint Louis Navy treatment on hover.
- Removed the second sentence from the home page `Our Work` intro copy so it now ends after the service-specialization statement.
- Added and then reverted the temporary `hello word` text before the home page hero supporting statement.
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
