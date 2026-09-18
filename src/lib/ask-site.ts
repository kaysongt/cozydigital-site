/**
 * Client-side matcher for Lamp. No network, no model: score a question
 * against the curated site corpus and refuse anything that isn't grounded.
 */

import {
  ASK_BOOKING_HREF,
  ASK_BOOKING_LABEL,
  ASK_EMPTY_ANSWER,
  ASK_FALLBACK_HREF,
  ASK_FALLBACK_LABEL,
  ASK_UNKNOWN_ANSWER,
  SITE_KNOWLEDGE,
  type KnowledgeEntry,
} from "../data/site-knowledge";

export type AskHit = {
  status: "answered";
  answer: string;
  href: string;
  hrefLabel: string;
  external?: boolean;
  topic: string;
  id: string;
};

export type AskUnknown = {
  status: "unknown";
  answer: string;
  href: string;
  hrefLabel: string;
  ctaHref: string;
  ctaLabel: string;
  suggestion?: { href: string; hrefLabel: string; topic: string };
};

export type AskEmpty = {
  status: "empty";
  answer: string;
};

export type AskResult = AskHit | AskUnknown | AskEmpty;

const STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "to",
  "of",
  "in",
  "on",
  "at",
  "for",
  "is",
  "are",
  "am",
  "was",
  "be",
  "do",
  "does",
  "did",
  "can",
  "could",
  "would",
  "should",
  "i",
  "me",
  "my",
  "we",
  "our",
  "you",
  "your",
  "it",
  "its",
  "this",
  "that",
  "with",
  "from",
  "please",
  "tell",
  "need",
  "want",
  "like",
  "just",
  "also",
  "any",
  "else",
  "there",
  "here",
  "how",
  "what",
  "when",
  "why",
  "which",
  "who",
]);

/** Minimum score before Lamp will answer from an entry. */
const HIT_THRESHOLD = 10;

/** A weaker score can still become the “closest page” on a refusal. */
const SUGGEST_THRESHOLD = 6;

export function normalizeQuestion(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function tokenize(value: string): string[] {
  return normalizeQuestion(value)
    .split(" ")
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

function padded(value: string): string {
  return ` ${normalizeQuestion(value)} `;
}

function scoreEntry(query: string, entry: KnowledgeEntry): number {
  const haystack = padded(query);
  const queryTokens = new Set(tokenize(query));
  let score = 0;

  for (const phrase of entry.phrases) {
    const needle = padded(phrase);
    if (needle.trim() && haystack.includes(needle)) {
      const words = normalizeQuestion(phrase).split(" ").filter(Boolean);
      score += 12 + words.length * 3;
      continue;
    }
    const phraseTokens = tokenize(phrase);
    if (!phraseTokens.length) continue;
    const overlap = phraseTokens.filter((token) => queryTokens.has(token));
    if (overlap.length === phraseTokens.length && phraseTokens.length >= 2) {
      score += 8;
    } else if (overlap.length) {
      score += overlap.length;
    }
  }

  for (const term of entry.terms) {
    const needle = padded(term);
    if (needle.trim() && haystack.includes(needle)) {
      score += 3;
    }
  }

  return score;
}

function ranked(query: string): { entry: KnowledgeEntry; score: number }[] {
  return SITE_KNOWLEDGE.map((entry) => ({
    entry,
    score: scoreEntry(query, entry),
  })).sort((a, b) => b.score - a.score);
}

export function answerQuestion(raw: string): AskResult {
  const query = raw.trim();
  if (query.length < 2) {
    return { status: "empty", answer: ASK_EMPTY_ANSWER };
  }

  const results = ranked(query);
  const best = results[0];

  if (best && best.score >= HIT_THRESHOLD) {
    return {
      status: "answered",
      answer: best.entry.answer,
      href: best.entry.href,
      hrefLabel: best.entry.hrefLabel,
      external: best.entry.external,
      topic: best.entry.topic,
      id: best.entry.id,
    };
  }

  const suggestion =
    best && best.score >= SUGGEST_THRESHOLD
      ? {
          href: best.entry.href,
          hrefLabel: best.entry.hrefLabel,
          topic: best.entry.topic,
        }
      : undefined;

  const answer = suggestion
    ? `${ASK_UNKNOWN_ANSWER} If you meant ${suggestion.topic}, start here: ${suggestion.hrefLabel}.`
    : ASK_UNKNOWN_ANSWER;

  return {
    status: "unknown",
    answer,
    href: ASK_FALLBACK_HREF,
    hrefLabel: ASK_FALLBACK_LABEL,
    ctaHref: ASK_BOOKING_HREF,
    ctaLabel: ASK_BOOKING_LABEL,
    suggestion,
  };
}
