"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { HUB_LEAD_URL } from "@/lib/client-hub";
import { readAttribution, formatAttribution, type Attribution } from "@/components/attribution";
import { trackMetaLead } from "@/components/meta-pixel";
import { cozyVideoWebinar as webinar } from "@/data/cozy-ai-video-webinar";
import { useRouter } from "next/navigation";
import Countdown from "./Countdown";
import WorkshopProof from "./WorkshopProof";
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
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const requestId = useRef("");
  const busy = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const formStarted = useRef(false);

  useEffect(() => {
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
      try { sessionStorage.setItem(`webinar-confirmed:${webinar.id}`, "yes"); } catch { /* The URL fragment also supports storage-disabled browsers. */ }
      try {
        trackMetaLead();
        trackWebinarEvent("generate_lead", { lead_type: "webinar_interest" });
      } catch { /* A blocked analytics script must never undo a saved signup. */ }
      router.push(`${webinar.thankYouPath}#registered`);
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
        <p><strong>Free live workshop</strong><time dateTime={webinar.startsAt}>{webinar.shortDate} at {webinar.shortTime}</time></p>
        <a href="#webinar-program">The session <span aria-hidden="true">↓</span></a>
      </nav>

      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{webinar.title}</p>
          <h1 id="webinar-title" className={styles.headline}>Become the AI creator<br /><span>people stop to watch.</span></h1>
          <p className={styles.lead}>Tired of clips that look nothing like your idea? Learn to make AI videos you’re proud to post.</p>
          <a className={styles.heroCta} href="#webinar-register" onClick={() => trackWebinarEvent("webinar_cta_click", { placement: "hero" })}>Save my seat <span aria-hidden="true">↗</span></a>
        </div>
        <IntroFilm compact />
      </div>

      <Countdown />

      <div className={styles.registration}>
        <div className={styles.registrationCopy}>
          <h2>Make the video<br />you pictured.</h2>
          <p>A face changes. Two shots don’t match. More credits disappear. Learn the planning and review decisions behind videos you feel confident sharing.</p>
          <ul className={styles.takeaways}>
            <li>Know what to prompt before spending credits on another guess.</li>
            <li>Keep the same face, outfit, and lighting from shot to shot.</li>
            <li>Spot what makes a video feel unfinished, and know what to fix.</li>
          </ul>
          <div className={styles.hosts}>
            <div className={styles.portraits}><img src="/brand/team/quincy.png" width="56" height="56" alt="Quincy" loading="lazy" /><img src="/brand/team/kayson.png" width="56" height="56" alt="Kayson" loading="lazy" /></div>
            <p><strong>Quincy + Kayson, Cozy Digital founders</strong><span>The studio behind AI films for Dr. Boyce Watkins</span></p>
          </div>
          <p className={styles.sessionDate}><time dateTime={webinar.startsAt}>{webinar.date}<br /><strong>{webinar.time}</strong></time></p>
          <p className={styles.sessionNote}>Join online. Beginner friendly. No paid tools needed to attend.</p>
        </div>

        <aside id="webinar-register" className={styles.signup} aria-labelledby="signup-title">
          <div className={styles.cardTop}><span>FREE LIVE SESSION</span><span>NO PAYMENT NEEDED</span></div>
          {status === "success" ? (
            <div className={styles.success} ref={statusRef} tabIndex={-1} role="status" aria-live="polite">
              <span className={styles.successMark} aria-hidden="true">✓</span>
              <h2 id="signup-title">You’re on the list for Thursday.</h2>
              <p>Your signup is saved for {webinar.date} at {webinar.time}. The Cozy Digital team will email the joining link before the session.</p>
              <p className={styles.finePrint}>Keep the date handy. Signing up for this free webinar does not enroll you in the paid course.</p>
              <a className={styles.submit} href="#webinar-program">Explore the session <span aria-hidden="true">↓</span></a>
            </div>
          ) : (
            <>
              <h2 id="signup-title">Save my seat</h2>
              <p className={styles.cardIntro}>Join us {webinar.shortDate} at {webinar.shortTime}. Enter your name and email for the joining link.</p>
              <form ref={formRef} action="https://hub.cozydigital.org/api/webhook/webinar-register" method="post" onSubmit={submit} aria-busy={status === "sending"} onFocusCapture={() => {
                if (!formStarted.current) { formStarted.current = true; trackWebinarEvent("webinar_form_start"); }
              }}>
                <input type="hidden" name="webhookSecret" value={PUBLIC_INTAKE_KEY} />
                <input type="hidden" name="eventId" value={webinar.id} />
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
                <div className={styles.bonus}><span aria-hidden="true">🎁</span><p><strong>Your live-attendee bonus</strong>Join live to get our 13-page AI Shot Planning Workbook for free.</p></div>
                <button className={styles.submit} type="submit" disabled={status === "sending"}>{status === "sending" ? "Saving your signup…" : "Save my seat"}<span aria-hidden="true">↗</span></button>
                <p className={styles.finePrint}>By signing up, you agree to receive details about this webinar. Other marketing is optional. No purchase, account, or generation credits required.</p>

              </form>
            </>
          )}
          <p className={styles.help}>Questions? <a href="mailto:out@cozydigital.org?subject=AI%20video%20webinar">out@cozydigital.org</a></p>
        </aside>
      </div>

      <WorkshopProof />

      <section id="webinar-program" className={styles.program} aria-labelledby="program-title">
        <div className={styles.programIntro}><h2 id="program-title">Build the confidence<br />to hit publish.</h2><p>Watch us break down real projects, from the first idea to the details that make the finished video work.</p><a href="#webinar-register" onClick={() => trackWebinarEvent("webinar_cta_click", { placement: "program" })}>Save my seat <span aria-hidden="true">↗</span></a></div>
        <div className={styles.programRows}>
          <article><div><h3>Plan before you spend credits.</h3><p>Decide what the viewer should see, choose useful references, and give each shot one job.</p><span className={styles.topic}>IDEA → REFERENCES → SHOT PLAN</span></div></article>
          <article><div><h3>Give people a reason to keep watching.</h3><p>Explore try-on content, short drama, and a racing sequence. See why character, wardrobe, camera, and setting choices matter.</p><span className={styles.topic}>REAL PRODUCTION EXAMPLES</span></div></article>
          <article><div><h3>Catch the details that break a scene.</h3><p>Look for continuity problems, awkward pacing, and distracting sound before calling a video finished.</p><span className={styles.topic}>REVIEW → REFINE → DELIVER</span></div></article>
        </div>
      </section>

      <section className={styles.hostSection} aria-labelledby="workshop-hosts-title">
        <h2 id="workshop-hosts-title">Learn from the people making the films.</h2>
        <p>We’re Quincy and Kayson, the founders of Cozy Digital. Our studio creates AI films for Dr. Boyce Watkins and websites for small businesses.</p>
        <div className={styles.hostGrid}>
          <article><img src="/brand/team/quincy.png" width="112" height="112" alt="Quincy, Cozy Digital founder" loading="lazy" /><div><h3>Quincy</h3><strong>Founder &amp; Lead Developer</strong><p>Builds client websites, directs video campaigns, and develops the tools our studio uses.</p></div></article>
          <article><img src="/brand/team/kayson.png" width="112" height="112" alt="Kayson, Cozy Digital founder" loading="lazy" /><div><h3>Kayson</h3><strong>Founder &amp; Analytics Consultant</strong><p>Connects creative projects to practical workflows and tests the details before delivery.</p></div></article>
        </div>
        <a href="/#ai-video" target="_blank" rel="noopener noreferrer">Watch our client films <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a>
      </section>

      <section className={styles.faq} aria-labelledby="webinar-faq-title">
        <div><h2 id="webinar-faq-title">Before you join.</h2></div>
        <div>
          <details><summary>When is the webinar?</summary><p>{webinar.date} at {webinar.time}. It is an online live session. Register here and the Cozy Digital team will email the joining link before it begins.</p></details>
          <details><summary>Is the workshop really free?</summary><p>Yes. Register with your name and email. You do not need to buy a course or an AI subscription to attend.</p></details>
          <details><summary>How do I get the workbook?</summary><p>Join the live session and we’ll share the 13-page AI Shot Planning Workbook during the workshop. It includes exercises and reusable planning templates.</p></details>
          <details><summary>Are the examples prerecorded?</summary><p>Quincy and Kayson will host the webinar live. The video examples and narrated case studies are prerecorded; they show our planning and review decisions, rather than every generation step. The 40-second intro above is a preview, not the webinar.</p></details>
          <details><summary>Do I need an AI tool subscription?</summary><p>No subscription or credits are required to watch. Any tools or generation credits you choose to use afterward are separate. Creative and business results vary; no income or performance outcome is promised.</p></details>
        </div>
      </section>

    </section>
  );
}
