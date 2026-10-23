export const SITE = {
  name: 'Tammo Studios',
  domain: 'tammostudios.de',
  url: 'https://tammostudios.de',
  email: 'tammo@tammostudios.de',
  phone: '0177 1962704',
  phoneHref: 'tel:+491771962704',
  location: 'Bremen',

  // Profile neben der Navigation in der Fussleiste, nur als Symbol.
  // platform waehlt das Symbol (klein geschrieben, 'instagram' oder
  // 'linkedin'), label und handle landen im aria-label.
  socials: [
    {
      platform: 'instagram',
      label: 'Instagram',
      handle: '@tammostudios',
      href: 'https://instagram.com/tammostudios',
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      handle: 'Tammo Hendriks',
      href: 'https://www.linkedin.com/in/tammo-hendriks-93b616264',
    },
  ],

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

/**
 * Dieselbe Nummer in internationaler Schreibweise, fuer die englische
 * Fassung: eine 0177 kann aus dem Ausland niemand waehlen.
 *
 * Abgeleitet statt ein zweites Mal hingeschrieben — die fuehrende Null
 * ist die deutsche Verkehrsausscheidungsziffer und entfaellt hinter der
 * Landesvorwahl. Aendert sich die Nummer, aendert sich beides.
 */
export const PHONE_INTERNATIONAL = `+49 ${SITE.phone.replace(/^0/, '')}`;
