import Image from "next/image";
import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#1A0A02] px-6 py-16">
      {/* Decorative top border */}
      <div className="w-full max-w-2xl border-t border-[#C9A84C] mb-10" />

      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/logo.png"
          alt="Moulding Saint Louis"
          width={620}
          height={349}
          priority
          className="w-full max-w-lg mx-auto"
        />
      </div>

      {/* Coming Soon */}
      <h1 className="text-[#C9A84C] text-4xl sm:text-5xl tracking-widest uppercase mb-4 text-center font-serif">
        Coming Soon
      </h1>

      {/* Divider */}
      <div className="flex items-center gap-4 my-4 w-full max-w-xs">
        <div className="flex-1 border-t border-[#C9A84C]" />
        <span className="text-[#C9A84C] text-lg">&#10022;</span>
        <div className="flex-1 border-t border-[#C9A84C]" />
      </div>

      {/* Tagline */}
      <p className="text-[#F5ECD7] text-base sm:text-lg text-center max-w-md leading-relaxed mt-2">
        Fine Wood Wainscoting &amp; Architectural Trim &mdash; crafted for Saint Louis homes.
      </p>

      {/* Contact Form */}
      <ContactForm />

      <p className="mt-4 text-sm text-[#F5ECD7]/80 text-center">
        hello world
      </p>

      {/* Decorative bottom border */}
      <div className="w-full max-w-2xl border-b border-[#C9A84C] mt-10" />
    </main>
  );
}
