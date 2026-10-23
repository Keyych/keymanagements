(() => {
  const root = document.documentElement;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('.atmosphere-toggle');
  const leaves = document.querySelector('.wind-leaves');
  let paused = false;
  try { paused = localStorage.getItem('miki-atmosphere-paused') === 'true'; } catch { /* Storage is optional. */ }

  // Fixed positions keep the composition stable across visits and testing.
  for (let index = 0; index < 12; index++) {
    const leaf = document.createElement('span');
    leaf.className = 'wind-leaf';
    const values = {
      y: `${5 + ((index * 23) % 81)}%`,
      size: `${10 + ((index * 7) % 14)}px`,
      time: `${21 + ((index * 7) % 19)}s`,
      delay: `${-index * 5.7 - 3}s`,
      spin: `${2.9 + (index % 4) * 1.1}s`,
      blur: index % 3 === 0 ? '1px' : '.15px',
      opacity: index % 3 === 0 ? '.3' : '.55'
    };
    Object.entries(values).forEach(([key, value]) => leaf.style.setProperty(`--leaf-${key}`, value));
    leaf.append(document.createElement('i'));
    leaves.append(leaf);
  }

  const regions = [document.querySelector('.hero')];
  document.querySelectorAll('.voice-section, .games-section, .digital-section, .court-section, .chapter-directory, .chapter-page .support-section').forEach(section => {
    const haze = document.createElement('div');
    haze.className = 'section-mist';
    haze.setAttribute('aria-hidden', 'true');
    const flow = document.createElement('span');
    flow.className = 'mist-flow';
    haze.append(flow);
    section.prepend(haze);
    regions.push(section);
  });

  // Only nearby scenery runs. CSS transforms do the animation; no frame loop or scroll handler.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('wind-active', entry.isIntersecting));
    }, {rootMargin: '350px 0px'});
    regions.forEach(region => observer.observe(region));
  } else {
    regions.forEach(region => region.classList.add('wind-active'));
  }

  function update() {
    root.dataset.atmosphere = !paused && !motion.matches && !document.hidden ? 'on' : 'paused';
    toggle.hidden = motion.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Resume atmospheric animation' : 'Pause atmospheric animation');
    toggle.querySelector('span').textContent = paused ? 'Resume mist' : 'Pause mist';
  }
  toggle.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('miki-atmosphere-paused', String(paused)); } catch { /* Storage is optional. */ }
    update();
  });
  motion.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  update();
})();
