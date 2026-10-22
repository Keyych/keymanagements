(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('navigation');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  // Pre-select the enquiry subject when arriving via a service link
  document.querySelectorAll('[data-interest]').forEach((link) => {
    link.addEventListener('click', () => {
      const select = document.getElementById('project-type');
      if (select) select.value = link.dataset.interest;
    });
  });

  const form = document.getElementById('enquiry-form');
  const status = document.getElementById('contact-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const project = document.getElementById('project-type').value;
      const brief = document.getElementById('project-brief').value.trim();
      const subject = encodeURIComponent('Enquiry for Nox_vyper — ' + project);
      const body = encodeURIComponent(
        'Hi Key Managements,\n\nI’d like to work with Nox_vyper.\n\nInterested in: ' + project +
        (brief ? '\n\nThe idea:\n' + brief : '') + '\n\nThanks!'
      );
      window.location.href = 'mailto:ksodonnell1998@icloud.com?subject=' + subject + '&body=' + body;
      if (status) status.textContent = 'Your email app should open with a draft enquiry.';
    });
  }
})();
