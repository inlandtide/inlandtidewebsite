import Image from "next/image";
import Link from "next/link";
import { services } from "../data/services";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#B4904E]/25 bg-[#081828]/95 text-[#FEFAF1] backdrop-blur">
      <div className="container-xl flex items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Moulding Saint Louis home">
          <Image
            src="/moulding-saint-louis-logo.png"
            alt="Moulding Saint Louis"
            width={74}
            height={74}
            className="h-14 w-14 rounded-sm object-cover object-top"
            priority
          />
          <div className="leading-none">
            <p className="font-heading text-2xl font-semibold tracking-wide">Moulding</p>
            <p className="font-heading text-xl tracking-[0.08em] text-[#B4904E]">Saint Louis</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium uppercase tracking-[0.18em] text-[#FEFAF1]/82 lg:flex">
          <Link className="transition hover:text-[#B4904E]" href="/services">Services</Link>
          <Link className="transition hover:text-[#B4904E]" href="/process">Process</Link>
          <Link className="transition hover:text-[#B4904E]" href="/gallery">Gallery</Link>
          <Link className="transition hover:text-[#B4904E]" href="/about">About</Link>
          <Link className="transition hover:text-[#B4904E]" href="/contact">Contact</Link>
        </nav>

        <Link
          href="/contact"
          className="border border-[#B4904E] bg-[#B4904E] px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#081828] transition hover:bg-transparent hover:text-[#B4904E] sm:px-5 sm:tracking-[0.2em]"
        >
          <span className="sm:hidden">Contact</span>
          <span className="hidden sm:inline">Request a Consultation</span>
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#081828] text-[#FEFAF1]">
      <div className="container-xl grid gap-10 py-14 md:grid-cols-[1.25fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-4">
            <Image
              src="/moulding-saint-louis-logo.png"
              alt="Moulding Saint Louis"
              width={86}
              height={86}
              className="h-16 w-16 rounded-sm object-cover object-top"
            />
            <div>
              <p className="font-heading text-3xl font-semibold">Moulding Saint Louis</p>
              <p className="text-sm uppercase tracking-[0.35em] text-[#B4904E]">Made in Wood</p>
            </div>
          </Link>
          <p className="mt-6 max-w-sm leading-7 text-[#FEFAF1]/72">
            Luxury moulding, finish carpentry, and architectural wood finishes for St. Louis homes.
          </p>
        </div>

        <FooterColumn title="Services">
          {services.slice(0, 4).map((service) => (
            <FooterLink key={service.slug} href={`/services/${service.slug}`}>{service.title}</FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="More Services">
          {services.slice(4).map((service) => (
            <FooterLink key={service.slug} href={`/services/${service.slug}`}>{service.title}</FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Company">
          <FooterLink href="/process">Our Process</FooterLink>
          <FooterLink href="/gallery">Gallery</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterColumn>
      </div>

      <div className="border-t border-[#B4904E]/25 py-6">
        <div className="container-xl flex flex-col gap-3 text-sm text-[#FEFAF1]/65 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Moulding Saint Louis. Independently owned and operated in St. Louis.</p>
          <p>Tim Hebel & Ryan Hall</p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  copy,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  copy: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-4xl font-semibold leading-tight text-[#081828] text-balance sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-[#2E404E]">{copy}</p>
    </div>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#B4904E]">{title}</p>
      <div className="flex flex-col gap-3 text-sm text-[#FEFAF1]/75">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="transition hover:text-[#B4904E]">
      {children}
    </Link>
  );
}
