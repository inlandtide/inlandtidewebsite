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
* **Styling:** Tailwind CSS v4 plus raw CSS variables in `app/globals.css`.
* **Fonts:** Cormorant Garamond for headlines and Zilla Slab for subtext and supporting content.
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

The primary logo file currently used by the redesigned site is stored at:

```text
/public/moulding-saint-louis-logo.png
```

The current design also uses license-free placeholder imagery committed directly to the repository at:

```text
/public/images/placeholders/
```

These placeholder images support the image-forward home page, services hub, individual service pages, gallery, about page, and contact page until the permanent Moulding Saint Louis content library is ready.

## Site Structure

The website is structured as a conversion-focused, multi-page site for a luxury finish carpentry and architectural wood finishes company. The current visual direction is immersive and image-forward, with large editorial hero sections, service photography placeholders, and home page service tiles that link to dedicated individual service pages.

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
| Gazebos & Pergolas | `/services/gazebos-pergolas` | Dedicated page for custom outdoor wood structures and shade features. |
| About | `/about` | Local ownership and company values page for Tim Hebel and Ryan Hall. |
| Gallery | `/gallery` | Future-ready inspiration and portfolio structure. |
| Contact | `/contact` | Dedicated consultation request page. |

## Business Positioning

Moulding Saint Louis focuses on high-end moulding, finish carpentry, and quality wood products for St. Louis homes. The company is independently owned and operated in St. Louis by Tim Hebel and Ryan Hall. Wood is the primary specialty, but similar or requested materials may be discussed when they fit the design, performance needs, and finish expectations of the project.

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

A SimilarWeb analytics check found limited public traffic data for `mouldingstl.com`, so SEO work should be treated as foundational local SEO. Future measurement should prioritize Google Search Console after the site has been crawled and indexed.

## Integrations & Data Flow

The contact form uses a secure Next.js serverless API route at `app/api/contact/route.ts`. The form gathers customer details and enriches the message with project type, project location, and desired timeline, while preserving the backend payload shape used by the existing Google Sheets integration.

The execution order on every form submission is:

1. **Validate** — Server validates that `name`, `email`, and `message` are present and that the email address is well formed.
2. **Attempt Google Sheets save** — The backend tries to POST the lead to Google Sheets. This step is non-blocking: if it fails for any reason, execution continues and the failure is noted internally.
3. **Always send notification email** — The Resend email fires regardless of whether Google Sheets succeeded. If Sheets failed, the email subject is prefixed with `⚠️ [SHEETS FAILED]` and a red alert banner is injected at the top of the email body, prompting the team to check the integration immediately.

This design guarantees that no inbound lead is silently lost due to a Sheets outage.

### Google Sheets Integration

Form data is sent to a Google Apps Script Webhook as a JSON POST request.

* **Payload keys:** `name`, `email`, `phone`, `message`.
* **Requirement:** The Apps Script must be deployed with "Execute as: Me" and "Who has access: Anyone" — otherwise Vercel's server-to-server request will receive a 403.

### Email Notifications Using Resend

The [Resend Node.js SDK](https://resend.com/) sends a transactional notification email to the team after every valid submission.

* **From Address:** `contact@mouldingstl.com`.
* **To Addresses:** `tim@inlandtide.com`, `ryan@inlandtide.com`.
* **Reply-To:** The visitor's submitted email address, so the team can reply directly from their inbox.

## Environment Variables

The following environment variables must be configured in Vercel, or locally in a `.env.local` file, for the backend to function correctly:

| Variable Name | Description |
| :--- | :--- |
| `RESEND_API` | API key for the Resend account. Used to authenticate the Resend Node.js SDK. |
| `GOOGLE_SHEETS_WEBAPP_URL` | Full URL of the deployed Google Apps Script Webhook. |

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
