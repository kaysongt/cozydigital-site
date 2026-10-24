"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { NEWSLETTER_ENDPOINT } from "@/lib/newsletter";
import { HUB_LEAD_URL } from "@/lib/client-hub";
import { readAttribution, formatAttribution, type Attribution } from "@/components/attribution";
import { trackMetaLead } from "@/components/meta-pixel";
import styles from "./webinar.module.css";

const PUBLIC_INTAKE_KEY = process.env.NEXT_PUBLIC_HUB_WEBHOOK_SECRET ?? "";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/;
const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const CONSENT_VERSION = "webinar-2026-10-22-v1";
type Status = "idle" | "sending" | "success" | "error";

/** Campaign information belongs in CRM notes, never attendee data in analytics. */
function currentAttribution(): Attribution {
  const attribution = readAttribution();
  const params = new URLSearchParams(window.location.search);
  // An explicitly tagged webinar link takes precedence over an earlier site visit.
  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key)?.trim();
    if (value) attribution[key] = value.slice(0, 200);
  }
  return attribution;
}

export default function WebinarLanding() {
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [newsletterState, setNewsletterState] = useState("");
  const requestId = useRef("");
  const busy = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setReady(true);
    return () => requestRef.current?.abort();
  }, []);

  useEffect(() => {
    if (status === "success" || status === "error") statusRef.current?.focus();
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || status === "success") return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get("name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const goal = String(fields.get("goal") ?? "").trim().slice(0, 700);
    const marketing = fields.get("marketing") === "yes";
    const honeypot = String(fields.get("company_url") ?? "").trim();
    if (!name || !EMAIL_PATTERN.test(email) || honeypot) {
      setError("Please enter your name and a valid email address, then try again.");
      setStatus("error");
      return;
    }

    busy.current = true;
    setStatus("sending");
    setError("");
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 18000);
    const attribution = currentAttribution();
    const source = (attribution.utm_source || "direct").replace(/[^a-zA-Z0-9 _-]/g, "").slice(0, 40) || "direct";
    const notes = [
      "Event: Cozy Digital free AI video webinar",
      "Registration type: interest list; date and viewing link not yet confirmed",
      "Event contact consent: yes (submitted webinar signup form)",
      `Optional marketing consent: ${marketing ? "yes" : "no"}`,
      `Consent version: ${CONSENT_VERSION}`,
      `Submitted at: ${new Date().toISOString()}`,
      goal ? `What they want to create: ${goal}` : "",
      `Landing path: ${window.location.pathname}`,
      `Attribution: ${formatAttribution(attribution).slice(0, 1800) || "direct / untagged"}`,
    ].filter(Boolean).join("\n");

    try {
      if (!requestId.current) requestId.current = crypto.randomUUID();
      const workspaceBody = new URLSearchParams({ action: "webinar", format: "json", name, email, goal, marketing: marketing ? "yes" : "no", source, request_id: requestId.current, company_url: honeypot });
      const response = await fetch(NEWSLETTER_ENDPOINT || HUB_LEAD_URL, {
        method: "POST",
        credentials: "omit",
        signal: controller.signal,
        headers: NEWSLETTER_ENDPOINT ? {} : {
          "Content-Type": "application/json",
          ...(PUBLIC_INTAKE_KEY ? { "x-webhook-secret": PUBLIC_INTAKE_KEY } : {}),
        },
        body: NEWSLETTER_ENDPOINT ? workspaceBody : JSON.stringify({
          name: name.slice(0, 255), email: email.slice(0, 320),
          leadSource: `AI Video Webinar · ${source}`,
          notes, hp: "",
        }),
      });
      const result: unknown = await response.json().catch(() => null);
      if (response.status === 429) throw new Error("Too many attempts. Please wait a few minutes before trying again, or email us below.");
      if (!response.ok || !result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
        throw new Error("We could not confirm your signup. Your details are still here. Please try again or email us below.");
      }
      // The server confirms persistence, not email delivery. Never claim an email was sent.
      if (NEWSLETTER_ENDPOINT && "newsletter" in result && typeof result.newsletter === "string") setNewsletterState(result.newsletter);
      setStatus("success");
      try {
        trackMetaLead();
        const analytics = window as Window & { gtag?: (...args: unknown[]) => void };
        analytics.gtag?.("event", "generate_lead", { form_id: "ai_video_webinar", lead_type: "webinar_interest" });
      } catch { /* A blocked analytics script must never undo a saved signup. */ }
    } catch (cause) {
      setStatus("error");
      setError(controller.signal.aborted
        ? "The connection timed out, so we could not confirm the result. Email us below to check your signup before submitting again."
        : cause instanceof Error ? cause.message : "We could not confirm your signup. Please try again or email us below.");
    } finally {
      window.clearTimeout(timeout);
      requestRef.current = null;
      busy.current = false;
    }
  }

  return (
    <section className={styles.webinar} aria-labelledby="webinar-title">
      <nav className={styles.nav} aria-label="Webinar navigation">
        <a className={styles.wordmark} href="/">cozy<span>digital</span><span className={styles.brandDot} aria-hidden="true" /></a>
        <div><a href="#webinar-program">The session</a><a className={styles.navCta} href="#webinar-register">Join free <span aria-hidden="true">↗</span></a></div>
      </nav>

      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span aria-hidden="true" /> Free AI video webinar</p>
          <h1 id="webinar-title" className={styles.headline}>Less guessing.<br /><span>More directing.</span></h1>
          <p className={styles.lead}>You have the idea. Let’s give it a story, a shot plan, and a clear next step.</p>
          <p className={styles.description}>Join Quincy and Kayson for a practical look at the decisions behind AI video: the references, the scenes, and the details that make a sequence work.</p>
          <div className={styles.hosts}>
            <div className={styles.portraits}>
              <img src="/brand/team/quincy.png" width="56" height="56" alt="Quincy" />
              <img src="/brand/team/kayson.png" width="56" height="56" alt="Kayson" />
            </div>
            <p><strong>Quincy + Kayson</strong><span>Your hosts · Cozy Digital</span></p>
          </div>
          <div className={styles.sessionFacts} aria-label="Webinar details"><span>Online</span><span>Free to join</span><span>Date to be announced</span></div>
          <a className={styles.previewLink} href="#course-intro"><span className={styles.play} aria-hidden="true">▶</span><span>Get a feel for our teaching style<small>Watch the public course introduction</small></span><span aria-hidden="true">↗</span></a>
        </div>

        <aside id="webinar-register" className={styles.signup} aria-labelledby="signup-title">
          <div className={styles.cardTop}><span>THE INVITE LIST</span><span>NO PAYMENT NEEDED</span></div>
          {status === "success" ? (
            <div className={styles.success} ref={statusRef} tabIndex={-1} role="status" aria-live="polite">
              <span className={styles.successMark} aria-hidden="true">✓</span>
              <h2 id="signup-title">You’re on the list.</h2>
              <p>Your webinar signup has been saved. The Cozy Digital team will email the confirmed date and viewing link when they’re ready.</p>
              <p className={styles.finePrint}>{newsletterState === "confirmation_required" ? "For optional Cozy Notes emails, check your inbox for a confirmation link if you have not already confirmed." : newsletterState === "pending_retry" ? <>Your webinar registration is saved, but newsletter confirmation needs another try. <a href="/newsletter/">Join Cozy Notes here.</a></> : ""}</p>
              <p className={styles.finePrint}>The date is not confirmed yet. This is not a paid course enrollment.</p>
              <a className={styles.submit} href="#webinar-program">Explore the session <span aria-hidden="true">↓</span></a>
            </div>
          ) : (
            <>
              <h2 id="signup-title">Get the webinar invite.</h2>
              <p className={styles.cardIntro}>Leave your details for the first session. We’ll share the schedule and how to join once confirmed.</p>
              <form ref={formRef} onSubmit={submit} aria-busy={status === "sending"}>
                <label htmlFor="webinar-name">Your name</label>
                <input id="webinar-name" name="name" autoComplete="name" required maxLength={255} placeholder="What should we call you?" />
                <label htmlFor="webinar-email">Email address</label>
                <input id="webinar-email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={320} placeholder="you@example.com" />
                <label htmlFor="webinar-goal">What would you like to create? <span>Optional</span></label>
                <textarea id="webinar-goal" name="goal" rows={2} maxLength={700} placeholder="A video for my business, a short story, a product demo…" />
                <div className={styles.honeypot} aria-hidden="true"><label htmlFor="webinar-company-url">Leave this field empty</label><input id="webinar-company-url" name="company_url" tabIndex={-1} autoComplete="off" /></div>
                <label className={styles.checkbox} htmlFor="webinar-marketing"><input id="webinar-marketing" name="marketing" type="checkbox" value="yes" /><span>Also send me occasional Cozy Digital tips and offers. <em>Optional.</em></span></label>
                {status === "error" && <div ref={statusRef} className={styles.error} tabIndex={-1} role="alert">{error}</div>}
                <button className={styles.submit} type="submit" disabled={!ready || status === "sending"}>{status === "sending" ? "Saving your signup…" : "Join the free webinar list"}<span aria-hidden="true">↗</span></button>
                <p className={styles.finePrint}>By signing up, you agree to receive details about this webinar. Other marketing is optional.{NEWSLETTER_ENDPOINT ? " Confirm the separate email link to join Cozy Notes. Unsubscribe anytime." : ""} No purchase, account, or generation credits required.</p>
                <noscript><p className={styles.finePrint}>The form needs JavaScript. <a href="mailto:out@cozydigital.org?subject=Free%20AI%20video%20webinar%20signup">Email us to join the webinar list instead.</a></p></noscript>
              </form>
            </>
          )}
          <p className={styles.help}>Questions? <a href="mailto:out@cozydigital.org?subject=AI%20video%20webinar">out@cozydigital.org</a></p>
        </aside>
      </div>

      <div className={styles.promise}><p>For the idea you keep putting off.</p><span>Small business videos</span><span>Creator content</span><span>Short-form stories</span></div>

      <section id="webinar-program" className={styles.program} aria-labelledby="program-title">
        <div className={styles.programIntro}><p className={styles.eyebrow}>Inside the session</p><h2 id="program-title">See the choices.<br />Not just the result.</h2><p>We’ll use prerecorded production examples to show how a loose idea becomes a deliberate sequence. No experience needed to follow along.</p><a href="#webinar-register">Join the free webinar list <span aria-hidden="true">↗</span></a></div>
        <div className={styles.programRows}>
          <article><span className={styles.number}>01</span><div><h3>Start with a brief that works.</h3><p>Decide what the viewer should see, choose useful references, and give each shot one job.</p><span className={styles.topic}>IDEA → REFERENCES → SHOT PLAN</span></div></article>
          <article><span className={styles.number}>02</span><div><h3>Look behind the scenes.</h3><p>Explore try-on content, short drama, and a racing sequence. See why character, wardrobe, camera, and setting choices matter.</p><span className={styles.topic}>REAL PRODUCTION EXAMPLES</span></div></article>
          <article><span className={styles.number}>03</span><div><h3>Know what to keep. Know what to fix.</h3><p>Look for continuity problems, awkward pacing, and distracting sound before calling a video finished.</p><span className={styles.topic}>REVIEW → REFINE → DELIVER</span></div></article>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="webinar-faq-title">
        <div><p className={styles.eyebrow}>A few useful details</p><h2 id="webinar-faq-title">Before you join.</h2></div>
        <div>
          <details><summary>When is the webinar?</summary><p>The date, time, and viewing link are still being confirmed. Join the invite list and the Cozy Digital team will share those details by email. Signing up now does not reserve a particular time slot.</p></details>
          <details><summary>Is this the paid video course?</summary><p>No. The webinar is free, and this form only joins the webinar invite list. The optional Cozy AI Video Course is a separate purchase, described below. You do not need to buy it to join the webinar.</p></details>
          <details><summary>Are the examples prerecorded?</summary><p>Yes. The production examples are prerecorded, narrated case studies. They explain our planning and review decisions; they are not live recordings of every generation step. Final session and Q&amp;A details will be shared with the schedule.</p></details>
          <details><summary>Do I need an AI tool subscription?</summary><p>No subscription or credits are required to watch. Any tools or generation credits you choose to use afterward are separate. Creative and business results vary; no income or performance outcome is promised.</p></details>
        </div>
      </section>
      <div className={styles.courseDivider}><div><span>WANT TO GO FURTHER?</span><p>Explore the separate, paid course below.</p></div><a href="#paid-course">Course details <span aria-hidden="true">↓</span></a></div>
    </section>
  );
}
