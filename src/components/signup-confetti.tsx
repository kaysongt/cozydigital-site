"use client";

import { useEffect, useRef } from "react";

/** Short, silent acknowledgement of a saved registration. No third-party script. */
export default function SignupConfetti() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    const width = window.innerWidth, height = window.innerHeight;
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    element.width = width * scale; element.height = height * scale;
    context.scale(scale, scale);
    const colors = ["#08758a", "#d9ad40", "#e77c68", "#9576bc", "#56b4a2"];
    const pieces = Array.from({ length: width < 600 ? 65 : 110 }, (_, i) => ({
      x: width / 2, y: Math.min(height * 0.3, 240),
      vx: (Math.random() - 0.5) * 18, vy: -7 - Math.random() * 12,
      angle: Math.random() * Math.PI, spin: (Math.random() - 0.5) * 0.25,
      color: colors[i % colors.length], size: 5 + Math.random() * 6,
    }));
    let frame = 0, started = 0, previous = 0;
    const clear = () => { cancelAnimationFrame(frame); context.clearRect(0, 0, width, height); };
    const draw = (now: number) => {
      if (!started) started = previous = now;
      const age = now - started;
      if (age > 3400 || preference.matches) { clear(); return; }
      const delta = Math.min((now - previous) / 16.67, 2); previous = now;
      context.clearRect(0, 0, width, height);
      context.globalAlpha = Math.min(1, (3400 - age) / 700);
      for (const piece of pieces) {
        piece.x += piece.vx * delta; piece.y += piece.vy * delta;
        piece.vy += 0.19 * delta; piece.vx *= 0.995; piece.angle += piece.spin * delta;
        context.save(); context.translate(piece.x, piece.y); context.rotate(piece.angle);
        context.fillStyle = piece.color; context.fillRect(0, 0, piece.size, piece.size * 0.48); context.restore();
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    preference.addEventListener("change", clear);
    return () => { clear(); preference.removeEventListener("change", clear); };
  }, []);
  return <canvas ref={canvas} aria-hidden="true" data-signup-confetti style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 60 }} />;
}
