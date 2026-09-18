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
  // NEUE Positionierung ab Sep 2026: nicht mehr Websites-only, sondern
  // "digitale Handarbeit" — Dachbegriff fuer Websites + Custom-Software.
  serviceLine: 'Digitale Handarbeit aus Bremen.',
  // \n-Zeilenstruktur: jede Zeile ein eigener Gedanke. Wird via
  // .text-lines Utility-Class (global.css) als sichtbarer Umbruch
  // gerendert. Text innerhalb jeder Zeile wrappt weiterhin normal.
  introText:
    'Von Websites bis zu individuellen Anwendungen.\n' +
    'Eine Person, eine Handschrift, komplett individuell gebaut.',
  scrollCue: 'SCROLLEN',
} as const;

export const SECTION2 = {
  boomHeadline: 'Präzision bis ins letzte Pixel.',
} as const;

// Jeder Block schlaegt eine andere Alternative: Baukasten, andere
// Webdesigner, Agentur. Frueher zielten "Klare Preise" und "Zwei Wochen"
// beide auf die Agentur, waehrend die individuelle Anwendung — heute das
// eigentliche Unterscheidungsmerkmal — gar nicht vorkam.
//
// Die drei Links bilden zusammen das Rueckgrat der Seite:
// Referenzen (Beweis), Software (Moeglichkeiten), Preise (Bedingungen).
//
// body wird in Section4Kernbotschaften via set:html gerendert, <strong>
// hebt darin die Betraege in Amber hervor.
export const SECTION3 = {
  eyebrow: 'WARUM TAMMO STUDIOS',
  items: [
    {
      number: '01',
      title: 'Ein Original, kein Baukasten',
      body:
        'Kein Theme, keine Vorlage. Deine Seite entsteht von Grund auf: ' +
        'Aufbau, Farben, Typografie auf deinen Betrieb geschnitten. Am ' +
        'Ende sieht sie nach dir aus, nicht nach dem Anbieter.',
      link: { href: '/referenzen', label: 'Referenzen ansehen' },
    },
    {
      number: '02',
      title: 'Sie kann mehr als dastehen',
      body:
        'Ein Preisrechner, ein Anfrageformular das mitdenkt, ein ' +
        'Konfigurator. Eine individuelle Anwendung ist im Preis enthalten, ' +
        'ohne Aufpreis und ohne längere Bauzeit.',
      link: { href: '/software', label: 'Was möglich ist' },
    },
    {
      number: '03',
      title: 'Fester Preis, fester Termin',
      body:
        '<strong>2.000 €</strong> für eine Website, <strong>3.000 €</strong> ' +
        'für einen Online-Shop. In maximal 14 Tagen live. Keine ' +
        'Stundensätze, keine Nachträge, keine Pakete mit Sternchen.',
      link: { href: '/preise', label: 'Volle Preisliste' },
    },
  ],
} as const;

// WICHTIG: SECTION4.phases[*].body wird in Section5Timeline.astro als
// plain-text-Interpolation ({phase.body}) gerendert, NICHT via set:html.
// KEINE HTML-Tags (<br />, <strong> etc.) in den Body-Strings — die
// wuerden literal als Text erscheinen. Fuer Line-Breaks stattdessen \n
// + eine text-lines Utility-Class benutzen (falls in Section5 gebraucht).
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
        'Erste Entwürfe: Aufbau, Farben, Stil. ' +
        'Wir drehen so lange bis es deine Marke trifft.',
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
  subtext: 'Du kennst den Weg.\nWas fehlt, ist dein erstes Wort.',
  primaryCta: {
    label: 'Erstgespräch anfragen',
    href: 'mailto:tammo@tammostudios.de',
  },
  secondaryEmail: 'tammo@tammostudios.de',
  footer: {
    brand: 'EST. 2026 · BREMEN',
    copyright: '© 2026 Tammo Studios',
    // Reihenfolge spiegelt bewusst die Navi-Leiste, damit beide gleich
    // gelesen werden. Flach, ohne Verschachtelung.
    //
    // Preisrechner steht hier nicht mehr — er ist ueber /preise
    // verlinkt und war im Footer der einzige Eintrag ohne Entsprechung
    // in der Navi.
    navLinks: [
      { label: 'Startseite',   href: '/' },
      { label: 'Über',         href: '/ueber' },
      { label: 'Angebot',      href: '/website' },
      { label: 'Software',     href: '/software' },
      { label: 'Preise',       href: '/preise' },
      { label: 'Werkstatt',    href: '/werkstatt' },
      { label: 'Referenzen',   href: '/referenzen' },
      { label: 'Journal',      href: '/journal' },
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
// NAV_ITEMS: neue Struktur (Sep 2026) reflektiert erweitertes Angebot
// Websites + Software unter einem "Angebot"-Dropdown zusammengefasst.
// Studio-Page abgeschafft (Content migriert nach /website#cms), daher
// nicht mehr in der Nav. Preisrechner nur noch ueber /preise erreichbar
// (dort verlinkt) — Nav bleibt schlank.
export const NAV_ITEMS = [
  { label: 'Über', href: '/ueber' },
  {
    label: 'Angebot',
    // Parent-Klick geht auf Websites-Uebersicht (haeufigster CTA-Path)
    href: '/website',
    children: [
      { label: 'Website', href: '/website' },
      { label: 'Software', href: '/software' },
      // Preise direkt hinter Website/Software: die drei gehoeren zum
      // Auftrags-Thema und sollen als Block lesbar sein.
      { label: 'Preise', href: '/preise' },
      // Werkstatt ist kein Auftragsangebot, steht hier aber trotzdem:
      // sie zeigt die Bandbreite und stuetzt den App-/Spiele-Teil auf
      // /software. Die Seite selbst macht den Unterschied klar.
      { label: 'Werkstatt', href: '/werkstatt' },
    ],
  },
  { label: 'Referenzen', href: '/referenzen' },
  { label: 'Journal', href: '/journal' },
] as const;

export const CTA = {
  label: 'Kontakt',
  href: '/kontakt',
} as const;
