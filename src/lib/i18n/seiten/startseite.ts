// Texte der Startseite, beide Sprachen. Deckt alle acht Abschnitte ab.
//
// Die Texte standen vorher als SITE_LABELS, SECTION2, SECTION3, SECTION4
// und SECTION5 in lib/constants.ts, dazu eine Reihe fester Strings in
// den Abschnitts-Komponenten selbst. constants.ts enthaelt jetzt nur
// noch, was keine Sprache hat: Adresse, Rufnummer, Profile.
//
// Zwei Stellen sind erklaerungsbeduerftig:
//
// warum.punkte[*].body enthaelt <strong>. Das wird per set:html
// gerendert, und das ist hier AUSNAHMSWEISE richtig: die Regel dafuer
// steht als `.diff-body :global(strong)` im Abschnitt, trifft also auch
// Elemente ohne Astro-Kennung. An anderen Stellen (etwa auf der
// Software-Seite) ist das nicht so, dort stehen die Betraege getrennt.
//
// studio.kunden ist der Inhalt des nachgebauten Redaktionssystems. Die
// Namen sind echte Kunden, der Inhalt daneben ist erfunden und zeigt
// nur, wie so eine Oberflaeche aussieht.

import type { Shape } from '../shape';

export const de = {
  meta: {
    pageTitle: 'Digitale Handarbeit aus Bremen',
    title: 'Websites & Web-Anwendungen aus Bremen — ab 2.000 € Fixpreis',
    description:
      'Digitale Handarbeit aus Bremen: individuelle Websites und Web-Anwendungen. Website 2.000 €, Online-Shop 3.000 €, eine individuelle Anwendung ist inklusive.',
  },

  hero: {
    serviceLine: 'Digitale Handarbeit aus Bremen.',
    // Jede Zeile ein eigener Gedanke, via .text-lines als sichtbarer
    // Umbruch. Text innerhalb einer Zeile bricht weiter normal.
    intro:
      'Von Websites bis zu individuellen Anwendungen.\n' +
      'Eine Person, eine Handschrift, komplett individuell gebaut.',
  },

  praezision: {
    headline: 'Präzision bis ins letzte Pixel.',
  },

  projekte: {
    eyebrow: 'AUSGEWÄHLTE PROJEKTE',
    headline: 'Zuletzt gebaut.',
    sub: 'Vier Sites, drei Branchen. Alle handgemacht, alle online.',
    vorschauVon: 'Vorschau von',
    modalOeffnen: 'im Modal öffnen',
    cta: 'Alle Referenzen ansehen',
  },

  warum: {
    eyebrow: 'WARUM TAMMO STUDIOS',
    headline: 'Kein Zufall.',
    // Jeder Punkt schlaegt eine andere Alternative: Baukasten, andere
    // Webdesigner, Agentur. Die drei Verweise bilden das Rueckgrat der
    // Seite: Referenzen (Beweis), Software (Moeglichkeiten), Preise
    // (Bedingungen). Die Ziele stehen in der Komponente.
    punkte: [
      {
        title: 'Ein Original, kein Baukasten',
        body:
          'Kein Theme, keine Vorlage. Deine Seite entsteht von Grund auf: ' +
          'Aufbau, Farben, Typografie auf deinen Betrieb geschnitten. Am ' +
          'Ende sieht sie nach dir aus, nicht nach dem Anbieter.',
        linkLabel: 'Referenzen ansehen',
      },
      {
        title: 'Sie kann mehr als dastehen',
        body:
          'Ein Preisrechner, ein Anfrageformular das mitdenkt, ein ' +
          'Konfigurator. Eine individuelle Anwendung ist im Preis enthalten, ' +
          'ohne Aufpreis und ohne längere Bauzeit.',
        linkLabel: 'Was möglich ist',
      },
      {
        title: 'Fester Preis, fester Termin',
        body:
          '<strong>2.000 €</strong> für eine Website, <strong>3.000 €</strong> ' +
          'für einen Online-Shop. In maximal 14 Tagen live. Keine ' +
          'Stundensätze, keine Nachträge, keine Pakete mit Sternchen.',
        linkLabel: 'Volle Preisliste',
      },
    ],
  },

  // Fuenf Phasen. Der Abschluss-Moment lebt im letzten Abschnitt als
  // "Bereit für Phase 01?".
  //
  // KEINE HTML-Tags in body: das wird als Text eingesetzt, Tags
  // erschienen woertlich.
  fahrplan: {
    eyebrow: 'DER FAHRPLAN',
    title: 'So entsteht deine Website',
    phasen: [
      {
        label: 'PHASE 01',
        title: 'Wir sprechen miteinander',
        body:
          'Kostenloses Erstgespräch. Du erzählst was du brauchst, ich höre ' +
          'zu. Am Ende weißt du was es kostet und wie\'s weitergeht.',
        linkLabel: 'Was es kostet',
      },
      {
        label: 'PHASE 02',
        title: 'Ich entwerfe deine Website',
        body:
          'Erste Entwürfe: Aufbau, Farben, Stil. ' +
          'Wir drehen so lange bis es deine Marke trifft.',
        linkLabel: 'Fertige Arbeiten ansehen',
      },
      {
        label: 'PHASE 03',
        title: 'Ich baue sie',
        body:
          'Aus dem Entwurf wird die echte Website, mit deinen Texten und ' +
          'Bildern. Hier entsteht auch deine individuelle Anwendung, der ' +
          'Rechner oder das Formular. Plus ein eigener Bereich, in dem du ' +
          'Texte und Bilder später selbst änderst.',
        linkLabel: 'Was sie können kann',
      },
      {
        label: 'PHASE 04',
        title: 'Wir prüfen alles gemeinsam',
        body:
          'Du gehst durch die Seite, wir korrigieren letzte Details. Tests ' +
          'auf Handy und Computer. Damit am Launch nichts wackelt.',
        linkLabel: '',
      },
      {
        label: 'PHASE 05',
        title: 'Deine Website geht online',
        body:
          'Live-Schaltung auf deine Domain. Plus 30 Minuten Einweisung, ' +
          'wie du selbst weiterarbeiten kannst. Ohne mich jedes Mal ' +
          'anrufen zu müssen.',
        linkLabel: '',
      },
    ],
  },

  studio: {
    eyebrow: 'Dein Studio',
    headline: 'So pflegst du deine Website selbst',
    blaupauseAlt:
      'Handgezeichnete Blaupause: Bearbeitungsansicht mit Ordnern in der Seitenleiste und Feldern im Inhaltsbereich, verbunden durch eine Trace-Linie.',
    feldTitel: 'TITEL',
    feldBild: 'BILD',
    feldText: 'TEXT',
    live: 'live',
    cta: 'So funktioniert dein Studio',
    // Nachgebauter Inhalt. Die Reihenfolge der Kunden entspricht den
    // drei Reitern oben in der Blaupause.
    kunden: [
      {
        branche: 'Restaurant',
        reiter: [
          { label: 'Team', wert: 'Anna Klein · Küchenchef' },
          { label: 'Preise', wert: '3-Gang-Menu ab 42 €' },
          { label: 'Speisekarte', wert: 'Weinkarte Frühling 2026' },
          { label: 'Termine', wert: 'Weinabend · 15.03.' },
          { label: 'News', wert: 'Neue Sommer-Terrasse' },
        ],
      },
      {
        branche: 'Gastronomie',
        reiter: [
          { label: 'Team', wert: '12 Kollegen · Familie' },
          { label: 'Preise', wert: 'Frühstück ab 6,80 €' },
          { label: 'Stellen', wert: 'Barista m/w/d · Vollzeit' },
          { label: 'Öffnungszeiten', wert: 'Mo–Fr 08–18 Uhr' },
          { label: 'News', wert: 'Neu: Sonntags-Brunch' },
        ],
      },
      {
        branche: 'Handwerk',
        reiter: [
          { label: 'Leistungen', wert: 'Dach · Fassade · Sanierung' },
          { label: 'Referenzen', wert: 'Dach Aachen · 2024' },
          { label: 'Karriere', wert: 'Dachdecker · Lehrjahr 3' },
          { label: 'News', wert: 'Winter-Terminplan 2025/26' },
          { label: 'Kontakt', wert: 'Werkstatt Aachen · 24/7' },
        ],
      },
    ],
  },

  spielplatz: {
    eyebrow: 'Aus der Werkstatt',
    headline: 'Und manchmal baue ich einfach, worauf ich Lust habe.',
    rahmenTitel: 'ASTEROID//01 — Arcade-Spiel, spielbar',
    coverSub: 'Ein Nachmittagsprojekt, das ausgeufert ist',
    spielen: 'Hier spielen',
    weiterspielen: 'Weiterspielen',
    pausieren: 'Pausieren & weiterscrollen',
    cta: 'Was sonst noch in der Werkstatt liegt',
  },

  abschluss: {
    eyebrow: 'AM ZIEL',
    headlineVor: 'Bereit für',
    headlineHighlight: 'Phase 01?',
    subtext: 'Du kennst den Weg.\nWas fehlt, ist dein erstes Wort.',
    oderDirekt: 'Oder direkt:',
  },
} as const;

