(() => {
  const portrait = document.querySelector('.home-portrait');
  const hero = document.querySelector('.home-hero');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const root = document.documentElement;

  function reset() {
    ['--shift-x', '--shift-y', '--turn-y'].forEach(property => portrait.style.removeProperty(property));
    ['--castle-x', '--castle-y'].forEach(property => hero.style.removeProperty(property));
  }

  // A small perspective shift separates the cutout from its light and the foreground mist.
  hero.addEventListener('pointermove', event => {
    if (motion.matches || !pointer.matches || root.dataset.atmosphere !== 'on') return;
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    portrait.style.setProperty('--shift-x', `${x * 18}px`);
    portrait.style.setProperty('--shift-y', `${y * 10}px`);
    portrait.style.setProperty('--turn-y', `${x * 3}deg`);
    hero.style.setProperty('--castle-x', `${x * -7}px`);
    hero.style.setProperty('--castle-y', `${y * -4}px`);
  });
  hero.addEventListener('pointerleave', reset);
  motion.addEventListener('change', reset);
  pointer.addEventListener('change', reset);
  new MutationObserver(() => {
    if (root.dataset.atmosphere !== 'on') reset();
  }).observe(root, {attributes: true, attributeFilter: ['data-atmosphere']});
})();
