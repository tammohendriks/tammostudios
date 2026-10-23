// Texte der Referenzen-Seite, beide Sprachen.
//
// WICHTIG zu den Filter-Chips: uebersetzt wird nur die BESCHRIFTUNG.
// Der Wert, der am Chip und an jeder Karte als data-Attribut steht und
// als #handwerk in der Adresse landet, bleibt in beiden Sprachen
// derselbe. Waere er mit uebersetzt, zeigte der Filter auf der
// englischen Seite auf nichts, und jeder geteilte Link mit #handwerk
// waere tot.

import type { Shape } from '../shape';

export const de = {
  meta: {
    pageTitle: 'Referenzen',
    title: 'Referenzen: Websites aus Bremen | Tammo Studios',
    description:
      'Websites, die ich zuletzt gebaut habe: Arztpraxis, Betriebsmedizin, Dachdecker, Heizungsbau, Eckkneipe, Mediengestaltung. Jede ein Original.',
  },

  hero: {
    headline: 'Referenzen.',
    sub: 'Eine kleine Auswahl der Sites, die ich zuletzt für Unternehmen gebaut habe.\nVon der Praxis bis zum Mediengestalter.',
  },

  filter: {
    label: 'Referenzen nach Kategorie filtern',
    alle: 'Alle',
    // Wird der Zahl nachgestellt und ist nur fuer Screenreader da:
    // ", 6 Referenzen". Mit Einzahl, weil ", 1 Referenzen" vorgelesen
    // genauso falsch klingt wie es aussieht.
    einheit: 'Referenzen',
    einheitEinzahl: 'Referenz',
    // Die Beschriftungen der Kategorien stehen NICHT hier, sondern in
    // references.en.ts — direkt neben den Werten, die sie beschriften.
    // Im Deutschen ist die Beschriftung der Wert selbst.
  },

  karte: {
    ansehen: 'Ansehen',
    // Wird dem Titel vorangestellt: "Vorschau von Samedos".
    vorschauVon: 'Vorschau von',
    // Wird dem Titel vorangestellt und endet dahinter:
    // "Samedos im Modal öffnen".
    modalOeffnenNach: 'im Modal öffnen',
    mehrZu: 'Mehr zu',
    // Verweise von einer Karte auf die passende Branchenseite. Die
    // Schluessel sind wieder die Kategorien aus references.ts.
    branchenLinks: {
      Handwerk: 'Websites für Handwerk',
      Medizin: 'Websites für Praxen',
      Gastronomie: 'Websites für Gastronomie',
    },
  },

  empfehlung: {
    text: 'Hinter einigen dieser Projekte steckt mehr als eine Website: Anfrage-Systeme, Rechner, eigene Anwendungen.',
    label: 'Mehr zur technischen Umsetzung',
  },
} as const;

export const en: Shape<typeof de> = {
  meta: {
    pageTitle: 'Work',
    title: 'Work: websites from Bremen | Tammo Studios',
    description:
      'Websites I built recently: a medical practice, occupational health, a roofer, a heating contractor, a corner bar, a media designer. Each one an original.',
  },

  hero: {
    headline: 'Work.',
    sub: 'A small selection of the sites I built for businesses recently.\nFrom a medical practice to a media designer.',
  },

  filter: {
    label: 'Filter the work by category',
    alle: 'All',
    einheit: 'projects',
    einheitEinzahl: 'project',
  },

  karte: {
    ansehen: 'Take a look',
    vorschauVon: 'Preview of',
    modalOeffnenNach: 'in the preview',
    mehrZu: 'More on',
    branchenLinks: {
      Handwerk: 'websites for contractors',
      Medizin: 'websites for medical practices',
      Gastronomie: 'websites for restaurants',
    },
  },

  empfehlung: {
    text: 'Behind some of these projects there is more than a website: inquiry systems, calculators, applications of their own.',
    label: 'More on how it was built',
  },
};

export const REFERENZEN = { de, en } as const;
