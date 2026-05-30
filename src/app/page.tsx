import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cozy Digital | Websites, Content & Lead Systems",
  description: "Practical growth systems for businesses, creators, and service brands ready to turn visitors into booked clients.",
};

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

const services = [
  { badge: "STARTER", name: "Social Ignite", price: "$297/mo", tagline: "Built for brands ready to show up consistently and convert attention.", items: ["Done-for-you content calendar", "Platform-specific strategy", "Weekly performance review", "Email support"], cta: "Get Started", highlight: false },
  { badge: "RECOMMENDED", name: "Growth Partner", price: "$497/mo", tagline: "Turn social traffic, website views, and attention into a cleaner lead path.", items: ["Everything in Social Ignite", "4 branded video clips per month", "Ad creative grading", "Priority turnaround"], cta: "Book a Free Consultation", highlight: true },
  { badge: "FULL SCALE", name: "Elite Retainer", price: "$797/mo", tagline: "A full growth system. We run the strategy, you run the business.", items: ["Everything in Growth Partner", "8 branded video clips per month", "Weekly ad + content optimization", "Monthly strategy review"], cta: "Let's Talk", highlight: false },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.15),transparent)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="text-left">
            <Link href="/free-audit" className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-200 hover:bg-cyan-500/20">
              Free first-impression audit <span aria-hidden="true">&#x2192;</span>
            </Link>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight text-white md:text-7xl">
              Turn first-time visitors into{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">booked clients.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              Watch the quick breakdown, then book a free consultation so we can map the website, content, and lead path that fits your business.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/cozy-booking" className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-9 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
                <span>Book a Free Consultation</span>
                <ArrowIcon />
              </Link>
              <span className="text-sm font-semibold text-zinc-500">No pressure &mdash; leave with clear next steps.</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="group relative overflow-hidden rounded-3xl border border-fuchsia-400/70 bg-zinc-950 shadow-2xl shadow-fuchsia-950/40 ring-1 ring-cyan-300/20">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/30 via-blue-500/20 to-fuchsia-500/30 opacity-70 blur-xl" />
              <video
                className="relative z-10 aspect-video w-full rounded-[1.35rem] bg-black object-cover"
                controls
                preload="metadata"
                poster="/videos/vsl_final_heynow_fixed_captions-poster.jpg"
                playsInline
              >
                <source src="/videos/vsl_final_heynow_fixed_captions.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-20 px-6">
        <div className="mx-auto mb-14 max-w-5xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">Capabilities</p>
            <h2 className="text-4xl font-black text-white md:text-5xl">Fix the leaks, then grow.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: "Website & Landing Pages", desc: "Sharpen your homepage, clarify the offer, and create flows that answer visitor questions instantly." },
              { label: "Content Engine", desc: "Organize ideas into pillars, hooks, captions, and rhythms so content supports offers without burnout." },
              { label: "Booking & Inquiry Paths", desc: "Fix booking pages, inquiry forms, and social CTAs so interested people actually become leads." },
            ].map((f) => (
              <div key={f.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <h3 className="text-xl font-black text-white">{f.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="scroll-mt-20 border-y border-white/[0.06] bg-white/[0.02] py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">Packages</p>
            <h2 className="text-4xl font-black text-white md:text-5xl">Pick your pace</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">Simple pricing. No lock-ins. Built around what actually moves your needle.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 items-start">
            {services.map((s) => (
              <div key={s.name} className={`flex flex-col rounded-3xl border p-8 ${s.highlight ? "border-cyan-300/40 bg-cyan-500/[0.04] shadow-lg shadow-cyan-950/15" : "border-white/10 bg-white/[0.03]"}` }>
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{s.badge}</p>
                  <p className="text-xl font-black text-white">{s.price}</p>
                </div>
                <h3 className="text-2xl font-black text-white">{s.name}</h3>
                <p className="mt-3 text-sm text-zinc-400 min-h-[40px]">{s.tagline}</p>
                <ul className="my-6 space-y-3 flex-1">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-zinc-300"><span className="text-cyan-400">&#x2713;</span> {item}</li>
                  ))}
                </ul>
                <Link href="/cozy-booking" className={`w-full rounded-xl py-3.5 text-sm font-bold text-center transition-colors ${s.highlight ? "bg-white text-black hover:bg-zinc-200" : "border border-white/20 text-white hover:bg-white/10"}`}>
                  {s.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-black text-white md:text-6xl">Ready to clean up the noise?</h2>
          <p className="mt-6 text-zinc-400 text-lg">See what&apos;s blocking trust and bookings before you spend another dollar.</p>
          <div className="mt-10 flex justify-center">
            <Link href="/cozy-booking" className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-10 py-4 text-base font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
              <span>Book a Free Consultation</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
