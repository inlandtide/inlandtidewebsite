import Link from "next/link";
import { PageShell } from "../components/SiteChrome";

export const metadata = {
  title: "About",
  description:
    "Moulding Saint Louis is independently owned and operated in St. Louis by Tim Hebel and Ryan Hall.",
};

const values = [
  "Design-minded finish carpentry",
  "Quality wood products and appropriate requested materials",
  "Clear communication and expectations",
  "Respectful, tidy installation experience",
];

export default function AboutPage() {
  return (
    <PageShell>
      <main>
        <section className="bg-[#081828] py-24 text-[#FEFAF1]">
          <div className="container-xl grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">About Moulding Saint Louis</p>
              <h1 className="mt-5 font-heading text-6xl font-semibold leading-tight text-balance sm:text-7xl">
                Independently owned, locally operated, and focused on the details that finish a home.
              </h1>
            </div>
            <p className="text-xl leading-9 text-[#FEFAF1]/76">
              Moulding Saint Louis is led in St. Louis by Tim Hebel and Ryan Hall, with a focus on premium finish carpentry, custom wood details, and a customer experience rooted in care.
            </p>
          </div>
        </section>

        <section className="bg-[#FEFAF1] py-24">
          <div className="container-xl grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Our Point of View</p>
              <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-[#081828] text-balance">
                The right moulding, casing, or wall treatment should look like it was always meant to be there.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-[#2E404E]">
              <p>
                We believe finish carpentry is one of the most effective ways to elevate a home. Thoughtful moulding, wainscoting, fireplace details, and casing can add proportion, warmth, and permanence without changing the entire structure of a room.
              </p>
              <p>
                Our work centers on high-end moulding and wood finishes, but the project conversation always begins with the customer’s goals. We help clarify style, materials, scope, and expectations so the finished detail feels both beautiful and appropriate.
              </p>
              <p>
                Homeowners should also feel cared for during the process. That means clear communication, respect for the home, thoughtful recommendations, and a final result that reflects the level of detail customers expect from a premium finish carpentry specialist.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#D6D2C6]/45 py-24">
          <div className="container-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">What We Value</p>
            <div className="mt-8 grid gap-5 md:grid-cols-4">
              {values.map((value) => (
                <div key={value} className="border border-[#D6D2C6] bg-white p-7">
                  <p className="text-[#B4904E]">◆</p>
                  <h3 className="mt-5 font-heading text-3xl font-semibold leading-tight text-[#081828]">{value}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#081828] py-20 text-[#FEFAF1]">
          <div className="container-xl flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Work With Us</p>
              <h2 className="mt-3 font-heading text-5xl font-semibold leading-tight text-balance">
                Ready to bring custom wood detail into your home?
              </h2>
            </div>
            <Link href="/contact" className="shrink-0 border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#081828] transition hover:bg-transparent hover:text-[#B4904E]">
              Request a Consultation
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
