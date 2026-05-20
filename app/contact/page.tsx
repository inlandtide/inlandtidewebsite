import ContactForm from "../components/ContactForm";
import { PageShell } from "../components/SiteChrome";

export const metadata = {
  title: "Contact",
  description:
    "Request a consultation with Moulding Saint Louis for luxury moulding, trim, wainscoting, mantels, casing, and custom finish carpentry.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <main>
        <section className="bg-[#081828] py-24 text-[#FEFAF1]">
          <div className="container-xl grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Request a Consultation</p>
              <h1 className="mt-5 font-heading text-6xl font-semibold leading-tight text-balance sm:text-7xl">
                Tell us about the details you want to add to your home.
              </h1>
              <p className="mt-7 text-xl leading-9 text-[#FEFAF1]/76">
                Share the rooms, project type, desired timeline, and inspiration you have in mind. We will review your inquiry and help determine the best next step.
              </p>

              <div className="mt-10 border-l-4 border-[#B4904E] bg-[#FEFAF1]/5 p-6">
                <p className="font-heading text-3xl font-semibold text-[#FEFAF1]">What happens next?</p>
                <p className="mt-3 leading-7 text-[#FEFAF1]/74">
                  Tim, Ryan, or a member of the team will review your message. We may ask for photos, inspiration, room dimensions, or a short conversation so expectations are clear before the project moves forward.
                </p>
              </div>
            </div>

            <div className="border border-[#B4904E]/45 bg-[#FEFAF1]/5 p-6 sm:p-9">
              <ContactForm variant="dark" compact />
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
