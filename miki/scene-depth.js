(() => {
  const scenes = [
    {selector: '.home-hero', foreground: '.home-portrait', keys: ['--shift-x', '--shift-y', '--turn-y'], background: '--castle', pointer: [18, 10, 3], room: [7, 4]},
    {selector: '.voice-stage', keys: ['--voice-x', '--voice-y', '--voice-turn'], background: '--room', pointer: [18, 10, 2], room: [7, 4]},
    ...['studio', 'games', 'court'].map(name => ({selector: `.${name}-stage`, keys: [`--${name}-x`, `--${name}-y`, `--${name}-turn`], background: '--room', pointer: [10, 6, 1.2], room: [5, 3]}))
  ];
  const config = scenes.find(item => document.querySelector(item.selector));
  if (!config) return;
  const scene = document.querySelector(config.selector);
  const foreground = config.foreground ? scene.querySelector(config.foreground) : scene;
  if (!foreground) return;

  const root = document.documentElement;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  // Narrow previews and touch devices both use the page's natural scrolling.
  const scrollMode = matchMedia('(max-width: 800px), (hover: none), (pointer: coarse)');
  const roomKeys = [`${config.background}-x`, `${config.background}-y`];
  let visible = true;
  let frame = 0;

  function enabled() {
    return !motion.matches && !document.hidden && root.dataset.atmosphere === 'on';
  }

  function reset() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    config.keys.forEach(key => foreground.style.removeProperty(key));
    roomKeys.forEach(key => scene.style.removeProperty(key));
  }

  function apply(x, y, turn, roomX, roomY) {
    foreground.style.setProperty(config.keys[0], `${x.toFixed(3)}px`);
    foreground.style.setProperty(config.keys[1], `${y.toFixed(3)}px`);
    foreground.style.setProperty(config.keys[2], `${turn.toFixed(3)}deg`);
    scene.style.setProperty(roomKeys[0], `${roomX.toFixed(3)}px`);
    scene.style.setProperty(roomKeys[1], `${roomY.toFixed(3)}px`);
  }

  function updateScroll() {
    frame = 0;
    if (!enabled() || !scrollMode.matches || !visible) return;
    const bounds = scene.getBoundingClientRect();
    if (bounds.bottom <= 0 || bounds.top >= innerHeight) return;
    const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height)));
    // The foreground lingers slightly while the distant scenery moves away.
    apply(progress * 3, progress * 18, progress * .7, -progress * 2, -progress * 10);
  }

  function scheduleScroll() {
    if (!frame && visible && enabled() && scrollMode.matches) {
      frame = requestAnimationFrame(updateScroll);
    }
  }

  function refresh() {
    reset();
    scheduleScroll();
  }

  scene.addEventListener('pointermove', event => {
    if (!enabled() || scrollMode.matches || !pointer.matches || event.pointerType === 'touch') return;
    const bounds = scene.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    apply(x * config.pointer[0], y * config.pointer[1], x * config.pointer[2], -x * config.room[0], -y * config.room[1]);
  }, {passive: true});
  scene.addEventListener('pointerleave', () => {
    if (!scrollMode.matches) reset();
  });

  // No touch interception or permanent animation loop: at most one frame per scroll.
  window.addEventListener('scroll', scheduleScroll, {passive: true});
  window.addEventListener('resize', scheduleScroll, {passive: true});
  window.addEventListener('pageshow', refresh);
  document.addEventListener('visibilitychange', refresh);
  [motion, pointer, scrollMode].forEach(query => query.addEventListener('change', refresh));
  new MutationObserver(refresh).observe(root, {attributes: true, attributeFilter: ['data-atmosphere']});

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) scheduleScroll();
      else reset();
    }).observe(scene);
  }
  scheduleScroll();
})();
