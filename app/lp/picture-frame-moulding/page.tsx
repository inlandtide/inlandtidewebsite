import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "../../components/ContactForm";
import { siteUrl } from "../../data/seo";

const galleryImages = [
  {
    src: "/images/landing/picture-frame-moulding/picture-frame-hallway-gallery.webp",
    alt: "Picture frame moulding lining a finished hallway with a curated art gallery",
    width: 1536,
    height: 2048,
  },
  {
    src: "/images/landing/picture-frame-moulding/picture-frame-stairway.webp",
    alt: "Stairway with white picture frame moulding, stained oak stair details, and framed art",
    width: 1536,
    height: 2048,
  },
  {
    src: "/images/gallery/picture-frame-moulding-03.jpg",
    alt: "Deep blue hallway with detailed picture frame moulding and tailored wall rails",
    width: 2200,
    height: 1468,
  },
  {
    src: "/images/gallery/picture-frame-moulding-05.jpg",
    alt: "Bright custom interior with picture frame moulding, tailored casing, and mirror panels",
    width: 2200,
    height: 1467,
  },
  {
    src: "/images/gallery/picture-frame-moulding-11.jpg",
    alt: "Dining room with dark painted walls and crisp white picture frame moulding",
    width: 2200,
    height: 1467,
  },
  {
    src: "/images/gallery/picture-frame-moulding-12.jpg",
    alt: "Living room wall with painted picture frame moulding panels and chair rail detail",
    width: 2048,
    height: 1536,
  },
] as const;

