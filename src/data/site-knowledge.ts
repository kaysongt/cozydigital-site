/**
 * Curated answers for Lamp, the homepage FAQ helper.
 *
 * Every answer is taken from public Cozy Digital pages. Do not add prices,
 * timelines, guarantees, or other facts that are not already on the site.
 * Plans and credit amounts live in the Client Hub — point there, never quote.
 */

import {
  CLIENT_HUB_LABEL,
  CLIENT_HUB_URL,
} from "../lib/client-hub";

export type KnowledgeEntry = {
  id: string;
  topic: string;
  href: string;
  hrefLabel: string;
  /** Hub and other off-site destinations open in a new tab. */
  external?: boolean;
  /** Contiguous phrases that strongly select this entry. */
  phrases: string[];
  /** Extra tokens that add score when present in the question. */
  terms: string[];
  answer: string;
};

export const HELPER_NAME = "Lamp";

export const ASK_UNKNOWN_ANSWER =
  `${HELPER_NAME} only answers from Cozy Digital’s public pages, not the open web. If you want a website or video, the free audit and a 30-minute call are the closest next steps.`;

export const ASK_EMPTY_ANSWER = `Type a short question about Cozy Digital. ${HELPER_NAME} answers from this site — services, the free audit, booking, the founders, and the ${CLIENT_HUB_LABEL}.`;

export const ASK_FALLBACK_HREF = "/free-audit/#audit-form";
export const ASK_FALLBACK_LABEL = "Get the free audit";
export const ASK_BOOKING_HREF = "/cozy-booking/";
export const ASK_BOOKING_LABEL = "Book a 30-minute call";

