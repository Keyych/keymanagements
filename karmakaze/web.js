/* Decorative silk and spiders, drawn locally. No network or tracking. */
(() => {
  'use strict';
  const hero = document.querySelector('.hero');
  const canvas = document.querySelector('.hero-web');
  const control = document.querySelector('.web-toggle');
  const context = canvas.getContext('2d');
  if (!context) return;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, elapsed = 0, lastFrame = 0, request = 0;
  let paused = motionPreference.matches, visible = true;
  const TAU = Math.PI * 2;
  const clamp = value => Math.min(1, Math.max(0, value));
  const ease = value => 1 - Math.pow(1 - clamp(value), 3);

  function silk(path, opacity = .32, lineWidth = .7) {
    context.beginPath();
    path();
    context.strokeStyle = `rgba(242, 213, 211, ${opacity})`;
    context.lineWidth = lineWidth;
    context.stroke();
  }

  function web(cx, cy, radius, start, end, spokes, rings, time, opacity = 1) {
    const sway = Math.sin(time * .45) * 3;
    context.save();
    context.translate(cx + sway, cy);
    context.globalAlpha = opacity;
    for (let s = 0; s <= spokes; s++) {
      const angle = start + (end - start) * s / spokes;
      silk(() => {
        context.moveTo(0, 0);
        context.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }, .27);
    }
    for (let ring = 1; ring <= rings; ring++) {
      const r = radius * Math.pow(ring / rings, 1.25);
      for (let s = 0; s < spokes; s++) {
        const a = start + (end - start) * s / spokes;
        const b = start + (end - start) * (s + 1) / spokes;
        const mid = (a + b) / 2;
        silk(() => {
          context.moveTo(Math.cos(a) * r, Math.sin(a) * r);
          context.quadraticCurveTo(Math.cos(mid) * r * .90, Math.sin(mid) * r * .90,
            Math.cos(b) * r, Math.sin(b) * r);
        }, .21 + ring / rings * .14);
      }
    }
    // A few dew-bright intersections catch the light without flashing.
    [[2, 5], [5, 7], [8, 4]].forEach(([s, ring]) => {
      const angle = start + (end - start) * Math.min(s, spokes) / spokes;
      const r = radius * Math.pow(Math.min(ring, rings) / rings, 1.25);
      context.beginPath();
      context.arc(Math.cos(angle) * r, Math.sin(angle) * r, 1.3, 0, TAU);
      context.fillStyle = '#efd6d0a0';
      context.fill();
    });
    context.restore();
    return sway;
  }

  function spider(x, y, scale, rotation, time, phase = 0) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    context.scale(scale, scale);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.shadowColor = '#090607';
    context.shadowBlur = 3;
    // Eight jointed legs move in alternating groups along the silk.
    for (let side of [-1, 1]) {
      for (let leg = 0; leg < 4; leg++) {
        const stride = Math.sin(time * 4.8 + leg * 1.7 + side * 1.3 + phase);
        const rootY = -3 + leg * 2.4;
        const kneeX = side * (10 + Math.sin(leg) * 2 + stride * 1.4);
        const kneeY = [-13, -6, 7, 14][leg] + stride * 2;
        const tipX = side * ([16, 21, 20, 14][leg] + stride * 2);
        const tipY = [-21, -9, 14, 25][leg] + stride * 2.5;
        context.beginPath();
        context.moveTo(side * 2.5, rootY);
        context.lineTo(kneeX, kneeY);
        context.lineTo(tipX, tipY);
        context.strokeStyle = '#170e12';
        context.lineWidth = 2.4;
        context.stroke();
        context.strokeStyle = '#c88490';
        context.lineWidth = .65;
        context.stroke();
      }
    }
    context.beginPath();
    context.ellipse(0, 7, 6, 9, 0, 0, TAU);
    context.fillStyle = '#1c1016';
    context.strokeStyle = '#b87885';
    context.lineWidth = .7;
    context.fill();
    context.stroke();
    context.beginPath();
    context.ellipse(0, -3, 3.6, 5, 0, 0, TAU);
    context.fill();
    context.stroke();
    // A small crimson marking, deliberately quiet against the portrait.
    context.beginPath();
    context.moveTo(-2, 5); context.lineTo(2, 5); context.lineTo(0, 8);
    context.lineTo(2, 11); context.lineTo(-2, 11); context.lineTo(0, 8);
    context.closePath(); context.fillStyle = '#c4425a'; context.fill();
    context.restore();
  }

  function render() {
    context.clearRect(0, 0, width, height);
    const time = elapsed / 1000;
    const mobile = width < 761;
    const arrival = motionPreference.matches ? 1 : ease(time / 3.2);
    const drop = (1 - arrival) * -280;
    const radius = Math.min(width * (mobile ? .95 : .44), height * .8);
    const cx = width * .98;
    const cy = -12 + drop;
    const sway = web(cx, cy, radius, Math.PI * .08, Math.PI * .99, 12, 9, time, mobile ? .72 : 1);
    web(-8, drop * .6, Math.min(width * .27, 250), 0, Math.PI / 2, 7, 6, time, .55);

    // Loose silk across the top drops with the banner's main web.
    silk(() => {
      context.moveTo(width * .20, drop - 8);
      context.bezierCurveTo(width * .40, drop + 64, width * .55, drop + 46, width * .72, drop - 6);
    }, .28);
    silk(() => {
      context.moveTo(width * .22, drop - 7);
      context.bezierCurveTo(width * .41, drop + 76, width * .58, drop + 58, width * .74, drop - 4);
    }, .14);

    // Two spiders follow real radial strands of the corner web.
    for (let i = 0; i < 2; i++) {
      const angle = Math.PI * .08 + (Math.PI * .99 - Math.PI * .08) * [8, 3][i] / 12;
      const travel = .49 + Math.sin(time * [.16, .12][i] + i * 2.4) * .21;
      const r = radius * travel;
      const outward = Math.cos(time * [.16, .12][i] + i * 2.4) > 0;
      spider(cx + sway + Math.cos(angle) * r, cy + Math.sin(angle) * r,
        mobile ? .52 : .66, angle + (outward ? Math.PI / 2 : -Math.PI / 2), time, i * 2);
    }
    // A third spider lowers on its own thread, clear of the headline.
    const pendantX = width * (mobile ? .89 : .56) + Math.sin(time * .48) * 7;
    const pendantY = drop + (mobile ? 96 : 80) + ease((time - 1.1) / 4) * (mobile ? 94 : 135)
      + Math.sin(time * .32) * 18;
    silk(() => { context.moveTo(width * (mobile ? .89 : .56), drop - 10); context.lineTo(pendantX, pendantY - 9); }, .47, .65);
    spider(pendantX, pendantY, mobile ? .68 : .85, Math.PI + Math.sin(time * .48) * .07, time * .34, 1);

    // A tiny resident crawls across the loose ceiling thread.
    if (!mobile) {
      const position = .5 + Math.sin(time * .11) * .32;
      const x = width * (.2 + position * .52);
      const y = drop + Math.sin(position * Math.PI) * 40;
      spider(x, y, .44, Math.cos(time * .11) > 0 ? Math.PI / 2 : -Math.PI / 2, time, 4);
    }
  }

  function stop() { cancelAnimationFrame(request); request = 0; lastFrame = 0; }
  function frame(timestamp) {
    if (paused || !visible || document.hidden) { stop(); return; }
    if (!lastFrame) lastFrame = timestamp;
    const delta = timestamp - lastFrame;
    // 30 fps is ample for slow, deliberate crawling and avoids unnecessary work.
    if (delta >= 32) {
      elapsed += Math.min(delta, 80);
      lastFrame = timestamp;
      render();
    }
    request = requestAnimationFrame(frame);
  }
  function start() { if (!request && !paused && visible && !document.hidden) request = requestAnimationFrame(frame); }
  function syncControl() {
    control.hidden = false;
    control.setAttribute('aria-pressed', String(paused));
    control.querySelector('.motion-label').textContent = paused ? 'Play animation' : 'Pause animation';
    control.querySelector('.motion-icon').textContent = paused ? '▷' : 'Ⅱ';
  }
  function resize() {
    const bounds = hero.getBoundingClientRect();
    width = bounds.width; height = bounds.height;
    const density = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * density); canvas.height = Math.round(height * density);
    context.setTransform(density, 0, 0, density, 0, 0);
    render();
  }
  control.addEventListener('click', () => { paused = !paused; syncControl(); paused ? stop() : start(); });
  motionPreference.addEventListener('change', event => {
    paused = event.matches;
    if (paused) elapsed = Math.max(elapsed, 9000);
    syncControl(); stop(); render(); start();
  });
  document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; visible ? start() : stop(); }, {threshold:0}).observe(hero);
  new ResizeObserver(resize).observe(hero);
  if (paused) elapsed = 9000;
  syncControl(); resize(); start();
})();
