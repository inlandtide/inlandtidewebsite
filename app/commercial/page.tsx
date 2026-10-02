import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import { PageShell } from "../components/SiteChrome";
import { breadcrumbSchema, commercialWoodworkSchema, siteName, siteUrl } from "../data/seo";

const capabilities = [
  {
    title: "Custom cabinetry & casework",
    body: "Purpose-built commercial cabinetry, casework, fixtures, and architectural components for spaces that need a precise fit and a durable finish.",
  },
  {
    title: "Doors & specialty runs",
    body: "Commercial doors, custom components, and specialty production runs shaped around the details, schedule, and repeatability your project demands.",
  },
  {
    title: "Capacity for complex work",
    body: "A union shop with the equipment, bench space, and experienced hands to take on substantial commercial woodwork from start to finish.",
  },
];

const shopPhotos = [
  {
    src: "/images/ckc-woodworks/ckc-woodworks-shop-overview.jpg",
    alt: "Overview of the CKC Woodworks commercial shop floor in St. Louis",
  },
  {
    src: "/images/ckc-woodworks/ckc-woodworks-cabinetry-production.jpg",
    alt: "CKC Woodworks team working among commercial cabinetry and millwork equipment",
  },
  {
    src: "/images/ckc-woodworks/ckc-woodworks-custom-casework.jpg",
    alt: "Custom casework in production at the CKC Woodworks shop",
  },
  {
    src: "/images/ckc-woodworks/ckc-woodworks-shop-capacity-01.jpg",
    alt: "Wide view of CKC Woodworks commercial production capacity",
  },
  {
    src: "/images/ckc-woodworks/ckc-woodworks-shop-capacity-02.jpg",
    alt: "CKC Woodworks shop floor with woodworking equipment and material storage",
  },
  {
    src: "/images/ckc-woodworks/ckc-woodworks-shop-capacity-03.jpg",
    alt: "CKC Woodworks fabrication area with worktables and specialty millwork",
  },
];

