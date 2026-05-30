import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Cozy Digital",
  description: "Website cleanup, content systems, and booking path fixes for service brands.",
};

const services = [
  { title: "Website & Landing Pages", desc: "Sharpen your homepage, clarify the offer, and create flows that answer visitor questions instantly. We fix the above-the-fold section, headline, CTA, and proof blocks.", price: "From $497" },
  { title: "Content Engine", desc: "Organize ideas into pillars, hooks, captions, and rhythms so content supports offers without burnout. Includes templates, posting schedule, and caption formulas.", price: "From $297/mo" },
  { title: "Booking & Inquiry Paths", desc: "Fix booking pages, inquiry forms, and social CTAs so interested people actually become leads. Includes form redesign, confirmation copy, and follow-up wording.", price: "From $297" },
  { title: "Brand Content Templates", desc: "Reusable Canva or Figma templates matched to your brand so every post looks intentional. Covers feed posts, stories, reels covers, and highlights.", price: "From $97" },
  { title: "Free First-Impression Audit", desc: "30-minute screen-share where we walk through your site and socials, identify the top 3 friction points, and show what we would fix first.", price: "Free" },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">Services</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">What we actually fix</h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">No bloated retainers. Pick the work that moves your needle.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-black text-white">{s.title}</h2>
                <span className="shrink-0 rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-200">{s.price}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/cozy-booking" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-8 py-4 text-sm font-bold text-white shadow-xl hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </main>
  );
}
