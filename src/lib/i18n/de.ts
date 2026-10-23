// Deutsche Texte der geteilten Hülle: Navigation, Fußzeile,
// Abschluss-Block, Sprach-Umschalter.
//
// Quelle der Wahrheit. en.ts wird dagegen typgeprüft (siehe shape.ts),
// jede Abweichung in Struktur oder Listenlänge bricht den Build.
//
// Seiteninhalte liegen NICHT hier, sondern bleiben vorerst in den
// Seiten selbst. Hier steht nur, was auf jeder Seite erscheint.
//
// Die href-Werte sind Routen-SCHLÜSSEL aus routes.mjs, keine Pfade.
// So entsteht der richtige Pfad je Sprache automatisch, und ein
// Verweis kann nicht auf die falsche Sprachfassung zeigen.

export const de = {
  // Kopfzeile links, in beiden Sprachen identisch
  establishedLine: 'EST. 2026 · BREMEN',

  nav: {
    home: 'Startseite',
    ueber: 'Über',
    angebot: 'Angebot',
    website: 'Website',
    software: 'Software',
    preise: 'Preise',
    werkstatt: 'Werkstatt',
    referenzen: 'Referenzen',
    journal: 'Journal',
    kontakt: 'Kontakt',
    hauptnavigation: 'Hauptnavigation',
    menueOeffnen: 'Menü öffnen',
    menueSchliessen: 'Menü schließen',
    bereichRechtliches: 'Rechtliches',
  },

  sprache: {
    // Beschriftung des Umschalters. Das aria-label beschreibt die
    // Wirkung, nicht den Zustand — und es beginnt mit dem sichtbaren
    // Kuerzel des ZIELS. Sichtbar sind am Schalter "DE" und "EN"; wer
    // per Sprachbefehl bedient, sagt "klick EN", weil das dasteht. Ohne
    // das Kuerzel im Namen trifft dieser Befehl nichts.
    umschalten: 'EN — Sprache wechseln, zur englischen Fassung',
    kurzDe: 'DE',
    kurzEn: 'EN',
  },

  thema: {
    umschalten: 'Farbthema umschalten (Dark / Light)',
    aktuellHell: 'Farbthema umschalten (aktuell: Light)',
    aktuellDunkel: 'Farbthema umschalten (aktuell: Dark)',
  },

  footer: {
    copyright: '© 2026 Tammo Studios',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    // Der Datenschutz-Kurzhinweis. Die Cal.com-Einschränkung muss
    // erhalten bleiben: ohne sie wäre der Satz nachweislich falsch,
    // sobald jemand den Kalender öffnet.
    datenschutzHinweis:
      'Diese Website setzt von sich aus keine Cookies und nutzt keine ' +
      'Tracking-Tools. Ausgewertet werden nur anonyme Server-Logs. ' +
      'Cookies können nur entstehen, wenn du die Terminbuchung aktiv ' +
      'öffnest.',
    datenschutzDetails: 'Details',
    socialsLabel: 'Social Media',
    // Wird dem Namen und dem Konto nachgestellt:
    // "Instagram: @tammostudios (öffnet in neuem Tab)".
    neuerTab: '(öffnet in neuem Tab)',
  },

  abschluss: {
    headlineFair: 'Klingt fair?',
    headlineUeberzeugt: 'Überzeugt?',
    naechsterSchritt: 'Nächster Schritt:',
    erstgespraech: '30 Min Erstgespräch, kostenlos und unverbindlich.',
    cta: 'Lass uns sprechen',
    zusagen: [
      'Antwort < 24 h',
      'Erstgespräch gratis',
      'DE & EN',
    ],
    zusagenLabel: 'Was du erwarten kannst',
  },

  // Die geteilte Hülle der drei Branchen-Landingpages. Hier steht nur,
  // was auf allen drei Seiten gleich ist; die branchenspezifischen Texte
  // liegen in verticals.ts und verticals.en.ts.
  //
  // Die Vorsilbe WAS ES KOSTET steht großgeschrieben, weil das
  // Augenbrauen-Element der Seite seine Texte so vorhält (siehe die
  // anderen eyebrow-Werte in verticals.ts). Dieselbe Zeichenkette dient
  // als aria-label des Abschnitts.
  branche: {
    erstgespraech: 'Erstgespräch anfragen',
    wasEsKostet: 'WAS ES KOSTET',
    preisHeadline: 'Klar, fix, ohne Sternchen.',
    preislisteAnsehen: 'Volle Preisliste ansehen',
    // Wird dem Namen der Referenz nachgestellt: "Wärmepower — …".
    liveSeiteOeffnen: 'Live-Site öffnen (neuer Tab)',
    faqTitel: 'Häufige Fragen',
    empfehlung: {
      text: 'Die Branche ist nie das Problem. Was zählt, ist was die Seite können soll:',
      label: 'Zu den individuellen Anwendungen',
    },
  },

  // Das Vorschau-Fenster der Referenzen. Steht hier und nicht in einer
  // Seiten-Datei, weil die Komponente auf zwei Seiten benutzt wird.
  referenzModal: {
    neuerTab: 'In neuem Tab',
    schliessen: 'Modal schließen',
    rahmenTitel: 'Referenz-Vorschau',
    nichtEinbettbar: 'Diese Seite kann nicht direkt eingebettet werden.',
    neuerTabOeffnen: 'Im neuen Tab öffnen',
  },

  // Texte der strukturierten Daten im Kopf jeder Seite (siehe
  // BaseLayout). Sie beschreiben denselben Betrieb unter derselben @id,
  // nur in der Sprache der Seite — hreflang verbindet die Fassungen.
  //
  // Vorher standen sie fest auf Deutsch im Layout. Damit trug jede
  // englische Seite eine deutsche Beschreibung, eine Brotkrume namens
  // "Startseite", die auf die deutsche Startseite zeigte, und Angebote,
  // die auf /preise statt /en/pricing verwiesen.
  schema: {
    beschreibung:
      'Individuelle Websites, handgemacht in Bremen. ' +
      'Kein Template-Recycling, klare Fixpreise, ' +
      'in maximal 14 Tagen live.',
    slogan: 'Websites, handgemacht in Bremen.',
    // Alternativtext des Vorschaubildes beim Teilen.
    bildAlt: 'Tammo Studios — Websites, handgemacht in Bremen',
    jobTitle: 'Webentwickler',
    land: 'Deutschland',
    bundesland: 'Niedersachsen',
    katalog: 'Website-Pakete',
    brotkrumeStart: 'Startseite',
    angebote: [
      {
        name: 'Individuelle Website',
        beschreibung:
          'Eigenes Design, eigenes CMS, eine individuelle Anwendung ' +
          'inklusive, Mobile- & Desktop-optimiert, schnell + sauber im ' +
          'SEO, DSGVO-konform. Einmalig, fix.',
      },
      {
        name: 'Online-Shop',
        beschreibung:
          'Alles aus "Eine Website" plus voller Shop mit Warenkorb & ' +
          'Checkout, Zahlungsanbieter-Integration, Produkte & ' +
          'Bestellungen im CMS.',
      },
      {
        name: 'Weitere individuelle Anwendung',
        beschreibung:
          'Preisrechner, Konfigurator, mitdenkendes Anfrageformular mit ' +
          'PDF-Ausgabe. Die erste Anwendung ist im Website- oder ' +
          'Shop-Preis enthalten, jede weitere kostet 500 €.',
      },
    ],
    kannUeber: [
      'Webentwicklung',
      'Astro Framework',
      'Tailwind CSS',
      'Sanity CMS',
      'Vercel Deployment',
      'E-Commerce',
      'SEO',
    ],
  },

  journal: {
    // Hinweis unter der Journal-Unterzeile. Steht nur auf der
    // deutschen Seite, weil es die englische nicht gibt.
    nurDeutsch: 'Das Journal gibt es nur auf Deutsch.',
  },

  scrollCue: 'SCROLLEN',
  scrollCueLabel: 'Nach unten scrollen',
} as const;
