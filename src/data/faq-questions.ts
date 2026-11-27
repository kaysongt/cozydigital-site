/**
 * Long-form "People Also Ask" pages, one per question, served at
 * /faq/<slug>/ under the /faq/ hub.
 *
 * Each question is one people actually search for. The first paragraph is the
 * direct answer, written to be quoted on its own by search and AI answer
 * engines. Later paragraphs add depth, and `related` points to the page that
 * does the work, so the internal link carries these pages' authority to it.
 *
 * Same rules as the /faq/ hub: no amounts, turnaround promises, guaranteed
 * rankings, or invented results. When Search Console shows a query one of these
 * pages ranks for that the page doesn't answer yet, add a section here.
 */

export type FaqQuestion = {
  slug: string;
  question: string;
  /** Meta description: the short answer, under ~160 characters. */
  description: string;
  /** First paragraph is the direct answer. */
  answer: string[];
  /** Optional deeper sections, added as Search Console shows new queries. */
  sections?: { heading: string; body: string[] }[];
  related: { label: string; href: string; blurb: string };
};

export const faqQuestions: FaqQuestion[] = [
  {
    slug: "what-is-generative-engine-optimization",
    question: "What is generative engine optimization (GEO)?",
    description:
      "GEO is the work of making your business easy for AI tools like ChatGPT, Perplexity, and Google AI Overviews to understand, trust, and mention.",
    answer: [
      "Generative engine optimization, or GEO, is the work of making your business easy for AI tools like ChatGPT, Perplexity, and Google AI Overviews to understand, trust, and mention in their answers.",
      "Traditional SEO aims for a spot in a list of links. GEO aims for a mention inside the answer itself. AI tools build those answers from pages they can read clearly, so GEO focuses on plain service descriptions, direct answers to customer questions, structured data, and business details that match everywhere you appear online.",
      "It does not replace SEO. Most of what helps a page rank also helps it get cited, and GEO adds attention to how quotable and consistent your information is. No one controls what an AI tool says, so GEO improves your chances rather than guaranteeing a mention.",
    ],
    related: {
      label: "AI Search Visibility",
      href: "/ai-search/",
      blurb: "See what our AI visibility work covers, from structured data to checking what assistants say about you.",
    },
  },
  {
    slug: "how-do-i-get-my-business-to-show-up-in-chatgpt",
    question: "How do I get my business to show up in ChatGPT?",
    description:
      "Make your website clearly say what you do, who you serve, and where, then keep those details consistent on Google, social profiles, and directories.",
    answer: [
      "To give your business a better chance of showing up in ChatGPT, make your website clearly state what you do, who you serve, and where, then keep those same details consistent on your Google Business Profile, social accounts, and directories.",
      "ChatGPT and similar tools lean on information they can find and confirm across several sources. A site that answers real customer questions in plain sentences, lists each service on its own page, and includes structured data gives them something solid to work with.",
      "Reviews, examples of past work, and named people behind the business add trust. Check that your site does not block search crawlers in its robots file. Then ask ChatGPT about your business and your services, note what it gets wrong or leaves out, and fix that information at the source.",
    ],
    related: {
      label: "AI Search Visibility",
      href: "/ai-search/",
      blurb: "We check how AI assistants describe your business and improve the information they draw from.",
    },
  },
  {
    slug: "what-is-the-difference-between-seo-and-geo",
    question: "What is the difference between SEO and GEO?",
    description:
      "SEO helps your pages rank in search results. GEO helps AI tools understand and mention your business inside the answers they write.",
    answer: [
      "SEO helps your pages rank in a list of search results. GEO helps AI tools understand your business well enough to mention it inside the answers they write.",
      "With SEO, success is a click from a results page. With GEO, success is being named or cited when someone asks an assistant a question like \"who builds websites for small clinics?\" The person may never see a list of links at all.",
      "The two overlap heavily. Both reward fast, crawlable pages, clear headings, and helpful content. GEO puts extra weight on short, quotable answers, structured data, and consistent business details across the web, because AI tools often combine several sources before they answer. A good plan does both at once rather than choosing one.",
    ],
    related: {
      label: "AI Search Visibility",
      href: "/ai-search/",
      blurb: "Our search visibility work covers both: pages that rank and information AI tools can quote.",
    },
  },
  {
    slug: "what-is-schema-markup-and-do-i-need-it",
    question: "What is schema markup, and does my small business need it?",
    description:
      "Schema markup is code that tells search engines and AI tools exactly what your business is, what you offer, and how to reach you.",
    answer: [
      "Schema markup is a small block of code on your website that tells search engines and AI tools exactly what your business is, what services you offer, and how to contact you. Most small businesses benefit from adding it.",
      "Visitors never see it. It sits in the page as structured data using the shared schema.org vocabulary, so a machine does not have to guess whether a line of text is your phone number, your hours, or a service name.",
      "Common types for a service business are Organization or LocalBusiness, Service, and FAQPage. The markup has to match what the visible page says, or search engines may ignore it. It will not lift a weak page on its own, but it removes guesswork and supports the rest of your search and AI visibility work.",
    ],
    related: {
      label: "AI Search Visibility",
      href: "/ai-search/",
      blurb: "We add schema markup for your business and services and check it against what your pages say.",
    },
  },
  {
    slug: "do-small-businesses-need-a-website-if-they-have-social-media",
    question: "Does a small business need a website if it has social media?",
    description:
      "Yes. Social profiles are useful, but a website is the one place you control that search engines, AI tools, and customers can always find.",
    answer: [
      "Yes. Social media is useful for reaching people, but a website is the one place you fully control, and it is what search engines, AI tools, and many customers check before they contact you.",
      "Social platforms change their rules and reach often, and posts get buried within days. A website keeps your services, prices or plans, booking, reviews, and contact details organized in one stable place that you own.",
      "It also helps you get found. Google and AI assistants read websites far more reliably than social feeds, so a clear site makes your business easier to recommend. The best setup uses both: social media to start conversations and a website to answer questions and turn interest into bookings.",
    ],
    related: {
      label: "Website design",
      href: "/services/",
      blurb: "We design and build websites around your business, with booking or checkout connected.",
    },
  },
  {
    slug: "what-should-a-small-business-website-include",
    question: "What should a small business website include?",
    description:
      "A clear statement of what you do and for whom, a page per service, proof of past work, an easy way to book or contact you, and accurate business details.",
    answer: [
      "A small business website should include a clear statement of what you do and who you serve, a page or section for each service, proof such as reviews and past work, an easy way to book or contact you, and accurate business details.",
      "Visitors decide quickly whether they are in the right place, so the top of your homepage should answer that in one line. Each service deserves its own description, because that is also what search engines and AI tools match to people's questions.",
      "Add the people behind the business, a short FAQ, and your location or service area. Make the booking or inquiry form work well on a phone, since that is where most visitors arrive. Finally, check that pages load quickly and that nothing blocks search engines from reading them.",
    ],
    related: {
      label: "Free Digital Presence Audit",
      href: "/free-audit/",
      blurb: "Not sure what your site is missing? We review it for free and send the three changes we would make first.",
    },
  },
  {
    slug: "how-do-i-know-if-my-website-needs-a-redesign",
    question: "How do I know if my website needs a redesign?",
    description:
      "Signs include visitors not booking, a hard-to-use mobile layout, outdated services or details, slow pages, and a site you cannot easily update.",
    answer: [
      "Your website may need a redesign if visitors rarely book or reach out, the site is hard to use on a phone, your services or details are out of date, pages load slowly, or you cannot easily make changes yourself.",
      "Look at it the way a new customer would. Can you tell what the business does within a few seconds? Is the next step, like booking or calling, obvious? Does it still look like the business you run today?",
      "A full redesign is not always the answer. Often rewriting the main pages, repairing the booking flow, and tidying up search information fixes most of the problem on the site you already have. Reviewing the site first tells you whether small fixes, a rebuild, or something in between makes sense.",
    ],
    related: {
      label: "Free Digital Presence Audit",
      href: "/free-audit/",
      blurb: "We review your site as a new visitor would and tell you whether it needs fixes or a rebuild.",
    },
  },
  {
    slug: "how-much-does-a-small-business-website-cost",
    question: "How much does a small business website cost?",
    description:
      "It depends on the number of pages, custom design, booking or checkout, and who writes the content. Get the scope in writing before work starts.",
    answer: [
      "The cost of a small business website depends on how many pages you need, how custom the design is, whether it includes booking, checkout, or other integrations, and who writes the content and provides the photos.",
      "A simple site with a few pages costs far less than one with online payments, client accounts, or many service pages. Ongoing costs matter too: hosting, your domain, software subscriptions, and someone to handle updates.",
      "Before comparing quotes, list the pages and features you need and ask each provider what is included, what counts as a change, and who owns the site when it is finished. At Cozy Digital, current plans are listed in our Client Hub, and custom projects are priced in writing before any work begins.",
    ],
    related: {
      label: "Our services",
      href: "/services/",
      blurb: "See what goes into a Cozy Digital website project, then review plans in the Client Hub.",
    },
  },
  {
    slug: "how-do-i-add-online-booking-to-my-website",
    question: "How do I add online booking to my website?",
    description:
      "Choose a scheduling tool, set your services and availability, then embed it on your site or link to it from a clear button on every page.",
    answer: [
      "To add online booking to your website, choose a scheduling tool, set up your services, durations, and availability in it, then embed the booking calendar on a page of your site or link to it from a clear button on every page.",
      "Popular options include Calendly, Google Calendar appointment schedules, Square Appointments, and tools built into website platforms. Pick one that connects to the calendar you already use, sends reminders, and takes deposits if you need them.",
      "Once it is live, test it on a phone from start to finish. Confirm that you and the customer both receive the confirmation email, that reminders go out, and that cancellations free up the slot. A booking button that is easy to find usually matters more than which tool you choose.",
    ],
    related: {
      label: "Booking and follow-up workflows",
      href: "/services/",
      blurb: "We connect forms, calendars, reminders, and customer emails, then test the whole flow.",
    },
  },
  {
    slug: "can-ai-video-be-used-for-business-ads",
    question: "Can AI video be used for business ads?",
    description:
      "Yes. AI video can produce ad concepts and scenes that would be costly to film, as long as it is directed, edited, and checked against platform rules.",
    answer: [
      "Yes. AI video can be used for business ads, and it lets you produce scenes and concepts that would be expensive or impractical to film, as long as the video is carefully directed, edited, and checked before it runs.",
      "Raw AI clips rarely work as finished ads. A strong ad still needs a clear concept, a script, consistent characters and settings across shots, sound, captions, and your brand details, which is where planning and editing come in.",
      "Check each ad platform's rules on AI-generated or altered content, and avoid using real people's likenesses without permission. AI video works especially well for testing several ad ideas quickly, social content, and story-driven pieces that would otherwise need a full production crew.",
    ],
    related: {
      label: "AI video production",
      href: "/#ai-video",
      blurb: "Watch the films we have produced and see how we plan, direct, and edit AI video.",
    },
  },
];

export const faqQuestionBySlug = new Map(faqQuestions.map((q) => [q.slug, q]));
