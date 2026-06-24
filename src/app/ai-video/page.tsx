import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Video Production | Cozy Digital",
  description:
    "Branded video — ads, explainers, and cinematic trailers — produced with OpenMontage, our open-source agentic video engine. Research, scripting, AI-generated motion, narration, captions, and final edit, at a fraction of agency cost.",
  alternates: { canonical: "https://www.cozydigital.org/ai-video/" },
};

const OPENMONTAGE_URL = "https://github.com/calesthio/OpenMontage";

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

// Each maps to a real OpenMontage pipeline, described in plain client language.
const formats = [
  { name: "Short-form ads", desc: "Hook-first vertical ads for Reels, TikTok, and Shorts — built to stop the scroll and drive the click.", tag: "clip-factory" },
  { name: "Cinematic trailers", desc: "Concept, script, scene plan, AI-generated motion clips, and a scored edit for launches and brand films.", tag: "cinematic" },
  { name: "Animated explainers", desc: "Clean, narrated explainers that make a service or product instantly make sense.", tag: "animated-explainer" },
  { name: "Talking-head & avatar", desc: "Spokesperson-style videos without a film crew, from a script you approve.", tag: "avatar-spokesperson" },
  { name: "Documentary montage", desc: "Real motion footage from open archives and stock, edited into a story — not just stills panning.", tag: "documentary-montage" },
  { name: "Localized versions", desc: "One video, dubbed and re-captioned for new audiences and markets.", tag: "localization-dub" },
];

// Honest, README-sourced production examples.
const examples = [
  { title: "Product ad, one API key", cost: "$0.69", detail: "AI-generated visuals, narration, auto-sourced royalty-free music, and word-level subtitles — zero manual asset work." },
  { title: "60-second animated short", cost: "$1.33", detail: "Six AI-generated motion clips, HD narration, royalty-free score, and TikTok-style captions, fully composed." },
  { title: "Cinematic sci-fi trailer", cost: "API cost", detail: "Concept to finished piece: script, scene plan, generated motion clips, soundtrack, and final composition." },
];

const pipeline = [
  { step: "01", title: "Research & script", desc: "The agent researches your topic and writes a hook-first script you approve before anything renders." },
  { step: "02", title: "Asset generation", desc: "It generates or retrieves real motion clips, images, voiceover, and music — no stock-photo slideshow." },
  { step: "03", title: "Edit & captions", desc: "Clips are cut to a timeline with word-level captions and your brand styling applied." },
  { step: "04", title: "Render & deliver", desc: "Composed and rendered to a finished, ready-to-post file in the formats you need." },
];

export default function AiVideoPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.cozydigital.org/ai-video/#service",
    name: "AI Video Production",
    serviceType: "AI-assisted video production",
    provider: { "@id": "https://www.cozydigital.org/#organization" },
    areaServed: { "@type": "Place", name: "United States" },
    description:
      "AI video production for service brands: short-form ads, explainers, and cinematic trailers produced with OpenMontage, an open-source agentic video engine. Includes research, scripting, AI-generated motion clips, narration, captions, and final composition.",
    url: "https://www.cozydigital.org/ai-video/",
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-16 pb-16 md:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(217,70,239,0.16),transparent)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-fuchsia-300">New · AI Video Production</p>
          <h1 className="text-4xl font-black leading-[1.02] text-white md:text-6xl">
            Branded video people{" "}
            <span className="cozy-gradient-text">actually watch.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Ads, explainers, and cinematic pieces — produced with our open-source AI video engine. Real motion, real narration, and a real edit, at a fraction of the time and cost of a traditional shoot.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/cozy-booking/" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-9 py-4 text-sm font-bold text-white shadow-xl shadow-fuchsia-950/30 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
              <span>Get a video made</span>
              <ArrowIcon />
            </Link>
            <a href={OPENMONTAGE_URL} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-sm font-bold text-zinc-300 transition-colors hover:text-white">
              See the engine on GitHub <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* THE ENGINE — OpenMontage credibility */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-500/[0.08] via-blue-500/[0.05] to-cyan-500/[0.08] p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">Powered by OpenMontage</p>
              <h2 className="mt-2 text-2xl font-black text-white md:text-3xl">We didn&apos;t buy a tool. We built one.</h2>
              <p className="mt-4 leading-relaxed text-zinc-300">
                Your video is produced with <strong className="text-white">OpenMontage</strong>, the first open-source, agentic video production system — built and maintained in the open. An agent handles research, scripting, asset generation, editing, and final composition, so you get studio-style output without the studio timeline.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={OPENMONTAGE_URL} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/[0.08]">
                  View OpenMontage <ArrowIcon />
                </a>
              </div>
            </div>
            <ul className="grid gap-3">
              {[
                ["#1", "on GitHub Trending"],
                ["Open", "source · AGPLv3 licensed"],
                ["Real", "motion clips, not just stills"],
              ].map(([big, small]) => (
                <li key={small} className="rounded-2xl border border-white/[0.08] bg-zinc-950/40 px-5 py-4">
                  <p className="text-2xl font-black text-white">{big}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">{small}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">What we can make</p>
            <h2 className="text-3xl font-black text-white md:text-4xl">One engine, every format you post in</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {formats.map((f) => (
              <div key={f.name} className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-colors hover:border-fuchsia-400/25 hover:bg-white/[0.06]">
                <h3 className="text-sm font-black leading-snug text-white">{f.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{f.desc}</p>
                <p className="mt-4 inline-block rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500">{f.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 pb-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">How it works</p>
            <h2 className="text-3xl font-black text-white md:text-4xl">From a sentence to a finished cut</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pipeline.map((p) => (
              <div key={p.step} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
                <p className="font-mono text-sm font-black text-fuchsia-300">{p.step}</p>
                <h3 className="mt-2 text-sm font-black leading-snug text-white">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL COST EXAMPLES */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">Real production runs</p>
            <h2 className="text-3xl font-black text-white md:text-4xl">What finished pieces actually cost to make</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
              These are real OpenMontage outputs and their raw API cost — the spend on generation, not our service fee. It is why we can produce branded video at a price traditional production can&apos;t touch.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {examples.map((ex) => (
              <div key={ex.title} className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <p className="cozy-gradient-text text-3xl font-black">{ex.cost}</p>
                <h3 className="mt-3 text-sm font-black text-white">{ex.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{ex.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-zinc-600">
            Production figures reported by the OpenMontage project. Your project scope and asset choices change the final number — we quote it up front.
          </p>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-cyan-300/20 bg-cyan-500/[0.06] p-8 text-center md:p-10">
          <h2 className="text-2xl font-black text-white md:text-3xl">Video is the format that converts.</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-zinc-300">
            Short-form video is how service brands earn trust before the first call. We pair it with the website, booking flow, and AI search work we already do — so the people your video reaches land somewhere built to convert them.
          </p>
          <Link href="/ai-search/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 transition-colors hover:text-cyan-100">
            See how it fits with AI search <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-28 pt-4 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-black text-white md:text-5xl">Have a video idea? We&apos;ll make it.</h2>
          <p className="mt-5 text-lg text-zinc-400">Tell us the goal in plain language. We&apos;ll script it, produce it, and hand you a file that&apos;s ready to post.</p>
          <div className="mt-9 flex justify-center">
            <Link href="/cozy-booking/" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-10 py-4 text-base font-bold text-white shadow-xl shadow-fuchsia-950/30 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
              <span>Book a Free Consultation</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