export const en: Shape<typeof de> = {
  meta: {
    pageTitle: 'Digital craftsmanship from Bremen',
    title: 'Websites and web applications from Bremen — from €2,000 fixed',
    description:
      'Digital craftsmanship from Bremen: custom websites and web applications. A website €2,000, an online store €3,000, one custom application included.',
  },

  hero: {
    serviceLine: 'Digital craftsmanship from Bremen.',
    intro:
      'From websites to custom applications.\n' +
      'One person, one signature, built from the ground up.',
  },

  praezision: {
    headline: 'Precision down to the last pixel.',
  },

  projekte: {
    eyebrow: 'SELECTED PROJECTS',
    headline: 'Built recently.',
    sub: 'Four sites, three industries. All handcrafted, all online.',
    vorschauVon: 'Preview of',
    modalOeffnen: 'open in the preview',
    cta: 'See all work',
  },

  warum: {
    eyebrow: 'WHY TAMMO STUDIOS',
    headline: 'No accident.',
    punkte: [
      {
        title: 'An original, not a kit',
        body:
          'No theme, no template. Your site is built from scratch: ' +
          'structure, colors, and typography cut to fit your business. In ' +
          'the end it looks like you, not like the provider.',
        linkLabel: 'See the work',
      },
      {
        title: 'It can do more than stand there',
        body:
          'A price calculator, an inquiry form that thinks along, a ' +
          'configurator. One custom application is part of the price, at no ' +
          'extra charge and with no longer build time.',
        linkLabel: 'What is possible',
      },
      {
        title: 'Fixed price, fixed date',
        body:
          '<strong>€2,000</strong> for a website, <strong>€3,000</strong> ' +
          'for an online store. Live in 14 days at most. No hourly rates, ' +
          'no add-on invoices, no packages with fine print.',
        linkLabel: 'The full price list',
      },
    ],
  },

  fahrplan: {
    eyebrow: 'THE ROADMAP',
    title: 'How your website comes together',
    phasen: [
      {
        label: 'PHASE 01',
        title: 'We talk to each other',
        body:
          'A free intro call. You tell me what you need, I listen. By the ' +
          'end you know what it costs and how it goes on from there.',
        linkLabel: 'What it costs',
      },
      {
        label: 'PHASE 02',
        title: 'I design your website',
        body:
          'First drafts: structure, colors, style. ' +
          'We keep turning the dial until it hits your brand.',
        linkLabel: 'See finished work',
      },
      {
        label: 'PHASE 03',
        title: 'I build it',
        body:
          'The draft becomes the real website, with your text and your ' +
          'images. Your custom application comes together here too, the ' +
          'calculator or the form. Plus an area of your own where you ' +
          'change text and images yourself later.',
        linkLabel: 'What it can do',
      },
      {
        label: 'PHASE 04',
        title: 'We go through everything together',
        body:
          'You walk through the site, we correct the last details. Tests on ' +
          'phone and computer. So nothing wobbles at launch.',
        linkLabel: '',
      },
      {
        label: 'PHASE 05',
        title: 'Your website goes live',
        body:
          'Launched on your domain. Plus a 30-minute walkthrough on how to ' +
          'carry on yourself. Without having to call me every time.',
        linkLabel: '',
      },
    ],
  },

  studio: {
    eyebrow: 'Your studio',
    headline: 'How you keep your website current yourself',
    blaupauseAlt:
      'A hand-drawn blueprint: an editing view with folders in the sidebar and fields in the content area, connected by a trace line.',
    feldTitel: 'TITLE',
    feldBild: 'IMAGE',
    feldText: 'TEXT',
    live: 'live',
    cta: 'How your studio works',
    kunden: [
      {
        branche: 'Restaurant',
        reiter: [
          { label: 'Team', wert: 'Anna Klein · head chef' },
          { label: 'Prices', wert: '3-course menu from €42' },
          { label: 'Menu', wert: 'Spring 2026 wine list' },
          { label: 'Events', wert: 'Wine evening · Mar 15' },
          { label: 'News', wert: 'New summer terrace' },
        ],
      },
      {
        branche: 'Café',
        reiter: [
          { label: 'Team', wert: '12 colleagues · family' },
          { label: 'Prices', wert: 'Breakfast from €6.80' },
          { label: 'Jobs', wert: 'Barista · full time' },
          { label: 'Hours', wert: 'Mon to Fri, 8am to 6pm' },
          { label: 'News', wert: 'New: Sunday brunch' },
        ],
      },
      {
        branche: 'Trades',
        reiter: [
          { label: 'Services', wert: 'Roof · facade · renovation' },
          { label: 'Work', wert: 'Roof in Aachen · 2024' },
          { label: 'Careers', wert: 'Roofer · third year' },
          { label: 'News', wert: 'Winter schedule 2025/26' },
          { label: 'Contact', wert: 'Workshop Aachen · 24/7' },
        ],
      },
    ],
  },

  spielplatz: {
    eyebrow: 'From the Lab',
    headline: 'And sometimes I just build whatever I feel like.',
    rahmenTitel: 'ASTEROID//01 — arcade game, playable',
    coverSub: 'An afternoon project that got out of hand',
    spielen: 'Play here',
    weiterspielen: 'Keep playing',
    pausieren: 'Pause and keep scrolling',
    cta: 'What else is in the Lab',
  },

  abschluss: {
    eyebrow: 'ARRIVED',
    headlineVor: 'Ready for',
    headlineHighlight: 'phase 01?',
    subtext: 'You know the way.\nAll that is missing is your first word.',
    oderDirekt: 'Or directly:',
  },
};

export const STARTSEITE = { de, en } as const;
