"use client";

import { useEffect, useState } from "react";
import { cozyVideoWebinar as webinar } from "@/data/cozy-ai-video-webinar";
import { googleCalendarUrl, outlookCalendarUrl } from "@/lib/webinar-calendar";
import SignupConfetti from "@/components/signup-confetti";
import styles from "./thank-you.module.css";

export default function Confirmation() {
  const [confirmed, setConfirmed] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  useEffect(() => {
    let saved = false;
    try { saved = sessionStorage.getItem(`webinar-confirmed:${webinar.id}`) === "yes"; } catch { /* Storage is optional. */ }
    const fresh = window.location.hash === "#registered";
    if (fresh || saved) setConfirmed(true);
    if (fresh) {
      setCelebrate(true);
      try { sessionStorage.setItem(`webinar-confirmed:${webinar.id}`, "yes"); } catch { /* Optional. */ }
      // Keep refreshes and shared links from firing another celebration.
      window.history.replaceState(window.history.state, "", window.location.pathname);

    }
  }, []);
  useEffect(() => {
    if (!celebrate) return;
    const timer = window.setTimeout(() => setCelebrate(false), 3600);
    return () => window.clearTimeout(timer);
  }, [celebrate]);

  return <section className={styles.confirmation} aria-labelledby="confirmation-title">
    {celebrate && <SignupConfetti />}
    <span className={styles.mark} aria-hidden="true">{confirmed ? "✓" : "↗"}</span>
    <p className={styles.label}>From Idea to AI Video / Free live workshop</p>
    <h1 id="confirmation-title">{confirmed ? "You’re in. Let’s make something." : "Your next video starts here."}</h1>
    {confirmed ? <p role="status">Your registration is saved. The Cozy Digital team will email the joining link before the workshop.</p> : <p>Already signed up? Save the workshop to your calendar. <a href="/courses/cozy-ai-video-course/#webinar-register">Still need to register? Save my seat.</a></p>}
    <div className={styles.event}><time dateTime={webinar.startsAt}><strong>{webinar.date}</strong><span>{webinar.time}</span></time><p>Online with Quincy + Kayson</p></div>
    <h2>Make it a date.</h2>
    <div className={styles.calendar} aria-label="Add the workshop to your calendar">
      <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">Google Calendar <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a>
      <a href={outlookCalendarUrl} target="_blank" rel="noopener noreferrer">Outlook <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a>
      <a href={webinar.calendarPath} download="Cozy-AI-Video-Workshop.ics">Apple / iCal <span aria-hidden="true">↓</span></a>
    </div>
    <p className={styles.note}>Calendar links reserve one hour; session length may vary. Joining details will arrive separately.</p>
    <div className={styles.bonus}><span aria-hidden="true">🎁</span><div><h2>A little something for showing up.</h2><p>Join live to get your free 13-page AI Shot Planning Workbook. Bring a product, business, or story idea to plan with us.</p></div></div>
    <p className={styles.help}>Need help with your signup? <a href="mailto:out@cozydigital.org?subject=AI%20video%20webinar">out@cozydigital.org</a></p>
  </section>;
}
