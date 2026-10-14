"use client";

import { useEffect, useRef } from "react";
import { CLIENT_HUB_URL } from "@/lib/client-hub";
import { mountCozy404 } from "./cozy-not-found-scene";
import "./cozy-not-found.css";

export default function CozyNotFound() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    return mountCozy404(root.current);
  }, []);
  return <div className="cozy404" ref={root} data-cozy-not-found>

  <a className="skip-link" href="#main">Skip to content</a>
  <div className="world" aria-hidden="true">
    <div className="landscape"><img src="/images/not-found/cozy-world.webp" alt="" width="1672" height="941" fetchPriority="high" /></div>
    <canvas id="particles"></canvas>
    <div className="scrim"></div>
  </div>
  <div className="page">
    <header className="header">
      <a className="brand" href="/" aria-label="Cozy Digital home">
        <img src="/images/not-found/cozy-logo.webp" alt="" width="46" height="46" />
        <span>cozy<span className="brand-light"> digital</span><span className="brand-period">.</span></span>
      </a>
      <nav aria-label="Main navigation">
        <a className="nav-link" href="/services/">Services</a>
        <a className="nav-link" href={CLIENT_HUB_URL}>Client Hub <span aria-hidden="true">↗</span></a>
        <a className="contact-link" href="/cozy-booking/">Let’s talk <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
    <main id="main" className="main">
      <div className="copy">
        <p className="error-code" aria-label="Error 404">404</p>
        <h1>A little lost.<br /><span>Still cozy.</span></h1>
        <p className="description">This page wandered off. Let’s get you<br className="desktop-break" /> back to something good.</p>
        <div className="actions">
          <a className="home-button" href="/"><span aria-hidden="true">↖</span>Back to home</a>
          <a className="work-link" href="/#client-work">See our work <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <button id="nudge" className="nudge" type="button" aria-label="Give the floating C a nudge" hidden><span className="nudge-symbol" aria-hidden="true">↗</span><span>Give it a nudge</span></button>
    </main>
    <footer className="footer">
      <p>© <span id="year">2026</span> Cozy Digital</p>
      <p className="footer-note">Even the detours deserve good design.</p>
      <button className="motion-button" id="motion-toggle" type="button" aria-pressed="true" hidden><span className="motion-mark" aria-hidden="true"><i></i><i></i><i></i></span><span id="motion-label">Pause motion</span></button>
    </footer>
  </div>
  <div className="sr-only" id="scene-status" role="status" aria-live="polite"></div>

  </div>;
}
