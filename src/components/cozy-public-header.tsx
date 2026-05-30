"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Clients", href: "/#clients" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const publicPrefixes = ["/", "/services", "/pricing", "/process", "/about", "/cozy-booking", "/free-audit", "/blog"];

export default function CozyPublicHeader() {
  const pathname = usePathname();

  const show = publicPrefixes.some((p) =>
    p === "/" ? pathname === "/" : pathname === p || pathname?.startsWith(`${p}/`)
  );
  if (!show) return null;

  return (
    <header className="sticky top-0 z-50 h-[54px] border-b border-white/10 bg-black/95 backdrop-blur">
      <div className="mx-auto grid h-full max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-5 md:grid-cols-[1fr_auto_1fr] md:px-7">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-lg font-black tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent md:text-xl">
          <Image
            src="/brand/cozy-digital-logo.jpg"
            alt="Cozy Digital logo"
            width={34}
            height={34}
            className="h-9 w-9 rounded-md border border-cyan-300/25 shadow-[0_0_18px_rgba(34,211,238,0.18)] object-cover"
          />
          <span className="truncate">Cozy Digital</span>
        </Link>

        <nav className="hidden items-center justify-center gap-14 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-zinc-100 transition-colors hover:text-cyan-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end">
          <Link
            href="/cozy-booking"
            className="rounded-md bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-900/25 transition-all hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500 md:px-6"
          >
            Schedule a Call
          </Link>
        </div>
      </div>
    </header>
  );
}
