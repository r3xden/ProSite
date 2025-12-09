// ProSite — main.js
// Sidebar, reveal on scroll, theme (persistent), contact form UX

(function(){
  // ---------- SIDEBAR / HAMBURGER ----------
  const hamburgerButtons = Array.from(document.querySelectorAll('.hamburger'));
  const sidebar = document.querySelector('.sidebar');

  hamburgerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const opened = sidebar.classList.toggle('open');
      // aria-hidden -> false when open
      sidebar.setAttribute('aria-hidden', opened ? 'false' : 'true');
    });
  });

  // Close sidebar when clicking outside (mobile-friendly)
  document.addEventListener('click', (e) => {
    if (!sidebar) return;
    if (!sidebar.classList.contains('open')) return;
    const inside = sidebar.contains(e.target) || hamburgerButtons.some(b=>b.contains(e.target));
    if (!inside) sidebar.classList.remove('open');
  });

  // ---------- REVEAL ON SCROLL ----------
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  const revealOnScroll = () => {
    const height = window.innerHeight;
    reveals.forEach(el => {
      if (el.classList.contains('show')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < height - 60) el.classList.add('show');
    });
  };
  window.addEventListener('scroll', revealOnScroll, {passive:true});
  window.addEventListener('resize', revealOnScroll);
  revealOnScroll();

  // ---------- THEME (persistent) ----------
  // Use body.light to toggle light theme. Save in localStorage.
  const darkBtn = document.getElementById('darkBtn');
  const lightBtn = document.getElementById('lightBtn');

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }

  // Apply saved theme on load
  const saved = localStorage.getItem('theme');
  if (saved === 'light') applyTheme('light');
  else applyTheme('dark');

  if (darkBtn) darkBtn.addEventListener('click', () => applyTheme('dark'));
  if (lightBtn) lightBtn.addEventListener('click', () => applyTheme('light'));

  // ---------- SIMPLE CONTACT FORM UX ----------
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (form.querySelector('[name="name"]') || {}).value || '';
      const email = (form.querySelector('[name="email"]') || {}).value || '';
      const message = (form.querySelector('[name="message"]') || {}).value || '';
      if (!name.trim() || !email.trim() || !message.trim()) {
        alert('Please fill all fields.');
        return;
      }
      // friendly UX placeholder — replace with a backend later
      alert('Thanks — message captured. (Set up server/email later to actually send.)');
      form.reset();
    });
  }

})();
