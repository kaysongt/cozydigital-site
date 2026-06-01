import type { Metadata } from "next";

const consultationSteps = [
  "We look at your current website, social presence, and online offer.",
  "We point out where people may be losing interest before they buy, book, or reach out.",
  "We recommend the cleanest next step — no pressure, no confusing package pitch.",
];

const calendlyUrl = "https://calendly.com/cozydigital-out/30min";
const calendlyEmbedUrl = `${calendlyUrl}?hide_gdpr_banner=1&background_color=09090b&text_color=fafafa&primary_color=f59e0b`;

export const metadata: Metadata = {
  title: "Schedule a Call | Cozy Digital",
  description: "Schedule a 30-minute Cozy Digital consultation through the embedded Calendly calendar.",
};

export default function CozyBookingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="relative overflow-hidden border-b border-white/8">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,211,238,0.19) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(217,70,239,0.16) 0%, transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="mx-auto mb-4 w-fit rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
            Free Consultation
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Book a Cozy Digital growth consultation.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-300">
            This page is for brands that want more traction online — clearer pages, stronger content, and a smoother path from attention to sales.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-400">What happens on the call</p>
          <h2 className="text-2xl font-bold text-white">A simple strategy call for growing online.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {consultationSteps.map((step, index) => (
              <div key={step} className="flex gap-3 rounded-xl border border-white/8 bg-black/20 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-black">
                  {index + 1}
                </span>
                <p className="text-sm leading-relaxed text-zinc-300">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-amber-400/20 bg-zinc-950 shadow-2xl shadow-amber-500/10">
          <div className="border-b border-white/10 bg-white/[0.04] px-6 py-5 md:px-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-400">Scheduling</p>
            <h2 className="text-2xl font-bold text-white">Schedule your 30-minute consultation.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300">
              Choose a time that works for you and we&apos;ll talk through simple ways to improve your website, content, and online sales path.
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-lg border border-amber-300/30 bg-black/25 px-4 py-2 text-sm font-bold text-amber-100 transition-colors hover:bg-black/40"
            >
              Open calendar in Calendly if the embed does not load
            </a>
          </div>
          <iframe
            src={calendlyEmbedUrl}
            title="Schedule a Cozy Digital consultation"
            loading="eager"
            className="h-[820px] w-full border-0 bg-zinc-950"
          />
        </div>
      </section>
    </main>
  );
}
