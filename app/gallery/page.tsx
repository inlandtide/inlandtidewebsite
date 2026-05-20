import Image from "next/image";
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
      <main className="bg-[#FEFAF1]">
        <section className="relative flex min-h-[620px] items-center overflow-hidden bg-[#081828] text-[#FEFAF1]">
          <Image
            src="/images/placeholders/luxury-decorative-moulding.jpg"
            alt="Decorative moulding inspiration placeholder"
            fill
            priority
            className="object-cover opacity-48"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,24,40,0.38),rgba(8,24,40,0.94))]" />
          <div className="container-xl relative py-24 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#B4904E]">Gallery</p>
            <h1 className="mx-auto mt-6 max-w-6xl font-heading text-6xl font-semibold leading-[0.92] text-balance sm:text-8xl">
              Inspiration for moulding, trim, and architectural wood finishes.
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-[#FEFAF1]/78">
              Placeholder images are being used until the Moulding Saint Louis content library is ready. The structure is prepared for project photography, detail shots, and before-and-after work.
            </p>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="container-xl grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className={`group relative min-h-[420px] overflow-hidden bg-[#081828] text-[#FEFAF1] luxury-shadow ${index % 2 === 0 ? "lg:translate-y-10" : ""}`}>
                <Image
                  src={`/images/placeholders/${service.slug}.jpg`}
                  alt={`${service.title} inspiration placeholder`}
                  fill
                  className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-58"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081828] via-[#081828]/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B4904E]">Inspiration</p>
                  <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight">{service.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#081828] py-20 text-[#FEFAF1]">
          <div className="container-xl grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Content Library Coming Soon</p>
              <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-balance">
                Future project photography will make this one of the strongest conversion sections on the site.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#FEFAF1]/76">
                As completed work is added, the gallery can be organized by moulding, wainscoting, mantels, casing, archways, and close-up detail shots.
              </p>
            </div>
            <Link href="/contact" className="justify-self-start border border-[#B4904E] bg-[#B4904E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#081828] transition hover:bg-transparent hover:text-[#B4904E] lg:justify-self-end">
              Discuss Your Project
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
