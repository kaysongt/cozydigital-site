// Run after npm run build. Requires Playwright and a Chromium executable.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES
  ? path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, 'playwright') : 'playwright');
const root = path.resolve(__dirname, '../out');
const qa = process.env.COZY_QA_DIR || '/tmp/cozy-course-qa';
fs.mkdirSync(qa, { recursive: true });
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.jpg':'image/jpeg', '.mp4':'video/mp4', '.vtt':'text/vtt', '.txt':'text/plain' };
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  const size = fs.statSync(file).size;
  const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range || '');
  res.setHeader('Accept-Ranges', 'bytes');
  if (range) {
    const start = Number(range[1]); const end = Math.min(range[2] ? Number(range[2]) : size - 1, size - 1);
    if (start >= size || end < start) { res.writeHead(416, {'Content-Range': `bytes */${size}`}).end(); return; }
    res.writeHead(206, {'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end-start+1});
    fs.createReadStream(file, {start, end}).pipe(res);
  } else { res.setHeader('Content-Length', size); fs.createReadStream(file).pipe(res); }
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ executablePath: process.env.COZY_CHROMIUM_PATH, headless:true, args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'] });
  const results = [];
  try {
    for (const width of [375, 390, 768, 1024, 1440, 1920]) {
      const page = await browser.newPage({ viewport:{ width, height:1000 }, reducedMotion:'reduce' });
      const errors=[];
      const videoRequests=[];
      page.on('request', r => { if(r.url().endsWith('/intro-v1.mp4')) videoRequests.push(r.url()); });
      page.on('pageerror', e => errors.push(e.message));
      await page.route('**/*', r => r.request().url().startsWith(origin) ? r.continue() : r.abort());
      await page.goto(origin + '/courses/cozy-ai-video-course/', {waitUntil:'networkidle'});
      const video = page.locator('#course-intro video');
      assert.equal(await video.count(), 1);
      assert.equal(await video.getAttribute('preload'), 'none');
      assert.equal(await video.getAttribute('autoplay'), null);
      assert.equal(await video.evaluate(v => v.paused && v.controls), true);
      assert.equal(videoRequests.length, 0, 'No video download before play');
      await page.getByRole('link', {name:'Watch the intro'}).click();
      await video.evaluate(v => v.play());
      await page.waitForFunction(() => document.querySelector('#course-intro video').currentTime > 0.2);
      assert.ok(Math.abs(await video.evaluate(v => v.duration) - 40) < 0.1);
      await video.evaluate(v => { v.pause(); v.currentTime = 18.5; v.textTracks[0].mode = 'hidden'; });
      await page.waitForFunction(() => {
        const v=document.querySelector('#course-intro video');
        return Math.abs(v.currentTime-18.5)<0.1 && v.readyState>=2 && v.textTracks[0].cues?.length===10;
      });
      assert.equal(await video.evaluate(v => v.error), null);
      assert.ok(videoRequests.length > 0);
      const bounds=await video.boundingBox();
      assert.ok(bounds.width <= width && Math.abs(bounds.width/bounds.height-16/9)<0.03);
      if ([390,1440].includes(width)) {
        await video.scrollIntoViewIfNeeded();
        await page.screenshot({path:path.join(qa, `intro-${width}.png`)});
      }
      await page.getByRole('button', {name:/Continuity/}).click();
      await page.getByRole('heading', {name:'Name what stays consistent.'}).waitFor();
      assert.equal(await page.getByRole('button', {name:/Continuity/}).getAttribute('aria-pressed'), 'true');
      await page.getByRole('button', {name:/Review/}).focus();
      await page.keyboard.press('Enter');
      await page.getByRole('heading', {name:'Set your approval criteria.'}).waitFor();
      const lesson = page.locator('details').filter({has:page.getByText('Direct a fashion try-on', {exact:true})});
      await lesson.locator('summary').focus(); await page.keyboard.press('Enter');
      assert.equal(await lesson.getAttribute('open'), '');
      assert.equal(await page.getByRole('button', {name:'Enrollment opens soon'}).isDisabled(), true);
      assert.equal(await page.locator('main a[href*="stripe.com"]').count(), 0);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      assert.equal(overflow, false, 'Horizontal overflow at '+width);
      const terms = page.getByText('Your purchase includes', {exact:false});
      assert.match(await terms.textContent(), /12 months/);
      assert.deepEqual(errors, [], 'JS errors at '+width);
      await page.evaluate(() => scrollTo(0,0));
      if ([390,1440].includes(width)) await page.screenshot({path:path.join(qa, `course-${width}.png`)});
      results.push({width, overflow:false, introPlayback:'passed', seek:'passed', captions:10, noAutoplay:true, noPreload:true, planningControls:'passed', keyboard:'passed', curriculum:'passed', checkoutClosed:true, jsErrors:errors});
      await page.close();
    }
    fs.writeFileSync(path.join(qa,'results.json'), JSON.stringify(results,null,2));
    console.log('PASS: six responsive viewports; native intro playback/seeking/captions, no preload/autoplay, planning controls, keyboard, curriculum and checkout gate');
  } finally { await browser.close(); server.close(); }
})().catch(e => { console.error(e); server.close(); process.exitCode=1; });
