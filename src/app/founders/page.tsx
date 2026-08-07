import Link from "next/link";
import type { Metadata } from "next";
import FounderAvatar from "@/components/founder-avatar";
import { founders, workSplit, type FounderAccent } from "@/data/founders";

export const metadata: Metadata = {
  title: "Meet the Founders | Cozy Digital",
  description:
    "Cozy Digital is run by its two founders. Quincy builds and deploys the work; Kayson maps the workflows and tests what ships. Meet the people you'd actually be working with.",
  alternates: { canonical: "https://www.cozydigital.org/founders/" },
  openGraph: {
    title: "Meet the Founders | Cozy Digital",
    description:
      "The two people behind Cozy Digital — a developer who ships client systems end to end and a business applications analyst who maps and tests the workflows behind them.",
    url: "https://www.cozydigital.org/founders/",
  },
};

const baseUrl = "https://www.cozydigital.org";

// Person schema so answer engines can attribute the work to real people.
const personSchema = {
  "@context": "https://schema.org",
  "@graph": founders.map((person) => ({
    "@type": "Person",
    "@id": `${baseUrl}/founders/#${person.slug}`,
    name: person.name,
    jobTitle: person.role,
    ...(person.email ? { email: person.email } : {}),
    homeLocation: { "@type": "Place", name: person.location },
    worksFor: { "@id": `${baseUrl}/#organization` },
    alumniOf: person.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.org.split(" · ")[0],
    })),
    knowsAbout: person.toolkit.flatMap((group) => group.items),
    ...(person.links?.length ? { sameAs: person.links.map((l) => l.href) } : {}),
  })),
};

const accentText: Record<FounderAccent, string> = {
  cyan: "text-cyan-400",
  fuchsia: "text-fuchsia-300",
};

const accentChip: Record<FounderAccent, string> = {
  cyan: "border-cyan-400/25 bg-cyan-500/10 text-cyan-300",
  fuchsia: "border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-200",
};

const accentRule: Record<FounderAccent, string> = {
  cyan: "bg-gradient-to-b from-cyan-400/60 to-transparent",
  fuchsia: "bg-gradient-to-b from-fuchsia-400/60 to-transparent",
};

const accentGlow: Record<FounderAccent, string> = {
  cyan: "from-cyan-500/[0.09] via-transparent to-transparent",
  fuchsia: "from-fuchsia-500/[0.09] via-transparent to-transparent",
};

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

const promises = [
  {
    title: "Two people, not a handoff",
    desc: "The person who scopes your project and the person who builds it are the only two people on the call. Nothing gets lost in translation to an account team.",
  },
  {
    title: "Analysis before design",
    desc: "We map how your customers and staff actually move through booking, intake, and follow-up before anyone opens a design file.",
  },
  {
    title: "Tested, then handed over",
    desc: "Integrations get run through their normal and error paths, documented, and fixed where the logic doesn't hold. Then the site is yours.",
  },
];

