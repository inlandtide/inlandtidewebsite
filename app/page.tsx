import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "./components/ContactForm";
import JsonLd from "./components/JsonLd";
import { PageShell } from "./components/SiteChrome";
import { breadcrumbSchema, defaultOgImage, siteUrl } from "./data/seo";
import { services } from "./data/services";

const promises = [
  "Finish Carpentry Specialists",
  "Custom Wood Details",
  "Locally Owned in St. Louis",
  "Exceptional Customer Care",
];

export const metadata: Metadata = {
  title: "Luxury Moulding, Wainscoting & Finish Carpentry in St. Louis",
  description:
    "Moulding Saint Louis creates high-end moulding, wainscoting, casing, mantels, archways, gazebos, pergolas, and custom finish carpentry for St. Louis homes.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Luxury Moulding, Wainscoting & Finish Carpentry in St. Louis",
    description:
      "Custom wood details, architectural moulding, wainscoting, casing, mantels, gazebos, and pergolas for St. Louis homes.",
    url: siteUrl,
    images: [{ url: defaultOgImage, width: 1800, height: 1200, alt: "Moulding Saint Louis finish carpentry" }],
  },
};

const experiencePoints = [
  "Thoughtful consultation before recommendations begin",
  "Quality wood products with suitable requested materials considered",
  "Clear expectations, careful installation, and respectful jobsite care",
];

type ServiceIconProps = {
  slug: string;
  title: string;
};

function ServiceIcon({ slug, title }: ServiceIconProps) {
  const commonProps = {
    className: "h-10 w-10",
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const icons: Record<string, React.ReactNode> = {
    "luxury-decorative-moulding": (
      <svg {...commonProps}>
        <path d="M10 10h28v28H10z" />
        <path d="M16 16h16v16H16z" />
        <path d="M24 7v6M24 35v6M7 24h6M35 24h6" />
        <path d="M18 24c3-6 9-6 12 0-3 6-9 6-12 0Z" />
      </svg>
    ),
    "picture-frame-moulding": (
      <svg {...commonProps}>
        <path d="M8 11h32v26H8z" />
        <path d="M14 17h20v14H14z" />
        <path d="M8 11l6 6M40 11l-6 6M8 37l6-6M40 37l-6-6" />
      </svg>
    ),
    "crown-moulding": (
      <svg {...commonProps}>
        <path d="M9 34h30" />
        <path d="M12 30h24" />
        <path d="M14 30l4-16 6 9 6-9 4 16" />
        <path d="M18 14h12" />
      </svg>
    ),
    "wainscoting-beadboard": (
      <svg {...commonProps}>
        <path d="M8 10h32v28H8z" />
        <path d="M14 16h8v16h-8zM26 16h8v16h-8z" />
        <path d="M11 35h26M11 13h26" />
      </svg>
    ),
    "chair-rail-picture-rail": (
      <svg {...commonProps}>
        <path d="M8 17h32" />
        <path d="M8 25h32" />
        <path d="M8 33h32" />
        <path d="M14 13v24M34 13v24" />
      </svg>
    ),
    "fireplace-mantels-surrounds": (
      <svg {...commonProps}>
        <path d="M10 15h28v7H10z" />
        <path d="M14 22v17h7V28h6v11h7V22" />
        <path d="M21 37c-1.5-4 3-6 3-10 3 3 5 5 3 10" />
      </svg>
    ),
    "window-door-casing": (
      <svg {...commonProps}>
        <path d="M12 8h24v32H12z" />
        <path d="M17 13h14v22H17z" />
        <path d="M31 24h2" />
        <path d="M12 8l5 5M36 8l-5 5M12 40l5-5M36 40l-5-5" />
      </svg>
    ),
    "archways-entryways": (
      <svg {...commonProps}>
        <path d="M12 40V23c0-7 5-13 12-13s12 6 12 13v17" />
        <path d="M18 40V24c0-4 2.5-8 6-8s6 4 6 8v16" />
        <path d="M9 40h30" />
      </svg>
    ),
    "gazebos-pergolas": (
      <svg {...commonProps}>
        <path d="M8 18h32" />
        <path d="M12 13h24" />
        <path d="M14 18v22M34 18v22" />
        <path d="M18 18l3-5M24 18l3-5M30 18l3-5" />
        <path d="M10 40h28" />
      </svg>
    ),
  };

  return (
    <span className="flex h-16 w-16 items-center justify-center border border-[#B4904E]/45 text-[#B4904E] transition-colors duration-300 group-hover:border-[#B4904E] group-hover:bg-[#B4904E]/10" aria-label={`${title} icon`}>
      {icons[slug] ?? icons["luxury-decorative-moulding"]}
    </span>
  );
}

export default function Home() {
  return (
    <PageShell>
      <main className="bg-[#FEFAF1]">
        <JsonLd data={breadcrumbSchema([{ name: "Home", url: siteUrl }])} />
        <section className="relative flex min-h-[calc(100vh-89px)] items-center overflow-hidden bg-[#081828] text-[#FEFAF1]">
          <Image
            src="/images/placeholders/home-hero-moulding-interior.jpg"
            alt="Bright luxury interior with decorative wall moulding and refined finish carpentry"
            fill
            priority
            className="object-cover opacity-42"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,24,40,0.55),rgba(8,24,40,0.90))]" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#081828] to-transparent" />
          <div className="container-xl relative py-24 text-center">
            <h1 className="mx-auto flex w-full max-w-[1500px] flex-col items-center font-heading text-[4.875rem] font-semibold leading-[0.76] text-balance sm:text-[7.5rem] lg:text-[11.25rem]">
              <span className="text-[#FEFAF1]">Moulding</span>
              <span className="text-[#B4904E]">Saint Louis</span>
            </h1>
            <p className="mx-auto mt-8 max-w-4xl text-[1.4rem] leading-[1.35] text-[#FEFAF1]/86 sm:text-[1.7rem]">
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
                Explore the finish carpentry services Moulding Saint Louis specializes in.
              </p>
            </div>

            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex min-h-[360px] flex-col border border-[#D6D2C6] bg-white p-7 text-[#2E404E] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#B4904E] hover:bg-[#081828] hover:shadow-2xl"
                >
                  <div className="flex items-start justify-between gap-6">
                    <ServiceIcon slug={service.slug} title={service.title} />
                    <span className="mt-8 h-px flex-1 bg-[#D6D2C6] transition-colors duration-300 group-hover:bg-[#B4904E]/60" />
                    <span className="mt-5 text-[#B4904E]">◆</span>
                  </div>
                  <h3 className="mt-8 font-heading text-4xl font-semibold leading-tight text-[#081828] text-balance transition-colors duration-300 group-hover:text-[#FEFAF1]">
                    {service.title}
                  </h3>
                  <p className="mt-5 flex-1 text-base leading-7 text-[#2E404E] transition-colors duration-300 group-hover:text-[#FEFAF1]/82">
                    {service.summary}
                  </p>
                  <p className="mt-7 border-t border-[#D6D2C6] pt-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#B4904E] transition-colors duration-300 group-hover:border-[#B4904E]/45">
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
                src="/images/placeholders/home-experience-moulding-lounge.jpg"
                alt="Bright sitting room with decorative wall moulding and refined finish carpentry"
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
