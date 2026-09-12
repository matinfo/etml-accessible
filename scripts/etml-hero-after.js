/*
 * ETML Accessible — Hero (version APRÈS)
 * Carrousel accessible : contrôles réels au clavier, bouton pause/lecture,
 * respect de prefers-reduced-motion, indicateurs avec aria-current.
 */
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-after');
  if (!hero) return;
  const slides = hero.querySelectorAll('.slide');
  const dots = hero.querySelectorAll('.dots button');
  const playPause = hero.querySelector('.play-pause');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = 0;
  let playing = !prefersReducedMotion; // respecte immédiatement la préférence système
  let timer = null;

  function show(i) {
    index = i;
    slides.forEach((s, n) => s.classList.toggle('is-active', n === i));
    dots.forEach((d, n) => d.setAttribute('aria-current', n === i ? 'true' : 'false'));
  }

  function next() { show((index + 1) % slides.length); }
  function prev() { show((index - 1 + slides.length) % slides.length); }

  function play() {
    if (timer) return;
    playing = true;
    playPause.setAttribute('aria-pressed', 'true');
    playPause.setAttribute('aria-label', 'Mettre le diaporama en pause');
    playPause.textContent = '⏸';
    timer = setInterval(next, 4000);
  }

  function pause() {
    playing = false;
    clearInterval(timer);
    timer = null;
    playPause.setAttribute('aria-pressed', 'false');
    playPause.setAttribute('aria-label', 'Lancer le diaporama automatique');
    playPause.textContent = '▶';
  }

  hero.querySelector('.arrow.next').addEventListener('click', () => { next(); pause(); });
  hero.querySelector('.arrow.prev').addEventListener('click', () => { prev(); pause(); });
  dots.forEach((dot, n) => dot.addEventListener('click', () => { show(n); pause(); }));
  playPause.addEventListener('click', () => (timer ? pause() : play()));

  // Pause automatique si le clavier entre dans le carrousel (hors bouton lecture/pause
  // lui-même, pour ne pas entrer en conflit avec son propre bascule play/pause).
  hero.addEventListener('focusin', (e) => {
    if (e.target !== playPause) pause();
  });

  show(0);
  if (playing) play(); else pause();
});
