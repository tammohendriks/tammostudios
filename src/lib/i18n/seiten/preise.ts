// Texte der Preisseite, beide Sprachen.
//
// Zur Schreibweise der Betraege: deutsch '2.000 €', englisch '€2,000'.
// Das ist kein Detail — ein englischer Besucher liest '2.000' sonst als
// zwei Komma null.
//
// Wo ein Satz einen fett gesetzten Betrag enthaelt, stehen Text und
// Betrag getrennt. Das Satzzeichen danach bleibt im Markup, weil es in
// beiden Sprachen dasselbe ist.

import type { Shape } from '../shape';

export const de = {
  meta: {
    pageTitle: 'Preise',
    title: 'Website-Preise: 2.000 € fix, Shop 3.000 € | Tammo Studios',
    description:
      'Eine Website kostet 2.000 €, ein Online-Shop 3.000 €, jeweils inklusive einer individuellen Anwendung. Ohne Sternchen, ohne versteckte Stundensätze.',
  },

  hero: {
    headline: 'Was es kostet.',
    sub: 'Klar, fix, ohne Sternchen.',
  },

  intro: {
    label: 'Preise auf einen Blick',
    websiteText: 'Eine Website kostet',
    websitePreis: '2.000 €',
    shopText: 'Ein Online-Shop kostet',
    shopPreis: '3.000 €',
    anwendung: 'Eine individuelle Anwendung ist jeweils dabei.',
    punkt: 'Punkt.',
  },

  karten: {
    label: 'Pakete',
    zahlung: 'Zahlung: 50 % bei Auftrag, 50 % bei Launch.',
    bugfixes: 'Bug-Fixes nach Launch: kostenlos.',
    einmalig: 'Einmalig. Fix.',
    website: {
      eyebrow: 'EINE WEBSITE',
      preis: '2.000 €',
      punkte: [
        'Eigenes Design, auf dich zugeschnitten',
        'Eigenes CMS, das du selbst pflegst',
        'Eine individuelle Anwendung deiner Wahl',
        'Mobile- & Desktop-optimiert',
        'Schnell, sauber im SEO, DSGVO-konform',
      ],
    },
    shop: {
      eyebrow: 'EIN ONLINE-SHOP',
      preis: '3.000 €',
      punkte: [
        'Alles aus „Eine Website"',
        'Voller Shop mit Warenkorb & Checkout',
        'Zahlungsanbieter-Integration',
        'Produkte & Bestellungen im CMS',
      ],
    },
  },

  // Der Verweis auf den Preisrechner. Steht nur auf der deutschen
  // Seite, weil es den Rechner nur auf Deutsch gibt — die Uebersetzung
  // liegt trotzdem bereit, damit sie da ist, sobald er englisch wird.
  rechner: {
    label: 'Preisrechner',
    eyebrow: 'UNSICHER?',
    headline: 'Was kostet dein Website-Projekt?',
    body: 'In 3 Fragen zum genauen Preis für dein Vorhaben.',
    cta: 'Preisrechner öffnen',
  },

  immerDabei: {
    label: 'Immer dabei',
    eyebrow: 'Immer dabei',
    headline: 'Ohne Aufpreis.',
    punkte: [
      'Tägliche Backups',
      'Sicherheits-Updates',
      'SSL-Zertifikat',
      'DSGVO-konformes EU-Hosting',
      'Eigenes CMS zum selbst pflegen',
    ],
  },

  erweiterungen: {
    eyebrowZeile1: 'Optional.',
    eyebrowZeile2: ' Wenn mehr nötig ist.',
    headline: 'Erweiterungen.',
    punkte: [
      {
        label: 'Jede weitere Anwendung:',
        wert: '500 €',
        body: 'Die erste ist im Paketpreis enthalten und wird innerhalb der 14 Tage mit umgesetzt. Förderrechner, ausfüllbare PDF-Formulare, Konfiguratoren, KI-Chatbots, Buchungs-Tools. Jede weitere zum selben Fixpreis.',
      },
      {
        label: 'Eigene App oder größeres System:',
        wert: 'individuell',
        body: 'Sobald es über eine Website hinausgeht, wäre ein Listenpreis geraten. Nach dem Erstgespräch bekommst du eine feste Zahl.',
      },
      {
        label: 'Stundensatz:',
        wert: '50 €/h',
        body: 'Für alles, was klar abgegrenzt und kleiner ist.',
      },
    ],
  },

  pflege: {
    label: 'Pflege-Paket',
    eyebrow: 'Optional · Pflege & Support',
    headline: 'Damit du dich nie kümmern musst.',
    preis: '30 €/Monat',
    tag: 'monatlich kündbar',
    punkte: [
      'Performance- & Uptime-Monitoring (du wirst informiert, bevor was klemmt)',
      'Priorisierter Support, meist innerhalb weniger Stunden',
      'Kleinere technische Fixes ohne Extra-Rechnung',
      'Halbjährlicher Site-Check + Strategiegespräch',
    ],
  },

  manifest: {
    headline: 'Warum diese Preise so klar sind?',
    body: 'Ich glaube an einfache Verhältnisse. Du sollst vorher wissen, was deine Website kostet. Nicht hinterher mit Zusatzposten überrascht werden. Was hier steht, ist was du zahlst. Mehr nicht.',
  },

  empfehlung: {
    text: 'Unsicher, was du brauchst?',
    label: 'Paket im Preisrechner zusammenstellen',
  },
} as const;

