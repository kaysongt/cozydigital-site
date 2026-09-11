import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Cozy Digital",
  description:
    "Questions about website projects, AI video production, pricing, timelines, and working with Quincy and Kayson at Cozy Digital.",
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
    a: "It is a free review of your website or social profile. We send back three changes we would make first, with an explanation of what each change would address.",
  },
  {
    q: "What does Cozy Digital review in the audit?",
    a: "We check your service descriptions, reviews, past work, content, booking or inquiry form, and business information in search. We use the site as a new visitor would and note anything missing or difficult to use.",
  },
  {
    q: "Is the audit really free?",
    a: "Yes. There is no charge or requirement to hire us. You can use the recommendations yourself or share them with the person who maintains your site.",
  },
  {
    q: "Do I need a new website?",
    a: "Not necessarily. In many cases we improve the site you already have rather than starting over. The audit helps determine whether small fixes, a rebuild, or something in between makes the most sense for your business.",
  },
  {
    q: "Can Cozy Digital improve my existing website?",
    a: "Yes. We can update page copy, redesign sections, repair forms, improve booking, and review search information on an existing site. We check the platform and access first, then agree on the changes with you.",
  },
  {
    q: "Do you also handle content and social media?",
    a: "Yes. We prepare content ideas, captions, email copy, video, and reusable templates around your services and offers. The channels, number of pieces, and publishing schedule are agreed in your scope.",
  },
  {
    q: "What is AI visibility?",
    a: "We review how AI search tools describe your business, then improve the information on your website and profiles where needed. That can include service pages, FAQs, structured data, and crawler access. Search providers decide what appears in their answers, so mentions and rankings are not guaranteed.",
  },
  {
    q: "How long does a typical project take?",
    a: "The timeline depends on the pages, video deliverables, integrations, and content involved. We agree on milestones before starting and let you know when we need feedback or materials to keep the project moving.",
  },
  {
    q: "Will I be locked into a long-term contract?",
    a: "No. Project work is a defined scope with a clear end, and you own what we build when it's done. Ongoing support runs month to month with no long-term contract, so you can scale up or pause as your needs change.",
  },
  {
    q: "What happens after I request an audit?",
    a: "Quincy and Kayson receive your request, review the links, and email the recommendations. You can book a call afterward if you want to discuss them.",
  },
  {
    q: "How much does working with Cozy Digital cost?",
    a: "Current plans, credit packs, and request costs are listed in the Cozy Digital Client Hub. For a custom project, we confirm the deliverables and price with you in writing before work begins.",
  },
  {
    q: "Where do I find your plans and my account?",
    a: "Open the Cozy Digital Client Hub from the header or footer. You can review plans, create an account, buy credits, and manage requests there. Existing clients use the same sign-in to view their work and progress.",
  },
  {
    q: "Do you produce AI video?",
    a: "Yes. AI video production is one of our two main services, alongside website design. We plan the concept, direct the generated scenes, and edit the video with sound, captions, and your brand details. Examples are in the video showcase on our homepage.",
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
          <h1 className="text-4xl font-black text-white md:text-5xl">Before we start.</h1>
          <p className="mt-4 leading-relaxed text-zinc-400">
            Project scope, payment, timelines, and what it is like to work with us.
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