const processSteps = [
  {
    number: "01",
    title: "Share the room",
    body: "Tell us about the wall, the style you are drawn to, and the finish you want the space to have.",
  },
  {
    number: "02",
    title: "Plan the layout",
    body: "We help establish panel spacing, heights, and proportions that feel right for the room—not pulled from a template.",
  },
  {
    number: "03",
    title: "Install & paint",
    body: "Our team installs the moulding, prepares the finish, and paints the completed detail for a cohesive result.",
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: "Picture Frame Moulding in St. Louis | Moulding Saint Louis" },
  description:
    "Custom picture frame moulding for St. Louis homes. Moulding Saint Louis plans the layout, installs the detail, and paints the finished treatment.",
  alternates: { canonical: "/lp/picture-frame-moulding" },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-image-preview": "none",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/lp/picture-frame-moulding`,
    title: "Picture Frame Moulding in St. Louis | Moulding Saint Louis",
    description:
      "Custom picture frame moulding, installed and painted for a finished architectural look in your St. Louis home.",
    siteName: "Moulding Saint Louis",
    images: [
      {
        url: `${siteUrl}/images/landing/picture-frame-moulding/picture-frame-dining-room.webp`,
        width: 2048,
        height: 1536,
        alt: "Custom picture frame moulding in a finished St. Louis dining room",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Picture Frame Moulding in St. Louis | Moulding Saint Louis",
    description:
      "Custom picture frame moulding, installed and painted for a finished architectural look in your St. Louis home.",
    images: [`${siteUrl}/images/landing/picture-frame-moulding/picture-frame-dining-room.webp`],
  },
};

function HeroContent() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10">
      <div className="container-xl pb-28 sm:pb-9 lg:pb-12">
        <div className="flex max-w-3xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-5xl font-semibold leading-[0.92] text-balance sm:text-6xl lg:text-7xl">
              Picture Frame Moulding
            </h1>
            <p className="mt-3 hidden text-sm font-semibold uppercase tracking-[0.22em] text-[#FEFAF1]/90 sm:block">
              Installed &amp; painted in St. Louis
            </p>
          </div>
          <div className="hidden shrink-0 gap-3 sm:flex">
            <a href="tel:+13148180815" className="border border-[#FEFAF1]/80 bg-[#081828]/70 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#FEFAF1] backdrop-blur-sm transition hover:!border-[#B4904E] hover:!bg-[#B4904E] hover:!text-[#081828] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FEFAF1]">
              Call Now
            </a>
            <a href="#request-consultation" className="border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#081828] transition hover:!border-[#FEFAF1] hover:!bg-[#081828] hover:!text-[#FEFAF1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FEFAF1]">
              Request a Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PictureFrameMouldingLandingPage() {
  return (
    <main className="min-h-screen bg-[#FEFAF1] pb-20 text-[#2E404E] md:pb-0">
      <header className="absolute inset-x-0 top-0 z-20 bg-[linear-gradient(180deg,rgba(8,24,40,0.82)_0%,rgba(8,24,40,0)_100%)] text-[#FEFAF1]">
        <div className="container-xl flex min-h-20 items-center justify-between gap-5 py-3">
          <Link href="/" aria-label="Visit the full Moulding Saint Louis website" className="shrink-0">
            <Image
              src="/moulding-stl-inverted-logo.webp"
              alt="Moulding Saint Louis"
              width={1600}
              height={1768}
              priority
              className="h-16 w-auto sm:h-20"
            />
          </Link>
          <div className="flex items-center gap-4 text-right sm:gap-7">
            <a href="tel:+13148180815" className="hidden text-sm font-semibold text-[#FEFAF1] transition hover:text-[#B4904E] sm:block">
              (314) 818-0815
            </a>
            <Link href="/" className="border-b border-[#B4904E]/70 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#FEFAF1] transition hover:border-[#B4904E] hover:text-[#B4904E]">
              Full Website
            </Link>
          </div>
        </div>
      </header>

      <section className="overflow-hidden bg-[#081828] text-[#FEFAF1]">
        <div className="relative min-h-[100svh] lg:hidden">
          <Image
            src="/images/landing/picture-frame-moulding/picture-frame-hallway-gallery.webp"
            alt="Picture frame moulding lining a finished hallway with a curated art gallery"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,24,40,0.92)_0%,rgba(8,24,40,0.48)_25%,rgba(8,24,40,0.04)_62%,rgba(8,24,40,0.12)_100%)]" />
          <HeroContent />
        </div>

        <div className="relative hidden h-[100svh] min-h-[680px] lg:block">
          <Image
            src="/images/landing/picture-frame-moulding/picture-frame-dining-room.webp"
            alt="Finished dining room featuring picture frame moulding, custom built-ins, and layered trim detail"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,24,40,0.92)_0%,rgba(8,24,40,0.45)_25%,rgba(8,24,40,0.02)_64%,rgba(8,24,40,0.13)_100%)]" />
          <HeroContent />
        </div>
      </section>

      <section className="border-b border-[#D6D2C6] bg-white py-10 sm:py-12">
        <div className="container-xl grid gap-6 md:grid-cols-3">
          <div className="border-l-2 border-[#B4904E] pl-5">
            <p className="font-heading text-3xl font-semibold text-[#081828]">Designed for your room</p>
            <p className="mt-2 leading-7 text-[#2E404E]">Panel spacing and scale are considered around the architecture already in place.</p>
          </div>
          <div className="border-l-2 border-[#B4904E] pl-5">
            <p className="font-heading text-3xl font-semibold text-[#081828]">Installed with care</p>
            <p className="mt-2 leading-7 text-[#2E404E]">Clean layout, crisp lines, and thoughtful transitions are part of the work.</p>
          </div>
          <div className="border-l-2 border-[#B4904E] pl-5">
            <p className="font-heading text-3xl font-semibold text-[#081828]">Finished with paint</p>
            <p className="mt-2 leading-7 text-[#2E404E]">We prepare and paint the completed moulding so the final treatment feels cohesive.</p>
          </div>
        </div>
        <div className="container-xl mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href="#request-consultation" className="border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#081828] transition hover:!border-[#081828] hover:!bg-[#081828] hover:!text-[#FEFAF1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#081828]">
            Start Your Project
          </a>
          <a href="tel:+13148180815" className="border border-[#081828] bg-[#FEFAF1] px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#081828] transition hover:!border-[#081828] hover:!bg-[#081828] hover:!text-[#FEFAF1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#081828]">
            Call (314) 818-0815
          </a>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-xl grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="overflow-hidden border border-[#D6D2C6] bg-[#081828] luxury-shadow">
            <Image
              src="/images/gallery/picture-frame-moulding-07.jpg"
              alt="Bright formal interior with white picture frame moulding around an entryway and console table"
              width={2200}
              height={1468}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#B4904E]">One finished result</p>
            <h2 className="mt-5 font-heading text-5xl font-semibold leading-[0.98] text-[#081828] text-balance sm:text-7xl">
              We install it. We paint it. You enjoy the finished room.
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-8 text-[#2E404E]">
              <p>
                Picture frame moulding is more than a few panels on a wall. The right layout brings balance to a dining room, interest to a hallway, or a tailored backdrop to an entry, office, or primary suite.
              </p>
              <p>
                Moulding Saint Louis handles the detail from planning through final paint. That means a single team accountable for the proportion, installation, surface preparation, and finished look.
              </p>
            </div>
            <a href="#request-consultation" className="mt-9 inline-flex border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#081828] transition hover:!border-[#081828] hover:!bg-[#081828] hover:!text-[#FEFAF1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#081828]">
              Start My Project
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#D6D2C6]/45 py-20 sm:py-28">
        <div className="container-xl">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#B4904E]">Picture Frame Moulding Projects</p>
            <h2 className="mt-5 font-heading text-5xl font-semibold leading-[0.98] text-[#081828] text-balance sm:text-7xl">
              See what the right wall detail can do.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#2E404E]">
              From clean white panels to rich painted rooms, each layout is made to feel connected to the character of the home.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {galleryImages.map((image) => (
              <figure key={image.src} className="overflow-hidden border border-[#D6D2C6] bg-white shadow-sm">
                <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-xl">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#B4904E]">A Clear Way Forward</p>
            <h2 className="mt-5 font-heading text-5xl font-semibold leading-[0.98] text-[#081828] text-balance sm:text-7xl">
              A custom wall treatment should not be complicated.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {processSteps.map((step) => (
              <article key={step.number} className="border border-[#D6D2C6] bg-[#FEFAF1] p-7">
                <p className="font-heading text-5xl font-semibold text-[#B4904E]">{step.number}</p>
                <h3 className="mt-5 font-heading text-3xl font-semibold text-[#081828]">{step.title}</h3>
                <p className="mt-4 leading-7 text-[#2E404E]">{step.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#request-consultation" className="inline-flex justify-center border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#081828] transition hover:!border-[#081828] hover:!bg-[#081828] hover:!text-[#FEFAF1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#081828]">
              Request a Consultation
            </a>
            <a href="tel:+13148180815" className="inline-flex justify-center border border-[#081828] bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#081828] transition hover:!border-[#081828] hover:!bg-[#081828] hover:!text-[#FEFAF1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#081828]">
              Call (314) 818-0815
            </a>
          </div>
        </div>
      </section>

      <section id="request-consultation" className="scroll-mt-8 bg-[#081828] py-20 text-[#FEFAF1] sm:py-28">
        <div className="container-xl grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#B4904E]">Request a Consultation</p>
            <h2 className="mt-5 max-w-xl font-heading text-5xl font-semibold leading-[0.98] text-balance sm:text-7xl">
              Tell us what you want the room to feel like.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#FEFAF1]/76">
              Share the room, the wall, and the finish you have in mind. We will help you determine the right picture frame moulding approach and next step.
            </p>
            <div className="mt-9 overflow-hidden border border-[#B4904E]/35">
              <Image
                src="/images/gallery/picture-frame-moulding-09.jpg"
                alt="Living room with picture frame moulding panels above a tailored sofa"
                width={2200}
                height={1669}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            <p className="mt-6 text-sm text-[#FEFAF1]/70">Prefer to talk first? Call or text <a href="tel:+13148180815" className="font-semibold text-[#B4904E] underline underline-offset-4">(314) 818-0815</a>.</p>
          </div>
          <div className="border border-[#B4904E]/35 bg-[#FEFAF1]/5 p-6 sm:p-9">
            <ContactForm variant="dark" compact defaultProjectType="Picture Frame Moulding" submitLabel="Request My Consultation" />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#B4904E]/30 bg-[#081828] py-8 text-[#FEFAF1]">
        <div className="container-xl flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-[#FEFAF1]/60">Picture frame moulding, thoughtfully installed and painted in St. Louis.</p>
          <Link href="/" className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B4904E] transition hover:text-[#FEFAF1]">
            Visit the full Moulding Saint Louis website →
          </Link>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[#B4904E]/40 bg-[#081828]/95 p-3 backdrop-blur md:hidden">
        <a href="tel:+13148180815" className="block border border-[#FEFAF1] bg-[#FEFAF1] px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-[#081828]">
          Call Now
        </a>
        <a href="#request-consultation" className="block border border-[#B4904E] bg-[#B4904E] px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-[#081828]">
          Start My Project
        </a>
      </div>
    </main>
  );
}
