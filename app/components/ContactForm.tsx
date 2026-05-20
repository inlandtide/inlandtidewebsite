"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  variant?: "light" | "dark";
  compact?: boolean;
};

export default function ContactForm({ variant = "light", compact = false }: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const isDark = variant === "dark";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const projectType = (form.elements.namedItem("projectType") as HTMLSelectElement).value.trim();
    const timeline = (form.elements.namedItem("timeline") as HTMLInputElement).value.trim();
    const location = (form.elements.namedItem("location") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    const enrichedMessage = [
      projectType ? `Project type: ${projectType}` : "",
      location ? `Project location: ${location}` : "",
      timeline ? `Desired timeline: ${timeline}` : "",
      message ? `Project details:\n${message}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const data = {
      name,
      email,
      phone,
      message: enrichedMessage || message,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        setFormState("error");
      } else {
        setFormState("success");
        form.reset();
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setFormState("error");
    }
  }

  const inputClass = isDark
    ? "w-full border border-[#B4904E]/35 bg-[#FEFAF1]/5 px-4 py-3 text-sm text-[#FEFAF1] placeholder-[#FEFAF1]/45 outline-none transition focus:border-[#B4904E] focus:bg-[#FEFAF1]/10"
    : "w-full border border-[#D6D2C6] bg-white/70 px-4 py-3 text-sm text-[#081828] placeholder-[#2E404E]/55 outline-none transition focus:border-[#B4904E] focus:bg-white";

  const labelClass = isDark ? "text-[#FEFAF1]/70" : "text-[#2E404E]";

  return (
    <div className={compact ? "w-full" : "w-full max-w-2xl"}>
      {formState === "success" ? (
        <div className={`border px-6 py-8 text-center ${isDark ? "border-[#B4904E] bg-[#FEFAF1]/5" : "border-[#B4904E] bg-white"}`}>
          <p className="font-heading text-3xl font-semibold text-[#B4904E]">Message Received</p>
          <p className={`mt-3 text-base leading-7 ${isDark ? "text-[#FEFAF1]/74" : "text-[#2E404E]"}`}>
            Thank you for reaching out. Tim, Ryan, or a member of the team will review your project details and follow up shortly.
          </p>
          <button
            onClick={() => setFormState("idle")}
            className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-[#B4904E] underline underline-offset-4 transition hover:opacity-75"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name *" labelClass={labelClass}>
              <input type="text" name="name" required className={inputClass} placeholder="Jane Smith" />
            </Field>
            <Field label="Email Address *" labelClass={labelClass}>
              <input type="email" name="email" required className={inputClass} placeholder="jane@example.com" />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone" labelClass={labelClass}>
              <input type="tel" name="phone" className={inputClass} placeholder="(314) 555-0199" />
            </Field>
            <Field label="Project Type" labelClass={labelClass}>
              <select name="projectType" className={inputClass} defaultValue="">
                <option value="" disabled>Choose a service</option>
                <option>Luxury & Decorative Moulding</option>
                <option>Picture Frame Moulding</option>
                <option>Crown Moulding</option>
                <option>Wainscoting & Beadboard</option>
                <option>Chair Rail & Picture Rail</option>
                <option>Fireplace Mantels & Surrounds</option>
                <option>Window & Door Casing</option>
                <option>Archways & Entryways</option>
                <option>Not sure yet</option>
              </select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Project Location" labelClass={labelClass}>
              <input type="text" name="location" className={inputClass} placeholder="St. Louis, Ladue, Clayton..." />
            </Field>
            <Field label="Desired Timeline" labelClass={labelClass}>
              <input type="text" name="timeline" className={inputClass} placeholder="Next month, this season..." />
            </Field>
          </div>

          <Field label="Project Details *" labelClass={labelClass}>
            <textarea
              name="message"
              required
              rows={5}
              className={`${inputClass} resize-none`}
              placeholder="Tell us about the rooms, details, inspiration, or finish carpentry you have in mind."
            />
          </Field>

          {formState === "error" && <p className="text-sm text-red-500">{errorMsg}</p>}

          <button
            type="submit"
            disabled={formState === "submitting"}
            className="mt-2 border border-[#B4904E] bg-[#B4904E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#081828] transition hover:bg-transparent hover:text-[#B4904E] disabled:cursor-not-allowed disabled:opacity-55"
          >
            {formState === "submitting" ? "Sending…" : "Request a Consultation"}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  labelClass,
  children,
}: {
  label: string;
  labelClass: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className={`text-xs font-semibold uppercase tracking-[0.22em] ${labelClass}`}>{label}</span>
      {children}
    </label>
  );
}
