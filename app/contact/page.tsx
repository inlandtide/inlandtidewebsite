import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "../components/ContactForm";
import JsonLd from "../components/JsonLd";
import { PageShell } from "../components/SiteChrome";
import { Eyebrow } from "../components/Design";
import { breadcrumbSchema, siteUrl } from "../data/seo";
export const metadata: Metadata = {
  title: "Request a Free Finish Carpentry Consultation",
  description:
    "Tell us about your St. Louis home. Request a free moulding, wainscoting or finish carpentry consultation, or call (314) 818-0815.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Your Free Consultation | Moulding Saint Louis",
    description: "A beautiful room starts with a conversation.",
    url: siteUrl + "/contact",
  },
};
export default function ContactPage() {
  return (
    <PageShell ctaHref="#consultation">
      <main id="main-content">
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Contact", url: siteUrl + "/contact" },
          ])}
        />
        <section className="contact-page">
          <div className="container-xl contact-page-grid">
            <div className="contact-page-copy">
              <Eyebrow>Free consultation · St. Louis</Eyebrow>
              <h1>
                Every beautiful room
                <br />
                starts with a conversation.
              </h1>
              <p>
                You do not need all the answers. Share a little about your home,
                and we will help you work through the possibilities.
              </p>
              <div className="contact-page-photo">
                <Image
                  src="/images/placeholders/contact-fireplace-surround.jpg"
                  alt="Fireplace mantel and surround design inspiration"
                  fill
                  sizes="(min-width: 900px) 45vw, 100vw"
                  className="object-cover"
                />
                <span>Design inspiration</span>
              </div>
              <div className="contact-page-details">
                <div>
                  <p className="small-label">Call or text</p>
                  <a href="tel:+13148180815" data-cta="contact_call">
                    (314) 818-0815
                  </a>
                  <a
                    href="sms:+13148180815"
                    className="text-link"
                    data-cta="contact_text"
                  >
                    Send a text ↗
                  </a>
                </div>
                <div>
                  <p className="small-label">Contact hours</p>
                  <p>
                    Monday–Friday
                    <br />
                    8am–5pm
                  </p>
                </div>
              </div>
            </div>
            <div id="consultation" className="contact-page-form">
              <div className="form-panel">
                <Eyebrow>Let’s start with you</Eyebrow>
                <h2>Your home. Your ideas.</h2>
                <p className="form-intro">
                  Leave your details and our team will follow up to discuss your
                  project.
                </p>
                <ContactForm compact formLocation="contact" />
                <div className="ad-call">
                  <span>Prefer to call or text?</span>
                  <a href="tel:+13148180815" data-cta="contact_form_call">
                    (314) 818-0815
                  </a>
                  <a href="sms:+13148180815" data-cta="contact_form_text">
                    Send a text ↗
                  </a>
                </div>
              </div>
              <div className="next-step-note">
                <span>01</span>
                <div>
                  <h3>What happens next?</h3>
                  <p>
                    We review your inquiry, get in touch, and talk through your
                    space. Photos or inspiration can help, but you can share
                    those when we connect.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
