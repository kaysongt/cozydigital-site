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
  assert.match(await page.locator("h1").innerText(), /Turn one idea/);
  const intro = await page.locator("#course-intro").boundingBox();
  const signup = await page.locator("#webinar-register").boundingBox();
  assert.ok(intro.y < signup.y, "Intro must appear before the registration form");
  assert.ok(intro.y + intro.height < 1000, "Desktop intro must be in the first viewport");
  assert.match(await page.locator('[aria-label="Webinar navigation"]').innerText(), /Oct 28.*8 p.m. CT/);
  assert.equal(await page.locator("#course-intro video").count(), 1);
  assert.equal(await page.locator("#webinar-marketing").isChecked(), false);
  assert.equal(await page.locator("#paid-course, #curriculum").count(), 0);
  assert.ok(!(await page.locator("main").innerText()).includes("$75"));
  assert.equal(await page.locator("[data-signup-confetti]").count(), 0);
  assert.ok(await page.getByText("Your live-attendee bonus", { exact: true }).isVisible());
  assert.equal(await page.locator("#webinar-goal").isVisible(), false);
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
  await page.waitForURL("**/webinar/thank-you/**");
  await page.getByRole("heading", { name: "You’re in. Let’s make something." }).waitFor();
  await page.waitForFunction(() => {
    const canvas = document.querySelector("[data-signup-confetti]");
    return canvas && canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data.some(Boolean);
  });
  const confirmationHeading = await page.locator("h1").boundingBox();
  assert.ok(confirmationHeading.y >= 0 && confirmationHeading.y < 1000, "Confirmation heading must be brought into view");
  assert.equal(captured.length, 1);
  assert.equal(captured[0].leadSource, "AI Video Webinar · boyce");
  assert.match(captured[0].notes, /Optional marketing consent: no/);
  assert.match(captured[0].notes, /utm_campaign=ai_video_webinar/);
  assert.match(captured[0].notes, /Event contact consent: yes/);
  assert.match(captured[0].notes, /Starts at: 2026-10-28T20:00:00-05:00/);
  assert.match(await page.locator("main").innerText(), /Wednesday, October 28/);
  assert.match(await page.locator("main").innerText(), /8 p.m. Central/);
  assert.ok(!(await page.locator("main").innerText()).includes("email has been sent"));
  const google = new URL(await page.getByRole("link", { name: /Google Calendar/ }).getAttribute("href"));
  assert.equal(google.searchParams.get("dates"), "20261029T010000Z/20261029T020000Z");
  assert.equal(google.searchParams.get("ctz"), "America/Chicago");
  const outlook = new URL(await page.getByRole("link", { name: /Outlook/ }).getAttribute("href"));
  assert.equal(outlook.searchParams.get("startdt"), "2026-10-29T01:00:00.000Z");
  await page.screenshot({ path: "webinar-qa/thank-you.png", fullPage: true });
  await page.locator("#course-preview > summary").click();
  assert.ok((await page.locator("#paid-course").innerText()).includes("$75"));
  assert.ok((await page.locator("#paid-course").innerText()).includes("12 months"));
  assert.equal(await page.locator('button:has-text("Enrollment opens soon")').isDisabled(), true);
  const events = await page.evaluate(() => window.__webinarEvents);
  assert.equal(events.filter(e => e[1] === "generate_lead").length, 1);
  assert.ok(!JSON.stringify(events).includes("example.invalid"));
  assert.deepEqual(errors, []);
  checks.push("Desktop: webinar-only page, collapsed optional field, live bonus, success redirect, calendar timezone, paid preview and PII-free conversion event");
  await ctx.close();

  for (const [status, body] of [[500, { error: "Failed" }], [200, { ok: false }], [429, { error: "Limited" }]]) {
    const { ctx, page, errors } = await context({ viewport: { width: 390, height: 844 } });
    await mock(page, status, body);
    await visit(page);
    await fill(page);
    await page.locator('#webinar-register button[type="submit"]').click();
    await page.locator('#webinar-register [role="alert"]').waitFor();
    assert.equal(await page.locator('#webinar-register [role="status"]').count(), 0);
    assert.equal(await page.locator("[data-signup-confetti]").count(), 0);
    assert.ok(page.url().includes(PATH));
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
    const form = page.locator("#webinar-register form");
    assert.equal(await form.getAttribute("method"), "post");
    assert.equal(await form.getAttribute("action"), "https://hub.cozydigital.org/api/webhook/webinar-register");
    assert.equal(await page.locator('#webinar-register button[type="submit"]').isEnabled(), true);
    let nativeBody;
    await page.route("https://hub.cozydigital.org/api/webhook/webinar-register", route => {
      nativeBody = new URLSearchParams(route.request().postData());
      return route.fulfill({ status: 200, contentType: "text/html; charset=utf-8", body: '<h1>You’re registered</h1><p role="status">Your registration is saved.</p>' });
    });
    await fill(page);
    await page.locator('#webinar-register button[type="submit"]').click();
    await page.getByRole("heading", { name: "You’re registered" }).waitFor();
    assert.equal(nativeBody.get("name"), "Webinar QA");
    assert.equal(nativeBody.get("email"), "webinar-qa@example.invalid");
    assert.equal(nativeBody.get("eventId"), "ai-video-creator-lab-2026-10-28");
    assert.equal(nativeBody.get("marketing"), null);
    assert.ok(!page.url().includes("example.invalid"));
    checks.push("No JavaScript: enabled native POST form, optional consent preserved, no attendee data in URL");
    await ctx.close();
  }
  {
    const { ctx, page } = await context();
    await page.goto(ORIGIN + "/webinar/thank-you/");
    assert.equal(await page.getByRole("heading", { name: "You’re in. Let’s make something." }).count(), 0);
    assert.equal(await page.locator("[data-signup-confetti]").count(), 0);
    checks.push("Direct thank-you visit does not claim registration or fire confetti");
    await ctx.close();
  }
  {
    const { ctx, page } = await context({ reducedMotion: "reduce" });
    await mock(page, 200, { ok: true });
    await visit(page);
    await fill(page);
    await page.locator('#webinar-register button[type="submit"]').click();
    await page.waitForURL("**/webinar/thank-you/**");
    await page.getByRole("heading", { name: "You’re in. Let’s make something." }).waitFor();
    assert.ok(await page.evaluate(() => {
      const canvas = document.querySelector("[data-signup-confetti]");
      return !canvas || !canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data.some(Boolean);
    }));
    await page.reload();
    await page.getByRole("heading", { name: "You’re in. Let’s make something." }).waitFor();
    assert.equal(await page.locator("[data-signup-confetti]").count(), 0);
    checks.push("Reduced motion skips confetti; refresh keeps confirmation without replaying celebration");
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
