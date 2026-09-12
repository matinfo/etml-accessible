/*
 * ETML Accessible — Formulaire (version AVANT)
 * Validation minimaliste : ajoute uniquement une bordure rouge, sans aucun texte
 * d'erreur ni déplacement du focus (échecs 3.3.1, 1.4.1, 4.1.2).
 */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.form-before .submit-fake');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const nom = document.getElementById('bf-nom');
    const email = document.getElementById('bf-email');
    [nom, email].forEach((f) => f.classList.remove('invalid'));

    let hasError = false;
    if (!nom.value.trim()) { nom.classList.add('invalid'); hasError = true; }
    if (!email.value.includes('@')) { email.classList.add('invalid'); hasError = true; }

    if (!hasError) {
      // Pas de confirmation accessible : simple alerte navigateur bloquante
      alert('Formulaire envoyé.');
    }
  });
});
