export const SITE = {
  name: 'Tammo Studios',
  domain: 'tammostudios.de',
  url: 'https://tammostudios.de',
  email: 'tammo@tammostudios.de',
  location: 'Bremen',

  // Genutzt von /impressum und /datenschutz — daher hier behalten,
  // auch wenn die "finale" Version aus dem Splash-Brief sie nicht listet.
  address: {
    street: 'Eckernförder Straße 6',
    zip: '28219',
    city: 'Bremen',
    country: 'Deutschland',
  },

  legal: {
    vatId: 'beantragt',
    taxId: 'beantragt',
  },
} as const;

export const SITE_LABELS = {
  establishedLine: 'EST. 2026 · BREMEN',
  serviceLine: 'Individuelle Websites, handgemacht in Bremen.',
  introText:
    'Eine Person, eine Handschrift, komplett individuell gebaut. ' +
    'Für Unternehmen, die online ankommen wollen — dort, wo ihre Kunden suchen.',
  scrollCue: 'SCROLLEN',
} as const;

export const SECTION2 = {
  boomHeadline: 'Präzision bis ins letzte Pixel.',
} as const;

export const SECTION3 = {
  eyebrow: 'WARUM TAMMO STUDIOS',
  items: [
    {
      number: '01',
      title: 'Eine Person, ein Ansprechpartner',
      body:
        'Direkt mit mir. Kein Account-Manager, kein wechselnder Kontakt — ' +
        'vom Briefing bis zum Launch immer derselbe Mensch.',
    },
    {
      number: '02',
      title: 'Modernes Design, kein Template',
      body:
        'Jede Website ist ein Original. Keine Themes, keine kopierten ' +
        'Layouts — Visuals, die nur zu dir passen.',
    },
    {
      number: '03',
      title: 'Zwei Wochen, eine Website',
      body:
        'Vom Erstgespräch bis zur Live-Schaltung in maximal 14 Tagen. ' +
        'Klare Deadlines, klare Ergebnisse.',
    },
  ],
} as const;

export const NAV_ITEMS = [
  { label: 'Über', href: '/ueber' },
  { label: 'Referenzen', href: '/referenzen' },
  { label: 'Preise', href: '/preise' },
] as const;

export const CTA = {
  label: 'Kontakt',
  href: '/kontakt',
} as const;
