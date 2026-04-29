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
        'Aus dem Entwurf wird die echte Website — mit deinen Texten ' +
        'und Bildern. Plus ein eigener Bereich, in dem du ' +
        'Öffnungszeiten, Bilder oder Texte später selbst änderst — ' +
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
        'wie du selbst weiterarbeiten kannst — ohne mich jedes Mal ' +
        'anrufen zu müssen.',
    },
    {
      label: 'PHASE 06',
      title: 'Und jetzt du',
      body:
        'Du kennst den Weg. Wenn er sich richtig anfühlt: schreib ' +
        'mir. Dann nehmen wir uns 30 Minuten Zeit für dein ' +
        'Projekt — kostenlos und ohne Verpflichtung.',
      link: { label: 'Erstgespräch anfragen', href: '/kontakt' },
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
