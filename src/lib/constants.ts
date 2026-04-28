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
  introText:
    'Eine Person, eine Handschrift, komplett individuell gebaut. ' +
    'Für Unternehmen, die online ankommen wollen — dort, wo ihre Kunden suchen.',
  scrollCue: 'SCROLLEN',
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
