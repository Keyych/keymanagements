(() => {
  'use strict';
  const oldSections = { '#services': 'services/', '#about': 'about/', '#contact': 'contact/', '#process': 'contact/#process' };
  const redirectLegacy = () => {
    const path = oldSections[window.location.hash];
    if (path) window.location.replace(new URL(path, window.location.href));
  };
  redirectLegacy();
  window.addEventListener('hashchange', redirectLegacy);

  const entrance = document.querySelector('.entrance');
  const door = document.querySelector('#openDoor');
  const inside = document.querySelector('.door-inside');
  const links = document.querySelector('#door-links');
  const portrait = document.querySelector('.door-portrait');
  const closeButton = document.querySelector('#closeDoor');
  const status = document.querySelector('#doorStatus');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timers = [];
  let keyboardEntry = false;
  const schedule = (fn, delay) => timers.push(window.setTimeout(fn, delay));
  const clearTimers = () => { timers.forEach(window.clearTimeout); timers = []; };

  function setState(state) {
    entrance.dataset.state = state;
    door.setAttribute('aria-expanded', String(state === 'open'));
    portrait.setAttribute('aria-hidden', String(!['opening', 'open'].includes(state)));
    entrance.setAttribute('aria-busy', String(['unlocking', 'opening', 'closing'].includes(state)));
  }

  function revealLinks(instant = false) {
    setState('open');
    inside.inert = false;
    inside.removeAttribute('aria-hidden');
    door.inert = true;
    door.setAttribute('aria-hidden', 'true');
    status.textContent = 'The door is open. Choose the support, the person, or the next chapter.';
    if (keyboardEntry) schedule(() => links.querySelector('a').focus({ preventScroll: true }), instant ? 0 : 800);
  }

  function openDoor(instant = false, keyboard = false) {
    if (entrance.dataset.state === 'open') return;
    if (!instant && entrance.dataset.state !== 'closed') return;
    clearTimers();
    keyboardEntry = keyboard;
    door.disabled = true;
    if (instant || reducedMotion.matches) {
      entrance.classList.add('instant-open');
      revealLinks(true);
      return;
    }
    entrance.classList.remove('instant-open');
    setState('unlocking');
    status.textContent = 'Turning the key…';
    schedule(() => { setState('opening'); status.textContent = 'Opening the door…'; }, 1350);
    schedule(() => revealLinks(), 3000);
  }

  door.addEventListener('click', event => openDoor(false, event.detail === 0));
  document.querySelectorAll('[data-skip-door]').forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    openDoor(true, true);
  }));
  closeButton.addEventListener('click', () => {
    clearTimers();
    entrance.classList.remove('instant-open');
    inside.inert = true;
    inside.setAttribute('aria-hidden', 'true');
    door.inert = false;
    door.removeAttribute('aria-hidden');
    door.disabled = true;
    setState('closing');
    status.textContent = 'Closing the door…';
    schedule(() => {
      setState('closed');
      door.disabled = false;
      status.textContent = 'The door is closed. Turn the key to open it again.';
      door.focus({ preventScroll: true });
    }, reducedMotion.matches ? 0 : 1650);
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches && ['unlocking', 'opening'].includes(entrance.dataset.state)) openDoor(true, keyboardEntry);
  });

  inside.inert = true;
  inside.setAttribute('aria-hidden', 'true');
  setState('closed');
  document.documentElement.classList.add('portal-initializing', 'portal-ready');
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
    document.documentElement.classList.remove('portal-initializing');
  }));
})();
