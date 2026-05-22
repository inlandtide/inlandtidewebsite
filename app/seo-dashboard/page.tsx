import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "../components/SiteChrome";
import { siteUrl } from "../data/seo";

export const metadata: Metadata = {
  title: "SEO Dashboard",
  description:
    "Internal SEO dashboard for tracking Moulding Saint Louis search visibility foundations, crawl readiness, and next actions.",
  robots: {
    index: false,
    follow: false,
  },
};

const baselineMetrics = [
  {
    label: "Public traffic baseline",
    value: "0.0",
    detail: "SimilarWeb mobile visits reported across tracked channels for Feb–Apr 2026.",
  },
  {
    label: "Sitemap coverage",
    value: "14",
    detail: "Marketing URLs submitted through the generated sitemap, excluding this internal dashboard.",
  },
  {
    label: "SEO foundations",
    value: "8",
    detail: "Core technical SEO items implemented and ready for crawler discovery.",
  },
  {
    label: "Primary stage",
    value: "Baseline",
    detail: "The site should be measured as a new local SEO property until Search Console data matures.",
  },
];

const trafficSources = [
  "Organic Search",
  "Direct",
  "Referrals",
  "Social",
  "Mail",
  "Display Ads",
];

const seoFoundations = [
  {
    title: "Page-specific metadata",
    status: "Implemented",
    copy: "Home, services, service detail pages, about, gallery, and contact now use focused titles, descriptions, canonical URLs, and social metadata.",
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
    copy: "Breadcrumb JSON-LD clarifies page hierarchy for the homepage, services hub, service pages, about, gallery, and contact pages.",
  },
  {
    title: "Sitemap generation",
    status: "Implemented",
    copy: "The live sitemap lists the homepage, services hub, supporting pages, and all individual service pages.",
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
    copy: "Metadata references finish carpentry, luxury moulding, wainscoting, casing, mantels, gazebos, pergolas, and St. Louis search intent.",
  },
];

const nextActions = [
  "Submit the live sitemap in Google Search Console after deployment finishes.",
  "Request indexing for the homepage, services hub, and top service pages.",
  "Monitor impressions, clicks, average position, and indexed page count weekly.",
  "Replace placeholder imagery with original project photography as soon as the content library is ready.",
  "Add service-area proof, testimonials, FAQs, and project examples as real customer content becomes available.",
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
                This dashboard turns the SEO implementation report into a live tracking page for crawl readiness, baseline analytics, completed technical work, and next actions for `mouldingstl.com`.
              </p>
            </div>
            <div className="border border-[#B4904E]/45 bg-[#FEFAF1]/5 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B4904E]">Domain Reviewed</p>
              <p className="mt-4 font-heading text-4xl font-semibold">mouldingstl.com</p>
              <p className="mt-4 leading-7 text-[#FEFAF1]/72">
                SimilarWeb data is currently limited, so the current priority is foundational local SEO, indexing, and Search Console measurement.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-xl grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {baselineMetrics.map((metric) => (
              <div key={metric.label} className="border border-[#D6D2C6] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B4904E]">{metric.label}</p>
                <p className="mt-5 font-heading text-5xl font-semibold text-[#081828]">{metric.value}</p>
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
                SimilarWeb shows a zero-traffic baseline for public channel data.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#2E404E]">
                The report found no measurable public rank, traffic, unique visitor, or bounce-rate data. The successful mobile traffic source endpoint showed `0.0` visits across tracked channels for February through April 2026, which makes this a clean baseline for future organic search growth.
              </p>
            </div>
            <div className="border border-[#D6D2C6] bg-white p-7 shadow-sm">
              <div className="grid gap-5">
                {trafficSources.map((source) => (
                  <div key={source}>
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold text-[#081828]">{source}</p>
                      <p className="text-sm font-semibold text-[#B4904E]">0.0 visits</p>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden bg-[#D6D2C6]/65">
                      <div className="h-full w-[2%] bg-[#B4904E]" />
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
                Once the sitemap is submitted and Google begins collecting data, this dashboard can be expanded to show real Search Console metrics such as impressions, clicks, click-through rate, indexed pages, and top local queries.
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
