// navigation.js - responsive nav
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primary-nav');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.style.display = expanded ? 'none' : 'block';
    navToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  });

  // Close mobile nav when a link is clicked (good UX)
  primaryNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 700) {
        primaryNav.style.display = 'none';
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Ensure proper nav display on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 700) {
      primaryNav.style.display = 'block';
      navToggle.setAttribute('aria-expanded', 'true');
    } else {
      primaryNav.style.display = 'none';
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
