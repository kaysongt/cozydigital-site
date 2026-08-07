"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

// Pages where the audit popup must never appear:
//  - the course purchase flow, so nothing competes with the Buy button / delivery page
//  - pages that already embed the full audit form (homepage + the audit page),
//    where a popup of the same form would be redundant.
const SUPPRESSED_PREFIXES = ["/ai-academy", "/academy-access", "/free-audit", "/"];

// Cozy Client Hub lead intake. Submissions appear in the admin CRM Leads view.
const HUB_LEAD_URL =
  "https://cozy-client-hub-production.up.railway.app/api/webhook/lead";
const HUB_WEBHOOK_SECRET = process.env.NEXT_PUBLIC_HUB_WEBHOOK_SECRET ?? "";

type Status = "idle" | "loading" | "success" | "error";

export default function AuditPopup() {
  const [visible, setVisible] = useState(false);
  const [gone, setGone] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "", business: "", email: "", phone: "", website: "", problem: "",
  });
  // Honeypot: hidden field; only bots fill it.
  const hpRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const suppressed = SUPPRESSED_PREFIXES.some(
    (p) => pathname === p || pathname?.startsWith(`${p}/`)
  );

  useEffect(() => {
    if (suppressed) return;
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
  }, [suppressed]);

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
      const res = await fetch(HUB_LEAD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(HUB_WEBHOOK_SECRET ? { "x-webhook-secret": HUB_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify({
          leadSource: "Digital Presence Audit Popup",
          name: form.name,
          email: form.email,
          phone: form.phone,
          businessName: form.business,
          website: form.website,
          notes: form.problem,
          hp: hpRef.current?.value ?? "",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setTimeout(() => dismiss(), 2800);
    } catch {
      setStatus("error");
    }
  }

  if (gone || suppressed) return null;

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition";

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-label="Free Digital Presence Audit request"
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

      <div className="cozy-modal-panel relative w-full mx-auto max-w-3xl rounded-3xl border border-white/10 bg-zinc-950 px-6 pb-8 pt-6 shadow-2xl shadow-black/60 md:px-10">
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
            <p className="mt-2 text-sm text-zinc-400">We&apos;ll review your presence and send back your first three improvements. Closing in a moment…</p>
          </div>
        ) : (
          <>
            <h2 className="max-w-sm text-3xl font-black leading-tight text-white md:text-4xl">
              Want a free Digital Presence Audit?
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-400">
              Drop your details and we&apos;ll review your website, messaging, content, booking path, and search visibility, then send back the first three improvements we&apos;d make.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              {/* Honeypot: hidden from humans, catches bots. */}
              <input
                ref={hpRef}
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />
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
                  placeholder="Phone (optional)"
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
                placeholder="What do you most want to improve?"
                value={form.problem}
                onChange={(e) => setForm((f) => ({ ...f, problem: e.target.value }))}
              />

              {status === "error" && (
                <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs text-red-300">
                  Something went wrong. Try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 py-4 text-sm font-black text-white shadow-xl shadow-cyan-900/25 transition-all hover:from-cyan-300 hover:via-blue-400 hover:to-fuchsia-400 disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Request My Free Audit →"}
              </button>
              <p className="text-center text-[11px] leading-relaxed text-zinc-500">
                We use your details only to prepare and send your audit.{" "}
                <a href="/privacy/" className="underline underline-offset-2 hover:text-zinc-300">Privacy Policy</a>.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
