import { services } from "./services";

export const siteUrl = "https://mouldingstl.com";
export const siteName = "Moulding Saint Louis";
export const logoUrl = `${siteUrl}/moulding-stl-inverted-logo.png`;
export const defaultOgImage = `${siteUrl}/images/placeholders/hero-workshop.jpg`;

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
    "Moulding Saint Louis provides luxury moulding, wainscoting, casing, mantels, archways, pergolas, gazebos, and custom finish carpentry for St. Louis homes.",
  areaServed: [
    {
      "@type": "City",
      name: "St. Louis",
      addressRegion: "MO",
      addressCountry: "US",
    },
    {
      "@type": "AdministrativeArea",
      name: "Greater St. Louis",
      addressCountry: "US",
    },
  ],
  priceRange: "$$$",
  knowsAbout: [
    "Finish carpentry",
    "Luxury moulding",
    "Wainscoting",
    "Crown moulding",
    "Picture frame moulding",
    "Fireplace mantels",
    "Window and door casing",
    "Gazebos and pergolas",
    "Architectural wood finishes",
  ],
  makesOffer: services.map((service) => ({
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

export function serviceSchema(service: { title: string; slug: string; summary: string; hero: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/services/${service.slug}#service`,
    name: `${service.title} in St. Louis`,
    serviceType: service.title,
    description: service.hero || service.summary,
    url: `${siteUrl}/services/${service.slug}`,
    areaServed: {
      "@type": "City",
      name: "St. Louis",
      addressRegion: "MO",
      addressCountry: "US",
    },
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
