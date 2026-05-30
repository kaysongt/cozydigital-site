import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process | Cozy Digital",
  description: "How Cozy Digital works: audit, map, build, launch.",
};

const steps = [
  { num: "01", title: "Audit", body: "We review your website, social presence, offers, and booking path like a customer would. We look for friction, confusion, and missed trust signals." },
  { num: "02", title: "Map", body: "We turn the messy customer journey into a simple path: see it, trust it, click it, book it. You get a clear picture of what changes and why." },
  { num: "03", title: "Build", body: "We tighten pages, content, templates, CTAs, forms, and follow-up so every touchpoint pushes the same next step." },
  { num: "04", title: "Launch", body: "We publish, watch the first responses, and keep improving based on what people actually do. No set-it-and-forget-it." },
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">How it works</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Four sections. One cleaner path.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">We move through the funnel in order so the page does not just look busy &mdash; it sells the next step.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step) => (
            <div key={step.num} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <span className="block text-4xl font-black text-zinc-700">{step.num}</span>
              <h2 className="mt-4 text-2xl font-black text-white">{step.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{step.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/free-audit" className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-500/10 px-8 py-4 text-sm font-bold text-cyan-100 hover:bg-cyan-500/20">
            Start with a free audit
          </Link>
        </div>
      </div>
    </main>
  );
}
