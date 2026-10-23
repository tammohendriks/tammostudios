// Englische Fassung der geteilten Hülle.
//
// Wird gegen Shape<typeof de> geprüft: fehlt ein Schlüssel, steht
// einer zu viel oder hat eine Liste eine andere Länge, bricht
// `npm run check`. Das ist die einzige Sicherung dagegen, dass die
// beiden Sprachen auseinanderlaufen.
//
// Tonfall wie im Deutschen: direkt, "you", kurze Sätze, keine
// Gedankenstriche, amerikanische Schreibweise.

import type { Shape } from './shape';
import type { de } from './de';

export const en: Shape<typeof de> = {
  establishedLine: 'EST. 2026 · BREMEN',

  nav: {
    home: 'Home',
    ueber: 'About',
    angebot: 'Services',
    website: 'Website',
    software: 'Software',
    werkstatt: 'Lab',
    preise: 'Pricing',
    referenzen: 'Work',
    // Steht in der englischen Navigation nicht, weil es die Seite auf
    // Englisch nicht gibt. Der Schlüssel bleibt trotzdem, damit die
    // Struktur beider Sprachen gleich ist.
    journal: 'Journal',
    kontakt: 'Contact',
    menueOeffnen: 'Open menu',
    menueSchliessen: 'Close menu',
    bereichRechtliches: 'Legal',
  },

  sprache: {
    umschalten: 'Switch language, go to the German version',
    kurzDe: 'DE',
    kurzEn: 'EN',
  },

  footer: {
    copyright: '© 2026 Tammo Studios',
    impressum: 'Imprint (German)',
    datenschutz: 'Privacy (German)',
    datenschutzHinweis:
      'This site sets no cookies of its own and uses no tracking ' +
      'tools. Only anonymous server logs are evaluated. Cookies can ' +
      'only appear if you actively open the booking calendar.',
    datenschutzDetails: 'Details',
  },

  abschluss: {
    headlineFair: 'Sound fair?',
    headlineUeberzeugt: 'Convinced?',
    naechsterSchritt: 'Next step:',
    erstgespraech: 'A 30-minute intro call, free and without obligation.',
    cta: "Let's talk",
    zusagen: [
      'Reply in under 24h',
      'Intro call is free',
      'German & English',
    ],
    zusagenLabel: 'What you can expect',
  },

  branche: {
    erstgespraech: 'Request an intro call',
    wasEsKostet: 'WHAT IT COSTS',
    preisHeadline: 'Clear, fixed, no fine print.',
    preislisteAnsehen: 'See the full price list',
    liveSeiteOeffnen: 'open live site (new tab)',
    faqTitel: 'Frequently asked questions',
    empfehlung: {
      text: 'The industry is never the problem. What matters is what the site needs to do:',
      label: 'See the custom applications',
    },
  },

  referenzModal: {
    neuerTab: 'In a new tab',
    schliessen: 'Close the preview',
    rahmenTitel: 'Reference preview',
    nichtEinbettbar: 'This site cannot be embedded directly.',
    neuerTabOeffnen: 'Open in a new tab',
  },

  journal: {
    nurDeutsch: 'The journal is only available in German.',
  },

  scrollCue: 'SCROLL',
} as const;
