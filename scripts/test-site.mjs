import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import { chromium } from 'playwright';
const origin = process.env.SITE_TEST_ORIGIN || 'http://127.0.0.1:4173';
const endpoint = 'https://hub.cozydigital.org/api/webhook/lead';
async function routes(dir, prefix = '') {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) result.push(...await routes(`${dir}/${entry.name}`, `${prefix}/${entry.name}`));
    else if (entry.name === 'page.tsx') result.push(`${prefix}/`);
  }
  return result;
}
const browser = await chromium.launch();
const errors = [];
let checks = 0;
async function context(width = 1440, reducedMotion = 'reduce') {
  const ctx = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion });
  await ctx.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
  const page = await ctx.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.setDefaultTimeout(10000);
  return { ctx, page };
}
async function visit(page, path) { await page.goto(origin + path); await page.waitForTimeout(200); }
try {
  for (const width of [1440, 390]) {
    const { ctx, page } = await context(width);
    for (const path of await routes('src/app')) {
      const response = await page.goto(origin + path);
      assert.equal(response.status(), 200, path);
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 800) { scrollTo(0, y); await new Promise(r => setTimeout(r, 20)); } });
      assert.equal(await page.locator('h1').count(), 1, `${path}: heading`);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2), false, `${path}: overflow at ${width}`);
      assert.equal(await page.locator('dialog[open], .audit-popup, [role="dialog"]').count(), 0, `${path}: popup`);
      checks++;
    }
    await ctx.close();
  }
  {
    const { ctx, page } = await context(390);
    await visit(page, '/');
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    assert.equal(await page.locator('#mobile-navigation').isVisible(), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#mobile-navigation').count(), 0);
    assert.equal(await page.getByRole('button', { name: 'Open menu', exact: true }).evaluate(e => e === document.activeElement), true);
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    await page.locator('#mobile-navigation').getByRole('link', { name: 'Services', exact: true }).click();
    await page.waitForURL(url => /\/services\/?$/.test(url.pathname));
    assert.equal(await page.locator('#mobile-navigation').count(), 0);
    await visit(page, '/');
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    await page.getByRole('button', { name: 'Switch to dark mode' }).first().click();
    await page.reload();
    assert.equal(await page.locator('html').evaluate(e => e.classList.contains('light')), false);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.getByRole('button', { name: 'Next design', exact: true }).click();
    assert.match(await page.locator('.design-carousel-caption').innerText(), /Dew Theory/);
    await page.getByRole('button', { name: 'Show Orbit', exact: true }).click();
    assert.match(await page.locator('.design-carousel-caption').innerText(), /Orbit/);
    await page.getByRole('button', { name: 'Previous design', exact: true }).click();
    assert.match(await page.locator('.design-carousel-caption').innerText(), /Dew Theory/);
    checks += 6;
    await ctx.close();
  }
  {
    const { ctx, page } = await context();
    let body = { ok: false }; let status = 200; let submissions = 0;
    await page.route(endpoint, route => { submissions++; return route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) }); });
    await visit(page, '/free-playbook/');
    await page.getByRole('button', { name: 'Continue' }).click();
    assert.equal(submissions, 0);
    await page.getByLabel('Your name', { exact: true }).fill('QA Test');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('Email address', { exact: true }).fill('qa@example.invalid');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Referrals / word of mouth', exact: true }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: "Okay, but it could be much better", exact: true }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: '6-15', exact: true }).click();
    await page.getByRole('button', { name: 'Get the Playbook' }).click();
    await page.locator('p[role="alert"]').waitFor();
    assert.match(await page.locator('p[role="alert"]').innerText(), /couldn’t save/);
    assert.equal(await page.getByRole('heading', { name: "You're all set!" }).count(), 0);
    status = 500;
    await page.getByRole('button', { name: 'Get the Playbook' }).click();
    await page.waitForTimeout(200);
    assert.equal(await page.locator('p[role="alert"]').isVisible(), true);
    status = 200; body = { ok: true };
    await page.getByRole('button', { name: 'Get the Playbook' }).click();
    await page.getByRole('heading', { name: "You're all set!" }).waitFor();
    assert.equal(await page.getByRole('link', { name: 'Download the Playbook', exact: true }).getAttribute('href'), '/downloads/cozy-digital-playbook.pdf');
    assert.equal(ctx.pages().length, 1, 'No unsolicited download popup');
    checks += 4;
    await visit(page, '/free-audit/');
    body = { ok: false };
    for (const [name, value] of Object.entries({ name: 'QA Test', email: 'qa@example.invalid', website: 'https://example.com', business: 'QA testing', frustration: 'QA verification' })) await page.locator(`form [name="${name}"]`).fill(value);
    for (const [name, value] of Object.entries({ goal: 'More leads', handledBy: 'Me', timeline: 'ASAP' })) await page.locator(`form [name="${name}"]`).selectOption(value);
    await page.getByRole('button', { name: 'Get My Free Digital Presence Audit' }).click();
    await page.locator('p[role="alert"]').waitFor();
    assert.equal(await page.locator('[name="email"]').inputValue(), 'qa@example.invalid');
    body = { ok: true };
    await page.getByRole('button', { name: 'Get My Free Digital Presence Audit' }).click();
    await page.waitForFunction(() => !document.querySelector('form'));
    checks += 2;
    await ctx.close();
  }
  assert.deepEqual(errors, []);
  console.log(`Passed ${checks} site checks: pages, layouts, popup removal, mobile navigation, theme, carousel, form failures and retries.`);
} finally { await browser.close(); }
