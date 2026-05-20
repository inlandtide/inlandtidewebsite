import Image from "next/image";
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
      <main className="bg-[#FEFAF1]">
        <section className="relative flex min-h-[650px] items-end overflow-hidden bg-[#081828] text-[#FEFAF1]">
          <Image
            src="/images/placeholders/window-door-casing.jpg"
            alt="Door and casing placeholder"
            fill
            priority
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,24,40,0.30),rgba(8,24,40,0.96))]" />
          <div className="container-xl relative pb-20 pt-28">
            <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#B4904E]">About Moulding Saint Louis</p>
            <h1 className="mt-5 max-w-6xl font-heading text-6xl font-semibold leading-[0.92] text-balance sm:text-8xl">
              Independently owned, locally operated, and focused on the details that finish a home.
            </h1>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="container-xl grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="relative min-h-[620px] overflow-hidden bg-[#081828] luxury-shadow">
              <Image
                src="/images/placeholders/picture-frame-moulding.jpg"
                alt="Wall moulding detail placeholder"
                fill
                className="object-cover opacity-90"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Our Point of View</p>
              <h2 className="mt-5 font-heading text-5xl font-semibold leading-[0.98] text-[#081828] text-balance sm:text-7xl">
                The right detail should look like it was always meant to be there.
              </h2>
              <div className="mt-8 space-y-6 text-lg leading-8 text-[#2E404E]">
                <p>
                  Moulding Saint Louis is led in St. Louis by Tim Hebel and Ryan Hall, with a focus on premium finish carpentry, custom wood details, and a customer experience rooted in care.
                </p>
                <p>
                  We believe thoughtful moulding, wainscoting, fireplace details, and casing can add proportion, warmth, and permanence without changing the entire structure of a room.
                </p>
                <p>
                  Our work centers on high-end moulding and wood finishes, but the project conversation always begins with the customer’s goals. We help clarify style, materials, scope, and expectations so the finished detail feels both beautiful and appropriate.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#D6D2C6]/45 py-24">
          <div className="container-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">What We Value</p>
            <div className="mt-8 grid gap-5 md:grid-cols-4">
              {values.map((value, index) => (
                <div key={value} className="border border-[#D6D2C6] bg-white p-7 shadow-sm">
                  <p className="font-heading text-5xl font-semibold text-[#B4904E]">0{index + 1}</p>
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
              <h2 className="mt-3 max-w-4xl font-heading text-5xl font-semibold leading-tight text-balance">
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
