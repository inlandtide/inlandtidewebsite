import type { Metadata } from "next";
import { businessAddress } from "./business";
import { publicServices } from "./services";

export const siteUrl = "https://mouldingstl.com";
export const siteName = "Moulding Saint Louis";
export const logoUrl = `${siteUrl}/moulding-stl-inverted-logo.png`;
export const defaultOgImage = `${siteUrl}/images/placeholders/hero-workshop.jpg`;

// Keep each page's search and sharing metadata in sync. Nested social metadata
// replaces layout defaults in Next.js, so include the image and site details here.
export function pageMetadata({ title, description, path, image = defaultOgImage, imageAlt = "Moulding Saint Louis architectural woodwork", absoluteTitle = false }: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName,
      title,
      description,
      url: `${siteUrl}${path === "/" ? "" : path}`,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

const ckcOrganization = {
  "@type": "Organization",
  "@id": "https://ckcwoodworks.com/#organization",
  name: "CKC Woodworks",
  url: "https://ckcwoodworks.com/",
};

const stLouisServiceArea = {
  "@type": "City",
  name: "St. Louis",
  containedInPlace: { "@type": "State", name: "Missouri" },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${siteUrl}/#business`,
  name: siteName,
  alternateName: "Moulding STL",
  url: siteUrl,
  telephone: "+1-314-818-0815",
  logo: logoUrl,
  image: [logoUrl, defaultOgImage],
  description:
    "As the residential arm of CKC Woodworks, Moulding Saint Louis provides custom cabinetry, built-ins, moulding, wainscoting and finish carpentry for St. Louis homes.",
  parentOrganization: ckcOrganization,
  address: {
    "@type": "PostalAddress",
    ...businessAddress,
  },
  areaServed: [
    stLouisServiceArea,
    {
      "@type": "AdministrativeArea",
      name: "Greater St. Louis",
    },
  ],
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  }],
  priceRange: "$$$",
  knowsAbout: [
    "Finish carpentry",
    "Luxury moulding",
    "Wainscoting",
    "Crown moulding",
    "Picture frame moulding",
    "Fireplace mantels",
    "Window and door casing",
    "Custom cabinetry",
    "Custom casework",
    "Custom built-ins",
    "Custom shelving",
    "Architectural wood finishes",
  ],
  makesOffer: publicServices.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.summary,
      areaServed: "St. Louis, MO",
      provider: { "@id": `${siteUrl}/#business` },
      url: `${siteUrl}/services/${service.slug}`,
    },
  })),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  publisher: { "@id": `${siteUrl}/#business` },
  inLanguage: "en-US",
};

export const commercialWoodworkSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/commercial#service`,
  name: "Commercial Manufacturing & Woodwork in St. Louis",
  serviceType: [
    "Commercial cabinetry",
    "Commercial casework",
    "Commercial doors",
    "Specialty woodwork runs",
    "Architectural woodwork",
  ],
  description:
    "Commercial cabinetry, casework, doors, specialty runs, and architectural woodwork in St. Louis through CKC Woodworks, a union shop with more than 40 years of experience.",
  url: `${siteUrl}/commercial`,
  areaServed: stLouisServiceArea,
  provider: ckcOrganization,
};

export function serviceSchema(service: { title: string; slug: string; summary: string; hero: string }, introduction?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/services/${service.slug}#service`,
    name: `${service.title} in St. Louis`,
    serviceType: service.title,
    description: introduction ?? (service.hero || service.summary),
    url: `${siteUrl}/services/${service.slug}`,
    areaServed: stLouisServiceArea,
    image: `${siteUrl}/images/placeholders/${service.slug}.jpg`,
    provider: { "@id": `${siteUrl}/#business` },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
