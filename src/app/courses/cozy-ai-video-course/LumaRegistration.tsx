"use client";

import { useEffect, useRef, useState } from "react";
import SignupConfetti from "@/components/signup-confetti";
import { trackMetaLead } from "@/components/meta-pixel";
import { cozyVideoWebinar as webinar } from "@/data/cozy-ai-video-webinar";
import { trackWebinarEvent } from "@/lib/webinar-analytics";
import styles from "./webinar.module.css";

const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "li_fat_id"] as const;
const DEFAULT_CAMPAIGN = "?utm_source=cozydigital&utm_medium=website";

/** Luma owns registration and joining details; no duplicate Hub submission. */
export default function LumaRegistration() {
  const frame = useRef<HTMLIFrameElement>(null);
  const recorded = useRef(new Set<string>());
  const [embedUrl, setEmbedUrl] = useState(webinar.lumaEmbedUrl + DEFAULT_CAMPAIGN);
  const [eventUrl, setEventUrl] = useState(webinar.lumaEventUrl + DEFAULT_CAMPAIGN);
  const [confirmed, setConfirmed] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    // Forward only documented campaign fields, never names, emails, or arbitrary query values.
    const incoming = new URLSearchParams(window.location.search);
    const params = new URLSearchParams(DEFAULT_CAMPAIGN);
    for (const key of CAMPAIGN_KEYS) {
      const value = incoming.get(key)?.trim();
      if (value) params.set(key, value.slice(0, 500));
    }
    setEmbedUrl(webinar.lumaEmbedUrl + "?" + params.toString());
    setEventUrl(webinar.lumaEventUrl + "?" + params.toString());

    const storageKey = "luma-registration:" + webinar.lumaEventSlug;
    try { setConfirmed(sessionStorage.getItem(storageKey) === "yes"); } catch { /* Storage is optional. */ }

    function registrationComplete(event: MessageEvent) {
      // Trust only the configured Luma iframe, not another tab, iframe, or parent message.
      if (event.origin !== "https://luma.com" || event.source !== frame.current?.contentWindow) return;
      const data: unknown = event.data;
      if (!data || typeof data !== "object" || !("type" in data) || data.type !== "luma:purchase"
        || !("transaction_id" in data) || typeof data.transaction_id !== "string"
        || !data.transaction_id.trim() || data.transaction_id.length > 200) return;

      setConfirmed(true);
      const transaction = data.transaction_id;
      const conversionKey = "luma-conversion:" + webinar.lumaEventSlug + ":" + transaction;
      let alreadyRecorded = recorded.current.has(transaction);
      try {
        alreadyRecorded ||= sessionStorage.getItem(conversionKey) === "yes";
        sessionStorage.setItem(storageKey, "yes");
        sessionStorage.setItem(conversionKey, "yes");
      } catch { /* In-memory deduplication still applies if storage is blocked. */ }
      if (alreadyRecorded) return;
      recorded.current.add(transaction);
      setCelebrate(true);
      try {
        trackMetaLead();
        trackWebinarEvent("generate_lead", { lead_type: "webinar_interest", registration_provider: "luma" });
      } catch { /* Analytics must never affect the Luma confirmation. */ }
    }
    window.addEventListener("message", registrationComplete);
    return () => window.removeEventListener("message", registrationComplete);
  }, []);

  useEffect(() => {
    if (!celebrate) return;
    const timer = window.setTimeout(() => setCelebrate(false), 3600);
    return () => window.clearTimeout(timer);
  }, [celebrate]);

  return <aside id="webinar-register" className={styles.signup} aria-labelledby="signup-title">
    {celebrate && <SignupConfetti />}
    <div className={styles.cardTop}><span>FREE LIVE SESSION</span><span>NO PAYMENT NEEDED</span></div>
    <h2 id="signup-title">Save my seat</h2>
    <p className={styles.cardIntro}>Register below with Luma for your confirmation, joining details, and event updates.</p>
    {confirmed && <p className={styles.lumaConfirmed} role="status">You’re registered! Your confirmation and joining details are in Luma.</p>}
    <iframe
      ref={frame}
      id="luma-registration"
      className={styles.lumaFrame}
      src={embedUrl}
      title="Register for the Cozy Digital AI video workshop on Luma"
      width="100%"
      height="680"
      loading="lazy"
      allow="fullscreen"
      referrerPolicy="strict-origin-when-cross-origin"
    />
    <a className={styles.lumaFallback} href={eventUrl} target="_blank" rel="noopener noreferrer"
      onClick={() => trackWebinarEvent("webinar_cta_click", { placement: "luma_fallback" })}>
      Open registration on Luma <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span>
    </a>
    <div className={styles.bonus}><span aria-hidden="true">🎁</span><p><strong>Your live-attendee bonus</strong>Join live to get our 13-page AI Shot Planning Workbook for free.</p></div>
    <p className={styles.finePrint}>No purchase or AI tool subscription is needed. Complete registration in Luma to save your seat.</p>
    <p className={styles.help}>Questions? <a href="mailto:out@cozydigital.org?subject=AI%20video%20webinar">out@cozydigital.org</a></p>
  </aside>;
}
