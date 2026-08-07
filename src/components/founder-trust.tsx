import Link from "next/link";
import FounderAvatar from "@/components/founder-avatar";
import { founders } from "@/data/founders";

/**
 * Compact founder / team trust strip, shown on the homepage and About page.
 *
 * People and copy live in `src/data/founders.ts` — edit there, not here, so the
 * strip and the full /founders/ page never drift apart.
 */

const accentText = {
  cyan: "text-cyan-400",
  fuchsia: "text-fuchsia-300",
} as const;

export default function FounderTrust() {
  return (
    <section className="px-6 py-20" aria-labelledby="team-heading">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center" data-reveal>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">
            The Founders
          </p>
          <h2 id="team-heading" className="text-3xl font-black text-white md:text-4xl">
            Meet the people behind the work.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
            Cozy Digital is a two-founder studio. You work directly with the
            people building your website, content, and booking systems, not a
            rotating account team.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2" data-reveal-list>
          {founders.map((person) => (
            <Link
              key={person.slug}
              href={`/founders/#${person.slug}`}
              className="motion-card group flex flex-col items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 text-center transition-colors duration-200 hover:border-white/[0.14] hover:bg-white/[0.06]"
              data-reveal
            >
              <FounderAvatar person={person} size={96} />
              <h3 className="mt-5 text-lg font-black text-white">{person.name}</h3>
              <p className={`mt-1 text-xs font-bold uppercase tracking-wide ${accentText[person.accent]}`}>
                {person.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{person.short}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 transition-colors group-hover:text-cyan-100">
                Read the full profile
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center" data-reveal>
          <Link
            href="/founders/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/[0.06]"
          >
            Meet the founders
          </Link>
        </div>
      </div>
    </section>
  );
}
