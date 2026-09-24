import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isPreview } from "../lib/site-environment";
import { PageShell } from "../components/SiteChrome";
import { Eyebrow } from "../components/Design";

export const metadata: Metadata = {
  title: "Private Design Review",
  robots: { index: false, follow: false },
};
const pages = [
  ["/", "The redesigned homepage"],
  ["/lp/picture-frame-moulding", "Picture frame moulding · Ad landing page"],
  ["/lp/wainscoting-beadboard", "Wainscoting · Ad landing page"],
  ["/lp/crown-moulding", "Crown moulding · Ad landing page"],
  ["/services/picture-frame-moulding", "Picture frame moulding · SEO page"],
  ["/gallery", "Project gallery & inspiration"],
  ["/contact", "The simpler consultation form"],
  ["/about", "The local company story"],
];
export default function PreviewGuide() {
  if (!isPreview) notFound();
  return (
    <PageShell>
      <main id="main-content" className="review-page">
        <div className="container-xl">
          <Eyebrow>Moulding Saint Louis · Private design review</Eyebrow>
          <h1>
            A fresh look.
            <br />
            An easier next step.
          </h1>
          <p>
            This preview explores a more inviting, image-led design and a
            clearer path to a free consultation. The three ad landing pages are
            focused versions for paid traffic; the existing service URLs keep
            the fuller information useful for search.
          </p>
          <div className="review-links">
            {pages.map(([href, label]) => (
              <Link href={href} key={href}>
                {label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
          <h2 className="section-title">Try it like a homeowner.</h2>
          <ul>
            <li>Open the site on your phone as well as your computer.</li>
            <li>
              Find a service, browse a project photo, and request a
              consultation.
            </li>
            <li>
              The forms are safe to test: no email, CRM record, or ad conversion
              is created.
            </li>
            <li>
              Notice whether it is clear what we offer, where we work, and what
              happens next.
            </li>
          </ul>
          <p>
            Only the staging version has changed. The live website and
            advertising destinations have not been switched. Share the original
            private link to give someone access; the ordinary address alone may
            ask them to sign in.
          </p>
        </div>
      </main>
    </PageShell>
  );
}
