export const SITE = {
  name: 'Tammo Studios',
  domain: 'tammostudios.de',
  url: 'https://tammostudios.de',
  email: 'tammo@tammostudios.de',
  phone: '0177 1962704',
  phoneHref: 'tel:+491771962704',
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
  // \n-Zeilenstruktur: jede Zeile ein eigener Gedanke. Wird via
  // .text-lines Utility-Class (global.css) als sichtbarer Umbruch
  // gerendert. Text innerhalb jeder Zeile wrappt weiterhin normal.
  introText:
    'Eine Person, eine Handschrift, komplett individuell gebaut.\n' +
    'Für dich, wenn du online ankommen willst.\n' +
    'Dort, wo deine Kunden suchen.',
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
      title: 'Modernes Design, kein Template',
      body:
        'Jede Website ist ein Original. Keine Themes, keine kopierten ' +
        'Layouts.<br class="sm:hidden" /> Visuals, die nur zu dir passen.',
    },
    {
      number: '02',
      title: 'Klare Preise',
      // <strong> hebt die Beträge in Amber hervor; das Section-3
      // Component rendert body via set:html, damit die Tags greifen.
      body:
        '<strong>1.500 €</strong> für eine Website, ' +
        '<strong>2.500 €</strong> für aufwändigere Projekte wie ' +
        'Online-Shops. Keine versteckten Stundensätze, keine Pakete ' +
        'mit Sternchen.',
      link: { href: '/preise', label: 'Volle Preisliste' },
    },
    {
      number: '03',
      title: 'Zwei Wochen, eine Website',
      body:
        'Vom Erstgespräch bis zur Live-Schaltung in maximal 14 Tagen.' +
        '<br class="sm:hidden" /> Klare Deadlines, klare Ergebnisse.',
    },
  ],
} as const;

export const SECTION4 = {
  eyebrow: 'DER FAHRPLAN',
  title: 'So entsteht deine Website',
  phases: [
    {
      label: 'PHASE 01',
      title: 'Wir sprechen miteinander',
      body:
        'Kostenloses Erstgespräch. Du erzählst was du brauchst, ich höre ' +
        'zu. Am Ende weißt du was es kostet und wie\'s weitergeht.',
    },
    {
      label: 'PHASE 02',
      title: 'Ich entwerfe deine Website',
      body:
        'Erste Entwürfe: Aufbau, Farben, Stil. Wir drehen so lange bis ' +
        'es deine Marke trifft.',
    },
    {
      label: 'PHASE 03',
      title: 'Ich baue sie',
      body:
        'Aus dem Entwurf wird die echte Website, mit deinen Texten ' +
        'und Bildern. Plus ein eigener Bereich, in dem du ' +
        'Öffnungszeiten, Bilder oder Texte später selbst änderst, ' +
        'so ausführlich wie du willst.',
      link: { label: 'Was kostet was?', href: '/preise' },
    },
    {
      label: 'PHASE 04',
      title: 'Wir prüfen alles gemeinsam',
      body:
        'Du gehst durch die Seite, wir korrigieren letzte Details. Tests ' +
        'auf Handy und Computer. Damit am Launch nichts wackelt.',
    },
    {
      label: 'PHASE 05',
      title: 'Deine Website geht online',
      body:
        'Live-Schaltung auf deine Domain. Plus 30 Minuten Einweisung, ' +
        'wie du selbst weiterarbeiten kannst. Ohne mich jedes Mal ' +
        'anrufen zu müssen.',
    },
    {
      label: 'PHASE 06',
      title: 'Und jetzt du',
      body:
        'Du kennst den Weg. Wenn er sich richtig anfühlt: schreib ' +
        'mir. Dann nehmen wir uns 30 Minuten Zeit für dein ' +
        'Projekt. Kostenlos und ohne Verpflichtung.',
      link: { label: 'Erstgespräch anfragen', href: '/kontakt' },
    },
  ],
} as const;

export const SECTION5 = {
  eyebrow: 'AM ZIEL',
  headline: 'Bereit für Phase 01?',
  subtext: 'Du kennst den Weg. Was fehlt, ist dein erstes Wort.',
  primaryCta: {
    label: 'Erstgespräch anfragen',
    href: 'mailto:tammo@tammostudios.de',
  },
  secondaryEmail: 'tammo@tammostudios.de',
  footer: {
    brand: 'EST. 2026 · BREMEN',
    copyright: '© 2026 Tammo Studios',
    navLinks: [
      { label: 'Über',       href: '/ueber' },
      { label: 'Referenzen', href: '/referenzen' },
      { label: 'Preise',     href: '/preise' },
    ],
    legalLinks: [
      { label: 'Impressum',   href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
    ],
    // Socials neben der Nav im Footer, Icon-only. aria-label carriert
    // Platform + Handle. platform wird von SiteFooter zur Icon-Auswahl
    // gemapped (case-sensitive: 'instagram' | 'linkedin').
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
  },
} as const;

// NAV_ITEMS: optionales children-Array macht ein Nav-Item zum
// Dropdown-Container. TopBar rendered dann Chevron + Dropdown-Menu
// (Desktop) bzw. Accordion (Mobile).
export const NAV_ITEMS = [
  { label: 'Über', href: '/ueber' },
  { label: 'Referenzen', href: '/referenzen' },
  {
    label: 'Preise',
    href: '/preise',
    children: [
      { label: 'Preise', href: '/preise' },
      { label: 'Preisrechner', href: '/preisrechner' },
    ],
  },
] as const;

export const CTA = {
  label: 'Kontakt',
  href: '/kontakt',
} as const;
