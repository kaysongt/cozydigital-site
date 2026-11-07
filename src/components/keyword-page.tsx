import Link from "next/link";
import type { Metadata } from "next";
import type { KeywordPage } from "@/data/keyword-pages";

const baseUrl = "https://cozydigital.org";

export function keywordPageMetadata(page: KeywordPage, path: string): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${baseUrl}${path}` },
  };
}

// Shared template for /services/<slug>/ and /websites-for/<slug>/. Every field
// comes from src/data/keyword-pages.ts, so adding a page is a data change.
export default function KeywordPageView({
  page,
  path,
  parent,
}: {
  page: KeywordPage;
  path: string;
  parent: { name: string; href: string };
}) {
  const url = `${baseUrl}${path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.h1,
        serviceType: page.keyword,
        description: page.intro,
        provider: { "@id": `${baseUrl}/#organization` },
        areaServed: { "@type": "Place", name: "United States" },
        url,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faqpage`,
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: parent.name, item: `${baseUrl}${parent.href}` },
          { "@type": "ListItem", position: 3, name: page.h1, item: url },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs">
          <Link href={parent.href} className="font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300">
            {page.eyebrow}
          </Link>
        </nav>

        <h1 className="text-3xl font-black text-white md:text-5xl">{page.h1}</h1>
        <p className="mt-6 text-lg font-semibold leading-relaxed text-zinc-100">{page.intro}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/free-audit/#audit-form"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-6 py-3 text-sm font-bold text-white shadow-xl hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500"
          >
            Get a free audit
          </Link>
          <Link
            href="/cozy-booking/"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/[0.06]"
          >
            Book a 30-min call
          </Link>
        </div>

        {page.sections.map((s) => (
          <section key={s.heading} className="mt-12">
            <h2 className="text-2xl font-black text-white">{s.heading}</h2>
            <div className="mt-4 space-y-5 text-base leading-relaxed text-zinc-300">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        {page.proof && (
          <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">Client work</p>
            <h2 className="mt-2 text-lg font-black text-white">{page.proof.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{page.proof.detail}</p>
            <Link href={page.proof.href} className="mt-4 inline-block text-sm font-bold text-cyan-300 hover:text-cyan-100">
              See the work
            </Link>
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-2xl font-black text-white">Questions</h2>
          <div className="mt-4 space-y-3">
            {page.faqs.map((f) => (
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
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-black text-white">Related</h2>
          <ul className="mt-4 space-y-2">
            {page.related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="text-sm text-zinc-400 transition-colors hover:text-cyan-300">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
