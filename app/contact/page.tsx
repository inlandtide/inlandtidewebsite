import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "../components/ContactForm";
import JsonLd from "../components/JsonLd";
import { PageShell } from "../components/SiteChrome";
import { breadcrumbSchema, siteUrl } from "../data/seo";

export const metadata: Metadata = {
  title: "Request a Finish Carpentry Consultation",
  description:
    "Contact Moulding Saint Louis at (314) 818-0815 to discuss luxury moulding, wainscoting, casing, mantels, archways, gazebos, pergolas, and custom finish carpentry in St. Louis.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Request a Finish Carpentry Consultation",
    description:
      "Start a conversation about custom moulding, wainscoting, trim, mantels, gazebos, pergolas, and architectural wood finishes for your St. Louis home.",
    url: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <main className="bg-[#081828] text-[#FEFAF1]">
        <JsonLd data={breadcrumbSchema([{ name: "Home", url: siteUrl }, { name: "Contact", url: `${siteUrl}/contact` }])} />
        <section className="grid min-h-[calc(100vh-89px)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative hidden overflow-hidden lg:block">
            <Image
              src="/images/placeholders/contact-fireplace-surround.jpg"
              alt="Fireplace mantel inspiration placeholder"
              fill
              priority
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
                Share the rooms, project type, and inspiration you have in mind. We will review your inquiry and help determine the best next step. You can also call (314) 818-0815.
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
