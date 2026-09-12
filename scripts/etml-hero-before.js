/*
 * ETML Accessible — Hero (version AVANT)
 * Diaporama automatique SANS possibilité d'arrêt (échec WCAG 2.2.2 Pause, Stop, Hide)
 * Flèches simulées par des <div onclick>, invisibles pour le clavier (échec 2.1.1)
 */
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-before .slide');
  let index = 0;

  function show(i) {
    slides.forEach((s, n) => s.classList.toggle('is-active', n === i));
  }

  // Aucune fonction pause() n'est jamais proposée à l'utilisateur.
  setInterval(() => {
    index = (index + 1) % slides.length;
    show(index);
  }, 3000);

  document.querySelectorAll('.hero-before .arrow').forEach((arrow) => {
    arrow.addEventListener('click', () => {
      index = arrow.classList.contains('next')
        ? (index + 1) % slides.length
        : (index - 1 + slides.length) % slides.length;
      show(index);
    });
  });
});
