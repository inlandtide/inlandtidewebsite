import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import { PageShell } from "../components/SiteChrome";
import { breadcrumbSchema, siteUrl } from "../data/seo";
import { services } from "../data/services";

export const metadata: Metadata = {
  title: "Finish Carpentry Services in St. Louis",
  description:
    "Explore luxury moulding, picture frame moulding, crown moulding, wainscoting, casing, mantels, archways, gazebos, pergolas, and finish carpentry services in St. Louis.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Finish Carpentry Services in St. Louis",
    description:
      "Service pages for luxury moulding, wainscoting, casing, mantels, archways, pergolas, and custom architectural wood finishes.",
    url: `${siteUrl}/services`,
  },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <main className="bg-[#FEFAF1]">
        <JsonLd data={breadcrumbSchema([{ name: "Home", url: siteUrl }, { name: "Services", url: `${siteUrl}/services` }])} />
        <section className="relative flex min-h-[620px] items-center overflow-hidden bg-[#081828] text-[#FEFAF1]">
          <Image
            src="/images/placeholders/wainscoting-beadboard.jpg"
            alt="Wainscoting placeholder"
            fill
            priority
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,24,40,0.45),rgba(8,24,40,0.92))]" />
          <div className="container-xl relative py-24 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.45em] text-[#B4904E]">Services</p>
            <h1 className="mx-auto mt-6 max-w-6xl font-heading text-6xl font-semibold leading-[0.92] text-balance sm:text-8xl">
              Finish carpentry services with architectural presence.
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-[#FEFAF1]/78">
              Premium moulding, wainscoting, trim, mantels, casing, archways, and custom wood details for St. Louis interiors.
            </p>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="container-xl">
            <div className="grid gap-8">
              {services.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group grid overflow-hidden border border-[#D6D2C6] bg-white shadow-sm transition hover:border-[#B4904E] hover:shadow-2xl lg:grid-cols-[0.88fr_1.12fr]"
                >
                  <div className={`relative min-h-[340px] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <Image
                      src={`/images/placeholders/${service.slug}.jpg`}
                      alt={`${service.title} placeholder`}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#081828]/10" />
                  </div>
                  <div className="flex flex-col justify-center p-8 sm:p-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">0{index + 1} / Service</p>
                    <h2 className="mt-4 font-heading text-5xl font-semibold leading-[0.98] text-[#081828] text-balance sm:text-6xl">
                      {service.title}
                    </h2>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-[#2E404E]">{service.summary}</p>
                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-[#B4904E]">Explore Service →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#081828] py-20 text-[#FEFAF1]">
          <div className="container-xl flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Not Sure Where to Start?</p>
              <h2 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-tight text-balance">
                Share your inspiration and we will help identify the right finish carpentry path.
              </h2>
            </div>
            <Link href="/contact" className="shrink-0 border border-[#B4904E] bg-[#B4904E] px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.24em] text-[#081828] transition hover:bg-transparent hover:text-[#B4904E]">
              Request a Consultation
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
