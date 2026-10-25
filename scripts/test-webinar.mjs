import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const ORIGIN = process.env.WEBINAR_TEST_ORIGIN || "http://127.0.0.1:4173";
const PATH = "/courses/cozy-ai-video-course/";
const ENDPOINT = "https://hub.cozydigital.org/api/webhook/lead";
const checks = [];
await mkdir("webinar-qa", { recursive: true });
const browser = await chromium.launch();
let currentPage;

async function context(options = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, ...options });
  // Never send UI-test submissions or analytics to the real Hub/advertising accounts.
  await ctx.route("**/*", route => {
    const url = route.request().url();
    if (url.startsWith(ORIGIN) || url.startsWith("data:")) return route.continue();
    return route.abort();
  });
  const page = await ctx.newPage();
  currentPage = page;
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  return { ctx, page, errors };
}
async function visit(page, suffix = "") {
  await page.goto(ORIGIN + PATH + suffix, { waitUntil: "networkidle" });
  await page.waitForFunction(() => !document.querySelector('#webinar-register button[type="submit"]')?.disabled);
}
async function fill(page) {
  await page.locator("#webinar-name").fill("Webinar QA");
  await page.locator("#webinar-email").fill("webinar-qa@example.invalid");
}
function mock(page, status, body, captures = []) {
  return page.route(ENDPOINT, async route => {
    const req = route.request();
    if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-methods": "POST,OPTIONS", "access-control-allow-headers": "content-type,x-webhook-secret" } });
    captures.push(req.postDataJSON());
    return route.fulfill({ status, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify(body) });
  });
}

