import Image from "next/image";
import Link from "next/link";
import { publicServices } from "../data/services";
import { isPreview } from "../lib/site-environment";
import SiteHeader from "./SiteHeader";
import MobileContactBar from "./MobileContactBar";
export function SiteFooter({ focused = false }: { focused?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="container-xl">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" aria-label="Moulding Saint Louis home">
              <Image
                src="/moulding-stl-inverted-logo.webp"
                alt="Moulding Saint Louis"
                width={1600}
                height={1768}
                sizes="110px"
              />
            </Link>
            <p>
              Considered details.
              <br />
              Beautifully finished homes.
            </p>
            <p className="footer-location">
              Locally owned & operated in St. Louis.
            </p>
          </div>
          {!focused && (
            <div className="footer-services">
              <p className="small-label">Explore the possibilities</p>
              <div>
                {publicServices.map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`}>
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="footer-contact">
            <p className="small-label">Let’s talk about your home</p>
            <a
              className="footer-phone"
              href="tel:+13148180815"
              data-cta="footer_call"
            >
              (314) 818-0815
            </a>
            <p>Monday–Friday, 8am–5pm</p>
            <Link
              href="/contact"
              className="text-link"
              data-cta="footer_consultation"
            >
              Your free consultation <span aria-hidden="true">↗</span>
            </Link>
            <div className="footer-links">
              <Link href="/about">About us</Link>
              <Link href="/gallery">Gallery</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Moulding Saint Louis</p>
          <p>Custom moulding & finish carpentry</p>
          <Link href="/privacy-policy">Privacy policy</Link>
        </div>
      </div>
    </footer>
  );
}
export function PageShell({
  children,
  focused = false,
  ctaHref = "/contact",
}: {
  children: React.ReactNode;
  focused?: boolean;
  ctaHref?: string;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      {isPreview && (
        <div className="preview-notice">
          Private design preview <span>· Test forms send no leads</span>
          <Link href="/preview-guide">Review pages ↗</Link>
        </div>
      )}
      <SiteHeader focused={focused} ctaHref={ctaHref} />
      {children}
      <SiteFooter focused={focused} />
      <MobileContactBar href={ctaHref} />
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
    <div
      className={
        align === "center" ? "section-intro text-center" : "section-intro"
      }
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      <p className="body-copy">{copy}</p>
    </div>
  );
}
