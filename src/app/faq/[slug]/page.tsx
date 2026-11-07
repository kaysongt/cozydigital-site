import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { faqQuestions, faqQuestionBySlug } from "@/data/faq-questions";

// Static export: every question page is generated at build time, and any slug
// not in the data file is a 404 rather than a runtime render.
export const dynamicParams = false;

export function generateStaticParams() {
  return faqQuestions.map((q) => ({ slug: q.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const q = faqQuestionBySlug.get(slug);
  if (!q) return {};
  return {
    title: `${q.question} | Cozy Digital FAQ`,
    description: q.description,
    alternates: { canonical: `https://cozydigital.org/faq/${q.slug}/` },
  };
}

export default async function FaqQuestionPage({ params }: Props) {
  const { slug } = await params;
  const q = faqQuestionBySlug.get(slug);
  if (!q) notFound();

  const url = `https://cozydigital.org/faq/${q.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${url}#faqpage`,
        url,
        isPartOf: { "@id": "https://cozydigital.org/faq/#faqpage" },
        publisher: { "@id": "https://cozydigital.org/#organization" },
        mainEntity: {
          "@type": "Question",
          name: q.question,
          acceptedAnswer: { "@type": "Answer", text: q.answer.join(" ") },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://cozydigital.org/" },
          { "@type": "ListItem", position: 2, name: "FAQ", item: "https://cozydigital.org/faq/" },
          { "@type": "ListItem", position: 3, name: q.question, item: url },
        ],
      },
    ],
  };

  const others = faqQuestions.filter((o) => o.slug !== q.slug);

  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-zinc-400">
          <Link href="/faq/" className="font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300">
            FAQ
          </Link>
        </nav>

        <h1 className="text-3xl font-black text-white md:text-5xl">{q.question}</h1>
        <p className="mt-4 text-sm text-zinc-400">
          Answered by <Link href="/founders/" className="text-zinc-300 underline-offset-4 hover:underline">Quincy and Kayson</Link>, founders of Cozy Digital
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-zinc-300">
          {q.answer.map((p, i) => (
            <p key={i} className={i === 0 ? "text-lg font-semibold text-zinc-100" : undefined}>
              {p}
            </p>
          ))}
        </div>

        {q.sections?.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="text-2xl font-black text-white">{s.heading}</h2>
            <div className="mt-4 space-y-5 text-base leading-relaxed text-zinc-300">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-12 rounded-2xl border border-cyan-300/20 bg-cyan-500/10 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">How we can help</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">{q.related.blurb}</p>
          <Link
            href={q.related.href}
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-6 py-3 text-sm font-bold text-white shadow-xl hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500"
          >
            {q.related.label}
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="text-lg font-black text-white">More questions</h2>
          <ul className="mt-4 space-y-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/faq/${o.slug}/`} className="text-sm text-zinc-400 transition-colors hover:text-cyan-300">
                  {o.question}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/faq/" className="mt-6 inline-block text-sm font-bold text-cyan-300 hover:text-cyan-100">
            All FAQs
          </Link>
        </section>
      </article>
    </main>
  );
}
