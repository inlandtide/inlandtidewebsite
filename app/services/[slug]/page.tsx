import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceExperience from "../../components/ServiceExperience";
import { siteUrl } from "../../data/seo";
import { getService, publicServices } from "../../data/services";
import { serviceGuidance } from "../../data/service-guidance";
export function generateStaticParams() {
  return publicServices.map((service) => ({ slug: service.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service || service.archived)
    return { title: "Service", robots: { index: false, follow: false } };
  const guidance = serviceGuidance[slug];
  const title = guidance?.title ?? service.title + " in St. Louis";
  const description =
    guidance?.description ??
    service.title + " by Moulding Saint Louis. " + service.summary;
  return {
    title: guidance ? { absolute: title } : title,
    description,
    alternates: { canonical: "/services/" + slug },
    openGraph: {
      title,
      description,
      url: siteUrl + "/services/" + slug,
      images: [
        {
          url: siteUrl + "/images/placeholders/" + slug + ".jpg",
          width: 1800,
          height: 1200,
          alt: service.title + " design inspiration",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteUrl + "/images/placeholders/" + slug + ".jpg"],
    },
  };
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service || service.archived) notFound();
  return <ServiceExperience service={service} />;
}
