import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Cozy Digital",
  description: "Two ways to work with Cozy Digital — a full one-time build or ongoing monthly support. Clear deliverables, no lock-ins.",
};

const buildItems = [
  { name: "Custom Website", detail: "5 pages + a custom landing page built around your offer" },
  { name: "Direct Booking System Setup", detail: "Calendly or equivalent wired into your pages and social links" },
  { name: "Google Business Profile Optimization", detail: "Categories, hours, photos, and local SEO signals set correctly" },
  { name: "Local SEO Foundation", detail: "On-page structure and metadata so search engines understand what you do" },
  { name: "Social Media Branding & Content Templates", detail: "Reusable Canva templates matched to your brand" },
  { name: "Automated Follow-Up System", detail: "Email or SMS sequence that reaches leads without manual effort" },
  { name: "Analytics & Reporting Dashboard", detail: "One clean place to see traffic, bookings, and what's working" },
];

const retainerItems = [
  { name: "Website Maintenance & Updates", detail: "Copy, design, and offer changes handled as needed" },
  { name: "Local SEO & Google Profile Management", detail: "Monthly updates to keep rankings moving" },
  { name: "Social Media Content", detail: "8 posts per month — written, designed, and ready to publish" },
  { name: "Ad Management", detail: "Google or Meta campaigns managed for you (ad budget billed separately)" },
  { name: "Monthly Report & Strategy Call", detail: "Analytics review and next-step planning every month" },
];

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-zinc-100">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">Services</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Two ways to work together.</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-400">
            A full one-time build that gets you completely set up, or ongoing monthly support that keeps everything growing. Both come with clear deliverables and no long-term lock-ins.
          </p>
        </div>

        {/* Package cards */}
        <div className="grid gap-8 md:grid-cols-2">

          {/* Full Build */}
          <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">One-Time</p>
                <h2 className="mt-1 text-2xl font-black text-white">Full Build Package</h2>
              </div>
              <span className="shrink-0 text-3xl font-black text-white">$3,000</span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              Everything built from scratch in 90 days. You own all of it when we are done — no subscriptions, no ongoing fees unless you want them.
            </p>
            <ul className="flex-1 space-y-4">
              {buildItems.map((item) => (
                <li key={item.name} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-cyan-400">&#x2713;</span>
                  <div>
                    <p className="text-sm font-bold text-zinc-100">{item.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/cozy-booking/"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/[0.06]"
            >
              Book a Free Consultation <ArrowIcon />
            </Link>
          </div>

          {/* Monthly Retainer */}
          <div className="flex flex-col rounded-3xl border border-cyan-300/30 bg-cyan-500/[0.04] p-8 shadow-lg shadow-cyan-950/20">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">Ongoing</p>
                <h2 className="mt-1 text-2xl font-black text-white">Monthly Retainer</h2>
              </div>
              <span className="shrink-0 text-3xl font-black text-white">$900<span className="text-lg text-zinc-400">/mo</span></span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              We manage, update, and grow everything for you month to month. No long-term contract required — cancel any time.
            </p>
            <ul className="flex-1 space-y-4">
              {retainerItems.map((item) => (
                <li key={item.name} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-cyan-400">&#x2713;</span>
                  <div>
                    <p className="text-sm font-bold text-zinc-100">{item.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/cozy-booking/"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-900/25 transition-all hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500"
            >
              Book a Free Consultation <ArrowIcon />
            </Link>
          </div>
        </div>

        {/* Free audit callout */}
        <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-white/[0.07] bg-white/[0.02] px-8 py-7 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <p className="text-sm font-black text-white">Not sure which fits?</p>
            <p className="mt-1 text-sm text-zinc-400">Start with a free 30-minute audit — we look at your site and socials and tell you exactly what to fix first, with no pitch at the end.</p>
          </div>
          <Link
            href="/free-audit/"
            className="shrink-0 rounded-xl border border-cyan-300/30 bg-cyan-500/10 px-6 py-3 text-sm font-bold text-cyan-100 transition-colors hover:bg-cyan-500/20"
          >
            Get the free audit
          </Link>
        </div>

        {/* Pricing detail link */}
        <p className="mt-6 text-center text-sm text-zinc-500">
          Want to see how the prices break down?{" "}
          <Link href="/pricing/" className="font-semibold text-cyan-400 underline underline-offset-2 hover:text-cyan-300">
            View full pricing breakdown
          </Link>
        </p>

      </div>
    </main>
  );
}
