// ProSite — main.js
// Sidebar, reveal on scroll, theme (persistent), contact form with EmailJS

(function(){
  // ---------- SIDEBAR / HAMBURGER ----------
  const hamburgerButtons = Array.from(document.querySelectorAll('.hamburger'));
  const sidebar = document.querySelector('.sidebar');

  hamburgerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const opened = sidebar.classList.toggle('open');
      sidebar.setAttribute('aria-hidden', opened ? 'false' : 'true');
    });
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (!sidebar) return;
    if (!sidebar.classList.contains('open')) return;
    const inside = sidebar.contains(e.target) || hamburgerButtons.some(b => b.contains(e.target));
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

  const saved = localStorage.getItem('theme');
  if (saved === 'light') applyTheme('light');
  else applyTheme('dark');

  if (darkBtn) darkBtn.addEventListener('click', () => applyTheme('dark'));
  if (lightBtn) lightBtn.addEventListener('click', () => applyTheme('light'));

  // ---------- ✅ REAL CONTACT FORM SENDER (EmailJS) ----------
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        alert('Please fill all fields.');
        return;
      }

      emailjs.send(
        "service_nwc17zs",     // <-- YOU WILL REPLACE, REPLACEMENT IS IMPORTANT ELSE YOU WILL NOT GET EMAIL CONTACT MESSAGES ON YOUR EMAIL
        "template_mbhhpbd",    // <-- YOU WILL REPLACE
        {
          name: name,
          email: email,
          message: message
        }
      ).then(
        function() {
          alert("✅ Message sent successfully!");
          form.reset();
        },
        function(error) {
          alert("❌ Failed to send message. Try again later.");
          console.error("EmailJS Error:", error);
        }
      );
    });
  }

})();
