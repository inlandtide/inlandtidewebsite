import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "../../components/SiteChrome";
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
    title: service.title,
    description: `${service.title} by Moulding Saint Louis. ${service.summary}`,
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
      <main>
        <section className="bg-[#081828] py-24 text-[#FEFAF1]">
          <div className="container-xl grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Service</p>
              <h1 className="mt-5 font-heading text-6xl font-semibold leading-tight text-balance sm:text-7xl">
                {service.title}
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-[#FEFAF1]/78">{service.hero}</p>
            </div>
            <div className="border border-[#B4904E]/45 bg-[#FEFAF1]/5 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#B4904E]">Best For</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {service.idealFor.map((item) => (
                  <span key={item} className="border border-[#FEFAF1]/25 px-3 py-2 text-sm text-[#FEFAF1]/82">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#FEFAF1] py-24">
          <div className="container-xl grid gap-14 lg:grid-cols-[0.78fr_1.22fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Crafted Detail</p>
              <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-[#081828] text-balance">
                Designed to look intentional, finished, and appropriate to the home.
              </h2>
              <Link href="/contact" className="mt-8 inline-flex border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#081828] transition hover:bg-transparent hover:text-[#081828]">
                {service.cta}
              </Link>
            </aside>

            <div className="space-y-10">
              <div className="space-y-6 text-lg leading-8 text-[#2E404E]">
                {service.details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {service.highlights.map((highlight) => (
                  <div key={highlight} className="border border-[#D6D2C6] bg-white p-6">
                    <p className="text-[#B4904E]">◆</p>
                    <h3 className="mt-4 font-heading text-3xl font-semibold leading-tight text-[#081828]">{highlight}</h3>
                  </div>
                ))}
              </div>

              <div className="border-l-4 border-[#B4904E] bg-[#D6D2C6]/35 p-8">
                <p className="font-heading text-3xl font-semibold leading-tight text-[#081828]">
                  A better finish carpentry project begins with a clear conversation.
                </p>
                <p className="mt-4 leading-7 text-[#2E404E]">
                  Tell us about the rooms involved, the look you want, and any inspiration you already have. We will help clarify the right approach, materials, and next steps.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#081828] py-20 text-[#FEFAF1]">
          <div className="container-xl flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Ready to Begin?</p>
              <h2 className="mt-3 font-heading text-5xl font-semibold leading-tight text-balance">
                Let’s discuss how {service.title.toLowerCase()} can elevate your home.
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
