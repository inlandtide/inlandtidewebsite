import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "../components/SiteChrome";
import { breadcrumbSchema, siteUrl } from "../data/seo";
import JsonLd from "../components/JsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Moulding Saint Louis. Learn how we collect, use, and protect your personal information when you visit mouldingstl.com.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Moulding Saint Louis",
    description: "Learn how Moulding Saint Louis collects, uses, and protects your personal information.",
    url: `${siteUrl}/privacy-policy`,
    siteName: "Moulding Saint Louis",
  },
};

const lastUpdated = "July 27, 2026";

const sections = [
  {
    heading: "Information We Collect and How We Use It",
    body: "When you interact with our website — for example, by submitting a contact or consultation request — we may ask you to provide certain personal information including, but not limited to, your name, phone number, email address, and project details. This information is used solely to identify you and respond to your inquiry. We do not sell, rent, or trade your personal information to third parties.",
  },
  {
    heading: "Analytics and Tracking",
    body: null,
    custom: "analytics",
  },
  {
    heading: "Log Data",
    body: "Like most websites, our hosting infrastructure automatically collects certain log data whenever you visit mouldingstl.com. This may include your device's Internet Protocol (IP) address, browser type and version, the pages you visit, the date and time of your visit, and the time spent on each page. This data is used in aggregate to help us understand site traffic and improve our service.",
  },
  {
    heading: "Cookies",
    body: "Our website uses cookies — small data files stored on your device — to support analytics and improve your experience. You may configure your browser to refuse cookies or to alert you when cookies are being sent. Please note that some features of the site may not function properly if cookies are disabled.",
  },
  {
    heading: "Contact Form Submissions",
    body: "When you submit a contact or consultation request through our website, your submission is processed by our secure backend and delivered to our team via a transactional email service. A copy of your submission may also be stored in an internal spreadsheet for record-keeping purposes. This data is used exclusively to respond to your inquiry and is not shared with third parties for marketing purposes.",
  },
  {
    heading: "Service Providers",
    body: "We may engage trusted third-party service providers to help us operate our website and deliver our services. These providers are given access to your personal information only to the extent necessary to perform their functions and are obligated not to disclose or use it for any other purpose. Current service providers include Vercel (website hosting), Resend (transactional email delivery), and Google (analytics).",
  },
  {
    heading: "Security",
    body: "We take reasonable technical and organizational measures to protect your personal information from unauthorized access, disclosure, or loss. All form submissions are processed over encrypted HTTPS connections and handled server-side. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    heading: "Links to Other Sites",
    body: "Our website may contain links to external websites that are not operated by Moulding Saint Louis. If you click a third-party link, you will be directed to that site. We strongly encourage you to review the privacy policy of any external site you visit. We have no control over and assume no responsibility for the content or privacy practices of third-party sites.",
  },
  {
    heading: "Children's Privacy",
    body: "Our website is not directed at children under the age of 13, and we do not knowingly collect personal information from anyone under 13. If you believe a child has submitted personal information through our site, please contact us and we will promptly delete it.",
  },
  {
    heading: "Changes to This Policy",
    body: "We may update this Privacy Policy from time to time as our practices or legal obligations change. Any updates will be posted on this page with a revised effective date. We encourage you to review this page periodically.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteUrl },
          { name: "Privacy Policy", url: `${siteUrl}/privacy-policy` },
        ])}
      />
      <main className="bg-[#FEFAF1]">

        {/* Page header */}
        <section className="bg-[#081828] py-20 text-[#FEFAF1]">
          <div className="container-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#B4904E]">Legal</p>
            <h1 className="mt-5 font-heading text-6xl font-semibold leading-[0.92] text-balance sm:text-7xl">
              Privacy Policy
            </h1>
            <p className="mt-6 text-lg text-[#FEFAF1]/65">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Body */}
        <section className="py-20">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl">

              {/* Intro */}
              <p className="text-lg leading-8 text-[#2E404E]">
                Moulding Saint Louis operates the{" "}
                <a href="https://mouldingstl.com" className="text-[#B4904E] underline underline-offset-4 hover:opacity-75">
                  mouldingstl.com
                </a>{" "}
                website. This Privacy Policy is intended to inform visitors about how we collect, use, and
                protect personal information submitted through our website. Any personal information we
                collect will not be used or shared with anyone except as described in this policy.
              </p>

              {/* Sections */}
              {sections.map((section) => (
                <div key={section.heading} className="mt-12">
                  <h2 className="font-heading text-3xl font-semibold text-[#081828] sm:text-4xl">
                    {section.heading}
                  </h2>
                  <div className="mt-1 h-px w-12 bg-[#B4904E]" />

                  {section.custom === "analytics" ? (
                    <div className="mt-5 space-y-5 text-lg leading-8 text-[#2E404E]">
                      <p>
                        We use Google Analytics 4 to understand how visitors interact with our website. This
                        service collects anonymized data such as pages visited, time spent on the site, and
                        general geographic location. Google Analytics uses cookies and similar tracking
                        technologies to compile this information. You can learn more by visiting the{" "}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#B4904E] underline underline-offset-4 hover:opacity-75"
                        >
                          Google Privacy Policy
                        </a>
                        .
                      </p>
                      <p>
                        We may also use the Meta Pixel (Facebook Pixel) to measure the effectiveness of our
                        advertising and to understand how visitors interact with our site after viewing a
                        Facebook or Instagram ad. For more information, visit{" "}
                        <a
                          href="https://www.facebook.com/privacy/policy/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#B4904E] underline underline-offset-4 hover:opacity-75"
                        >
                          Meta&apos;s Privacy Policy
                        </a>
                        .
                      </p>
                    </div>
                  ) : section.heading === "Children's Privacy" ? (
                    <p className="mt-5 text-lg leading-8 text-[#2E404E]">
                      Our website is not directed at children under the age of 13, and we do not knowingly
                      collect personal information from anyone under 13. If you believe a child has submitted
                      personal information through our site, please contact us and we will promptly delete it.
                    </p>
                  ) : (
                    <p className="mt-5 text-lg leading-8 text-[#2E404E]">{section.body}</p>
                  )}
                </div>
              ))}

              {/* Contact section */}
              <div className="mt-12">
                <h2 className="font-heading text-3xl font-semibold text-[#081828] sm:text-4xl">
                  Contact Us
                </h2>
                <div className="mt-1 h-px w-12 bg-[#B4904E]" />
                <p className="mt-5 text-lg leading-8 text-[#2E404E]">
                  If you have any questions or concerns about this Privacy Policy or how your information
                  is handled, please reach out through our{" "}
                  <Link href="/contact" className="text-[#B4904E] underline underline-offset-4 hover:opacity-75">
                    contact page
                  </Link>{" "}
                  or by calling{" "}
                  <a href="tel:+13148180815" className="text-[#B4904E] underline underline-offset-4 hover:opacity-75">
                    (314) 818-0815
                  </a>
                  .
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>
    </PageShell>
  );
}
