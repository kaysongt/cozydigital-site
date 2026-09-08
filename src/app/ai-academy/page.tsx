import Link from "next/link";
import type { Metadata } from "next";

/**
 * /ai-academy/ moved to /courses/ when the tab became "Courses".
 *
 * The site is a static export on GitHub Pages, so there is no server to issue
 * a 301. This stub does the next best thing and keeps the old URL working for
 * anything already pointing at it -- inbound links, anyone's bookmark, and the
 * address printed in older material. `canonical` hands the ranking to /courses/,
 * the refresh moves a real visitor, and the link is there for anyone whose
 * browser ignores both.
 *
 * Do not delete this until /ai-academy/ has stopped receiving traffic.
 */

const TARGET = "https://cozydigital.org/courses/";

export const metadata: Metadata = {
  title: "The AI Advantage Blueprint has moved to Courses | Cozy Digital",
  description:
    "The Cozy Digital AI Academy course now lives at /courses/, alongside the AI video work.",
  alternates: { canonical: TARGET },
  // Keep the old URL out of the index now that /courses/ is the real page,
  // while still following through to it.
  robots: { index: false, follow: true },
  other: { refresh: `0; url=${TARGET}` },
};

export default function AiAcademyMoved() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
      </noscript>
      <div className="mx-auto max-w-md text-center">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-fuchsia-300">
          Cozy Digital
        </p>
        <h1 className="text-2xl font-black tracking-tight text-white">
          This page is now under Courses
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          The AI Advantage Blueprint moved to{" "}
          <span className="text-zinc-200">/courses/</span>, where the AI video
          work sits alongside it.
        </p>
        <Link
          href="/courses/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-black text-black transition-colors hover:bg-cyan-400"
        >
          Go to Courses
        </Link>
      </div>
    </main>
  );
}
