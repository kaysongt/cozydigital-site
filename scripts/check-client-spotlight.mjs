import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const component = readFileSync("src/components/client-spotlight.tsx", "utf8");
const hero = readFileSync("src/components/studio-hero.tsx", "utf8");
const page = readFileSync("src/app/page.tsx", "utf8");
const css = readFileSync("src/components/client-spotlight.module.css", "utf8");
assert.equal((hero.match(/<ClientSpotlight \/>/g) || []).length, 1);
assert.ok(!page.includes("<ClientSpotlight"), "No duplicate below-the-fold spotlight");
assert.ok(hero.indexOf("<ClientSpotlight />") < hero.indexOf('<h1 id="studio-heading">'));
assert.match(component, /aria-labelledby="client-spotlight-heading"/);
assert.match(component, /id="client-spotlight-heading"/);
assert.match(hero, /href="\/cozy-booking\/"/);
assert.match(hero, /Get the free audit/);
assert.match(hero, /AI video\./);
assert.match(component, /rel="noopener noreferrer"/);
assert.match(component, /No BET endorsement/);
assert.match(component, /Cozy Digital client placement/);
assert.match(component, /We helped our client land a guest appearance/);
assert.ok(!/<(?:iframe|video)\b/.test(component));
for (const asset of ["bet-logo.svg", "nick-cannon-night-key-art.jpg"]) {
  assert.ok(component.includes(asset));
  assert.ok(existsSync("public/images/client-proof/" + asset));
}
assert.equal((component.match(/ priority/g) || []).length, 2);
assert.match(css, /@media \(max-width: 760px\)/);
assert.match(css, /grid-row: 2/);
console.log("Hero spotlight source checks passed: top-panel placement, logos, copy, preserved CTAs, responsive rules.");
