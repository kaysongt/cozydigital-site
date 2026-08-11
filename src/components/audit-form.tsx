"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { formatAttribution, readAttribution } from "@/components/attribution";
import { trackMetaLead } from "@/components/meta-pixel";

// Cozy Client Hub lead intake. Submissions appear in the admin CRM Leads view.
// Shared by the homepage and the /free-audit page so every "Free Digital
// Presence Audit" entry point sends the same, consistent lead.
const HUB_LEAD_URL =
  "https://cozy-client-hub-production.up.railway.app/api/webhook/lead";
const HUB_WEBHOOK_SECRET = process.env.NEXT_PUBLIC_HUB_WEBHOOK_SECRET ?? "";
const CALENDLY = "https://calendly.com/cozydigital-out/30min";

type Status = "idle" | "loading" | "success" | "error";

const GOALS = [
  "More leads",
  "More sales",
  "Look more professional",
  "Show up on Google + AI search",
  "Not sure",
];

const HANDLED_BY = ["Me", "Someone on my team", "An agency", "Nobody"];

const TIMELINES = ["ASAP", "Next 1-3 months", "Just exploring"];

type Fields = {
  name: string;
  email: string;
  website: string;
  business: string;
  goal: string;
  frustration: string;
  handledBy: string;
  timeline: string;
  phone: string;
};

const EMPTY: Fields = {
  name: "",
  email: "",
  website: "",
  business: "",
  goal: "",
  frustration: "",
  handledBy: "",
  timeline: "",
  phone: "",
};

