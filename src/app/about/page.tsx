import Link from "next/link";
import type { Metadata } from "next";
import FounderTrust from "@/components/founder-trust";

export const metadata: Metadata = {
  title: "About | Cozy Digital",
  description:
    "Cozy Digital helps service businesses improve their whole digital presence, from websites and messaging to booking paths, content, and search visibility.",
  alternates: { canonical: "https://www.cozydigital.org/about/" },
};

const values = [
  { label: "No bloated retainers", body: "We don't lock you into long contracts for work that should take weeks. You pay for what gets done, and you own it." },
  { label: "Customer-first lens", body: "We look at your website, content, and booking path the way a first-time visitor would, then fix what's actually blocking trust." },
  { label: "One connected presence", body: "Websites, content, booking, automation, and search visibility should work together, not as separate projects that never line up." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">About</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Built to make your whole digital presence work together.</h1>
        </div>

        <div className="space-y-6 leading-relaxed text-zinc-400">
          <p>Cozy Digital helps service businesses improve how customers find them, understand them, trust them, and take action online. That means the whole digital presence, from the website and messaging to content, booking paths, follow-up, local search, and AI visibility, not just one piece of it.</p>
          <p>We work with service businesses, local brands, and creators who know something is off but can&apos;t pinpoint exactly what to fix. Instead of bloated strategy decks, we review the touchpoints a customer actually sees and connect them into one clear, credible experience.</p>
          <p>The work is practical. Clearer pages. Stronger messaging. Smoother booking. Content that supports the real offer. Every touchpoint pointing toward the same next step.</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="mb-2 text-sm font-black text-white">{v.label}</h2>
              <p className="text-xs leading-relaxed text-zinc-400">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-cyan-300/20 bg-cyan-500/[0.06] p-6">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-cyan-400">How we started</p>
          <p className="text-sm leading-relaxed text-zinc-300">
            Cozy Digital grew out of a simple frustration: too many service businesses were spending money on ads and content while their homepage still confused first-time visitors, their booking path had extra clicks, and their social bio linked to a site that hadn&apos;t been updated in months. The tools to fix all of it existed. The work just needed to actually get done, and done together. That&apos;s what we do.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">A recent project</p>
          <p className="text-sm leading-relaxed text-zinc-300">
            For Dr. Alicia, we brought therapy, coaching, online courses, wellness products, and an international retreat together under one recognizable brand, with clear ways for visitors to understand each offer and take the next step.
          </p>
          <a
            href="https://draliciawatkins.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 transition-colors hover:text-cyan-100"
          >
            View the live website →
          </a>
        </div>
      </div>

      {/* Team */}
      <FounderTrust />

      <div className="mx-auto max-w-3xl px-0">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/free-audit/" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-6 py-3.5 text-sm font-bold text-white hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
            Get a Free Digital Presence Audit
          </Link>
          <Link href="/cozy-booking/" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/[0.06]">
            Schedule a Call
          </Link>
        </div>
      </div>
    </main>
  );
}
