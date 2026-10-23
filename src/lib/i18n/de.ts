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
    menueOeffnen: 'Menü öffnen',
    menueSchliessen: 'Menü schließen',
    bereichRechtliches: 'Rechtliches',
  },

  sprache: {
    // Beschriftung des Umschalters. aria-label beschreibt die Wirkung,
    // nicht den Zustand.
    umschalten: 'Sprache wechseln, zur englischen Fassung',
    kurzDe: 'DE',
    kurzEn: 'EN',
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

  journal: {
    // Hinweis unter der Journal-Unterzeile. Steht nur auf der
    // deutschen Seite, weil es die englische nicht gibt.
    nurDeutsch: 'Das Journal gibt es nur auf Deutsch.',
  },

  scrollCue: 'SCROLLEN',
} as const;
