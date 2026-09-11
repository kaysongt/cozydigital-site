"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const designs = [
  { title: "Form / Space", category: "Architecture · Design concept", image: "/images/concepts/form-space.svg", alt: "Architecture website concept with oversized editorial typography and a sculptural modern home" },
  { title: "Dew Theory", category: "Beauty & wellness · Design concept", image: "/images/concepts/dew-theory.svg", alt: "Skincare ecommerce website concept with a citrus palette and sculptural skincare bottles" },
  { title: "Orbit", category: "Technology · Design concept", image: "/images/concepts/orbit.svg", alt: "Technology website concept with electric violet typography, an orbital graphic, and a sleek product dashboard" },
  { title: "Dr. Alicia Watkins", category: "Wellness · Client work", image: "/images/client-proof/dr-alicia-site.png", alt: "Dr. Alicia Watkins wellness website built by Cozy Digital" },
  { title: "Dear Pastor’s Wife", category: "Community · Client work", image: "/images/client-proof/dear-pastors-wife-site.png", alt: "Dear Pastor's Wife ministry website built by Cozy Digital" },
];

export default function DesignCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(true);
  const [onScreen, setOnScreen] = useState(true);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(preference.matches);
    const syncVisibility = () => setVisible(!document.hidden);
    syncMotion();
    syncVisibility();
    preference.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.15 });
    if (container.current) observer.observe(container.current);
    return () => {
      preference.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
      observer.disconnect();
    };
  }, []);

  const playing = !paused && !hovered && !focused && !reducedMotion && visible && onScreen;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % designs.length), 5500);
    return () => window.clearInterval(timer);
  }, [playing, active]);

  const select = (index: number) => {
    setActive((index + designs.length) % designs.length);
    setPaused(true);
  };
  const design = designs[active];

  return (
    <div ref={container} className="design-carousel" role="region" aria-roledescription="carousel" aria-label="Website design showcase"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="design-carousel-heading"><span>Selected design studies</span><span aria-hidden="true">↙</span></div>
      <div className="design-carousel-stack">
        <div className="design-stack-sheet design-stack-sheet-back" aria-hidden="true" />
        <div className="design-stack-sheet design-stack-sheet-front" aria-hidden="true" />
        <div className="design-carousel-window">
          <div className="studio-browser-bar"><i /><i /><i /><span>Cozy Digital / Design showcase</span><span aria-hidden="true">↗</span></div>
          <div className="design-carousel-slides" aria-live={playing ? "off" : "polite"} aria-atomic="true">
            {designs.map((item, index) => <div key={item.title} className={`design-carousel-slide${active === index ? " is-active" : ""}`} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${designs.length}: ${item.title}`} aria-hidden={active !== index}>
              <Image src={item.image} alt={item.alt} width={1200} height={800} priority={index === 0} loading={index === 0 ? undefined : "eager"} sizes="(min-width: 1024px) 560px, 94vw" />
            </div>)}
          </div>
        </div>
      </div>
      <div className="design-carousel-caption"><div><p>{design.category}</p><h2>{design.title}</h2></div><span className="design-carousel-count">{String(active + 1).padStart(2, "0")} <span>/ {String(designs.length).padStart(2, "0")}</span></span></div>
      <div className="design-carousel-controls">
        <div className="design-carousel-dots" aria-label="Choose a design">{designs.map((item, index) => <button key={item.title} type="button" aria-label={`Show ${item.title}`} aria-pressed={index === active} onClick={() => select(index)}><span /></button>)}</div>
        <div className="design-carousel-buttons">
          <button type="button" onClick={() => select(active - 1)} aria-label="Previous design">←</button>
          {!reducedMotion && <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play automatic slideshow" : "Pause automatic slideshow"}>{paused ? "Play" : "Pause"}</button>}
          <button type="button" onClick={() => select(active + 1)} aria-label="Next design">→</button>
        </div>
      </div>
      <p className="design-carousel-note">Concept designs and client websites.</p>
    </div>
  );
}