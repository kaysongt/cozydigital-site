import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SocialProofPosts from "@/components/social-proof-posts";

export const metadata: Metadata = {
  title: "Cozy Digital | Websites, Content & Lead Systems",
  description: "Practical growth systems for businesses, creators, and service brands ready to turn visitors into booked clients.",
};

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

const platformLogos = [
  { name: "Meta", logo: "/logos/platforms/meta.svg", glow: "shadow-blue-500/20" },
  { name: "Instagram", logo: "/logos/platforms/instagram.svg", glow: "shadow-pink-500/20" },
  { name: "Facebook", logo: "/logos/platforms/facebook.svg", glow: "shadow-blue-500/20" },
  { name: "TikTok", logo: "/logos/platforms/tiktok.svg", glow: "shadow-cyan-500/20" },
  { name: "Shopify", logo: "/logos/platforms/shopify.svg", glow: "shadow-emerald-500/20" },
  { name: "Etsy", logo: "/logos/platforms/etsy.svg", glow: "shadow-orange-500/20" },
  { name: "Google", logo: "/logos/platforms/google.svg", glow: "shadow-blue-500/20" },
  { name: "YouTube", logo: "/logos/platforms/youtube.svg", glow: "shadow-red-500/20" },
  { name: "Stripe", logo: "/logos/platforms/stripe.svg", glow: "shadow-violet-500/20" },
  { name: "Mailchimp", logo: "/logos/platforms/mailchimp.svg", glow: "shadow-yellow-500/20" },
];

const clientProof = [
  {
    name: "Dr. Alicia",
    label: "Live ecommerce + wellness brand",
    summary: "A public Shopify storefront and supporting content scheduler built around self-care products, books, and repeatable social content planning.",
    image: "/images/client-proof/dr-alicia-site.png",
    alt: "Screenshot of the Dr. Alicia live website homepage",
    href: "https://healingwithdralicia.com/",
    cta: "Visit live website",
    details: ["Live public storefront", "Self-care product flow", "Content scheduler support"],
    privatePreview: false,
    video: undefined,
  },
  {
    name: "Dr. Alicia Content Scheduler",
    label: "Client operating dashboard",
    summary: "A polished planning dashboard that organizes platform rhythm, post status, creative notes, and next actions for ongoing content execution.",
    image: "/images/client-proof/dr-alicia-scheduler.png",
    alt: "Screenshot of the Dr. Alicia content scheduler dashboard",
    href: "/free-playbook",
    cta: "Ask about scheduler builds",
    details: ["4-week content board", "Copy-ready post workflow", "Done/undo progress tracking"],
    privatePreview: false,
    video: undefined,
  },
  {
    name: "AK Marlowe",
    label: "Creator stats tracker",
    summary: "A custom tracker for logging daily snapshots, sales, ad campaigns, reviews, and platform growth so marketing decisions have one clean source of truth.",
    image: "/images/client-proof/ak-marlowe-stats-preview.png",
    alt: "Screenshot of the AK Marlowe stats tracker dashboard",
    href: "/free-playbook",
    cta: "Ask about custom trackers",
    details: ["Sales + ad tracking", "Platform growth dashboard", "Export-ready data"],
    privatePreview: false,
    video: undefined,
  },
  {
    name: "AK Marlowe",
    label: "Short-form ad — produced by Cozy Digital",
    summary: "A branded video ad built around a hook-first script — designed to stop the scroll and drive trust before the first call to action lands.",
    image: undefined,
    alt: "",
    href: "/free-playbook",
    cta: "Get an ad like this",
    details: ["Hook-first scripting", "Brand-matched visuals", "Ready to post on reels/shorts"],
    privatePreview: false,
    video: { src: "/videos/client-ad.mp4", poster: "/videos/client-ad-poster.jpg" },
  },
];

