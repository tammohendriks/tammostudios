/**
 * Echte Kundenstimmen für die Branchen-Landingpages.
 *
 * WÖRTLICH, NICHT GEGLÄTTET: das sind reale Google-Bewertungen. Die
 * Formulierungen bleiben so, wie die Leute sie geschrieben haben —
 * samt „Sympathischer junger Kerl" und „10/10". Eine gebügelte
 * Bewertung liest sich wie eine erfundene, und auf einer Seite, die
 * Vertrauen aufbauen soll, ist das der teuerste Fehler.
 *
 * Deshalb werden sie auch auf der englischen Fassung NICHT übersetzt.
 * Eine übersetzte Bewertung ist keine Bewertung mehr, sondern ein Zitat
 * mit fremder Stimme. Übersetzt werden nur Überschrift und Beiwerk.
 *
 * Die Reihenfolge ist pro Branche verschieden: vorn steht, wer der
 * Besucherin am ähnlichsten ist. Wer eine Praxis hat, glaubt der
 * Betriebsmedizinerin mehr als dem Dachdecker — und umgekehrt.
 */

export type Testimonial = {
  /** Schlüssel für die Reihenfolge je Branche. */
  id: 'kirsch' | 'ibi' | 'waermepower';
  /**
   * Was auf der Karte steht. Gekürzt ist erlaubt, umformuliert nicht —
   * und gekürzt wird nur dort, wo drei Karten nebeneinander sonst
   * nicht mehr zusammenpassen.
   */
  zitat: string;
  /**
   * Der vollständige Wortlaut, falls gekürzt wurde.
   *
   * Steht hier, damit beim nächsten Umbau niemand raten muss, was
   * weggefallen ist, und damit die Kürzung überprüfbar bleibt: wer
   * beides nebeneinander liest, sieht sofort, ob der Sinn gehalten
   * hat. Wird nicht angezeigt.
   */
  zitatVoll?: string;
  /** Wer es gesagt hat. */
  autor: string;
  /** Betrieb und Ort, zweite Zeile unter dem Namen. */
  betrieb: string;
  /** Zwei Buchstaben für den Kreis links. */
  initialen: string;
  /** Nur zur Orientierung beim Pflegen, nicht sichtbar. */
  branche: string;
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 'kirsch',
    zitat:
      'Sehr zu empfehlen. Die Zusammenarbeit funktioniert klasse, wir sind mit der Arbeit und dem Miteinander sehr zufrieden und freuen uns auch in Zukunft weiterhin mit Tammo zusammen zu arbeiten. 10/10.',
    autor: 'Kirsch Dach & Fassade GmbH',
    betrieb: 'Bremen',
    initialen: 'KD',
    branche: 'Handwerk',
  },
  {
    id: 'ibi',
    // Gekürzt, nicht umgeschrieben: das Original ist dreimal so lang
    // wie die beiden anderen, und nebeneinander ergäbe das eine sehr
    // hohe Karte neben zwei leeren. Weggefallen sind der einleitende
    // Dank und die technische Mitte („gut funktionierendes
    // Responsive-System") — beides sagt dem Besucher weniger als das,
    // was stehen geblieben ist. Der letzte Satz bleibt: er ist der
    // überzeugendste.
    zitat:
      'Tammo Studios können wir als betriebsärztliche Praxis wirklich empfehlen — kurze Kommunikationswege, präzise Umsetzung, eine gelungene Websitegestaltung. Tammo können wir von Herzen empfehlen. Ein wunderbarer Mensch ist er außerdem.',
    zitatVoll:
      'Ganz herzlichen Dank für die Neugestaltung unserer Website. Für alle Mitlesenden: Tammo Studios können wir als betriebsärztliche Praxis wirklich empfehlen — kurze Kommunikationswege, präzise Umsetzung, einfach eine gelungene Websitegestaltung mit gut funktionierendem Responsive-System. Tammo können wir von Herzen empfehlen. Ein wunderbarer Mensch ist er außerdem.',
    autor: 'Dr. Kirsten Witzak-Agah',
    betrieb: 'Institut für Betriebsmedizin Isernhagen',
    initialen: 'KW',
    branche: 'Medizin',
  },
  {
    id: 'waermepower',
    zitat:
      'Sympathischer junger Kerl, der nahezu jede Idee umsetzen kann. Preis / Leistung der Hammer und schnelle Antwort!',
    autor: 'WärmePower',
    betrieb: 'Bremen',
    initialen: 'WP',
    branche: 'Handwerk',
  },
];

/**
 * Welche Stimme steht auf welcher Seite vorn.
 *
 * Für die Gastronomie gibt es noch keine eigene Bewertung. Statt dort
 * gar keine zu zeigen, kommt die Praxis-Reihenfolge zum Zug: sie belegt
 * Bandbreite über zwei sehr verschiedene Branchen hinweg, und das ist
 * immer noch mehr als eine leere Stelle.
 */
const REIHENFOLGE = {
  handwerk: ['kirsch', 'waermepower', 'ibi'],
  praxis: ['ibi', 'kirsch', 'waermepower'],
  gastronomie: ['ibi', 'kirsch', 'waermepower'],
} as const satisfies Record<string, readonly Testimonial['id'][]>;

/** Die Branchen, für die eine Reihenfolge hinterlegt ist. */
export type TestimonialBranche = keyof typeof REIHENFOLGE;

/**
 * Die Stimmen in der Reihenfolge, die zu dieser Branche passt.
 *
 * Wirft, wenn eine Reihenfolge einen Schlüssel nennt, den es nicht
 * gibt. Still eine Karte weniger anzuzeigen wäre schlimmer: die Lücke
 * fiele im Raster kaum auf und stünde dann monatelang live.
 */
export const testimonialsFuer = (branche: TestimonialBranche): Testimonial[] =>
  REIHENFOLGE[branche].map((id) => {
    const gefunden = TESTIMONIALS.find((t) => t.id === id);
    if (!gefunden) throw new Error(`Kundenstimme "${id}" gibt es nicht (Branche ${branche}).`);
    return gefunden;
  });
