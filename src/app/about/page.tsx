import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Cozy Digital",
  description: "Cozy Digital helps service brands fix websites, content, and booking paths so visitors actually convert.",
};

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
          <p>If you want to see what&apos;s actually breaking before you spend another dollar on ads or posts, start with the free first-impression audit.</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/free-audit" className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-500/10 px-6 py-3 text-sm font-bold text-cyan-100 hover:bg-cyan-500/20">
            Get the free audit
          </Link>
          <Link href="/cozy-booking" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-6 py-3 text-sm font-bold text-white hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
            Book a free consultation
          </Link>
        </div>
      </div>
    </main>
  );
}
