# November 4, 2026 technical SEO handoff

This work implements the approved behind-the-scenes Moulding Saint Louis fixes from the November 4 SEO review. Visible copy, headings, address label/map link, image sources/crops, CSS dimensions, layout and colors remain unchanged. Contact/CRM delivery, attribution, GA4 and Meta tracking are unchanged. No live form submissions were used for testing.

## Changes

- Header/footer and ad-page logo `sizes` match their existing CSS height and the source image's 1600:1768 aspect ratio. Next.js can now offer small width-based image candidates instead of the large 1x/2x candidates implied by the intrinsic width. Intrinsic dimensions remain intact to preserve aspect ratio and layout stability.
- Main page heroes use `loading="eager"` and `fetchPriority="high"`, following the installed Next.js 16.2.6 guidance. The production response includes React-generated responsive preloads with high priority. No duplicate manual preload was added; the ad landing page's existing responsive picture behavior is preserved.
- JSON-LD uses the confirmed full street address `1750 Salzman Ave`, postal code `63133`, and the CKC entity ID `https://ckcwoodworks.com/#business` for both the parent company and commercial service provider. The separate visible address label and map link remain untouched; no price range or other business claims were added.
- Root metadata no longer supplies canonical or robots defaults. `pageMetadata()` and the explicit Commercial/Privacy metadata retain canonical/indexability for real pages. This leaves Next.js's existing 404 page with only noindex, without an inherited homepage canonical or positive Googlebot indexing directive. The ad landing page and SEO dashboard retain their existing noindex behavior.
- Sitemap edit dates are explicitly November 4 for the 16 marketing pages affected by the sitewide schema correction. These remain maintained source dates, never build timestamps.

## JavaScript review

The first-party interactive boundaries are already limited to mobile navigation, lead attribution and the contact form. No further low-risk startup reduction was identified. Delaying attribution could lose short-visit campaign data, and delaying form hydration could affect early submissions. No scripts were removed, delayed or changed, and no JavaScript performance gain is claimed from this work.

## Domain configuration

The coordinating task separately configured Vercel's project domain `www.mouldingstl.com` to redirect to `mouldingstl.com` with status 308. It verified root and deep-path requests, including query parameters, through the existing Cloudflare setup. The apex returns 200. No Cloudflare setting or repository redirect was needed. This configuration is outside the Git diff.

## Validation

- `pnpm build`: passed, including TypeScript and all generated routes, using Next.js 16.2.6.
- `pnpm exec eslint app scripts/test-technical-seo.mjs`: passed.
- Existing contact delivery, attribution, Google Ads lead and CRM tests: 38 passed using mocks/in-memory data only.
- New `scripts/test-technical-seo.mjs`: 26 tests passed against the local production server. It checks all 16 sitemap pages, canonical/indexing directives, schema identity, high-priority hero discovery/preloads, small responsive logo candidates, privacy indexability, ad/dashboard exclusions, and true noindex 404 responses for unmatched, unknown-service and archived-service URLs.
- Full `pnpm lint` remains blocked by 23 pre-existing `@typescript-eslint/no-require-imports` violations in the four unchanged CommonJS regression test files (`test-contact-delivery.cjs`, `test-lead-attribution.cjs`, `test-google-ads-leads.cjs`, `test-crm.cjs`). No lint configuration was weakened for this change.

To repeat the read-only HTTP checks after building and starting the app, run in PowerShell:

```powershell
$env:SEO_TEST_ORIGIN = 'http://127.0.0.1:3000'
node --test scripts/test-technical-seo.mjs
```

The same command can target the production origin after deployment. It only fetches pages and the sitemap; it does not submit forms or send leads. Search Console submission/inspection and deployment verification are handled by the coordinating task. These changes improve delivery and metadata correctness; they do not guarantee indexing or a specific field Core Web Vitals score.
