import Image from "next/image";
import Link from "next/link";
import ContactForm from "./ContactForm";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={diagonal ? "arrow-diagonal" : ""}
    >
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function ActionLink({
  href = "#consultation",
  children = "Plan my room",
  secondary = false,
  id = "consultation",
}: {
  href?: string;
  children?: React.ReactNode;
  secondary?: boolean;
  id?: string;
}) {
  return (
    <Link
      href={href}
      data-cta={id}
      className={secondary ? "text-link" : "button-primary"}
    >
      {children}
      <Arrow />
    </Link>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export const projectPhotos = [
  {
    src: "/images/gallery/picture-frame-moulding-12.jpg",
    title: "A room with a richer point of view",
    detail: "Picture frame moulding & coordinated trim",
    alt: "Blue painted wall panels with chair rail and crown moulding in a completed Moulding Saint Louis project",
  },
  {
    src: "/images/gallery/luxury-decorative-moulding-11.jpg",
    title: "Character in every proportion",
    detail: "Custom wall paneling",
    alt: "Sage painted wall paneling fitted around a doorway in a Moulding Saint Louis project",
  },
  {
    src: "/images/gallery/luxury-decorative-moulding-16.jpg",
    title: "Details that belong together",
    detail: "Architectural wood finishes",
    alt: "Installed decorative wall moulding from the Moulding Saint Louis project gallery",
  },
];
export function ProjectHighlights() {
  return (
    <section className="section-space" id="recent-work">
      <div className="container-xl">
        <div className="section-heading-row">
          <div>
            <Eyebrow>From our project gallery</Eyebrow>
            <h2 className="section-title">The difference is in the details.</h2>
          </div>
          <ActionLink href="/gallery" secondary id="project_gallery">
            See the gallery
          </ActionLink>
        </div>
        <div className="project-grid">
          {projectPhotos.map((photo, i) => (
            <figure
              key={photo.src}
              className={i === 0 ? "project-featured" : ""}
            >
              <Link
                href="/gallery#recent-projects"
                aria-label={`View project: ${photo.title}`}
                className="project-image"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 900px) 50vw, 100vw"
                  className="object-cover"
                />
              </Link>
              <figcaption>
                <p className="small-label">{photo.detail}</p>
                <h3>{photo.title}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
export function ProcessSection() {
  const steps = [
    [
      "Start with your room.",
      "Tell us what you have in mind. A photo, a saved idea, or just a room you would love to improve is a good place to begin.",
    ],
    [
      "Work through the details.",
      "We discuss the layout, materials, finish, and scope with you, then clarify the estimate and next steps.",
    ],
    [
      "Bring it all together.",
      "Careful fitting, balanced proportions, and a thoughtful installation turn the plan into a lasting part of your home.",
    ],
  ];
  return (
    <section className="section-space process-section" id="our-process">
      <div className="container-xl">
        <Eyebrow>A clear path from idea to installation</Eyebrow>
        <h2 className="section-title">
          You bring the inspiration.
          <br />
          We help with the details.
        </h2>
        <div className="process-grid">
          {steps.map(([title, body], index) => (
            <article key={title}>
              <span className="step-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function FaqSection({
  questions,
  title = "A few things you may be wondering.",
}: {
  questions: { question: string; answer: string }[];
  title?: string;
}) {
  return (
    <section className="section-space faq-section">
      <div className="container-xl faq-layout">
        <div>
          <Eyebrow>Before we begin</Eyebrow>
          <h2 className="section-title">{title}</h2>
          <p className="body-copy">
            Have a question about your own space? That is exactly what the first
            conversation is for.
          </p>
          <ActionLink href="#consultation" secondary>
            Ask about my project
          </ActionLink>
        </div>
        <div className="faq-list">
          {questions.map(({ question, answer }) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export const generalQuestions = [
  {
    question: "Is the consultation free?",
    answer:
      "Yes. The initial consultation is free, with no obligation to move forward. We will talk through your space, the look you want, and the next steps for an estimate.",
  },
  {
    question: "What if I do not know which style to choose?",
    answer:
      "You do not need a finished plan. Tell us which room you would like to improve and what you like about it. We can discuss profiles, proportions, and options that work with your existing trim.",
  },
  {
    question: "How much will my project cost?",
    answer:
      "Every room is different. Wall size, layout, material, existing conditions, and painting or staining scope all affect the estimate. We start with your goals and clarify the scope before you commit to a project.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We work with homeowners throughout the greater St. Louis area, including Chesterfield, Ladue, Clayton, Town and Country, Kirkwood, Webster Groves, Des Peres, Frontenac, Creve Coeur, and Wildwood. Share your location and we will confirm availability for your project.",
  },
];
export function ConsultationSection({
  service = "",
  location = "page",
  title = "Let’s make room for something beautiful.",
}: {
  service?: string;
  location?: string;
  title?: string;
}) {
  return (
    <section className="consultation-section section-space" id="consultation">
      <div className="container-xl consultation-layout">
        <div className="consultation-copy">
          <Eyebrow>Your home. Your next chapter.</Eyebrow>
          <h2 className="section-title">{title}</h2>
          <p className="body-copy">
            Start with a free consultation. Tell us a little about your room,
            and we will help you explore what is possible.
          </p>
          <ul className="check-list">
            <li>No finished plans or measurements needed</li>
            <li>Guidance on style, layout, and project scope</li>
            <li>A conversation with a local St. Louis team</li>
          </ul>
          <div className="contact-alternative">
            <p>Prefer a conversation?</p>
            <a href="tel:+13148180815" data-cta="call">
              (314) 818-0815
            </a>
            <span>
              or{" "}
              <a href="sms:+13148180815" data-cta="text">
                send us a text <Arrow />
              </a>
            </span>
            <small>Monday–Friday, 8am–5pm</small>
          </div>
        </div>
        <div className="form-panel">
          <Eyebrow>Free consultation</Eyebrow>
          <h3>Tell us about your room.</h3>
          <p className="form-intro">
            A few details are all it takes to get started.
          </p>
          <ContactForm
            compact
            defaultService={service}
            formLocation={location}
          />
        </div>
      </div>
    </section>
  );
}
