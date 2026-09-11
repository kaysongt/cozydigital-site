"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import { CLIENT_HUB_LABEL, CLIENT_HUB_NEW_TAB_HINT, CLIENT_HUB_REL, CLIENT_HUB_URL } from "@/lib/client-hub";

const links = [
  { label: "Websites", href: "/#client-work" },
  { label: "AI Video", href: "/#ai-video" },
  { label: "Services", href: "/services/" },
  { label: "The studio", href: "/founders/" },
  { label: "Courses", href: "/courses/" },
  { label: "Free playbook", href: "/free-playbook/" },
];
export default function CozyPublicHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMobileOpen(false); menuButtonRef.current?.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onResize = () => { if (desktop.matches) setMobileOpen(false); };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => { document.removeEventListener("keydown", onKey); desktop.removeEventListener("change", onResize); };
  }, [mobileOpen]);
  const active = (href: string) => !href.includes("#") && (pathname?.replace(/\/$/, "") === href.replace(/\/$/, "") || (href === "/founders/" && pathname?.startsWith("/about")) || (href === "/courses/" && pathname?.startsWith("/ai-academy")));
  return (
    <header className="studio-nav sticky top-0 z-50 backdrop-blur-xl">
      <div className="studio-nav-inner">
        <Link href="/" className="studio-nav-brand"><Image src="/brand/cozy-digital-logo.png" alt="" width={34} height={34} /><span>Cozy Digital<span className="cozy-accent">.</span></span></Link>
        <nav className="studio-nav-links" aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={active(link.href) ? "page" : undefined}>{link.label}</Link>)}</nav>
        <div className="studio-nav-actions">
          <a className="studio-hub" href={CLIENT_HUB_URL} target="_blank" rel={CLIENT_HUB_REL}>{CLIENT_HUB_LABEL} <span aria-hidden="true">↗</span><span className="sr-only">{CLIENT_HUB_NEW_TAB_HINT}</span></a>
          <ThemeToggle className="studio-theme" />
          <Link href="/cozy-booking/" className="studio-button">Start a project <span aria-hidden="true">↗</span></Link>
          <button ref={menuButtonRef} type="button" className="studio-menu-button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d={mobileOpen ? "M6 6L18 18M6 18L18 6" : "M4 7H20M4 12H20M4 17H20"} /></svg></button>
        </div>
      </div>
      {mobileOpen && <nav id="mobile-navigation" className="studio-mobile-nav" aria-label="Mobile navigation">
        {links.map(link => <Link key={link.href} href={link.href} aria-current={active(link.href) ? "page" : undefined} onClick={() => setMobileOpen(false)}>{link.label}</Link>)}
        <a href={CLIENT_HUB_URL} target="_blank" rel={CLIENT_HUB_REL} onClick={() => setMobileOpen(false)}>{CLIENT_HUB_LABEL} ↗<span className="sr-only">{CLIENT_HUB_NEW_TAB_HINT}</span></a>
        <div className="mt-5 flex items-center justify-between"><span>Appearance</span><ThemeToggle /></div>
      </nav>}
    </header>
  );
}
