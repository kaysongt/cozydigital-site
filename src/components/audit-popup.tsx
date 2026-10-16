"use client";

import { HUB_LEAD_URL } from "@/lib/client-hub";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

// Pages where the audit popup must never appear:
//  - the course purchase flow, so nothing competes with the Buy button / delivery page
//  - pages that already embed the full audit form (homepage + the audit page),
//    where a popup of the same form would be redundant.
const SUPPRESSED_PREFIXES = ["/courses", "/ai-academy", "/academy-access", "/free-audit", "/"];

// Cozy Client Hub lead intake. Submissions appear in the admin CRM Leads view.

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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const suppressed = SUPPRESSED_PREFIXES.some(
    (p) => pathname === p || pathname?.startsWith(`${p}/`)
  );

  useEffect(() => {
    if (suppressed) return;
    try {
      if (sessionStorage.getItem("audit-popup-gone")) {
        setGone(true);
        return;
      }
    } catch { /* The form remains usable without browser storage. */ }
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (pct >= 0.45) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [suppressed]);

  const dismiss = useCallback(() => {
    setVisible(false);
    setGone(true);
    try {
      sessionStorage.setItem("audit-popup-gone", "1");
    } catch { /* Dismiss still works when storage is unavailable. */ }
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !visible || gone || suppressed) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [visible, gone, suppressed]);

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(dismiss, 2800);
    return () => clearTimeout(timer);
  }, [status, dismiss]);

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
    } catch {
      setStatus("error");
    }
  }

  if (gone || suppressed) return null;

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition";

  return (
    <dialog
      ref={dialogRef}
      aria-label="Free Digital Presence Audit request"
      className="audit-popup"
      onCancel={dismiss}
      onClick={event => { if (event.target === event.currentTarget) dismiss(); }}
    >
      <div className="cozy-modal-panel relative w-full mx-auto max-w-3xl rounded-3xl border border-white/10 bg-zinc-950 px-6 pb-8 pt-6 shadow-2xl shadow-black/60 md:px-10">
        {/* Close pill */}
        <button
          type="button"
          autoFocus
          onClick={dismiss}
          className="absolute right-5 top-5 flex flex-col items-center rounded-xl border border-white/15 bg-white/[0.04] px-4 py-1.5 text-center leading-tight hover:bg-white/[0.09] transition"
        >
          <span className="text-xs font-bold text-zinc-200">Close</span>
        </button>

        {status === "success" ? (
          <div className="py-10 text-center" role="status">
            <p className="text-3xl">✅</p>
            <h2 className="mt-3 text-2xl font-black text-white">Audit request sent!</h2>
            <p className="mt-2 text-sm text-zinc-400">We&apos;ll review your links and email three changes we would make first.</p>
          </div>
        ) : (
          <>
            <h2 className="max-w-sm pr-20 text-3xl font-black leading-tight text-white md:text-4xl">
              Get a free website review.
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-400">
              Share your website or social profile. We&apos;ll check the pages, content, booking, and search information, then email our recommendations.
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
                  aria-label="Your name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
                <input
                  className={inputClass}
                  type="text"
                  placeholder="Business name"
                  aria-label="Business name"
                  autoComplete="organization"
                  value={form.business}
                  onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  className={inputClass}
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
                <input
                  className={inputClass}
                  type="tel"
                  placeholder="Phone (optional)"
                  aria-label="Phone (optional)"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <input
                className={inputClass}
                type="url"
                placeholder="Website or main social link"
                aria-label="Website or main social link"
                value={form.website}
                onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
              />
              <textarea
                className={`${inputClass} min-h-[90px] resize-none`}
                placeholder="What do you most want to improve?"
                aria-label="What do you most want to improve?"
                value={form.problem}
                onChange={(e) => setForm((f) => ({ ...f, problem: e.target.value }))}
              />

              {status === "error" && (
                <p role="alert" className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs text-red-300">
                  Something went wrong. Try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="audit-submit w-full rounded-xl py-4 text-sm font-black transition-colors disabled:opacity-60"
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
    </dialog>
  );
}
