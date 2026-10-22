const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const menuLabel = document.querySelector('.menu-label');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuLabel.textContent = 'Menu';
  mobileNav.hidden = true;
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuLabel.textContent = isOpen ? 'Menu' : 'Close';
  mobileNav.hidden = isOpen;
});

mobileNav.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  closeMenu();
  const href = link.getAttribute('href');
  if (href.startsWith('#')) {
    const section = document.querySelector(href);
    section.setAttribute('tabindex', '-1');
    section.focus({ preventScroll: true });
    section.addEventListener('blur', () => section.removeAttribute('tabindex'), { once: true });
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});

window.matchMedia('(min-width: 641px)').addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

const groups = [...document.querySelectorAll('.rule-group')];
const expandButton = document.querySelector('.expand-rules');
expandButton.hidden = false;

function updateExpandButton() {
  const allOpen = groups.every((group) => group.open);
  expandButton.firstChild.textContent = allOpen ? 'Collapse all ' : 'Expand all ';
  expandButton.setAttribute('aria-label', allOpen ? 'Collapse all boundary groups' : 'Expand all boundary groups');
  expandButton.querySelector('use').setAttribute('href', allOpen ? '#i-check' : '#i-plus');
}

expandButton.addEventListener('click', () => {
  const shouldOpen = !groups.every((group) => group.open);
  groups.forEach((group) => { group.open = shouldOpen; });
  updateExpandButton();
});
groups.forEach((group) => group.addEventListener('toggle', updateExpandButton));
updateExpandButton();

// Print all the boundaries, then restore the visitor's open/closed groups.
let beforePrintState = [];
window.addEventListener('beforeprint', () => {
  beforePrintState = groups.map((group) => group.open);
  groups.forEach((group) => { group.open = true; });
});
window.addEventListener('afterprint', () => {
  groups.forEach((group, index) => { group.open = beforePrintState[index]; });
});

const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');
let copyTimer;
if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    clearTimeout(copyTimer);
    try {
      const email = document.querySelector('.email-card .card-handle').textContent;
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = 'Email copied!';
      copyButton.setAttribute('aria-label', 'Email copied');
      copyButton.querySelector('use').setAttribute('href', '#i-check');
    } catch {
      copyStatus.textContent = 'Please select the address to copy it.';
    }
    copyTimer = setTimeout(() => {
      copyStatus.textContent = '';
      copyButton.setAttribute('aria-label', 'Copy email address');
      copyButton.querySelector('use').setAttribute('href', '#i-copy');
    }, 3000);
  });
}

if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.main-nav a')];
  const visibleSections = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleSections.add(entry.target.id);
      else visibleSections.delete(entry.target.id);
    });
    const active = links.find((link) => visibleSections.has(link.hash.slice(1)));
    links.forEach((link) => {
      if (link === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-18% 0px -50% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]:not(#top)').forEach((section) => observer.observe(section));
}

// Content stays visible by default. Motion is an enhancement, never a loading gate.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const activeEntrances = new Map();

function finishEntrances() {
  activeEntrances.forEach((animation) => animation.finish());
}

function updateMotion() {
  const reduced = motionPreference.matches;
  document.documentElement.classList.toggle('motion-ready', !reduced);
  if (reduced) finishEntrances();
}

motionPreference.addEventListener('change', updateMotion);
updateMotion();

function updatePageVisibility() {
  document.documentElement.classList.toggle('page-hidden', document.hidden);
  if (document.hidden) finishEntrances();
}
document.addEventListener('visibilitychange', updatePageVisibility);
updatePageVisibility();

// Finish a reveal immediately when keyboard navigation reaches its content.
document.addEventListener('focusin', (event) => {
  activeEntrances.forEach((animation, element) => {
    if (element.contains(event.target)) animation.finish();
  });
});
window.addEventListener('beforeprint', finishEntrances);

if ('IntersectionObserver' in window) {
  if ('animate' in Element.prototype) {
    const entranceDelays = new Map();
    const heroElements = document.querySelectorAll('.hero-copy>.eyebrow, .hero-title-line>span, .hero-description, .hero-detail, .hero-copy>.button, .hero-footnote');
    heroElements.forEach((element, index) => entranceDelays.set(element, Math.min(index * 80, 400)));

    const entranceObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        entranceObserver.unobserve(target);
        if (motionPreference.matches || document.hidden || target.contains(document.activeElement)) return;
        const animation = target.animate([
          { opacity: 0, transform: 'translateY(24px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 800,
          delay: entranceDelays.get(target) || 0,
          easing: 'cubic-bezier(.22, 1, .36, 1)',
          fill: 'backwards'
        });
        activeEntrances.set(target, animation);
        animation.onfinish = animation.oncancel = () => activeEntrances.delete(target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

    const sectionElements = document.querySelectorAll('.values-inner, .boundaries-intro, .boundaries-content, .work-layout>div, .support-heading, .social-card, .support-bottom, .footer-top, .footer-wordmark');
    [...heroElements, ...sectionElements].forEach((element) => entranceObserver.observe(element));
  }
}
