import Image from "next/image";
import React from "react";

type TemplatePost = {
  headline: string;
  tagline?: string;
  services: string[];
  cta: string;
  phone?: string;
  bg: string;
  headlineColor: string;
  taglineColor: string;
  ctaBg: string;
  ctaText: string;
  serviceColor: string;
  likes: number;
  comments: number;
  shares: number;
  caption: string;
};

const templatePosts: TemplatePost[] = [
  // Barbershop
  { headline: "FRESH CUTS.\nCONFIDENCE\nDELIVERED.", tagline: "Walk-Ins Welcome", services: ["Haircuts", "Beard Trims", "Line Ups"], cta: "BOOK NOW", phone: "(312) 555-0198", bg: "bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950", headlineColor: "text-amber-400", taglineColor: "text-zinc-300", ctaBg: "bg-amber-500", ctaText: "text-black", serviceColor: "text-zinc-200", likes: 53, comments: 7, shares: 3, caption: "cozydig1tal Empty chairs aren't a marketing problem. They're a clarity problem." },
  // Real Estate
  { headline: "FIND YOUR\nDREAM HOME.", tagline: "We'll Handle The Rest.", services: ["Buying", "Selling", "Investing"], cta: "MESSAGE US", phone: undefined, bg: "bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950", headlineColor: "text-white", taglineColor: "text-slate-300", ctaBg: "bg-slate-600", ctaText: "text-white", serviceColor: "text-slate-200", likes: 41, comments: 5, shares: 4, caption: "cozydig1tal Your homepage should work as hard as your best agent." },
  // Fitness
  { headline: "STRONG\nBODY.\nSTRONG\nMIND.", tagline: "Online Coaching & Custom Plans", services: ["Workouts", "Nutrition", "Support"], cta: "START TODAY", phone: undefined, bg: "bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950", headlineColor: "text-lime-400", taglineColor: "text-zinc-300", ctaBg: "bg-lime-500", ctaText: "text-black", serviceColor: "text-zinc-200", likes: 88, comments: 14, shares: 6, caption: "cozydig1tal DM to join — every post needs a next step." },
  // Restaurant
  { headline: "GOOD FOOD.\nGOOD MOOD.", tagline: "Every Time.", services: ["Fresh Ingredients", "Bold Flavors", "Made With Love"], cta: "ORDER NOW", phone: undefined, bg: "bg-gradient-to-b from-amber-950 via-stone-900 to-zinc-950", headlineColor: "text-amber-300", taglineColor: "text-amber-100", ctaBg: "bg-amber-500", ctaText: "text-black", serviceColor: "text-stone-200", likes: 72, comments: 9, shares: 5, caption: "cozydig1tal Pickup · Delivery · Dine In — the CTA should be impossible to miss." },
  // Lash Extensions
  { headline: "ENHANCE\nYOUR\nNATURAL\nBEAUTY", tagline: "Lash Extensions", services: ["Classic Sets", "Volume Sets", "Lash Lifts"], cta: "BOOK TODAY", phone: undefined, bg: "bg-gradient-to-b from-pink-950 via-rose-900 to-zinc-950", headlineColor: "text-pink-100", taglineColor: "text-rose-300", ctaBg: "bg-rose-500", ctaText: "text-white", serviceColor: "text-pink-200", likes: 64, comments: 11, shares: 4, caption: "cozydig1tal DM us today — beauty brands that convert have one clear next step." },
  // Lawn Care
  { headline: "A LAWN\nYOU'LL LOVE\nCOMING\nHOME TO.", tagline: "Reliable Lawn Care", services: ["Mowing", "Edging", "Trimming"], cta: "GET A FREE QUOTE", phone: "(773) 555-1044", bg: "bg-gradient-to-b from-green-950 via-green-900 to-zinc-950", headlineColor: "text-white", taglineColor: "text-green-300", ctaBg: "bg-green-500", ctaText: "text-black", serviceColor: "text-green-100", likes: 38, comments: 4, shares: 2, caption: "cozydig1tal Local service brands need a clear quote path — not just a pretty feed." },
  // Photography
  { headline: "CAPTURING\nMOMENTS\nTHAT LAST\nFOREVER.", tagline: "Book Your Session Today", services: ["Portraits", "Events", "Weddings"], cta: "DM TO INQUIRE", phone: undefined, bg: "bg-gradient-to-b from-zinc-950 via-neutral-900 to-zinc-950", headlineColor: "text-white", taglineColor: "text-zinc-400", ctaBg: "bg-zinc-700", ctaText: "text-white", serviceColor: "text-zinc-300", likes: 91, comments: 13, shares: 8, caption: "cozydig1tal Every photographer needs a booking path that's as polished as their shots." },
  // Cleaning
  { headline: "CLEAN\nSPACES.\nHAPPY\nPLACES.", tagline: "Professional Cleaning You Can Trust", services: ["Residential", "Commercial", "Move In/Out"], cta: "BOOK NOW", phone: "(708) 555-2876", bg: "bg-gradient-to-b from-sky-900 via-sky-950 to-zinc-950", headlineColor: "text-sky-100", taglineColor: "text-sky-300", ctaBg: "bg-sky-600", ctaText: "text-white", serviceColor: "text-sky-200", likes: 47, comments: 6, shares: 3, caption: "cozydig1tal Deep cleaning · Move in/out · Recurring — every service needs a clear offer page." },
  // Events
  { headline: "WE PLAN.\nYOU\nCELEBRATE.", tagline: "We Handle The Rest.", services: ["Weddings", "Birthdays", "Corporate"], cta: "PLAN YOUR EVENT", phone: undefined, bg: "bg-gradient-to-b from-amber-950 via-yellow-950 to-zinc-950", headlineColor: "text-amber-200", taglineColor: "text-amber-400", ctaBg: "bg-amber-600", ctaText: "text-black", serviceColor: "text-amber-100", likes: 56, comments: 8, shares: 5, caption: "cozydig1tal Event planners need a booking page that sells the experience, not just the service." },
  // Tax / Accounting
  { headline: "TAX TIME\nDONE RIGHT.", tagline: "Maximize Your Return.", services: ["Tax Prep", "Bookkeeping", "Audit Support"], cta: "SCHEDULE TODAY", phone: "(312) 555-8812", bg: "bg-gradient-to-b from-emerald-950 via-teal-900 to-zinc-950", headlineColor: "text-emerald-300", taglineColor: "text-emerald-100", ctaBg: "bg-emerald-600", ctaText: "text-white", serviceColor: "text-emerald-200", likes: 44, comments: 5, shares: 2, caption: "cozydig1tal Tax season traffic is peaking — your booking page should be ready." },
  // Auto Detail
  { headline: "WE DON'T\nJUST WASH\nCARS.\nWE DETAIL.", tagline: "Perfection.", services: ["Exterior Wash", "Interior Detail", "Ceramic Coat"], cta: "BOOK NOW", phone: "(331) 555-7722", bg: "bg-gradient-to-b from-zinc-900 via-zinc-950 to-black", headlineColor: "text-white", taglineColor: "text-zinc-400", ctaBg: "bg-amber-500", ctaText: "text-black", serviceColor: "text-zinc-300", likes: 79, comments: 10, shares: 6, caption: "cozydig1tal Wax & Polish · Ceramic Coating — your detail shop needs a quote path that converts." },
  // Pet Grooming
  { headline: "HAPPY\nPETS.\nHAPPY\nHEARTS.", tagline: "Professional Grooming With Love", services: ["Bath & Brush", "Haircuts", "Nail Trimming"], cta: "BOOK TODAY", phone: "(773) 555-6688", bg: "bg-gradient-to-b from-amber-900 via-stone-800 to-zinc-950", headlineColor: "text-amber-100", taglineColor: "text-amber-300", ctaBg: "bg-amber-500", ctaText: "text-black", serviceColor: "text-stone-200", likes: 61, comments: 9, shares: 4, caption: "cozydig1tal Pet brands with a clear booking button see 2x more first-time clients." },
  // Salon
  { headline: "YOUR BEST\nHAIR DAY\nSTARTS\nHERE.", tagline: "Color · Cut · Style", services: ["Balayage", "Keratin", "Extensions"], cta: "BOOK NOW", phone: "(312) 555-3341", bg: "bg-gradient-to-b from-fuchsia-950 via-purple-900 to-zinc-950", headlineColor: "text-fuchsia-200", taglineColor: "text-fuchsia-400", ctaBg: "bg-fuchsia-600", ctaText: "text-white", serviceColor: "text-fuchsia-100", likes: 83, comments: 12, shares: 7, caption: "cozydig1tal Salons with a clean booking path fill their chairs. The rest post and hope." },
  // Med Spa
  { headline: "LOOK HOW\nYOU FEEL\nINSIDE.", tagline: "Results-Driven Aesthetics", services: ["Botox", "Filler", "Laser"], cta: "BOOK A CONSULT", phone: undefined, bg: "bg-gradient-to-b from-rose-950 via-pink-900 to-zinc-950", headlineColor: "text-rose-100", taglineColor: "text-rose-300", ctaBg: "bg-rose-600", ctaText: "text-white", serviceColor: "text-rose-200", likes: 97, comments: 15, shares: 9, caption: "cozydig1tal Med spas need a trust-first page before the consult CTA." },
  // Plumbing
  { headline: "WE FIX IT\nFAST.\nWE FIX IT\nRIGHT.", tagline: "24/7 Emergency Service", services: ["Repairs", "Installations", "Inspections"], cta: "CALL NOW", phone: "(708) 555-9001", bg: "bg-gradient-to-b from-blue-950 via-blue-900 to-zinc-950", headlineColor: "text-white", taglineColor: "text-blue-300", ctaBg: "bg-blue-600", ctaText: "text-white", serviceColor: "text-blue-200", likes: 35, comments: 4, shares: 2, caption: "cozydig1tal Plumbers who show up online get the call before anyone else does." },
  // Tutoring
  { headline: "GRADES UP.\nCONFIDENCE\nUP.", tagline: "Expert 1-on-1 Tutoring", services: ["Math", "Reading", "Test Prep"], cta: "BOOK A SESSION", phone: "(312) 555-7723", bg: "bg-gradient-to-b from-indigo-950 via-violet-900 to-zinc-950", headlineColor: "text-indigo-200", taglineColor: "text-indigo-400", ctaBg: "bg-indigo-600", ctaText: "text-white", serviceColor: "text-indigo-100", likes: 52, comments: 7, shares: 3, caption: "cozydig1tal Parents book tutors they trust. Your homepage needs to build that trust first." },
  // HVAC
  { headline: "KEEP YOUR\nHOME\nCOMFORT-\nABLE.", tagline: "Heating & Cooling Experts", services: ["AC Repair", "Furnace Install", "Tune-Ups"], cta: "GET A QUOTE", phone: "(773) 555-4422", bg: "bg-gradient-to-b from-orange-950 via-amber-900 to-zinc-950", headlineColor: "text-orange-200", taglineColor: "text-orange-400", ctaBg: "bg-orange-500", ctaText: "text-black", serviceColor: "text-orange-100", likes: 43, comments: 5, shares: 2, caption: "cozydig1tal HVAC brands that rank locally get the emergency call. Here's how." },
  // Dental
  { headline: "YOUR BEST\nSMILE\nSTARTS\nHERE.", tagline: "Gentle & Affordable Care", services: ["Cleanings", "Whitening", "Invisalign"], cta: "BOOK TODAY", phone: "(312) 555-1199", bg: "bg-gradient-to-b from-cyan-950 via-teal-900 to-zinc-950", headlineColor: "text-cyan-100", taglineColor: "text-cyan-300", ctaBg: "bg-cyan-600", ctaText: "text-white", serviceColor: "text-cyan-200", likes: 66, comments: 8, shares: 5, caption: "cozydig1tal Dental practices with a clear new-patient page book more without paid ads." },
  // Cozy Digital - Website
  { headline: "YOUR HOME-\nPAGE IS\nLOSING\nCLIENTS.", tagline: "7 seconds. That's all you get.", services: ["Headline Fix", "CTA Cleanup", "Proof Blocks"], cta: "FREE AUDIT", phone: "CozyDigital.org", bg: "bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950", headlineColor: "text-cyan-400", taglineColor: "text-zinc-300", ctaBg: "bg-cyan-600", ctaText: "text-white", serviceColor: "text-zinc-200", likes: 71, comments: 9, shares: 4, caption: "cozydig1tal Fix the 3 things blocking your bookings — starting with the homepage." },
  // Cozy Digital - Content
  { headline: "STOP\nPOSTING.\nSTART\nCONVERTING.", tagline: "Content that has a destination.", services: ["Content Plan", "CTA Templates", "Posting Rhythm"], cta: "DM TO START", phone: "CozyDigital.org", bg: "bg-gradient-to-b from-fuchsia-950 via-violet-900 to-zinc-950", headlineColor: "text-fuchsia-300", taglineColor: "text-fuchsia-100", ctaBg: "bg-fuchsia-600", ctaText: "text-white", serviceColor: "text-fuchsia-200", likes: 119, comments: 18, shares: 9, caption: "cozydig1tal Great content with no clear CTA is just entertainment. Here's the fix." },
  // Cozy Digital - Booking
  { headline: "YOUR\nBOOKING\nPAGE IS\nBROKEN.", tagline: "Here are 5 signs.", services: ["Too Many Steps", "Weak CTA", "No Social Proof"], cta: "GET IT FIXED", phone: "CozyDigital.org", bg: "bg-gradient-to-b from-red-950 via-rose-900 to-zinc-950", headlineColor: "text-red-300", taglineColor: "text-red-100", ctaBg: "bg-red-600", ctaText: "text-white", serviceColor: "text-red-200", likes: 88, comments: 13, shares: 6, caption: "cozydig1tal Save this. If you recognize 3 of these, your booking page needs a fix today." },
  // Cozy Digital - Results
  { headline: "ONE PAGE.\n3X MORE\nINQUIRIES.", tagline: "Real result. Real client.", services: ["Page Audit", "Headline Rewrite", "CTA Rebuild"], cta: "BOOK A CALL", phone: "CozyDigital.org", bg: "bg-gradient-to-b from-amber-950 via-yellow-900 to-zinc-950", headlineColor: "text-amber-300", taglineColor: "text-amber-100", ctaBg: "bg-amber-500", ctaText: "text-black", serviceColor: "text-amber-200", likes: 101, comments: 15, shares: 8, caption: "cozydig1tal We changed one page for a client and their inquiries tripled in 2 weeks." },
];

