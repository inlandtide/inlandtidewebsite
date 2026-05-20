import Link from "next/link";
import { PageShell, SectionIntro } from "../components/SiteChrome";
import { services } from "../data/services";

export const metadata = {
  title: "Services",
  description:
    "Explore luxury moulding, wainscoting, casing, mantels, and finish carpentry services from Moulding Saint Louis.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <main>
        <section className="bg-[#081828] py-24 text-[#FEFAF1]">
          <div className="container-xl max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Services</p>
            <h1 className="mt-5 font-heading text-6xl font-semibold leading-tight text-balance sm:text-7xl">
              Finish carpentry and architectural wood details for refined St. Louis interiors.
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-[#FEFAF1]/76">
              We specialize in premium moulding, wainscoting, trim, mantels, casing, archways, and custom wood details that make a home feel intentional, finished, and lasting.
            </p>
          </div>
        </section>

        <section className="bg-[#FEFAF1] py-24">
          <div className="container-xl">
            <SectionIntro
              eyebrow="Choose Your Detail"
              title="Every service is built around proportion, material quality, and the customer experience."
              copy="Wood is our primary specialty. We can also discuss similar or requested materials when they fit the design direction, performance needs, and finish expectations of the project."
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group flex min-h-[320px] flex-col border border-[#D6D2C6] bg-white p-7 transition hover:-translate-y-1 hover:border-[#B4904E] hover:shadow-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#B4904E]">Service</p>
                  <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-[#081828] group-hover:text-[#B4904E]">
                    {service.title}
                  </h2>
                  <p className="mt-5 flex-1 leading-7 text-[#2E404E]">{service.summary}</p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#081828]">Explore Service →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#D6D2C6]/45 py-20">
          <div className="container-xl grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Not Sure Where to Start?</p>
              <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-[#081828] text-balance">
                We can help translate inspiration into a practical finish carpentry plan.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#2E404E]">
                Share photos of the room, examples you like, and the feeling you want the space to have. We will help identify whether moulding, wainscoting, casing, a mantel, or a complete trim package is the right direction.
              </p>
            </div>
            <Link href="/contact" className="justify-self-start border border-[#B4904E] bg-[#B4904E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#081828] transition hover:bg-transparent hover:text-[#081828] lg:justify-self-end">
              Request a Consultation
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
