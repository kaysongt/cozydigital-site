"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/theme-toggle";

// `alsoActiveFor` keeps a tab highlighted on sibling pages it doesn't link to.
// About points straight at Meet the Founders, but /about/ is still reachable
// from the footer and from the founders page, so the tab lights up on both.
const navLinks: Array<{
  label: string;
  href: string;
  alsoActiveFor?: string[];
}> = [
  { label: "Services", href: "/services/" },
  { label: "Client Work", href: "/#client-work" },
  { label: "AI Visibility", href: "/ai-search/" },
  { label: "AI Academy", href: "/ai-academy/" },
  { label: "About", href: "/founders/", alsoActiveFor: ["/about/"] },
];

const publicPrefixes = ["/", "/services", "/ai-search", "/ai-academy", "/academy-access", "/pricing", "/about", "/founders", "/faq", "/cozy-booking", "/free-audit", "/blog", "/free-playbook", "/privacy", "/terms"];

function matchesPath(pathname: string, href: string) {
  const clean = href.replace(/\/$/, "");
  return pathname === clean || pathname === `${clean}/` || pathname.startsWith(`${clean}/`);
}

function isActiveLink(
  pathname: string | null,
  link: { href: string; alsoActiveFor?: string[] }
) {
  if (!pathname || link.href.includes("#")) return false;
  return (
    matchesPath(pathname, link.href) ||
    (link.alsoActiveFor ?? []).some((p) => matchesPath(pathname, p))
  );
}

export default function CozyPublicHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const show = publicPrefixes.some((p) =>
    p === "/" ? pathname === "/" : pathname === p || pathname?.startsWith(`${p}/`)
  );
  if (!show) return null;

  const isAudit = pathname === "/free-audit" || pathname === "/free-audit/";
  const isPlaybook = pathname === "/free-playbook" || pathname === "/free-playbook/";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur">
      <div className="mx-auto grid min-h-[62px] max-w-7xl grid-cols-[1fr_auto] items-center gap-2 px-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:px-7">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-lg font-black tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent md:text-xl">
          <Image src="/brand/cozy-digital-logo.jpg" alt="Cozy Digital logo" width={34} height={34} className="h-9 w-9 rounded-md border border-cyan-300/25 shadow-[0_0_18px_rgba(34,211,238,0.18)] object-cover" />
          <span className="hidden truncate lg:inline">Cozy Digital</span>
        </Link>

        <nav className="hidden items-center justify-center gap-6 lg:flex xl:gap-10 2xl:gap-14" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isActiveLink(pathname, link);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-semibold transition-colors hover:text-cyan-300 ${
                  active ? "text-cyan-300 underline decoration-cyan-400/60 decoration-2 underline-offset-8" : "text-zinc-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-2 md:gap-3">
          <ThemeToggle className="hidden lg:flex" />
          <Link
            href="/free-playbook/"
            className={`whitespace-nowrap rounded-lg border px-2.5 py-2.5 text-xs font-black transition-colors min-[390px]:px-3 lg:px-4 lg:py-3 lg:text-sm ${
              isPlaybook
                ? "border-amber-300/60 bg-amber-500/15 text-amber-100"
                : "border-amber-300/30 bg-amber-500/10 text-amber-200 hover:border-amber-300/50 hover:bg-amber-500/15 hover:text-amber-100"
            }`}
            aria-current={isPlaybook ? "page" : undefined}
          >
            <span className="xl:hidden">Playbook</span>
            <span className="hidden xl:inline">Get the Free Playbook</span>
          </Link>
          <Link
            href="/free-audit/"
            className={`whitespace-nowrap rounded-lg px-3.5 py-2.5 text-xs font-black text-white shadow-lg transition-all min-[390px]:px-4 min-[390px]:text-sm lg:px-6 lg:py-3 ${
              isAudit
                ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 ring-2 ring-cyan-300/40"
                : "bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500"
            }`}
            aria-current={isAudit ? "page" : undefined}
          >
            <span className="hidden min-[440px]:inline">Get a </span>Free Audit
          </Link>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-zinc-300 hover:text-white lg:hidden"
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
        <nav aria-label="Mobile navigation" className="border-t border-white/10 bg-black/98 px-5 pb-5 pt-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActiveLink(pathname, link);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-3 py-3 text-sm font-semibold hover:bg-white/[0.06] hover:text-cyan-300 ${
                      active ? "bg-white/[0.06] text-cyan-300" : "text-zinc-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 flex items-center justify-between rounded-lg px-3 py-2">
              <span className="text-sm font-semibold text-zinc-300">Theme</span>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
