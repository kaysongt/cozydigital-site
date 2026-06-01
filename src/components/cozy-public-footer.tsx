import Link from "next/link";
import Image from "next/image";

const footerNav = [
  { label: "Services", href: "/services/" },
  { label: "Process", href: "/process/" },
  { label: "Clients", href: "/#clients" },
  { label: "Pricing", href: "/pricing/" },
  { label: "About", href: "/about/" },
  { label: "Free Audit", href: "/free-audit/" },
  { label: "Free Playbook ⬇", href: "/free-playbook/" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/cozydigital",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@cozydigital",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/cozydigital",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@cozydigital",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
];

export default function CozyPublicFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-zinc-950 px-6 py-14 text-zinc-400">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-3">
              <Image src="/brand/cozy-digital-logo.jpg" alt="Cozy Digital logo" width={34} height={34} className="h-9 w-9 rounded-md border border-cyan-300/25 object-cover" />
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">Cozy Digital</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed">Websites, content systems, and lead paths for service brands ready to turn visitors into booked clients.</p>
            <div className="mt-5 flex items-center gap-4">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="text-zinc-500 transition-colors hover:text-cyan-300">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-3">
            {footerNav.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-zinc-400 transition-colors hover:text-zinc-100">
                {link.label}
              </Link>
            ))}
            <Link href="/cozy-booking/" className="mt-2 inline-flex rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-4 py-2 text-sm font-bold text-white hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
              Schedule a Call
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Cozy Digital. All rights reserved.</p>
          <p>No long-term contracts. No fluff. Just work that moves the needle.</p>
        </div>
      </div>
    </footer>
  );
}
