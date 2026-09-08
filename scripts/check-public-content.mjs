#!/usr/bin/env node
/**
 * Public content guard. Runs after `next build` against ./out.
 *
 * This repo has no test runner and only three runtime dependencies, so rather
 * than pull in a framework this is a plain Node script using built-ins only.
 * It exists because the things it checks are exactly the things that creep back
 * in by accident: a price pasted into a page, a stray /pricing link, a Client
 * Hub link dropped from the header during a redesign, a second analytics tag.
 *
 * Run on its own with `npm run check:public` (needs a build in ./out first).
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const PUBLIC = join(ROOT, "public");
const OUT = join(ROOT, "out");

const CLIENT_HUB_URL = "https://cozy-client-hub-production.up.railway.app/";
const GA_MEASUREMENT_ID = "G-QJ7R8893NF";

const failures = [];
const fail = (msg) => failures.push(msg);

function walk(dir, test) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full, test));
    else if (test(entry)) found.push(full);
  }
  return found;
}

// Normalised to forward slashes: every path literal below is written that way,
// and on Windows relative() hands back backslashes, which silently emptied the
// allowlist lookups and the out/academy skip so the check failed on files it
// was meant to exempt.
const rel = (f) => relative(ROOT, f).split("\\").join("/");
const read = (f) => readFileSync(f, "utf8");
const occurrences = (text, pattern) => text.match(pattern)?.length ?? 0;

// ---------------------------------------------------------------------------
// Source checks
// ---------------------------------------------------------------------------

const sourceFiles = walk(SRC, (n) => n.endsWith(".ts") || n.endsWith(".tsx"));

// 1. No currency amounts on the public site. Plans live in the Client Hub, so
//    an amount in this repo is either stale or about to be. The exceptions are
//    real, checked, and deliberately narrow.
const ALLOWED_AMOUNTS = {
  // The course has one fixed price, sold through a live Stripe button on
  // /courses/. structured-data.tsx must match it, and so must the Buy Button
  // in Stripe, which is what actually charges.
  "src/app/courses/page.tsx": ["$30"],
  "src/app/academy-access/page.tsx": ["$30"],
  // A founder's résumé: transaction volume they reconcile, not a Cozy price.
  "src/data/founders.ts": ["$20,000"],
};

for (const file of sourceFiles) {
  const allowed = ALLOWED_AMOUNTS[rel(file)] ?? [];
  const amounts = read(file).match(/\$\s?\d(?:[\d,]*\d)?/g) ?? [];
  for (const amount of amounts) {
    if (!allowed.includes(amount.replace(/\s/g, ""))) {
      fail(`${rel(file)}: public currency amount "${amount}". Plans belong in the Client Hub.`);
    }
  }
}

// 2. Nothing should link to /pricing/ any more — it is a redirect stub.
for (const file of sourceFiles) {
  if (/["'`]\/pricing/.test(read(file))) {
    fail(`${rel(file)}: links to /pricing, which now only redirects to the Client Hub.`);
  }
}

// 3. Exactly one GA4 measurement ID across the whole source tree.
const gaIds = new Set();
for (const file of sourceFiles) {
  for (const id of read(file).match(/\bG-[A-Z0-9]{8,12}\b/g) ?? []) gaIds.add(id);
}
if (gaIds.size !== 1 || !gaIds.has(GA_MEASUREMENT_ID)) {
  fail(`expected exactly one GA4 id (${GA_MEASUREMENT_ID}) in src, found: ${[...gaIds].join(", ") || "none"}`);
}

// 4. The mobile navigation disclosure must be keyboard-dismissible and return
//    focus to its trigger. This is intentionally a focused source-level check:
//    the project has no DOM test runner, and adding one solely for this behavior
//    would materially broaden the dependency surface.
const publicHeader = read(join(SRC, "components", "cozy-public-header.tsx"));
if (!/event\.key === ["']Escape["']/.test(publicHeader)) {
  fail("mobile navigation does not handle the Escape key.");
}
if (!/menuButtonRef\.current\?\.focus\(\)/.test(publicHeader)) {
  fail("mobile navigation does not restore focus to its disclosure button.");
}
if (!/aria-controls=["']mobile-navigation["']/.test(publicHeader)) {
  fail("mobile navigation disclosure is missing aria-controls.");
}

// ---------------------------------------------------------------------------
// Build output checks
// ---------------------------------------------------------------------------

if (!existsSync(OUT)) {
  fail("./out is missing — run `next build` before this check.");
} else {
  // Skip out/academy: a gated, robots-disallowed course file with its own
  // savings calculator, not a marketing page.
  const pages = walk(OUT, (n) => n.endsWith(".html")).filter(
    (f) => !rel(f).startsWith("out/academy/")
  );

  // 5. Block the retired public service prices. Other factual dollar figures
  //    can still appear in course pages or founder biographies.
  const RETIRED_SERVICE_AMOUNTS = [
    "$3,400", "$1,500", "$1,200", "$1,000", "$800", "$500", "$400",
    "$350", "$300", "$250", "$200", "$150", "$100",
  ];
  for (const page of pages) {
    const html = read(page);
    for (const amount of RETIRED_SERVICE_AMOUNTS) {
      if (html.includes(amount)) fail(`${rel(page)}: rendered retired service price "${amount}".`);
    }
  }

  // 6. /pricing/ is a standalone static redirect that works without JavaScript.
  const pricing = join(OUT, "pricing", "index.html");
  if (!existsSync(pricing)) fail("out/pricing/index.html is missing — the old link would 404.");
  else {
    const html = read(pricing);
    if (!/<meta\s+http-equiv=["']refresh["']\s+content=["']0;\s*url=https:\/\/cozy-client-hub-production\.up\.railway\.app\/["']\s*\/?>/i.test(html)) {
      fail("out/pricing/index.html is missing an immediate meta refresh to the Client Hub.");
    }
    if (!/<link\s+rel=["']canonical["']\s+href=["']https:\/\/cozy-client-hub-production\.up\.railway\.app\/["']\s*\/?>/i.test(html)) {
      fail("out/pricing/index.html is missing the Client Hub canonical URL.");
    }
    if (!/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex[^"']*["']\s*\/?>/i.test(html)) {
      fail("out/pricing/index.html is missing robots noindex.");
    }
    if (!/<a\s+[^>]*href=["']https:\/\/cozy-client-hub-production\.up\.railway\.app\/["'][^>]*>[^<]+<\/a>/i.test(html)) {
      fail("out/pricing/index.html is missing a visible Client Hub fallback link.");
    }
  }

  // 7. Every App Router document gets one loader component and one config call.
  //    HTML copied verbatim from public/ is standalone and outside the layout;
  //    /pricing/ is intentionally one of those files and may omit analytics.
  const publicHtmlOutputs = new Set(
    walk(PUBLIC, (n) => n.endsWith(".html")).map((f) => relative(PUBLIC, f))
  );
  const applicationPages = walk(OUT, (n) => n.endsWith(".html")).filter(
    (f) => !publicHtmlOutputs.has(relative(OUT, f))
  );
  for (const page of applicationPages) {
    const html = read(page);
    const loaders = occurrences(html, /ga4-loader/g);
    const configs = occurrences(html, /gtag\(['"]config['"],\s*['"]G-QJ7R8893NF['"]\)/g);
    if (loaders !== 1) {
      fail(`${rel(page)}: expected exactly one GA loader for ${GA_MEASUREMENT_ID}, found ${loaders}.`);
    }
    if (configs !== 1) {
      fail(`${rel(page)}: expected exactly one GA config for ${GA_MEASUREMENT_ID}, found ${configs}.`);
    }
  }

  // 8. Header and footer Client Hub links, on every page that renders chrome.
  //    Two per page is the floor: one in the desktop nav, one in the footer.
  const CHROME_PAGES = ["index.html", "services/index.html", "faq/index.html", "about/index.html"];
  for (const name of CHROME_PAGES) {
    const html = read(join(OUT, name));
    const anchors = (html.match(/<a\b[^>]*>/g) ?? []).filter((a) => a.includes(CLIENT_HUB_URL));
    if (anchors.length < 2) {
      fail(`out/${name}: expected header + footer Client Hub links, found ${anchors.length}.`);
    }
    for (const a of anchors) {
      if (!/rel="noopener noreferrer"/.test(a)) {
        fail(`out/${name}: Client Hub link is missing rel="noopener noreferrer".`);
      }
    }
  }

  // 9. The sitemap must not advertise the redirect stub.
  const sitemap = read(join(OUT, "sitemap.xml"));
  if (sitemap.includes("/pricing")) fail("out/sitemap.xml still lists /pricing/.");

  // 10. AI video is part of the positioning, not just a line in a card.
  if (!/AI video/i.test(read(join(OUT, "services", "index.html")))) {
    fail("out/services/index.html no longer mentions AI video.");
  }
  if (!/video/i.test(read(join(OUT, "index.html")))) {
    fail("out/index.html no longer mentions video.");
  }
}

// ---------------------------------------------------------------------------

if (failures.length) {
  console.error(`\n✗ public content check failed (${failures.length}):`);
  for (const f of failures) console.error(`  · ${f}`);
  console.error("");
  process.exit(1);
}

console.log("✓ public content check passed");
