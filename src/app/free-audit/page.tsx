import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free First-Impression Audit | Cozy Digital",
  description: "Get a free 30-minute audit of your website and socials from Cozy Digital.",
};

export default function FreeAuditPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">Free Audit</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Your free first-impression audit</h1>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            30 minutes. We screen-share your site and socials, point out the top 3 friction points, and show what we&apos;d fix first.
            You leave with notes whether you hire us or not.
          </p>
        </div>
        <div className="space-y-4 mb-10">
          {[
            "Homepage headline and offer clarity",
            "Above-the-fold CTA and booking route",
            "Instagram or TikTok content direction",
            "Top friction point blocking conversions",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-zinc-200">
              <span className="text-cyan-300 font-bold">&#x2713;</span>
              {item}
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-500/10 p-6 text-center">
          <p className="text-zinc-300 text-sm mb-4">Ready to see exactly what&apos;s blocking your conversions?</p>
          <Link href="/cozy-booking" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-8 py-4 text-sm font-bold text-white shadow-xl hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
            Book Your Free Audit
          </Link>
          <p className="mt-3 text-xs text-zinc-500">No pressure &mdash; leave with clear next steps.</p>
        </div>
      </div>
    </main>
  );
}
