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
