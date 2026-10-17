import Link from "next/link";
import type { Metadata } from "next";
import { CLIENT_HUB_URL } from "@/lib/client-hub";

// Stripe sends AI Advantage Blueprint buyers here after checkout. The course
// file used to sit at a public path in this public repository. It is now
// delivered only from the Client Hub, which checks the buyer's verified Google
// email against Stripe's record of the purchase before every download.
const HUB_ACCESS_URL = new URL("courses/ai-advantage-blueprint/access", CLIENT_HUB_URL).href;

export const metadata: Metadata = {
  title: "Your Course Access | Cozy Digital AI Academy",
  description: "Download your copy of The AI Advantage Blueprint.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://cozydigital.org/academy-access/" },
};

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

export default function AcademyAccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-20 text-zinc-100">
      <div className="w-full max-w-xl text-center">
        <div className="relative overflow-hidden rounded-3xl border border-fuchsia-300/30 bg-gradient-to-b from-fuchsia-500/[0.10] to-cyan-500/[0.05] p-8 shadow-2xl shadow-fuchsia-950/20 md:p-10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-300/30 bg-fuchsia-500/15 text-fuchsia-200">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">Your course access</p>
          <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">Welcome to the AI Academy.</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-300">
            <strong className="text-white">The AI Advantage Blueprint</strong> downloads from the Cozy Digital Client Hub. Continue with the Google account that uses the email on your Stripe receipt, and your copy is ready.
          </p>

          <a
            href={HUB_ACCESS_URL}
            className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-600 to-cyan-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-fuchsia-900/25 hover:from-fuchsia-400 hover:via-violet-500 hover:to-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          >
            <span>Get your course</span>
            <ArrowIcon />
          </a>

          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-left">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-300">Good to know</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li className="flex gap-2"><span className="text-fuchsia-300" aria-hidden="true">&#x2713;</span> Bought earlier? The same page finds your purchase. No receipt link needed.</li>
              <li className="flex gap-2"><span className="text-fuchsia-300" aria-hidden="true">&#x2713;</span> Paid with an email that isn&apos;t a Google account? Create a free Google account with that same email, then sign in.</li>
              <li className="flex gap-2"><span className="text-fuchsia-300" aria-hidden="true">&#x2713;</span> The course is one file. Save it, open it in any browser, and it works offline. It&apos;s yours to keep.</li>
            </ul>
          </div>

          <p className="mt-6 text-xs text-zinc-400">
            Trouble signing in? <Link href="/cozy-booking/" className="underline underline-offset-4 hover:text-zinc-200">Contact us</Link> with your receipt.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-400">Would you rather have these systems built for you?</p>
          <Link href="/services/" className="group mt-2 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition-colors hover:text-cyan-100">
            See what Cozy Digital does <ArrowIcon />
          </Link>
        </div>
      </div>
    </main>
  );
}
