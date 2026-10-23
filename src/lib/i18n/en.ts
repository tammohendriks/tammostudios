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
    hauptnavigation: 'Main navigation',
    menueOeffnen: 'Open menu',
    menueSchliessen: 'Close menu',
    bereichRechtliches: 'Legal',
  },

  sprache: {
    umschalten: 'DE — switch language, go to the German version',
    kurzDe: 'DE',
    kurzEn: 'EN',
  },

  thema: {
    umschalten: 'Switch color theme (dark / light)',
    aktuellHell: 'Switch color theme (currently light)',
    aktuellDunkel: 'Switch color theme (currently dark)',
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
    socialsLabel: 'Social media',
    neuerTab: '(opens in a new tab)',
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

  schema: {
    beschreibung:
      'Custom websites, handcrafted in Bremen. ' +
      'No recycled templates, clear fixed prices, ' +
      'live in 14 days at most.',
    slogan: 'Websites, handcrafted in Bremen.',
    bildAlt: 'Tammo Studios — websites, handcrafted in Bremen',
    jobTitle: 'Web developer',
    land: 'Germany',
    bundesland: 'Lower Saxony',
    katalog: 'Website packages',
    brotkrumeStart: 'Home',
    angebote: [
      {
        name: 'A custom website',
        beschreibung:
          'A design of your own, a CMS of your own, one custom ' +
          'application included, optimized for mobile and desktop, fast ' +
          'and clean for SEO, GDPR compliant. One time, fixed.',
      },
      {
        name: 'Online store',
        beschreibung:
          'Everything from "One website" plus a full store with cart and ' +
          'checkout, payment provider integration, products and orders ' +
          'in the CMS.',
      },
      {
        name: 'A further custom application',
        beschreibung:
          'A price calculator, a configurator, an inquiry form that ' +
          'thinks along and produces a PDF. The first application is part ' +
          'of the website or store price, each additional one costs €500.',
      },
    ],
    kannUeber: [
      'Web development',
      'Astro Framework',
      'Tailwind CSS',
      'Sanity CMS',
      'Vercel Deployment',
      'E-Commerce',
      'SEO',
    ],
  },

  referenzModal: {
    neuerTab: 'In a new tab',
    schliessen: 'Close the preview',
    rahmenTitel: 'Work preview',
    nichtEinbettbar: 'This site cannot be embedded directly.',
    neuerTabOeffnen: 'Open in a new tab',
  },

  journal: {
    nurDeutsch: 'The journal is only available in German.',
  },

  scrollCue: 'SCROLL',
  scrollCueLabel: 'Scroll down',
} as const;
