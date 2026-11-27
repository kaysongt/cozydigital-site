/**
 * Keyword-targeted landing pages, one per search intent.
 *
 * Two collections share one template (src/components/keyword-page.tsx):
 *   - services:   /services/<slug>/      what we do
 *   - industries: /websites-for/<slug>/  who we do it for
 *
 * `keyword` is the primary search term the page targets and belongs in the
 * H1, title, and first paragraph. `secondaryKeywords` are close variants
 * worked into the headings and copy. These targets are a first pass; replace
 * or extend them from Google Ads Keyword Planner volume data, keeping only
 * terms people actually search.
 *
 * Same rules as the rest of the site: no amounts, turnaround promises,
 * guaranteed rankings, or invented results. Proof only names client work
 * already published on the homepage.
 */

export type KeywordPage = {
  slug: string;
  keyword: string;
  secondaryKeywords: string[];
  /** <title>; lead with the keyword. */
  title: string;
  /** Meta description, under ~160 characters. */
  description: string;
  eyebrow: string;
  h1: string;
  /** Direct answer to the search, quotable on its own. */
  intro: string;
  sections: { heading: string; body: string[] }[];
  /** Real, published client work only. */
  proof?: { name: string; detail: string; href: string };
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
};

export const servicePages: KeywordPage[] = [
  {
    slug: "small-business-website-design",
    keyword: "small business website design",
    secondaryKeywords: ["website designer for small business", "web design for small business", "custom small business website"],
    title: "Small Business Website Design | Cozy Digital",
    description:
      "Small business website design by Quincy and Kayson: clear service pages, booking or checkout, and search details set up so customers and AI tools understand you.",
    eyebrow: "Website design",
    h1: "Small business website design that explains what you do",
    intro:
      "Cozy Digital designs and builds small business websites that tell visitors what you offer, who it is for, and how to book, with every page checked on desktop and mobile before launch.",
    sections: [
      {
        heading: "What a small business website needs to do",
        body: [
          "Most visitors decide within seconds whether they are in the right place. Your homepage should answer that in one line, and each service should have its own clear description. That same structure is what search engines and AI assistants read when they decide what your business does.",
          "We organize your services, add the people behind the business, and place reviews and past work where visitors look for them. Then we connect the next step, whether that is a booking calendar, an inquiry form, or checkout.",
        ],
      },
      {
        heading: "How we work as your small business web designer",
        body: [
          "You work directly with Quincy and Kayson from the first brief to launch. We start by reviewing your current site or social profile, agree on the pages and features in writing, then design, build, and test.",
          "Every site includes structured data and a sitemap, and we check that nothing blocks search engines from reading your public pages. You own what we build when the project is done.",
        ],
      },
      {
        heading: "Built for search and AI answers",
        body: [
          "We write service descriptions and FAQs in plain, direct sentences so ChatGPT, Perplexity, and Google AI Overviews can understand and quote them. Business details stay consistent with your Google profile and social accounts.",
        ],
      },
    ],
    proof: {
      name: "Dr. Alicia Watkins",
      detail: "Therapy, coaching, courses, and retreats brought together with direct booking and product pages.",
      href: "/#client-work",
    },
    faqs: [
      {
        q: "Can you improve my existing website instead of building a new one?",
        a: "Yes. We often update copy, redesign sections, and repair booking on the site you already have. We check the platform and access first, then agree on the changes with you.",
      },
      {
        q: "How much does small business website design cost?",
        a: "It depends on the pages, features, and content involved. Current plans are listed in the Cozy Digital Client Hub, and custom projects are priced in writing before work begins.",
      },
      {
        q: "Will my website work on phones?",
        a: "Yes. Every page is designed for mobile and checked on phone and desktop sizes before launch, including forms and booking.",
      },
    ],
    related: [
      { label: "Website redesign", href: "/services/website-redesign/" },
      { label: "Landing page design", href: "/services/landing-page-design/" },
      { label: "What should a small business website include?", href: "/faq/what-should-a-small-business-website-include/" },
    ],
  },
  {
    slug: "website-redesign",
    keyword: "website redesign",
    secondaryKeywords: ["website redesign services", "redesign my website", "website refresh for small business"],
    title: "Website Redesign Services for Small Businesses | Cozy Digital",
    description:
      "Website redesign for small businesses: we review your current site, keep what works, and rebuild the pages, booking, and search details that hold you back.",
    eyebrow: "Website redesign",
    h1: "Website redesign services for small businesses",
    intro:
      "A website redesign from Cozy Digital starts with a review of your current site, keeps what already works, and rebuilds the pages, booking flow, and search details that are holding your business back.",
    sections: [
      {
        heading: "When a redesign makes sense",
        body: [
          "Common signs are visitors who rarely book, a layout that is hard to use on a phone, outdated services or details, slow pages, and a site you cannot easily update yourself.",
          "A full rebuild is not always needed. Sometimes rewriting the main pages and repairing the booking flow fixes most of the problem. We tell you which approach fits before any work begins.",
        ],
      },
      {
        heading: "How our redesign process works",
        body: [
          "We look at your site the way a new customer would and list what is missing or hard to use. Then we agree on the pages and features in writing, redesign and rebuild them, and test every page on desktop and mobile.",
          "During a redesign we also add structured data, tidy your sitemap, and keep existing page addresses working where possible so you do not lose the search visibility you already have.",
        ],
      },
    ],
    proof: {
      name: "Essential Massage by Mesha",
      detail: "Services, studio details, and appointment requests by text, with each appointment confirmed personally by Mesha.",
      href: "/#client-work",
    },
    faqs: [
      {
        q: "Will a redesign hurt my Google rankings?",
        a: "It can if old page addresses disappear without redirects. We keep existing addresses working where possible and check the sitemap and indexing settings at launch.",
      },
      {
        q: "Can you redesign a site built on Wix, Squarespace, or WordPress?",
        a: "Often, yes. We check the platform and your access first, then recommend whether to redesign on that platform or move to a new build.",
      },
    ],
    related: [
      { label: "Free Digital Presence Audit", href: "/free-audit/" },
      { label: "Small business website design", href: "/services/small-business-website-design/" },
      { label: "How do I know if my website needs a redesign?", href: "/faq/how-do-i-know-if-my-website-needs-a-redesign/" },
    ],
  },
  {
    slug: "landing-page-design",
    keyword: "landing page design",
    secondaryKeywords: ["landing page designer", "landing page for ads", "high converting landing page"],
    title: "Landing Page Design for Ads and Offers | Cozy Digital",
    description:
      "Landing page design for ads, launches, and offers: one clear message, proof, and a single next step, built and tested on mobile by Cozy Digital.",
    eyebrow: "Landing pages",
    h1: "Landing page design for ads, launches, and offers",
    intro:
      "Cozy Digital designs landing pages that focus on one offer, back it with proof, and lead visitors to a single next step, such as booking, signing up, or buying.",
    sections: [
      {
        heading: "What makes a landing page work",
        body: [
          "A landing page should match the ad or post that sent the visitor, say plainly what they get, and remove anything that distracts from the next step. Proof, like reviews or examples, sits close to the button.",
          "We build the page, connect the form, calendar, or checkout, and set up analytics so you can see where visitors come from and what they do.",
        ],
      },
      {
        heading: "Landing pages paired with AI video",
        body: [
          "Because we also produce AI video and ad creative, we can plan the ad and the page together so the message, visuals, and offer line up from the first click.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can the landing page live on my existing website?",
        a: "Usually, yes. We check your platform and access, then build the page there or as a standalone page linked to your site.",
      },
      {
        q: "Do you write the copy?",
        a: "Yes. We write the headline, sections, and calls to action around your offer, and you review everything before it goes live.",
      },
    ],
    related: [
      { label: "AI video production", href: "/services/ai-video-production/" },
      { label: "Small business website design", href: "/services/small-business-website-design/" },
    ],
  },
  {
    slug: "ai-video-production",
    keyword: "AI video production",
    secondaryKeywords: ["AI video ads", "AI commercial production", "AI generated video for business"],
    title: "AI Video Production for Ads and Social | Cozy Digital",
    description:
      "AI video production by Cozy Digital: concept, script, directed AI scenes, editing, sound, and captions for ads, social, and brand stories.",
    eyebrow: "AI video production",
    h1: "AI video production for ads, social, and brand stories",
    intro:
      "Cozy Digital produces AI videos for businesses and creators, handling the concept, script, directed AI-generated scenes, editing, sound, captions, and brand details from start to finish.",
    sections: [
      {
        heading: "What our AI video production includes",
        body: [
          "Raw AI clips rarely work as finished videos. We plan the story, keep characters and settings consistent across shots, direct each generated scene, and edit the result with sound, captions, and your brand in mind.",
          "Length, formats, and revisions are agreed for each project, so you know what you will receive before production starts.",
        ],
      },
      {
        heading: "AI video ads and social content",
        body: [
          "AI video makes it practical to produce concepts that would be expensive to film, and to test several ad ideas quickly. We check each platform's rules on AI-generated content and never use a real person's likeness without permission.",
        ],
      },
    ],
    proof: {
      name: "Dr. Boyce Watkins",
      detail: "A set of selected films, from quick social comedy to story-driven pieces, published on our homepage.",
      href: "/#ai-video",
    },
    faqs: [
      {
        q: "Can AI video be used for business ads?",
        a: "Yes, when it is directed, edited, and checked against each ad platform's rules. It works especially well for testing several ad ideas quickly.",
      },
      {
        q: "Can I see examples of your AI video work?",
        a: "Yes. Our selected films for Dr. Boyce Watkins are on the homepage in the AI video section.",
      },
    ],
    related: [
      { label: "Watch our films", href: "/#ai-video" },
      { label: "AI video courses", href: "/courses/" },
      { label: "Can AI video be used for business ads?", href: "/faq/can-ai-video-be-used-for-business-ads/" },
    ],
  },
];

export const industryPages: KeywordPage[] = [
  {
    slug: "therapists",
    keyword: "website design for therapists",
    secondaryKeywords: ["therapist website", "website for counselors", "therapy practice website"],
    title: "Website Design for Therapists and Counselors | Cozy Digital",
    description:
      "Website design for therapists and counselors: clear services, a calm layout, and direct booking, built by the team behind Dr. Alicia Watkins's site.",
    eyebrow: "Websites for therapists",
    h1: "Website design for therapists and counselors",
    intro:
      "Cozy Digital designs websites for therapists and counselors that explain your services in plain language, feel calm and trustworthy, and let new clients book or request a consultation directly.",
    sections: [
      {
        heading: "What a therapist website needs",
        body: [
          "People looking for a therapist want to know quickly whether you can help with what they are facing, how sessions work, and how to take the first step. Each service or specialty deserves its own clear description.",
          "We add your credentials and approach, an FAQ that answers common first-session questions, and a booking or consultation path that works well on a phone.",
        ],
      },
      {
        heading: "Courses, coaching, and retreats in one place",
        body: [
          "Many practices also offer courses, coaching, or events. We organize them so each offering has its own page and a clear next step, without crowding the core therapy services.",
        ],
      },
    ],
    proof: {
      name: "Dr. Alicia Watkins",
      detail: "Therapy, coaching, courses, and retreats brought together with direct booking and product pages.",
      href: "/#client-work",
    },
    faqs: [
      {
        q: "Can you connect my existing scheduling or practice tool?",
        a: "Usually, yes. We check the tool you use and connect or embed its booking on your site, then test the flow on a phone.",
      },
      {
        q: "Do you handle client health information?",
        a: "No. Your website directs people to your own booking and intake tools; we do not collect or store client health records.",
      },
    ],
    related: [
      { label: "Small business website design", href: "/services/small-business-website-design/" },
      { label: "How do I add online booking to my website?", href: "/faq/how-do-i-add-online-booking-to-my-website/" },
    ],
  },
  {
    slug: "massage-therapists",
    keyword: "website for massage therapist",
    secondaryKeywords: ["massage therapy website", "massage business website", "massage booking website"],
    title: "Website Design for Massage Therapists | Cozy Digital",
    description:
      "Website design for massage therapists: services, studio details, and appointment requests on one clear site, built by the team behind Essential Massage by Mesha.",
    eyebrow: "Websites for massage therapists",
    h1: "Website design for massage therapists",
    intro:
      "Cozy Digital builds websites for massage therapists that list your services and studio details clearly and make it easy for clients to request or book an appointment from their phone.",
    sections: [
      {
        heading: "What clients look for on a massage website",
        body: [
          "Clients want to see the services you offer, session lengths, where your studio is, and how to book. Photos of the space and a clear explanation of what to expect help first-time clients feel comfortable.",
          "We organize each service so it is easy to compare, and connect booking in the way that suits your practice, whether that is an online calendar or appointment requests you confirm personally.",
        ],
      },
      {
        heading: "Easier to find in local and AI search",
        body: [
          "We keep your business name, location, and services consistent with your Google Business Profile, and add structured data so search engines and AI assistants can describe your practice accurately.",
        ],
      },
    ],
    proof: {
      name: "Essential Massage by Mesha",
      detail: "Services, studio details, and appointment requests by text, with each appointment confirmed personally by Mesha.",
      href: "/#client-work",
    },
    faqs: [
      {
        q: "Can clients book directly from the website?",
        a: "Yes. We can embed an online booking calendar or set up appointment requests that you confirm yourself, depending on how you run your schedule.",
      },
    ],
    related: [
      { label: "Small business website design", href: "/services/small-business-website-design/" },
      { label: "How do I add online booking to my website?", href: "/faq/how-do-i-add-online-booking-to-my-website/" },
    ],
  },
  {
    slug: "churches-and-ministries",
    keyword: "church website design",
    secondaryKeywords: ["ministry website design", "website for churches", "nonprofit ministry website"],
    title: "Church and Ministry Website Design | Cozy Digital",
    description:
      "Church and ministry website design: resources, events, speaking, and giving organized around the people you serve, by the team behind Dear Pastor's Wife.",
    eyebrow: "Websites for churches and ministries",
    h1: "Church and ministry website design",
    intro:
      "Cozy Digital designs church and ministry websites that bring resources, events, speaking requests, and giving together in one place, organized around the people your ministry serves.",
    sections: [
      {
        heading: "What a ministry website needs",
        body: [
          "Visitors may be looking for an event, a resource, a way to invite you to speak, or a way to give. Each of those deserves a clear path from the homepage so nobody has to hunt.",
          "We organize your content around those needs, connect giving and event registration, and make every page easy to read on a phone.",
        ],
      },
      {
        heading: "Content and video for your ministry",
        body: [
          "Alongside the website, we can help with content ideas, email copy, and video, so announcements and teaching reach people across your channels.",
        ],
      },
    ],
    proof: {
      name: "Dear Pastor’s Wife",
      detail: "A home for resources, events, speaking, and giving, organized around the people the ministry serves.",
      href: "/#client-work",
    },
    faqs: [
      {
        q: "Can you connect online giving?",
        a: "Yes. We connect the giving platform you already use, or help you choose one, and place it where supporters can find it easily.",
      },
    ],
    related: [
      { label: "Small business website design", href: "/services/small-business-website-design/" },
      { label: "AI video production", href: "/services/ai-video-production/" },
    ],
  },
];