export const en: Shape<typeof de> = {
  meta: {
    pageTitle: 'Pricing',
    title: 'Website pricing: €2,000 fixed, store €3,000 | Tammo Studios',
    description:
      'A website costs €2,000, an online store €3,000, each one including a custom application. No fine print, no hidden hourly rates.',
  },

  hero: {
    headline: 'What it costs.',
    sub: 'Clear, fixed, no fine print.',
  },

  intro: {
    label: 'Prices at a glance',
    websiteText: 'A website costs',
    websitePreis: '€2,000',
    shopText: 'An online store costs',
    shopPreis: '€3,000',
    anwendung: 'One custom application is included either way.',
    punkt: 'Period.',
  },

  karten: {
    label: 'Packages',
    zahlung: 'Payment: 50% on order, 50% at launch.',
    bugfixes: 'Bug fixes after launch: free.',
    einmalig: 'One time. Fixed.',
    website: {
      eyebrow: 'ONE WEBSITE',
      preis: '€2,000',
      punkte: [
        'A design of your own, cut to fit you',
        'A CMS of your own that you maintain yourself',
        'One custom application of your choice',
        'Optimized for mobile and desktop',
        'Fast, clean SEO, GDPR compliant',
      ],
    },
    shop: {
      eyebrow: 'AN ONLINE STORE',
      preis: '€3,000',
      punkte: [
        'Everything from "One website"',
        'A full store with cart and checkout',
        'Payment provider integration',
        'Products and orders in the CMS',
      ],
    },
  },

  rechner: {
    label: 'Price calculator',
    eyebrow: 'NOT SURE?',
    headline: 'What will your website project cost?',
    body: 'Three questions to an exact price for what you have in mind.',
    cta: 'Open the price calculator',
  },

  immerDabei: {
    label: 'Always included',
    eyebrow: 'Always included',
    headline: 'At no extra charge.',
    punkte: [
      'Daily backups',
      'Security updates',
      'An SSL certificate',
      'GDPR-compliant EU hosting',
      'A CMS of your own to maintain yourself',
    ],
  },

  erweiterungen: {
    eyebrowZeile1: 'Optional.',
    eyebrowZeile2: ' When more is needed.',
    headline: 'Add-ons.',
    punkte: [
      {
        label: 'Every further application:',
        wert: '€500',
        body: 'The first one is part of the package price and gets built within the 14 days. Subsidy calculators, fillable PDF forms, configurators, AI chatbots, booking tools. Every further one at the same fixed price.',
      },
      {
        label: 'An app of your own or a larger system:',
        wert: 'on request',
        body: 'As soon as it goes beyond a website, a list price would be a guess. After the intro call you get a fixed number.',
      },
      {
        label: 'Hourly rate:',
        wert: '€50/h',
        body: 'For anything clearly scoped and smaller.',
      },
    ],
  },

  pflege: {
    label: 'Care plan',
    eyebrow: 'Optional · care and support',
    headline: 'So you never have to deal with it.',
    preis: '€30/month',
    tag: 'month to month',
    punkte: [
      'Performance and uptime monitoring (you hear about it before anything jams)',
      'Priority support, usually within a few hours',
      'Smaller technical fixes without a separate invoice',
      'A site check every six months plus a strategy call',
    ],
  },

  manifest: {
    headline: 'Why are the prices this clear?',
    body: 'I believe in simple arrangements. You should know what your website costs beforehand, not be surprised by extra line items afterwards. What is written here is what you pay. Nothing else.',
  },

  empfehlung: {
    text: 'Not sure what you need?',
    label: 'Put a package together in the price calculator',
  },
};

export const PREISE = { de, en } as const;
