import Link from "next/link";
import type { Metadata } from "next";

// Post-purchase delivery page. Stripe redirects buyers here after a successful
// $30 payment. It is intentionally kept out of the nav and sitemap and is
// noindex'd + robots-disallowed so it is not discoverable — but note it is still
// a public URL, so the real protection is that COURSE_FILE_URL below is an
// UNLISTED cloud link (Google Drive / Dropbox) that is NOT committed to this
// public repo.
//
// The self-contained interactive course, hosted at an unguessable path under
// public/. NOTE: this repo is public, so the file is technically findable by
// anyone browsing the GitHub repo — for airtight gating, move delivery to
// Gumroad or a purchase-verified download later.
const COURSE_FILE_URL =
  "/academy/aab-fui6crgatq9k12zs/AI_Advantage_Interactive_Course.html";

export const metadata: Metadata = {
  title: "Your Course Access | Cozy Digital AI Academy",
  description: "Download your copy of The AI Advantage Blueprint.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.cozydigital.org/academy-access/" },
};

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">Payment received — you&apos;re in</p>
          <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">Welcome to the AI Academy.</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-300">
            Thanks for grabbing <strong className="text-white">The AI Advantage Blueprint</strong>. Open your course below — it runs right in your browser. Bookmark this page, or save the file to keep it forever.
          </p>

          <a
            href={COURSE_FILE_URL}
            target="_blank"
            rel="noopener"
            className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-600 to-cyan-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-fuchsia-900/25 hover:from-fuchsia-400 hover:via-violet-500 hover:to-cyan-400"
          >
            <span>Open your course</span>
            <ArrowIcon />
          </a>

          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-left">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-300">A few tips</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li className="flex gap-2"><span className="text-fuchsia-300">&#x2713;</span> Save the file somewhere safe — it&apos;s yours to keep forever.</li>
              <li className="flex gap-2"><span className="text-fuchsia-300">&#x2713;</span> It works completely offline. No login, nothing to install.</li>
              <li className="flex gap-2"><span className="text-fuchsia-300">&#x2713;</span> Your progress and everything you type saves privately in your browser.</li>
              <li className="flex gap-2"><span className="text-fuchsia-300">&#x2713;</span> Bookmark this page in case you need to re-download.</li>
            </ul>
          </div>

          <p className="mt-6 text-xs text-zinc-500">
            Trouble with the download? Email us and we&apos;ll get you sorted.
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
