import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import StudioHero from "@/components/studio-hero";
import SocialProofPosts from "@/components/social-proof-posts";
import AuditForm from "@/components/audit-form";
import FounderTrust from "@/components/founder-trust";

export const metadata: Metadata = {
  title: "Digital Presence for Service Businesses | Cozy Digital",
  description:
    "Cozy Digital helps service businesses improve their websites, messaging, content, booking paths, automation, and search visibility. Request a free Digital Presence Audit.",
  alternates: { canonical: "https://cozydigital.org/" },
};

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

// The six touchpoints that make up a business's digital presence.
const presencePillars = [
  {
    title: "Website & landing pages",
    desc: "Clear, mobile-friendly pages that explain the offer and guide visitors toward action.",
  },
  {
    title: "Messaging & brand clarity",
    desc: "Stronger headlines, service descriptions, calls to action, and brand consistency.",
  },
  {
    title: "Content & social presence",
    desc: "Content direction and reusable systems, including short-form and AI-assisted video, built around the offers the business actually sells.",
  },
  {
    title: "Booking & lead pathways",
    desc: "Fewer unnecessary steps between interest, inquiry, scheduling, and purchase.",
  },
  {
    title: "Follow-up & automation",
    desc: "Practical email, SMS, and workflow systems that prevent leads from disappearing.",
  },
  {
    title: "Search & AI visibility",
    desc: "Local SEO, structured information, and trust signals that help search engines and AI systems understand the business.",
  },
];

// Client work. One project is featured with its full deliverable list; the rest
// run as compact horizontal cards so the section reads as a portfolio instead
// of five identical full-width blocks stacked down the page.
//
// Accent classes are written out in full because Tailwind scans source text:
// building them from fragments at runtime would leave the classes ungenerated.
// Claims stay at deliverable level throughout, with no metrics we can't source.
type CaseStudy = {
  name: string;
  category: string;
  headline: string;
  blurb: string;
  image: string;
  alt: string;
  tags: string[];
  href?: string;
  status?: string;
  accentText: string;
  accentBorder: string;
  frameBorder: string;
  frameBg: string;
};

const featured: CaseStudy & { caption: string; deliverables: string[] } = {
  name: "KingsWord Training Institute",
  category: "Latest launch · Christian education",
  headline: "A certificate program students can enroll in themselves.",
  blurb:
    "KingsWord Training Institute teaches an Advanced Certificate in Biblical Studies: 32 courses across five certificates, released module by module. Cozy Digital built the program online end to end, from the curriculum a visitor browses to the checkout, account, and dashboard that carry a student through it.",
  image: "/images/client-proof/kti-site.jpg",
  alt: "KingsWord Training Institute course site built by Cozy Digital, showing the Advanced Certificate program and its first module",
  caption: "A full certificate program, enrollment and all.",
  tags: [],
  href: "https://thekti.org/",
  accentText: "text-[#e0bd6e]",
  accentBorder: "border-[#e0bd6e]/30",
  frameBorder: "border-[#d3a84c]/30",
  frameBg: "bg-[#12274a]",
  deliverables: [
    "Built the full enrollment path: curriculum, pricing, checkout, and student accounts",
    "Organized 32 courses and five certificates into modules that open on a published schedule",
    "Created a student dashboard that unlocks each module as it is released",
    "Added a searchable glossary and a community space for students",
    "Set up promotional codes for enrollment campaigns",
    "Built light and dark modes into one responsive design system",
  ],
};

