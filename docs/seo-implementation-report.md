# Moulding Saint Louis SEO Implementation Report

Prepared by **Manus AI**  
Domain reviewed: **mouldingstl.com**  
Date: **May 22, 2026**

## Analytics Context

The available SimilarWeb dataset shows that `mouldingstl.com` is not yet reporting enough measurable public traffic for most traffic, rank, engagement, and geography endpoints. The only successful endpoint returned mobile traffic source rows for February through April 2026, but all reported visits were `0.0` across organic search, social, mail, display ads, direct, and referrals. In practical SEO terms, this means the site should be treated as an early-stage local SEO build where the highest-value improvements are technical crawlability, page-specific metadata, service-page relevance, local business schema, and clear indexable service URLs.

| Analytics Area | Result | SEO Implication |
|---|---:|---|
| Global rank | Data not found | The domain is likely too new or too low-volume for public rank measurement. |
| Total visits | Data not found | SEO changes should focus on foundational discovery and indexing. |
| Unique visitors | Data not found | Search Console should be used later for query-level measurement. |
| Bounce rate | Data not found | Engagement optimization cannot yet be measured externally. |
| Mobile traffic sources | Success, but all channels reported `0.0` visits | Organic search visibility should be built from the ground up. |
| Country traffic | Not retrieved because of API credit limitation | No geography breakdown was available from SimilarWeb during this run. |

## SEO Changes Implemented

The website was updated with page-specific title tags, meta descriptions, canonical URLs, Open Graph metadata, Twitter card metadata, structured data, sitemap generation, and robots instructions. These changes align with Google’s structured data guidance, which explains that structured data helps Google understand page content, and with Google’s LocalBusiness documentation, which recommends using structured data to provide business details. Google recommends JSON-LD as the easiest structured data format to implement and maintain at scale.[1] [2]

| Area | Implementation |
|---|---|
| Sitewide metadata | Expanded default title, description, keywords, Open Graph, Twitter card, canonical, and robots metadata in `app/layout.tsx`. |
| Local business schema | Added JSON-LD for `HomeAndConstructionBusiness`, including service offerings, founders, service area, logo, and description. |
| Website schema | Added `WebSite` JSON-LD to identify the website and publisher relationship. |
| Breadcrumb schema | Added breadcrumb JSON-LD to the home, services, service detail, about, and contact pages. |
| Service schema | Added page-specific `Service` JSON-LD for each service page. |
| Sitemap | Added `app/sitemap.ts` covering the homepage, services hub, all individual service pages, about, and contact. |
| Robots | Added `app/robots.ts` allowing crawl access and pointing crawlers to `https://mouldingstl.com/sitemap.xml`. |
| Page metadata | Added stronger local keyword-focused titles and descriptions for home, services, service pages, about, and contact. |

## References

[1]: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data "Google Search Central: Introduction to structured data markup"
[2]: https://developers.google.com/search/docs/appearance/structured-data/local-business "Google Search Central: Local Business structured data"
[3]: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap "Next.js: sitemap.xml metadata file"
[4]: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots "Next.js: robots.txt metadata file"
