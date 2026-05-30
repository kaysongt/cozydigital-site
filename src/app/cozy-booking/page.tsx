import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Consultation | Cozy Digital",
  description: "Schedule your free Cozy Digital strategy call. 30 minutes. No pressure.",
};

export default function CozyBookingPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">Free Consultation</p>
        <h1 className="text-4xl font-black text-white md:text-5xl">Book a Free Strategy Call</h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          30 minutes. We review your site and socials, identify the top 3 friction points, and show what we would fix first.
          You leave with clear notes whether you hire us or not.
        </p>
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-zinc-300 text-sm mb-6">Click below to access the booking calendar:</p>
          <a
            href="https://calendly.com/cozydigital"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-10 py-4 text-base font-bold text-white shadow-xl hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500"
          >
            Open Booking Calendar
          </a>
          <p className="mt-6 text-xs text-zinc-500">No pressure &mdash; leave with clear next steps.</p>
        </div>
      </div>
    </main>
  );
}
