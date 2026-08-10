"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { formatAttribution, readAttribution } from "@/components/attribution";
import { trackMetaLead } from "@/components/meta-pixel";

// Cozy Client Hub lead intake. Submissions appear in the admin CRM Leads view.
// Shared by the homepage, the /free-audit page, and the scroll popup so every
// "Free Digital Presence Audit" entry point sends the same, consistent lead.
const HUB_LEAD_URL =
  "https://cozy-client-hub-production.up.railway.app/api/webhook/lead";
const HUB_WEBHOOK_SECRET = process.env.NEXT_PUBLIC_HUB_WEBHOOK_SECRET ?? "";
const CALENDLY = "https://calendly.com/cozydigital-out/30min";

type Status = "idle" | "loading" | "success" | "error";

export default function AuditForm({
  leadSource = "Digital Presence Audit",
  className = "",
}: {
  leadSource?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    website: "",
    improve: "",
  });
  // Honeypot: hidden field; only bots fill it.
  const hpRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    // How this visit started, captured on landing by <AttributionCapture />.
    const attribution = readAttribution();
    const attributionText = formatAttribution(attribution);
    // The hub's leadSource column is varchar(100), so it carries only the
    // low-cardinality channel (facebook, google, …) and stays groupable in the
    // CRM. The full campaign detail rides along in notes, which is TEXT.
    const channel =
      attribution.utm_source ?? (attribution.fbclid ? "meta" : undefined);
    const taggedSource = (
      channel ? `${leadSource} · ${channel}` : leadSource
    ).slice(0, 100);
    const notes = [
      form.improve ? `Wants to improve: ${form.improve}` : "",
      attributionText ? `Attribution: ${attributionText}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch(HUB_LEAD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(HUB_WEBHOOK_SECRET ? { "x-webhook-secret": HUB_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify({
          leadSource: taggedSource,
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          businessName: form.business || undefined,
          website: form.website || undefined,
          notes: notes || undefined,
          hp: hpRef.current?.value ?? "",
        }),
      });
      if (!res.ok) throw new Error();
      // Only a genuinely saved lead counts as a conversion.
      trackMetaLead();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30";
  const labelClass = "mb-1.5 block text-xs font-bold text-zinc-300";

  if (status === "success") {
    return (
      <div
        className={`rounded-3xl border border-cyan-300/25 bg-cyan-500/[0.06] p-8 text-center ${className}`}
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/15 text-3xl">
          ✅
        </div>
        <h3 className="text-2xl font-black text-white">Your audit request is in.</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-300">
          We&apos;ll review your website, messaging, trust signals, content,
          booking path, and search visibility, then send back the first three
          improvements we&apos;d make, whether or not you hire us.
        </p>
        <p className="mt-4 text-sm text-zinc-400">
          Prefer to talk it through?{" "}
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-100"
          >
            Book an optional strategy call →
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 ${className}`}
      noValidate
    >
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="audit-name" className={labelClass}>
            Name <span className="text-cyan-400">*</span>
          </label>
          <input
            id="audit-name"
            className={inputClass}
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="audit-business" className={labelClass}>
            Business name
          </label>
          <input
            id="audit-business"
            className={inputClass}
            type="text"
            autoComplete="organization"
            placeholder="Your business"
            value={form.business}
            onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="audit-email" className={labelClass}>
            Email <span className="text-cyan-400">*</span>
          </label>
          <input
            id="audit-email"
            className={inputClass}
            type="email"
            required
            autoComplete="email"
            placeholder="you@business.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="audit-phone" className={labelClass}>
            Phone <span className="text-zinc-500">(optional)</span>
          </label>
          <input
            id="audit-phone"
            className={inputClass}
            type="tel"
            autoComplete="tel"
            placeholder="For a faster follow-up"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="audit-website" className={labelClass}>
          Website or primary social link
        </label>
        <input
          id="audit-website"
          className={inputClass}
          type="text"
          inputMode="url"
          placeholder="yourbusiness.com or instagram.com/yourbusiness"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="audit-improve" className={labelClass}>
          What do you most want to improve?
        </label>
        <textarea
          id="audit-improve"
          className={`${inputClass} min-h-[90px] resize-none`}
          placeholder="More bookings, clearer messaging, a stronger website, showing up in search…"
          value={form.improve}
          onChange={(e) => setForm((f) => ({ ...f, improve: e.target.value }))}
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs text-red-300"
        >
          Something went wrong sending your request. Please try again in a
          moment, or reach us through the links in the footer.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 w-full rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 py-4 text-sm font-black text-white shadow-xl shadow-cyan-900/25 transition-all hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Get My Free Digital Presence Audit →"}
      </button>

      <p className="mt-3 text-center text-xs leading-relaxed text-zinc-500">
        No pressure. We use your details only to prepare and send your audit.{" "}
        <Link
          href="/privacy/"
          className="underline underline-offset-2 hover:text-zinc-300"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
