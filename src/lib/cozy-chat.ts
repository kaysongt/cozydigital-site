import knowledge from "../../public/chat/knowledge.json";

export type ChatLink = { label: string; href: string };
export type ChatAnswer = { text: string; links: ChatLink[]; source: "site" | "ai"; topic?: string };
export const CHAT_ENDPOINT = "https://hub.cozydigital.org/api/public/chat";
export const CHAT_MAX_LENGTH = 500;
const links: Record<string, ChatLink> = knowledge.links;

export const welcome: ChatAnswer = {
  text: "Hi! I’m Cozy’s automated guide. I can help you find the right service, explore our work, or get started with AI video. What brings you here?",
  links: [], source: "site",
};

export function linkChoices(ids: string[]): ChatLink[] {
  return [...new Set(ids)].filter(id => Object.hasOwn(links, id)).slice(0, 3).map(id => links[id]);
}

export function fallbackAnswer(): ChatAnswer {
  return {
    text: "I don’t have a confirmed answer for that yet. I can help with Cozy Digital’s services, work, courses, pricing links, and booking. For something specific to your project, the team can help.",
    links: linkChoices(["services", "booking", "contact"]), source: "site",
  };
}

export function siteAnswer(message: string): ChatAnswer | null {
  const normalize = (value: string) => value.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim().replace(/\b(websites|videos|consultations|appointments|workshops|webinars|courses|prices|quotes)\b/g, word => word.slice(0, -1));
  const normalized = normalize(message);
  if (/^(hi|hey|hello|hello there|good morning|good evening)[.! ]*$/.test(normalized)) return welcome;
  if (/^(thanks|thank you|thankyou|thank you so much|great|perfect|ok|okay)$/.test(normalized)) {
    return { text: "You’re welcome! I’m here if you need another page or want to talk through where to start.", links: [], source: "site" };
  }
  // Match whole phrases, never substrings such as “hi” in “shipping”. Prefer
  // specific phrases over generic nouns. Multi-topic questions can use AI.
  const scored = knowledge.topics.map(topic => ({ topic, score: Math.max(0, ...topic.match.map(term => {
    const phrase = normalize(term);
    return (` ${normalized} `).includes(` ${phrase} `) ? phrase.split(" ").length * 10 + phrase.length / 100 : 0;
  })) })).filter(item => item.score > 0).sort((a, b) => b.score - a.score);
  const best = scored[0];
  if (!best) return null;
  // A question asking about price/timing should not become a generic service answer.
  const intent = scored.find(item => ["pricing", "timeline", "contact", "hub", "audit"].includes(item.topic.id));
  const product = scored.find(item => ["promptboss", "workshop", "courses"].includes(item.topic.id));
  const chosen = product && ["pricing", "timeline"].includes(intent?.topic.id || "") ? product : intent || best;
  // Longer, multi-part requests need synthesis rather than a misleading one-topic reply.
  if (normalized.split(" ").length > 18 && scored.length > 1) return null;
  return { text: chosen.topic.answer, links: linkChoices(chosen.topic.links), source: "site", topic: chosen.topic.id };
}

export function parseAiAnswer(value: unknown): ChatAnswer | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  if (data.mode !== "ai" || typeof data.text !== "string" || !data.text.trim() || data.text.length > 1800) return null;
  return { text: data.text, links: linkChoices(Array.isArray(data.links) ? data.links.filter((v): v is string => typeof v === "string") : []), source: "ai" };
}
