import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../components/JsonLd";
import { PageShell } from "../../components/SiteChrome";
import { breadcrumbSchema, serviceSchema, siteUrl } from "../../data/seo";
import { getService, services } from "../../data/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Service" };
  }

  return {
    title: `${service.title} in St. Louis`,
    description: `${service.title} by Moulding Saint Louis. ${service.summary}`,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} in St. Louis`,
      description: service.summary,
      url: `${siteUrl}/services/${service.slug}`,
      images: [
        {
          url: `${siteUrl}/images/placeholders/${service.slug}.jpg`,
          width: 1800,
          height: 1200,
          alt: `${service.title} by Moulding Saint Louis`,
        },
      ],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <PageShell>
      <main className="bg-[#FEFAF1]">
        <JsonLd data={serviceSchema(service)} />
        <JsonLd data={breadcrumbSchema([
          { name: "Home", url: siteUrl },
          { name: "Services", url: `${siteUrl}/services` },
          { name: service.title, url: `${siteUrl}/services/${service.slug}` },
        ])} />
        <section className="relative flex min-h-[680px] items-end overflow-hidden bg-[#081828] text-[#FEFAF1]">
          <Image
            src={`/images/placeholders/${service.slug}.jpg`}
            alt={`${service.title} placeholder`}
            fill
            priority
            className="object-cover opacity-62"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,24,40,0.28),rgba(8,24,40,0.96))]" />
          <div className="container-xl relative pb-20 pt-28">
            <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#B4904E]">Service</p>
            <h1 className="mt-5 max-w-5xl font-heading text-6xl font-semibold leading-[0.92] text-balance sm:text-8xl">
              {service.title}
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-[#FEFAF1]/80">{service.hero}</p>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="container-xl grid gap-14 lg:grid-cols-[0.78fr_1.22fr]">
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Best For</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {service.idealFor.map((item) => (
                  <span key={item} className="border border-[#D6D2C6] bg-white px-4 py-3 text-sm text-[#2E404E] shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
              <Link href="/contact" className="mt-8 inline-flex border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#081828] transition hover:bg-transparent">
                {service.cta}
              </Link>
            </aside>

            <div>
              <div className="space-y-7 text-xl leading-9 text-[#2E404E]">
                {service.details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-14 grid gap-5 md:grid-cols-3">
                {service.highlights.map((highlight, index) => (
                  <div key={highlight} className="border border-[#D6D2C6] bg-white p-7 shadow-sm">
                    <p className="font-heading text-5xl font-semibold text-[#B4904E]">0{index + 1}</p>
                    <h3 className="mt-5 font-heading text-3xl font-semibold leading-tight text-[#081828]">{highlight}</h3>
                  </div>
                ))}
              </div>

              <div className="mt-14 grid overflow-hidden bg-[#081828] text-[#FEFAF1] lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[360px]">
                  <Image
                    src="/images/placeholders/hero-workshop.jpg"
                    alt="Interior trim inspiration placeholder"
                    fill
                    className="object-cover opacity-75"
                  />
                </div>
                <div className="p-8 sm:p-12">
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Next Step</p>
                  <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-balance">
                    A better project begins with a clear conversation.
                  </h2>
                  <p className="mt-5 leading-8 text-[#FEFAF1]/76">
                    Tell us about the rooms involved, the look you want, and any inspiration you already have. We will help clarify the right approach, materials, and next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#D6D2C6]/45 py-20">
          <div className="container-xl flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Ready to Begin?</p>
              <h2 className="mt-3 max-w-4xl font-heading text-5xl font-semibold leading-tight text-[#081828] text-balance">
                Let’s discuss how {service.title.toLowerCase()} can elevate your home.
              </h2>
            </div>
            <Link href="/contact" className="shrink-0 border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#081828] transition hover:bg-transparent">
              Request a Consultation
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
