import Link from "next/link";
import type { Metadata } from "next";
import FounderTrust from "@/components/founder-trust";

export const metadata: Metadata = {
  title: "About | Cozy Digital",
  description:
    "Cozy Digital is a two-founder studio: a developer who ships client websites end to end and a business applications analyst who maps and tests the workflows behind them. Here's how it started and how we work.",
  alternates: { canonical: "https://cozydigital.org/about/" },
};

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

// How we actually operate. Each of these is backed by something real on the
// site: the pricing page's ownership and no-contract terms, or the way the
// two founders split analysis and build. Don't add aspirational ones.
const principles = [
  {
    label: "Analysis before design",
    body: "We map how your customers and staff actually move through booking, intake, and follow-up before anyone opens a design file.",
  },
  {
    label: "One connected presence",
    body: "Websites, content, booking, automation, and search visibility should work together, not as separate projects that never line up.",
  },
  {
    label: "Tested before handoff",
    body: "Integrations get run through their normal and error paths, documented, and fixed where the logic doesn't hold, before you're the one finding out.",
  },
  {
    label: "You own what we build",
    body: "You own all of it when we're done, and the monthly retainer has no long-term contract. Stay because it's working, not because you're locked in.",
  },
];

const shipped = [
  {
    name: "Dear Pastor's Wife",
    kind: "Global ministry",
    detail: "Free resources, events, community, speaking invitations, and partnership giving brought into one digital home.",
    href: "https://dearpastorswife.org/",
  },
  {
    name: "Dr. Alicia Watkins",
    kind: "Wellness",
    detail: "Therapy, coaching, courses, products, and an international retreat unified under one brand with direct booking paths.",
    href: "https://draliciawatkins.com/",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* HERO */}
      <section className="cozy-hero relative overflow-hidden px-6 pb-16 pt-14 md:pb-20 md:pt-20">
        <div className="cozy-aurora cozy-aurora-cyan" aria-hidden="true" />
        <div className="cozy-aurora cozy-aurora-fuchsia" aria-hidden="true" />
        <div className="cozy-hero-grid" aria-hidden="true" />

        <div className="relative mx-auto max-w-5xl" data-hero-copy>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">About</p>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl">
            A two-person studio that{" "}
            <span className="cozy-gradient-text">builds and tests its own work.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Cozy Digital helps service businesses improve how customers find them, understand them, trust them, and take action online: the whole digital presence, not just one piece of it.
          </p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16" data-reveal>
            <div className="space-y-5 text-base leading-relaxed text-zinc-400">
              <p>
                That means the website and the messaging, but also the content, the booking path, the follow-up, local search, and AI visibility. Those touchpoints either add up to one credible experience or they quietly work against each other.
              </p>
              <p>
                We work with service businesses, local brands, and creators who know something is off but can&apos;t pinpoint exactly what to fix. Instead of a strategy deck, we review the touchpoints a customer actually sees, then connect them.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">The work is practical</p>
              <ul className="mt-5 space-y-3">
                {[
                  "Clearer pages and stronger messaging",
                  "Smoother booking and lead intake",
                  "Content that supports the real offer",
                  "Follow-up that doesn't drop leads",
                  "Every touchpoint pointing to the same next step",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                    <span className="mt-0.5 shrink-0 text-cyan-400">&#x2713;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT STARTED: the real story, from the founders' own backgrounds. */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 max-w-2xl" data-reveal>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">How it started</p>
            <h2 className="text-3xl font-black leading-[1.1] text-white md:text-4xl">
              One developer, then one analyst.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2" data-reveal-list>
            <div className="motion-card rounded-2xl border border-cyan-300/20 bg-cyan-500/[0.06] p-7" data-reveal>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">2024</p>
              <h3 className="mt-3 text-lg font-black text-white">Quincy started building.</h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                Quincy founded Cozy Digital in 2024 while finishing a Computer Science degree and working his university&apos;s front-line IT support desk. The premise was simple: small businesses needed websites that actually worked, and he could ship them end to end, from design and hosting through domains, campaigns, and the maintenance afterward.
              </p>
            </div>

            <div className="motion-card rounded-2xl border border-fuchsia-300/20 bg-fuchsia-500/[0.06] p-7" data-reveal>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-fuchsia-300">November 2025</p>
              <h3 className="mt-3 text-lg font-black text-white">Kayson changed how we work.</h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                Kayson joined as the second founder after two years at Sibel Health supporting healthcare applications and connected medical devices, investigating bad production data with Python and SQL, running UI and API testing, and tracking defects to resolution. He brought that discipline with him.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7" data-reveal>
            <p className="text-base leading-relaxed text-zinc-300">
              That&apos;s the part that makes the studio unusual for its size. Nothing gets designed before the workflow behind it is mapped, and nothing gets handed over before it&apos;s been tested on the paths that break. Most small agencies are one generalist doing everything. We split it: analysis and validation on one side, build and growth on the other, with both of us on every project.
            </p>
            <Link
              href="/founders/"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 transition-colors hover:text-cyan-100"
            >
              Meet the founders
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 max-w-2xl" data-reveal>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">How we work</p>
            <h2 className="text-3xl font-black leading-[1.1] text-white md:text-4xl">
              Four things we don&apos;t bend on.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2" data-reveal-list>
            {principles.map((p) => (
              <div
                key={p.label}
                className="motion-card rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-colors duration-200 hover:border-cyan-400/20 hover:bg-white/[0.06]"
                data-reveal
              >
                <h3 className="text-base font-black text-white">{p.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <div className="border-y border-white/[0.06] bg-white/[0.02]">
        <FounderTrust />
      </div>

      {/* WHAT WE'VE SHIPPED */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 max-w-2xl" data-reveal>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">What we&apos;ve shipped</p>
            <h2 className="text-3xl font-black leading-[1.1] text-white md:text-4xl">
              Brands with a lot to hold, given one clear home.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2" data-reveal-list>
            {shipped.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="motion-card group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-colors duration-200 hover:border-cyan-400/20 hover:bg-white/[0.06]"
                data-reveal
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">{project.kind}</p>
                <h3 className="mt-3 text-lg font-black text-white">{project.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.detail}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 transition-colors group-hover:text-cyan-100">
                  View the live website
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8" data-reveal>
            <Link href="/#client-work" className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-400 transition-colors hover:text-cyan-300">
              See the full case studies →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] px-6 py-24">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <h2 className="text-3xl font-black leading-[1.1] text-white md:text-4xl">
            Start with the free audit.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-400">
            Send your website or social link and we&apos;ll review it the way a first-time customer would, then send back the first three improvements we&apos;d make, whether or not you hire us.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/free-audit/" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
              <span>Get a Free Digital Presence Audit</span>
              <ArrowIcon />
            </Link>
            <Link href="/cozy-booking/" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-white/[0.06]">
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
