import type { MetadataRoute } from "next";
import { siteUrl } from "./data/seo";
import { isPreview } from "./lib/site-environment";

export default function robots(): MetadataRoute.Robots {
  if (isPreview) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