export default function FoundersPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <script
        type="application/ld+json"
        // JSON-LD built from a static local module — not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* HERO */}
      <section className="cozy-hero relative overflow-hidden px-6 pb-16 pt-14 md:pb-20 md:pt-20">
        <div className="cozy-aurora cozy-aurora-cyan" aria-hidden="true" />
        <div className="cozy-aurora cozy-aurora-fuchsia" aria-hidden="true" />
        <div className="cozy-hero-grid" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div data-hero-copy>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">Meet the Founders</p>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl">
              You&apos;ll be working with{" "}
              <span className="cozy-gradient-text">the two people who build it.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Cozy Digital is a two-founder studio. One of us writes the code, ships the sites, and runs the campaigns. The other maps the workflow, configures the systems, and tests them before they touch a customer. There is no third layer.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/cozy-booking/" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
                <span>Talk to us directly</span>
                <ArrowIcon />
              </Link>
              <Link href="/#client-work" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-white/[0.06]">
                See what we&apos;ve built
              </Link>
            </div>
          </div>

          {/* Founder cards, stacked and offset */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-lg" data-reveal-list>
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 blur-2xl" aria-hidden="true" />
            <div className="relative space-y-4">
              {founders.map((person, index) => (
                <a
                  key={person.slug}
                  href={`#${person.slug}`}
                  className={`motion-card group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm sm:gap-5 sm:p-5 ${
                    index === 1 ? "lg:ml-10" : "lg:mr-10"
                  }`}
                  data-reveal
                >
                  <FounderAvatar person={person} size={72} className="sm:hidden" />
                  <FounderAvatar person={person} size={88} className="hidden sm:block" />
                  <div className="min-w-0">
                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${accentText[person.accent]}`}>
                      {person.focus}
                    </p>
                    <p className="mt-1 text-base font-black text-white sm:text-lg">{person.name}</p>
                    <p className="mt-0.5 text-xs font-bold text-zinc-400">{person.role}</p>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-500 line-clamp-3">{person.short}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* What that structure gets you */}
        <div className="relative mx-auto mt-20 grid max-w-6xl gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3 lg:mt-24" data-reveal-list>
          {promises.map((p) => (
            <div key={p.title} className="motion-card bg-zinc-950 p-5 text-left sm:p-6" data-reveal>
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-500/10 text-cyan-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-sm font-black text-white">{p.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER PROFILES */}
      <section className="px-6 py-20" aria-label="Founder profiles">
        <div className="mx-auto max-w-6xl space-y-16">
          {founders.map((person) => (
            <article
              key={person.slug}
              id={person.slug}
              className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-9 lg:p-11"
              data-reveal
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentGlow[person.accent]}`} aria-hidden="true" />

              <div className="relative">
                {/* Header */}
                <header className="flex flex-col gap-6 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-center sm:gap-7">
                  <FounderAvatar person={person} size={112} />
                  <div className="min-w-0 flex-1">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${accentChip[person.accent]}`}>
                      {person.focus}
                    </span>
                    <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                      {person.name}
                    </h2>
                    <p className="mt-1.5 text-sm font-bold text-zinc-300">{person.role}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-500">
                      <span className="inline-flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {person.location}
                      </span>
                      {person.email && (
                        <a href={`mailto:${person.email}`} className={`font-semibold transition-colors hover:text-white ${accentText[person.accent]}`}>
                          {person.email}
                        </a>
                      )}
                      {person.links?.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`font-semibold transition-colors hover:text-white ${accentText[person.accent]}`}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </header>

                {/* Bio + what they own */}
                <div className="grid gap-10 pt-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
                  <div className="space-y-5">
                    {person.bio.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-zinc-400">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="space-y-9">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
                        What {person.name.split(" ")[0]} owns
                      </p>
                      <ul className="mt-4 space-y-3">
                        {person.owns.map((item) => (
                          <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                            <span className={`mt-0.5 shrink-0 ${accentText[person.accent]}`}>&#x2713;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
                        Education & training
                      </p>
                      <div className="mt-4 space-y-4">
                        {person.education.map((e) => (
                          <div key={e.credential} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                            <p className="text-sm font-black leading-snug text-white">{e.credential}</p>
                            <p className={`mt-1 text-xs font-bold ${accentText[person.accent]}`}>{e.org}</p>
                            <p className="mt-2 text-xs leading-relaxed text-zinc-400">{e.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Track record */}
                <div className="mt-11 border-t border-white/[0.08] pt-9">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Track record</p>
                  <ol className="mt-6 space-y-6">
                    {person.timeline.map((job) => (
                      <li key={`${job.org}-${job.period}`} className="relative flex gap-5 pl-1">
                        <div className="relative flex flex-col items-center pt-1.5">
                          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-zinc-950 ${person.accent === "cyan" ? "bg-cyan-400" : "bg-fuchsia-400"}`} aria-hidden="true" />
                          <span className={`mt-1 w-px flex-1 ${accentRule[person.accent]}`} aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1 pb-1">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                            <p className="text-sm font-black text-white">{job.role}</p>
                            <p className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-zinc-500">{job.period}</p>
                          </div>
                          <p className="mt-0.5 text-xs font-semibold text-zinc-400">{job.org}</p>
                          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{job.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Toolkit */}
                <div className="mt-11 border-t border-white/[0.08] pt-9">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Toolkit</p>
                  <div className="mt-6 grid gap-6 sm:grid-cols-3">
                    {person.toolkit.map((group) => (
                      <div key={group.label}>
                        <p className={`mb-3 text-xs font-black ${accentText[person.accent]}`}>{group.label}</p>
                        <ul className="flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[11px] font-semibold text-zinc-300"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected work */}
                <div className="mt-11 border-t border-white/[0.08] pt-9">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    Selected work & recognition
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2" data-reveal-list>
                    {person.proof.map((item) => (
                      <div
                        key={item.title}
                        className="motion-card rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-colors duration-200 hover:border-white/[0.14] hover:bg-white/[0.06]"
                        data-reveal
                      >
                        <h3 className="text-sm font-black leading-snug text-white">{item.title}</h3>
                        <p className="mt-2 text-xs leading-relaxed text-zinc-400">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* HOW THE WORK SPLITS */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl" data-reveal>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">How we split the work</p>
            <h2 className="text-3xl font-black leading-[1.1] text-white md:text-4xl">
              Two skill sets, one pass through your project.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              Most small studios are one generalist doing everything, or a large agency where nobody owns the whole picture. We split it down the middle: analysis and validation on one side, build and growth on the other, with both of us on every project.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-list>
            {workSplit.map((stage, index) => (
              <li
                key={stage.stage}
                className="motion-card rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-colors duration-200 hover:border-white/[0.14] hover:bg-white/[0.06]"
                data-reveal
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-black tracking-widest text-zinc-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${accentChip[stage.accent]}`}>
                    {stage.lead}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-black text-white">{stage.stage}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{stage.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <h2 className="text-3xl font-black leading-[1.1] text-white md:text-4xl">
            Bring us the thing that isn&apos;t working.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-400">
            Send your website or social link and we&apos;ll review it the way a first-time customer would, then send back the first three improvements we&apos;d make — whether or not you hire us.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/free-audit/" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
              <span>Get Your Free Audit</span>
              <ArrowIcon />
            </Link>
            <Link href="/cozy-booking/" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-white/[0.06]">
              Schedule a Call
            </Link>
            <Link href="/about/" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-white/[0.06]">
              About Cozy Digital
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
