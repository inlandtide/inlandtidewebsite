import Link from "next/link";
import { PageShell } from "../components/SiteChrome";

export const metadata = {
  title: "Our Process",
  description:
    "Learn how Moulding Saint Louis guides custom moulding and finish carpentry projects from consultation through final walkthrough.",
};

const steps = [
  {
    title: "Conversation & Consultation",
    copy: "We begin by listening. The first conversation is about your home, the rooms involved, the style you want, and the expectations that will make the project feel successful.",
  },
  {
    title: "Design Direction & Materials",
    copy: "We recommend profiles, layouts, wood products, finish direction, and similar or requested materials when they make sense for the design and performance needs of the project.",
  },
  {
    title: "Scheduling & Preparation",
    copy: "Before installation begins, we confirm details and communicate what to expect so the project feels organized and respectful of your home.",
  },
  {
    title: "Skilled Installation",
    copy: "Finish carpentry depends on proportion, clean measurement, careful cuts, and jobsite respect. We focus on craftsmanship and a tidy installation experience.",
  },
  {
    title: "Final Walkthrough",
    copy: "The project closes with a review of the completed work and an opportunity to confirm the details before the job is complete.",
  },
];

export default function ProcessPage() {
  return (
    <PageShell>
      <main>
        <section className="bg-[#081828] py-24 text-[#FEFAF1]">
          <div className="container-xl max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Our Process</p>
            <h1 className="mt-5 font-heading text-6xl font-semibold leading-tight text-balance sm:text-7xl">
              Custom finish carpentry should feel clear, careful, and well cared for.
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-[#FEFAF1]/76">
              Our process is designed to give homeowners confidence before, during, and after installation.
            </p>
          </div>
        </section>

        <section className="bg-[#FEFAF1] py-24">
          <div className="container-xl space-y-6">
            {steps.map((step, index) => (
              <div key={step.title} className="grid gap-6 border border-[#D6D2C6] bg-white p-7 md:grid-cols-[160px_1fr] md:p-9">
                <div>
                  <p className="font-heading text-6xl font-semibold text-[#B4904E]">0{index + 1}</p>
                </div>
                <div>
                  <h2 className="font-heading text-4xl font-semibold text-[#081828]">{step.title}</h2>
                  <p className="mt-4 max-w-3xl text-lg leading-8 text-[#2E404E]">{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#D6D2C6]/45 py-20">
          <div className="container-xl flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Your Home, Handled Carefully</p>
              <h2 className="mt-3 font-heading text-5xl font-semibold leading-tight text-[#081828] text-balance">
                Tell us what you want the finished space to feel like.
              </h2>
            </div>
            <Link href="/contact" className="shrink-0 border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#081828] transition hover:bg-transparent">
              Request a Consultation
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
