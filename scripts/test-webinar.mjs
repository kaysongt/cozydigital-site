import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const ORIGIN = process.env.WEBINAR_TEST_ORIGIN || "http://127.0.0.1:4173";
const PATH = "/courses/cozy-ai-video-course/";
const EMBED = "https://luma.com/embed/event/h5qnohwa/simple";
const EVENT = "https://luma.com/h5qnohwa";
const checks = [];
await mkdir("webinar-qa", { recursive: true });
const browser = await chromium.launch();
let currentPage;
const mockLuma = `<!doctype html><html><body>
  <h1>Cozy ai video workshop — test frame</h1>
  <button onclick="parent.postMessage({type:'luma:purchase'}, '*')">Invalid confirmation</button>
  <button onclick="parent.postMessage({type:'luma:purchase',transaction_id:'test-registration-1',value:0,email:'qa@example.invalid'}, '*')">Complete test registration</button>
</body></html>`;

async function context(options = {}, embedAvailable = true) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, ...options });
  const hubRequests = [];
  // External requests are intercepted; tests never register a guest or send live analytics.
  await ctx.route("**/*", route => {
    const url = route.request().url();
    if (url.startsWith(ORIGIN) || url.startsWith("data:")) return route.continue();
    if (url.startsWith("https://hub.cozydigital.org/api/webhook/")) hubRequests.push(url);
    if (url.startsWith(EMBED) && embedAvailable) return route.fulfill({ status: 200, contentType: "text/html", body: mockLuma });
    if (url.startsWith(EVENT)) return route.fulfill({ status: 200, contentType: "text/html", body: "<h1>Luma fallback destination</h1>" });
    return route.abort();
  });
  const page = await ctx.newPage();
  currentPage = page;
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  return { ctx, page, errors, hubRequests };
}
async function visit(page, suffix = "") {
  await page.goto(ORIGIN + PATH + suffix, { waitUntil: "networkidle" });
  await page.locator("#luma-registration").waitFor();
}
async function tracking(page) {
  await page.evaluate(() => {
    window.__webinarEvents = [];
    window.gtag = (...args) => window.__webinarEvents.push(args);
    window.fbq = (...args) => window.__webinarEvents.push(args);
  });
}
async function complete(page) {
  await page.locator("#luma-registration").scrollIntoViewIfNeeded();
  await page.frameLocator("#luma-registration").getByRole("button", { name: "Complete test registration" }).click();
  await page.getByRole("status").filter({ hasText: "You’re registered!" }).waitFor();
}

