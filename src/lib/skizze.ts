/**
 * Die Werte des Skizzen-Fragebogens — getrennt von den Beschriftungen.
 *
 * Was hier steht, geht so an den Server und wird dort gegen ein Enum
 * geprüft. Was der Besucher liest, steht im Wörterbuch
 * (src/lib/i18n/seiten/skizze.ts) und ist pro Sprache verschieden.
 *
 * Diese Trennung ist dieselbe wie beim Kontaktformular und aus
 * demselben Grund: käme die Beschriftung mit, stünde in Tammos Mail bei
 * einer englischen Anfrage „Build trust" statt „Vertrauen aufbauen" —
 * und jeder Tippfehler im Wörterbuch wäre ein neuer, unbekannter Wert
 * in seinem Postfach.
 *
 * Die Bindung zwischen beiden Listen erzwingt Gleichlang<> im
 * Wörterbuch: eine Zeile mehr oder weniger bricht `npm run check`.
 * Ohne die Bindung wäre ein Auswahlpunkt ohne Beschriftung möglich,
 * und der fiele erst im Browser auf.
 */

/** Was die Website leisten soll (Schritt 1, eine Auswahl). */
export const ZIELE = ['anfragen', 'termine', 'vertrauen', 'verkaufen'] as const;
export type Ziel = (typeof ZIELE)[number];

/** Die visuelle Richtung (Schritt 4, eine Auswahl). */
export const STILE = ['serioes', 'modern', 'kantig', 'offen'] as const;
export type Stil = (typeof STILE)[number];

/**
 * Welche Funktionen zur Auswahl stehen (Schritt 3, mehrere möglich).
 *
 * Pro Branche verschieden, weil die Frage sonst nichts wert wäre: einem
 * Dachdecker einen Patienten-Login anzubieten verrät nur, dass die
 * Seite für jeden gleich aussieht. Genau diesen Eindruck soll der
 * Fragebogen vermeiden.
 */
export const FUNKTIONEN = {
  handwerk: [
    'kontaktformular',
    'notdienst',
    'maps',
    'bewertungen',
    'galerie',
    'blog',
    'kundenbereich',
  ],
  praxis: [
    'kontaktformular',
    'termine',
    'team',
    'leistungen',
    'mehrsprachig',
    'maps',
    'patientenportal',
  ],
  gastronomie: [
    'kontaktformular',
    'speisekarte',
    'reservierung',
    'oeffnungszeiten',
    'maps',
    'galerie',
    'lieferdienst',
  ],
  medien: [
    'kontaktformular',
    'portfolio',
    'video',
    'kundengalerie',
    'referenzlogos',
    'blog',
    'shop',
  ],
  kanzlei: [
    'kontaktformular',
    'rechtsgebiete',
    'team',
    'unterlagen',
    'termine',
    'karriere',
    'mehrsprachig',
  ],
} as const;

/** Die Branchen, für die es einen Fragebogen gibt. */
export type SkizzeBranche = keyof typeof FUNKTIONEN;

/** Alle Funktions-Schlüssel über alle Branchen, für die Prüfung am Server. */
export const ALLE_FUNKTIONEN = [
  ...new Set(Object.values(FUNKTIONEN).flat()),
] as string[];

/**
 * Grenzen für die Datei-Anhänge (Schritt 5).
 *
 * Die Route ist offen im Netz, jeder kann sie aufrufen. Ohne harte
 * Grenzen wäre sie ein kostenloser Dateispeicher auf Tammos Rechnung —
 * die Dateien landen in SEINEM Sanity-Konto. Deshalb klein, gezählt und
 * auf die Formate beschränkt, die jemand wirklich schickt: Logo, Fotos,
 * ein PDF mit Texten.
 */
export const UPLOAD = {
  /**
   * Summe aller Dateien einer Anfrage.
   *
   * VIER MEGABYTE, NICHT ZWANZIG — das ist keine Vorsicht, sondern
   * eine Wand: Vercel kappt den Rumpf jeder Funktions-Anfrage bei
   * 4,5 MB (413 FUNCTION_PAYLOAD_TOO_LARGE). Hart, auf allen Tarifen,
   * nicht konfigurierbar, auch nicht per Streaming zu umgehen. Wer
   * hier 20 MB zulässt, baut einen Knopf, der bei einem Handyfoto-Satz
   * verlässlich scheitert — und zwar mit einer Fehlermeldung, die der
   * Besucher nicht versteht.
   *
   * 4 MB plus die Formularfelder bleiben sicher darunter. Größeres
   * gehört in die Antwort auf die Bestätigungsmail; genau dazu lädt
   * sie ein.
   */
  maxGesamtBytes: 4 * 1024 * 1024,
  /** Eine einzelne Datei darf das ganze Budget verbrauchen. */
  maxDateiBytes: 4 * 1024 * 1024,
  /** Wie viele Dateien auf einmal. */
  maxAnzahl: 10,
  /**
   * Erlaubte Typen. Geprüft wird am Server gegen den gemeldeten
   * MIME-Typ UND die Endung — der MIME-Typ kommt vom Browser und ist
   * damit eine Angabe des Absenders, keine Tatsache.
   */
  typen: [
    { mime: 'image/png', endungen: ['.png'] },
    { mime: 'image/jpeg', endungen: ['.jpg', '.jpeg'] },
    { mime: 'image/webp', endungen: ['.webp'] },
    { mime: 'image/svg+xml', endungen: ['.svg'] },
    { mime: 'application/pdf', endungen: ['.pdf'] },
    { mime: 'application/zip', endungen: ['.zip'] },
    { mime: 'application/x-zip-compressed', endungen: ['.zip'] },
  ],
} as const;

/** Was im Datei-Dialog als Filter steht. */
export const UPLOAD_ACCEPT = [
  ...new Set(UPLOAD.typen.flatMap((t) => [t.mime, ...t.endungen])),
].join(',');

/** Wie viele Schritte der Fragebogen hat (ohne Absenden und Danke). */
export const SCHRITTE = 6;

/**
 * Welche Branchen-Landingpages schon auf den Werbe-Umbau laufen.
 *
 * Die drei Seiten teilen sich EINE Komponente — eine Kopie je Branche
 * wäre dreifache Pflege für denselben Aufbau. Also ein Schalter: die
 * neuen Teile (Knappheits-Pille, Skizzen-CTA, Häkchen, Kundenstimmen,
 * Fragebogen) erscheinen nur auf den hier genannten Seiten. Die
 * anderen bleiben Wort für Wort, wie sie heute sind.
 *
 * Eine Branche dazunehmen heißt: Wort hier eintragen, fertig. Die
 * branchenspezifischen Teile (Funktions-Auswahl, Reihenfolge der
 * Kundenstimmen) liegen längst bereit.
 */
export const UMBAU_AKTIV: readonly SkizzeBranche[] = [
  'praxis',
  'handwerk',
  'gastronomie',
  'medien',
  'kanzlei',
];
