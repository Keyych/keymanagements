/* A tapered silver serpent follows its own trail upward at a capped 30 fps. */
(() => {
  const canvas = document.querySelector('.night-serpent');
  const context = canvas.getContext('2d');
  const toggle = document.querySelector('.motion-toggle');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  try { paused = localStorage.getItem('nox-motion-paused') === 'true'; } catch (_) { /* Storage can be unavailable. */ }
  let width = 0, height = 0, length = 0, distance = 95, lane = 0;
  let frame = 0, lastTime = 0, lastPaint = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    length = Math.min(460, height * .64);
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context?.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (!motionPreference.matches) draw();
  }

  function draw() {
    if (!context) return;
    context.clearRect(0, 0, width, height);
    const mobile = width < 700;
    const amplitude = mobile ? 18 : 36;
    const edge = mobile ? 35 : Math.max(54, width * .045);
    const rail = lane % 2 === 0 ? edge : width - edge;
    const radius = mobile ? 8 : 12;
    const points = [];
    const count = 90;
    const wave = travel => amplitude * (Math.sin(travel * .022) + .18 * Math.sin(travel * .041));
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const travel = distance - t * length;
      const dx = wave(travel - 1) - wave(travel + 1);
      const magnitude = Math.hypot(dx, 2);
      points.push({
        x: rail + wave(travel), y: height + 40 - travel,
        nx: 2 / magnitude, ny: -dx / magnitude,
        radius: radius * Math.pow(1 - t, .75) * (.65 + .35 * Math.sin(Math.min(t * 7, 1) * Math.PI / 2))
      });
    }

    const metal = context.createLinearGradient(rail - amplitude - radius, 0, rail + amplitude + radius, 0);
    metal.addColorStop(0, '#43525e');
    metal.addColorStop(.28, '#9eafb9');
    metal.addColorStop(.48, '#dce7ed');
    metal.addColorStop(.64, '#748996');
    metal.addColorStop(1, '#35434d');
    context.beginPath();
    points.forEach((p, i) => {
      const x = p.x + p.nx * p.radius, y = p.y + p.ny * p.radius;
      if (i === 0) context.moveTo(x, y); else context.lineTo(x, y);
    });
    for (let i = count; i >= 0; i--) {
      const p = points[i];
      context.lineTo(p.x - p.nx * p.radius, p.y - p.ny * p.radius);
    }
    context.closePath();
    context.fillStyle = metal;
    context.fill();
    context.strokeStyle = '#d1e0e9';
    context.lineWidth = .65;
    context.stroke();

    // Curved scales and a fine dorsal highlight give the body its metal finish.
    context.strokeStyle = '#273945b3';
    context.lineWidth = .8;
    for (let i = 3; i < count - 2; i += 2) {
      const p = points[i];
      context.beginPath();
      context.moveTo(p.x - p.nx * p.radius * .85, p.y - p.ny * p.radius * .85);
      context.quadraticCurveTo(p.x, p.y + 5, p.x + p.nx * p.radius * .85, p.y + p.ny * p.radius * .85);
      context.stroke();
    }
    context.beginPath();
    points.forEach((p, i) => {
      const x = p.x - p.nx * p.radius * .28;
      if (i === 0) context.moveTo(x, p.y); else context.lineTo(x, p.y);
    });
    context.strokeStyle = '#eff7ff80';
    context.lineWidth = 1.1;
    context.stroke();

    const head = points[0], neck = points[2];
    context.save();
    context.translate(head.x, head.y);
    context.rotate(Math.atan2(head.x - neck.x, neck.y - head.y));
    const scale = mobile ? .76 : 1;
    context.scale(scale, scale);
    const headMetal = context.createLinearGradient(-11, 0, 11, 0);
    headMetal.addColorStop(0, '#657984');
    headMetal.addColorStop(.4, '#e4edf2');
    headMetal.addColorStop(1, '#536975');
    context.fillStyle = headMetal;
    context.beginPath();
    context.moveTo(0, -19);
    context.bezierCurveTo(-8, -18, -13, -9, -10, 0);
    context.quadraticCurveTo(-6, 10, 0, 10);
    context.quadraticCurveTo(6, 10, 10, 0);
    context.bezierCurveTo(13, -9, 8, -18, 0, -19);
    context.fill();
    context.strokeStyle = '#d8e6ee';
    context.lineWidth = .7;
    context.stroke();
    for (const side of [-1, 1]) {
      context.fillStyle = '#12232d';
      context.beginPath();
      context.ellipse(side * 6, -8, 1.6, 2.5, side * -.35, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = '#f4faff';
      context.fillRect(side * 6 - .4, -9, .8, 1.2);
    }
    context.restore();
  }

  function tick(time) {
    const delta = lastTime ? Math.min(time - lastTime, 70) : 0;
    lastTime = time;
    distance += delta * (height + length + 100) / 32000;
    if (distance > height + length + 100) { distance = 0; lane++; }
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
    else if (!stopped && context) frame = requestAnimationFrame(tick);
  }

  toggle.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('nox-motion-paused', String(paused)); } catch (_) { /* Keep the in-memory preference. */ }
    syncMotion();
  });
  motionPreference.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  window.addEventListener('resize', resize, {passive: true});
  resize();
  syncMotion();
})();
