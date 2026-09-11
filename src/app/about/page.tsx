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

// How we actually operate. Each of these is backed by something real: the
// ownership and no-contract terms we hold ourselves to, or the way the two
// founders split analysis and build. Don't add aspirational ones.
const principles = [
  {
    label: "Analysis before design",
    body: "We work through your booking, intake, and follow-up with you before deciding what to build.",
  },
  {
    label: "Details carried through",
    body: "Your website, video, and customer emails should sound like the same business. We keep the services, contact details, and visual direction consistent.",
  },
  {
    label: "Tested before handoff",
    body: "We test forms, payments, bookings, and connected tools, including what happens when something goes wrong. Any issues we find go back into the work before handoff.",
  },
  {
    label: "You own what we build",
    body: "The completed work is yours. Ongoing support is available month to month, with the scope agreed before we begin.",
  },
];

// `href` is omitted while a project has no public address to send people to yet.
// Those cards render as plain cards with a status line instead of a link.
const shipped: { name: string; kind: string; detail: string; href?: string; status?: string }[] = [
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
  {
    name: "Lavar Scott",
    kind: "Motorsport",
    detail: "A NASCAR driver's sponsorship deck rebuilt as a website: his story, audience, community work, and partnership packages in one place brands can act on.",
    status: "Website concept",
  },
  {
    name: "KingsWord Training Institute",
    kind: "Christian education",
    detail: "A 32-course biblical studies certificate taken online end to end: curriculum, enrollment, payment, and a student dashboard that opens each module on schedule.",
    href: "https://thekti.org/",
  },
  {
    name: "Essential Massage by Mesha",
    kind: "Massage therapy",
    detail: "A massage practice moved off a rented booking platform onto a site it owns, with the full service menu, studio, and reviews in one place.",
    status: "Booking and payments wiring next",
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
            We&apos;re Quincy and Kayson. We design websites, produce AI video, and connect the booking and follow-up tools businesses use every day.
          </p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16" data-reveal>
            <div className="space-y-5 text-base leading-relaxed text-zinc-400">
              <p>
                Some projects start with a website. Others start with a video idea or a booking process that needs fixing. We help you define the work, agree on the scope, and take it through production.
              </p>
              <p>
                We work with service businesses, local brands, and creators. You speak directly with us, review work as it develops, and know who to contact when you need an update.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">The work is practical</p>
              <ul className="mt-5 space-y-3">
                {[
                  "Website design and development",
                  "AI video for ads and social content",
                  "Booking forms and lead intake",
                  "Customer emails and follow-up",
                  "Site maintenance and search information",
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
      <section className="border-y border-white/[0.06] bg-white/[0.02] px-6 py-16 md:py-20">
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
                Quincy founded Cozy Digital in 2024 while studying Computer Science and working his university&apos;s IT support desk. He took on the full website process, from design and development to domains, hosting, campaigns, and maintenance.
              </p>
            </div>

            <div className="motion-card rounded-2xl border border-fuchsia-300/20 bg-fuchsia-500/[0.06] p-7" data-reveal>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-fuchsia-300">November 2025</p>
              <h3 className="mt-3 text-lg font-black text-white">Kayson joined the studio.</h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                Kayson joined as the second founder after two years at Sibel Health supporting healthcare applications and connected medical devices, investigating bad production data with Python and SQL, running UI and API testing, and tracking defects to resolution. He brought that discipline with him.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7" data-reveal>
            <p className="text-base leading-relaxed text-zinc-300">
              Quincy handles design and development. Kayson maps the customer workflow and tests the finished system. We review the work together, so the pages and the tools behind them are part of the same project.
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
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 max-w-2xl" data-reveal>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">How we work</p>
            <h2 className="text-3xl font-black leading-[1.1] text-white md:text-4xl">
              How we approach your project.
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
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 max-w-2xl" data-reveal>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">What we&apos;ve shipped</p>
            <h2 className="text-3xl font-black leading-[1.1] text-white md:text-4xl">
              A few of the projects we&apos;ve worked on.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-list>
            {shipped.map((project) => {
              const body = (
                <>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">{project.kind}</p>
                  <h3 className="mt-3 text-lg font-black text-white">{project.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.detail}</p>
                </>
              );

              if (!project.href) {
                return (
                  <div
                    key={project.name}
                    className="motion-card rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6"
                    data-reveal
                  >
                    {body}
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-zinc-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" aria-hidden="true" />
                      {project.status}
                    </span>
                  </div>
                );
              }

              return (
                <a
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="motion-card group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-colors duration-200 hover:border-cyan-400/20 hover:bg-white/[0.06]"
                  data-reveal
                >
                  {body}
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 transition-colors group-hover:text-cyan-100">
                    View the live website
                    <ArrowIcon />
                  </span>
                </a>
              );
            })}
          </div>

          <div className="mt-8" data-reveal>
            <Link href="/#client-work" className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-400 transition-colors hover:text-cyan-300">
              See the full case studies →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <h2 className="text-3xl font-black leading-[1.1] text-white md:text-4xl">
            Start with the free audit.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-400">
            Send your website or social link and we&apos;ll review it the way a first-time customer would, then send back the first three improvements we&apos;d make, whether or not you hire us.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/free-audit/#audit-form" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
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
