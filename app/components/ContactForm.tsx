"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
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

  const inputClass =
    "w-full bg-transparent border border-[#C9A84C]/40 text-[#F5ECD7] placeholder-[#F5ECD7]/40 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors";

  return (
    <div className="w-full max-w-lg mt-12">
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 border-t border-[#C9A84C]/40" />
        <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase">Get in Touch</span>
        <div className="flex-1 border-t border-[#C9A84C]/40" />
      </div>

      {formState === "success" ? (
        <div className="border border-[#C9A84C] px-6 py-8 text-center">
          <p className="text-[#C9A84C] text-lg tracking-widest uppercase mb-2">Message Received</p>
          <p className="text-[#F5ECD7]/70 text-sm">
            Thank you for reaching out. We&apos;ll be in touch shortly.
          </p>
          <button
            onClick={() => setFormState("idle")}
            className="mt-6 text-[#C9A84C] text-xs tracking-widest uppercase underline underline-offset-4 hover:text-[#F5ECD7] transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            required
            className={inputClass}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            required
            className={inputClass}
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className={inputClass}
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Your Message *"
            required
            rows={5}
            className={`${inputClass} resize-none`}
          />

          {/* Error message */}
          {formState === "error" && (
            <p className="text-red-400 text-xs">{errorMsg}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={formState === "submitting"}
            className="mt-2 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-[#C9A84C] hover:text-[#1A0A02] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState === "submitting" ? "Sending…" : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
