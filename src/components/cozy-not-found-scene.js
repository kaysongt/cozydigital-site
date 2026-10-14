/** Mount one error-page scene; every listener and animation is released on unmount.
 * @param {HTMLElement} root
 */
export function mountCozy404(root) {
  const controller = new AbortController();
  function on(target, type, listener, options = {}) {
    target.addEventListener(type, listener, { ...options, signal: controller.signal });
  }
  'use strict';
  const canvas = root.querySelector('#particles');
  const ctx = canvas.getContext('2d');
  const world = root.querySelector('.world');
  const landscape = root.querySelector('.landscape');
  const toggle = root.querySelector('#motion-toggle');
  const label = root.querySelector('#motion-label');
  const nudge = root.querySelector('#nudge');
  const status = root.querySelector('#scene-status');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  root.querySelector('#year').textContent = new Date().getFullYear();
  if (!ctx) return;
  toggle.hidden = false;
  nudge.hidden = false;
  let saved = null;
  try { saved = sessionStorage.getItem('cozy404-motion'); } catch (_) {}
  let moving = !reduce.matches && saved !== 'paused';
  let w = 0, h = 0, frameId = 0, elapsed = 0, last = 0;
  let pointer = { x: 0, y: 0 }, eased = { x: 0, y: 0 };
  let burst = [], impulse = 0, resetTimer = 0;
  let rand = 404;
  const random = () => { rand = (rand * 16807) % 2147483647; return (rand - 1) / 2147483646; };
  const particles = Array.from({ length: 76 }, () => ({
    x: .42 + random() * .59, y: random(), size: .5 + random() * 2,
    phase: random() * Math.PI * 2, speed: .3 + random() * .8,
    color: random() > .55 ? '159,238,250' : '202,178,255'
  }));
  function resize() {
    const rect = world.getBoundingClientRect(); w = rect.width; h = rect.height;
    const dpr = Math.min(devicePixelRatio || 1, 1.6);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!moving) draw();
  }
  function center() {
    const mobile = w < 768;
    const scale = Math.max(w / 1672, h / 941);
    return { x: 1225 * scale + (w - 1672 * scale) * (mobile ? .81 : .5), y: 379 * scale + (h - 941 * scale) * .5 };
  }
  function draw(dt = 0) {
    ctx.clearRect(0, 0, w, h);
    const t = elapsed / 1000;
    for (const p of particles) {
      const x = p.x * w + Math.sin(t * .17 + p.phase) * 16;
      const y = ((p.y * h - t * p.speed * 7) % h + h) % h;
      const alpha = .18 + (Math.sin(t * .7 + p.phase) + 1) * .15;
      ctx.fillStyle = `rgba(${p.color},${alpha})`;
      ctx.fillRect(x, y, p.size, p.size);
    }
    for (let i = burst.length - 1; i >= 0; i--) {
      const p = burst[i]; p.life -= dt;
      if (p.life <= 0) { burst.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt; p.vy += .000027 * dt;
      const a = Math.min(1, p.life / 600);
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle + elapsed * .00035);
      ctx.fillStyle = `rgba(${p.color},${a * .78})`;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size); ctx.restore();
    }
  }
  function animate(now) {
    if (!moving || document.hidden) { frameId = 0; return; }
    const dt = last ? Math.min(now - last, 45) : 16; last = now; elapsed += dt;
    eased.x += (pointer.x - eased.x) * .035; eased.y += (pointer.y - eased.y) * .035;
    impulse *= Math.pow(.96, dt / 16);
    const bounce = Math.sin(elapsed * .009) * impulse;
    landscape.style.transform = `translate3d(${eased.x * 6}px,${Math.sin(elapsed * .0003) * 3 + eased.y * 4 + bounce}px,0) scale(${1 + impulse * .0008})`;
    draw(dt); frameId = requestAnimationFrame(animate);
  }
  function start() { if (!frameId && moving && !document.hidden) { last = 0; frameId = requestAnimationFrame(animate); } }
  function update() {
    root.dataset.motion = moving ? 'playing' : 'paused';
    toggle.setAttribute('aria-pressed', String(moving));
    label.textContent = moving ? 'Pause motion' : 'Play motion';
    if (moving) start();
    else { cancelAnimationFrame(frameId); frameId = 0; impulse = 0; burst = []; landscape.style.transform = ''; draw(); }
  }
  on(toggle, 'click', () => {
    moving = !moving;
    try { sessionStorage.setItem('cozy404-motion', moving ? 'playing' : 'paused'); } catch (_) {}
    update();
  });
  on(nudge, 'click', () => {
    clearTimeout(resetTimer);
    if (moving) {
      impulse = 8;
      const c = center();
      for (let i = 0; i < 95; i++) {
        const angle = random() * Math.PI * 2, speed = .025 + random() * .13;
        burst.push({ x: c.x + Math.cos(angle) * 75, y: c.y + Math.sin(angle) * 100,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          size: 1.5 + random() * 5, angle, life: 1200 + random() * 1300,
          color: random() > .4 ? '159,238,250' : '202,178,255' });
      }
      if (burst.length > 380) burst = burst.slice(-380);
    }
    nudge.lastElementChild.textContent = 'Still floating. Still cozy.';
    status.textContent = 'Still floating. Still cozy.';
    resetTimer = setTimeout(() => { nudge.lastElementChild.textContent = 'Give it a nudge'; status.textContent = ''; }, 2600);
  });
  if (matchMedia('(pointer: fine)').matches) {
    on(document, 'pointermove', e => { pointer.x = (e.clientX / innerWidth - .5) * 2; pointer.y = (e.clientY / innerHeight - .5) * 2; }, { passive: true });
    on(document, 'pointerleave', () => { pointer = { x: 0, y: 0 }; });
  }
  on(reduce, 'change', () => { if (reduce.matches) { moving = false; update(); } });
  on(document, 'visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(frameId); frameId = 0; last = 0; } else start();
  });
  const observer = new ResizeObserver(resize); observer.observe(world);
  on(window, 'pagehide', () => { cancelAnimationFrame(frameId); frameId = 0; clearTimeout(resetTimer); });
  on(window, 'pageshow', () => { last = 0; start(); });
  resize(); update();
  return () => {
    controller.abort();
    observer.disconnect();
    cancelAnimationFrame(frameId);
    clearTimeout(resetTimer);
    landscape.style.transform = '';
  };
}
