/*
 * ETML Accessible — Menu (version APRÈS)
 * Menu déroulant accessible : bouton <button aria-expanded>, fermeture au
 * clavier (Échap), fermeture au clic extérieur, gestion du focus.
 */
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.menu-after .menu-toggle');

  function closeAll(except) {
    toggles.forEach((btn) => {
      if (btn === except) return;
      btn.setAttribute('aria-expanded', 'false');
      const submenu = document.getElementById(btn.getAttribute('aria-controls'));
      if (submenu) submenu.hidden = true;
    });
  }

  toggles.forEach((btn) => {
    const submenu = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      closeAll(btn);
      btn.setAttribute('aria-expanded', String(!expanded));
      if (submenu) submenu.hidden = expanded;
      if (!expanded && submenu) {
        const firstLink = submenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' && submenu) {
        e.preventDefault();
        btn.setAttribute('aria-expanded', 'true');
        submenu.hidden = false;
        const firstLink = submenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    if (submenu) {
      submenu.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          btn.setAttribute('aria-expanded', 'false');
          submenu.hidden = true;
          btn.focus();
        }
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-after .menu-items > li')) {
      closeAll(null);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll(null);
  });
});