// Everything here is needed to actually produce the audit, so it is enforced
// rather than merely marked. Phone is the only genuinely optional field.
const REQUIRED: Array<{ key: keyof Fields; message: string }> = [
  { key: "name", message: "Please tell us your name." },
  { key: "email", message: "We need an email to send your audit." },
  { key: "website", message: "We need a link to review." },
  { key: "business", message: "Tell us what your business does." },
  { key: "goal", message: "Pick the goal that fits best." },
  { key: "frustration", message: "Tell us what is frustrating you." },
  { key: "handledBy", message: "Let us know who handles this today." },
  { key: "timeline", message: "Pick a rough timeline." },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/;

export default function AuditForm({
  leadSource = "Digital Presence Audit",
  className = "",
}: {
  leadSource?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  // Honeypot: hidden field; only bots fill it.
  const hpRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function set<K extends keyof Fields>(key: K, value: string) {
    setForm(f => ({ ...f, [key]: value }));
    // Clear the message as soon as they start fixing it.
    setErrors(e => (e[key] ? { ...e, [key]: undefined } : e));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof Fields, string>> = {};
    for (const { key, message } of REQUIRED) {
      if (!form[key].trim()) next[key] = message;
    }
    if (form.email.trim() && !EMAIL_PATTERN.test(form.email.trim())) {
      next.email = "That email does not look right.";
    }
    setErrors(next);

    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
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
      `What they do: ${form.business.trim()}`,
      `Main goal: ${form.goal}`,
      `Biggest frustration: ${form.frustration.trim()}`,
      `Currently handled by: ${form.handledBy}`,
      `Timeline: ${form.timeline}`,
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
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          website: form.website.trim(),
          notes,
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

  const inputBase =
    "w-full rounded-xl border bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition";
  const inputOk =
    "border-white/10 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30";
  const inputBad =
    "border-red-400/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/30";
  const field = (key: keyof Fields) =>
    `${inputBase} ${errors[key] ? inputBad : inputOk}`;
  const labelClass = "mb-1.5 block text-xs font-bold text-zinc-300";
  const optionClass = "bg-zinc-900 text-white";
  const sectionHeading =
    "mb-4 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-cyan-300/80";

  function Err({ name }: { name: keyof Fields }) {
    if (!errors[name]) return null;
    return (
      <p className="mt-1.5 text-xs font-medium text-red-300">{errors[name]}</p>
    );
  }

  // Chevron for the native selects, which cannot be styled directly.
  function Chevron() {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
      >
        <path
          d="M6 8l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

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
      ref={formRef}
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

      {/* ---------- What we need to run the audit ---------- */}
      <div className={sectionHeading}>
        <span>What we need to run your audit</span>
        <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/30 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="audit-name" className={labelClass}>
            Name <span className="text-cyan-400">*</span>
          </label>
          <input
            id="audit-name"
            name="name"
            className={field("name")}
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            value={form.name}
            onChange={e => set("name", e.target.value)}
          />
          <Err name="name" />
        </div>
        <div>
          <label htmlFor="audit-email" className={labelClass}>
            Email <span className="text-cyan-400">*</span>
          </label>
          <input
            id="audit-email"
            name="email"
            className={field("email")}
            type="email"
            autoComplete="email"
            placeholder="you@business.com"
            aria-invalid={!!errors.email}
            value={form.email}
            onChange={e => set("email", e.target.value)}
          />
          <Err name="email" />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="audit-website" className={labelClass}>
          Website URL <span className="text-cyan-400">*</span>
        </label>
        <input
          id="audit-website"
          name="website"
          className={field("website")}
          type="text"
          inputMode="url"
          placeholder="yourbusiness.com"
          aria-invalid={!!errors.website}
          value={form.website}
          onChange={e => set("website", e.target.value)}
        />
        <p className="mt-1.5 text-xs text-zinc-500">
          No website yet? Paste your Google Business or Instagram profile.
        </p>
        <Err name="website" />
      </div>

      <div className="mt-4">
        <label htmlFor="audit-business" className={labelClass}>
          What does your business do? <span className="text-cyan-400">*</span>
        </label>
        <input
          id="audit-business"
          name="business"
          className={field("business")}
          type="text"
          maxLength={140}
          placeholder="One line, e.g. Residential cleaning for busy families in Atlanta"
          aria-invalid={!!errors.business}
          value={form.business}
          onChange={e => set("business", e.target.value)}
        />
        <Err name="business" />
      </div>

      {/* ---------- Qualifying ---------- */}
      <div className={`${sectionHeading} mt-8`}>
        <span>So we tailor it to you</span>
        <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/30 to-transparent" />
      </div>

      <div>
        <label htmlFor="audit-goal" className={labelClass}>
          What&apos;s your main goal right now? <span className="text-cyan-400">*</span>
        </label>
        <div className="relative">
          <select
            id="audit-goal"
            name="goal"
            className={`${field("goal")} appearance-none pr-11 ${form.goal ? "" : "text-zinc-500"}`}
            aria-invalid={!!errors.goal}
            value={form.goal}
            onChange={e => set("goal", e.target.value)}
          >
            <option value="" disabled className={optionClass}>
              Select one…
            </option>
            {GOALS.map(g => (
              <option key={g} value={g} className={optionClass}>
                {g}
              </option>
            ))}
          </select>
          <Chevron />
        </div>
        <Err name="goal" />
      </div>

      <div className="mt-4">
        <label htmlFor="audit-frustration" className={labelClass}>
          What&apos;s your biggest frustration with your current site or online
          presence? <span className="text-cyan-400">*</span>
        </label>
        <textarea
          id="audit-frustration"
          name="frustration"
          className={`${field("frustration")} min-h-[90px] resize-none`}
          placeholder="Nobody finds us, the site looks dated, leads go quiet…"
          aria-invalid={!!errors.frustration}
          value={form.frustration}
          onChange={e => set("frustration", e.target.value)}
        />
        <Err name="frustration" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="audit-handled" className={labelClass}>
            Who handles your website and marketing now?{" "}
            <span className="text-cyan-400">*</span>
          </label>
          <div className="relative">
            <select
              id="audit-handled"
              name="handledBy"
              className={`${field("handledBy")} appearance-none pr-11 ${form.handledBy ? "" : "text-zinc-500"}`}
              aria-invalid={!!errors.handledBy}
              value={form.handledBy}
              onChange={e => set("handledBy", e.target.value)}
            >
              <option value="" disabled className={optionClass}>
                Select one…
              </option>
              {HANDLED_BY.map(h => (
                <option key={h} value={h} className={optionClass}>
                  {h}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
          <Err name="handledBy" />
        </div>
        <div>
          <label htmlFor="audit-timeline" className={labelClass}>
            When are you looking to fix this?{" "}
            <span className="text-cyan-400">*</span>
          </label>
          <div className="relative">
            <select
              id="audit-timeline"
              name="timeline"
              className={`${field("timeline")} appearance-none pr-11 ${form.timeline ? "" : "text-zinc-500"}`}
              aria-invalid={!!errors.timeline}
              value={form.timeline}
              onChange={e => set("timeline", e.target.value)}
            >
              <option value="" disabled className={optionClass}>
                Select one…
              </option>
              {TIMELINES.map(t => (
                <option key={t} value={t} className={optionClass}>
                  {t}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
          <Err name="timeline" />
        </div>
      </div>

      {/* ---------- Optional ---------- */}
      <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
        <label htmlFor="audit-phone" className={labelClass}>
          Phone number <span className="text-zinc-500">(optional)</span>
        </label>
        <input
          id="audit-phone"
          name="phone"
          className={`${inputBase} ${inputOk}`}
          type="tel"
          autoComplete="tel"
          placeholder="For a faster follow-up"
          value={form.phone}
          onChange={e => set("phone", e.target.value)}
        />
        <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
          Adding a number usually means we get your audit back to you the same
          day instead of playing email tag.
        </p>
      </div>

      {Object.keys(errors).length > 0 && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs text-red-300"
        >
          Please fill in the highlighted fields above.
        </p>
      )}

      {status === "error" && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs text-red-300"
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
