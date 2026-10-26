(() => {
  const scene = document.querySelector('.voice-stage');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const root = document.documentElement;
  const properties = ['--voice-x', '--voice-y', '--voice-turn', '--room-x', '--room-y'];

  function reset() {
    properties.forEach(property => scene.style.removeProperty(property));
  }

  scene.addEventListener('pointermove', event => {
    if (motion.matches || !pointer.matches || root.dataset.atmosphere !== 'on') return;
    const bounds = scene.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    scene.style.setProperty('--voice-x', `${x * 18}px`);
    scene.style.setProperty('--voice-y', `${y * 10}px`);
    scene.style.setProperty('--voice-turn', `${x * 2}deg`);
    scene.style.setProperty('--room-x', `${x * -7}px`);
    scene.style.setProperty('--room-y', `${y * -4}px`);
  });
  scene.addEventListener('pointerleave', reset);
  motion.addEventListener('change', reset);
  pointer.addEventListener('change', reset);
  new MutationObserver(() => {
    if (root.dataset.atmosphere !== 'on') reset();
  }).observe(root, {attributes: true, attributeFilter: ['data-atmosphere']});
})();
