import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "./components/JsonLd";
import { PageShell } from "./components/SiteChrome";
import {
  ActionLink,
  Arrow,
  ConsultationSection,
  Eyebrow,
  FaqSection,
  generalQuestions,
  ProcessSection,
  ProjectHighlights,
} from "./components/Design";
import {
  breadcrumbSchema,
  defaultOgImage,
  siteName,
  siteUrl,
} from "./data/seo";
export const metadata: Metadata = {
  title: {
    absolute: "Luxury Moulding, Wainscoting & Finish Carpentry in St. Louis",
  },
  description:
    "Custom moulding, picture frame walls, wainscoting and crown moulding for St. Louis homes. Explore the possibilities and start with a free consultation.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Luxury Moulding, Wainscoting & Finish Carpentry in St. Louis",
    description:
      "Beautifully considered wood details for the home you love. Start with a free consultation.",
    url: siteUrl,
    siteName,
    images: [defaultOgImage],
  },
};
const styles = [
  {
    slug: "picture-frame-moulding",
    title: "Picture frame moulding",
    copy: "Give plain walls a sense of rhythm, depth, and occasion.",
    src: "/images/gallery/picture-frame-moulding-12.jpg",
    label: "From our project gallery",
    alt: "Blue picture frame wall moulding installed by Moulding Saint Louis",
  },
  {
    slug: "wainscoting-beadboard",
    title: "Wainscoting & wall details",
    copy: "Bring timeless character to dining rooms, entries, and everyday spaces.",
    src: "/images/placeholders/wainscoting-beadboard.jpg",
    label: "Design inspiration",
    alt: "Wainscoting design inspiration for a bright interior",
  },
  {
    slug: "crown-moulding",
    title: "Crown moulding",
    copy: "The finishing touch that makes a room feel complete.",
    src: "/images/placeholders/crown-moulding.jpg",
    label: "Design inspiration",
    alt: "Crown moulding inspiration showing a finished ceiling line",
  },
];
export default function Home() {
  return (
    <PageShell ctaHref="#consultation">
      <main id="main-content">
        <JsonLd data={breadcrumbSchema([{ name: "Home", url: siteUrl }])} />
        <section className="home-hero">
          <div className="hero-copy">
            <Eyebrow>Custom moulding & finish carpentry · St. Louis</Eyebrow>
            <h1>
              Make your home feel <em>beautifully</em> finished.
            </h1>
            <p>
              Thoughtful wall moulding, wainscoting, and crown details. Designed
              around your rooms. Installed with care.
            </p>
            <div className="hero-actions">
              <ActionLink />
              <span>Free consultation. No obligation.</span>
            </div>
            <ActionLink href="#styles" secondary id="explore_styles">
              Find your inspiration
            </ActionLink>
          </div>
          <figure className="hero-photo">
            <Image
              src="/images/gallery/picture-frame-moulding-12.jpg"
              alt="A finished blue room with picture frame moulding, chair rail, and crown details by Moulding Saint Louis"
              fill
              priority
              sizes="(min-width: 900px) 56vw, 100vw"
              className="object-cover"
            />
            <figcaption>
              <span className="small-label">From our project gallery</span>
              <span>Ordinary walls. Extraordinary character.</span>
              <Link
                href="/gallery#recent-projects"
                aria-label="Explore this moulding project"
              >
                <Arrow diagonal />
              </Link>
            </figcaption>
          </figure>
        </section>
        <div className="reassurance-strip">
          <div className="container-xl">
            <span>
              <b aria-hidden="true">✓</b> Locally owned in St. Louis
            </span>
            <span>
              <b aria-hidden="true">✓</b> Custom layouts & careful installation
            </span>
            <span>
              <b aria-hidden="true">✓</b> Free project consultation
            </span>
          </div>
        </div>
        <section className="section-space" id="styles">
          <div className="container-xl">
            <div className="section-heading-row">
              <div>
                <Eyebrow>A little inspiration</Eyebrow>
                <h2 className="section-title">Which detail speaks to you?</h2>
              </div>
              <p className="body-copy">
                A favorite room can feel completely new.
                <br />
                Start with the detail you are drawn to.
              </p>
            </div>
            <div className="style-grid">
              {styles.map((style, index) => (
                <Link
                  href={`/services/${style.slug}`}
                  className="style-card"
                  key={style.slug}
                >
                  <div className="style-image">
                    <Image
                      src={style.src}
                      alt={style.alt}
                      fill
                      sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span>{style.label}</span>
                  </div>
                  <div className="style-card-heading">
                    <span className="small-label">0{index + 1}</span>
                    <Arrow diagonal />
                  </div>
                  <h3>{style.title}</h3>
                  <p>{style.copy}</p>
                </Link>
              ))}
            </div>
            <div className="more-services">
              <span>And the details that bring everything together.</span>
              <Link href="/services/fireplace-mantels-surrounds">
                Fireplace mantels
              </Link>
              <Link href="/services/window-door-casing">
                Window & door casing
              </Link>
              <Link href="/services">
                All services <Arrow />
              </Link>
            </div>
          </div>
        </section>
        <section className="craft-section">
          <div className="craft-photo">
            <Image
              src="/images/gallery/luxury-decorative-moulding-11.jpg"
              alt="Custom sage wall paneling with careful spacing around doors and openings"
              fill
              sizes="(min-width: 900px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="craft-copy">
            <Eyebrow>Made to belong in your home</Eyebrow>
            <h2 className="section-title">
              Beautiful rooms begin with considered details.
            </h2>
            <p className="body-copy">
              The right moulding does more than fill a wall. It gives a room
              proportion, connects the architecture, and makes the whole space
              feel intentional.
            </p>
            <ul className="feature-list">
              <li>
                <span>01</span>
                <div>
                  <h3>A layout for your room</h3>
                  <p>
                    Planned around your doors, windows, furniture, and the way
                    you live.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>A finish that feels cohesive</h3>
                  <p>
                    Profiles and materials considered alongside the details
                    already in your home.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>A personal, local experience</h3>
                  <p>
                    Clear conversations about your goals, project scope, and
                    next steps.
                  </p>
                </div>
              </li>
            </ul>
            <ActionLink href="/about" secondary id="our_approach">
              Meet our approach
            </ActionLink>
          </div>
        </section>
        <ProjectHighlights />
        <ProcessSection />
        <section className="local-section">
          <div className="container-xl">
            <Eyebrow>At home in St. Louis</Eyebrow>
            <h2>
              For the home you love.
              <br />
              In the place we call home.
            </h2>
            <p>
              Serving homeowners in Chesterfield, Ladue, Clayton, Town and
              Country, Kirkwood, Webster Groves, and the surrounding St. Louis
              area.
            </p>
            <ActionLink href="#consultation" secondary>
              Tell us about your space
            </ActionLink>
          </div>
        </section>
        <FaqSection questions={generalQuestions} />
        <ConsultationSection location="home" />
      </main>
    </PageShell>
  );
}
