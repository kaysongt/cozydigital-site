import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Cozy Digital",
  description:
    "The terms that govern your use of the Cozy Digital website and the free resources offered on it.",
  alternates: { canonical: "https://cozydigital.org/terms/" },
};

const sections = [
  {
    heading: "Using this site",
    body: "This website is provided for general information about Cozy Digital's services. By using it, you agree to use it lawfully and not to misuse the forms, content, or resources provided here.",
  },
  {
    heading: "The free audit & resources",
    body: "The Digital Presence Audit and other free resources are offered as helpful guidance. They reflect our professional recommendations based on the information you provide. They are not a guarantee of any specific search ranking, booking volume, revenue, or AI recommendation.",
  },
  {
    heading: "Services & pricing",
    body: "Deliverables described on this site are starting points, not fixed packages. Final scope and pricing are confirmed in writing before a project begins. Nothing on this site is a binding offer or contract on its own.",
  },
  {
    heading: "Your content",
    body: "When you share links, business details, or materials with us, you confirm you have the right to do so. You keep ownership of your content, and completed client deliverables are owned by the client as agreed in each engagement.",
  },
  {
    heading: "Intellectual property",
    body: "The Cozy Digital name, logo, site copy, and design are our property. Client work and screenshots are shown with the relevant business's brand and remain the property of their respective owners.",
  },
  {
    heading: "Changes",
    body: "We may update these terms or the site's content from time to time. Continued use of the site after changes means you accept the updated terms.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">Legal</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Terms of Use</h1>
          <p className="mt-4 leading-relaxed text-zinc-400">
            These terms cover how you can use this website and the free resources on it. Specific client projects are governed by the separate agreement we sign with each client.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((s) => (
            <section key={s.heading} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-lg font-black text-white">{s.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/free-audit/#audit-form" className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-500/10 px-6 py-3 text-sm font-bold text-cyan-100 hover:bg-cyan-500/20">
            Request a Free Audit
          </Link>
          <Link href="/privacy/" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-bold text-white hover:bg-white/[0.06]">
            Read our Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
