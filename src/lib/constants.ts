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

/**
 * Die Knappheits-Anzeige oben auf den Branchen-Landingpages.
 *
 * Statisch im Code und mit einem Schalter, nicht im Studio gepflegt:
 * eine Zahl, die jemand im CMS vergisst, wird zur Lüge. Hier steht sie
 * neben dem Zeitraum, auf den sie sich bezieht — wer das eine ändert,
 * sieht das andere.
 *
 * WICHTIG: die Zahl muss stimmen. Eine erfundene Knappheit ist auf
 * einer Seite, die mit Vertrauen wirbt, der teuerste Satz von allen —
 * und Werbeanzeigen bringen genug Leute vorbei, dass es auffällt, wenn
 * seit Monaten „nur noch 3" dasteht. Lieber abschalten als faken.
 *
 * aktiv: false blendet die Pille auf allen drei Seiten aus.
 */
export const SLOT_KNAPPHEIT: {
  aktiv: boolean;
  plaetze: number;
  zeitraum: { de: string; en: string };
} = {
  aktiv: true,
  /** Wie viele Plätze noch frei sind. */
  plaetze: 3,
  /** Der Zeitraum, auf den sich die Zahl bezieht. Pro Sprache. */
  zeitraum: { de: 'Nov/Dez 2026', en: 'Nov/Dec 2026' },
};
// Bewusst OHNE `as const`: sonst waere plaetze vom Typ `3`, und der
// Einzahl-Zweig im Pillen-Text („Nur noch 1 Slot") gaelte dem
// Typchecker als unerreichbar — er meldet dann einen Vergleich, der
// nie zutreffen kann. Die Zahl soll sich aber aendern lassen, genau
// dafuer steht sie hier.
