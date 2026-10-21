document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');

function closeMenu(returnFocus = false) {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('span').textContent = 'Menu';
  if (returnFocus) menuToggle.focus();
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('span').textContent = isOpen ? 'Close' : 'Menu';
});

navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
});

document.addEventListener('click', event => {
  if (!event.target.closest('.header-inner')) closeMenu();
});

window.matchMedia('(min-width: 641px)').addEventListener('change', () => closeMenu());

const copyButton = document.querySelector('#copyMail');
const email = document.querySelector('#mail');
const copyStatus = document.querySelector('#copyStatus');
let copyReset;

copyButton.addEventListener('click', async () => {
  clearTimeout(copyReset);
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(email.textContent.trim());
    copyButton.querySelector('.copy-label').textContent = 'Copied';
    copyStatus.textContent = 'Email address copied.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(email);
    selection.removeAllRanges();
    selection.addRange(range);
    copyStatus.textContent = 'Email selected. Press and hold or use your copy shortcut.';
  }
  copyReset = window.setTimeout(() => {
    copyButton.querySelector('.copy-label').textContent = 'Copy';
    copyStatus.textContent = '';
  }, 5000);
});
