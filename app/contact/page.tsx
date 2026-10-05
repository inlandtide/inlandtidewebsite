import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "../components/ContactForm";
import JsonLd from "../components/JsonLd";
import { PageShell } from "../components/SiteChrome";
import { businessAddressLabel, businessAddressMapUrl } from "../data/business";
import { breadcrumbSchema, pageMetadata, siteUrl } from "../data/seo";

export const metadata: Metadata = pageMetadata({
  title: "Free St. Louis Moulding & Cabinetry Consultation",
  description: "Request a free consultation for moulding, wainscoting, custom cabinetry, built-ins or finish carpentry in St. Louis. Call or text (314) 818-0815.",
  path: "/contact",
  absoluteTitle: true,
  image: `${siteUrl}/images/placeholders/contact-fireplace-surround.jpg`,
  imageAlt: "Fireplace mantel and surround inspiration",
});

export default function ContactPage() {
  return (
    <PageShell>
      <main className="bg-[#081828] text-[#FEFAF1]">
        <JsonLd data={breadcrumbSchema([{ name: "Home", url: siteUrl }, { name: "Contact", url: `${siteUrl}/contact` }])} />
        <section className="grid min-h-[calc(100vh-89px)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative hidden overflow-hidden lg:block">
            <Image
              src="/images/placeholders/contact-fireplace-surround.jpg"
              alt="Fireplace mantel and wood surround inspiration"
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover opacity-82"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#081828]/35" />
          </div>

          <div className="flex items-center py-20">
            <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
              <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#B4904E]">Request a Consultation</p>
              <h1 className="mt-5 max-w-4xl font-heading text-6xl font-semibold leading-[0.92] text-balance sm:text-7xl">
                Tell us about the details you want to add to your home.
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-[#FEFAF1]/76">
                Share the rooms, project type, and inspiration you have in mind for a free consultation. We will review your inquiry and help determine the best next step. You can also <a href="tel:3148180815" className="underline underline-offset-4">call</a> or <a href="sms:+13148180815" className="underline underline-offset-4">text (314) 818-0815</a>.
              </p>
              <p className="mt-4 text-base text-[#FEFAF1]/76">Contact hours: Monday–Friday, 8am–5pm.</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#B4904E]">
                Woodshop location: {" "}
                <a href={businessAddressMapUrl} target="_blank" rel="noreferrer" className="text-[#FEFAF1] underline underline-offset-4 transition hover:text-[#B4904E]">
                  {businessAddressLabel}
                </a>
              </p>

              <div className="mt-10 border border-[#B4904E]/45 bg-[#FEFAF1]/5 p-6 sm:p-9">
                <ContactForm variant="dark" compact />
              </div>

              <div className="mt-10 border-l-4 border-[#B4904E] bg-[#FEFAF1]/5 p-6">
                <p className="font-heading text-3xl font-semibold">What happens next?</p>
                <p className="mt-3 leading-7 text-[#FEFAF1]/74">
                  A member of the Moulding Saint Louis team will review your message. We may ask for photos, inspiration, room dimensions, or a short conversation so expectations are clear before the project moves forward.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
