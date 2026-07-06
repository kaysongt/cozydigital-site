import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cozy Digital AI Academy | The AI Advantage Blueprint ($29.99)",
  description:
    "A practical AI implementation course for small business owners. No coding, no hype. Nine interactive modules, a built-in workbook, and real systems you can run in 30 days. Instant access for $29.99.",
  alternates: { canonical: "https://www.cozydigital.org/ai-academy/" },
};

// Embedded Stripe Buy Button. The publishable key is meant to be public (safe to
// commit). The button's PRICE and its post-payment redirect to /academy-access are
// configured on the Buy Button itself in the Stripe dashboard — make sure that
// price reads $29.99 to match this page, and that payments are un-paused.
const STRIPE_BUY_BUTTON_ID = "buy_btn_1TqBaV2etPpEo8U895o3UkUi";
const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51Tq3Fv2etPpEo8U8TMW9LBCNsSH30mQms7x7uwguVts8c7QUr1DbOVnIdNaPTiy2AiI60BBPpk1qtojNHhwhk8WO001TBLkUS2";
const PRICE = "$29.99";

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

const modules = [
  { n: "01", title: "AI Foundations (Without the Hype)", desc: "What generative AI actually is, which tools matter, what they cost, and the one rule that keeps it all safe." },
  { n: "02", title: "The AI Opportunity Audit", desc: "Find where AI saves you the most time and money, with an auto-scoring worksheet that ranks your top three wins." },
  { n: "03", title: "Prompting That Actually Works", desc: "The five-part prompt formula, a reusable prompt library, and a brand voice document that makes AI write like you." },
  { n: "04", title: "AI for Marketing and Content", desc: "A month of social content in one sitting, email that converts, and a repurposing system that multiplies every post." },
  { n: "05", title: "Customer Communication & Sales", desc: "Respond to every review, answer leads fast, and build the follow-up sequences where forgotten revenue lives." },
  { n: "06", title: "AI for Operations and Admin", desc: "Meetings that document themselves, SOPs by talking, faster hiring and training, and painless email triage." },
  { n: "07", title: "Simple Automations (No Coding)", desc: "Pick your first automation from five starter builds, mapped to the biggest pain from your audit." },
  { n: "08", title: "Privacy, Compliance & Your AI Policy", desc: "The golden rule, healthcare-grade guidance (HIPAA-aware), a 'Can I paste this?' drill, and a one-page team AI policy." },
  { n: "09", title: "Your 30-Day Implementation Plan", desc: "A day-by-day plan that ties every module together, plus an ROI tracker to measure the return." },
];

const outcomes = [
  "One AI tool set up properly and working for you every day",
  "A brand voice document that makes AI write like you, not like a robot",
  "A prompt library your whole team can use",
  "A month of marketing content produced in a couple of hours",
  "Templates for reviews, inquiries, and follow-ups",
  "At least one working automation, live",
  "A one-page AI policy that keeps your business and customers safe",
  "A 30-day plan that ties it all together",
];

const tools = [
  { title: "Opportunity Audit", desc: "Auto-scores and ranks your best AI wins." },
  { title: "Money-math calculator", desc: "Turns hours saved into real annual dollars." },
  { title: "Five-part prompt builder", desc: "Assemble reliable prompts in seconds." },
  { title: "Brand Voice Builder", desc: "Attaches your voice to every prompt you copy." },
  { title: "25-prompt library", desc: "One-click copy, filtered by category." },
  { title: "Team AI Policy generator", desc: "Includes healthcare-specific clauses." },
  { title: "'Can I paste this?' drill", desc: "Builds instant compliance instinct." },
  { title: "ROI tracker + certificate", desc: "Prove the return, print your completion." },
];

