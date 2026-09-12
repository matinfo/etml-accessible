/*
 * ETML Accessible — Modale (version AVANT)
 * Ouverture automatique forcée, aucune gestion du focus, fermeture au clic
 * uniquement (le clavier ne permet pas de fermer la fenêtre : Échap ignoré,
 * l'icône de fermeture n'est pas un élément focalisable).
 */
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.modal-before-overlay');
  if (!overlay) return;

  setTimeout(() => {
    overlay.classList.add('is-open');
    // Le focus n'est jamais déplacé dans la modale : un utilisateur au clavier
    // continue de naviguer dans la page « sous » la fenêtre ouverte.
  }, 2000);

  overlay.querySelector('.close-icon').addEventListener('click', () => {
    overlay.classList.remove('is-open');
  });
});