try {
  const { ctx, page, errors, hubRequests } = await context();
  await visit(page, "?utm_source=boyce&utm_medium=show&utm_campaign=ai_video_webinar&email=private@example.invalid");
  assert.equal(await page.locator("h1").count(), 1);
  assert.match(await page.locator("h1").innerText(), /Become the AI creator/);
  const intro = await page.locator("#course-intro").boundingBox();
  const signup = await page.locator("#webinar-register").boundingBox();
  const countdown = await page.getByLabel(/Workshop starts/).boundingBox();
  const proof = page.locator("#workshop-proof");
  const proofBox = await proof.boundingBox();
  assert.ok(intro.y + intro.height < 1000, "Desktop intro remains in the first viewport");
  assert.ok(countdown.y + countdown.height <= signup.y, "Countdown stays above signup");
  assert.ok(proofBox.y >= signup.y + signup.height, "Client films stay below signup");
  assert.match(await page.locator('[aria-label="Webinar navigation"]').innerText(), /Nov 5.*9 p.m. ET/);
  assert.equal(await page.locator("#webinar-register form, #webinar-name, #webinar-email").count(), 0, "No second Hub form");
  assert.equal(await page.locator("#paid-course, #curriculum").count(), 0);
  assert.equal(await page.locator("[data-signup-confetti]").count(), 0);
  assert.ok(await page.getByText("Your live-attendee bonus", { exact: true }).isVisible());
  const frame = page.locator("#luma-registration");
  const frameUrl = new URL(await frame.getAttribute("src"));
  assert.equal(frameUrl.origin + frameUrl.pathname, EMBED);
  assert.equal(frameUrl.searchParams.get("utm_source"), "boyce");
  assert.equal(frameUrl.searchParams.get("utm_campaign"), "ai_video_webinar");
  assert.equal(frameUrl.searchParams.has("email"), false, "Never forward arbitrary attendee fields");
  const fallback = page.getByRole("link", { name: /Open registration on Luma/ });
  const fallbackUrl = new URL(await fallback.getAttribute("href"));
  assert.equal(fallbackUrl.origin + fallbackUrl.pathname, EVENT);
  assert.equal(fallbackUrl.searchParams.get("utm_source"), "boyce");
  assert.equal(fallbackUrl.searchParams.has("email"), false);
  assert.ok(await frame.getAttribute("title"));
  assert.equal(await proof.locator("video").count(), 0);
  assert.equal(await proof.locator("button").count(), 3);
  await page.screenshot({ path: "webinar-qa/desktop.png", fullPage: true });
  await proof.getByRole("button", { name: "Watch The Subscription", exact: true }).click();
  await page.waitForFunction(() => document.querySelector("#workshop-proof video")?.currentTime > 0, null, { timeout: 20000 });
  await proof.getByRole("button", { name: "Watch Fighting Poor Choices", exact: true }).click();
  assert.equal(await proof.locator("video").count(), 1);
  await page.waitForFunction(() => document.querySelector("#workshop-proof video")?.currentTime > 0, null, { timeout: 20000 });
  checks.push("Desktop: intro, countdown/signup/films order, attribution without personal fields, on-request film playback");

  await tracking(page);
  await page.evaluate(() => window.dispatchEvent(new MessageEvent("message", {
    origin: "https://luma.com", source: window, data: { type: "luma:purchase", transaction_id: "forged-parent" }
  })));
  await frame.scrollIntoViewIfNeeded();
  await page.frameLocator("#luma-registration").getByRole("button", { name: "Invalid confirmation" }).click();
  assert.equal(await page.getByRole("status").count(), 0, "Forged/malformed confirmations are ignored");
  assert.equal(await page.locator("[data-signup-confetti]").count(), 0);
  await complete(page);
  await page.waitForFunction(() => {
    const canvas = document.querySelector("[data-signup-confetti]");
    return canvas && canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data.some(Boolean);
  });
  await complete(page);
  const events = await page.evaluate(() => window.__webinarEvents);
  assert.equal(events.filter(event => event[1] === "generate_lead").length, 1, "Duplicate messages never double-count");
  assert.equal(events.filter(event => event[1] === "Lead").length, 1);
  assert.ok(!JSON.stringify(events).includes("example.invalid"), "Analytics contain no personal fields");
  assert.equal(hubRequests.length, 0, "Luma signups are not posted to the Hub");
  await page.reload();
  await page.getByRole("status").filter({ hasText: "You’re registered!" }).waitFor();
  assert.equal(await page.locator("[data-signup-confetti]").count(), 0, "Refresh does not replay celebration");
  assert.deepEqual(errors, []);
  checks.push("Only trusted frame confirmations celebrate and track; malformed/forged/duplicate messages are safe");
  await ctx.close();

  for (const width of [320, 390, 768, 1440]) {
    const { ctx, page, errors } = await context({ viewport: { width, height: 844 } });
    await visit(page);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "Page overflow at " + width);
    const signup = await page.locator("#webinar-register").boundingBox();
    const frame = await page.locator("#luma-registration").boundingBox();
    const countdown = await page.getByLabel(/Workshop starts/).boundingBox();
    const proof = await page.locator("#workshop-proof").boundingBox();
    assert.ok(frame.width > 0 && frame.x >= 0 && frame.x + frame.width <= width + 1, "Embed clipped at " + width);
    assert.ok(countdown.y + countdown.height <= signup.y);
    assert.ok(proof.y >= signup.y + signup.height);
    if (width === 390) {
      const intro = await page.locator("#course-intro video").boundingBox();
      assert.ok(intro.y + intro.height <= 844, "Mobile intro fits the first viewport");
      await page.screenshot({ path: "webinar-qa/mobile.png", fullPage: true });
    }
    assert.deepEqual(errors, []);
    checks.push("Responsive " + width + "px: embed visible, no page overflow, section order preserved");
    await ctx.close();
  }

  {
    const { ctx, page } = await context({}, false);
    await visit(page);
    const link = page.getByRole("link", { name: /Open registration on Luma/ });
    const popupPromise = ctx.waitForEvent("page");
    await link.click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    assert.match(popup.url(), /^https:\/\/luma\.com\/h5qnohwa\?/);
    await popup.getByRole("heading", { name: "Luma fallback destination" }).waitFor();
    assert.equal(await page.getByRole("status").count(), 0);
    checks.push("Blocked embed: working direct Luma fallback, no false registration");
    await ctx.close();
  }
  {
    const { ctx, page } = await context({ javaScriptEnabled: false });
    await page.goto(ORIGIN + PATH);
    const url = new URL(await page.getByRole("link", { name: /Open registration on Luma/ }).getAttribute("href"));
    assert.equal(url.origin + url.pathname, EVENT);
    assert.equal(url.searchParams.get("utm_source"), "cozydigital");
    assert.equal(await page.locator("#webinar-register form").count(), 0);
    checks.push("No parent JavaScript: embed and direct registration link remain in static HTML");
    await ctx.close();
  }
  {
    const { ctx, page } = await context({ reducedMotion: "reduce" });
    await visit(page);
    await complete(page);
    assert.ok(await page.evaluate(() => {
      const canvas = document.querySelector("[data-signup-confetti]");
      return !canvas || !canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data.some(Boolean);
    }));
    checks.push("Reduced motion: registration confirmation without confetti animation");
    await ctx.close();
  }
  {
    const { ctx, page } = await context();
    await page.goto(ORIGIN + "/webinar/thank-you/");
    assert.equal(await page.getByRole("heading", { name: "You’re in. Let’s make something." }).count(), 0);
    assert.equal(await page.locator("[data-signup-confetti]").count(), 0);
    const google = new URL(await page.getByRole("link", { name: /Google Calendar/ }).getAttribute("href"));
    assert.equal(google.searchParams.get("dates"), "20261106T020000Z/20261106T033000Z");
    const outlook = new URL(await page.getByRole("link", { name: /Outlook/ }).getAttribute("href"));
    assert.equal(outlook.searchParams.get("enddt"), "2026-11-06T03:30:00.000Z");
    const ics = await (await page.request.get(ORIGIN + "/webinar/ai-video-workshop.ics")).text();
    assert.match(ics, /DTSTART:20261106T020000Z/);
    assert.match(ics, /DTEND:20261106T033000Z/);
    await page.locator("#course-preview > summary").click();
    assert.ok((await page.locator("#paid-course").innerText()).includes("$75"));
    assert.equal(await page.locator('button:has-text("Enrollment opens soon")').isDisabled(), true);
    checks.push("Legacy confirmation stays honest; calendars match 90-minute Luma event; paid preview remains separate");
    await ctx.close();
  }
  console.log(checks.join("\n"));
  await writeFile("webinar-qa/results.json", JSON.stringify({ passed: true, checks, liveLumaRegistrationTested: false, emailDeliveryTested: false }, null, 2));
} catch (error) {
  if (currentPage && !currentPage.isClosed()) await currentPage.screenshot({ path: "webinar-qa/failure.png", fullPage: true }).catch(() => {});
  await writeFile("webinar-qa/results.json", JSON.stringify({ passed: false, checks, error: String(error) }, null, 2));
  throw error;
} finally {
  await browser.close();
}