const caseStudies: CaseStudy[] = [
  {
    name: "Dr. Alicia Watkins",
    category: "Wellness",
    headline: "From scattered offers to one connected wellness brand.",
    blurb:
      "Therapy, coaching, courses, products, consultations, eBooks, and an international retreat, brought together in one polished home with clear ways to take the next step.",
    image: "/images/client-proof/dr-alicia-site.png",
    alt: "Homepage of the Dr. Alicia Watkins website built by Cozy Digital, introducing her therapy, coaching, and wellness brand",
    tags: ["Direct booking paths", "Course & product pages", "Retreat packages"],
    href: "https://draliciawatkins.com/",
    accentText: "text-[#e0bd6e]",
    accentBorder: "border-[#e0bd6e]/30",
    frameBorder: "border-white/[0.08]",
    frameBg: "bg-black",
  },
  {
    name: "Dear Pastor's Wife",
    category: "Global ministry",
    headline: "A wide-reaching mission, made easy to enter.",
    blurb:
      "Free resources, gatherings across three continents, community, speaking, and partnership giving, shaped into a warm multi-page experience that helps every visitor find where she belongs.",
    image: "/images/client-proof/dear-pastors-wife-site.png",
    alt: "Dear Pastor's Wife homepage built by Cozy Digital, showing the ministry's resource hub and founder",
    tags: ["Resource library", "Event discovery", "Donation & signup paths"],
    href: "https://dearpastorswife.org/",
    accentText: "text-[#f0bd65]",
    accentBorder: "border-[#f0bd65]/30",
    frameBorder: "border-[#a85f7e]/35",
    frameBg: "bg-[#180812]",
  },
  {
    name: "Lavar Scott",
    category: "In build · Motorsport",
    headline: "A sponsorship deck, rebuilt as a platform.",
    blurb:
      "The No. 45 driver for Alpha Prime Racing was emailing brands a PDF. We built the web version: his story, audience, community work, and partnership packages in one place a sponsor can act on.",
    image: "/images/client-proof/lavar-scott-site.png",
    alt: "Lavar Scott partnership website built by Cozy Digital, showing the No. 45 driver's 2026 season hero and sponsorship call to action",
    tags: ["Partnership packages", "Reach by platform", "Concept storefront"],
    status: "Project in development",
    accentText: "text-[#ffb300]",
    accentBorder: "border-[#ffb300]/30",
    frameBorder: "border-[#ffb300]/30",
    frameBg: "bg-[#0d0e11]",
  },
  {
    // Booking and payments are still labeled "coming soon" on Mesha's own site.
    // Say designed, not live, until Cal.com and Stripe are connected.
    name: "Essential Massage by Mesha",
    category: "In build · Massage therapy",
    headline: "Off a rented booking page, onto her own.",
    blurb:
      "A 5.0-rated practice whose booking page, client list, and a cut of every session lived on someone else's platform. We built the home version: her full menu, studio, and reviews in one place.",
    image: "/images/client-proof/mesha-massage-site.jpg",
    alt: "Essential Massage by Mesha website built by Cozy Digital, showing the studio hero and booking call to action",
    tags: ["Full service menu", "Booking flow design", "Studio gallery"],
    status: "Booking and payments wiring next",
    accentText: "text-[#e0a184]",
    accentBorder: "border-[#e0a184]/30",
    frameBorder: "border-[#7c6a92]/40",
    frameBg: "bg-[#2b2530]",
  },
];

