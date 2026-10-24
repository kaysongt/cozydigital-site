import type { Metadata } from "next";
import Link from "next/link";
import { NEWSLETTER_ENDPOINT } from "@/lib/newsletter";

export const metadata: Metadata = { title: "Cozy Notes | Cozy Digital", description: "Practical ideas for better websites and AI videos, from Quincy and Kayson." };
export default function NewsletterPage() {
  return <main className="mx-auto max-w-2xl px-6 py-20">
    <p className="text-sm font-bold uppercase tracking-widest">Cozy Notes</p>
    <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">A good idea for your next project.</h1>
    <p className="mt-6 text-lg leading-relaxed">Quincy and Kayson share practical website tips, AI video examples, and what we’re learning in the studio. Occasional updates and offers. Unsubscribe whenever you like.</p>
    {NEWSLETTER_ENDPOINT ? <form action={NEWSLETTER_ENDPOINT} method="post" className="mt-10 grid gap-4">
      <input type="hidden" name="action" value="subscribe" /><input type="hidden" name="source" value="cozydigital-newsletter" />
      <label htmlFor="newsletter-name">Your name <span>(optional)</span></label><input className="rounded-lg border border-current/30 bg-transparent p-3" id="newsletter-name" name="name" autoComplete="name" maxLength={255} />
      <label htmlFor="newsletter-email">Email address</label><input className="rounded-lg border border-current/30 bg-transparent p-3" id="newsletter-email" name="email" type="email" autoComplete="email" maxLength={254} required />
      <div hidden aria-hidden="true"><label htmlFor="newsletter-url">Leave empty</label><input id="newsletter-url" name="company_url" tabIndex={-1} autoComplete="off" /></div>
      <label className="flex items-start gap-3"><input className="mt-1 h-5 w-5" type="checkbox" name="consent" value="yes" required /><span>Yes, send me Cozy Notes and occasional Cozy Digital offers.</span></label>
      <button className="rounded-lg bg-[#113e48] px-6 py-4 font-bold text-white" type="submit">Join Cozy Notes</button>
      <p className="text-sm">We’ll email a confirmation link. You’re subscribed after you confirm. <Link className="underline" href="/privacy/">Privacy policy</Link></p>
    </form> : <div className="mt-10 rounded-lg border border-current/20 p-6"><p>Email signup is being connected. You can ask to join by emailing us.</p><a className="mt-4 inline-block font-semibold underline" href="mailto:out@cozydigital.org?subject=Join%20Cozy%20Notes">Email out@cozydigital.org</a></div>}
  </main>;
}
