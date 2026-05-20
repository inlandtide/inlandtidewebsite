import Link from "next/link";
import { PageShell } from "../components/SiteChrome";
import { services } from "../data/services";

export const metadata = {
  title: "Gallery",
  description:
    "Explore inspiration categories for luxury moulding, trim, wainscoting, mantels, casing, and architectural wood details.",
};

export default function GalleryPage() {
  return (
    <PageShell>
      <main>
        <section className="bg-[#081828] py-24 text-[#FEFAF1]">
          <div className="container-xl max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Gallery</p>
            <h1 className="mt-5 font-heading text-6xl font-semibold leading-tight text-balance sm:text-7xl">
              Inspiration for architectural details, refined trim, and custom wood finishes.
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-[#FEFAF1]/76">
              This section is prepared for the upcoming Moulding Saint Louis content library. Until project photography is added, it serves as a clear structure for the detail categories customers will be able to explore.
            </p>
          </div>
        </section>

        <section className="bg-[#FEFAF1] py-24">
          <div className="container-xl grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group min-h-[260px] border border-[#D6D2C6] bg-white p-7 transition hover:-translate-y-1 hover:border-[#B4904E] hover:shadow-xl">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#B4904E]">Inspiration</p>
                    <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-[#081828] group-hover:text-[#B4904E]">{service.title}</h2>
                  </div>
                  <p className="mt-8 text-sm leading-7 text-[#2E404E]">View service direction and future project inspiration for this category.</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#D6D2C6]/45 py-20">
          <div className="container-xl grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Content Library Coming Soon</p>
              <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-[#081828] text-balance">
                Future project photography will make this one of the strongest conversion sections on the site.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#2E404E]">
                As completed work is added, the gallery can be organized by moulding, wainscoting, mantels, casing, archways, and close-up detail shots.
              </p>
            </div>
            <Link href="/contact" className="justify-self-start border border-[#B4904E] bg-[#B4904E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#081828] transition hover:bg-transparent lg:justify-self-end">
              Discuss Your Project
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
