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
    "Websites and landing pages, ongoing site care, content and marketing support, AI video and ad creative, search and AI visibility, and automation — the work Cozy Digital takes on for service businesses.",
  alternates: { canonical: "https://cozydigital.org/services/" },
};

// Six areas of work, described by what actually happens rather than by package.
// Plans and what's included in each live in the Client Hub, so nothing here
// commits to a price, a timeline, or a result.
const capabilities = [
  {
    label: "Websites & landing pages",
    title: "A site that answers the questions people actually have",
    body: "Most sites we take on say too much or too little. We rebuild the pages around the few things someone needs to know before they'll book, buy, or pick up the phone, and we make sure it holds together on a phone.",
  },
  {
    label: "Ongoing website care",
    title: "Someone whose job it is to keep it current",
    body: "Hours change, staff change, offers change. We handle the edits and the small fixes so your site doesn't quietly drift a year out of date while you're busy running the business.",
  },
  {
    label: "Content & marketing support",
    title: "A rhythm you can actually keep",
    body: "Post ideas, captions, email, and reusable templates in your brand. We'd rather help you publish steadily than hand over a one-week burst that dies the moment things get busy.",
  },
  {
    label: "AI video & ad creative",
    title: "Short-form video without the production week",
    body: "Vertical video built for Reels, Shorts, and paid placements — the hook, the cuts, the captions, the on-brand look. We use AI tools where they genuinely save time and edit the rest by hand. There's an example on our homepage.",
  },
  {
    label: "Search & AI visibility",
    title: "Getting described correctly by Google and AI assistants",
    body: "Structured data, answer content, and consistent business details, so the systems people ask about you can find you and repeat the right things back.",
  },
  {
    label: "Automation & workflows",
    title: "Follow-up that happens without you remembering",
    body: "Booking, intake, reminders, and follow-up wired together so an inquiry doesn't sit in an inbox all weekend. We map how your team already works before we automate any of it.",
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
          <h1 className="text-4xl font-black text-white md:text-5xl">How we help.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400">
            Everyone arrives from a different place. Some businesses need a site built from nothing; others have one that just needs to stop losing people halfway down the page. Here is the work we take on. Start anywhere, and we&apos;ll say so if something else should come first.
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
            <h2 className="mt-1.5 text-lg font-black text-white">The long version of how AI visibility works</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">Structured data, quotable answers, and trust signals, written out in full — including how we check what ChatGPT, Perplexity, and Google AI currently say about a business.</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 transition-colors group-hover:text-cyan-100">Explore AI Search <ArrowIcon /></span>
          </Link>
        </div>

        {/* Free audit callout */}
        <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-white/[0.07] bg-white/[0.02] px-8 py-7 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <p className="text-sm font-black text-white">Not sure where to start?</p>
            <p className="mt-1 text-sm text-zinc-400">Start with a free 30-minute audit. We look at your site and socials and tell you what to fix first, with no pitch at the end.</p>
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
              What each plan includes lives in the {CLIENT_HUB_LABEL}, alongside sign-in for businesses already working with us.
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
          <h2 className="text-2xl font-black text-white md:text-3xl">Rather just talk it through?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
            Thirty minutes, no package pitch. Bring what you have and we&apos;ll tell you what we&apos;d do with it.
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
