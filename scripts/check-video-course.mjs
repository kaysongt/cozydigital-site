import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const { cozyVideoCourse: course, getCozyVideoCheckout, validateCozyVideoCheckout } = await import("../src/data/cozy-ai-video-course.ts");
assert.equal(course.id, "cozy-ai-video-course");
assert.equal(course.launchPrice, 75);
assert.equal(course.plannedRegularPrice, 150);
assert.equal(course.launchPrice / course.plannedRegularPrice, 0.5);
assert.equal(course.currency, "USD");
assert.equal(course.curriculum.length, 7);
assert.equal(course.salesEnabled, false, "Enrollment remains gated until launch QA");
assert.equal(getCozyVideoCheckout(), null);
const canonical = "https://hub.cozydigital.org/courses/cozy-ai-video-course/";
assert.equal(validateCozyVideoCheckout(canonical), canonical);
for (const invalid of [
  "http://hub.cozydigital.org/courses/cozy-ai-video-course/",
  "https://example.com/courses/cozy-ai-video-course/",
  "https://hub.cozydigital.org.evil.test/courses/cozy-ai-video-course/",
  "https://cozy-client-hub-production.up.railway.app/courses/cozy-ai-video-course/",
  "https://hub.cozydigital.org/courses/ai-video-prompt-boss/",
  "https://hub.cozydigital.org/courses/cozy-ai-video-course/access",
  canonical + "?redirect=https://example.com",
  canonical + "#pay",
  "https://user@hub.cozydigital.org/courses/cozy-ai-video-course/",
  "https://hub.cozydigital.org:8443/courses/cozy-ai-video-course/",
  "", "not a URL",
]) assert.equal(validateCozyVideoCheckout(invalid), null, invalid);

const html = read("out/courses/cozy-ai-video-course/index.html");
assert.match(html, /noindex/);
assert.match(html, /disabled=""/);
assert.match(html, /Enrollment opens soon/);
assert.match(html, /planned/);
assert.match(html, /Six exercises/);
assert.match(html, /Eight reusable templates/);
assert.match(html, /Your final project/);
assert.match(html, /same Google email at checkout/);
assert.match(html, /sign in with Google again to verify your email/);
assert.match(html, /Access instructions will be confirmed before checkout opens/);
assert.match(html, /not live screen recordings/);
assert.equal((html.match(/<summary/g) || []).length, 13);
assert.ok(!/href="https:\/\/(?:buy|checkout)\.stripe\.com/.test(html));
for (const term of ["Lavar", "Block Family", "If You Love Me", "3h36", "office hours", "lifetime access"])
  assert.ok(!html.includes(term), `Unexpected private or unsupported claim: ${term}`);
const index = read("out/courses/index.html");
assert.match(index, /\/courses\/cozy-ai-video-course\//);
assert.match(index, /AI Video Prompt Boss/);
assert.match(index, /The AI Advantage Blueprint/);
console.log("PASS: premium-course offer, content boundaries, catalog, and checkout gate");
