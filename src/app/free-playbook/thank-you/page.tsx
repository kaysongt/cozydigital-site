import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Playbook Is Ready | Cozy Digital",
  description: "Download the Booking-Ready Brand Playbook from Cozy Digital.",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-zinc-100">
      <div className="mx-auto max-w-2xl text-center">

        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 text-4xl">
          🎉
        </div>

        <h1 className="text-4xl font-black text-white md:text-5xl">Your playbook is ready.</h1>
        <p className="mx-auto mt-4 max-w-md text-zinc-400">
          Check your inbox — we sent it there too so you always have it. Click below to download it now.
        </p>

        <div className="mt-10">
          <a
            href="/downloads/cozy-digital-playbook.pdf"
            download="Cozy-Digital-Booking-Ready-Brand-Playbook.pdf"
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-10 py-5 text-base font-black text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500"
          >
            <span>⬇</span> Download The Playbook
          </a>
          <p className="mt-3 text-xs text-zinc-600">PDF · Free · No strings attached</p>
        </div>

        <div className="mt-14 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">What&apos;s next</p>
          <h2 className="text-2xl font-black text-white">Want us to do it with you?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
            The playbook gives you the framework. A free consultation gives you the exact steps for <em>your</em> specific site, content, and booking path.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/cozy-booking/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-8 py-3.5 text-sm font-bold text-white hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500"
            >
              Book a Free Consultation
            </Link>
            <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-200">
              Back to home →
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
