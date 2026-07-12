import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Cozy Digital",
  description:
    "How Cozy Digital collects, uses, and protects the information you submit through our forms.",
  alternates: { canonical: "https://www.cozydigital.org/privacy/" },
};

const sections = [
  {
    heading: "What we collect",
    body: "When you request a Digital Presence Audit, download the Free Playbook, or contact us, you may share your name, business name, email address, an optional phone number, your website or social links, and any notes about what you want to improve. We also collect basic, anonymous usage data through Google Analytics to understand how the site is used.",
  },
  {
    heading: "How we use it",
    body: "We use the information you submit only to respond to you, prepare and send your audit or requested resource, and follow up about working together. We do not sell, rent, or trade your personal information to third parties.",
  },
  {
    heading: "Where it goes",
    body: "Form submissions are sent to our internal client management system so our team can respond. Analytics data is processed by Google Analytics. These providers process data on our behalf and are not permitted to use it for their own marketing.",
  },
  {
    heading: "Marketing consent",
    body: "We do not add you to marketing lists without your action, and we do not pre-check any consent boxes. If we ever offer email updates, they will be opt-in, and you can unsubscribe at any time.",
  },
  {
    heading: "Your choices",
    body: "You can ask us to access, correct, or delete the personal information you've submitted. To make a request, reach us through the channels listed in the site footer.",
  },
  {
    heading: "Cookies & analytics",
    body: "This site uses Google Analytics, which may set cookies to measure page visits. You can block cookies in your browser settings without losing access to the site's content.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">Legal</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 leading-relaxed text-zinc-400">
            This policy explains what information Cozy Digital collects through this website and how we use it. We keep it simple: we only use what you share to help you, and we never sell it.
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
          <Link href="/free-audit/" className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-500/10 px-6 py-3 text-sm font-bold text-cyan-100 hover:bg-cyan-500/20">
            Request a Free Audit
          </Link>
          <Link href="/terms/" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-bold text-white hover:bg-white/[0.06]">
            Read our Terms
          </Link>
        </div>
      </div>
    </main>
  );
}
