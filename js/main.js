// ProSite — main.js
// Sidebar, reveal on scroll, theme, contact simple UX

(function(){
  // Sidebar toggle (works page-wide)
  const hamburger = document.querySelectorAll('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  hamburger.forEach(btn => {
    btn.addEventListener('click', () => {
      const open = sidebar.classList.toggle('open');
      // aria
      sidebar.setAttribute('aria-hidden', open ? 'false' : 'true');
    });
  });

  // Scroll reveal for ".reveal" elements
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  const revealOnScroll = () => {
    const height = window.innerHeight;
    reveals.forEach(el => {
      if (el.classList.contains('show')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < height - 60) {
        el.classList.add('show');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll, {passive:true});
  window.addEventListener('resize', revealOnScroll);
  // initial
  revealOnScroll();

  // Theme toggle (light / dark)
  const darkBtn = document.getElementById('darkBtn');
  const lightBtn = document.getElementById('lightBtn');
  if (darkBtn) {
    darkBtn.addEventListener('click', () => {
      document.documentElement.style.setProperty('--bg1','#000');
      document.documentElement.style.setProperty('--bg2','#0f0f0f');
      document.documentElement.style.setProperty('--card','rgba(255,255,255,0.06)');
      document.body.style.color = '#fff';
    });
  }
  if (lightBtn) {
    lightBtn.addEventListener('click', () => {
      document.documentElement.style.setProperty('--bg1','#ffffff');
      document.documentElement.style.setProperty('--bg2','#f7f7f7');
      document.documentElement.style.setProperty('--card','rgba(0,0,0,0.06)');
      document.body.style.color = '#000';
    });
  }

  // Contact form UX (no backend) — shows an alert and clears fields
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) {
        alert('Please fill all fields.');
        return;
      }
      // Friendly UX — we don't actually send from frontend.
      alert('Thanks — message captured locally. (Add backend/email later.)');
      form.reset();
    });
  }

})();
