"use client";

import { useState } from "react";

const CRM_API_URL = "https://shadowcrm-ekcrkbu5.manus.space/api/trpc/leads.capture";
const PDF_URL     = "https://shadowcrm-ekcrkbu5.manus.space/downloads/playbook.pdf";
const CALENDLY    = "https://calendly.com/cozydigital-out/30min";
const TOTAL       = 6;

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  howGettingClients: string;
  onlinePresenceSatisfaction: string;
  leadsPerMonth: string;
};

const choices = {
  czQ1: [
    "Referrals / word of mouth",
    "Social media (organic)",
    "Paid ads",
    "Networking / events",
    "Not sure / not consistently",
  ],
  czQ2: [
    "Very unsatisfied — it's hurting us",
    "Not great — we need a real upgrade",
    "Okay, but it could be much better",
    "Pretty good, just needs fine-tuning",
  ],
  czQ3: ["0 – 5", "6 – 15", "16 – 30", "30+"],
};

export default function FreePlaybookPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", company: "",
    howGettingClients: "", onlinePresenceSatisfaction: "", leadsPerMonth: "",
  });

  const pct = Math.round(((step - 1) / TOTAL) * 100);

  function set(key: keyof FormData, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function next() {
    if (step === 1 && !form.name.trim()) {
      setErrors({ name: "Please enter your name." }); return;
    }
    if (step === 2) {
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setErrors({ email: "Please enter a valid email." }); return;
      }
    }
    if (step === TOTAL) { submit(); return; }
    setStep((s) => s + 1);
  }

  async function submit() {
    setSending(true);
    try {
      await fetch(CRM_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "0": { json: {
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          company: form.company || undefined,
          howGettingClients: form.howGettingClients,
          onlinePresenceSatisfaction: form.onlinePresenceSatisfaction,
          leadsPerMonth: form.leadsPerMonth,
        }}}),
      });
    } catch (_) { /* still show thank-you */ }
    setSending(false);
    setDone(true);
    setTimeout(() => window.open(PDF_URL, "_blank"), 600);
  }

  const inputClass =
    "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 transition";

  const choiceClass = (selected: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition cursor-pointer ${
      selected
        ? "border-zinc-900 bg-zinc-900 text-white"
        : "border-zinc-200 bg-zinc-50 text-zinc-900 hover:border-zinc-900 hover:bg-zinc-100"
    }`;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16">
      <div className="mx-auto max-w-3xl text-center mb-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-400">Free Resource</p>
        <h1 className="text-4xl font-black text-white md:text-5xl">Get the Booking-Ready Brand Playbook</h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          Answer a few quick questions and we&apos;ll send you the playbook instantly — then you can book a free 30-min strategy call.
        </p>
      </div>

      <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        {done ? (
          <div className="text-center py-6">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-3xl">🎉</div>
            <h2 className="text-2xl font-bold text-zinc-900">You&apos;re all set!</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Your free <strong>Booking-Ready Brand Playbook</strong> is ready.<br />
              Then grab a spot — the strategy call is free.
            </p>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-xl bg-zinc-900 px-8 py-3 text-sm font-bold text-white hover:bg-zinc-700 transition"
            >
              Download the Playbook
            </a>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-sm text-zinc-500 underline hover:text-zinc-800"
            >
              Book your free 30-min strategy call →
            </a>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Step {step} of {TOTAL}
            </p>

            {/* Step 1 */}
            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold text-zinc-900">What&apos;s your name?</h2>
                <p className="mt-1 mb-5 text-sm text-zinc-500">Let&apos;s get acquainted.</p>
                <input className={inputClass} type="text" placeholder="Jane Smith" value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && next()} />
                {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold text-zinc-900">How can we reach you?</h2>
                <p className="mt-1 mb-5 text-sm text-zinc-500">We&apos;ll send the playbook here.</p>
                <input className={inputClass} type="email" placeholder="jane@yourcompany.com" value={form.email}
                  onChange={(e) => set("email", e.target.value)} />
                <input className={`${inputClass} mt-3`} type="tel" placeholder="Phone (optional)" value={form.phone}
                  onChange={(e) => set("phone", e.target.value)} />
                {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
              </>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <>
                <h2 className="text-2xl font-bold text-zinc-900">What&apos;s your business called?</h2>
                <p className="mt-1 mb-5 text-sm text-zinc-500">Optional — helps us tailor the call.</p>
                <input className={inputClass} type="text" placeholder="Your Business LLC" value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && next()} />
              </>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <>
                <h2 className="text-2xl font-bold text-zinc-900">How are you currently getting new clients?</h2>
                <p className="mt-1 mb-5 text-sm text-zinc-500">Pick the one that fits best.</p>
                <div className="flex flex-col gap-2">
                  {choices.czQ1.map((c) => (
                    <button key={c} className={choiceClass(form.howGettingClients === c)}
                      onClick={() => set("howGettingClients", c)}>{c}</button>
                  ))}
                </div>
              </>
            )}

            {/* Step 5 */}
            {step === 5 && (
              <>
                <h2 className="text-2xl font-bold text-zinc-900">How happy are you with your current online presence?</h2>
                <p className="mt-1 mb-5 text-sm text-zinc-500">Be honest — that&apos;s what the call is for.</p>
                <div className="flex flex-col gap-2">
                  {choices.czQ2.map((c) => (
                    <button key={c} className={choiceClass(form.onlinePresenceSatisfaction === c)}
                      onClick={() => set("onlinePresenceSatisfaction", c)}>{c}</button>
                  ))}
                </div>
              </>
            )}

            {/* Step 6 */}
            {step === 6 && (
              <>
                <h2 className="text-2xl font-bold text-zinc-900">How many inbound leads per month right now?</h2>
                <p className="mt-1 mb-5 text-sm text-zinc-500">Ballpark is fine.</p>
                <div className="flex flex-col gap-2">
                  {choices.czQ3.map((c) => (
                    <button key={c} className={choiceClass(form.leadsPerMonth === c)}
                      onClick={() => set("leadsPerMonth", c)}>{c}</button>
                  ))}
                </div>
              </>
            )}

            {/* Nav */}
            <div className="mt-6 flex items-center justify-between gap-3">
              {step > 1 ? (
                <button onClick={() => setStep((s) => s - 1)}
                  className="px-4 py-3 text-sm text-zinc-400 hover:text-zinc-900 transition">
                  ← Back
                </button>
              ) : <span />}
              <button
                onClick={next}
                disabled={
                  sending ||
                  (step === 4 && !form.howGettingClients) ||
                  (step === 5 && !form.onlinePresenceSatisfaction) ||
                  (step === 6 && !form.leadsPerMonth)
                }
                className="flex-1 rounded-xl bg-zinc-900 py-3 text-sm font-bold text-white hover:bg-zinc-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {sending ? "Sending…" : step === TOTAL ? "Get the Playbook →" : "Continue →"}
              </button>
            </div>
          </>
        )}
        <p className="mt-5 text-center text-xs text-zinc-300">We respect your privacy. No spam, ever.</p>
      </div>
    </main>
  );
}
