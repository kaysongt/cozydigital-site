"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Services", href: "/services/" },
  { label: "Process", href: "/process/" },
  { label: "Clients", href: "/#clients" },
  { label: "Pricing", href: "/pricing/" },
  { label: "About", href: "/about/" },
  { label: "Free Playbook ↓", href: "/free-playbook/" },
];

const publicPrefixes = ["/", "/services", "/pricing", "/process", "/about", "/cozy-booking", "/free-audit", "/blog", "/free-playbook"];

export default function CozyPublicHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const show = publicPrefixes.some((p) =>
    p === "/" ? pathname === "/" : pathname === p || pathname?.startsWith(`${p}/`)
  );
  if (!show) return null;

  const isBooking = pathname === "/cozy-booking" || pathname === "/cozy-booking/";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur">
      <div className="mx-auto grid h-[54px] max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-5 md:grid-cols-[1fr_auto_1fr] md:px-7">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-lg font-black tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent md:text-xl">
          <Image src="/brand/cozy-digital-logo.jpg" alt="Cozy Digital logo" width={34} height={34} className="h-9 w-9 rounded-md border border-cyan-300/25 shadow-[0_0_18px_rgba(34,211,238,0.18)] object-cover" />
          <span className="truncate">Cozy Digital</span>
        </Link>

        <nav className="hidden items-center justify-center gap-14 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-zinc-100 transition-colors hover:text-cyan-300">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/cozy-booking/"
            className={`rounded-md px-5 py-3 text-sm font-black text-white shadow-lg transition-all md:px-6 ${
              isBooking
                ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 ring-2 ring-cyan-300/40"
                : "bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500"
            }`}
            aria-current={isBooking ? "page" : undefined}
          >
            Schedule a Call
          </Link>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-zinc-300 hover:text-white md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav aria-label="Mobile navigation" className="border-t border-white/10 bg-black/98 px-5 pb-5 pt-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/[0.06] hover:text-cyan-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