try {
  const { ctx, page, errors } = await context();
  const captured = [];
  await mock(page, 200, { ok: true }, captured);
  await visit(page, "?utm_source=boyce&utm_medium=show&utm_campaign=ai_video_webinar");
  assert.equal(await page.locator("h1").count(), 1);
  assert.match(await page.locator("h1").innerText(), /Make AI videos/);
  const intro = await page.locator("#course-intro").boundingBox();
  const signup = await page.locator("#webinar-register").boundingBox();
  assert.ok(intro.y < signup.y, "Intro must appear before the registration form");
  assert.ok(intro.y + intro.height < 1000, "Desktop intro must be in the first viewport");
  assert.match(await page.locator('[aria-label="Webinar navigation"]').innerText(), /Oct 28.*8 p.m. CT/);
  assert.equal(await page.locator("#course-intro video").count(), 1);
  assert.equal(await page.locator("#webinar-marketing").isChecked(), false);
  assert.equal(await page.locator('button:has-text("Enrollment opens soon")').isDisabled(), true);
  assert.ok((await page.locator("#paid-course").innerText()).includes("$75"));
  assert.ok((await page.locator("#paid-course").innerText()).includes("12 months"));
  assert.equal(await page.locator('iframe[src*="drive.google.com"], a[href*="drive.google.com"]').count(), 0);
  await page.screenshot({ path: "webinar-qa/desktop.png", fullPage: true });
  await page.locator('#webinar-register button[type="submit"]').click();
  assert.equal(captured.length, 0);
  await fill(page);
  await page.getByText("Add a question or video idea", { exact: false }).click();
  await page.locator("#webinar-goal").fill("A product video for my business");
  await page.evaluate(() => {
    window.__webinarEvents = [];
    window.gtag = (...args) => window.__webinarEvents.push(args);
    window.fbq = (...args) => window.__webinarEvents.push(args);
  });
  await page.locator('#webinar-register button[type="submit"]').click();
  await page.locator('#webinar-register [role="status"]').waitFor();
  assert.equal(captured.length, 1);
  assert.equal(captured[0].leadSource, "AI Video Webinar · boyce");
  assert.match(captured[0].notes, /Optional marketing consent: no/);
  assert.match(captured[0].notes, /utm_campaign=ai_video_webinar/);
  assert.match(captured[0].notes, /Event contact consent: yes/);
  assert.match(captured[0].notes, /Starts at: 2026-10-28T20:00:00-05:00/);
  assert.match(await page.locator('#webinar-register [role="status"]').innerText(), /October 28.*8 p.m. Central/);
  assert.ok(!(await page.locator('#webinar-register [role="status"]').innerText()).includes("email has been sent"));
  const events = await page.evaluate(() => window.__webinarEvents);
  assert.equal(events.filter(e => e[1] === "generate_lead").length, 1);
  assert.ok(!JSON.stringify(events).includes("example.invalid"));
  assert.deepEqual(errors, []);
  checks.push("Desktop: one heading, paid offer intact, no private embeds, optional consent unchecked, validation, tagged saved state and PII-free conversion event");
  await ctx.close();

  for (const [status, body] of [[500, { error: "Failed" }], [200, { ok: false }], [429, { error: "Limited" }]]) {
    const { ctx, page, errors } = await context({ viewport: { width: 390, height: 844 } });
    await mock(page, status, body);
    await visit(page);
    await fill(page);
    await page.locator('#webinar-register button[type="submit"]').click();
    await page.locator('#webinar-register [role="alert"]').waitFor();
    assert.equal(await page.locator('#webinar-register [role="status"]').count(), 0);
    assert.equal(await page.locator("#webinar-email").inputValue(), "webinar-qa@example.invalid");
    assert.equal(await page.locator('#webinar-register button[type="submit"]').isEnabled(), true);
    assert.deepEqual(errors, []);
    checks.push(`Failure ${status}/${String(body.ok)}: no fake success, entered details retained`);
    await ctx.close();
  }

  for (const width of [320, 390, 768, 1440]) {
    const { ctx, page, errors } = await context({ viewport: { width, height: 844 } });
    await visit(page);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `Horizontal overflow at ${width}px`);
    const box = await page.locator("#webinar-register").boundingBox();
    assert.ok(box.x >= 0 && box.x + box.width <= width + 1, `Form clipped at ${width}px`);
    if (width === 390) {
      const video = await page.locator("#course-intro video").boundingBox();
      assert.ok(video.y + video.height <= 844, "Mobile intro video must fit in the first viewport");
      await page.screenshot({ path: "webinar-qa/mobile.png", fullPage: true });
    }
    assert.deepEqual(errors, []);
    checks.push(`Responsive layout ${width}px: no page overflow or clipped signup card`);
    await ctx.close();
  }

  {
    const { ctx, page } = await context();
    const captured = [];
    await mock(page, 200, { ok: true }, captured);
    await visit(page);
    await fill(page);
    await page.locator("#webinar-company-url").evaluate(el => { el.value = "https://spam.invalid"; });
    await page.locator('#webinar-register button[type="submit"]').click();
    await page.locator('#webinar-register [role="alert"]').waitFor();
    assert.equal(captured.length, 0);
    checks.push("Honeypot: no submission and no fake conversion");
    await ctx.close();
  }

  {
    const { ctx, page } = await context({ javaScriptEnabled: false });
    await page.goto(ORIGIN + PATH);
    assert.ok(await page.locator('#webinar-register noscript a[href^="mailto:"]').isVisible());
    checks.push("No JavaScript: visible email signup fallback");
    await ctx.close();
  }
  console.log(checks.join("\n"));
  await writeFile("webinar-qa/results.json", JSON.stringify({ passed: true, checks, livePersistenceTested: false, emailDeliveryTested: false }, null, 2));
} catch (error) {
  if (currentPage && !currentPage.isClosed()) await currentPage.screenshot({ path: "webinar-qa/failure.png", fullPage: true }).catch(() => {});
  await writeFile("webinar-qa/results.json", JSON.stringify({ passed: false, checks, error: String(error) }, null, 2));
  throw error;
} finally {
  await browser.close();
}
