'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(restoreFocus = false) {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  menu.querySelector('span').textContent = '+';
  if (restoreFocus) menu.focus();
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
  menu.querySelector('span').textContent = open ? '−' : '+';
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width:761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const filters = document.querySelector('.filters');
filters.hidden = false;
filters.addEventListener('click', event => {
  const selected = event.target.closest('button[data-filter]');
  if (!selected) return;
  filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button === selected)));
  let visible = 0;
  document.querySelectorAll('.story').forEach(story => {
    const show = selected.dataset.filter === 'all' || story.dataset.category === selected.dataset.filter;
    story.hidden = !show;
    if (show) visible++;
  });
  document.querySelector('#filter-status').textContent = `${visible} creative works shown.`;
});
const projectType = document.querySelector('#project-type');
document.querySelectorAll('[data-interest]').forEach(link => {
  link.addEventListener('click', () => { projectType.value = link.dataset.interest; });
});
const email = 'ksodonnell1998@icloud.com';
const status = document.querySelector('#contact-status');
document.querySelector('#enquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const subject = `Karmakaze enquiry — ${projectType.value}`;
  const idea = document.querySelector('#project-brief').value.trim();
  const body = `Hello Key Managements,\n\nI’d like to discuss ${projectType.value.toLowerCase()} with Karmakaze.\n\n${idea || 'Project idea:\n\nTimeline:'}\n\nThank you,\n`;
  const draft = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = draft;
  status.textContent = `Your email draft is ready. If your mail app didn’t open, email ${email} directly.`;
});
const copy = document.querySelector('.copy-email');
if (window.isSecureContext && navigator.clipboard) {
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(email); status.textContent = 'Management email copied.'; }
    catch { status.textContent = `Copy unavailable. Email management at ${email}.`; }
  });
}
