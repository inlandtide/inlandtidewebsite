import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moulding Saint Louis",
  description:
    "Fine Wood Wainscoting & Architectural Trim — crafted for Saint Louis homes. Coming Soon.",
  openGraph: {
    title: "Moulding Saint Louis",
    description:
      "Fine Wood Wainscoting & Architectural Trim — crafted for Saint Louis homes.",
    siteName: "Moulding Saint Louis",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
