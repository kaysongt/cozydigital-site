import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Search Visibility (GEO) | Cozy Digital",
  description:
    "Get your business found and recommended by AI search like ChatGPT, Perplexity, and Google AI Overviews. Cozy Digital builds the structured data, answer content, and trust signals that make answer engines cite you.",
  alternates: { canonical: "https://www.cozydigital.org/ai-search/" },
};

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

// What the GEO engagement actually delivers. Each maps to a real, checkable
// piece of work, so the page stays honest and also reads as a deliverables list.
const deliverables = [
  {
    title: "Structured data the machines can read",
    desc: "Schema.org markup that tells answer engines exactly what your business is, what you offer, and how to contact you. This is the layer most sites are missing entirely.",
  },
  {
    title: "Answer content built to be quoted",
    desc: "Clear, self-contained FAQ and answer blocks written the way AI lifts them. When a customer asks a question, your wording is what the assistant repeats.",
  },
  {
    title: "Consistent business identity",
    desc: "Matching name, services, and details across your site, Google profile, and social platforms so AI trusts that it is all the same business.",
  },
  {
    title: "Trust signals that earn the citation",
    desc: "Real reviews, client work, and credibility markers surfaced in a format answer engines weigh when deciding who to recommend.",
  },
  {
    title: "Crawler access done right",
    desc: "Robots and sitemap rules that explicitly welcome the AI crawlers behind ChatGPT, Perplexity, and Gemini instead of accidentally blocking them.",
  },
  {
    title: "A check on what AI says about you",
    desc: "We test how today's assistants describe your business, find where you are invisible or wrong, and fix the gaps.",
  },
];

export default function AiSearchPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.cozydigital.org/ai-search/#service",
    name: "AI Search Visibility (GEO)",
    serviceType: "Generative Engine Optimization",
    provider: { "@id": "https://www.cozydigital.org/#organization" },
    areaServed: { "@type": "Place", name: "United States" },
    description:
      "Generative Engine Optimization for service businesses: structured data, quotable answer content, consistent business identity, and trust signals that make AI answer engines like ChatGPT, Perplexity, and Google AI Overviews recommend you.",
    url: "https://www.cozydigital.org/ai-search/",
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-16 pb-16 md:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.15),transparent)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">AI Visibility · GEO</p>
          <h1 className="text-4xl font-black leading-[1.02] text-white md:text-6xl">
            Be the business{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">AI recommends.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Your customers are asking ChatGPT, Perplexity, and Google AI for a recommendation. We make sure your business is the answer they get back, not a competitor.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/free-audit/" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-9 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
              <span>Get a free AI visibility check</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT IS GEO — citable answer block */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <h2 className="text-2xl font-black text-white md:text-3xl">What is GEO?</h2>
            <p className="mt-4 leading-relaxed text-zinc-300">
              GEO, or Generative Engine Optimization, is the practice of making a business easy for AI answer engines to understand, trust, and cite. Where traditional SEO works to rank a page in a list of links, GEO works to get your business named inside the AI-generated answer itself.
            </p>
            <p className="mt-4 leading-relaxed text-zinc-400">
              A growing share of searches now end with an AI answer instead of ten blue links. If your site gives those engines nothing structured to read and nothing clear to quote, you simply do not appear in the recommendation, no matter how good your business is.
            </p>
          </div>
        </div>
      </section>

      {/* SEO vs GEO contrast */}
      <section className="px-6 pb-4">
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Traditional SEO</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">Optimizes to rank your page in a list of links. The customer still has to click, compare, and choose.</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/25 bg-cyan-500/[0.05] p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">GEO with Cozy Digital</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">Optimizes to get your business named inside the AI answer. The recommendation arrives already made.</p>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">What we do</p>
            <h2 className="text-3xl font-black text-white md:text-4xl">The work that gets you cited</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-colors hover:border-cyan-400/20 hover:bg-white/[0.06]">
                <h3 className="text-sm font-black leading-snug text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF / META */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-cyan-300/20 bg-cyan-500/[0.06] p-8 text-center md:p-10">
          <h2 className="text-2xl font-black text-white md:text-3xl">This site is the demo.</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-zinc-300">
            Cozydigital.org runs the same GEO setup we build for clients: structured data, quotable answers, and clean crawler access. We do not sell AI search visibility from a site that ignores it.
          </p>
          <Link href="/faq/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 transition-colors hover:text-cyan-100">
            See our own answer content <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-28 pt-4 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-black text-white md:text-5xl">Find out what AI says about you.</h2>
          <p className="mt-5 text-lg text-zinc-400">In a free check we test how today&apos;s assistants describe your business and show you where you are invisible.</p>
          <div className="mt-9 flex justify-center">
            <Link href="/free-audit/" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-10 py-4 text-base font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
              <span>Get a free AI visibility check</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