export const SITE_KNOWLEDGE: KnowledgeEntry[] = [
  {
    id: "website-or-video",
    topic: "Booking a website or a video",
    href: "/#faq-heading",
    hrefLabel: "Homepage details",
    phrases: [
      "just a website",
      "just a video",
      "book a website",
      "book a video",
      "website or a video",
      "website or video",
      "only a website",
      "only a video",
      "separately",
    ],
    terms: ["separately", "either", "one", "both"],
    answer:
      "Yes. Each is available separately. We agree the scope, price, and delivery schedule with you before work starts.",
  },
  {
    id: "who-you-work-with",
    topic: "Who you work with",
    href: "/founders/",
    hrefLabel: "Meet the founders",
    phrases: [
      "who will i work",
      "who do i work",
      "who will we work",
      "who do we work",
      "work with",
      "work directly",
      "talk to a founder",
      "contact you",
      "get in touch",
    ],
    terms: ["contact", "account", "manager", "directly"],
    answer:
      "You work directly with Quincy and Kayson. We handle the project details, review your feedback, and check the work before delivery.",
  },
  {
    id: "what-to-send",
    topic: "What to send before a project",
    href: "/#faq-heading",
    hrefLabel: "Homepage details",
    phrases: [
      "what should i send",
      "what do i send",
      "what to send",
      "what do you need",
      "what should i bring",
      "references you like",
    ],
    terms: ["send", "bring", "materials", "references", "brief"],
    answer:
      "Your business name, existing site or social profile, and what you need made. References you like are useful too.",
  },
  {
    id: "after-launch",
    topic: "After launch",
    href: "/services/",
    hrefLabel: "Services",
    phrases: [
      "after launch",
      "after the launch",
      "once it launches",
      "ongoing updates",
      "ongoing support",
      "site updates",
    ],
    terms: ["maintenance", "support", "afterward", "afterwards"],
    answer:
      "We can handle ongoing updates, content, and support. Clients use the hub to send requests, review work, and keep files together.",
  },
  {
    id: "services",
    topic: "Services",
    href: "/services/",
    hrefLabel: "All services",
    phrases: [
      "what do you offer",
      "what do you do",
      "what services",
      "your services",
      "capabilities",
      "what we take on",
    ],
    terms: ["services", "offer", "studio", "capabilities"],
    answer:
      "Cozy Digital takes on website design, AI video production, content and campaigns, and ongoing support. Quincy and Kayson work with you from the first brief through delivery.",
  },
  {
    id: "website-design",
    topic: "Website design",
    href: "/services/",
    hrefLabel: "Website services",
    phrases: [
      "website design",
      "web design",
      "build a website",
      "new website",
      "landing page",
      "landing pages",
      "redesign",
    ],
    terms: ["website", "websites", "site", "pages", "checkout", "development"],
    answer:
      "We design and build new websites, landing pages, booking, and checkout. Every page is checked on desktop and mobile before launch. We can also improve a site you already have.",
  },
  {
    id: "ai-video",
    topic: "AI video production",
    href: "/#ai-video",
    hrefLabel: "Video showcase",
    phrases: [
      "ai video",
      "video production",
      "produce video",
      "make a video",
      "make videos",
      "film",
      "films",
    ],
    terms: ["video", "videos", "ad", "ads", "creative", "scenes", "edit"],
    answer:
      "AI video production is one of our two main services, alongside website design. We plan the concept, direct the generated scenes, and edit the video with sound, captions, and your brand details. Examples are in the video showcase on the homepage.",
  },
  {
    id: "content-campaigns",
    topic: "Content and campaigns",
    href: "/services/",
    hrefLabel: "Content support",
    phrases: [
      "content and campaigns",
      "social media",
      "social posts",
      "email copy",
      "ad creative",
      "captions",
    ],
    terms: ["content", "campaigns", "email", "social", "templates", "marketing"],
    answer:
      "We prepare content ideas, captions, email copy, video, and reusable templates around your services and offers. The channels, number of pieces, and publishing schedule are agreed in your scope.",
  },
  {
    id: "search-visibility",
    topic: "Search and AI visibility",
    href: "/ai-search/",
    hrefLabel: "AI search",
    phrases: [
      "ai search",
      "ai visibility",
      "generative engine",
      "structured data",
      "show up in chatgpt",
      "perplexity",
      "google ai",
    ],
    terms: ["seo", "geo", "search", "crawler", "schema", "visibility"],
    answer:
      "We review how AI search tools describe your business, then improve the information on your website and profiles where needed. That can include service pages, FAQs, structured data, and crawler access. Mentions and rankings are not guaranteed.",
  },
  {
    id: "existing-website",
    topic: "Improving an existing website",
    href: "/faq/",
    hrefLabel: "FAQ",
    phrases: [
      "existing website",
      "current website",
      "improve my website",
      "update my site",
      "need a new website",
      "rebuild",
    ],
    terms: ["existing", "current", "improve", "update", "fix", "rebuild"],
    answer:
      "Not necessarily a new site. In many cases we improve the one you already have. We can update page copy, redesign sections, repair forms, improve booking, and review search information after checking the platform and access.",
  },
  {
    id: "free-audit",
    topic: "Free Digital Presence Audit",
    href: "/free-audit/#audit-form",
    hrefLabel: "Request a free audit",
    phrases: [
      "digital presence audit",
      "free audit",
      "website review",
      "free review",
      "first impression",
      "three changes",
    ],
    terms: ["audit", "review", "impression"],
    answer:
      "The Digital Presence Audit is a free review of your website or social profile. We send back three changes we would make first, with an explanation of what each change would address. A follow-up call is optional.",
  },
  {
    id: "audit-covers",
    topic: "What the audit covers",
    href: "/free-audit/",
    hrefLabel: "Audit details",
    phrases: [
      "what does the audit",
      "audit cover",
      "audit check",
      "what do you review",
      "what you review",
    ],
    terms: ["covers", "check", "review", "messaging", "reviews"],
    answer:
      "We check your service descriptions, reviews, past work, content, booking or inquiry form, and business information in search. We use the site as a new visitor would and note anything missing or difficult to use.",
  },
  {
    id: "audit-free",
    topic: "The audit is free",
    href: "/free-audit/#audit-form",
    hrefLabel: "Request a free audit",
    phrases: [
      "is the audit free",
      "audit really free",
      "does the audit cost",
      "pay for the audit",
      "charge for the audit",
    ],
    terms: ["free", "charge", "cost", "hire"],
    answer:
      "Yes. There is no charge or requirement to hire us. You can use the recommendations yourself or share them with the person who maintains your site.",
  },
  {
    id: "audit-after",
    topic: "After you request an audit",
    href: "/faq/",
    hrefLabel: "FAQ",
    phrases: [
      "after i request an audit",
      "after i submit",
      "what happens after the audit",
      "who reviews the audit",
    ],
    terms: ["request", "submit", "email", "recommendations"],
    answer:
      "Quincy and Kayson receive your request, review the links, and email the recommendations. You can book a call afterward if you want to discuss them.",
  },
  {
    id: "playbook",
    topic: "Free playbook",
    href: "/free-playbook/",
    hrefLabel: "Get the playbook",
    phrases: [
      "free playbook",
      "brand playbook",
      "booking-ready",
      "booking ready",
      "download the pdf",
      "download the playbook",
    ],
    terms: ["playbook", "pdf", "download", "guide", "workbook"],
    answer:
      "The Booking-Ready Brand Playbook is a free PDF. Answer a few questions about your business, then download it. You can also book a free 30-minute call to discuss your site.",
  },
  {
    id: "booking",
    topic: "Booking a call",
    href: "/cozy-booking/",
    hrefLabel: "Schedule a call",
    phrases: [
      "book a call",
      "schedule a call",
      "book a meeting",
      "google calendar",
      "google meet",
      "calendly",
      "consultation",
      "30-minute",
      "30 minute",
      "free consultation",
      "booking page",
    ],
    terms: [
      "book",
      "booking",
      "schedule",
      "calendar",
      "appointment",
      "call",
      "meet",
      "meeting",
      "consult",
    ],
    answer:
      "Book a free 30-minute consultation on the booking page. Scheduling uses Google Calendar (not Calendly). Calls are 30 minutes on Google Meet, weekdays from 9 a.m. to 5 p.m. CT.",
  },
  {
    id: "booking-systems",
    topic: "Booking and follow-up systems",
    href: "/services/",
    hrefLabel: "Automation & workflows",
    phrases: [
      "booking system",
      "booking form",
      "lead intake",
      "set up booking",
      "setup booking",
      "online booking",
      "follow-up",
      "follow up",
    ],
    terms: ["scheduling", "intake", "workflow", "forms", "calendars", "reminders"],
    answer:
      "We connect forms, calendars, reminders, and customer emails. First we map who needs each inquiry and what should happen next, then build and test the workflow.",
  },
  {
    id: "contact",
    topic: "How to reach the studio",
    href: "/cozy-booking/",
    hrefLabel: "Schedule a call",
    phrases: ["email", "e-mail", "reach you", "phone number", "quincy@"],
    terms: ["email", "reach", "touch"],
    answer:
      "You work directly with Quincy and Kayson. Book a 30-minute call, request a free audit, or email Quincy at quincy@cozydigital.org.",
  },
  {
    id: "founders",
    topic: "The founders",
    href: "/founders/",
    hrefLabel: "Meet the founders",
    phrases: [
      "the founders",
      "who founded",
      "who owns",
      "who runs",
      "the team",
      "two-person",
      "two person",
      "meet the founders",
    ],
    terms: ["founders", "founder", "owners", "team", "studio"],
    answer:
      "Cozy Digital is run by Quincy and Kayson. Quincy leads design, development, and campaigns. Kayson handles workflow planning, integrations, and testing. You work with both of them.",
  },
  {
    id: "quincy",
    topic: "Quincy",
    href: "/founders/#quincy",
    hrefLabel: "Quincy’s profile",
    phrases: ["quincy", "lead developer", "plainfield"],
    terms: ["quincy", "developer", "hosting", "campaigns"],
    answer:
      "Quincy is Founder & Lead Developer. He started Cozy Digital in 2024, designs and builds client websites end to end, directs video campaigns, and builds studio tools including the Client Hub. He is based in Plainfield, Illinois.",
  },
  {
    id: "kayson",
    topic: "Kayson",
    href: "/founders/#kayson",
    hrefLabel: "Kayson’s profile",
    phrases: ["kayson", "analytics consultant", "sibel"],
    terms: ["kayson", "analyst", "workflow", "testing", "booking"],
    answer:
      "Kayson is Founder & Analytics Consultant. He maps booking, scheduling, lead intake, and follow-up, then connects and tests those workflows. He joined the studio in November 2025 and is based in Chicago, Illinois.",
  },
  {
    id: "client-hub",
    topic: CLIENT_HUB_LABEL,
    href: CLIENT_HUB_URL,
    hrefLabel: `Open the ${CLIENT_HUB_LABEL}`,
    external: true,
    phrases: [
      "client hub",
      "cozy hub",
      "cozy client hub",
      "client portal",
      "my account",
      "sign in",
      "sign-in",
      "login",
      "log in",
    ],
    terms: ["hub", "portal", "account", "credits", "requests", "login"],
    answer:
      `Open the ${CLIENT_HUB_LABEL} from the header or footer. You can review plans, create an account, buy credits, and manage requests there. Existing clients use the same sign-in to view their work and progress.`,
  },
  {
    id: "pricing",
    topic: "Plans and pricing",
    href: CLIENT_HUB_URL,
    hrefLabel: `${CLIENT_HUB_LABEL} plans`,
    external: true,
    phrases: [
      "how much",
      "what does it cost",
      "pricing",
      "price list",
      "your plans",
      "credit packs",
      "how much does",
    ],
    terms: ["cost", "price", "pricing", "rates", "plans", "credits", "quote"],
    answer:
      `Current plans, credit packs, and request costs are listed in the ${CLIENT_HUB_LABEL}. For a custom project, we confirm the deliverables and price with you in writing before work begins.`,
  },
  {
    id: "timeline",
    topic: "Project timeline",
    href: "/faq/",
    hrefLabel: "FAQ",
    phrases: [
      "how long",
      "how long does",
      "timeline",
      "turnaround",
      "how soon",
    ],
    terms: ["timeline", "duration", "weeks", "months", "milestones"],
    answer:
      "The timeline depends on the pages, video deliverables, integrations, and content involved. We agree on milestones before starting and let you know when we need feedback or materials to keep the project moving.",
  },
  {
    id: "contracts",
    topic: "Contracts",
    href: "/faq/",
    hrefLabel: "FAQ",
    phrases: [
      "long-term contract",
      "long term contract",
      "locked in",
      "locked into",
      "month to month",
      "month-to-month",
      "retainer",
      "a contract",
    ],
    terms: ["contract", "contracts", "commitment", "cancel"],
    answer:
      "No long-term lock-in. Project work is a defined scope with a clear end, and you own what we build when it's done. Ongoing support runs month to month, so you can scale up or pause as your needs change.",
  },
  {
    id: "courses",
    topic: "Courses",
    href: "/courses/",
    hrefLabel: "Courses",
    phrases: [
      "prompt boss",
      "ai advantage",
      "ai academy",
      "your courses",
      "online course",
    ],
    terms: ["course", "courses", "academy", "lessons", "playbooks"],
    answer:
      "Cozy Digital offers courses and playbooks on the Courses page, including AI Video Prompt Boss and The AI Advantage Blueprint. Details and checkout are listed there.",
  },
];
