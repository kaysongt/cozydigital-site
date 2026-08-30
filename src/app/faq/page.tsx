import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Cozy Digital",
  description:
    "Answers about Cozy Digital's websites, video and content work, process, and AI search (GEO) optimization that helps service businesses get found by ChatGPT, Perplexity, and Google AI.",
  alternates: { canonical: "https://cozydigital.org/faq/" },
};

// Plain question/answer pairs. Answers are written to be self-contained and
// quotable so answer engines can lift them directly. Every fact here is real.
// Deliberately absent: amounts, turnaround promises, and guarantees. Plan
// details live in the Client Hub, and quoting a number here is how the site
// ends up contradicting it. Keep answers factual when editing.
const faqs: { q: string; a: string }[] = [
  {
    q: "What is a Digital Presence Audit?",
    a: "A Digital Presence Audit is a free review of how your business shows up online. We look at your website, messaging, trust signals, content, booking path, and search visibility, then identify the first three improvements we would make. You get clear, practical recommendations whether or not you hire us.",
  },
  {
    q: "What does Cozy Digital review in the audit?",
    a: "We review your website and landing pages, your homepage messaging and calls to action, the trust signals a first-time visitor sees, your content and social direction, your booking or inquiry path, and how easily search engines and AI assistants can understand your business.",
  },
  {
    q: "Is the audit really free?",
    a: "Yes. The Digital Presence Audit is free and there is no obligation. You receive your top three improvements and next steps regardless of whether you decide to work with us. It is feedback, not a sales pitch.",
  },
  {
    q: "Do I need a new website?",
    a: "Not necessarily. In many cases we improve the site you already have rather than starting over. The audit helps determine whether small fixes, a rebuild, or something in between makes the most sense for your business.",
  },
  {
    q: "Can Cozy Digital improve my existing website?",
    a: "Yes. We regularly improve existing websites: clarifying messaging, strengthening calls to action, tightening the booking path, and adding the structure and trust signals that help with search and AI visibility, without forcing a full rebuild when it isn't needed.",
  },
  {
    q: "Do you also handle content and social media?",
    a: "Yes. Content direction, reusable templates, and a posting rhythm that supports your actual offers are part of the digital-presence system, alongside your website, booking paths, and follow-up. It's all meant to work together.",
  },
  {
    q: "What is AI visibility?",
    a: "AI visibility is the work of strengthening the information, structure, and trust signals that improve your business's ability to appear in search results and AI-generated recommendations from tools like ChatGPT, Perplexity, and Google AI Overviews. It uses machine-readable schema.org data, clear answer content, consistent business details, and real credibility signals. It's one important part of your overall digital presence, not the whole thing.",
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on the scope and on how quickly we can get content and decisions back from you. A single landing page moves fast; a full site with booking and follow-up wired in takes longer. We agree the timeline with you after the audit and kickoff, before any work starts.",
  },
  {
    q: "Will I be locked into a long-term contract?",
    a: "No. Project work is a defined scope with a clear end, and you own what we build when it's done. Ongoing support runs month to month with no long-term contract, so you can scale up or pause as your needs change.",
  },
  {
    q: "What happens after I request an audit?",
    a: "Your request goes straight to our team. We review your website and links, then send back your top three improvements and the biggest trust or conversion gaps. If you'd like to talk it through, you can book an optional strategy call afterward, but it isn't required.",
  },
  {
    q: "How much does working with Cozy Digital cost?",
    a: "It depends on what you actually need, so there is no single number to quote here. Current plans and what each one includes live in the Cozy Digital Client Hub, and we confirm scope and price with you in writing before any work begins. If you are not sure what you need yet, the free audit is the place to start.",
  },
  {
    q: "Where do I find your plans and my account?",
    a: "Both live in the Cozy Digital Client Hub. Anyone can look through the plans there, and businesses already working with us sign in to the same place to see their content, progress, and reports. There is a Client Hub link in the site header and in the footer of every page.",
  },
  {
    q: "Do you make video?",
    a: "Yes. We produce short-form vertical video for Reels, Shorts, and paid placements: the hook, the cuts, the captions, and the on-brand look. We use AI tools where they genuinely save time and edit the rest by hand. There is an example ad on our homepage under the client work section.",
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://cozydigital.org/faq/#faqpage",
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
            Straight answers about the free audit, how projects actually run, and how we help service businesses build a stronger digital presence, from their website and video to search and AI visibility.
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
          <p className="mb-4 text-sm text-zinc-300">Want to see what to improve first?</p>
          <Link
            href="/free-audit/#audit-form"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-8 py-4 text-sm font-bold text-white shadow-xl hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500"
          >
            Get a Free Digital Presence Audit
          </Link>
        </div>
      </div>
    </main>
  );
}
