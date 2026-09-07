import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "../components/SiteChrome";
import { siteUrl } from "../data/seo";
import sitemap from "../sitemap";

export const metadata: Metadata = {
  title: "SEO Dashboard",
  description:
    "Internal SEO dashboard for tracking Moulding Saint Louis search visibility foundations, crawl readiness, and next actions.",
  alternates: { canonical: "/seo-dashboard" },
  robots: {
    index: false,
    follow: false,
  },
};

const baselineMetrics = [
  {
    label: "Public traffic baseline",
    value: "Unavailable",
    detail: "The historical SimilarWeb report had insufficient data. Missing estimates do not mean zero visitors.",
  },
  {
    label: "Sitemap coverage",
    value: String(sitemap().length),
    detail: "Marketing URLs in the generated sitemap. This count does not confirm submission or indexing.",
  },
  {
    label: "SEO foundations",
    value: "8",
    detail: "Core technical SEO items implemented and ready for crawler discovery.",
  },
  {
    label: "Dashboard data feed",
    value: "Manual",
    detail: "This page has no live Search Console or Analytics connection. Open those tools for current performance.",
  },
];

const trackedKeywords = [
  { keyword: "moulding saint louis", intent: "Brand", page: "/" },
  { keyword: "st louis moulding", intent: "Local service", page: "/services/luxury-decorative-moulding" },
  { keyword: "finish carpentry st louis", intent: "Local service", page: "/services" },
  { keyword: "custom wainscoting st louis", intent: "Service-specific", page: "/services/wainscoting-beadboard" },
  { keyword: "crown moulding installation st louis", intent: "Service-specific", page: "/services/crown-moulding" },
  { keyword: "picture frame moulding installation st louis", intent: "Service-specific", page: "/services/picture-frame-moulding" },
  { keyword: "fireplace mantels st louis", intent: "Service-specific", page: "/services/fireplace-mantels-surrounds" },
];


const seoFoundations = [
  {
    title: "Page-specific metadata",
    status: "Implemented",
    copy: "Home, services, service detail pages, about, and contact now use focused titles, descriptions, canonical URLs, and social metadata.",
  },
  {
    title: "Local business schema",
    status: "Implemented",
    copy: "The site includes JSON-LD for Moulding Saint Louis as a local home and construction business serving the St. Louis area.",
  },
  {
    title: "Service schema",
    status: "Implemented",
    copy: "Each service page includes structured data that identifies the service type, provider, URL, and St. Louis service area.",
  },
  {
    title: "Breadcrumb schema",
    status: "Implemented",
    copy: "Breadcrumb JSON-LD clarifies page hierarchy for the homepage, services hub, service pages, about, and contact pages.",
  },
  {
    title: "Sitemap generation",
    status: "Implemented",
    copy: "The live sitemap lists the homepage, services hub, supporting pages, and all active individual service pages.",
  },
  {
    title: "Robots file",
    status: "Implemented",
    copy: "The robots file allows crawler access and points search engines to the live sitemap.",
  },
  {
    title: "Open Graph & Twitter cards",
    status: "Implemented",
    copy: "Social metadata is in place so shared links have stronger titles, descriptions, and preview images.",
  },
  {
    title: "Local keyword focus",
    status: "Implemented",
    copy: "Metadata references finish carpentry, luxury moulding, wainscoting, casing, mantels, archways, and St. Louis search intent.",
  },
];

const nextActions = [
  "Confirm access to the mouldingstl.com domain property in Google Search Console and check the sitemap submission status.",
  "Inspect the homepage and priority service URLs for indexing and Google-selected canonicals before requesting a recrawl.",
  "Monitor impressions, clicks, average position, and indexed page count weekly.",
  "Publish original project stories with permission, describing the location, scope, materials, and finished details.",
  "Keep business details consistent and add genuine customer reviews and testimonials as they become available.",
];

