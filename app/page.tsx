import Image from "next/image";
import Link from "next/link";
import ContactForm from "./components/ContactForm";
import { PageShell } from "./components/SiteChrome";
import { services } from "./data/services";

const promises = [
  "Finish Carpentry Specialists",
  "Custom Wood Details",
  "Locally Owned in St. Louis",
  "Exceptional Customer Care",
];

const experiencePoints = [
  "Thoughtful consultation before recommendations begin",
  "Quality wood products with suitable requested materials considered",
  "Clear expectations, careful installation, and respectful jobsite care",
];

export default function Home() {
  return (
    <PageShell>
      <main className="bg-[#FEFAF1]">
        <section className="relative flex min-h-[calc(100vh-89px)] items-center overflow-hidden bg-[#081828] text-[#FEFAF1]">
          <Image
            src="/images/placeholders/hero-workshop.jpg"
            alt="Elegant interior wall moulding inspiration"
            fill
            priority
            className="object-cover opacity-42"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,24,40,0.55),rgba(8,24,40,0.90))]" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#081828] to-transparent" />
          <div className="container-xl relative py-24 text-center">
            <h1 className="mx-auto flex max-w-6xl flex-col items-center font-heading text-7xl font-semibold leading-[0.82] text-balance sm:text-8xl lg:text-[9.5rem]">
              <span className="text-[#FEFAF1]">Moulding</span>
              <span className="text-[#B4904E]">Saint Louis</span>
            </h1>
            <p className="mx-auto mt-8 max-w-4xl text-3xl leading-[1.35] text-[#FEFAF1]/86 sm:text-4xl">
              High-end moulding, wainscoting, casing, mantels, archways, and custom finish carpentry with a refined customer experience from first conversation to final walkthrough.
            </p>
            <div className="mt-11 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="border border-[#B4904E] bg-[#B4904E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.26em] text-[#081828] transition hover:bg-transparent hover:text-[#B4904E]">
                Request a Consultation
              </Link>
              <Link href="/services" className="border border-[#FEFAF1]/50 px-8 py-4 text-sm font-semibold uppercase tracking-[0.26em] text-[#FEFAF1] transition hover:border-[#B4904E] hover:text-[#B4904E]">
                Explore Services
              </Link>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[#FEFAF1]/65 md:flex">
            <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
            <span className="h-10 w-px bg-[#B4904E]" />
          </div>
        </section>

        <section className="bg-[#081828] text-[#FEFAF1]">
          <div className="container-xl grid border-y border-[#B4904E]/25 md:grid-cols-4">
            {promises.map((promise) => (
              <div key={promise} className="border-[#B4904E]/25 px-6 py-6 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#FEFAF1]/78 md:border-r last:md:border-r-0">
                <span className="text-[#B4904E]">◆</span> {promise}
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#FEFAF1] py-24 sm:py-32">
          <div className="container-xl">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#B4904E]">Our Work</p>
              <h2 className="mt-5 font-heading text-5xl font-semibold leading-[0.98] text-[#081828] text-balance sm:text-7xl">
                It&apos;s all in the details
              </h2>
              <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#2E404E]">
                Explore the finish carpentry services Moulding Saint Louis specializes in. Each service opens a dedicated page with design direction and project details.
              </p>
            </div>

            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex min-h-[360px] flex-col border border-[#D6D2C6] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#B4904E] hover:shadow-2xl"
                >
                  <div className="flex items-start justify-between gap-6">
                    <p className="font-heading text-5xl font-semibold leading-none text-[#B4904E]">0{index + 1}</p>
                    <span className="mt-2 h-px flex-1 bg-[#D6D2C6]" />
                    <span className="text-[#B4904E]">◆</span>
                  </div>
                  <h3 className="mt-8 font-heading text-4xl font-semibold leading-tight text-[#081828] text-balance group-hover:text-[#B4904E]">
                    {service.title}
                  </h3>
                  <p className="mt-5 flex-1 text-base leading-7 text-[#2E404E]">
                    {service.summary}
                  </p>
                  <p className="mt-7 border-t border-[#D6D2C6] pt-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#B4904E]">
                    Learn More
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#081828] py-24 text-[#FEFAF1] sm:py-32">
          <div className="container-xl grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="relative min-h-[620px] overflow-hidden">
              <Image
                src="/images/placeholders/archways-entryways.jpg"
                alt="Architectural archway placeholder"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 border border-[#B4904E]/45" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#B4904E]">The Experience</p>
              <h2 className="mt-5 font-heading text-5xl font-semibold leading-[0.98] text-balance sm:text-7xl">
                Premium finish carpentry should feel personal, organized, and cared for.
              </h2>
              <p className="mt-7 text-lg leading-8 text-[#FEFAF1]/76">
                Moulding Saint Louis is independently owned and operated in St. Louis by Tim Hebel and Ryan Hall. We focus on custom wood details and high-end finishes that make a home feel more intentional, substantial, and complete.
              </p>
              <div className="mt-9 space-y-4">
                {experiencePoints.map((point) => (
                  <div key={point} className="flex gap-4 border-t border-[#B4904E]/25 pt-4">
                    <span className="text-[#B4904E]">◆</span>
                    <p className="text-[#FEFAF1]/78">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#D6D2C6]/45 py-24 sm:py-32">
          <div className="container-xl grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#B4904E]">Start a Conversation</p>
              <h2 className="mt-5 font-heading text-5xl font-semibold leading-[0.98] text-[#081828] text-balance sm:text-7xl">
                Tell us what you want the finished space to feel like.
              </h2>
              <p className="mt-7 text-lg leading-8 text-[#2E404E]">
                Share the rooms, inspiration, timeline, and finish carpentry you have in mind. We will review the details and help determine the best next step for your home.
              </p>
            </div>
            <div className="border border-[#B4904E]/45 bg-[#FEFAF1] p-6 shadow-2xl sm:p-9">
              <ContactForm compact />
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
