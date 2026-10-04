import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import { PageShell } from "../components/SiteChrome";
import { businessAddressLabel, businessAddressMapUrl } from "../data/business";
import { breadcrumbSchema, siteUrl } from "../data/seo";

export const metadata: Metadata = {
  title: { absolute: "About Moulding Saint Louis" },
  description:
    "As the residential arm of CKC Woodworks, Moulding Saint Louis brings commercial architectural millwork capabilities to custom cabinetry, built-ins, and finish carpentry in St. Louis.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Moulding Saint Louis",
    description:
      "The residential arm of CKC Woodworks, bringing full commercial architectural millwork shop capability to finish carpentry, custom cabinetry, and architectural woodwork for St. Louis homes.",
    url: `${siteUrl}/about`,
  },
};

const values = [
  {
    title: "Locally owned, personally invested",
    body: "A St. Louis team that takes ownership of the conversation, the workmanship, and the finished experience.",
  },
  {
    title: "Spaces made to work together",
    body: "We connect trim, cabinetry, storage, openings, and finishes so a room feels complete rather than collected.",
  },
  {
    title: "A deeper manufacturing bench",
    body: "Our CKC Woodworks commercial woodshop brings skilled craftspeople, dedicated equipment, and more than 40 years of woodworking experience to every project.",
  },
  {
    title: "Clear care from start to finish",
    body: "Thoughtful planning, direct communication, and respectful installation are part of the craftsmanship.",
  },
];