function CrownBadge() {
  return (
    <div className="absolute right-1.5 top-1.5 flex flex-col items-center rounded-sm border border-amber-400/60 bg-black/70 px-1 py-0.5" style={{ fontSize: "4.5px" }}>
      <span className="text-amber-400" style={{ fontSize: "7px", lineHeight: 1 }}>♛</span>
      <span className="font-black tracking-tight text-white">COZY</span>
      <span className="font-black tracking-tight text-amber-400">DIGITAL</span>
    </div>
  );
}

function FakePostCard({ post }: { post: TemplatePost }) {
  const lines = post.headline.split("\n");
  return (
    <div className="h-[220px] w-[124px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-lg" style={{ fontSize: "7px" }}>
      {/* Status bar */}
      <div className="flex items-center justify-between bg-black px-2 py-[2px] text-white" style={{ fontSize: "5.5px" }}>
        <span className="font-semibold">1:05</span>
        <span className="opacity-60">▲ ◆ 5G</span>
      </div>
      {/* IG header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-black/80 px-2 py-[3px]">
        <div className="flex items-center gap-1">
          <div className="h-3.5 w-3.5 shrink-0 overflow-hidden rounded-full border border-amber-400/50">
            <Image src="/brand/cozy-digital-logo.jpg" alt="" width={14} height={14} className="h-full w-full object-cover" />
          </div>
          <span className="font-bold text-white" style={{ fontSize: "6.5px" }}>cozydig1tal</span>
        </div>
        <span className="text-white opacity-40" style={{ fontSize: "8px" }}>•••</span>
      </div>
      {/* Content area */}
      <div className={`relative flex h-[130px] flex-col justify-between p-2 ${post.bg}`}>
        <CrownBadge />
        {/* Headline */}
        <div>
          {lines.map((line, i) => (
            <p key={i} className={`font-black leading-none ${post.headlineColor}`} style={{ fontSize: i === 0 ? "9.5px" : "9px", lineHeight: 1.1 }}>{line}</p>
          ))}
          {post.tagline && (
            <p className={`mt-0.5 font-semibold italic ${post.taglineColor}`} style={{ fontSize: "5.5px" }}>{post.tagline}</p>
          )}
        </div>
        {/* Services */}
        <div className="space-y-[2px]">
          {post.services.slice(0, 3).map((s) => (
            <div key={s} className={`flex items-center gap-1 ${post.serviceColor}`} style={{ fontSize: "5.5px" }}>
              <span className="text-amber-400">✓</span>{s}
            </div>
          ))}
        </div>
        {/* CTA strip */}
        <div>
          <div className={`rounded px-1.5 py-[2px] text-center font-black ${post.ctaBg} ${post.ctaText}`} style={{ fontSize: "6px" }}>{post.cta}</div>
          {post.phone && <p className="mt-[2px] text-center font-bold text-zinc-400" style={{ fontSize: "5px" }}>{post.phone}</p>}
        </div>
      </div>
      {/* Action bar */}
      <div className="flex items-center justify-between bg-black/70 px-2 py-[2px]">
        <div className="flex items-center gap-2 text-zinc-500" style={{ fontSize: "5.5px" }}>
          <span>♥ {post.likes}</span><span>💬 {post.comments}</span><span>↗ {post.shares}</span>
        </div>
        <span className="rounded bg-blue-600 px-1 font-bold text-white" style={{ fontSize: "5px" }}>Boost</span>
      </div>
      {/* Caption */}
      <div className="bg-black/80 px-2 py-[2px]" style={{ fontSize: "5.5px", lineHeight: 1.35 }}>
        <span className="font-bold text-white">cozydig1tal </span>
        <span className="text-zinc-400">{post.caption.replace("cozydig1tal ", "").slice(0, 55)}…</span>
      </div>
    </div>
  );
}

