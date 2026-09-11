import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Search Visibility (GEO) | Cozy Digital",
  description:
    "Cozy Digital reviews your business information, website structure, and crawler access, then checks how search engines and AI assistants describe your services.",
  alternates: { canonical: "https://cozydigital.org/ai-search/" },
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
    title: "Structured business data",
    desc: "Schema.org markup for your business, services, and contact details, checked against the information on your pages.",
  },
  {
    title: "Answers to customer questions",
    desc: "Service descriptions and FAQs that explain what you do, who you work with, and how to get started.",
  },
  {
    title: "Consistent business identity",
    desc: "Matching names, services, and contact details across your website, Google profile, and social platforms.",
  },
  {
    title: "Reviews and work examples",
    desc: "Your customer reviews, completed projects, and team information placed where visitors can find them.",
  },
  {
    title: "Crawler and sitemap checks",
    desc: "We review robots rules, indexing settings, and your sitemap for anything that could prevent search tools from reading public pages.",
  },
  {
    title: "A check on what AI says about you",
    desc: "We record how assistants describe your business, flag missing or incorrect details, and identify information we can improve on your site.",
  },
];

export default function AiSearchPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://cozydigital.org/ai-search/#service",
    name: "AI Search Visibility (GEO)",
    serviceType: "Generative Engine Optimization",
    provider: { "@id": "https://cozydigital.org/#organization" },
    areaServed: { "@type": "Place", name: "United States" },
    description:
      "Search visibility work for service businesses, including structured data, service descriptions, consistent business details, crawler access, and checks of how AI assistants describe the business.",
    url: "https://cozydigital.org/ai-search/",
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
            Help search tools{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">understand your business.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            We check what your website says about your business and how search tools interpret it. Then we improve the pages, listings, and technical details that need attention.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/free-audit/#audit-form" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-9 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
              <span>Get a Free Digital Presence Audit</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT IS GEO: citable answer block */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <h2 className="text-2xl font-black text-white md:text-3xl">What is GEO?</h2>
            <p className="mt-4 leading-relaxed text-zinc-300">
              GEO stands for Generative Engine Optimization. It describes work intended to help AI search tools understand and reference a business. Much of that work overlaps with maintaining a useful, accessible website: accurate information, descriptive pages, and visible examples of your work.
            </p>
            <p className="mt-4 leading-relaxed text-zinc-400">
              We can improve the information your business publishes and check how it appears in search. Search providers decide which sources to include, so a particular ranking, mention, or recommendation cannot be guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* SEO vs GEO contrast */}
      <section className="px-6 pb-4">
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Traditional SEO</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">Reviews the content and technical details that help search engines discover and index your pages.</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/25 bg-cyan-500/[0.05] p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">GEO with Cozy Digital</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">Also checks how AI assistants describe your services and whether your published information needs updating.</p>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">What we do</p>
            <h2 className="text-3xl font-black text-white md:text-4xl">What we review and update</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-colors hover:border-cyan-400/20 hover:bg-white/[0.06]">
                <h3 className="text-sm font-black leading-snug text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF / META */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-cyan-300/20 bg-cyan-500/[0.06] p-8 text-center md:p-10">
          <h2 className="text-2xl font-black text-white md:text-3xl">See the details on our own site.</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-zinc-300">
            Our site includes service descriptions, founder profiles, client work, FAQs, and structured data. These are the same kinds of details we review with clients.
          </p>
          <Link href="/faq/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 transition-colors hover:text-cyan-100">
            Read our FAQs <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-28 pt-4 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-black text-white md:text-5xl">Find out what AI says about you.</h2>
          <p className="mt-5 text-lg text-zinc-400">Your free Digital Presence Audit includes a check of how today&apos;s assistants describe your business and where you&apos;re hard to find.</p>
          <div className="mt-9 flex justify-center">
            <Link href="/free-audit/#audit-form" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-10 py-4 text-base font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
              <span>Get a Free Digital Presence Audit</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
