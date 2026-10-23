const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
  menuButton.querySelector('span').textContent = '+';
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
  menuButton.querySelector('span').textContent = open ? '−' : '+';
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
document.querySelectorAll('[data-interest]').forEach(link => {
  link.addEventListener('click', () => { document.querySelector('#project-type').value = link.dataset.interest; });
});

document.querySelector('#enquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const type = document.querySelector('#project-type').value;
  const brief = document.querySelector('#project-brief').value.trim();
  const subject = `Astra — ${type}`;
  const body = `Hello Astra,\n\nI’d like to enquire about ${type.toLowerCase()}.\n\n${brief || 'Project details:\nTimeline:\n'}\n\nThank you.`;
  window.location.href = `mailto:xx.astra.va@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#contact-status').textContent = 'Your email draft is ready. If your email app did not open, use the email address above.';
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
const motionKey = 'astra-motion-paused';
let motionPaused = false;
try { motionPaused = localStorage.getItem(motionKey) === 'true'; } catch { /* Storage is optional. */ }
const animations = new Set();
function syncMotion() {
  const paused = motionPaused || reducedMotion.matches;
  document.documentElement.classList.toggle('motion-paused', paused);
  motionButton.hidden = reducedMotion.matches;
  motionButton.setAttribute('aria-pressed', String(motionPaused));
  motionButton.textContent = motionPaused ? 'Resume motion' : 'Pause motion';
  if (paused) { animations.forEach(animation => animation.finish()); animations.clear(); }
}
motionButton.addEventListener('click', () => {
  motionPaused = !motionPaused;
  try { localStorage.setItem(motionKey, String(motionPaused)); } catch { /* Storage is optional. */ }
  syncMotion();
});
reducedMotion.addEventListener('change', syncMotion);
syncMotion();
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (motionPaused || reducedMotion.matches) return;
      const animation = entry.target.animate([{ opacity: .4, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 600, easing: 'cubic-bezier(.2,.7,.2,1)' });
      animations.add(animation);
      animation.addEventListener('finish', () => animations.delete(animation));
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
document.addEventListener('focusin', () => { animations.forEach(animation => animation.finish()); animations.clear(); });
