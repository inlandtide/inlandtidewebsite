import Image from "next/image";
import Link from "next/link";
import ContactForm from "./components/ContactForm";
import { PageShell, SectionIntro } from "./components/SiteChrome";
import { services } from "./data/services";

const promises = [
  "Finish Carpentry Specialists",
  "Custom Wood Details",
  "Locally Owned in St. Louis",
  "Exceptional Customer Care",
];

const processSteps = [
  {
    title: "Consult",
    copy: "We listen to your goals, review the rooms involved, and clarify the style, scope, and expectations before recommendations begin.",
  },
  {
    title: "Design & Specify",
    copy: "We help select profiles, layouts, wood products, finish direction, and suitable requested materials when the project calls for them.",
  },
  {
    title: "Craft & Install",
    copy: "Your home is treated with respect while the details are measured, installed, and finished with careful attention to proportion and cleanliness.",
  },
  {
    title: "Final Walkthrough",
    copy: "We review the finished work with you so expectations are clear and the final details feel complete.",
  },
];

export default function Home() {
  return (
    <PageShell>
      <main>
        <section className="relative overflow-hidden bg-[#081828] text-[#FEFAF1]">
          <div className="absolute inset-0 subtle-grid opacity-30" />
          <div className="container-xl relative grid min-h-[760px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#B4904E]">Luxury Finish Carpentry</p>
              <h1 className="mt-5 font-heading text-6xl font-semibold leading-[0.92] text-balance sm:text-7xl lg:text-8xl">
                Architectural wood finishes for St. Louis homes.
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-9 text-[#FEFAF1]/78">
                Moulding Saint Louis creates luxury moulding, wainscoting, trim, mantels, casing, and custom wood details with a refined customer experience from the first conversation through the final walkthrough.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link href="/contact" className="border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.24em] text-[#081828] transition hover:bg-transparent hover:text-[#B4904E]">
                  Request a Consultation
                </Link>
                <Link href="/services" className="border border-[#FEFAF1]/35 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.24em] text-[#FEFAF1] transition hover:border-[#B4904E] hover:text-[#B4904E]">
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-6 border border-[#B4904E]/35" />
              <div className="relative border border-[#B4904E] bg-[#081828] p-6 luxury-shadow">
                <Image
                  src="/moulding-saint-louis-logo.png"
                  alt="Moulding Saint Louis logo"
                  width={1024}
                  height={1024}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#B4904E]/25 bg-[#FEFAF1]">
          <div className="container-xl grid gap-4 py-7 md:grid-cols-4">
            {promises.map((promise) => (
              <div key={promise} className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#081828]">
                <span className="text-[#B4904E]">◆</span> {promise}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#FEFAF1] py-24">
          <div className="container-xl grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <SectionIntro
              eyebrow="Our Specialties"
              title="High-end moulding and finish carpentry, organized around your home."
              copy="Choose a service below to learn how custom wood details can add depth, structure, and architectural character to your space."
              align="left"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group border border-[#D6D2C6] bg-white p-6 transition hover:-translate-y-1 hover:border-[#B4904E] hover:shadow-xl"
                >
                  <p className="font-heading text-3xl font-semibold leading-tight text-[#081828] group-hover:text-[#B4904E]">
                    {service.title}
                  </p>
                  <p className="mt-4 leading-7 text-[#2E404E]">{service.summary}</p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#B4904E]">Learn More</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#081828] py-24 text-[#FEFAF1]">
          <div className="container-xl grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">The Experience</p>
              <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-balance sm:text-6xl">
                Premium craftsmanship should come with clear expectations and exceptional care.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-[#FEFAF1]/76">
              <p>
                Moulding Saint Louis is independently owned and operated in St. Louis by Tim Hebel and Ryan Hall. We focus on finish carpentry and quality wood products for homeowners who want thoughtful recommendations, careful installation, and details that feel appropriate to the architecture of the home.
              </p>
              <p>
                Wood is our specialty, and we can also discuss similar or requested materials when they fit the design, performance needs, and finish expectations of the project.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#FEFAF1] py-24">
          <div className="container-xl">
            <SectionIntro
              eyebrow="How We Work"
              title="A guided process for custom architectural details."
              copy="From the first conversation through the final walkthrough, the process is built to feel organized, communicative, and respectful of your home."
            />
            <div className="mt-14 grid gap-5 md:grid-cols-4">
              {processSteps.map((step, index) => (
                <div key={step.title} className="border border-[#D6D2C6] bg-white p-7">
                  <p className="font-heading text-5xl font-semibold text-[#B4904E]">0{index + 1}</p>
                  <h3 className="mt-5 font-heading text-3xl font-semibold text-[#081828]">{step.title}</h3>
                  <p className="mt-4 leading-7 text-[#2E404E]">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#D6D2C6]/45 py-24">
          <div className="container-xl grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Start a Conversation</p>
              <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-[#081828] text-balance sm:text-6xl">
                Tell us about the architectural details you want to add.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#2E404E]">
                Share the rooms, inspiration, timeline, and finish carpentry you have in mind. We will review the details and help determine the best next step for your home.
              </p>
            </div>
            <div className="border border-[#B4904E]/45 bg-[#FEFAF1] p-6 shadow-xl sm:p-9">
              <ContactForm compact />
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
