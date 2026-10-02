"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ServiceLink = { slug: string; title: string };

export function MobileNavigation({ services }: { services: ServiceLink[] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <div ref={menuRef} className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((current) => !current)}
        className="flex h-11 w-11 items-center justify-center border border-[#B4904E]/55 text-[#FEFAF1] transition hover:border-[#B4904E] hover:text-[#B4904E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B4904E]"
      >
        {open ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-9rem)] overflow-y-auto border-b border-[#B4904E]/45 bg-[#081828] shadow-2xl lg:hidden"
        >
          <div className="container-xl py-4">
            <Link href="/services" onClick={closeMenu} className="block border-b border-[#B4904E]/25 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#B4904E]">
              Services
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={closeMenu}
                  className="block border-b border-[#FEFAF1]/10 py-2.5 pl-3 text-sm text-[#FEFAF1]/85 transition hover:text-[#B4904E] focus-visible:text-[#B4904E]"
                >
                  {service.title}
                </Link>
              ))}
              <Link
                href="/commercial"
                onClick={closeMenu}
                className="block border-b border-[#B4904E]/25 py-2.5 pl-3 text-sm font-semibold text-[#B4904E] transition hover:text-[#FEFAF1] focus-visible:text-[#FEFAF1]"
              >
                Commercial Woodwork
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-4 border-b border-[#B4904E]/25 py-2 text-sm font-semibold uppercase tracking-[0.12em]">
              <Link href="/about" onClick={closeMenu} className="py-3 hover:text-[#B4904E]">About</Link>
              <Link href="/gallery" onClick={closeMenu} className="py-3 hover:text-[#B4904E]">Gallery</Link>
              <Link href="/contact" onClick={closeMenu} className="py-3 hover:text-[#B4904E]">Contact</Link>
              <a href="tel:+13148180815" onClick={closeMenu} className="py-3 hover:text-[#B4904E]">Call us</a>
            </div>
            <Link href="/contact" onClick={closeMenu} className="mt-4 block bg-[#B4904E] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#081828]">
              Request a Consultation
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
