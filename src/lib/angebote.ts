/**
 * Das Angebot je Branchenseite — die Zahlen, nicht die Worte.
 *
 * Was der Besucher liest, steht im Wörterbuch
 * (src/lib/i18n/seiten/skizze.ts, Block `angebot`). Hier stehen nur
 * Preis und Anzahl: Zahlen sind in beiden Sprachen dieselben, und eine
 * Zahl, die zweimal irgendwo steht, ist eine Zahl, die irgendwann
 * auseinanderläuft.
 *
 * WO DER PREIS SONST NOCH AUFTAUCHT — wer ihn hier ändert, muss dort
 * mitgehen, der Typchecker kann das nicht erzwingen:
 *
 *   src/lib/verticals.ts      Hero-Unterzeile und meta.description
 *                             der Branche, und der Preis-Fließtext
 *                             unter pricing.paragraphs
 *   src/lib/verticals.en.ts   dieselben drei auf Englisch
 *
 * NICHT betroffen: /preise und die Startseite. Dort steht das
 * allgemeine Angebot (eine Website 2.000 €), hier das Paket der
 * jeweiligen Branche. Für Praxen ist es teurer, weil zwei individuelle
 * Anwendungen und der DSGVO-Aufwand drinstecken — das ist eine
 * Entscheidung des Betreibers, keine Unachtsamkeit.
 */

import type { SkizzeBranche } from './skizze';

export type Angebot = {
  /**
   * Der Betrag als ZAHL, nicht als Zeichenkette.
   *
   * Stand hier vorher als '2.500' — deutsche Schreibweise, fest
   * verdrahtet. Auf der englischen Fassung stand dadurch „2.500 €" in
   * der Karte, waehrend der Fliesstext daneben „€2,500" sagte. Eine
   * Zahl laesst sich pro Sprache formatieren, eine Zeichenkette nicht.
   */
  preis: number;
  /**
   * Wie viele individuelle Anwendungen im Paket sind.
   *
   * Steht hier und nicht nur im Text, weil die Beschriftung daraus
   * gebaut wird: „2 individuelle Anwendungen deiner Wahl". Sonst
   * stünde die Zahl in zwei Sprachen je einmal im Wörterbuch und
   * würde beim nächsten Mal in einer davon vergessen.
   */
  anwendungen: number;
  /**
   * Ob das Abzeichen oben an der Karte erscheint.
   *
   * ACHTUNG, das ist eine Behauptung: „Von Praxen am häufigsten
   * gebucht" setzt voraus, dass es stimmt. Es steht deshalb als
   * Schalter hier und nicht fest im Markup — wird eine Branche
   * irgendwann anders verkauft, ist es eine Zeile.
   *
   * Steht seit dem 04.11.2026 auf allen sechs Branchen, auf Ansage
   * des Betreibers.
   */
  abzeichen: boolean;
};

export const ANGEBOTE: Record<SkizzeBranche, Angebot> = {
  praxis: {
    preis: 2500,
    anwendungen: 2,
    abzeichen: true,
  },
  handwerk: {
    preis: 2000,
    anwendungen: 1,
    abzeichen: true,
  },
  gastronomie: {
    preis: 2000,
    anwendungen: 1,
    abzeichen: true,
  },
  kanzlei: {
    // Wie Praxis: zwei individuelle Anwendungen und derselbe Aufwand
    // bei Pflichtangaben und Datenschutz. Der Markt ruft fuer eine
    // Kanzlei-Website 3.000 bis 8.000 Euro auf — 2.500 ist deutlich
    // darunter, ohne billig zu wirken.
    preis: 2500,
    anwendungen: 2,
    abzeichen: true,
  },
  immobilien: {
    preis: 2000,
    anwendungen: 1,
    abzeichen: true,
  },
  medien: {
    preis: 2000,
    anwendungen: 1,
    abzeichen: true,
  },
};

/**
 * Der niedrigste Betrag über alle Branchen — der Einstiegspreis.
 *
 * Steht unter jeder Angebotskarte („Websites baue ich ab 2.000 €"),
 * damit eine Karte mit 2.500 € nicht als Untergrenze gelesen wird und
 * niemand aus einer siebten Branche denkt, für ihn gäbe es nichts.
 *
 * ABGELEITET, nicht hingeschrieben: sinkt irgendwann ein Paket unter
 * 2.000 €, stimmt die Zeile weiter.
 */
export const MINDESTPREIS = Math.min(...Object.values(ANGEBOTE).map((a) => a.preis));

export const mindestpreisText = (locale: 'de' | 'en'): string =>
  MINDESTPREIS.toLocaleString(locale === 'en' ? 'en-US' : 'de-DE');

/**
 * Der Betrag in der Schreibweise der jeweiligen Sprache, ohne
 * Währungszeichen — das steht im Wörterbuch, weil es im Deutschen
 * hinter und im Englischen vor der Zahl steht.
 */
export const preisText = (branche: SkizzeBranche, locale: 'de' | 'en'): string =>
  ANGEBOTE[branche].preis.toLocaleString(locale === 'en' ? 'en-US' : 'de-DE');
