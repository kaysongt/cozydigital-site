import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Cozy Digital",
  description: "Cozy Digital helps service brands fix websites, content, and booking paths so visitors actually convert.",
  alternates: { canonical: "https://www.cozydigital.org/about/" },
};

const values = [
  { label: "No bloated retainers", body: "We don't lock you into 6-month contracts for work that should take 2 weeks. You pay for what gets done." },
  { label: "Customer-first lens", body: "We look at your homepage, content, and booking path the way a first-time visitor would — then fix what's actually blocking trust." },
  { label: "Practical over polished", body: "Better pages. Stronger CTAs. Tighter content. Every change has a job: move the visitor one step closer to booking." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">About</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Built for brands that are tired of guessing.</h1>
        </div>

        <div className="space-y-6 text-zinc-400 leading-relaxed">
          <p>Cozy Digital is a growth systems studio focused on one thing: turning website visitors and social followers into booked clients. We work with service brands, creators, and local businesses who know something is off but can&apos;t pinpoint exactly what to fix.</p>
          <p>We don&apos;t sell bloated strategy decks or 6-month retainers for work that should take 2 weeks. We look at your homepage, your content, your booking path, and your CTAs like a customer would &mdash; then we fix what&apos;s blocking the conversion.</p>
          <p>The work is practical. Better pages. Stronger CTAs. Tighter content. Cleaner follow-up. Every touchpoint pointing toward the same next step.</p>
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
            Cozy Digital grew out of a simple frustration: too many service businesses were spending money on ads and content while their homepage still confused first-time visitors, their booking path had three extra clicks, and their social bio linked to a site that hadn&apos;t been updated in months. The tools existed to fix all of it — the work just needed to actually get done. That&apos;s what we do.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/free-audit/" className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-500/10 px-6 py-3 text-sm font-bold text-cyan-100 hover:bg-cyan-500/20">
            Get the free audit
          </Link>
          <Link href="/cozy-booking/" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-6 py-3 text-sm font-bold text-white hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
            Book a free consultation
          </Link>
        </div>
      </div>
    </main>
  );
}
