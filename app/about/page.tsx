import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "../components/JsonLd";
import { PageShell } from "../components/SiteChrome";
import {
  ConsultationSection,
  Eyebrow,
  ProcessSection,
} from "../components/Design";
import { breadcrumbSchema, siteUrl } from "../data/seo";
export const metadata: Metadata = {
  title: { absolute: "About Moulding Saint Louis" },
  description:
    "Locally owned in St. Louis, specializing in custom moulding, finish carpentry, and thoughtful architectural wood details.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Moulding Saint Louis", url: siteUrl + "/about" },
};
export default function AboutPage() {
  return (
    <PageShell ctaHref="#consultation">
      <main id="main-content">
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "About", url: siteUrl + "/about" },
          ])}
        />
        <section className="page-intro">
          <div className="container-xl">
            <Eyebrow>Local people. Considered craftsmanship.</Eyebrow>
            <h1>
              The right detail looks
              <br />
              like it always belonged.
            </h1>
            <p>
              We are Moulding Saint Louis—an independently owned, local team
              focused on the wood details that make a house feel beautifully
              finished.
            </p>
          </div>
        </section>
        <section className="about-story">
          <div className="container-xl service-proof-grid">
            <figure>
              <Image
                src="/images/gallery/luxury-decorative-moulding-11.jpg"
                width={2200}
                height={1650}
                alt="Custom wall paneling fitted around the existing architecture of a home"
                sizes="(min-width: 900px) 50vw, 100vw"
              />
              <figcaption>
                From our decorative moulding project gallery
              </figcaption>
            </figure>
            <div>
              <Eyebrow>Our point of view</Eyebrow>
              <h2 className="section-title">
                Your home deserves
                <br />a thoughtful approach.
              </h2>
              <p className="body-copy">
                A room does not have to be rebuilt to feel different. The right
                wall panel layout, crown profile, or fireplace detail can change
                the way the entire space comes together.
              </p>
              <p className="body-copy">
                We start with what matters to you: the rooms you use, the look
                you love, and the details you want to keep. From there, we help
                clarify the materials, proportions, and scope.
              </p>
              <p className="body-copy">
                Our focus is premium finish carpentry and quality wood products,
                with appropriate alternative materials considered when they suit
                your project. Clear expectations and respectful care for your
                home are part of the work.
              </p>
            </div>
          </div>
        </section>
        <ProcessSection />
        <ConsultationSection location="about" />
      </main>
    </PageShell>
  );
}
