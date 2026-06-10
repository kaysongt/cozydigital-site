import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Cozy Digital",
  description: "Cozy Digital pricing — full build packages and monthly retainer options.",
};

const buildItems = [
  { service: "Custom Website (5 pages + custom landing page)", price: "$1,200" },
  { service: "Direct Booking System Setup", price: "$300" },
  { service: "Google Business Profile Optimization", price: "$250" },
  { service: "Local SEO Foundation", price: "$400" },
  { service: "Social Media Branding & Content Templates", price: "$350" },
  { service: "Automated Follow-Up System (email or SMS)", price: "$300" },
  { service: "Analytics & Reporting Dashboard", price: "$200" },
  { service: "Cozy Hub Client Portal — track your content, deliverables & results in one place", price: "Included" },
];

const retainerItems = [
  { service: "Website Maintenance & Updates", price: "$150/mo" },
  { service: "Local SEO & Google Profile Management", price: "$200/mo" },
  { service: "Social Media Content (8 posts/month)", price: "$250/mo" },
  { service: "Ad Management (Google or Meta, ad budget separate)", price: "$200/mo" },
  { service: "Monthly Analytics Report & Strategy Call", price: "$100/mo" },
  { service: "Cozy Hub Client Portal — live access to your content, progress & reports", price: "Included" },
];

function PricingTable({ items, total, totalLabel }: { items: { service: string; price: string }[]; total: string; totalLabel: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="grid grid-cols-[1fr_auto] bg-zinc-800 px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-300">
        <span>Service</span>
        <span>Price</span>
      </div>
      {items.map((item, i) => (
        <div key={i} className={`grid grid-cols-[1fr_auto] gap-4 px-5 py-4 text-sm ${i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"} border-t border-white/[0.06]`}>
          <span className="text-zinc-300">{item.service}</span>
          <span className="text-right font-medium text-zinc-200">{item.price}</span>
        </div>
      ))}
      <div className="grid grid-cols-[1fr_auto] border-t-2 border-cyan-400/40 bg-cyan-500/[0.06] px-5 py-4">
        <span className="font-black text-white">{totalLabel}</span>
        <span className="text-right font-black text-cyan-400">{total}</span>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">Packages</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Transparent Pricing for Website &amp; Growth Services</h1>
        </div>

        {/* Option A */}
        <div className="mb-12">
          <h2 className="mb-1 text-xl font-black text-cyan-400">Option A &nbsp;|&nbsp; Full Build Package (One-Time)</h2>
          <p className="mb-6 text-sm text-zinc-400">Everything built from scratch. You own all of it when we are done. Best option to get fully set up in 90 days.</p>
          <PricingTable items={buildItems} total="$3,000" totalLabel="Full Build Total" />
          <p className="mt-3 text-xs text-zinc-500">Recommended pricing. Final quote confirmed after kickoff call.</p>
        </div>

        {/* Option B */}
        <div className="mb-12">
          <h2 className="mb-1 text-xl font-black text-cyan-400">Option B &nbsp;|&nbsp; Monthly Retainer (Ongoing Support)</h2>
          <p className="mb-6 text-sm text-zinc-400">We manage, update, and grow everything for you month to month. No long-term contract required.</p>
          <PricingTable items={retainerItems} total="$900/mo" totalLabel="Monthly Retainer Total" />
        </div>

        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-500/10 p-6 text-center">
          <p className="mb-4 text-sm text-zinc-300">Ready to get started or have questions about which option fits you?</p>
          <Link href="/cozy-booking" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-8 py-4 text-sm font-bold text-white shadow-xl hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
            Book a Free Consultation
          </Link>
          <p className="mt-3 text-xs text-zinc-500">No pressure &mdash; leave with clear next steps.</p>
        </div>
      </div>
    </main>
  );
}
