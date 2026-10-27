import type { MetadataRoute } from "next";
import { faqQuestions } from "@/data/faq-questions";
import { industryPages, servicePages } from "@/data/keyword-pages";

// Required for static export (output: "export").
export const dynamic = "force-static";

const baseUrl = "https://cozydigital.org";

// Keep this list in sync with the routes under src/app. Priority/frequency are
// hints for crawlers; the home, services, and FAQ pages carry the strongest
// signals for AI search. /pricing/ is deliberately absent: it is a redirect
// stub to the Client Hub, not a page we want crawled or ranked.
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/ai-search/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/courses/ai-video-prompt-boss/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/courses/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/founders/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/free-audit/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/free-playbook/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cozy-booking/", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms/", priority: 0.3, changeFrequency: "yearly" },
  ...servicePages.map((p) => ({ path: `/services/${p.slug}/`, priority: 0.8, changeFrequency: "monthly" as const })),
  ...industryPages.map((p) => ({ path: `/websites-for/${p.slug}/`, priority: 0.8, changeFrequency: "monthly" as const })),
  ...faqQuestions.map((q) => ({ path: `/faq/${q.slug}/`, priority: 0.6, changeFrequency: "monthly" as const })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
