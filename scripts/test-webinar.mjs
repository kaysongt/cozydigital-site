import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const ORIGIN = process.env.WEBINAR_TEST_ORIGIN || "http://127.0.0.1:4173";
const checks = [];
await mkdir("webinar-qa", { recursive: true });
const browser = await chromium.launch();
let currentPage;

async function context(options = {}) {
  const ctx = await browser.newContext(options);
  await ctx.route("**/*", route => {
    const url = new URL(route.request().url());
    return url.origin === ORIGIN || url.protocol === "data:" ? route.continue() : route.abort();
  });
  const page = await ctx.newPage();
  currentPage = page;
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  return { ctx, page, errors };
}

try {
  for (const width of [390, 1440]) {
    const { ctx, page, errors } = await context({ viewport: { width, height: 900 } });
    await page.goto(ORIGIN);
    assert.equal(await page.getByRole("link", { name: "Webinar", exact: true }).count(), 0);
    assert.equal(await page.locator(".webinar-banner").count(), 0);
    await page.goto(ORIGIN + "/courses/");
    const replay = page.getByRole("region", { name: "AI Video Webinar Recording", exact: true });
    assert.match(await replay.innerText(), /21½-minute/);
    assert.match(await replay.innerText(), /\$50 USD one-time/);
    assert.match(await replay.innerText(), /Not yet available for purchase/);
    assert.equal(await replay.getByRole("link").count() + await replay.getByRole("button").count(), 0);
    await page.getByRole("heading", { name: "AI Video Creator Lab", exact: true }).waitFor();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({ path: `webinar-qa/courses-${width}.png`, fullPage: true });
    await page.getByRole("link", { name: /Preview the course/ }).click();
    await page.waitForURL("**/courses/cozy-ai-video-course/");
    await page.getByRole("heading", { name: "AI Video Creator Lab", exact: true, level: 1 }).waitFor();
    assert.equal(await page.locator('iframe[src*="luma.com"], a[href*="luma.com"], #webinar-register').count(), 0);
    assert.equal(await page.getByRole("link", { name: /Save my seat/ }).count(), 0);
    assert.deepEqual(errors, []);
    checks.push(`Responsive ${width}px: retired promotion, recording without checkout, distinct course preview`);
    await ctx.close();
  }
  {
    const { ctx, page } = await context();
    await page.goto(ORIGIN + "/webinar/thank-you/");
    assert.equal(await page.getByRole("heading", { name: "You’re in. Let’s make something." }).count(), 0);
    assert.equal(await page.locator("[data-signup-confetti]").count(), 0);
    const google = new URL(await page.getByRole("link", { name: /Google Calendar/ }).getAttribute("href"));
    assert.equal(google.searchParams.get("dates"), "20261113T020000Z/20261113T033000Z");
    const outlook = new URL(await page.getByRole("link", { name: /Outlook/ }).getAttribute("href"));
    assert.equal(outlook.searchParams.get("enddt"), "2026-11-13T03:30:00.000Z");
    const ics = await (await page.request.get(ORIGIN + "/webinar/ai-video-workshop.ics")).text();
    assert.match(ics, /DTSTART:20261113T020000Z/);
    assert.match(ics, /DTEND:20261113T033000Z/);
    await page.locator("#course-preview > summary").click();
    assert.ok((await page.locator("#paid-course").innerText()).includes("$75"));
    assert.equal(await page.locator('button:has-text("Enrollment opens soon")').isDisabled(), true);
    checks.push("Legacy confirmation stays honest; calendars match 90-minute Luma event; paid preview remains separate");
    await ctx.close();
  }
  console.log(checks.join("\n"));
  await writeFile("webinar-qa/results.json", JSON.stringify({ passed: true, checks, paymentsTested: false }, null, 2));
} catch (error) {
  if (currentPage && !currentPage.isClosed()) await currentPage.screenshot({ path: "webinar-qa/failure.png", fullPage: true }).catch(() => {});
  await writeFile("webinar-qa/results.json", JSON.stringify({ passed: false, checks, error: String(error) }, null, 2));
  throw error;
} finally {
  await browser.close();
}
