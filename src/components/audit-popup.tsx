"use client";

import { useState, useEffect, useCallback } from "react";

const KIT_FORM_ID = process.env.NEXT_PUBLIC_KIT_AUDIT_FORM_ID ?? "";
const KIT_API_KEY = process.env.NEXT_PUBLIC_KIT_API_KEY ?? "";

type Status = "idle" | "loading" | "success" | "error";

export default function AuditPopup() {
  const [visible, setVisible] = useState(false);
  const [gone, setGone] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "", business: "", email: "", phone: "", website: "", problem: "",
  });

  useEffect(() => {
    if (sessionStorage.getItem("audit-popup-gone")) {
      setGone(true);
      return;
    }
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (pct >= 0.45) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setGone(true);
      sessionStorage.setItem("audit-popup-gone", "1");
    }, 350);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      if (KIT_FORM_ID && KIT_API_KEY) {
        const res = await fetch(
          `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              api_key: KIT_API_KEY,
              first_name: form.name,
              email: form.email,
              tags: ["audit-request"],
              fields: {
                business: form.business,
                phone: form.phone,
                website: form.website,
                problem: form.problem,
              },
            }),
          }
        );
        if (!res.ok) throw new Error();
      }
      setStatus("success");
      setTimeout(() => dismiss(), 2800);
    } catch {
      setStatus("error");
    }
  }

  if (gone) return null;

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition";

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-label="Free growth audit request"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-[360ms] ease-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={dismiss}
        aria-hidden="true"
      />

      <div className="relative w-full mx-auto max-w-3xl rounded-3xl border border-white/10 bg-zinc-950 px-6 pb-8 pt-6 shadow-2xl shadow-black/60 md:px-10">
        {/* Close pill */}
        <button
          onClick={dismiss}
          className="absolute right-5 top-5 flex flex-col items-center rounded-xl border border-white/15 bg-white/[0.04] px-4 py-1.5 text-center leading-tight hover:bg-white/[0.09] transition"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-400">No pressure</span>
          <span className="text-xs font-bold text-zinc-200">Close it anytime</span>
        </button>

        {status === "success" ? (
          <div className="py-10 text-center">
            <p className="text-3xl">✅</p>
            <h2 className="mt-3 text-2xl font-black text-white">Audit request sent!</h2>
            <p className="mt-2 text-sm text-zinc-400">We&apos;ll send back your 3-point review shortly. Closing in a moment…</p>
          </div>
        ) : (
          <>
            <h2 className="max-w-xs text-3xl font-black leading-tight text-white md:text-4xl">
              Want a free growth audit?
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-400">
              Drop your details and we&apos;ll send back a clear 3-point review of your website, content, and booking path — styled to match the Cozy Digital brand.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  className={inputClass}
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
                <input
                  className={inputClass}
                  type="text"
                  placeholder="Business name"
                  value={form.business}
                  onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  className={inputClass}
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
                <input
                  className={inputClass}
                  type="tel"
                  placeholder="Phone for follow-up"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <input
                className={inputClass}
                type="url"
                placeholder="Website or main social link"
                value={form.website}
                onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
              />
              <textarea
                className={`${inputClass} min-h-[90px] resize-none`}
                placeholder="What growth or conversion problem do you want help with?"
                value={form.problem}
                onChange={(e) => setForm((f) => ({ ...f, problem: e.target.value }))}
              />

              {status === "error" && (
                <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs text-red-300">
                  Something went wrong — try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 py-4 text-sm font-black text-white shadow-xl shadow-cyan-900/25 transition-all hover:from-cyan-300 hover:via-blue-400 hover:to-fuchsia-400 disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Request Free Growth Audit →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
