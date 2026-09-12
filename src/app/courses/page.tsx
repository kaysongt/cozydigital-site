import PromptBossPromo from "@/components/prompt-boss-promo";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import SelectedFilms from "@/components/selected-films";

export const metadata: Metadata = {
  title: "Courses & Playbooks | Cozy Digital",
  description:
    "Explore AI Video Prompt Boss and The AI Advantage Blueprint by Cozy Digital. Prompts, worksheets, and lessons for video production and everyday business tasks.",
  alternates: { canonical: "https://cozydigital.org/courses/" },
};

// Embedded Stripe Buy Button. The publishable key is meant to be public (safe to
// commit). The button's PRICE and its post-payment redirect to /academy-access are
// configured on the Buy Button / payment link in the Stripe dashboard.
//
// PRICE below is display copy only -- it does not set what anyone is charged.
// The amount actually taken comes from the Buy Button in Stripe, so the two can
// drift apart silently and show a customer one number while charging another.
// Change them together, and treat Stripe as the one that matters.
const STRIPE_BUY_BUTTON_ID = "buy_btn_1TqLCc2etPpEo8U8DutPjiOT";
const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51Tq3Fv2etPpEo8U8TMW9LBCNsSH30mQms7x7uwguVts8c7QUr1DbOVnIdNaPTiy2AiI60BBPpk1qtojNHhwhk8WO001TBLkUS2";
const PRICE = "$30";

// Rendered via dangerouslySetInnerHTML so the <stripe-buy-button> custom element
// doesn't need JSX typings; buy-button.js upgrades it once loaded.
const buyButtonHtml = `<stripe-buy-button buy-button-id="${STRIPE_BUY_BUTTON_ID}" publishable-key="${STRIPE_PUBLISHABLE_KEY}"></stripe-buy-button>`;

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function Check() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/15 text-fuchsia-300 ring-1 ring-inset ring-fuchsia-400/20">
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

const modules = [
  { n: "01", title: "AI Foundations", desc: "An introduction to generative AI, tool choices, costs, and the information you should keep private." },
  { n: "02", title: "The AI Opportunity Audit", desc: "Use an auto-scoring worksheet to compare tasks and choose three places to start." },
  { n: "03", title: "Writing Your Prompts", desc: "A five-part prompt formula, reusable prompt library, and brand voice document to guide your drafts." },
  { n: "04", title: "AI for Marketing and Content", desc: "Plan a month of social content, draft email copy, and adapt existing posts for other channels." },
  { n: "05", title: "Customer Communication & Sales", desc: "Create templates for review replies, new inquiries, and customer follow-up." },
  { n: "06", title: "AI for Operations and Admin", desc: "Work through meeting notes, documented procedures, hiring and training materials, and email sorting." },
  { n: "07", title: "Simple Automations (No Coding)", desc: "Pick your first automation from five starter builds, mapped to the biggest pain from your audit." },
  { n: "08", title: "Privacy, Compliance & Your AI Policy", desc: "Privacy guidance, including healthcare examples, a 'Can I paste this?' drill, and a one-page team AI policy." },
  { n: "09", title: "Your 30-Day Implementation Plan", desc: "A day-by-day plan that ties every module together, plus an ROI tracker to measure the return." },
];

const outcomes = [
  "A guide to setting up your first AI tool",
  "A brand voice document to guide your drafts",
  "A prompt library your whole team can use",
  "A plan for a month of marketing content",
  "Templates for reviews, inquiries, and follow-ups",
  "Instructions for your first automation",
  "A one-page AI policy for your team to review",
  "A 30-day plan that ties it all together",
];

const tools = [
  { title: "Opportunity Audit", desc: "Scores and ranks the tasks you enter." },
  { title: "Money-math calculator", desc: "Estimates the value of time saved using your inputs." },
  { title: "Five-part prompt builder", desc: "Build prompts from a reusable structure." },
  { title: "Brand Voice Builder", desc: "Attaches your voice to every prompt you copy." },
  { title: "25-prompt library", desc: "One-click copy, filtered by category." },
  { title: "Team AI Policy generator", desc: "Includes healthcare-specific clauses." },
  { title: "'Can I paste this?' drill", desc: "Practice spotting information that needs care." },
  { title: "ROI tracker + certificate", desc: "Record your results and print a completion certificate." },
];

