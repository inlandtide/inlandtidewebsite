"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getLeadAttribution } from "../lib/browser-attribution";
import { isPreview } from "../lib/site-environment";
import { publicServices } from "../data/services";
import { trackFormEvent } from "../lib/conversion-events";

type FormState = "idle" | "submitting" | "success" | "error";
type ContactFormProps = {
  variant?: "light" | "dark";
  compact?: boolean;
  defaultService?: string;
  formLocation?: string;
};
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ContactForm({
  variant = "light",
  compact = false,
  defaultService = "",
  formLocation = "contact",
}: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const submitting = useRef(false);
  const started = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (formState === "success") successRef.current?.focus();
  }, [formState]);

  function startForm() {
    if (!started.current) {
      started.current = true;
      trackFormEvent("consultation_start", formLocation);
    }
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const read = (key: string) => String(values.get(key) ?? "").trim();
    if (!read("name") || !read("email")) {
      setErrorMsg("Please enter your name and email so we can follow up.");
      setFormState("error");
      return;
    }
    submitting.current = true;
    setFormState("submitting");
    setErrorMsg("");
    startForm();
    trackFormEvent("consultation_submit", formLocation);
    const message = [
      read("projectType")
        ? `Project type: ${read("projectType")}`
        : "Project type: To discuss",
      read("location") ? `Project location: ${read("location")}` : "",
      read("timing") ? `Preferred timing: ${read("timing")}` : "",
      read("message")
        ? `Project details:\n${read("message")}`
        : "Free consultation requested. Please help me explore the options for my home.",
    ]
      .filter(Boolean)
      .join("\n\n");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: read("name"),
          email: read("email"),
          phone: read("phone"),
          message,
          attribution: isPreview ? undefined : getLeadAttribution(),
        }),
        keepalive: true,
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        setErrorMsg(
          result.error ||
            "We could not confirm your request. Please try again or call (314) 818-0815.",
        );
        setFormState("error");
        trackFormEvent("consultation_error", formLocation);
      } else {
        setFormState("success");
        form.reset();
        if (!isPreview && !result.preview) {
          try {
            window.fbq?.("track", "Lead");
          } catch {
            /* A tracking failure cannot undo receipt. */
          }
          try {
            window.gtag?.("event", "generate_lead", {
              form_location: formLocation,
            });
          } catch {
            /* best effort */
          }
        }
      }
    } catch {
      setErrorMsg(
        "We could not confirm your request. Your details are still here—please try again, or call (314) 818-0815.",
      );
      setFormState("error");
      trackFormEvent("consultation_error", formLocation);
    } finally {
      submitting.current = false;
    }
  }
  return (
    <div
      data-contact-form
      className={`contact-form ${variant === "dark" ? "contact-form-dark" : ""} ${compact ? "" : "form-max-width"}`}
    >
      {formState === "success" ? (
        <div
          className="form-success"
          role="status"
          tabIndex={-1}
          ref={successRef}
        >
          <span className="success-check" aria-hidden="true">
            ✓
          </span>
          <h3>
            {isPreview ? "Preview test complete." : "You’re one step closer."}
          </h3>
          <p>
            {isPreview
              ? "This is a staging test. No email, spreadsheet lead, or advertising conversion was created."
              : "Your request has been received. We will review your project and get in touch using the details you shared."}
          </p>
          {!isPreview && (
            <p>
              Have a room photo or a saved idea? Keep it handy for our
              conversation.
            </p>
          )}
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setFormState("idle");
              started.current = false;
            }}
          >
            Send another request <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          onChange={startForm}
          aria-busy={formState === "submitting"}
        >
          {isPreview && (
            <p className="form-preview-note">
              Preview mode: try the form safely. Nothing will be sent.
            </p>
          )}
          <div className="form-grid">
            <label>
              Your name <span aria-hidden="true">*</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={200}
                placeholder="First and last name"
              />
            </label>
            <label>
              Email address <span aria-hidden="true">*</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Phone <span className="optional">(optional)</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={100}
                placeholder="Best number to reach you"
              />
            </label>
            <label>
              I’m interested in
              <select name="projectType" defaultValue={defaultService}>
                <option value="">Help me choose</option>
                {publicServices.map((service) => (
                  <option key={service.slug} value={service.title}>
                    {service.title}
                  </option>
                ))}
                <option>Several rooms or services</option>
              </select>
            </label>
          </div>
          <details className="form-more">
            <summary>
              Add project details <span className="optional">(optional)</span>
              <span aria-hidden="true">+</span>
            </summary>
            <div className="form-extra">
              <div className="form-grid">
                <label>
                  City or ZIP code
                  <input
                    name="location"
                    type="text"
                    maxLength={200}
                    placeholder="e.g. Chesterfield"
                  />
                </label>
                <label>
                  When are you thinking?
                  <select name="timing" defaultValue="">
                    <option value="">Not sure yet</option>
                    <option>As soon as possible</option>
                    <option>Within 1–3 months</option>
                    <option>Later this year</option>
                    <option>Just exploring ideas</option>
                  </select>
                </label>
              </div>
              <label>
                What would you love to change?
                <textarea
                  name="message"
                  maxLength={8500}
                  rows={3}
                  placeholder="A dining room, an entryway, a favorite inspiration link… a sentence or two is plenty."
                />
              </label>
            </div>
          </details>
          {formState === "error" && (
            <p className="form-error" role="alert">
              {errorMsg}
            </p>
          )}
          <button
            className="button-primary form-submit"
            type="submit"
            disabled={formState === "submitting"}
          >
            {formState === "submitting"
              ? "Sending your request…"
              : "Request my free consultation"}
            <span aria-hidden="true">
              {formState === "submitting" ? "…" : "→"}
            </span>
          </button>
          <p className="form-fine-print">
            Free consultation · No obligation
            <br />
            We’ll only use your details to respond to your inquiry.{" "}
            <Link href="/privacy-policy">Privacy policy</Link>
          </p>
        </form>
      )}
    </div>
  );
}
