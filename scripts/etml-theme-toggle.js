(() => {
  const STORAGE_KEY = 'etml-theme';
  const root = document.documentElement;

  function apply(theme) {
    if (theme === 'dark' || theme === 'light') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
  }

  function currentlyDark() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function updateButton(button, isDark) {
    button.setAttribute('aria-pressed', String(isDark));
    button.querySelector('.theme-toggle-icon').textContent = isDark ? '☀️' : '🌙';
    button.querySelector('.theme-toggle-label').textContent = isDark
      ? 'Mode clair'
      : 'Mode sombre';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;

    updateButton(button, currentlyDark());

    button.addEventListener('click', () => {
      const isDark = !currentlyDark();
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
      apply(isDark ? 'dark' : 'light');
      updateButton(button, isDark);
    });
  });
})();
