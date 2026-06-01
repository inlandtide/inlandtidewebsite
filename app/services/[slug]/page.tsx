import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../components/JsonLd";
import { PageShell } from "../../components/SiteChrome";
import { breadcrumbSchema, serviceSchema, siteUrl } from "../../data/seo";
import { getService, services, type Service } from "../../data/services";

type EditorialUseCase = {
  title: string;
  body: string;
};

type EditorialBestFor = {
  headline: string;
  intro: string;
  useCases: EditorialUseCase[];
  closing: string;
};

const editorialBestForBySlug: Record<string, EditorialBestFor> = {
  "luxury-decorative-moulding": {
    headline: "Rooms that deserve architectural intention.",
    intro:
      "Decorative moulding is strongest when it is planned around how a room is entered, used, and viewed. This treatment is about proportion, rhythm, and a finish that feels permanent.",
    useCases: [
      {
        title: "Formal rooms with a point of view",
        body: "Living and dining rooms benefit from moulding that gives the space structure before furniture or art is added. The goal is a room that feels intentionally composed, not simply decorated.",
      },
      {
        title: "Feature walls that feel built in",
        body: "A custom moulding layout can turn a plain wall, stair landing, or entry hall into an architectural moment while still feeling appropriate to the home.",
      },
      {
        title: "Private spaces with quiet polish",
        body: "Primary suites, studies, and sitting rooms can use decorative profiles to add depth, proportion, and a refined finish without overwhelming the room.",
      },
    ],
    closing: "A fit for rooms that need presence, not decoration for decoration’s sake.",
  },
  "picture-frame-moulding": {
    headline: "Walls that need rhythm, balance, and quiet luxury.",
    intro:
      "Picture frame moulding works best when the room needs architectural interest without heavy renovation. The layout should feel measured, symmetrical, and connected to the room’s openings and furniture placement.",
    useCases: [
      {
        title: "Dining rooms and formal gathering spaces",
        body: "Panel moulding gives walls a tailored backdrop for hosting, artwork, lighting, and furniture while keeping the room elegant rather than busy.",
      },
      {
        title: "Stairwells, hallways, and transitions",
        body: "Long walls and pass-through spaces benefit from panel spacing that creates movement and makes the architecture feel intentional from one room to the next.",
      },
      {
        title: "Bedrooms, offices, and feature walls",
        body: "A composed panel layout can frame a headboard wall, desk area, or focal wall with enough detail to feel custom without overpowering the space.",
      },
    ],
    closing: "A fit when a plain wall should become part of the room’s architecture.",
  },
  "crown-moulding": {
    headline: "Rooms where the ceiling line should feel finished.",
    intro:
      "Crown moulding is most effective when profile, scale, and ceiling height are considered together. The right crown gives a room a finished edge and helps connect walls, ceilings, cabinetry, and openings.",
    useCases: [
      {
        title: "Main living spaces and dining rooms",
        body: "Crown moulding can make important rooms feel complete by softening the ceiling transition and adding a refined architectural frame.",
      },
      {
        title: "Primary bedrooms and home offices",
        body: "Private rooms benefit from subtle profile work that adds polish and permanence without making the space feel overly formal.",
      },
      {
        title: "Whole-room or whole-home trim upgrades",
        body: "Consistent crown profiles can bring continuity to a home when paired with updated casing, baseboards, wall panels, or cabinet details.",
      },
    ],
    closing: "A fit when the room feels almost finished, but the architecture needs a final tailored edge.",
  },
  "wainscoting-beadboard": {
    headline: "Walls that need texture, durability, and proportion.",
    intro:
      "Wainscoting and beadboard bring character to walls while adding practical protection in high-use areas. The best installations feel integrated with trim heights, openings, and the room’s overall style.",
    useCases: [
      {
        title: "Dining rooms and stairways",
        body: "Panel height, rail placement, and clean reveals can give formal or transitional spaces a more established architectural character.",
      },
      {
        title: "Bathrooms, mudrooms, and hardworking areas",
        body: "Beadboard or panel treatments can add warmth and durability where walls need to stand up to daily use while still looking refined.",
      },
      {
        title: "Hallways and room transitions",
        body: "Continuous wainscoting can guide the eye through the home and create a more intentional connection between adjacent spaces.",
      },
    ],
    closing: "A fit when the wall finish should be both beautiful and purposeful.",
  },
  "chair-rail-picture-rail": {
    headline: "Rooms that need a graceful horizontal line.",
    intro:
      "Chair rail and picture rail details work best when they align with the proportions of the room, not just a standard height. They can organize a wall, separate finishes, and introduce a historic or tailored feel.",
    useCases: [
      {
        title: "Dining rooms and formal rooms",
        body: "A rail detail can define the room’s lower and upper wall zones, especially when paired with panel moulding, color changes, wallpaper, or art.",
      },
      {
        title: "Historic-inspired interiors",
        body: "Picture rail and chair rail can add period-appropriate character while still being detailed cleanly for a modern home.",
      },
      {
        title: "Hallways, stairways, and connected spaces",
        body: "A continuous rail line helps long walls feel ordered and gives transitions a more thoughtful architectural rhythm.",
      },
    ],
    closing: "A fit when a room needs structure, separation, or a subtle historic reference.",
  },
  "fireplace-mantels-surrounds": {
    headline: "Fireplace walls that should feel like a focal point.",
    intro:
      "A mantel or surround should feel proportional to the firebox, ceiling height, and room scale. The right design can turn a fireplace wall into a composed architectural centerpiece.",
    useCases: [
      {
        title: "Living rooms and family rooms",
        body: "A custom surround can give the main gathering space a clear focal point and a more finished relationship between furniture, walls, and ceiling lines.",
      },
      {
        title: "Primary suites and sitting rooms",
        body: "Smaller or quieter fireplace settings benefit from refined detailing that feels warm, personal, and appropriately scaled.",
      },
      {
        title: "Renovated fireplace walls",
        body: "Mantels, side panels, overmantels, and trim transitions can help modernize or elevate an existing fireplace without losing the room’s character.",
      },
    ],
    closing: "A fit when the fireplace should anchor the room instead of simply occupying the wall.",
  },
  "window-door-casing": {
    headline: "Openings that deserve a cleaner architectural frame.",
    intro:
      "Window and door casing shapes how a room reads at every opening. Better casing can make doors, windows, and transitions feel more substantial and more connected to the rest of the trim package.",
    useCases: [
      {
        title: "Interior doors and windows",
        body: "Updated casing can add depth and definition around everyday openings while helping the room feel more custom and complete.",
      },
      {
        title: "Cased openings and hallways",
        body: "Trimmed openings create a more intentional transition between rooms, especially in open layouts where the architecture needs clearer definition.",
      },
      {
        title: "Whole-room trim upgrades",
        body: "Casing often has the greatest impact when coordinated with baseboards, crown, panel moulding, and other finish details.",
      },
    ],
    closing: "A fit when the openings should feel crafted, not builder-basic.",
  },
  "archways-entryways": {
    headline: "Transitions that should feel memorable.",
    intro:
      "Archways and entryways shape the way people move from one room to another. The right trim treatment can make a transition feel intentional, framed, and worthy of attention.",
    useCases: [
      {
        title: "Entry halls and first impressions",
        body: "A refined entry treatment sets the tone for the home and gives visitors an immediate sense of craftsmanship and care.",
      },
      {
        title: "Dining and living room openings",
        body: "Cased or arched openings can separate spaces without closing them off, creating a more elegant relationship between rooms.",
      },
      {
        title: "Hallway thresholds and architectural transitions",
        body: "Thoughtful trim can turn a simple pass-through into a deliberate architectural moment that improves the flow of the home.",
      },
    ],
    closing: "A fit when the transition between rooms should become part of the design story.",
  },
  "gazebos-pergolas": {
    headline: "Outdoor spaces that should feel built for gathering.",
    intro:
      "Gazebos and pergolas work best when they are planned around shade, sightlines, seating, and the way people actually use the yard. The structure should feel intentional, durable, and connected to the home.",
    useCases: [
      {
        title: "Patios and garden spaces",
        body: "A pergola or gazebo can define an outdoor room and make open patio areas feel more comfortable, finished, and inviting.",
      },
      {
        title: "Outdoor kitchens and entertaining areas",
        body: "Overhead structure, posts, and trim details can frame dining, cooking, and lounging zones while giving the space a stronger design presence.",
      },
      {
        title: "Poolside and backyard retreats",
        body: "A custom wood structure can create shade, atmosphere, and a sense of permanence in spaces meant for relaxing and hosting.",
      },
    ],
    closing: "A fit when the outdoor area should feel like an extension of the home.",
  },
};

