import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free First-Impression Audit | Cozy Digital",
  description: "Get a free 30-minute audit of your website and socials from Cozy Digital. Walk away with clear next steps whether you hire us or not.",
  alternates: { canonical: "https://www.cozydigital.org/free-audit/" },
};

const auditCovers = [
  { label: "Homepage headline & offer clarity", desc: "Does a first-time visitor understand what you do and who it's for within 5 seconds?" },
  { label: "Above-the-fold CTA & booking route", desc: "Is there one obvious next step? Or are there three competing buttons pulling attention in different directions?" },
  { label: "Trust signals & social proof", desc: "Can a visitor find reviews, real photos, or credibility signals before they decide whether to contact you?" },
  { label: "Content direction on social", desc: "Does your Instagram or TikTok support your offer, or is it just filler posts that don't point anywhere?" },
];

const testimonials = [
  { quote: "We didn't realize how many friction points our booking page had until Cozy Digital walked us through it. Fixed in a week.", name: "Sarah J.", role: "Service brand owner" },
  { quote: "The audit alone gave us a clear list of what to fix. Didn't feel like a sales pitch — felt like real feedback.", name: "Marcus C.", role: "Local business owner" },
];

export default function FreeAuditPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">Free Audit</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Your free first-impression audit.</h1>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            30 minutes. We screen-share your site and socials, point out the top friction points holding back conversions, and show what we&apos;d fix first. You leave with clear notes whether you hire us or not.
          </p>
        </div>

        <div className="mb-10 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">What we cover</p>
          {auditCovers.map((item) => (
            <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-cyan-300 font-bold">&#x2713;</span>
                <div>
                  <p className="text-sm font-bold text-zinc-100">{item.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm leading-relaxed text-zinc-300 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4">
                <p className="text-xs font-bold text-white">{t.name}</p>
                <p className="text-xs text-zinc-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-500/10 p-6 text-center">
          <p className="text-zinc-300 text-sm mb-4">Ready to see exactly what&apos;s blocking your conversions?</p>
          <Link href="/cozy-booking/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-8 py-4 text-sm font-bold text-white shadow-xl hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
            Book Your Free Audit
          </Link>
          <p className="mt-3 text-xs text-zinc-500">No pressure &mdash; leave with clear next steps.</p>
        </div>
      </div>
    </main>
  );
}
