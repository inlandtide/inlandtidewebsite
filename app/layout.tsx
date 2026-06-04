import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Zilla_Slab } from "next/font/google";
import JsonLd from "./components/JsonLd";
import { defaultOgImage, localBusinessSchema, siteName, siteUrl, websiteSchema } from "./data/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const zilla = Zilla_Slab({
  subsets: ["latin"],
  variable: "--font-zilla",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Moulding Saint Louis | Luxury Moulding & Finish Carpentry in St. Louis",
    template: "%s | Moulding Saint Louis",
  },
  description:
    "Luxury moulding, wainscoting, crown moulding, casing, mantels, gazebos, pergolas, and architectural wood finishes for St. Louis homes.",
  applicationName: siteName,
  keywords: [
    "Moulding Saint Louis",
    "St. Louis moulding",
    "finish carpentry St. Louis",
    "custom wainscoting St. Louis",
    "crown moulding St. Louis",
    "picture frame moulding St. Louis",
    "fireplace mantels St. Louis",
    "window and door casing St. Louis",
    "gazebos and pergolas St. Louis",
    "architectural wood finishes",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Moulding Saint Louis | Luxury Moulding & Finish Carpentry in St. Louis",
    description:
      "Custom finish carpentry, moulding, wainscoting, casing, mantels, pergolas, and high-end architectural wood details for St. Louis homes.",
    siteName,
    images: [
      {
        url: defaultOgImage,
        width: 1800,
        height: 1200,
        alt: "Moulding Saint Louis architectural wood finishes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moulding Saint Louis | Luxury Moulding & Finish Carpentry",
    description:
      "High-end moulding, wainscoting, casing, mantels, pergolas, and custom finish carpentry for St. Louis homes.",
    images: [defaultOgImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${zilla.variable}`}>
      <body className="antialiased">
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '3892771434365667');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3892771434365667&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