function EditorialBestForAside({ service }: { service: Service }) {
  const content = editorialBestForBySlug[service.slug];

  return (
    <div className="border border-[#D6D2C6] bg-white p-7 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Best For</p>
      <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-[#081828] text-balance">
        {content.headline}
      </h2>
      <p className="mt-5 text-base leading-7 text-[#2E404E]">{content.intro}</p>
      <div className="mt-7 space-y-5">
        {content.useCases.map((item, index) => (
          <article key={item.title} className="border-l-2 border-[#B4904E] pl-5">
            <p className="font-heading text-2xl font-semibold text-[#081828]">
              <span className="mr-3 text-[#B4904E]">{String(index + 1).padStart(2, "0")}</span>
              {item.title}
            </p>
            <p className="mt-3 text-sm leading-7 text-[#2E404E]">{item.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 bg-[#081828] p-5 text-[#FEFAF1]">
        <p className="font-heading text-2xl font-semibold leading-tight">{content.closing}</p>
      </div>
      <Link href="/contact" className="mt-8 inline-flex w-full justify-center border border-[#B4904E] bg-[#B4904E] px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#081828] transition hover:bg-transparent">
        {service.cta}
      </Link>
    </div>
  );
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Service" };
  }

  return {
    title: `${service.title} in St. Louis`,
    description: `${service.title} by Moulding Saint Louis. ${service.summary}`,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} in St. Louis`,
      description: service.summary,
      url: `${siteUrl}/services/${service.slug}`,
      images: [
        {
          url: `${siteUrl}/images/placeholders/${service.slug}.jpg`,
          width: 1800,
          height: 1200,
          alt: `${service.title} by Moulding Saint Louis`,
        },
      ],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <PageShell>
      <main className="bg-[#FEFAF1]">
        <JsonLd data={serviceSchema(service)} />
        <JsonLd data={breadcrumbSchema([
          { name: "Home", url: siteUrl },
          { name: "Services", url: `${siteUrl}/services` },
          { name: service.title, url: `${siteUrl}/services/${service.slug}` },
        ])} />
        <section className="relative flex min-h-[680px] items-end overflow-hidden bg-[#081828] text-[#FEFAF1]">
          <Image
            src={service.slug === "luxury-decorative-moulding" ? "/images/placeholders/luxury-decorative-moulding-hero.jpg" : `/images/placeholders/${service.slug}.jpg`}
            alt={`${service.title} by Moulding Saint Louis`}
            fill
            priority
            className={service.slug === "luxury-decorative-moulding" ? "object-contain opacity-88" : "object-cover opacity-62"}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,24,40,0.28),rgba(8,24,40,0.96))]" />
          <div className="container-xl relative pb-20 pt-28">
            <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#B4904E]">Service</p>
            <h1 className="mt-5 max-w-5xl font-heading text-6xl font-semibold leading-[0.92] text-balance sm:text-8xl">
              {service.title}
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-[#FEFAF1]/80">{service.hero}</p>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="container-xl grid gap-14 lg:grid-cols-[0.78fr_1.22fr]">
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <EditorialBestForAside service={service} />
            </aside>

            <div>
              <div className="space-y-7 text-xl leading-9 text-[#2E404E]">
                {service.details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-14 grid gap-5 md:grid-cols-3">
                {service.highlights.map((highlight, index) => (
                  <div key={highlight} className="border border-[#D6D2C6] bg-white p-7 shadow-sm">
                    <p className="font-heading text-5xl font-semibold text-[#B4904E]">0{index + 1}</p>
                    <h3 className="mt-5 font-heading text-3xl font-semibold leading-tight text-[#081828]">{highlight}</h3>
                  </div>
                ))}
              </div>

              <div className="mt-14 grid overflow-hidden bg-[#081828] text-[#FEFAF1] lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[360px]">
                  <Image
                    src={`/images/placeholders/${service.slug}.jpg`}
                    alt={`${service.title} project inspiration`}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover opacity-75"
                  />
                </div>
                <div className="p-8 sm:p-12">
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Next Step</p>
                  <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight text-balance">
                    A better project begins with a clear conversation.
                  </h2>
                  <p className="mt-5 leading-8 text-[#FEFAF1]/76">
                    Tell us about the rooms involved, the look you want, and any inspiration you already have. We will help clarify the right approach, materials, and next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#D6D2C6]/45 py-20">
          <div className="container-xl flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B4904E]">Ready to Begin?</p>
              <h2 className="mt-3 max-w-4xl font-heading text-5xl font-semibold leading-tight text-[#081828] text-balance">
                Let’s discuss how {service.title.toLowerCase()} can elevate your home.
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