const woodshopViews = [
  {
    src: "/images/ckc-woodworks/ckc-woodworks-shop-capacity-01.jpg",
    alt: "Elevated overview of CKC Woodworks custom manufacturing floor in St. Louis",
    label: "Aerial shop view",
  },
  {
    src: "/images/ckc-woodworks/ckc-woodworks-shop-capacity-02.jpg",
    alt: "Elevated view of CKC Woodworks material storage and manufacturing equipment",
    label: "Manufacturing capacity",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <main className="bg-[#FEFAF1]">
        <JsonLd data={breadcrumbSchema([{ name: "Home", url: siteUrl }, { name: "About", url: `${siteUrl}/about` }])} />

        <section className="overflow-hidden bg-[#081828] py-20 text-[#FEFAF1] sm:py-28 lg:py-32">
          <div className="container-xl grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#B4904E]">About Moulding Saint Louis</p>
              <h1 className="mt-5 max-w-5xl font-heading text-6xl font-semibold leading-[0.92] text-balance sm:text-8xl">
                Crafted to bring a space together.
              </h1>
              <div className="mt-8 max-w-2xl space-y-5 text-lg leading-8 text-[#FEFAF1]/78">
                <p>
                  As the residential arm of CKC Woodworks, Moulding Saint Louis brings thoughtful finish carpentry, custom wood details, and a customer experience built around care to the places people call home.
                </p>
                <p>
                  Your project benefits from the equipment, skilled craftspeople, and production capacity of a full commercial architectural millwork shop. Custom cabinetry, casework, built-ins, doors, casing, and specialty woodwork can be planned and crafted together as one complete story.
                </p>
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/services/custom-cabinetry-casework" className="border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#081828] transition hover:bg-transparent hover:text-[#B4904E]">
                  Explore Custom Cabinetry
                </Link>
                <Link href="/commercial" className="border border-[#FEFAF1]/45 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#FEFAF1] transition hover:border-[#B4904E] hover:text-[#B4904E]">
                  Explore Commercial Manufacturing
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden border border-[#B4904E]/45 bg-[#081828] shadow-2xl">
              <Image
                src="/images/ckc-woodworks/ckc-woodworks-shop-overview.jpg"
                alt="Elevated overview of the CKC Woodworks custom manufacturing shop"
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,24,40,0.04),rgba(8,24,40,0.7))]" />
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B4904E]">CKC Woodworks</p>
                <p className="mt-2 font-heading text-3xl font-semibold leading-tight sm:text-4xl">A full commercial woodshop. A world of possibilities.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="container-xl grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="relative aspect-[4/3] overflow-hidden border border-[#D6D2C6] bg-[#081828] luxury-shadow">
              <Image
                src="/images/ckc-woodworks/ckc-woodworks-custom-casework.jpg"
                alt="Custom casework in production at CKC Woodworks"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Our Point of View</p>
              <h2 className="mt-5 font-heading text-5xl font-semibold leading-[0.98] text-[#081828] text-balance sm:text-7xl">
                The best custom work makes every part of a room belong.
              </h2>
              <div className="mt-8 max-w-3xl space-y-6 text-lg leading-8 text-[#2E404E]">
                <p>
                  We have a passion for bringing spaces together. A casing detail should relate to the doors around it. A built-in should feel connected to the trim, the wall proportions, and the way the room is used. A cabinet should make the room more useful without asking to be the only thing you notice.
                </p>
                <p>
                  That point of view shapes everything from luxury moulding and fireplace surrounds to custom cabinetry, casework, shelving, and specialty wood details. We listen first, then help clarify the right balance of proportion, materials, function, and finish.
                </p>
                <p>
                  CKC Woodworks has been trusted with projects for Chanel, Clayco, McCarthy, MICDS, Alberici, Energizer, Kendra Scott, BJC, SSM, and more. Through Moulding Saint Louis, we bring those ultra-luxury capabilities to the residential market—with the equipment, production capacity, and experienced craftspeople of our own commercial woodshop, and the personal attention of a locally owned St. Louis team.
                </p>
              </div>
              <div className="mt-9 border-l-4 border-[#B4904E] bg-[#D6D2C6]/35 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#B4904E]">Our Woodshop</p>
                <p className="mt-3 text-lg leading-8 text-[#2E404E]">
                  Based at {" "}
                  <a href={businessAddressMapUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#081828] underline underline-offset-4 transition hover:text-[#B4904E]">
                    {businessAddressLabel}
                  </a>
                  {" "}in St. Louis, our combined capability gives a project the attention to detail it deserves from first idea to final installation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#D6D2C6]/45 py-24 sm:py-32">
          <div className="container-xl">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Inside the Woodshop</p>
              <h2 className="mt-5 font-heading text-5xl font-semibold leading-[0.98] text-[#081828] text-balance sm:text-7xl">
                A wider view of what can be made possible.
              </h2>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#2E404E]">
                CKC Woodworks has served the St. Louis market for more than 40 years. These elevated views show the dedicated bench space, equipment, materials, and production capacity that support custom work across residential and commercial settings.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {woodshopViews.map((view) => (
                <figure key={view.src} className="overflow-hidden border border-[#D6D2C6] bg-[#081828] shadow-xl">
                  <div className="relative aspect-[4/3]">
                    <Image src={view.src} alt={view.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="border-t border-[#B4904E]/35 px-6 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#B4904E]">
                    {view.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="container-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">What We Value</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {values.map((value, index) => (
                <div key={value.title} className="border border-[#D6D2C6] bg-white p-7 shadow-sm">
                  <p className="font-heading text-5xl font-semibold text-[#B4904E]">0{index + 1}</p>
                  <h3 className="mt-5 font-heading text-3xl font-semibold leading-tight text-[#081828]">{value.title}</h3>
                  <p className="mt-4 leading-7 text-[#2E404E]">{value.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#081828] py-20 text-[#FEFAF1]">
          <div className="container-xl flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Work With Us</p>
              <h2 className="mt-3 max-w-4xl font-heading text-5xl font-semibold leading-tight text-balance">
                Ready to bring your space together?
              </h2>
            </div>
            <Link href="/contact" className="shrink-0 border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#081828] transition hover:bg-transparent hover:text-[#B4904E]">
              Request a Consultation
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
