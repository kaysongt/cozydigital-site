"use client";

import { useState } from "react";
import Link from "next/link";

// ─── SETUP ───────────────────────────────────────────────────────────────────
// 1. Create a free account at https://app.convertkit.com
// 2. Go to Grow → Landing Pages & Forms → Create Form → Inline
// 3. From the form settings, copy your Form ID (in the URL or embed code)
// 4. Create a .env.local file with:
//      NEXT_PUBLIC_KIT_FORM_ID=your_form_id_here
//      NEXT_PUBLIC_KIT_API_KEY=your_public_api_key_here   (found in Account → Settings → Developer)
// 5. In Kit, set up an "Incentive" email that delivers the playbook link
//    OR tag subscribers and send a sequence automatically
// ─────────────────────────────────────────────────────────────────────────────

const KIT_FORM_ID = process.env.NEXT_PUBLIC_KIT_FORM_ID ?? "";
const KIT_API_KEY = process.env.NEXT_PUBLIC_KIT_API_KEY ?? "";

const playbookPoints = [
  { icon: "📋", label: "Brand positioning framework", desc: "How to describe what you do in one sentence that makes people want to book." },
  { icon: "🎯", label: "Booking-ready page checklist", desc: "The exact elements every page needs before you spend another dollar on ads." },
  { icon: "💬", label: "CTA scripts that convert", desc: "Word-for-word button copy, captions, and DM replies that move people to act." },
  { icon: "📱", label: "Content-to-booking system", desc: "A repeatable rhythm that turns social posts into real booked appointments." },
  { icon: "⚡", label: "30-minute quick wins", desc: "Five changes you can make today that will visibly move the needle this week." },
];

export default function FreePlaybookPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!KIT_FORM_ID || !KIT_API_KEY) {
      // Fallback: direct download if Kit isn't configured yet
      window.location.href = "/free-playbook/thank-you/?direct=1";
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: KIT_API_KEY,
            first_name: firstName,
            email,
            tags: ["playbook-download"],
          }),
        }
      );
      if (!res.ok) throw new Error("Subscription failed");
      setStatus("success");
      setTimeout(() => {
        window.location.href = "/free-playbook/thank-you/";
      }, 800);
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again or email us directly.");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-5xl">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300">
            Free Download
          </span>
          <h1 className="mt-4 text-5xl font-black leading-tight text-white md:text-6xl">
            The Booking-Ready<br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">Brand Playbook.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-zinc-400">
            The exact framework Cozy Digital uses to turn service brand websites and social profiles into consistent booking machines. Free. No fluff.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">

          {/* What's inside */}
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-zinc-500">What&apos;s inside</p>
            <div className="space-y-4">
              {playbookPoints.map((p) => (
                <div key={p.label} className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <p className="font-black text-white">{p.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-500/[0.06] p-5 text-sm leading-relaxed text-zinc-300">
              <span className="font-bold text-cyan-300">Who this is for:</span> Service business owners, creators, and local brands who are already posting and showing up — but not converting that attention into booked clients.
            </div>
          </div>

          {/* Form */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-cyan-400">Instant access</p>
              <h2 className="mb-2 text-2xl font-black text-white">Get the free playbook</h2>
              <p className="mb-6 text-sm text-zinc-400">Delivered to your inbox immediately. No spam — ever.</p>

              {status === "success" ? (
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-center">
                  <p className="text-2xl">✅</p>
                  <p className="mt-2 font-black text-white">You&apos;re in!</p>
                  <p className="mt-1 text-sm text-zinc-400">Redirecting to your download…</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-400" htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      placeholder="Your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-400" htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="you@yourbusiness.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
                    />
                  </div>
                  {status === "error" && (
                    <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs text-red-300">{errorMsg}</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 py-4 text-sm font-black text-white shadow-xl shadow-cyan-900/25 transition-all hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500 disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending…" : "Send Me The Playbook →"}
                  </button>
                  <p className="text-center text-xs text-zinc-600">No spam. Unsubscribe any time.</p>
                </form>
              )}
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-zinc-600">Already booked a call?{" "}
                <Link href="/cozy-booking/" className="text-cyan-500 hover:text-cyan-300">Schedule here →</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
