(() => {
  const scene = document.querySelector('.games-stage');
  if (!scene) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const root = document.documentElement;
  const properties = ['--games-x', '--games-y', '--games-turn', '--room-x', '--room-y'];

  function reset() {
    properties.forEach(property => scene.style.removeProperty(property));
  }

  scene.addEventListener('pointermove', event => {
    if (motion.matches || !pointer.matches || root.dataset.atmosphere !== 'on') return;
    const bounds = scene.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    scene.style.setProperty('--games-x', `${x * 10}px`);
    scene.style.setProperty('--games-y', `${y * 6}px`);
    scene.style.setProperty('--games-turn', `${x * 1.2}deg`);
    scene.style.setProperty('--room-x', `${x * -5}px`);
    scene.style.setProperty('--room-y', `${y * -3}px`);
  });
  scene.addEventListener('pointerleave', reset);
  motion.addEventListener('change', reset);
  pointer.addEventListener('change', reset);
  new MutationObserver(() => {
    if (root.dataset.atmosphere !== 'on') reset();
  }).observe(root, {attributes: true, attributeFilter: ['data-atmosphere']});
})();
