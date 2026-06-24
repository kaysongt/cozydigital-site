/**
 * Site-wide JSON-LD structured data.
 *
 * This is the backbone of GEO (Generative Engine Optimization): answer engines
 * like ChatGPT Search, Perplexity, and Google AI Overviews read schema.org
 * markup to understand *what* Cozy Digital is, what it offers, and whether to
 * cite it. Every value here is factual — no invented stats, reviews, or
 * contact details. Add those only when they are real.
 */

const baseUrl = "https://www.cozydigital.org";

const organization = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${baseUrl}/#organization`,
  name: "Cozy Digital",
  url: baseUrl,
  logo: `${baseUrl}/brand/cozy-digital-logo.jpg`,
  image: `${baseUrl}/og-image.png`,
  description:
    "Cozy Digital builds websites, content systems, and lead paths for service brands, including AI search (GEO) optimization so businesses show up when customers ask ChatGPT, Perplexity, and Google AI for a recommendation.",
  slogan: "Turn first-time visitors into booked clients.",
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
    "AI video production",
    "Content strategy",
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
          "Structured data, quotable answer content, consistent business identity, and trust signals that make AI answer engines like ChatGPT, Perplexity, and Google AI Overviews recommend your business.",
        url: `${baseUrl}/ai-search/`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "AI Video Production",
        serviceType: "AI-assisted video production",
        description:
          "Short-form ads, explainers, and cinematic trailers produced with OpenMontage, an open-source agentic video engine: research, scripting, AI-generated motion clips, narration, captions, and final composition.",
        url: `${baseUrl}/ai-video/`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Full Build Package",
        description:
          "A custom 5-page website plus landing page, direct booking system, Google Business Profile and local SEO setup, social branding, automated follow-up, and an analytics dashboard, built to launch in 90 days.",
      },
      price: "3400",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Monthly Retainer",
        description:
          "Ongoing website maintenance, local SEO and Google Profile management, 8 social posts per month, ad management, and a monthly analytics report and strategy call. No long-term contract.",
      },
      price: "1000",
      priceCurrency: "USD",
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
      // JSON-LD is data, not user input — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
