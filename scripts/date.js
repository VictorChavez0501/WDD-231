// date.js - sets current year and lastModified
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('currentYear');
  const modifiedEl = document.getElementById('modifiedValue');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (modifiedEl) {
    // document.lastModified returns a readable string
    modifiedEl.textContent = document.lastModified || 'Unknown';
  }
});
