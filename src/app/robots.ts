import type { MetadataRoute } from "next";

// Required for static export (output: "export").
export const dynamic = "force-static";

const baseUrl = "https://www.cozydigital.org";

// Explicitly welcome the AI search crawlers that power answer engines and
// generative search. Being readable to these bots is what makes Cozy Digital
// eligible to be cited in ChatGPT, Perplexity, Google AI Overviews, etc.
const aiSearchCrawlers = [
  "GPTBot", // OpenAI training/index crawler
  "OAI-SearchBot", // ChatGPT Search
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "ClaudeBot", // Anthropic crawler
  "anthropic-ai", // Anthropic (legacy UA)
  "Claude-Web", // Claude browsing
  "PerplexityBot", // Perplexity index
  "Perplexity-User", // Perplexity browsing
  "Google-Extended", // Gemini / Google AI training & grounding
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot",
  "Bytespider", // TikTok / Doubao
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiSearchCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
