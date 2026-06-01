import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Consultation | Cozy Digital",
  description: "Schedule your free Cozy Digital strategy call. 30 minutes. No pressure.",
};

export default function CozyBookingPage() {
  const calendlyUrl =
    "https://calendly.com/cozydigital-out/30min?background_color=0a0a0a&text_color=888888&primary_color=22d3ee";

  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">Free Consultation</p>
        <h1 className="text-4xl font-black text-white md:text-5xl">Book a Free Strategy Call</h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          30 minutes. We review your site and socials, identify the top 3 friction points, and show what we would fix first.
          You leave with clear notes whether you hire us or not.
        </p>
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <iframe
            src={calendlyUrl}
            width="100%"
            height="700"
            frameBorder="0"
            title="Book a Free Strategy Call"
          />
        </div>
        <p className="mt-4 text-xs text-zinc-500">No pressure &mdash; leave with clear next steps.</p>
      </div>
    </main>
  );
}