function RealPostCard({ src, n }: { src: string; n: number }) {
  return (
    <div className="h-[220px] w-[124px] shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg">
      <Image src={src} alt={`Cozy Digital post ${n}`} width={248} height={440} className="h-full w-full object-cover" />
    </div>
  );
}

const realPosts = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/social-proof/post-${String(i + 1).padStart(2, "0")}.png`,
  n: i + 1,
}));

function buildRow(startReal: number, startTemplate: number, count: number): React.ReactNode[] {
  const items: React.ReactNode[] = [];
  let ri = startReal % realPosts.length;
  let ti = startTemplate % templatePosts.length;
  for (let i = 0; i < count; i++) {
    if (i % 3 === 1) {
      items.push(<RealPostCard key={`real-${ri}-r${startReal}`} src={realPosts[ri].src} n={realPosts[ri].n} />);
      ri = (ri + 1) % realPosts.length;
    } else {
      items.push(<FakePostCard key={`tpl-${ti}-s${startTemplate}`} post={templatePosts[ti]} />);
      ti = (ti + 1) % templatePosts.length;
    }
  }
  return items;
}

export default function SocialProofPosts() {
  const row1 = buildRow(0, 0, 20);
  const row2 = buildRow(5, 10, 20);

  return (
    <>
      <div className="social-row relative mb-4 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-zinc-950 to-transparent" />
        <div className="social-track-fwd flex w-max gap-4 px-4">{[...row1, ...row1]}</div>
      </div>
      <div className="social-row relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-zinc-950 to-transparent" />
        <div className="social-track-rev flex w-max gap-4 px-4">{[...row2, ...row2]}</div>
      </div>
    </>
  );
}