const services = [
  { badge: "ONE-TIME", name: "Full Build Package", price: "$3,000", tagline: "Everything built from scratch. You own all of it when we are done. Best option to get fully set up in 90 days.", items: ["Custom Website (5 pages + landing page)", "Direct Booking System Setup", "Google Business Profile Optimization", "Local SEO Foundation", "Social Media Branding & Content Templates", "Automated Follow-Up System", "Analytics & Reporting Dashboard"], cta: "Book a Free Consultation", highlight: false },
  { badge: "ONGOING", name: "Monthly Retainer", price: "$900/mo", tagline: "We manage, update, and grow everything for you month to month. No long-term contract required.", items: ["Website Maintenance & Updates", "Local SEO & Google Profile Management", "Social Media Content (8 posts/month)", "Ad Management (Google or Meta)", "Monthly Analytics Report & Strategy Call"], cta: "Book a Free Consultation", highlight: true },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.15),transparent)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="text-left">
            <div className="mb-8 flex flex-wrap gap-3">
              <Link href="/free-playbook/" className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-300 hover:bg-amber-500/20">
                ⬇ Free Brand Playbook
              </Link>
              <Link href="/free-audit/" className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-200 hover:bg-cyan-500/20">
                Free audit <span aria-hidden="true">&#x2192;</span>
              </Link>
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight text-white md:text-7xl">
              Turn first-time visitors into{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">booked clients.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              Watch the quick breakdown, then book a free consultation so we can map the website, content, and lead path that fits your business.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/free-playbook" className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-9 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
                <span>Book a Free Consultation</span>
                <ArrowIcon />
              </Link>
              <span className="text-sm font-semibold text-zinc-500">No pressure &mdash; leave with clear next steps.</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="group relative overflow-hidden rounded-3xl border border-fuchsia-400/70 bg-zinc-950 shadow-2xl shadow-fuchsia-950/40 ring-1 ring-cyan-300/20">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/30 via-blue-500/20 to-fuchsia-500/30 opacity-70 blur-xl" />
              <video
                className="relative z-10 aspect-video w-full rounded-[1.35rem] bg-black object-cover"
                controls
                preload="metadata"
                poster="/videos/vsl_final_heynow_fixed_captions-poster.jpg"
                playsInline
              >
                <source src="/videos/vsl_final_heynow_fixed_captions.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes platform-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .platform-track {
            animation: platform-marquee 38s linear infinite;
          }
          .platform-marquee:hover .platform-track {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .platform-track {
              animation: none;
              flex-wrap: wrap;
              justify-content: center;
            }
          }
        `}</style>

        <div className="platform-marquee relative mx-auto mt-14 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] py-5 text-center shadow-2xl shadow-black/20" aria-labelledby="platform-logos-label" role="region">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent" />
          <p id="platform-logos-label" className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">Built around channels customers already trust</p>
          <div className="platform-track flex w-max items-center gap-8 px-8">
            {[...platformLogos, ...platformLogos].map((logo, index) => (
              <span
                key={`${logo.name}-${index}`}
                aria-label={logo.name}
                className="group/logo inline-flex h-12 shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-5 shadow-lg shadow-black/20 ring-1 ring-white/[0.03] transition duration-300 hover:border-cyan-200/30 hover:bg-white/[0.07] hover:opacity-100"
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] p-1.5 shadow-lg ${logo.glow}`}>
                  <Image src={logo.logo} alt="" width={28} height={28} className="h-full w-full object-contain" aria-hidden="true" />
                </span>
                <span className="bg-gradient-to-r from-zinc-50 via-white to-zinc-300 bg-clip-text text-lg font-black tracking-tight text-transparent opacity-90 transition-opacity group-hover/logo:opacity-100 md:text-xl">
                  {logo.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="overflow-hidden py-16" aria-label="Social proof — real posts from Cozy Digital">
        <style>{`
          @keyframes social-marquee-fwd {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes social-marquee-rev {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
          .social-track-fwd { animation: social-marquee-fwd 40s linear infinite; }
          .social-track-rev { animation: social-marquee-rev 44s linear infinite; }
          .social-row:hover .social-track-fwd,
          .social-row:hover .social-track-rev { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) {
            .social-track-fwd, .social-track-rev {
              animation: none;
              flex-wrap: wrap;
              justify-content: center;
            }
          }
        `}</style>

        <div className="mx-auto mb-10 max-w-6xl px-6 text-center">
          <h2 className="text-4xl font-black text-white md:text-5xl">Real posts. Real traction.</h2>
        </div>

        <SocialProofPosts />
      </section>

      {/* WHAT WE FIX */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-start">

            {/* Left — pitch */}
            <div className="lg:sticky lg:top-28">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">What we fix</p>
              <h2 className="text-4xl font-black leading-[1.05] text-white md:text-5xl">
                We fix the parts of your business people actually{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                  see, click, and judge.
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-zinc-400">
                We handle the details that drive first impressions, build trust, and turn interest into real bookings.
              </p>
              <Link
                href="/free-audit/"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-7 py-4 text-sm font-black text-black transition-colors hover:bg-cyan-400"
              >
                Get my free audit <ArrowIcon />
              </Link>
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-sm leading-relaxed text-zinc-400">Built for service businesses that want more bookings, clearer messaging, and better follow-up.</p>
              </div>
            </div>

            {/* Right — 2-col feature grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  ),
                  title: "Clear homepage messaging that makes people stay",
                  desc: "We clarify your offer, headline, and value so visitors instantly get what you do.",
                },
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>
                  ),
                  title: "Stronger CTA and easier booking flow",
                  desc: "We improve your calls-to-action and booking path to get more inquiries and appointments.",
                },
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  ),
                  title: "Instagram / TikTok content direction that converts",
                  desc: "We create a content plan that attracts the right people and supports your offers.",
                },
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  ),
                  title: "High-converting landing pages and service pages",
                  desc: "We design pages that are simple, clear, and built to turn visitors into clients.",
                },
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  ),
                  title: "Free audit or guide capture path that actually grows your list",
                  desc: "We build lead magnets and capture flows that bring in leads on autopilot.",
                },
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  ),
                  title: "Email / SMS follow-up messaging that books more jobs",
                  desc: "We write follow-ups that build trust, answer questions, and bring leads back.",
                },
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>
                  ),
                  title: "Content templates and posting rhythm",
                  desc: "We give you plug-and-play content and a posting plan you can actually stick to.",
                },
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  ),
                  title: "Simple analytics and weekly next steps",
                  desc: "We track what matters and tell you exactly what to do next each week.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-colors duration-200 hover:border-cyan-400/20 hover:bg-white/[0.06]"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-400">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-black leading-snug text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom scroll cue */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <span className="h-px flex-1 bg-white/[0.08]" />
            <a href="#clients" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan-400">
              <span>✦</span> See what that looks like <span>✦</span>
            </a>
            <span className="h-px flex-1 bg-white/[0.08]" />
          </div>
        </div>
      </section>

      {/* CLIENT PROOF */}
      <section id="clients" className="scroll-mt-20 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">Client Proof</p>
            <h2 className="whitespace-nowrap text-3xl font-black text-white md:text-4xl">Real client work, shown cleanly.</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-400">
              No inflated claims, no fake logos — just screenshots and working systems from real clients.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {clientProof.map((client, i) => (
              <article key={`${client.name}-${i}`} className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-xl shadow-black/30 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.05]">
                <div className="relative h-44 overflow-hidden bg-black">
                  {client.video ? (
                    <video
                      src={client.video.src}
                      poster={client.video.poster}
                      controls
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <Image src={client.image!} alt={client.alt} width={600} height={338} className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400">{client.label}</p>
                  <h3 className="mt-1.5 text-base font-black text-white">{client.name}</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">{client.summary}</p>
                  <div className="mt-4 space-y-1">
                    {client.details.map((detail) => (
                      <div key={detail} className="flex gap-1.5 text-xs text-zinc-300">
                        <span className="text-cyan-400">&#x2713;</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={client.href}
                    target={client.href.startsWith("http") ? "_blank" : undefined}
                    rel={client.href.startsWith("http") ? "noreferrer" : undefined}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 transition-colors hover:text-cyan-100"
                  >
                    {client.cta}
                    <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-zinc-500">
            Want proof like this on your site?{" "}
            <Link href="/free-playbook" className="font-semibold text-cyan-400 underline underline-offset-2 hover:text-cyan-300">
              Book the free consultation
            </Link>{" "}
            and we&apos;ll map what should be visible before visitors decide to trust you.
          </p>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="scroll-mt-20 border-y border-white/[0.06] bg-white/[0.02] py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">Packages</p>
            <h2 className="text-4xl font-black text-white md:text-5xl">Two ways to work together</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">One-time build or ongoing support — both come with clear deliverables and no lock-ins.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 items-stretch">
            {services.map((s) => (
              <div key={s.name} className={`flex flex-col rounded-3xl border p-8 ${s.highlight ? "border-cyan-300/40 bg-cyan-500/[0.04] shadow-lg shadow-cyan-950/15" : "border-white/10 bg-white/[0.03]"}`}>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{s.badge}</p>
                  <p className="text-2xl font-black text-white">{s.price}</p>
                </div>
                <h3 className="text-2xl font-black text-white">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.tagline}</p>
                <ul className="my-6 flex-1 space-y-3">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-zinc-300"><span className="text-cyan-400">&#x2713;</span>{item}</li>
                  ))}
                </ul>
                <Link href="/pricing" className="mb-2 text-center text-xs text-cyan-400 underline underline-offset-2 hover:text-cyan-300">
                  See full breakdown
                </Link>
                <Link href="/free-playbook" className={`w-full rounded-xl py-3.5 text-sm font-bold text-center transition-colors ${s.highlight ? "bg-white text-black hover:bg-zinc-200" : "border border-white/20 text-white hover:bg-white/10"}`}>
                  {s.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-black text-white md:text-6xl">Ready to clean up the noise?</h2>
          <p className="mt-6 text-zinc-400 text-lg">See what&apos;s blocking trust and bookings before you spend another dollar.</p>
          <div className="mt-10 flex justify-center">
            <Link href="/free-playbook" className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-10 py-4 text-base font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
              <span>Book a Free Consultation</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
