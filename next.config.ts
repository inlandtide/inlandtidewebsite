import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fail closed in local and preview builds. Only Vercel production may send
  // leads or load the real advertising/analytics scripts.
  env: {
    NEXT_PUBLIC_SITE_MODE: process.env.VERCEL_ENV === "production" ? "production" : "preview",
  },
  async headers() {
    return process.env.VERCEL_ENV === "production" ? [] : [{
      source: "/:path*",
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
    }];
  },
};

export default nextConfig;
