import Link from "next/link";
import type { Metadata } from "next";
import {
  CLIENT_HUB_LABEL,
  CLIENT_HUB_NEW_TAB_HINT,
  CLIENT_HUB_REL,
  CLIENT_HUB_URL,
} from "@/lib/client-hub";

export const metadata: Metadata = {
  title: "Services | Cozy Digital",
  description:
    "Website design and AI video production by Cozy Digital, with ongoing site care, content, search visibility, and booking systems for service businesses.",
  alternates: { canonical: "https://cozydigital.org/services/" },
};

// Six areas of work, described by what actually happens rather than by package.
// Plans and what's included in each live in the Client Hub, so nothing here
// commits to a price, a timeline, or a result.
const capabilities = [
  {
    label: "Websites & landing pages",
    title: "Websites built around your business",
    body: "We design and build your pages, organize your services, and connect the booking or checkout. Every page is checked on desktop and mobile before launch.",
  },
  {
    label: "AI video & ad creative",
    title: "Video for ads and social",
    body: "We plan the concept, direct the generated scenes, and edit the finished video with captions, sound, and your brand in mind. See our video showcase for examples of the work.",
  },
  {
    label: "Ongoing website care",
    title: "Updates and maintenance",
    body: "Send us new hours, a service change, or a page that needs attention. We handle the edits and check that forms, links, and booking still work.",
  },
  {
    label: "Content & marketing support",
    title: "Content you can publish",
    body: "Post ideas, captions, email copy, and reusable templates built around your offers. We help you plan what to publish and prepare the pieces you need.",
  },
  {
    label: "Search & AI visibility",
    title: "Business information kept consistent",
    body: "We update the details that describe your business, add structured data, and check how search engines and AI assistants present your services.",
  },
  {
    label: "Automation & workflows",
    title: "Booking and follow-up connected",
    body: "We connect forms, calendars, reminders, and customer emails. First we map who needs each inquiry and what should happen next, then build and test the workflow.",
  },
];

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H18v4.5M17.5 6.5L11 13M16 14.5V18H6V8h3.5" />
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
          <h1 className="text-4xl font-black text-white md:text-5xl">Website building. AI video production.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400">
            Bring us a website project, a video idea, or both. Quincy and Kayson work with you from the first brief through delivery, with content and ongoing support available as you need them.
          </p>
        </div>

        {/* What we work on */}
        <div className="grid gap-5 md:grid-cols-2">
          {capabilities.map((item) => (
            <div
              key={item.label}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-cyan-400/25 hover:bg-white/[0.05]"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">{item.label}</p>
              <h2 className="mt-2 text-lg font-black leading-snug text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.body}</p>
            </div>
          ))}
        </div>

        {/* AI search deep-dive */}
        <div className="mt-6">
          <Link href="/ai-search/" className="group flex flex-col rounded-3xl border border-cyan-300/25 bg-cyan-500/[0.05] p-7 transition-colors hover:border-cyan-300/45">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">AI Search · GEO</p>
            <h2 className="mt-1.5 text-lg font-black text-white">How we review your search presence</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">See what we check in your pages, business listings, and structured data, including how ChatGPT, Perplexity, and Google AI describe your business.</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 transition-colors group-hover:text-cyan-100">Explore AI Search <ArrowIcon /></span>
          </Link>
        </div>

        {/* Free audit callout */}
        <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-white/[0.07] bg-white/[0.02] px-8 py-7 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <p className="text-sm font-black text-white">Not sure where to start?</p>
            <p className="mt-1 text-sm text-zinc-400">Send your website or social profile. We will review it and send back three changes we would make first.</p>
          </div>
          <Link
            href="/free-audit/#audit-form"
            className="shrink-0 rounded-xl border border-cyan-300/30 bg-cyan-500/10 px-6 py-3 text-sm font-bold text-cyan-100 transition-colors hover:bg-cyan-500/20"
          >
            Get the free audit
          </Link>
        </div>

        {/* Client Hub — where plans and account access live now */}
        <div className="mt-6 flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-7 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <p className="text-sm font-black text-white">Looking for plans?</p>
            <p className="mt-1 text-sm text-zinc-400">
              Compare plans, buy credits, and manage your project in the {CLIENT_HUB_LABEL}.
            </p>
          </div>
          <a
            href={CLIENT_HUB_URL}
            target="_blank"
            rel={CLIENT_HUB_REL}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/[0.06]"
          >
            Open the {CLIENT_HUB_LABEL}
            <ExternalIcon />
            <span className="sr-only">{CLIENT_HUB_NEW_TAB_HINT}</span>
          </a>
        </div>

        {/* Talk it through */}
        <div className="mt-14 text-center">
          <h2 className="text-2xl font-black text-white md:text-3xl">Tell us what you have in mind.</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
            Book a free 30-minute call with us. Bring your current site, a reference you like, or an idea you want to work through.
          </p>
          <Link
            href="/cozy-booking/"
            className="group mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-900/25 transition-all hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500"
          >
            Schedule a Call <ArrowIcon />
          </Link>
        </div>

      </div>
    </main>
  );
}