// "What we improve" grouped into a clear system instead of many equal cards.
const process = [
  {
    step: "01",
    title: "Request your free audit",
    desc: "Share your website or social link and what you want to improve. We review your presence the way a first-time customer would.",
  },
  {
    step: "02",
    title: "Get a clear plan",
    desc: "You receive the first three improvements we'd make and where the biggest trust and conversion gaps are, whether or not you hire us.",
  },
  {
    step: "03",
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
    <main className="cozy-home min-h-screen bg-zinc-950 text-zinc-100">
      <StudioHero />

      {/* SELECTED CLIENT WORK */}
      <section className="studio-work border-y border-white/[0.06] px-6 py-20 md:py-28">
        <div id="client-work" className="scroll-mt-16 mx-auto max-w-6xl" data-reveal>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="cozy-eyebrow mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-400/90">Selected Client Work</p>
              <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-white md:text-5xl">
                Different businesses. Unmistakably theirs.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-zinc-400">
              We organize the message, pages, and pathways around what each client needs people to understand and do, then shape the visuals to feel unmistakably like their brand.
            </p>
          </div>

          {/* Featured build: the newest launch, with the full deliverable list. */}
          <article className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center" data-reveal>
            <figure className={`overflow-hidden rounded-3xl border ${featured.frameBorder} ${featured.frameBg} shadow-2xl shadow-black/40`}>
              <Image
                src={featured.image}
                alt={featured.alt}
                width={1200}
                height={900}
                priority
                className="h-auto w-full object-cover"
              />
              <figcaption className="cozy-featured-figcaption border-t px-5 py-3 text-xs">
                {featured.caption}{" "}
                <a href={featured.href} target="_blank" rel="noreferrer" className="cozy-figcaption-link font-semibold text-[#e0bd6e] underline underline-offset-2 hover:text-[#f2d495]">thekti.org</a>
              </figcaption>
            </figure>

            <div>
              <p className={`text-xs font-medium uppercase tracking-[0.2em] ${featured.accentText}`}>{featured.category}</p>
              <h3 className="font-display mt-3 text-2xl font-medium leading-tight tracking-tight text-white md:text-3xl">{featured.headline}</h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{featured.blurb}</p>
              <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {featured.deliverables.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-zinc-300">
                    <span className={`mt-0.5 shrink-0 ${featured.accentText}`}>&#x2713;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={featured.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#c69a3f] px-6 py-3.5 text-sm font-bold text-[#12274a] shadow-xl shadow-black/25 transition-colors hover:bg-[#d9ae52]"
                >
                  Visit the Live Website <ArrowIcon />
                </a>
                <Link
                  href="/free-audit/#audit-form"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/[0.06]"
                >
                  Start Your Project
                </Link>
              </div>
            </div>
          </article>

          {/* The rest of the portfolio: horizontal cards, two per row. */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2" data-reveal-list>
            {caseStudies.map((project) => (
              <article
                key={project.name}
                className={`motion-card flex flex-col overflow-hidden rounded-2xl border ${project.frameBorder} bg-white/[0.03]`}
                data-reveal
              >
                {/* A wide slice off the top of the screenshot. A portrait slot
                    beside the text cropped these 4:3 captures to nonsense, but a
                    fixed 176px strip was worse: it cut every hero headline in
                    half, so the grid read "Heal. Grow. Transform with Dr." and
                    "Resources to" sliced through the letterforms. An aspect
                    scales the slice with the card, so the headline survives. */}
                <div className={`relative aspect-[16/10] overflow-hidden ${project.frameBg}`}>
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    loading="lazy"
                    className="object-cover object-top"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className={`text-xs font-medium uppercase tracking-[0.2em] ${project.accentText}`}>{project.category}</p>
                  <h3 className="font-display mt-2 text-lg font-medium leading-snug tracking-tight text-white md:text-xl">{project.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.blurb}</p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-zinc-400">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5">
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`group/link inline-flex items-center gap-1.5 text-sm font-bold ${project.accentText}`}
                      >
                        Visit the live website <ArrowIcon />
                      </a>
                    ) : (
                      <span className={`inline-flex items-center gap-2 rounded-lg border ${project.accentBorder} px-3 py-1.5 text-xs font-bold ${project.accentText}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                        {project.status}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Other client work: clearly labeled, no fabricated metrics */}
          <div className="mt-16">
            <p className="mb-6 text-xs font-medium uppercase tracking-widest text-zinc-400">Supporting systems &amp; campaign work</p>
            <div className="grid gap-5 md:grid-cols-3">
              <article className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <div className="relative h-40 overflow-hidden bg-black">
                  <Image src="/images/client-proof/dr-alicia-scheduler.png" alt="Content planning dashboard built for Dr. Alicia" width={600} height={338} loading="lazy" className="h-full w-full object-cover object-top" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">Content planning system</p>
                  <h3 className="font-display mt-2 text-base font-medium tracking-tight text-white">Dr. Alicia Content Scheduler</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">A planning dashboard that organizes platform rhythm, post status, and next actions for ongoing content execution.</p>
                </div>
              </article>
              <article className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <div className="relative h-40 overflow-hidden bg-black">
                  <Image src="/images/client-proof/ak-marlowe-stats-preview.png" alt="Custom analytics tracker dashboard built for AK Marlowe" width={600} height={338} loading="lazy" className="h-full w-full object-cover object-top" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">Analytics tracker</p>
                  <h3 className="font-display mt-2 text-base font-medium tracking-tight text-white">AK Marlowe Stats Tracker</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">A custom tracker for logging daily snapshots, sales, ad campaigns, and platform growth in one source of truth.</p>
                </div>
              </article>
              <article className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <div className="relative h-40 overflow-hidden bg-black">
                  <video src="/videos/client-ad.mp4" poster="/videos/client-ad-poster.jpg" controls playsInline preload="none" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">Short-form advertisement</p>
                  <h3 className="font-display mt-2 text-base font-medium tracking-tight text-white">AK Marlowe Video Ad</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">A branded, hook-first short-form video ad produced by Cozy Digital, ready to post on Reels and Shorts.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT DIGITAL PRESENCE MEANS */}
      <section id="capabilities" className="studio-capabilities px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 max-w-2xl" data-reveal>
            <p className="cozy-eyebrow mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-400/90">What we improve</p>
            <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-white md:text-5xl">
              One studio. Your whole digital presence.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-400">
              Every page, social profile, search result, booking link, and follow-up message shapes whether customers trust your business. We help make those touchpoints feel connected, credible, and easy to act on.
            </p>
          </div>
          <div className="studio-service-grid" data-reveal-list>
            {presencePillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="studio-service-card motion-card"
                data-reveal
              >
                <span className="cozy-numeral text-3xl md:text-4xl" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-medium leading-snug tracking-tight text-white md:text-2xl">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400 md:text-base">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-film px-6 py-20" aria-labelledby="film-title">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div data-reveal><p className="cozy-eyebrow mb-5 text-sm uppercase">The thinking behind the design</p><h2 id="film-title" className="font-display text-4xl md:text-5xl">A beautiful website is just the beginning.</h2><p className="mt-6 text-base leading-relaxed text-zinc-400">Your search results, website, content, and booking experience should tell the same story. Here’s how we bring them together.</p><Link href="/services/" className="studio-text-link mt-6 inline-flex">Explore our services <span aria-hidden="true">↗</span></Link></div>
          <div className="studio-film-frame"><video src="/videos/cozy-vsl.mp4" poster="/videos/cozy-vsl-poster.jpg" controls playsInline preload="none" aria-label="Why your search, site and booking have to match — Cozy Digital" className="aspect-video w-full" /><p>Inside Cozy Digital <span>Studio introduction · 2 min</span></p></div>
        </div>
      </section>

      {/* CONTENT EXAMPLES: honest framing */}
      <section className="overflow-hidden py-10" aria-label="Examples of content produced by Cozy Digital">
        <style>{`
          @keyframes social-marquee-fwd { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .social-track-fwd { animation: social-marquee-fwd 40s linear infinite; }
          .social-row:hover .social-track-fwd { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) {
            .social-track-fwd { animation: none; flex-wrap: wrap; justify-content: center; }
          }
        `}</style>
        <div className="mx-auto mb-10 max-w-6xl px-6 text-center">
          <h2 className="font-display text-2xl font-medium tracking-tight text-white md:text-4xl">A look at the content we produce</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-400">Real branded posts from our own channels. Examples of the content direction we bring to client work.</p>
        </div>
        <SocialProofPosts />
      </section>

      {/* FREE DIGITAL PRESENCE AUDIT: explanation + what you'll receive */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="motion-card rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12" data-reveal>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="cozy-eyebrow mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-400/90">Free Digital Presence Audit</p>
                <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-white md:text-4xl">See what to fix first, before spending another dollar.</h2>
                <p className="mt-5 text-base leading-relaxed text-zinc-300">
                  We&apos;ll review your website, messaging, trust signals, content, booking path, and search visibility, then identify the first three improvements we would make.
                </p>
                <div className="mt-8">
                  <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">What you&apos;ll receive</p>
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
      <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="cozy-eyebrow mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-400/90">How it works</p>
            <h2 className="font-display text-3xl font-medium tracking-tight text-white md:text-5xl">Three simple steps.</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8" data-reveal-list>
            {process.map((p) => (
              <div key={p.step} className="motion-card" data-reveal>
                <span className="cozy-numeral text-5xl md:text-6xl">{p.step}</span>
                <h3 className="font-display mt-5 text-xl font-medium tracking-tight text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <FounderTrust />

      {/* FAQ */}
      <section className="border-t border-white/[0.06] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl" data-reveal>
          <div className="mb-12 text-center">
            <p className="cozy-eyebrow mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-400/90">FAQ</p>
            <h2 className="font-display text-3xl font-medium tracking-tight text-white md:text-5xl">Questions, answered clearly.</h2>
          </div>
          {/* Two columns: six stacked accordions ran the page long on desktop.
              items-start keeps an opened answer from stretching its neighbour. */}
          <div className="grid items-start gap-3 md:grid-cols-2">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 open:border-cyan-400/25 open:bg-white/[0.05]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-100 marker:hidden">
                  {f.q}
                  <span aria-hidden className="shrink-0 text-cyan-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-zinc-500">
            More questions?{" "}
            <Link href="/faq/" className="font-semibold text-cyan-400 underline underline-offset-2 hover:text-cyan-300">Read the full FAQ</Link>
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24 text-center md:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-4xl font-medium tracking-tight text-white md:text-6xl">Ready to build a stronger digital presence?</h2>
          <p className="mt-6 text-lg text-zinc-400">Start with a free audit and see exactly what to improve first.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/free-audit/#audit-form" className="cozy-btn-primary group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-10 py-4 text-base font-bold shadow-xl shadow-black/20 transition-colors">
              <span>Get Your Free Audit</span>
              <ArrowIcon />
            </Link>
            <Link href="/cozy-booking/" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/20 px-10 py-4 text-base font-bold text-white transition-colors hover:bg-white/[0.06]">
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
