import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SocialProofPosts from "@/components/social-proof-posts";
import AuditForm from "@/components/audit-form";
import FounderTrust from "@/components/founder-trust";

export const metadata: Metadata = {
  title: "Digital Presence for Service Businesses | Cozy Digital",
  description:
    "Cozy Digital helps service businesses improve their websites, messaging, content, booking paths, automation, and search visibility. Request a free Digital Presence Audit.",
  alternates: { canonical: "https://www.cozydigital.org/" },
};

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

const platformLogos = [
  { name: "Meta", logo: "/logos/platforms/meta.svg", glow: "shadow-blue-500/20", tint: "#1877F2" },
  { name: "Instagram", logo: "/logos/platforms/instagram.svg", glow: "shadow-pink-500/20", tint: "#E1306C" },
  { name: "Facebook", logo: "/logos/platforms/facebook.svg", glow: "shadow-blue-500/20", tint: "#1877F2" },
  { name: "TikTok", logo: "/logos/platforms/tiktok.svg", glow: "shadow-cyan-500/20", tint: "#25F4EE" },
  { name: "Shopify", logo: "/logos/platforms/shopify.svg", glow: "shadow-emerald-500/20", tint: "#95BF47" },
  { name: "Etsy", logo: "/logos/platforms/etsy.svg", glow: "shadow-orange-500/20", tint: "#F1641E" },
  { name: "Google", logo: "/logos/platforms/google.svg", glow: "shadow-blue-500/20", tint: "#4285F4" },
  { name: "YouTube", logo: "/logos/platforms/youtube.svg", glow: "shadow-red-500/20", tint: "#FF0000" },
  { name: "Stripe", logo: "/logos/platforms/stripe.svg", glow: "shadow-violet-500/20", tint: "#635BFF" },
  { name: "Mailchimp", logo: "/logos/platforms/mailchimp.svg", glow: "shadow-yellow-500/20", tint: "#FFE01B" },
];

// The six touchpoints that make up a business's digital presence.
const presencePillars = [
  {
    title: "Website & landing pages",
    desc: "Clear, mobile-friendly pages that explain the offer and guide visitors toward action.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    ),
  },
  {
    title: "Messaging & brand clarity",
    desc: "Stronger headlines, service descriptions, calls to action, and brand consistency.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
    ),
  },
  {
    title: "Content & social presence",
    desc: "Content direction and reusable systems that support the business's actual offers.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
    ),
  },
  {
    title: "Booking & lead pathways",
    desc: "Fewer unnecessary steps between interest, inquiry, scheduling, and purchase.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
  },
  {
    title: "Follow-up & automation",
    desc: "Practical email, SMS, and workflow systems that prevent leads from disappearing.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
  },
  {
    title: "Search & AI visibility",
    desc: "Local SEO, structured information, and trust signals that help search engines and AI systems understand the business.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    ),
  },
];

// Verifiable deliverables from the Dr. Alicia project. No metrics, no revenue
// or booking claims — only what was actually built.
const aliciaDeliverables = [
  "Unified multiple offers under one recognizable brand",
  "Created direct therapy and coaching booking paths",
  "Connected online courses and wellness products",
  "Presented the Costa Rica retreat with packages, pricing, and reservation paths",
  "Improved service organization and calls to action",
  "Built a responsive experience across desktop and mobile",
];

// "What we improve" grouped into a clear system instead of many equal cards.
const improvementGroups = [
  {
    label: "Website & messaging",
    items: ["Homepage messaging", "Website design & responsiveness", "Calls to action", "Landing & service pages"],
  },
  {
    label: "Booking & follow-up",
    items: ["Booking & inquiry flows", "Lead capture", "Follow-up systems"],
  },
  {
    label: "Visibility & content",
    items: ["Social content direction", "Local search presence", "AI visibility", "Analytics & reporting"],
  },
];

const process = [
  {
    step: "1",
    title: "Request your free audit",
    desc: "Share your website or social link and what you want to improve. We review your presence the way a first-time customer would.",
  },
  {
    step: "2",
    title: "Get a clear plan",
    desc: "You receive the first three improvements we'd make and where the biggest trust and conversion gaps are, whether or not you hire us.",
  },
  {
    step: "3",
    title: "Build & improve",
    desc: "If it's a fit, we build the pieces, connect the touchpoints, and keep refining with simple analytics and next steps.",
  },
];

