// Texte der Werkstatt-Seite, beide Sprachen.
//
// Die deutsche Fassung vermeidet englische Fachbegriffe bewusst — das
// war eine Entscheidung fuer die ganze Seite. In der englischen Fassung
// stehen sie wieder drin, weil sie dort die normalen Woerter sind:
// game loop statt Ablaufschleife, leaderboard statt Bestenliste.

import type { Shape } from '../shape';

export const de = {
  meta: {
    pageTitle: 'Werkstatt',
    title: 'Werkstatt: eigene Projekte & Spiele | Tammo Studios',
    description:
      'Eigene Projekte ohne Auftraggeber, gebaut in Bremen: ASTEROID//01, ein Arcade-Spiel im Browser mit erzeugter Musik und weltweiter Bestenliste.',
  },

  hero: {
    headline: 'Werkstatt.',
    sub: 'Mein Spielplatz für Ideen, die nichts mit Websites zu tun haben.\nViel Spaß beim Erkunden.',
  },

  projekt: {
    eyebrow: 'PROJEKT 01',
    intro: [
      'Ein Arcade-Spiel, das direkt im Browser läuft.',
      'Angefangen als Frage („geht das überhaupt?"), geendet mit weltweiter Bestenliste und Endgegner. Spielbar direkt hier.',
    ],
    rahmenTitel: 'ASTEROID//01 — Arcade-Spiel, spielbar',
    startKnopf: 'Hier spielen',
    notizVor: 'Läuft auf ',
    notizNach: ' als eigenständige Anwendung.',
  },

  technik: {
    headline: 'Was drinsteckt',
    punkte: [
      {
        title: 'Spielmechanik von Hand',
        body: 'Die Pixel-Grafiken sind fertig zugekauft, alles andere nicht. Steuerung, Kollisionen, Gegnerverhalten und die Ablaufschleife stecken komplett selbst drin, mit 60 Bildern pro Sekunde auch auf dem Handy.',
      },
      {
        title: 'Musik, die es vorher nicht gab',
        body: 'Die Musik ist keine fertige Datei. Sie entsteht im Browser, während du spielst, und zieht an, je enger es wird.',
      },
      {
        title: 'Weltweite Bestenliste',
        body: 'Die Punktestände laufen über eine eigene Schnittstelle mit Prüfung, damit sich niemand seinen Rekord einfach selbst einträgt.',
      },
      {
        title: 'Endgegner in mehreren Phasen',
        body: 'Wechselnde Angriffsmuster, eigene Schwachstellen, ein Verhalten das sich anpasst. Der Teil, der am meisten Arbeit gemacht hat.',
      },
    ],
  },

  empfehlung: {
    text: 'Lieber etwas Geschäftliches? Dieselbe Technik, nur mit Auftrag:',
    label: 'Zu den individuellen Anwendungen',
  },
} as const;

export const en: Shape<typeof de> = {
  meta: {
    pageTitle: 'The Lab',
    title: 'The Lab: my own projects and games | Tammo Studios',
    description:
      'Projects of my own with no client, built in Bremen: ASTEROID//01, an arcade game in the browser with generated music and a worldwide leaderboard.',
  },

  hero: {
    headline: 'The Lab.',
    sub: 'My playground for ideas that have nothing to do with websites.\nHave fun looking around.',
  },

  projekt: {
    eyebrow: 'PROJECT 01',
    intro: [
      'An arcade game that runs right in the browser.',
      'Started as a question ("is that even possible?"), ended with a worldwide leaderboard and a boss fight. Playable right here.',
    ],
    rahmenTitel: 'ASTEROID//01 — arcade game, playable',
    startKnopf: 'Play here',
    notizVor: 'Runs on ',
    notizNach: ' as a standalone application.',
  },

  technik: {
    headline: 'What is in it',
    punkte: [
      {
        title: 'Game mechanics by hand',
        body: 'The pixel art is bought in, nothing else is. Controls, collisions, enemy behavior, and the game loop are all my own code, at 60 frames per second on a phone too.',
      },
      {
        title: 'Music that did not exist before',
        body: 'The music is not a finished file. It is generated in the browser while you play, and it tightens up as things get tighter.',
      },
      {
        title: 'A worldwide leaderboard',
        body: 'Scores run through an API of my own with validation, so nobody can simply post their own record.',
      },
      {
        title: 'A boss fight in several phases',
        body: 'Changing attack patterns, weak points of its own, behavior that adapts. The part that took the most work.',
      },
    ],
  },

  empfehlung: {
    text: 'Prefer something for the business? Same technology, just with a client:',
    label: 'See the custom applications',
  },
};

export const WERKSTATT = { de, en } as const;
