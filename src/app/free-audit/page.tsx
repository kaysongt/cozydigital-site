import type { Metadata } from "next";
import AuditForm from "@/components/audit-form";

export const metadata: Metadata = {
  title: "Free Digital Presence Audit | Cozy Digital",
  description:
    "Request a free Digital Presence Audit from Cozy Digital. We review your website, messaging, trust signals, content, booking path, and search visibility, then identify the first three improvements we'd make.",
  alternates: { canonical: "https://www.cozydigital.org/free-audit/" },
};

const auditCovers = [
  { label: "Website & messaging", desc: "Does a first-time visitor understand what you do and who it's for within seconds?" },
  { label: "Trust signals", desc: "Can a visitor find the credibility signals they need before deciding to contact you?" },
  { label: "Booking & conversion path", desc: "Is there one obvious next step, or competing buttons pulling attention in different directions?" },
  { label: "Content & search visibility", desc: "Does your content support your offer, and can search engines and AI systems understand your business?" },
];

export default function FreeAuditPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">Free Digital Presence Audit</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Request your free Digital Presence Audit.</h1>
          <p className="mt-4 leading-relaxed text-zinc-400">
            We&apos;ll review your website, messaging, trust signals, content, booking path, and search visibility, then identify the first three improvements we would make. You leave with clear next steps whether or not you hire us.
          </p>
        </div>

        <div className="mb-10 grid gap-3 sm:grid-cols-2">
          {auditCovers.map((item) => (
            <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 font-bold text-cyan-300">&#x2713;</span>
                <div>
                  <p className="text-sm font-bold text-zinc-100">{item.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-5">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">What you&apos;ll receive</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {[
              "Three priority improvements",
              "Your biggest trust or conversion gaps",
              "Clear next steps, no obligation",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-zinc-200">
                <span className="mt-0.5 shrink-0 text-cyan-400">&#x2713;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <AuditForm leadSource="Free Audit Page" />
      </div>
    </main>
  );
}
