import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import { PageShell } from "../components/SiteChrome";
import { breadcrumbSchema, defaultOgImage, siteUrl } from "../data/seo";
import { galleryCategories } from "../data/gallery";

export const metadata: Metadata = {
  title: "Project Gallery | Moulding Saint Louis",
  description:
    "Explore Moulding Saint Louis project photos organized by decorative moulding, picture frame moulding, wainscoting, casing, fireplace mantels, and outdoor wood structures.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Project Gallery | Moulding Saint Louis",
    description:
      "A curated gallery of finish carpentry, moulding, mantels, casing, wainscoting, and outdoor woodwork inspiration for St. Louis homes.",
    url: `${siteUrl}/gallery`,
    images: [defaultOgImage],
  },
};

function GalleryTile({ image, index }: { image: (typeof galleryCategories)[number]["images"][number]; index: number }) {
  const aspectClass = image.orientation === "portrait" ? "aspect-[4/5]" : index % 5 === 0 ? "aspect-[16/10] lg:col-span-2" : "aspect-[4/3]";

  return (
    <figure className={`group relative overflow-hidden border border-[#D6D2C6] bg-[#081828] ${aspectClass}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#081828]/70 via-transparent to-transparent opacity-70 transition group-hover:opacity-45" />
      <figcaption className="absolute bottom-0 left-0 right-0 translate-y-2 p-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-xs uppercase tracking-[0.22em] text-[#FEFAF1]/80">Project Detail</p>
      </figcaption>
    </figure>
  );
}

export default function GalleryPage() {
  const featured = galleryCategories[0]?.images[8] ?? galleryCategories[0]?.images[0];

  return (
    <PageShell>
      <main className="bg-[#FEFAF1]">
        <JsonLd data={breadcrumbSchema([{ name: "Gallery", url: `${siteUrl}/gallery` }])} />

        <section className="relative overflow-hidden bg-[#081828] text-[#FEFAF1]">
          {featured ? (
            <Image
              src={featured.src}
              alt="Moulding Saint Louis gallery hero image"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-42"
            />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,24,40,0.54),rgba(8,24,40,0.94))]" />
          <div className="container-xl relative py-28 sm:py-36 lg:py-44">
            <div className="max-w-5xl">
              <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#B4904E]">Project Gallery</p>
              <h1 className="mt-7 font-heading text-6xl font-semibold leading-[0.95] text-balance sm:text-8xl lg:text-9xl">
                Finish carpentry, organized by detail.
              </h1>
              <p className="mt-8 max-w-3xl text-xl leading-9 text-[#FEFAF1]/80">
                Browse a curated collection of moulding, mantels, casing, wainscoting, and outdoor woodwork photos grouped by the type of finish detail shown.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact" className="border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#081828] transition hover:bg-transparent hover:text-[#B4904E]">
                  Request a Consultation
                </Link>
                <Link href="/services" className="border border-[#FEFAF1]/45 px-7 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#FEFAF1] transition hover:border-[#B4904E] hover:text-[#B4904E]">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#FEFAF1] py-20 sm:py-28">
          <div className="container-xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryCategories.map((category) => (
                <a key={category.slug} href={`#${category.slug}`} className="group border border-[#D6D2C6] bg-white p-6 transition hover:-translate-y-1 hover:border-[#B4904E] hover:bg-[#081828] hover:shadow-2xl">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#D6D2C6]">
                    <Image
                      src={category.images[0].src}
                      alt={`${category.title} gallery preview`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-6 text-xs uppercase tracking-[0.26em] text-[#B4904E]">{category.images.length} photos</p>
                  <h2 className="mt-3 font-heading text-4xl font-semibold leading-tight text-[#081828] transition group-hover:text-[#FEFAF1]">
                    {category.title}
                  </h2>
                  <p className="mt-4 leading-7 text-[#2E404E] transition group-hover:text-[#FEFAF1]/75">{category.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-24 bg-[#FEFAF1] pb-24 sm:pb-32">
          {galleryCategories.map((category, categoryIndex) => (
            <div key={category.slug} id={category.slug} className="scroll-mt-28">
              <div className="container-xl">
                <div className="mb-10 grid gap-8 border-t border-[#B4904E]/30 pt-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#B4904E]">Collection {String(categoryIndex + 1).padStart(2, "0")}</p>
                    <h2 className="mt-4 font-heading text-5xl font-semibold leading-none text-[#081828] text-balance sm:text-7xl">
                      {category.title}
                    </h2>
                  </div>
                  <p className="max-w-2xl text-lg leading-8 text-[#2E404E] lg:justify-self-end">
                    {category.description} These images are grouped from the uploaded photo names so each collection stays close to the service it represents.
                  </p>
                </div>

                <div className="grid auto-rows-[220px] gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[260px]">
                  {category.images.map((image, index) => (
                    <GalleryTile key={`${category.slug}-${image.sourceName}`} image={image} index={index} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-[#081828] py-20 text-[#FEFAF1]">
          <div className="container-xl grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.38em] text-[#B4904E]">Ready to plan your detail?</p>
              <h2 className="mt-5 font-heading text-5xl font-semibold leading-none text-balance sm:text-7xl">
                Bring the right inspiration into the first conversation.
              </h2>
            </div>
            <div className="lg:justify-self-end">
              <p className="max-w-xl text-lg leading-8 text-[#FEFAF1]/76">
                If one of these details feels close to what you want, send it with your consultation request. We will help translate the look into a practical approach for your home.
              </p>
              <Link href="/contact" className="mt-8 inline-flex border border-[#B4904E] bg-[#B4904E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#081828] transition hover:bg-transparent hover:text-[#B4904E]">
                Start a Conversation
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
