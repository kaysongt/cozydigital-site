"use client";

import { useEffect, useState } from "react";
import { cozyVideoWebinar as webinar } from "@/data/cozy-ai-video-webinar";
import styles from "./webinar.module.css";

export default function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setRemaining(Math.max(0, new Date(webinar.startsAt).getTime() - Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  if (remaining === 0) return <div className={styles.countdown}><strong>This session has started.</strong><span>Already registered? Check your joining email.</span></div>;
  const seconds = Math.floor((remaining ?? 0) / 1000);
  const values = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
  return <div className={styles.countdown} aria-label={`Workshop starts ${webinar.date} at ${webinar.time}`}>
    <p>We go live in</p>
    <div className={styles.clock} aria-hidden="true">{["days", "hours", "mins", "secs"].map((label, index) => <span key={label}><strong>{remaining === null ? "--" : String(values[index]).padStart(2, "0")}</strong><small>{label}</small></span>)}</div>
    <span>Free to join. Bring your next video idea.</span>
  </div>;
}