export const metadata: Metadata = {
  title: "Commercial Manufacturing & Woodwork in St. Louis",
  description:
    "Commercial cabinetry, casework, doors, specialty runs, and architectural woodwork in St. Louis through CKC Woodworks, a union shop with more than 40 years of experience.",
  alternates: { canonical: "/commercial" },
  openGraph: {
    title: "Commercial Manufacturing & Woodwork in St. Louis",
    description:
      "A union commercial woodshop for custom cabinetry, casework, doors, specialty runs, and architectural millwork in St. Louis.",
    url: `${siteUrl}/commercial`,
    siteName,
    images: [
      {
        url: `${siteUrl}/images/ckc-woodworks/ckc-woodworks-cnc-panel-processing.jpg`,
        width: 2048,
        height: 1536,
        alt: "CKC Woodworks commercial panel-processing equipment in St. Louis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Manufacturing & Woodwork in St. Louis",
    description:
      "Commercial cabinetry, casework, doors, specialty runs, and architectural woodwork through CKC Woodworks.",
    images: [`${siteUrl}/images/ckc-woodworks/ckc-woodworks-cnc-panel-processing.jpg`],
  },
};

export default function CommercialPage() {
  return (
    <PageShell>
      <main className="bg-[#FEFAF1]">
        <JsonLd data={commercialWoodworkSchema} />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Commercial Manufacturing", url: `${siteUrl}/commercial` },
          ])}
        />

        <section className="overflow-hidden bg-[#081828] text-[#FEFAF1]">
          <div className="container-xl grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-28">
            <div>
              <nav aria-label="Breadcrumb" className="text-sm text-[#FEFAF1]/75">
                <ol className="flex flex-wrap gap-2">
                  <li>
                    <Link href="/" className="underline underline-offset-4 transition hover:text-[#B4904E]">
                      Home
                    </Link>
                  </li>
                  <li aria-current="page"><span aria-hidden="true">/ </span>Commercial Manufacturing</li>
                </ol>
              </nav>
              <p className="mt-10 text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">CKC Woodworks</p>
              <h1 className="mt-5 max-w-4xl font-heading text-6xl font-semibold leading-[0.92] text-balance sm:text-7xl lg:text-8xl">
                Commercial manufacturing built for serious woodwork.
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-9 text-[#FEFAF1]/78">
                Moulding Saint Louis now brings the commercial capability of CKC Woodworks to St. Louis projects that demand custom cabinetry, casework, doors, specialty runs, and architectural woodwork done right.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://ckcwoodworks.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#081828] transition hover:bg-transparent hover:text-[#B4904E]"
                >
                  Visit CKC Woodworks <span aria-hidden="true">↗</span>
                </a>
                <Link
                  href="#capabilities"
                  className="inline-flex items-center justify-center border border-[#FEFAF1]/50 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#FEFAF1] transition hover:border-[#B4904E] hover:text-[#B4904E]"
                >
                  Explore capabilities
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden border border-[#B4904E]/45 bg-[#081828] shadow-2xl">
              <Image
                src="/images/ckc-woodworks/ckc-woodworks-cnc-panel-processing.jpg"
                alt="CKC Woodworks commercial panel-processing equipment in St. Louis"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 border-[10px] border-[#081828]/25" />
              <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(180deg,transparent,rgba(8,24,40,0.92))] px-7 pb-6 pt-20">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B4904E]">CKC Woodworks</p>
                <p className="mt-2 font-heading text-3xl font-semibold text-[#FEFAF1]">A commercial shop built for serious work.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="capabilities" className="scroll-mt-28 py-24 sm:py-32">
          <div className="container-xl">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Commercial capability</p>
                <h2 className="mt-5 font-heading text-5xl font-semibold leading-[0.98] text-[#081828] text-balance sm:text-7xl">
                  A union shop with more than 40 years of experience.
                </h2>
              </div>
              <p className="max-w-3xl text-lg leading-8 text-[#2E404E]">
                CKC Woodworks adds established commercial shop capacity to the Moulding Saint Louis family. From a one-of-a-kind built-in to demanding casework, doors, and specialty production, the work is backed by decades of commercial woodworking experience and a union team ready for the details that matter.
              </p>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {capabilities.map((capability, index) => (
                <article key={capability.title} className="border border-[#D6D2C6] bg-white p-7 shadow-sm">
                  <p className="font-heading text-5xl font-semibold text-[#B4904E]">0{index + 1}</p>
                  <h3 className="mt-6 font-heading text-3xl font-semibold leading-tight text-[#081828]">{capability.title}</h3>
                  <p className="mt-4 leading-7 text-[#2E404E]">{capability.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#D6D2C6]/45 py-24 sm:py-32">
          <div className="container-xl grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden border border-[#B4904E]/40 bg-[#081828]">
              <Image
                src="/images/ckc-woodworks/ckc-woodworks-custom-casework.jpg"
                alt="Custom commercial casework in production at CKC Woodworks"
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">CKC Woodworks</p>
              <h2 className="mt-5 font-heading text-5xl font-semibold leading-[0.98] text-[#081828] text-balance sm:text-6xl">
                Commercial roots. The same craftsmanship at home.
              </h2>
              <p className="mt-7 text-lg leading-8 text-[#2E404E]">
                CKC Woodworks is a St. Louis commercial woodshop with a long history of bringing custom builds from plans to production. Now part of Moulding Saint Louis, CKC remains dedicated to the commercial work that calls for scale, precision, coordination, and craft.
              </p>
              <p className="mt-5 text-lg leading-8 text-[#2E404E]">
                That capability also means Moulding Saint Louis can now bring the same level of craftsmanship to residential homes: custom casing, cabinetry, doors, built-ins, specialty trim, and other wood details made to fit the home and the way it is lived in.
              </p>
              <a
                href="https://ckcwoodworks.com/"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-3 border-b border-[#B4904E] pb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#081828] transition hover:text-[#B4904E]"
              >
                Learn more at CKCWoodworks.com <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#081828] py-24 text-[#FEFAF1] sm:py-32">
          <div className="container-xl">
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Inside the shop</p>
                <h2 className="mt-5 font-heading text-5xl font-semibold leading-[0.98] text-balance sm:text-6xl">
                  Built to meet the demands of commercial woodwork.
                </h2>
              </div>
              <p className="max-w-md leading-7 text-[#FEFAF1]/72">The production floor, equipment, and bench space behind the work.</p>
            </div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shopPhotos.map((photo) => (
                <div key={photo.src} className="relative aspect-[4/3] overflow-hidden border border-[#B4904E]/35 bg-[#2E404E]">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw" className="object-cover transition duration-500 hover:scale-[1.025]" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FEFAF1] py-24 sm:py-28">
          <div className="container-xl border border-[#B4904E]/45 bg-white px-7 py-12 shadow-sm sm:px-12 sm:py-14">
            <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Commercial projects</p>
                <h2 className="mt-5 max-w-3xl font-heading text-5xl font-semibold leading-[0.98] text-[#081828] text-balance sm:text-6xl">
                  Bring the next commercial woodwork project to CKC.
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-[#2E404E]">
                  Visit CKC Woodworks to begin a conversation about custom cabinetry, casework, doors, specialty fabrication, or another commercial woodwork need.
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:items-end">
                <a
                  href="https://ckcwoodworks.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full justify-center gap-3 border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#081828] transition hover:bg-[#081828] hover:text-[#B4904E] lg:w-auto"
                >
                  Visit CKC Woodworks <span aria-hidden="true">↗</span>
                </a>
                <a href="tel:+13148180815" className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#081828] underline decoration-[#B4904E] decoration-2 underline-offset-4 transition hover:text-[#B4904E]">
                  Or call Moulding Saint Louis: (314) 818-0815
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
