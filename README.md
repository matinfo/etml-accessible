# ETML Accessible — Démo pédagogique WCAG 2.2

**ETML Accessible** est un site fictif, sur le thème de l'**ETML** (Ecole Technique - Ecole des
Métiers de Lausanne), conçu pour illustrer les bonnes et mauvaises pratiques d'accessibilité web
lors de formations, ateliers et cours à destination des étudiant·e·s.

Ce projet est une adaptation en français, avec une UI modernisée et une identité visuelle ETML,
du projet pédagogique original [Accessible University](https://github.com/OpenAssessItToolkit/accessible_u).

## Pages

- [`index.html`](index.html) — page d'accueil du dispositif pédagogique
- [`avant.html`](avant.html) — version **« Avant »** : même interface, truffée d'erreurs
  d'accessibilité volontaires (démo pédagogique, à ne jamais reproduire en production)
- [`apres.html`](apres.html) — version **« Après »** : la même interface, corrigée selon les
  WCAG 2.2 (niveau AA)
- [`erreurs.html`](erreurs.html) — tableau récapitulatif des problèmes, du critère WCAG concerné,
  de leur gravité et de la correction appliquée

## Composants comparés

Chaque composant illustre une famille différente de critères WCAG 2.2 :

| Composant | Ce qu'il illustre |
|---|---|
| Menu de navigation | Contraste, focus visible, menus déroulants au clavier |
| Bandeau / carrousel | Alternatives textuelles, pause/lecture, mouvement réduit |
| Actualités | Hiérarchie des titres, liens explicites, zones cliquables |
| Formulaire d'inscription | Labels, groupes de champs, gestion des erreurs, alternative au CAPTCHA |
| Fenêtre modale | Piège de focus, rôle ARIA, fermeture au clavier |

## Structure du dépôt

```
index.html, avant.html, apres.html, erreurs.html   → pages du site
styles/etml-*.css                                  → thème partagé + variantes avant/après
scripts/etml-*.js                                   → comportements par composant
images/etml/                                        → logo ETML, favicon, illustrations SVG
```

## Charte graphique

Palette officielle ETML utilisée dans le thème (`styles/etml-theme.css`) :

| Couleur | Hex |
|---|---|
| Dark Blue | `#0000AC` |
| Pampas | `#F3EFED` |
| Stratos | `#050038` |

Tous les contrastes ont été vérifiés (mode clair **et** mode sombre) et la version « Après » ne
génère aucune violation [axe-core](https://github.com/dequelabs/axe-core) sur les règles WCAG 2.x A/AA.

## Usage

Usage strictement interne / pédagogique. Le logo et le favicon ETML (dans `images/etml/`) sont la
propriété de l'ETML — voir `images/etml/SOURCE.md`. Ne pas redistribuer publiquement sans
autorisation de l'école.

Pour visualiser le site en local :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000/index.html
```
