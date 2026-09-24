import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceExperience from "../../components/ServiceExperience";
import { adServiceSlugs } from "../../data/presentation";
import { getService } from "../../data/services";
export const dynamicParams = false;
export function generateStaticParams() {
  return adServiceSlugs.map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  return {
    title: service
      ? service.title + " | Free St. Louis Consultation"
      : "Free Consultation",
    description:
      "Custom moulding for the home you love. Explore your ideas with a free consultation from Moulding Saint Louis.",
    robots: { index: false, follow: true },
    alternates: { canonical: "/services/" + slug },
  };
}
export default async function AdLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!adServiceSlugs.includes(slug) || !service || service.archived)
    notFound();
  return <ServiceExperience service={service} advertising />;
}
