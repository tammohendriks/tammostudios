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
  /**
   * Die Stelle, die auf der Karte hervorgehoben wird.
   *
   * MUSS wörtlich im Zitat stehen — zerlegen() wirft sonst beim Bauen.
   * Das ist Absicht: eine „hervorgehobene" Phrase, die im Zitat gar
   * nicht vorkommt, wäre ein erfundenes Zitat im Zitat, und genau das
   * darf auf einer Seite mit echten Bewertungen nicht passieren.
   */
  kernphrase: string;
  /**
   * Ein kurzes Abzeichen in der Ecke der Karte, etwa eine Note.
   *
   * Nur dort, wo die Bewertung selbst eine hergibt. Erfinden wäre
   * dasselbe Problem wie oben.
   */
  abzeichen?: string;
  /**
   * Die kurze Fassung — NUR fuer die Stimmen-Section der Startseite.
   *
   * Dort steht ein Zitat allein und gross auf dem Schirm und wird
   * Wort fuer Wort aufgedeckt. Sieben Zeilen sind dafuer zu viel: man
   * liest nicht mehr mit, man wartet. Auf den Branchenseiten bleiben
   * die laengeren Fassungen, dort stehen sie in Karten und werden
   * ueberflogen.
   *
   * GEKUERZT WIRD DURCH STREICHEN, nicht durch Umschreiben. Die
   * Interpunktion der Verfasserin bleibt stehen, auch der
   * Gedankenstrich. Einzige erlaubte Anpassung ist das Satzende dort,
   * wo mitten im Satz gestrichen wurde — ein Komma, das nun einen
   * Satz beendet, wird zum Punkt. Mehr nicht.
   */
  zitatKurz?: string;
  /** Die kurze Fassung auf Englisch. */
  zitatKurzEn?: string;
  /**
   * Die englische Fassung — NUR fuer die Stimmen-Section der
   * Startseite.
   *
   * ACHTUNG, DAS IST EINE AUSNAHME. Oben steht, warum Bewertungen
   * normalerweise nicht uebersetzt werden, und auf den
   * Branchenseiten gilt das weiter: dort stehen die Zitate auch auf
   * der englischen Fassung auf Deutsch.
   *
   * Auf der Startseite werden sie Wort fuer Wort aufgedeckt und
   * tragen die Aussage der ganzen Section. Ein deutscher Absatz, der
   * sich einem englischen Leser Wort fuer Wort enthuellt, ist kein
   * Vertrauensbeweis, sondern eine Huerde. Deshalb uebersetzt — und
   * deshalb steht darunter sichtbar „Translated from German". Ohne
   * diesen Hinweis waere es ein Zitat mit fremder Stimme.
   */
  zitatEn?: string;
  /** Die Kernphrase in der englischen Fassung. */
  kernphraseEn?: string;
  /** Nur zur Orientierung beim Pflegen, nicht sichtbar. */
  branche: string;
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 'kirsch',
    zitat:
      'Sehr zu empfehlen. Die Zusammenarbeit funktioniert klasse, wir sind mit der Arbeit und dem Miteinander sehr zufrieden und freuen uns auch in Zukunft weiterhin mit Tammo zusammen zu arbeiten. 10/10.',
    zitatEn:
      'Highly recommended. Working together runs brilliantly, we are very happy with the work and with the collaboration, and we look forward to carrying on with Tammo. 10/10.',
    zitatKurz:
      'Sehr zu empfehlen. Die Zusammenarbeit funktioniert klasse, wir sind mit der Arbeit und dem Miteinander sehr zufrieden. 10/10.',
    zitatKurzEn:
      'Highly recommended. Working together runs brilliantly, we are very happy with the work and with the collaboration. 10/10.',
    kernphrase: 'Die Zusammenarbeit funktioniert klasse',
    kernphraseEn: 'Working together runs brilliantly',
    abzeichen: '10/10',
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
    zitatEn:
      'As an occupational health practice we can genuinely recommend Tammo Studios — short lines of communication, precise execution, a well-made website design. We recommend Tammo wholeheartedly. And he is a wonderful person on top of that.',
    zitatKurz:
      'Tammo Studios können wir als betriebsärztliche Praxis wirklich empfehlen — kurze Kommunikationswege, präzise Umsetzung. Ein wunderbarer Mensch ist er außerdem.',
    zitatKurzEn:
      'As an occupational health practice we can genuinely recommend Tammo Studios — short lines of communication, precise execution. And he is a wonderful person on top of that.',
    kernphrase: 'kurze Kommunikationswege, präzise Umsetzung',
    kernphraseEn: 'short lines of communication, precise execution',
    autor: 'Dr. Kirsten Witzak-Agah',
    betrieb: 'Institut für Betriebsmedizin Isernhagen',
    initialen: 'KW',
    branche: 'Medizin',
  },
  {
    id: 'waermepower',
    zitat:
      'Sympathischer junger Kerl, der nahezu jede Idee umsetzen kann. Preis / Leistung der Hammer und schnelle Antwort!',
    zitatEn:
      'A likeable young guy who can build just about any idea. Value for money is outstanding and he replies fast!',
    kernphrase: 'Preis / Leistung der Hammer',
    kernphraseEn: 'Value for money is outstanding',
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
  // Für Medien gibt es noch keine eigene Bewertung. Vorn steht die,
  // die ausdrücklich die Gestaltung lobt — das ist das, was diese
  // Zielgruppe prüft.
  medien: ['ibi', 'kirsch', 'waermepower'],
  // Auch hier noch keine eigene Stimme. Vorn die aus einem
  // freien Beruf — das ist die naechstliegende Lage.
  kanzlei: ['ibi', 'kirsch', 'waermepower'],
  immobilien: ['kirsch', 'ibi', 'waermepower'],
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
/**
 * Zerlegt ein Zitat an seiner Kernphrase in drei Teile.
 *
 * Wirft, wenn die Phrase nicht wörtlich im Zitat steht. Still auf die
 * Hervorhebung zu verzichten wäre bequemer und falsch: man sähe es
 * niemandem an, und die Karte stünde monatelang ohne den Satz da, auf
 * den es ankommt. Ein Fehler beim Bauen fällt sofort auf.
 */
export const zerlegen = (t: Testimonial): [string, string, string] => {
  const i = t.zitat.indexOf(t.kernphrase);
  if (i === -1) {
    throw new Error(
      `Kernphrase „${t.kernphrase}" steht nicht im Zitat von ${t.autor}.`
    );
  }
  return [t.zitat.slice(0, i), t.kernphrase, t.zitat.slice(i + t.kernphrase.length)];
};

export const testimonialsFuer = (branche: TestimonialBranche): Testimonial[] =>
  REIHENFOLGE[branche].map((id) => {
    const gefunden = TESTIMONIALS.find((t) => t.id === id);
    if (!gefunden) throw new Error(`Kundenstimme "${id}" gibt es nicht (Branche ${branche}).`);
    return gefunden;
  });

/**
 * Zitat und Kernphrase in der gewuenschten Sprache, zerlegt in
 * [davor, Kernphrase, danach].
 *
 * Faellt auf Deutsch zurueck, wenn es keine Uebersetzung gibt — so
 * bleibt eine neue Stimme ohne englische Fassung sichtbar statt leer.
 * Ob uebersetzt wurde, sagt das zweite Feld: nur dann gehoert der
 * Hinweis „Translated from German" darunter.
 */
export const zerlegenFuer = (
  t: Testimonial,
  locale: 'de' | 'en',
  laenge: 'voll' | 'kurz' = 'voll'
): { teile: [string, string, string]; uebersetzt: boolean } => {
  const uebersetzt = locale === 'en' && !!t.zitatEn && !!t.kernphraseEn;

  if (!uebersetzt) {
    const zitat = (laenge === 'kurz' && t.zitatKurz) || t.zitat;
    const i = zitat.indexOf(t.kernphrase);
    if (i === -1) {
      throw new Error(
        `Kernphrase „${t.kernphrase}" steht nicht im Zitat von ${t.autor}.`
      );
    }
    return {
      teile: [zitat.slice(0, i), t.kernphrase, zitat.slice(i + t.kernphrase.length)],
      uebersetzt: false,
    };
  }

  const zitat = (laenge === 'kurz' && t.zitatKurzEn) || t.zitatEn!;
  const phrase = t.kernphraseEn!;
  const i = zitat.indexOf(phrase);
  if (i === -1) {
    throw new Error(
      `Kernphrase „${phrase}" steht nicht im englischen Zitat von ${t.autor}.`
    );
  }
  return {
    teile: [zitat.slice(0, i), phrase, zitat.slice(i + phrase.length)],
    uebersetzt: true,
  };
};