const included = [
  "All 9 interactive modules and the complete built-in workbook",
  "25 ready-to-use prompts with one-click copy",
  "Compliance drill, team AI policy generator & completion certificate",
  "Works offline, saved privately on your device, yours to keep forever",
];

export default function CoursesPage() {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://cozydigital.org/courses/#course",
    name: "The AI Advantage Blueprint",
    description:
      "A practical, self-paced AI implementation course for small business owners: nine interactive modules and a built-in workbook covering AI foundations, an opportunity audit, prompting, marketing, customer communication, operations, no-code automations, privacy and compliance, and a 30-day implementation plan.",
    url: "https://cozydigital.org/courses/",
    provider: { "@id": "https://cozydigital.org/#organization" },
    inLanguage: "en",
    educationalLevel: "Beginner",
    teaches: "Practical AI implementation for small businesses",
    offers: {
      "@type": "Offer",
      price: "30.00",
      priceCurrency: "USD",
      category: "One-time purchase",
      availability: "https://schema.org/InStock",
      url: "https://cozydigital.org/courses/",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT8H",
    },
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <Script src="https://js.stripe.com/v3/buy-button.js" async strategy="afterInteractive" />

      <PromptBossPromo />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,rgba(168,85,247,0.18),transparent)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-fuchsia-300">Cozy Digital AI Academy</p>
          <h1 className="text-[2.6rem] font-black leading-[1.03] tracking-tight text-white md:text-6xl">
            Learn the tools.{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">Plan your first 30 days.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            <strong className="font-semibold text-zinc-200">The AI Advantage Blueprint</strong> walks small business owners through content, customer replies, admin tasks, and simple automations. Nine interactive lessons include worksheets and prompts you can adapt for your own business.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-zinc-300">9 interactive modules</span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-zinc-300">Workbook built in</span>
            <span className="rounded-full border border-fuchsia-300/25 bg-fuchsia-500/10 px-3.5 py-1.5 text-fuchsia-200">2026 Edition</span>
          </div>
          <div className="mt-10 flex flex-col items-center gap-3">
            <a
              href="#get-access"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-600 to-cyan-500 px-9 py-4 text-sm font-bold text-white shadow-[0_10px_40px_-10px_rgba(217,70,239,0.6)] transition-all hover:shadow-[0_14px_50px_-8px_rgba(217,70,239,0.7)] hover:brightness-110"
            >
              <span>Get instant access for {PRICE}</span>
              <ArrowIcon />
            </a>
            <span className="text-sm text-zinc-500">One-time payment · instant access · yours to keep</span>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="px-6 pb-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-zinc-300 md:text-xl md:leading-relaxed">
            Start with a task you already do each week. Each module gives you a lesson, an example, and steps to try with your own business in mind.
          </p>
          <div className="mx-auto mt-8 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-fuchsia-300/25 bg-fuchsia-500/[0.07] px-6 py-2.5">
            <span className="text-sm font-black text-white">Review every draft.</span>
            <span className="hidden h-1 w-1 rounded-full bg-fuchsia-300/60 sm:inline-block" />
            <span className="text-sm text-zinc-400">Check the facts and edit the wording before you use it.</span>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-fuchsia-300">What you walk away with</p>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">What you will work on</h2>
          </div>
          <ul className="mx-auto grid max-w-3xl gap-x-12 gap-y-1 sm:grid-cols-2">
            {outcomes.map((o) => (
              <li key={o} className="flex items-start gap-3 border-b border-white/[0.06] py-4">
                <Check />
                <span className="text-sm leading-relaxed text-zinc-300">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-fuchsia-300">The curriculum</p>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">The nine lessons</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-400">Most modules take 30 to 60 minutes, including the action steps. Work at your own pace, and your progress saves automatically.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {modules.map((m) => (
              <div key={m.n} className="group flex gap-4 rounded-2xl border border-white/[0.07] bg-zinc-900/40 p-5 transition-all duration-200 hover:border-fuchsia-300/30 hover:bg-white/[0.04]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-fuchsia-300/20 bg-fuchsia-500/10 text-sm font-black text-fuchsia-200 transition-colors group-hover:border-fuchsia-300/40">{m.n}</span>
                <div>
                  <h3 className="text-[15px] font-black leading-snug text-white">{m.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKBOOK */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-fuchsia-300">Included workbook</p>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">Keep your notes beside the lessons.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400">
              The entire course is one self-contained interactive file. It runs in any browser, works offline, and everything you type stays private on your own device.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {tools.map((t) => (
              <div key={t.title} className="flex items-start gap-3">
                <Check />
                <div>
                  <p className="text-sm font-black text-white">{t.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-zinc-500">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR + COMPLIANCE */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-9">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">Built for</p>
            <h3 className="mt-2.5 text-2xl font-black tracking-tight text-white">For small business owners</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Clinics, med spas, dental offices, salons, contractors, local shops, and service businesses of every kind. If you&apos;re busy and not technical, this was written for you.
            </p>
          </div>
          <div className="rounded-3xl border border-fuchsia-300/25 bg-gradient-to-br from-fuchsia-500/[0.10] to-violet-500/[0.05] p-8 md:p-9">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-fuchsia-300">Module 8</p>
            <h3 className="mt-2.5 text-2xl font-black tracking-tight text-white">Privacy guidance for your team</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Work through what information to keep out of AI tools, including examples for medical and wellness businesses. The module includes HIPAA-aware guidance and a one-page team policy. It is educational content, not legal advice.
            </p>
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="get-access" className="scroll-mt-24 px-6 pb-16">
        <div className="mx-auto max-w-xl">
          <div className="relative overflow-hidden rounded-[28px] border border-fuchsia-300/30 bg-gradient-to-b from-fuchsia-500/[0.12] via-violet-500/[0.05] to-cyan-500/[0.05] p-8 text-center shadow-[0_30px_80px_-30px_rgba(217,70,239,0.4)] md:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-300/50 to-transparent" />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-fuchsia-300">Full course + workbook</p>
            <div className="mt-3 flex items-end justify-center gap-2">
              <span className="text-6xl font-black tracking-tight text-white">{PRICE}</span>
              <span className="mb-2 text-sm font-semibold text-zinc-400">one-time</span>
            </div>
            <ul className="mx-auto mt-7 max-w-sm space-y-3 text-left">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-200">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center" dangerouslySetInnerHTML={{ __html: buyButtonHtml }} />
            <p className="mt-5 text-xs leading-relaxed text-zinc-500">
              14-day guarantee: do the work, and if it doesn&apos;t earn its keep, email us for a refund and keep the workbook.
            </p>
          </div>
          <p className="mt-6 text-center text-xs text-zinc-600">
            <span className="font-semibold text-zinc-500">Also available: AI Video Prompt Boss.</span> Explore the video playbook at the top of this page.
          </p>
        </div>
      </section>

      {/* SERVICES BRIDGE */}
      <section className="border-t border-white/[0.06] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">Would you rather have it built for you?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
            We also take on website builds, video projects, content, and customer follow-up systems. Tell us what you need and we can discuss the scope with you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/services/" className="group inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10">
              Explore our services <ArrowIcon />
            </Link>
            <Link href="/cozy-booking/" className="group inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-black text-black transition-colors hover:bg-cyan-400">
              Book a free call <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* AI VIDEO WORK */}
      <section id="ai-video" className="border-t border-white/[0.06] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-300">AI video work</p>
            <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
              Films from our studio
            </h2>
            <p className="mx-auto mt-4 text-base leading-relaxed text-zinc-400">
              Four examples from our video portfolio: a narrative short, social
              comedy, a series episode, and a horror short. Choose a film to watch.
            </p>
          </div>
          <div className="mt-10">
            <SelectedFilms />
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-zinc-600">
            Looking for a video for your business? We agree the concept, length,
            formats, and revisions with you before production starts.
          </p>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="px-6 pb-16">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-zinc-600">
          The AI Advantage Blueprint is educational content. Results depend on your own implementation, and no specific income or business outcome is guaranteed. The compliance module is provided for education and is not legal advice.
        </p>
      </section>
    </main>
  );
}
