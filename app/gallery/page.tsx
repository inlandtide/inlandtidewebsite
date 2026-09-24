import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import GalleryCollection from "../components/GalleryCollection";
import { PageShell } from "../components/SiteChrome";
import { ActionLink, ConsultationSection, Eyebrow } from "../components/Design";
import { breadcrumbSchema, defaultOgImage, siteUrl } from "../data/seo";
import { publicGalleryCategories } from "../data/gallery";
export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Explore recent Moulding Saint Louis wall moulding projects and design inspiration for picture frame moulding, wainscoting, crown, mantels and casing.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Project Gallery | Moulding Saint Louis",
    description: "Real project details and inspiration for your home.",
    url: siteUrl + "/gallery",
    images: [defaultOgImage],
  },
};
const isProject = (name: string) => name.startsWith("IMG_");
export default function GalleryPage() {
  const projects = publicGalleryCategories.flatMap((category) =>
    category.images.filter((image) => isProject(image.sourceName)),
  );
  return (
    <PageShell ctaHref="#consultation">
      <main id="main-content">
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Gallery", url: siteUrl + "/gallery" },
          ])}
        />
        <section className="page-intro">
          <div className="container-xl">
            <Eyebrow>Work & inspiration</Eyebrow>
            <h1>
              Find the detail{" "}
              <br />
              you will fall in love with.
            </h1>
            <p>
              A closer look at our recent wall moulding work, followed by design
              inspiration to help you imagine the possibilities in your home.
            </p>
            <ActionLink href="#consultation" secondary>
              Let’s talk about your favorite
            </ActionLink>
          </div>
        </section>
        <section id="recent-projects" className="gallery-section">
          <div className="container-xl">
            <div className="section-heading-row">
              <div>
                <Eyebrow>From our project gallery</Eyebrow>
                <h2 className="section-title">Recent work. Real details.</h2>
              </div>
              <p className="body-copy">
                Select a photograph to see the full view.
              </p>
            </div>
            <GalleryCollection
              images={projects
                .toReversed()
                .map((image) => ({
                  ...image,
                  alt: image.src.includes("picture-frame")
                    ? "Blue picture frame wall moulding from our project gallery"
                    : "Custom decorative wall paneling from our project gallery",
                }))}
              label="Moulding Saint Louis project"
            />
          </div>
        </section>
        <section className="inspiration-intro">
          <div className="container-xl">
            <Eyebrow>Explore a look for your home</Eyebrow>
            <h2 className="section-title">A little more inspiration.</h2>
            <p className="body-copy">
              These reference interiors illustrate styles and possibilities.
              They are design inspiration, separate from the recent Moulding
              Saint Louis project photos above.
            </p>
            <nav className="gallery-jump-links" aria-label="Gallery categories">
              {publicGalleryCategories.map((category) => (
                <a href={"#" + category.slug} key={category.slug}>
                  {category.title}
                </a>
              ))}
            </nav>
          </div>
        </section>
        {publicGalleryCategories.map((category) => (
          <section
            className="gallery-section"
            id={category.slug}
            key={category.slug}
          >
            <div className="container-xl">
              <div className="gallery-category-heading">
                <h2>{category.title}</h2>
                <Link href={"/services/" + category.slug}>
                  Explore the service ↗
                </Link>
              </div>
              <GalleryCollection
                images={category.images
                  .filter((image) => !isProject(image.sourceName))
                  .map((image) => ({
                    ...image,
                    alt: category.title + " design inspiration",
                  }))}
                label={category.title + " · Design inspiration"}
              />
            </div>
          </section>
        ))}
        <ConsultationSection
          location="gallery"
          title="Found a detail you love?"
        />
      </main>
    </PageShell>
  );
}
