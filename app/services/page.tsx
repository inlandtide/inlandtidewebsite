import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import { PageShell } from "../components/SiteChrome";
import { Arrow, ConsultationSection, Eyebrow } from "../components/Design";
import { publicServices } from "../data/services";
import { getPresentation } from "../data/presentation";
import { breadcrumbSchema, siteUrl } from "../data/seo";
export const metadata: Metadata = {
  title: "Finish Carpentry Services in St. Louis",
  description:
    "Explore custom picture frame moulding, crown moulding, wainscoting, mantels, casing and architectural trim in St. Louis. Free project consultations.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Finish Carpentry Services in St. Louis",
    url: siteUrl + "/services",
  },
};
export default function ServicesPage() {
  const priority = [
    "picture-frame-moulding",
    "wainscoting-beadboard",
    "crown-moulding",
  ];
  const ordered = [...publicServices].sort(
    (a, b) =>
      (priority.includes(a.slug) ? priority.indexOf(a.slug) : 9) -
      (priority.includes(b.slug) ? priority.indexOf(b.slug) : 9),
  );
  return (
    <PageShell ctaHref="#consultation">
      <main id="main-content">
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Services", url: siteUrl + "/services" },
          ])}
        />
        <section className="page-intro">
          <div className="container-xl">
            <Eyebrow>Custom finish carpentry in St. Louis</Eyebrow>
            <h1>
              Details that make{" "}
              <br />a home feel like yours.
            </h1>
            <p>
              From a single statement wall to a coordinated trim update,
              discover the details that bring warmth, character, and a finished
              feel to your rooms.
            </p>
          </div>
        </section>
        <section className="services-index">
          <div className="container-xl style-grid">
            {ordered.map((service, index) => {
              const p = getPresentation(service);
              return (
                <Link
                  className="style-card"
                  key={service.slug}
                  href={"/services/" + service.slug}
                >
                  <div className="style-image">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span>{p.label}</span>
                  </div>
                  <div className="style-card-heading">
                    <span className="small-label">0{index + 1}</span>
                    <Arrow diagonal />
                  </div>
                  <h2>{service.title}</h2>
                  <p>{service.summary}</p>
                </Link>
              );
            })}
          </div>
        </section>
        <ConsultationSection location="services" />
      </main>
    </PageShell>
  );
}
