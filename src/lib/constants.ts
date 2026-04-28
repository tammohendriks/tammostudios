export const SITE = {
  name: 'Tammo Studios',
  domain: 'tammostudios.de',
  url: 'https://tammostudios.de',
  email: 'tammo@tammostudios.de',
  location: 'Bremen',
  tagline: 'Webentwicklung mit Charakter.',
  instagram: 'https://www.instagram.com/tammostudios/',

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

export const NAV_ITEMS = [
  { label: 'Über', href: '/ueber' },
  { label: 'Referenzen', href: '/referenzen' },
  { label: 'Preise', href: '/preise' },
] as const;

export const CTA = {
  label: 'Kontakt',
  href: '/kontakt',
} as const;
