/**
 * Site-wide JSON-LD structured data.
 *
 * This is the backbone of GEO (Generative Engine Optimization): answer engines
 * like ChatGPT Search, Perplexity, and Google AI Overviews read schema.org
 * markup to understand *what* Cozy Digital is, what it offers, and whether to
 * cite it. Every value here is factual, with no invented stats, reviews, or
 * contact details. Add those only when they are real.
 *
 * Service offers here carry no `price`. Plan pricing for client work lives in
 * the Client Hub, and duplicating an amount in schema is how a site ends up
 * quoting a number it no longer honours. The AI Academy course is the one
 * exception: it has a single fixed price sold through Stripe on /ai-academy/,
 * and the two must always match.
 */

const baseUrl = "https://cozydigital.org";

const organization = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${baseUrl}/#organization`,
  name: "Cozy Digital",
  url: baseUrl,
  logo: `${baseUrl}/brand/cozy-digital-logo.jpg`,
  image: `${baseUrl}/og-image.png`,
  description:
    "Cozy Digital helps service businesses improve their overall digital presence: websites and landing pages, brand messaging, content and social presence, short-form and AI-assisted video, booking and lead systems, follow-up and automation, local search and AI visibility, and analytics. AI search (GEO) optimization is offered as one part of that complete system.",
  slogan: "Improve how customers find you, understand you, trust you, and take action online.",
  sameAs: [
    "https://www.instagram.com/cozydig1tal/",
    "https://www.facebook.com/profile.php?id=61588838257133",
  ],
  knowsAbout: [
    "Web design",
    "Conversion optimization",
    "Local SEO",
    "Generative Engine Optimization (GEO)",
    "AI search visibility",
    "AI training for small businesses",
    "Content strategy",
    "Short-form video and ad creative",
    "AI-assisted video production",
    "Marketing automation",
    "Lead generation systems",
  ],
  areaServed: { "@type": "Place", name: "United States" },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "AI Search Visibility (GEO)",
        serviceType: "Generative Engine Optimization",
        description:
          "Structured data, quotable answer content, consistent business identity, and trust signals that improve a business's ability to appear in AI answer engines like ChatGPT, Perplexity, and Google AI Overviews.",
        url: `${baseUrl}/ai-search/`,
      },
    },
    {
      "@type": "Offer",
      price: "149.00",
      priceCurrency: "USD",
      itemOffered: {
        "@type": "Course",
        name: "The AI Advantage Blueprint",
        description:
          "Cozy Digital AI Academy's flagship course: a practical, self-paced AI implementation course for small business owners. Nine interactive modules and a built-in workbook covering an AI opportunity audit, prompting, marketing, customer communication, operations, no-code automations, privacy and compliance (HIPAA-aware), and a 30-day implementation plan.",
        url: `${baseUrl}/ai-academy/`,
        provider: { "@id": `${baseUrl}/#organization` },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Website Design and Ongoing Care",
        description:
          "Custom websites and landing pages for service businesses, plus ongoing edits, updates, and maintenance so the site stays current after launch.",
        url: `${baseUrl}/services/`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "AI Video and Ad Creative",
        description:
          "Short-form vertical video for Reels, Shorts, and paid placements, produced with a mix of AI tooling and hands-on editing: hooks, cuts, captions, and on-brand art direction.",
        url: `${baseUrl}/services/`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Automation and Follow-Up Systems",
        description:
          "Booking, intake, reminders, and follow-up connected into one workflow so inquiries are answered without manual chasing.",
        url: `${baseUrl}/services/`,
      },
    },
  ],
};

const website = {
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  url: baseUrl,
  name: "Cozy Digital",
  publisher: { "@id": `${baseUrl}/#organization` },
};

export default function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is data, not user input, so it is safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
