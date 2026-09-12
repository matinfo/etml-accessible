/*
 * ETML Accessible — Modale (version APRÈS)
 * Ouverture uniquement sur action volontaire, focus déplacé dans la boîte de
 * dialogue, piège de focus (Tab/Shift+Tab bouclent), fermeture au clic
 * extérieur/Échap/bouton, focus restitué au déclencheur à la fermeture.
 */
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.modal-after-overlay');
  if (!overlay) return;
  const box = overlay.querySelector('.modal-after-box');
  const openBtn = document.getElementById('open-newsletter');
  const closeBtn = overlay.querySelector('.modal-close');
  const main = document.getElementById('page-wrapper');
  let lastFocused = null;

  function getFocusable() {
    return Array.from(box.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'))
      .filter((el) => !el.disabled && el.offsetParent !== null);
  }

  function openModal() {
    lastFocused = document.activeElement;
    overlay.classList.add('is-open');
    if (main) main.setAttribute('aria-hidden', 'true');
    const focusables = getFocusable();
    (focusables[0] || box).focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    if (main) main.removeAttribute('aria-hidden');
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      closeModal();
      return;
    }
    if (e.key === 'Tab') {
      const focusables = getFocusable();
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  const form = overlay.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
    });
  }
});