export default function AiAcademyPage() {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://www.cozydigital.org/ai-academy/#course",
    name: "The AI Advantage Blueprint",
    description:
      "A practical, self-paced AI implementation course for small business owners: nine interactive modules and a built-in workbook covering AI foundations, an opportunity audit, prompting, marketing, customer communication, operations, no-code automations, privacy and compliance, and a 30-day implementation plan.",
    url: "https://www.cozydigital.org/ai-academy/",
    provider: { "@id": "https://www.cozydigital.org/#organization" },
    inLanguage: "en",
    educationalLevel: "Beginner",
    teaches: "Practical AI implementation for small businesses",
    offers: {
      "@type": "Offer",
      price: "29.99",
      priceCurrency: "USD",
      category: "One-time purchase",
      availability: "https://schema.org/InStock",
      url: "https://www.cozydigital.org/ai-academy/",
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

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-16 pb-16 md:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.16),transparent)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-fuchsia-300">Cozy Digital AI Academy</p>
          <h1 className="text-4xl font-black leading-[1.02] text-white md:text-6xl">
            Put AI to work in your business,{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-500 to-cyan-400 bg-clip-text text-transparent">in 30 days.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            <strong className="text-zinc-200">The AI Advantage Blueprint</strong> is a practical, no-hype implementation course for small business owners. No coding. No forty hours of YouTube. Just the real systems that save you time and make you money, built module by module.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-zinc-300">9 interactive modules</span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-zinc-300">Workbook built in</span>
            <span className="rounded-full border border-fuchsia-300/25 bg-fuchsia-500/10 px-3 py-1.5 text-fuchsia-200">2026 Edition</span>
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#get-access"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-600 to-cyan-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-fuchsia-900/25 hover:from-fuchsia-400 hover:via-violet-500 hover:to-cyan-400"
            >
              <span>Get instant access — {PRICE}</span>
              <ArrowIcon />
            </a>
            <span className="text-sm font-semibold text-zinc-500">One-time payment. Yours to keep.</span>
          </div>
        </div>
      </section>

      {/* THE MONDAY-MORNING PROBLEM */}
      <section className="px-6 pb-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8 md:p-10">
          <p className="text-base leading-relaxed text-zinc-300">
            You have heard that AI is going to change your business. What nobody tells you is what to actually do on{" "}
            <em className="text-white">Monday morning</em>. This course assumes you are busy, you are not technical, and you want results, not theory. Every module ends with action steps, and the action steps <em className="text-white">are</em> the course.
          </p>
          <div className="mt-6 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-500/[0.06] px-6 py-5 text-center">
            <p className="text-lg font-black text-white">AI drafts. You decide.</p>
            <p className="mt-1 text-sm text-zinc-400">The one rule that makes everything else safe: AI does the first 80%, you keep the judgment, the facts, and the final approval.</p>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL HAVE */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-fuchsia-300">What you walk away with</p>
            <h2 className="text-3xl font-black text-white md:text-4xl">Real systems, not a certificate you forget.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {outcomes.map((o) => (
              <div key={o} className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4">
                <span className="mt-0.5 shrink-0 text-fuchsia-300">&#x2713;</span>
                <p className="text-sm leading-relaxed text-zinc-300">{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-fuchsia-300">The curriculum</p>
            <h2 className="text-3xl font-black text-white md:text-4xl">Nine modules. One clear path.</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-400">Most modules take 30 to 60 minutes, including the action steps. Work at your own pace — your progress saves automatically.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {modules.map((m) => (
              <div key={m.n} className="group flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-colors hover:border-fuchsia-300/25 hover:bg-white/[0.05]">
                <span className="shrink-0 bg-gradient-to-b from-fuchsia-300 to-cyan-300 bg-clip-text text-2xl font-black text-transparent">{m.n}</span>
                <div>
                  <h3 className="text-base font-black leading-snug text-white">{m.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE TOOLS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-fuchsia-300">Not a PDF you skim once</p>
            <h2 className="text-3xl font-black text-white md:text-4xl">A workbook that does the work with you.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400">
              The whole course is one self-contained interactive file. It runs in any browser, works offline, and everything you type is saved privately on your own device — nothing is sent anywhere.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((t) => (
              <div key={t.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                <h3 className="text-sm font-black text-white">{t.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR + COMPLIANCE EDGE */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Built for</p>
            <h3 className="mt-2 text-2xl font-black text-white">Owners and managers of real businesses</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Clinics, med spas, dental offices, salons, contractors, local shops, and service businesses of every kind. If you are busy and not technical, this was written for you.
            </p>
          </div>
          <div className="rounded-3xl border border-fuchsia-300/20 bg-fuchsia-500/[0.06] p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">The edge most courses skip</p>
            <h3 className="mt-2 text-2xl font-black text-white">Compliance handled, for healthcare too</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Module 8 covers what you can and can&apos;t paste into AI tools, HIPAA-aware guidance for medical and wellness businesses, and a one-page team policy — the layer generic AI courses leave out. (Education, not legal advice.)
            </p>
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="get-access" className="scroll-mt-20 px-6 pb-20">
        <div className="mx-auto max-w-xl">
          <div className="overflow-hidden rounded-3xl border border-fuchsia-300/30 bg-gradient-to-b from-fuchsia-500/[0.10] to-cyan-500/[0.05] p-8 text-center shadow-2xl shadow-fuchsia-950/20 md:p-10">
            <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">Full course + workbook</p>
            <div className="mt-3 flex items-end justify-center gap-2">
              <span className="text-6xl font-black text-white">{PRICE}</span>
              <span className="mb-2 text-sm font-semibold text-zinc-400">one-time</span>
            </div>
            <ul className="mx-auto mt-6 max-w-sm space-y-2.5 text-left">
              {[
                "All 9 interactive modules",
                "The complete built-in workbook and tools",
                "25-prompt library with one-click copy",
                "Team AI policy + compliance drill",
                "Printable completion certificate",
                "Works offline, yours to keep forever",
              ].map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-zinc-200">
                  <span className="text-fuchsia-300">&#x2713;</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center" dangerouslySetInnerHTML={{ __html: buyButtonHtml }} />
            <p className="mt-4 text-xs leading-relaxed text-zinc-500">
              14-day guarantee: do the work, and if it doesn&apos;t earn its keep, email us for a refund and keep the workbook.
            </p>
          </div>
        </div>
      </section>

      {/* ACADEMY IS GROWING */}
      <section className="px-6 pb-14">
        <div className="mx-auto flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-4 text-center">
          <span aria-hidden className="text-fuchsia-300">&#x2726;</span>
          <p className="text-sm text-zinc-400">
            <span className="font-semibold text-zinc-200">This is the Academy&apos;s first course.</span> More practical, no-hype courses for small business owners are on the way.
          </p>
        </div>
      </section>

      {/* SERVICES BRIDGE */}
      <section className="border-t border-white/[0.06] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-black text-white md:text-3xl">Would you rather have it built for you?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
            The Academy teaches you to build these systems yourself. If you would rather we do it — content engines, follow-up sequences, automations, and websites built to be found by both Google and AI search — that is exactly what Cozy Digital does.
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

      {/* DISCLAIMER */}
      <section className="px-6 pb-16">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-zinc-600">
          The AI Advantage Blueprint is educational content. Results depend on your own implementation, and no specific income or business outcome is guaranteed. The compliance module is provided for education and is not legal advice.
        </p>
      </section>
    </main>
  );
}
