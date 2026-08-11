import type { Metadata } from "next";
import AuditForm from "@/components/audit-form";

export const metadata: Metadata = {
  title: "Free Digital Presence Audit | Cozy Digital",
  description:
    "Request a free Digital Presence Audit from Cozy Digital. We review your website, messaging, trust signals, content, booking path, and search visibility, then identify the first three improvements we'd make.",
  alternates: { canonical: "https://cozydigital.org/free-audit/" },
};

const auditCovers = [
  {
    label: "Website & messaging",
    desc: "Does a first-time visitor understand what you do and who it's for within seconds?",
  },
  {
    label: "Trust signals",
    desc: "Can a visitor find the credibility signals they need before deciding to contact you?",
  },
  {
    label: "Booking & conversion path",
    desc: "Is there one obvious next step, or competing buttons pulling attention in different directions?",
  },
  {
    label: "Content & search visibility",
    desc: "Does your content support your offer, and can search engines and AI systems understand your business?",
  },
];

const deliverables = [
  {
    n: "01",
    title: "Three priority improvements",
    desc: "Ranked by impact, not by what is easiest for us to sell you.",
  },
  {
    n: "02",
    title: "Your biggest trust or conversion gaps",
    desc: "The specific moments where visitors hesitate, and why.",
  },
  {
    n: "03",
    title: "Clear next steps, no obligation",
    desc: "Yours to act on with us, with someone else, or on your own.",
  },
];

function CheckBadge() {
  return (
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/25 to-blue-500/20 ring-1 ring-cyan-300/30">
      <svg
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="h-4 w-4 text-cyan-300"
      >
        <path
          d="M5 10.5l3.2 3.2L15 7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Small caps heading with a gradient rule trailing off to the right. */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <h2 className="bg-gradient-to-r from-cyan-200 via-blue-200 to-fuchsia-200 bg-clip-text text-sm font-black uppercase tracking-[0.2em] text-transparent">
        {children}
      </h2>
      <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/35 via-fuchsia-300/20 to-transparent" />
    </div>
  );
}

export default function FreeAuditPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-3xl">
        {/* Kept deliberately tight: the form is the point of this page, so it
            should be reachable without scrolling past a wall of copy. */}
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
            Free Digital Presence Audit
          </p>
          <h1 className="text-4xl font-black leading-[1.1] text-white md:text-5xl">
            Request your free{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
              Digital Presence Audit
            </span>
            .
          </h1>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-zinc-400">
            We&apos;ll review your website, messaging, trust signals, content,
            booking path, and search visibility, then identify the first three
            improvements we would make. You leave with clear next steps whether
            or not you hire us.
          </p>
        </div>

        {/* scroll-mt clears the sticky header when linked to as #audit-form. */}
        <div id="audit-form" className="scroll-mt-24">
          <AuditForm leadSource="Free Audit Page" />
        </div>

        <div className="mt-16">
          <SectionHeading>What the audit covers</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {auditCovers.map(item => (
              <div
                key={item.label}
                className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-5 transition-colors duration-300 hover:border-cyan-300/30"
              >
                <div className="flex items-start gap-3.5">
                  <CheckBadge />
                  <div>
                    <p className="text-[15px] font-black tracking-tight text-white">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <SectionHeading>What you&apos;ll receive</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-3">
            {deliverables.map(item => (
              <div
                key={item.n}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-5 transition-colors duration-300 hover:border-fuchsia-300/25"
              >
                <span className="bg-gradient-to-br from-cyan-300 to-fuchsia-400 bg-clip-text text-2xl font-black tracking-tight text-transparent">
                  {item.n}
                </span>
                <p className="mt-2 text-sm font-black leading-snug tracking-tight text-white">
                  {item.title}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <a
            href="#audit-form"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-cyan-900/25 transition-all hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500"
          >
            Start my free audit ↑
          </a>
        </div>
      </div>
    </main>
  );
}
