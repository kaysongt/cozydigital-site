"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { HUB_LEAD_URL } from "@/lib/client-hub";
import { readAttribution, formatAttribution, type Attribution } from "@/components/attribution";
import { trackMetaLead } from "@/components/meta-pixel";
import { cozyVideoWebinar as webinar } from "@/data/cozy-ai-video-webinar";
import { cozyVideoCourse as course } from "@/data/cozy-ai-video-course";
import { trackWebinarEvent } from "@/lib/webinar-analytics";
import IntroFilm from "./IntroFilm";
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
  const requestId = useRef("");
  const busy = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const formStarted = useRef(false);

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
      "Registration type: scheduled live webinar",
      `Session: ${webinar.title}`,
      `Event ID: ${webinar.id}`,
      `Starts at: ${webinar.startsAt} (${webinar.timeZone})`,
      "Viewing link: joining instructions to follow from the Cozy Digital team",
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
      const response = await fetch(HUB_LEAD_URL, {
        method: "POST",
        credentials: "omit",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...(PUBLIC_INTAKE_KEY ? { "x-webhook-secret": PUBLIC_INTAKE_KEY } : {}),
        },
        body: JSON.stringify({
          name: name.slice(0, 255), email: email.slice(0, 320),
          leadSource: `AI Video Webinar · ${source}`,
          notes: `${notes}\nRequest ID: ${requestId.current}`, hp: "",
        }),
      });
      const result: unknown = await response.json().catch(() => null);
      if (response.status === 429) throw new Error("Too many attempts. Please wait a few minutes before trying again, or email us below.");
      if (!response.ok || !result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
        throw new Error("We could not confirm your signup. Your details are still here. Please try again or email us below.");
      }
      // The server confirms persistence, not email delivery. Never claim an email was sent.
      setStatus("success");
      try {
        trackMetaLead();
        trackWebinarEvent("generate_lead", { lead_type: "webinar_interest" });
      } catch { /* A blocked analytics script must never undo a saved signup. */ }
    } catch (cause) {
      trackWebinarEvent("webinar_signup_error", { error_type: controller.signal.aborted ? "timeout" : "request_failed" });
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
        <p><strong>Free live webinar</strong><time dateTime={webinar.startsAt}>{webinar.shortDate} at {webinar.shortTime}</time></p>
        <a href="#webinar-program">The session <span aria-hidden="true">↓</span></a>
      </nav>

      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{webinar.title}</p>
          <h1 id="webinar-title" className={styles.headline}>Make AI videos<br /><span>that stop the scroll.</span></h1>
          <p className={styles.lead}>Learn to turn your ideas into product videos, creator content, and short films. Start with our free live webinar.</p>
          <a className={styles.heroCta} href="#webinar-register" onClick={() => trackWebinarEvent("webinar_cta_click", { placement: "hero" })}>Save my seat <span aria-hidden="true">↗</span></a>
        </div>
        <IntroFilm compact />
      </div>

      <div className={styles.promise}><p>Your idea can be the next project.</p><span>Product videos</span><span>Creator content</span><span>Short films</span></div>

      <div className={styles.registration}>
        <div className={styles.registrationCopy}>
          <h2>Bring the idea.<br />We’ll show you how to plan it.</h2>
          <p>Stuck on what to prompt, which shots you need, or why your clips don’t match? See how we work through those choices.</p>
          <ul className={styles.takeaways}>
            <li>Turn a rough idea into a usable shot plan.</li>
            <li>Keep characters, outfits, and settings consistent.</li>
            <li>Spot what to fix before sharing your video.</li>
          </ul>
          <div className={styles.hosts}>
            <div className={styles.portraits}>
              <img src="/brand/team/quincy.png" width="56" height="56" alt="Quincy" loading="lazy" />
              <img src="/brand/team/kayson.png" width="56" height="56" alt="Kayson" loading="lazy" />
            </div>
            <p><strong>Hosted by Quincy + Kayson</strong><span>The creators behind Cozy Digital</span></p>
          </div>
          <p className={styles.sessionDate}><time dateTime={webinar.startsAt}>{webinar.date}<br /><strong>{webinar.time}</strong></time></p>
          <p className={styles.sessionNote}>Join online. Beginner friendly. No paid tools needed to attend.</p>
        </div>

        <aside id="webinar-register" className={styles.signup} aria-labelledby="signup-title">
          <div className={styles.cardTop}><span>FREE LIVE SESSION</span><span>NO PAYMENT NEEDED</span></div>
          {status === "success" ? (
            <div className={styles.success} ref={statusRef} tabIndex={-1} role="status" aria-live="polite">
              <span className={styles.successMark} aria-hidden="true">✓</span>
              <h2 id="signup-title">You’re on the list for Wednesday.</h2>
              <p>Your signup is saved for {webinar.date} at {webinar.time}. The Cozy Digital team will email the joining link before the session.</p>
              <p className={styles.finePrint}>Keep the date handy. Signing up for this free webinar does not enroll you in the paid course.</p>
              <a className={styles.submit} href="#webinar-program">Explore the session <span aria-hidden="true">↓</span></a>
            </div>
          ) : (
            <>
              <h2 id="signup-title">Save my seat</h2>
              <p className={styles.cardIntro}>Join us {webinar.shortDate} at {webinar.shortTime}. Enter your name and email for the joining link.</p>
              <form ref={formRef} onSubmit={submit} aria-busy={status === "sending"} onFocusCapture={() => {
                if (!formStarted.current) { formStarted.current = true; trackWebinarEvent("webinar_form_start"); }
              }}>
                <label htmlFor="webinar-name">Your name</label>
                <input id="webinar-name" name="name" autoComplete="name" required maxLength={255} placeholder="What should we call you?" />
                <label htmlFor="webinar-email">Email address</label>
                <input id="webinar-email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={320} placeholder="you@example.com" />
                <details className={styles.optionalGoal}><summary>Add a question or video idea <span>(optional)</span></summary>
                <label htmlFor="webinar-goal">What would you like to create? <span>Optional</span></label>
                <textarea id="webinar-goal" name="goal" rows={2} maxLength={700} placeholder="A video for my business, a short story, a product demo…" />
                </details>
                <div className={styles.honeypot} aria-hidden="true"><label htmlFor="webinar-company-url">Leave this field empty</label><input id="webinar-company-url" name="company_url" tabIndex={-1} autoComplete="off" /></div>
                <label className={styles.checkbox} htmlFor="webinar-marketing"><input id="webinar-marketing" name="marketing" type="checkbox" value="yes" /><span>Also send me occasional Cozy Digital tips and offers. <em>Optional.</em></span></label>
                {status === "error" && <div ref={statusRef} className={styles.error} tabIndex={-1} role="alert">{error}</div>}
                <button className={styles.submit} type="submit" disabled={!ready || status === "sending"}>{status === "sending" ? "Saving your signup…" : "Save my seat"}<span aria-hidden="true">↗</span></button>
                <p className={styles.finePrint}>By signing up, you agree to receive details about this webinar. Other marketing is optional. No purchase, account, or generation credits required.</p>
                <noscript><p className={styles.finePrint}>The form needs JavaScript. <a href="mailto:out@cozydigital.org?subject=Free%20AI%20video%20webinar%20signup">Email us to join the webinar list instead.</a></p></noscript>
              </form>
            </>
          )}
          <p className={styles.help}>Questions? <a href="mailto:out@cozydigital.org?subject=AI%20video%20webinar">out@cozydigital.org</a></p>
        </aside>
      </div>

      <section id="webinar-program" className={styles.program} aria-labelledby="program-title">
        <div className={styles.programIntro}><h2 id="program-title">A repeatable process<br />for your next video.</h2><p>We’ll walk through real projects live, using prerecorded examples to explain the creative decisions behind them.</p><a href="#webinar-register" onClick={() => trackWebinarEvent("webinar_cta_click", { placement: "program" })}>Save my seat <span aria-hidden="true">↗</span></a></div>
        <div className={styles.programRows}>
          <article><div><h3>Plan before you spend credits.</h3><p>Decide what the viewer should see, choose useful references, and give each shot one job.</p><span className={styles.topic}>IDEA → REFERENCES → SHOT PLAN</span></div></article>
          <article><div><h3>See how our videos come together.</h3><p>Explore try-on content, short drama, and a racing sequence. See why character, wardrobe, camera, and setting choices matter.</p><span className={styles.topic}>REAL PRODUCTION EXAMPLES</span></div></article>
          <article><div><h3>Catch the details that break a scene.</h3><p>Look for continuity problems, awkward pacing, and distracting sound before calling a video finished.</p><span className={styles.topic}>REVIEW → REFINE → DELIVER</span></div></article>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="webinar-faq-title">
        <div><h2 id="webinar-faq-title">Before you join.</h2></div>
        <div>
          <details><summary>When is the webinar?</summary><p>{webinar.date} at {webinar.time}. It is an online live session. Register here and the Cozy Digital team will email the joining link before it begins.</p></details>
          <details><summary>Is this the paid video course?</summary><p>The live webinar is free. {course.title}, described below, is the optional paid course with six narrated lessons and a workbook. You do not need to buy it to attend.</p></details>
          <details><summary>Are the examples prerecorded?</summary><p>Quincy and Kayson will host the webinar live. The video examples and narrated case studies are prerecorded; they show our planning and review decisions, rather than every generation step. The 40-second intro above is a preview, not the webinar.</p></details>
          <details><summary>Do I need an AI tool subscription?</summary><p>No subscription or credits are required to watch. Any tools or generation credits you choose to use afterward are separate. Creative and business results vary; no income or performance outcome is promised.</p></details>
        </div>
      </section>
      <div className={styles.courseDivider}><div><span>WANT TO GO FURTHER?</span><p>Keep learning with {course.title}.</p></div><a href="#paid-course">Course details <span aria-hidden="true">↓</span></a></div>
    </section>
  );
}
