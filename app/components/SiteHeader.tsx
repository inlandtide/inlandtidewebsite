"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { publicServices } from "../data/services";

export default function SiteHeader({
  focused = false,
  ctaHref = "/contact",
}: {
  focused?: boolean;
  ctaHref?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <div className="container-xl header-inner">
        <Link
          href="/"
          aria-label="Moulding Saint Louis home"
          className="brand-link"
        >
          <Image
            src="/moulding-stl-inverted-logo.webp"
            alt="Moulding Saint Louis"
            width={1600}
            height={1768}
            sizes="76px"
            priority
          />
        </Link>
        {!focused && (
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/services">Our services</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/about">Our approach</Link>
          </nav>
        )}
        <div className="header-actions">
          <a
            className="header-phone"
            href="tel:+13148180815"
            data-cta="header_call"
          >
            (314) 818-0815
          </a>
          <Link
            className="button-primary header-cta"
            href={ctaHref}
            data-cta="header_consultation"
          >
            Free consultation <span aria-hidden="true">↗</span>
          </Link>
          {!focused && (
            <button
              className="menu-toggle"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              <span />
              <span />
            </button>
          )}
        </div>
      </div>
      {!focused && open && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Mobile navigation"
        >
          <Link onClick={() => setOpen(false)} href="/services">
            All services
          </Link>
          {publicServices.map((service) => (
            <Link
              onClick={() => setOpen(false)}
              href={`/services/${service.slug}`}
              key={service.slug}
            >
              {service.title}
            </Link>
          ))}
          <Link onClick={() => setOpen(false)} href="/gallery">
            Gallery
          </Link>
          <Link onClick={() => setOpen(false)} href="/about">
            Our approach
          </Link>
          <Link onClick={() => setOpen(false)} href="/contact">
            Free consultation
          </Link>
        </nav>
      )}
    </header>
  );
}