const routeLinks = [
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "Robots", href: "/robots.txt" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function SeoDashboardPage() {
  return (
    <PageShell>
      <main className="bg-[#FEFAF1]">
        <section className="bg-[#081828] py-24 text-[#FEFAF1] sm:py-32">
          <div className="container-xl grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#B4904E]">SEO Dashboard</p>
              <h1 className="mt-5 font-heading text-6xl font-semibold leading-[0.92] text-balance sm:text-8xl">
                Search visibility foundations for Moulding Saint Louis.
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-[#FEFAF1]/78">
                A manually maintained SEO checklist for mouldingstl.com. This page documents site foundations and target queries; it does not fetch live rankings, traffic, or indexing data.
              </p>
            </div>
            <div className="border border-[#B4904E]/45 bg-[#FEFAF1]/5 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B4904E]">Domain Reviewed</p>
              <p className="mt-4 font-heading text-4xl font-semibold">mouldingstl.com</p>
              <p className="mt-4 leading-7 text-[#FEFAF1]/72">
                Last checklist review: September 7, 2026. Use Search Console for Google Search performance and Analytics for activity on the website.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-xl grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {baselineMetrics.map((metric) => (
              <div key={metric.label} className="border border-[#D6D2C6] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B4904E]">{metric.label}</p>
                <p className="mt-5 break-words font-heading text-4xl font-semibold text-[#081828]">{metric.value}</p>
                <p className="mt-4 leading-7 text-[#2E404E]">{metric.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#D6D2C6]/35 py-20">
          <div className="container-xl grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Analytics Baseline</p>
              <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-[#081828] text-balance">
                Measure traffic in the tools that collect it.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#2E404E]">
                The earlier SimilarWeb report lacked enough public data for a useful estimate. It did not establish a zero-traffic baseline. Search Console reports search impressions, clicks, click-through rate and average position; Analytics reports visits and on-site events. Access to either tool does not automatically connect it to this page.
              </p>
            </div>
            <div className="border border-[#D6D2C6] bg-white p-7 shadow-sm">
              <h3 className="font-heading text-3xl font-semibold text-[#081828]">Open your measurement tools</h3>
              <div className="mt-6 flex flex-col gap-5 text-[#081828]">
                <a href="https://search.google.com/search-console" className="underline underline-offset-4">Google Search Console</a>
                <a href="https://analytics.google.com" className="underline underline-offset-4">Google Analytics</a>
              </div>
              <p className="mt-6 leading-7 text-[#2E404E]">Compare consistent date ranges and separate branded searches from service searches. Average position varies by query, device, location and date; it is not a universal fixed ranking.</p>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container-xl grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Keyword Rankings</p>
              <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-[#081828] text-balance">
                Target queries to monitor in Search Console.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#2E404E]">
                These are editorial targets, not measured rankings. Review the actual Queries and Pages reports to see which searches bring visitors and which URL Google shows. Include both “moulding” and “molding” spellings, plus installation and local service queries.
              </p>
              <div className="mt-8 border border-[#D6D2C6] bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B4904E]">Ranking Data Status</p>
                <p className="mt-3 font-heading text-4xl font-semibold text-[#081828]">Not measured here</p>
                <p className="mt-3 leading-7 text-[#2E404E]">
                  No ranking feed is configured. The previous “Connected / processing” labels were static text from an earlier review and did not update automatically. Any future snapshot should include its source, date range and filters.
                </p>
              </div>
            </div>
            <div className="overflow-hidden border border-[#D6D2C6] bg-white shadow-sm">
              <div className="grid grid-cols-[1.2fr_0.85fr_0.85fr] bg-[#081828] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#FEFAF1]">
                <p>Keyword</p>
                <p>Target Page</p>
                <p>Current Status</p>
              </div>
              <div className="divide-y divide-[#D6D2C6]">
                {trackedKeywords.map((item) => (
                  <div key={item.keyword} className="grid gap-3 px-5 py-5 md:grid-cols-[1.2fr_0.85fr_0.85fr] md:items-center">
                    <div>
                      <p className="font-semibold text-[#081828]">{item.keyword}</p>
                      <p className="mt-1 text-sm text-[#2E404E]/75">{item.intent}</p>
                    </div>
                    <Link href={item.page} className="text-sm font-semibold text-[#B4904E] underline-offset-4 hover:underline">
                      {item.page}
                    </Link>
                    <div>
                      <p className="text-sm font-semibold text-[#081828]">Not measured here</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#2E404E]/65">Target query</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container-xl">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Implemented Foundations</p>
              <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-[#081828] text-balance sm:text-6xl">
                The technical SEO foundation is now in place.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {seoFoundations.map((item, index) => (
                <div key={item.title} className="border border-[#D6D2C6] bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-heading text-4xl font-semibold text-[#B4904E]">0{index + 1}</p>
                    <span className="border border-[#B4904E]/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#B4904E]">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-3xl font-semibold leading-tight text-[#081828]">{item.title}</h3>
                  <p className="mt-4 leading-7 text-[#2E404E]">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#081828] py-20 text-[#FEFAF1]">
          <div className="container-xl grid gap-12 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Crawl & Indexing</p>
              <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-balance">
                Key URLs are ready for discovery.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#FEFAF1]/76">
                Use these live links to confirm crawler files and priority site sections after deployment. The dashboard itself is marked `noindex` because it is an internal tracking page rather than a marketing page.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {routeLinks.map((link) => (
                <Link key={link.href} href={link.href} className="border border-[#B4904E]/45 p-6 transition hover:bg-[#B4904E] hover:text-[#081828]">
                  <p className="font-heading text-3xl font-semibold">{link.label}</p>
                  <p className="mt-3 text-sm text-current/75">{siteUrl}{link.href === "/sitemap.xml" || link.href === "/robots.txt" ? link.href : link.href}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container-xl grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Next Actions</p>
              <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-[#081828] text-balance">
                The next step is measurement, not more guesswork.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#2E404E]">
                Use the linked tools to check actual performance. An authenticated integration or a dated manual report would be needed to show current metrics here; this checklist does not refresh them automatically.
              </p>
            </div>
            <div className="space-y-4">
              {nextActions.map((action, index) => (
                <div key={action} className="flex gap-5 border border-[#D6D2C6] bg-white p-5 shadow-sm">
                  <p className="font-heading text-3xl font-semibold text-[#B4904E]">0{index + 1}</p>
                  <p className="leading-7 text-[#2E404E]">{action}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
