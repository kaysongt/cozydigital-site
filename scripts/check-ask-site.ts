/**
 * Smoke tests for Lamp’s grounded matcher.
 * Run with: node --experimental-strip-types --no-warnings scripts/check-ask-site.ts
 */

import { answerQuestion } from "../src/lib/ask-site";
import { HELPER_NAME } from "../src/data/site-knowledge";

const hits: Array<[string, string]> = [
  ["Can I book just a website or a video?", "website-or-video"],
  ["Can I book a website?", "website-or-video"],
  ["Who will I work with?", "who-you-work-with"],
  ["What should I send you?", "what-to-send"],
  ["What happens after launch?", "after-launch"],
  ["How do I book a call?", "booking"],
  ["Do you use Calendly?", "booking"],
  ["Is booking on Google Calendar?", "booking"],
  ["Who is Quincy?", "quincy"],
  ["Who is Kayson?", "kayson"],
  ["Who are the founders?", "founders"],
  ["What is the Client Hub?", "client-hub"],
  ["What is Cozy Hub?", "client-hub"],
  ["How much does a website cost?", "pricing"],
  ["Is the audit free?", "audit-free"],
  ["What is a Digital Presence Audit?", "free-audit"],
  ["Where is the free playbook?", "playbook"],
  ["What services do you offer?", "services"],
  ["Do you produce AI video?", "ai-video"],
  ["Can you design a website?", "website-design"],
  ["Do you set up booking systems?", "booking-systems"],
  ["Will I be locked into a contract?", "contracts"],
  ["How long does a project take?", "timeline"],
];

const unknown = [
  "what's the weather in Chicago",
  "write me a poem about cats",
  "how do I make sourdough",
  "who won the super bowl",
  "explain quantum physics",
  "what is Foggy",
  "tell me a joke",
  "best restaurants nearby",
];

const failures: string[] = [];

if (/foggy/i.test(HELPER_NAME)) {
  failures.push(`helper name "${HELPER_NAME}" is Foggy-like`);
}

for (const [question, id] of hits) {
  const result = answerQuestion(question);
  if (result.status !== "answered") {
    failures.push(`expected "${question}" to hit ${id}, got ${result.status}`);
    continue;
  }
  if (result.id !== id) {
    failures.push(`expected "${question}" to hit ${id}, got ${result.id}`);
  }
}

for (const question of unknown) {
  const result = answerQuestion(question);
  if (result.status === "answered") {
    failures.push(`expected "${question}" to be refused, got ${result.id}`);
  }
}

const empty = answerQuestion("   ");
if (empty.status !== "empty") {
  failures.push(`blank input should be empty, got ${empty.status}`);
}

if (failures.length) {
  console.error(`\n✗ Lamp matcher failed (${failures.length}):`);
  for (const failure of failures) console.error(`  · ${failure}`);
  console.error("");
  process.exit(1);
}

console.log(`✓ Lamp matcher passed (${hits.length} hits, ${unknown.length} refusals)`);
