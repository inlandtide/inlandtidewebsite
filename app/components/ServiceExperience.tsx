import Image from "next/image";
import Link from "next/link";
import ContactForm from "./ContactForm";
import JsonLd from "./JsonLd";
import { PageShell } from "./SiteChrome";
import {
  ActionLink,
  ConsultationSection,
  Eyebrow,
  FaqSection,
  generalQuestions,
  ProcessSection,
} from "./Design";
import { breadcrumbSchema, serviceSchema, siteUrl } from "../data/seo";
import { publicServices, type Service } from "../data/services";
import { serviceGuidance } from "../data/service-guidance";
import { getPresentation } from "../data/presentation";

export default function ServiceExperience({
  service,
  advertising = false,
}: {
  service: Service;
  advertising?: boolean;
}) {
  const presentation = getPresentation(service);
  const guidance = serviceGuidance[service.slug];
  const related = publicServices
    .filter(
      (item) =>
        item.slug !== service.slug &&
        [
          "picture-frame-moulding",
          "wainscoting-beadboard",
          "crown-moulding",
        ].includes(item.slug),
    )
    .slice(0, 3);
  const questions = [
    generalQuestions[0],
    ...(guidance?.questions ?? [generalQuestions[1], generalQuestions[2]]),
    generalQuestions[3],
  ];
  return (
    <PageShell focused={advertising} ctaHref="#consultation">
      <main id="main-content">
        <JsonLd data={serviceSchema(service)} />
        {!advertising && (
          <JsonLd
            data={breadcrumbSchema([
              { name: "Home", url: siteUrl },
              { name: "Services", url: siteUrl + "/services" },
              {
                name: service.title,
                url: siteUrl + "/services/" + service.slug,
              },
            ])}
          />
        )}
        {advertising ? (
          <section className="ad-hero">
            <div className="container-xl ad-hero-grid">
              <div className="ad-intro">
                <Eyebrow>{service.title} · St. Louis</Eyebrow>
                <h1>{presentation.headline}</h1>
                <p>{presentation.copy}</p>
                <figure className="ad-photo">
                  <Image
                    src={presentation.image}
                    alt={presentation.alt}
                    fill
                    priority
                    sizes="(min-width: 900px) 55vw, 100vw"
                    className="object-cover"
                  />
                  <figcaption>{presentation.label}</figcaption>
                </figure>
                <div className="ad-reassurance">
                  <span>Locally owned</span>
                  <span>Custom design & installation</span>
                  <span>Free consultation</span>
                </div>
              </div>
              <div className="ad-form-wrap" id="consultation">
                <div className="form-panel">
                  <Eyebrow>Your room is a good place to start</Eyebrow>
                  <h2>Let’s explore the possibilities.</h2>
                  <p className="form-intro">
                    Request a free consultation. No measurements, finished
                    plans, or commitment needed.
                  </p>
                  <ContactForm
                    compact
                    defaultService={service.title}
                    formLocation={"ad:" + service.slug}
                  />
                  <div className="ad-call">
                    <span>Prefer to call or text?</span>
                    <a href="tel:+13148180815" data-cta="ad_call">
                      (314) 818-0815
                    </a>
                    <a href="sms:+13148180815" data-cta="ad_text">
                      Send a text ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="service-hero">
            <div className="service-hero-copy">
              <nav aria-label="Breadcrumb" className="breadcrumbs">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/services">Services</Link>
                <span>/</span>
                <span aria-current="page">{service.title}</span>
              </nav>
              <Eyebrow>Design & installation in St. Louis</Eyebrow>
              <h1>{presentation.headline}</h1>
              <p>{presentation.copy}</p>
              <div className="hero-actions">
                <ActionLink>Get my free consultation</ActionLink>
                <span>No obligation. No finished plans needed.</span>
              </div>
              <ActionLink href="/gallery" secondary id="service_gallery">
                See work & inspiration
              </ActionLink>
            </div>
            <figure className="service-hero-image">
              <Image
                src={presentation.image}
                alt={presentation.alt}
                fill
                priority
                sizes="(min-width: 900px) 50vw, 100vw"
                className="object-cover"
              />
              <figcaption>{presentation.label}</figcaption>
            </figure>
          </section>
        )}
        <section className="service-intro section-space">
          <div className="container-xl service-detail-grid">
            <div>
              <Eyebrow>Thoughtfully designed. Carefully installed.</Eyebrow>
              <h2 className="section-title">{presentation.benefit}</h2>
              <p className="body-copy">
                {guidance?.introduction ?? service.hero}
              </p>
            </div>
            <div className="service-detail-copy">
              {service.details.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul className="service-highlights">
                {service.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="container-xl room-list">
            <span className="small-label">Consider it for</span>
            {service.idealFor.map((room) => (
              <span key={room}>{room}</span>
            ))}
          </div>
        </section>
        <section className="service-proof">
          <div className="container-xl service-proof-grid">
            <figure>
              <Image
                src="/images/gallery/luxury-decorative-moulding-11.jpg"
                alt="Installed sage wall paneling from our decorative moulding project gallery"
                width={2200}
                height={1650}
                sizes="(min-width: 900px) 50vw, 100vw"
              />
              <figcaption>From our decorative wall moulding work</figcaption>
            </figure>
            <div>
              <Eyebrow>What makes the detail feel right</Eyebrow>
              <h2 className="section-title">
                A plan for your room.
                <br />
                An eye for the whole home.
              </h2>
              <p className="body-copy">
                Spacing, profile, material, and the existing architecture all
                matter. We work through those choices with you, so the finished
                detail feels like it belongs.
              </p>
              <ActionLink href="#consultation">
                Talk through my ideas
              </ActionLink>
              <p className="quiet-note">Your initial consultation is free.</p>
            </div>
          </div>
        </section>
        <ProcessSection />
        <FaqSection
          title={"Planning your " + service.title.toLowerCase() + " project."}
          questions={questions}
        />
        {advertising ? (
          <section className="ad-closing">
            <div className="container-xl">
              <Eyebrow>Ready when you are</Eyebrow>
              <h2 className="section-title">
                Imagine the possibilities
                <br />
                for your own room.
              </h2>
              <ActionLink href="#consultation">
                Start my free consultation
              </ActionLink>
              <p>
                Or call{" "}
                <a href="tel:+13148180815" data-cta="ad_closing_call">
                  (314) 818-0815
                </a>
              </p>
            </div>
          </section>
        ) : (
          <>
            <ConsultationSection
              service={service.title}
              location={"service:" + service.slug}
            />
            <section className="related-section">
              <div className="container-xl">
                <Eyebrow>Details that work together</Eyebrow>
                <div className="related-links">
                  {related.map((item) => (
                    <Link key={item.slug} href={"/services/" + item.slug}>
                      {item.title}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </PageShell>
  );
}
