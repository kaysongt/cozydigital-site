"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    document.querySelectorAll<HTMLElement>("[data-reveal-list]").forEach((list) => {
      list.querySelectorAll<HTMLElement>(":scope > [data-reveal]").forEach((item, index) => {
        item.style.setProperty("--reveal-delay", `${Math.min(index * 70, 350)}ms`);
      });
    });

    root.classList.add("motion-ready");

    if (reducedMotion.matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return () => root.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));

    const tiltItems = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const cleanups = tiltItems.map((item) => {
      const move = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const rect = item.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        item.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
        item.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
        item.style.setProperty("--glow-x", `${x * 100}%`);
        item.style.setProperty("--glow-y", `${y * 100}%`);
      };
      const leave = () => {
        item.style.setProperty("--tilt-x", "0deg");
        item.style.setProperty("--tilt-y", "0deg");
      };

      item.addEventListener("pointermove", move);
      item.addEventListener("pointerleave", leave);
      return () => {
        item.removeEventListener("pointermove", move);
        item.removeEventListener("pointerleave", leave);
      };
    });

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      root.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
