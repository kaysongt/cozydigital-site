import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Cozy Digital",
  description:
    "Answers about Cozy Digital's websites, pricing, process, and AI search (GEO) optimization that helps service businesses get found by ChatGPT, Perplexity, and Google AI.",
  alternates: { canonical: "https://www.cozydigital.org/faq/" },
};

// Plain question/answer pairs. Answers are written to be self-contained and
// quotable so answer engines can lift them directly. Every fact here is real
// (prices, deliverables, timelines). Keep answers factual when editing.
const faqs: { q: string; a: string }[] = [
  {
    q: "What is GEO (Generative Engine Optimization)?",
    a: "GEO, or Generative Engine Optimization, is the practice of making a business easy for AI answer engines to understand, trust, and cite. When someone asks ChatGPT, Perplexity, or Google AI Overviews for a recommendation, those tools pull from structured data, clear answer content, and credibility signals. GEO is the work of putting those signals in place so your business shows up in the answer, not just in a list of links.",
  },
  {
    q: "How is GEO different from SEO?",
    a: "Traditional SEO optimizes for ranking a page in a list of blue links on Google. GEO optimizes for being named inside an AI-generated answer. SEO rewards keywords and backlinks; GEO rewards machine-readable structure (schema.org data), clear question-and-answer content, consistent business details across the web, and real reviews. The two overlap, but a site can rank well on Google and still be invisible to ChatGPT. Cozy Digital builds for both.",
  },
  {
    q: "Does Cozy Digital optimize my website for AI search?",
    a: "Yes. We make your site readable and citable by AI answer engines: structured data that describes your business and services, clear answer blocks and FAQs that AI can quote, consistent name and contact details across platforms, and trust signals like real reviews and client work. This site is built the same way, so it doubles as a working example of what we deliver.",
  },
  {
    q: "How much does a website from Cozy Digital cost?",
    a: "The Full Build Package is a one-time $3,400. It includes a custom 5-page website plus a landing page, AI search (GEO) setup, a direct booking system, Google Business Profile optimization, a local SEO foundation, social branding and content templates, an automated follow-up system, an analytics dashboard, and access to the Cozy Hub client portal. You own everything when it is done, and most builds launch within 90 days.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. The Monthly Retainer is $1,000 per month and covers website maintenance and updates, AI search (GEO) monitoring, local SEO and Google Business Profile management, 8 social posts per month, ad management on Google or Meta, and a monthly analytics report with a strategy call. There is no long-term contract, so you can scale up or pause as your business needs change.",
  },
  {
    q: "What is the free audit and what do I get?",
    a: "The free first-impression audit is a 30-minute session where we screen-share your website and social profiles, point out the top friction points holding back bookings, and show what we would fix first. You leave with a clear list of next steps whether you hire us or not. It is feedback, not a sales pitch.",
  },
  {
    q: "Who does Cozy Digital work with?",
    a: "We work with service businesses, local brands, and creators who want clearer messaging, a website that converts visitors into bookings, and a steady content and follow-up system. Past work spans wellness and coaching brands, creator stats dashboards, and short-form video ads.",
  },
  {
    q: "How does the process work?",
    a: "It starts with an audit: we review your website, social presence, offers, and booking path the way a customer would, looking for friction, confusion, and missing trust signals. From there we map the build or the monthly plan, agree on clear deliverables, and execute. There are no long-term contracts and no lock-ins.",
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.cozydigital.org/faq/#faqpage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">FAQ</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Questions, answered clearly.</h1>
          <p className="mt-4 leading-relaxed text-zinc-400">
            Straight answers about pricing, process, and how we get service businesses found by AI search like ChatGPT, Perplexity, and Google AI.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 open:border-cyan-300/20 open:bg-white/[0.05]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-zinc-100 marker:hidden">
                {f.q}
                <span aria-hidden className="shrink-0 text-cyan-300 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-cyan-300/20 bg-cyan-500/10 p-6 text-center">
          <p className="mb-4 text-sm text-zinc-300">Want to be the business AI recommends?</p>
          <Link
            href="/free-audit/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-8 py-4 text-sm font-bold text-white shadow-xl hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500"
          >
            Get your free audit
          </Link>
        </div>
      </div>
    </main>
  );
}
