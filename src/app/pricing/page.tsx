import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Cozy Digital",
  description: "Cozy Digital packages for websites, content systems, and lead-path cleanup.",
};

const plans = [
  { badge: "STARTER", name: "Social Ignite", price: "$297/mo", tagline: "Built for brands ready to show up consistently and start converting.", items: ["Done-for-you content calendar", "Platform-specific posting strategy", "Weekly performance review", "Email support"], highlight: false },
  { badge: "RECOMMENDED", name: "Growth Partner", price: "$497/mo", tagline: "For brands serious about turning social into a real lead channel.", items: ["Everything in Social Ignite", "4 branded video clips per month", "Ad creative grading + optimization", "Priority turnaround & support"], highlight: true },
  { badge: "FULL SCALE", name: "Elite Retainer", price: "$797/mo", tagline: "Done-with-you growth system. We run the strategy, you run the business.", items: ["Everything in Growth Partner", "8 branded video clips per month", "Weekly ad + content optimization", "Monthly growth strategy review"], highlight: false },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">Packages</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Pick your growth level</h1>
          <p className="mx-auto mt-3 max-w-xl text-zinc-400">Simple packages. No fluff. Built around what actually moves the needle.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`relative flex flex-col rounded-2xl border p-6 ${p.highlight ? "border-cyan-300/40 bg-cyan-500/[0.04] shadow-lg" : "border-white/10 bg-white/[0.04]"}`}>
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-cyan-300/40 bg-cyan-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">Recommended</div>
              )}
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{p.badge}</p>
              <h2 className="mt-1.5 text-xl font-black text-white">{p.name}</h2>
              <p className="mt-0.5 text-2xl font-black text-cyan-300">{p.price}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.tagline}</p>
              <ul className="mt-5 flex-1 space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-300"><span className="text-cyan-400">&#x2713;</span>{item}</li>
                ))}
              </ul>
              <Link href="/cozy-booking" className={`mt-6 block w-full rounded-xl py-3 text-center text-sm font-bold transition-all ${p.highlight ? "bg-white text-black hover:bg-zinc-200" : "border border-white/15 bg-white/5 text-zinc-200 hover:bg-white/10"}`}>
                Book a Free Audit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
