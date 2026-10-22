/* Generated silver-viper artwork is skinned to a continuous upward path at 30 fps. */
(() => {
  const canvas = document.querySelector('.night-serpent');
  const context = canvas.getContext('2d');
  const toggle = document.querySelector('.motion-toggle');
  const snake = new Image();
  let rig = null;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  try { paused = localStorage.getItem('nox-motion-paused') === 'true'; } catch (_) { /* Storage can be unavailable. */ }
  let width = 0, height = 0, length = 0, distance = 140;
  let frame = 0, lastTime = 0, lastPaint = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    length = Math.min(560, height * .7);
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context?.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (!motionPreference.matches) draw();
  }

  function drawTriangle(source, target) {
    const [s0, s1, s2] = source, [d0, d1, d2] = target;
    const u1 = s1.x - s0.x, v1 = s1.y - s0.y;
    const u2 = s2.x - s0.x, v2 = s2.y - s0.y;
    const det = u1 * v2 - u2 * v1;
    if (Math.abs(det) < .001) return;
    const a = ((d1.x - d0.x) * v2 - (d2.x - d0.x) * v1) / det;
    const b = ((d1.y - d0.y) * v2 - (d2.y - d0.y) * v1) / det;
    const c = ((d2.x - d0.x) * u1 - (d1.x - d0.x) * u2) / det;
    const d = ((d2.y - d0.y) * u1 - (d1.y - d0.y) * u2) / det;
    context.save();
    context.beginPath();
    const cx = (d0.x + d1.x + d2.x) / 3, cy = (d0.y + d1.y + d2.y) / 3;
    target.forEach((p, i) => {
      // Subpixel overlap prevents hairline seams between neighboring triangles.
      const norm = Math.hypot(p.x - cx, p.y - cy) || 1;
      const x = p.x + (p.x - cx) / norm * .35;
      const y = p.y + (p.y - cy) / norm * .35;
      if (i === 0) context.moveTo(x, y); else context.lineTo(x, y);
    });
    context.closePath();
    context.clip();
    context.transform(a, b, c, d, d0.x - a * s0.x - c * s0.y, d0.y - b * s0.x - d * s0.y);
    context.drawImage(snake, 0, 0);
    context.restore();
  }

  function draw() {
    if (!context) return;
    context.clearRect(0, 0, width, height);
    if (!rig || !snake.complete || !snake.naturalWidth) return;
    const mobile = width < 700;
    const scale = length / rig.rings[rig.rings.length - 1][6];
    const amplitude = mobile ? 24 : 42;
    const edge = mobile ? 47 : Math.max(72, width * .055);
    const rail = edge;
    const frequency = .014;
    const slope = t => amplitude * frequency * Math.cos(t * frequency);
    const point = t => {
      const dx = -slope(t), norm = Math.hypot(dx, 1);
      return {x: rail + amplitude * Math.sin(t * frequency), y: height + 40 - t,
        nx: 1 / norm, ny: -dx / norm, tx: dx / norm, ty: 1 / norm};
    };
    let travel = distance;
    const sections = rig.rings.map((ring, index) => {
      const [x, y, nx, ny, left, right, arc] = ring;
      if (index) {
        const step = (arc - rig.rings[index - 1][6]) * scale;
        const middle = travel - step / (2 * Math.hypot(1, slope(travel)));
        travel -= step / Math.hypot(1, slope(middle));
      }
      const p = point(travel);
      return {
        center: p,
        source: [{x: x - nx * left, y: y - ny * left}, {x: x + nx * right, y: y + ny * right}],
        target: [{x: p.x - p.nx * left * scale, y: p.y - p.ny * left * scale},
          {x: p.x + p.nx * right * scale, y: p.y + p.ny * right * scale}]
      };
    });
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    for (let i = sections.length - 2; i >= 0; i--) {
      const a = sections[i], b = sections[i + 1];
      if (b.center.y < -45 || a.center.y > height + 45) continue;
      drawTriangle([a.source[0], a.source[1], b.source[1]], [a.target[0], a.target[1], b.target[1]]);
      drawTriangle([a.source[0], b.source[1], b.source[0]], [a.target[0], b.target[1], b.target[0]]);
    }
    // The head is rigid, pointing along the same trail the body follows.
    const head = sections[0].center, neckX = rig.rings[0][0];
    if (head.y > -40 && head.y < height + rig.neckY * scale + 40) {
      context.save();
      context.transform(head.nx * scale, head.ny * scale, head.tx * scale, head.ty * scale,
        head.x - (neckX * head.nx + rig.neckY * head.tx) * scale,
        head.y - (neckX * head.ny + rig.neckY * head.ty) * scale);
      context.drawImage(snake, 0, 0, rig.width, rig.neckY + 1, 0, 0, rig.width, rig.neckY + 1);
      context.restore();
    }
  }

  function tick(time) {
    const delta = lastTime ? Math.min(time - lastTime, 70) : 0;
    lastTime = time;
    distance += delta * (height + length + 100) / 32000;
    if (distance > height + length + 100) { distance = 0; }
    if (time - lastPaint >= 1000 / 30) { draw(); lastPaint = time; }
    frame = requestAnimationFrame(tick);
  }

  function syncMotion() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    const stopped = paused || motionPreference.matches || document.hidden;
    document.body.classList.toggle('motion-paused', stopped);
    toggle.hidden = motionPreference.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Resume motion' : 'Pause motion';
    if (motionPreference.matches) context?.clearRect(0, 0, width, height);
    else if (!stopped && context && rig && snake.complete && snake.naturalWidth) frame = requestAnimationFrame(tick);
  }

  toggle.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('nox-motion-paused', String(paused)); } catch (_) { /* Keep the in-memory preference. */ }
    syncMotion();
  });
  motionPreference.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  window.addEventListener('resize', resize, {passive: true});
  snake.addEventListener('load', () => { draw(); syncMotion(); });
  snake.src = 'assets/silver-viper.webp';
  fetch('assets/silver-viper-rig.json')
    .then(response => { if (!response.ok) throw new Error('Snake artwork unavailable'); return response.json(); })
    .then(data => { rig = data; draw(); syncMotion(); })
    .catch(() => { canvas.hidden = true; });
  resize();
  syncMotion();
})();
