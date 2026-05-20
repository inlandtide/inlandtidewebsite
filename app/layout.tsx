import type { Metadata } from "next";
import { Cormorant_Garamond, Zilla_Slab } from "next/font/google";
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
  metadataBase: new URL("https://mouldingstl.com"),
  title: {
    default: "Moulding Saint Louis | Luxury Moulding & Finish Carpentry",
    template: "%s | Moulding Saint Louis",
  },
  description:
    "Luxury moulding, wainscoting, trim, fireplace mantels, casing, and architectural wood finishes for St. Louis homes.",
  openGraph: {
    title: "Moulding Saint Louis | Luxury Moulding & Finish Carpentry",
    description:
      "Custom finish carpentry and high-end architectural wood details for St. Louis homes.",
    siteName: "Moulding Saint Louis",
    images: ["/moulding-saint-louis-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${zilla.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