const faqs = [
  {
    q: "What is a Digital Presence Audit?",
    a: "It's a free review of how your business shows up online. We look at your website, messaging, trust signals, content, booking path, and search visibility, then identify the first three improvements we'd make.",
  },
  {
    q: "Is the audit really free?",
    a: "Yes. You get clear, practical recommendations whether or not you decide to work with us. There's no obligation and no required call.",
  },
  {
    q: "Do I need a new website?",
    a: "Not necessarily. In many cases we improve the site you already have. The audit helps determine whether small fixes, a rebuild, or something in between makes the most sense.",
  },
  {
    q: "Do you also handle content and social media?",
    a: "Yes. Content direction, reusable templates, and a posting rhythm that supports your actual offers are part of the digital-presence system, alongside your website and booking paths.",
  },
  {
    q: "What is AI visibility?",
    a: "It's the work of strengthening the information, structure, and trust signals that improve your business's ability to appear in search results and AI-generated recommendations. It's one part of your overall digital presence, not the whole thing.",
  },
  {
    q: "What happens after I request an audit?",
    a: "Your request goes straight to our team. We review your website and links, then send back your top three improvements. If you'd like to talk it through, you can book an optional strategy call afterward.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.15),transparent)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
            Digital Presence for Service Businesses
          </p>
          <h1 className="text-4xl font-black leading-[1.02] tracking-tight text-white md:text-6xl">
            Turn your scattered online presence into a system that{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">
              builds trust and drives action.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Cozy Digital improves how customers find you, understand you, trust you, and take the next step, from your website and content to booking paths, follow-up systems, and AI visibility.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/free-audit/" className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
              <span>Get a Free Digital Presence Audit</span>
              <ArrowIcon />
            </Link>
            <Link href="#client-work" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/15 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-white/[0.06]">
              See Our Client Work
            </Link>
          </div>
          <p className="mt-5 text-sm font-medium text-zinc-500">
            No pressure. Get clear, practical recommendations for what to improve first.
          </p>
        </div>

        {/* Trust / value strip */}
        <div className="relative mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            { title: "Clearer messaging", desc: "Visitors instantly understand what you do and who it's for." },
            { title: "Stronger trust", desc: "Consistent, credible touchpoints that make you easy to believe." },
            { title: "Easier customer action", desc: "A clear, short path from interest to booking or purchase." },
          ].map((v) => (
            <div key={v.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-left">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-500/10 text-cyan-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-sm font-black text-white">{v.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT DIGITAL PRESENCE MEANS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">What we improve</p>
            <h2 className="text-3xl font-black leading-[1.1] text-white md:text-4xl">
              Your digital presence is more than your website.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              Every page, social profile, search result, booking link, and follow-up message shapes whether customers trust your business. We help make those touchpoints feel connected, credible, and easy to act on.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {presencePillars.map((pillar) => (
              <div key={pillar.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-colors duration-200 hover:border-cyan-400/20 hover:bg-white/[0.06]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-400">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-black leading-snug text-white">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Relabeled, secondary platform strip — accurate, not an endorsement. */}
          <style>{`
            @keyframes platform-marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .platform-track { animation: platform-marquee 38s linear infinite; }
            .platform-marquee:hover .platform-track { animation-play-state: paused; }
            @media (prefers-reduced-motion: reduce) {
              .platform-track { animation: none; flex-wrap: wrap; justify-content: center; }
            }
          `}</style>
          <div className="platform-marquee relative mx-auto mt-12 max-w-6xl overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] py-5 text-center" aria-labelledby="platform-logos-label" role="region">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent" />
            <p id="platform-logos-label" className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">We improve the platforms your customers already use</p>
            <div className="platform-track flex w-max items-center gap-8 px-8">
              {[...platformLogos, ...platformLogos].map((logo, index) => (
                <span
                  key={`${logo.name}-${index}`}
                  aria-label={logo.name}
                  className="inline-flex h-11 shrink-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5"
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] p-1 ${logo.glow}`}>
                    <Image src={logo.logo} alt="" width={24} height={24} className="h-full w-full object-contain" aria-hidden="true" />
                  </span>
                  <span className="text-base font-black tracking-tight text-zinc-300 md:text-lg">{logo.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CLIENT WORK — DR. ALICIA */}
      <section id="client-work" className="scroll-mt-20 border-y border-white/[0.06] bg-white/[0.02] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">Featured Client Work</p>
          <h2 className="max-w-2xl text-3xl font-black leading-[1.1] text-white md:text-4xl">
            From scattered offers to one connected wellness brand.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-400">
            Dr. Alicia&apos;s business includes therapy, coaching, online courses, wellness products, private consultations, eBooks, and an international retreat. Cozy Digital brought those offers together in one polished digital home, giving visitors clear ways to understand the brand, explore each offer, and take the next step.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            {/* Screenshot */}
            <figure className="overflow-hidden rounded-3xl border border-white/[0.08] bg-black shadow-2xl shadow-black/40">
              <Image
                src="/images/client-proof/dr-alicia-site.png"
                alt="Homepage of the Dr. Alicia Watkins website built by Cozy Digital, introducing her therapy, coaching, and wellness brand"
                width={1200}
                height={900}
                priority
                className="h-auto w-full object-cover"
              />
              <figcaption className="border-t border-white/[0.06] px-5 py-3 text-xs text-zinc-500">
                A clear introduction to the complete Dr. Alicia brand.{" "}
                <a href="https://draliciawatkins.com/" target="_blank" rel="noreferrer" className="font-semibold text-cyan-400 underline underline-offset-2 hover:text-cyan-300">draliciawatkins.com</a>
              </figcaption>
            </figure>

            {/* Deliverables */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">What we built</p>
              <ul className="mt-4 space-y-3">
                {aliciaDeliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                    <span className="mt-0.5 shrink-0 text-cyan-400">&#x2713;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://draliciawatkins.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500"
                >
                  View the Live Website <ArrowIcon />
                </a>
                <Link
                  href="/free-audit/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/[0.06]"
                >
                  Get a Digital Presence Like This
                </Link>
              </div>
            </div>
          </div>

          {/* Other client work — clearly labeled, no fabricated metrics */}
          <div className="mt-16">
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-zinc-500">More client work</p>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <div className="relative h-40 overflow-hidden bg-black">
                  <Image src="/images/client-proof/dr-alicia-scheduler.png" alt="Content planning dashboard built for Dr. Alicia" width={600} height={338} loading="lazy" className="h-full w-full object-cover object-top" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400">Content planning system</p>
                  <h3 className="mt-1.5 text-base font-black text-white">Dr. Alicia Content Scheduler</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">A planning dashboard that organizes platform rhythm, post status, and next actions for ongoing content execution.</p>
                </div>
              </article>
              <article className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <div className="relative h-40 overflow-hidden bg-black">
                  <Image src="/images/client-proof/ak-marlowe-stats-preview.png" alt="Custom analytics tracker dashboard built for AK Marlowe" width={600} height={338} loading="lazy" className="h-full w-full object-cover object-top" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400">Analytics tracker</p>
                  <h3 className="mt-1.5 text-base font-black text-white">AK Marlowe Stats Tracker</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">A custom tracker for logging daily snapshots, sales, ad campaigns, and platform growth in one source of truth.</p>
                </div>
              </article>
              <article className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <div className="relative h-40 overflow-hidden bg-black">
                  <video src="/videos/client-ad.mp4" poster="/videos/client-ad-poster.jpg" controls playsInline preload="none" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400">Short-form advertisement</p>
                  <h3 className="mt-1.5 text-base font-black text-white">AK Marlowe Video Ad</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">A branded, hook-first short-form video ad produced by Cozy Digital, ready to post on Reels and Shorts.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE IMPROVE — grouped system */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">The system</p>
              <h2 className="text-3xl font-black leading-[1.1] text-white md:text-4xl">
                We improve the places where customers decide whether to{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">trust you.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-zinc-400">
                Websites, content, booking systems, automation, local search, and AI visibility all work as parts of one connected presence, not separate projects that never quite line up.
              </p>
              <Link href="/services/" className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/[0.06]">
                See how we work <ArrowIcon />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Featured AI visibility card with credible language */}
              <Link href="/ai-search/" className="group/geo relative overflow-hidden rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-500/[0.12] via-blue-500/[0.06] to-fuchsia-500/[0.10] p-6 transition-colors hover:border-cyan-300/50 sm:col-span-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Search &amp; AI visibility</p>
                <h3 className="mt-1.5 text-base font-black leading-snug text-white">Help search engines and AI assistants understand, trust, and accurately describe your business</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">We strengthen the information, structure, and trust signals that improve your business&apos;s ability to appear in search and AI-generated recommendations.</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 transition-colors group-hover/geo:text-cyan-100">Learn about AI Visibility <ArrowIcon /></span>
              </Link>

              {improvementGroups.map((group) => (
                <div key={group.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
                  <h3 className="text-sm font-black text-white">{group.label}</h3>
                  <ul className="mt-3 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2 text-xs leading-relaxed text-zinc-400">
                        <span className="mt-0.5 text-cyan-400">&#x2713;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT EXAMPLES — honest framing */}
      <section className="overflow-hidden py-8" aria-label="Examples of content produced by Cozy Digital">
        <style>{`
          @keyframes social-marquee-fwd { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .social-track-fwd { animation: social-marquee-fwd 40s linear infinite; }
          .social-row:hover .social-track-fwd { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) {
            .social-track-fwd { animation: none; flex-wrap: wrap; justify-content: center; }
          }
        `}</style>
        <div className="mx-auto mb-8 max-w-6xl px-6 text-center">
          <h2 className="text-2xl font-black text-white md:text-3xl">A look at the content we produce</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">Real branded posts from our own channels. Examples of the content direction we bring to client work.</p>
        </div>
        <SocialProofPosts />
      </section>

      {/* FREE DIGITAL PRESENCE AUDIT — explanation + what you'll receive */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-cyan-300/20 bg-cyan-500/[0.05] p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">Free Digital Presence Audit</p>
                <h2 className="text-3xl font-black leading-[1.1] text-white md:text-4xl">See what to fix first, before spending another dollar.</h2>
                <p className="mt-5 text-base leading-relaxed text-zinc-300">
                  We&apos;ll review your website, messaging, trust signals, content, booking path, and search visibility, then identify the first three improvements we would make.
                </p>
                <div className="mt-7">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">What you&apos;ll receive</p>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      "Three priority improvements, ranked",
                      "A review of the biggest trust or conversion gaps",
                      "Clear next steps, whether or not you hire Cozy Digital",
                    ].map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-zinc-200">
                        <span className="mt-0.5 shrink-0 text-cyan-400">&#x2713;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <AuditForm leadSource="Homepage Audit Form" />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">How it works</p>
            <h2 className="text-3xl font-black text-white md:text-4xl">Three simple steps.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {process.map((p) => (
              <div key={p.step} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-sm font-black text-white">{p.step}</span>
                <h3 className="mt-4 text-base font-black text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <FounderTrust />

      {/* FAQ */}
      <section className="border-t border-white/[0.06] px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">FAQ</p>
            <h2 className="text-3xl font-black text-white md:text-4xl">Questions, answered clearly.</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 open:border-cyan-300/20 open:bg-white/[0.05]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-zinc-100 marker:hidden">
                  {f.q}
                  <span aria-hidden className="shrink-0 text-cyan-300 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-zinc-500">
            More questions?{" "}
            <Link href="/faq/" className="font-semibold text-cyan-400 underline underline-offset-2 hover:text-cyan-300">Read the full FAQ</Link>
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-28 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-black text-white md:text-6xl">Ready to build a stronger digital presence?</h2>
          <p className="mt-6 text-lg text-zinc-400">Start with a free audit and see exactly what to improve first.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/free-audit/" className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 px-10 py-4 text-base font-bold text-white shadow-xl shadow-cyan-900/25 hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500">
              <span>Get a Free Digital Presence Audit</span>
              <ArrowIcon />
            </Link>
            <Link href="/cozy-booking/" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/15 px-10 py-4 text-base font-bold text-white transition-colors hover:bg-white/[0.06]">
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
