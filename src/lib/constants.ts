export const SITE = {
  name: 'Tammo Studios',
  domain: 'tammostudios.de',
  url: 'https://tammostudios.de',
  email: 'tammo@tammostudios.de',
  phone: '0177 1962704',
  phoneHref: 'tel:+491771962704',
  location: 'Bremen',

  // Profile neben der Navigation in der Fussleiste, nur als Symbol.
  // platform waehlt das Symbol (klein geschrieben, 'instagram' oder
  // 'linkedin'), label und handle landen im aria-label.
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

/**
 * Dieselbe Nummer in internationaler Schreibweise, fuer die englische
 * Fassung: eine 0177 kann aus dem Ausland niemand waehlen.
 *
 * Abgeleitet statt ein zweites Mal hingeschrieben — die fuehrende Null
 * ist die deutsche Verkehrsausscheidungsziffer und entfaellt hinter der
 * Landesvorwahl. Aendert sich die Nummer, aendert sich beides.
 */
export const PHONE_INTERNATIONAL = `+49 ${SITE.phone.replace(/^0/, '')}`;

/**
 * Die Projektstart-Anzeige oben auf den Branchen-Landingpages und im
 * Abschluss-Block.
 *
 * Statisch im Code und mit einem Schalter, nicht im Studio gepflegt:
 * eine Zahl, die jemand im CMS vergisst, wird zur Lüge. Hier stehen
 * alle Angaben nebeneinander — wer die eine ändert, sieht die andere.
 *
 * WICHTIG: die Zahlen müssen stimmen. Eine erfundene Knappheit ist auf
 * einer Seite, die mit Vertrauen wirbt, der teuerste Satz von allen.
 * Werbeanzeigen bringen genug Leute vorbei, dass es auffällt, wenn seit
 * Monaten dasselbe dasteht; und eine Verfügbarkeits-Angabe, die nicht
 * stimmt, ist irreführende Werbung nach § 5 UWG — abmahnfähig, nicht
 * nur unschön. Lieber abschalten als faken.
 *
 * aktiv: false blendet den Block auf allen Seiten aus. frei: 0 blendet
 * ihn ebenfalls aus — „noch 0 von 5 frei" wirbt mit dem Gegenteil von
 * Verfügbarkeit, und einen Ausgebucht-Hinweis will die Seite an dieser
 * Stelle nicht.
 */
export const SLOT_KNAPPHEIT: {
  aktiv: boolean;
  gesamt: number;
  frei: number;
  monat: { de: string; en: string };
  naechsterStart: { de: string; en: string };
  hinweis: { de: string; en: string };
} = {
  aktiv: true,
  /** Wie viele Projektstarts der Monat überhaupt hat. */
  gesamt: 5,
  /** Wie viele davon noch frei sind. */
  frei: 2,
  /** Der Monat, auf den sich die Zahlen beziehen. */
  monat: { de: 'Dezember', en: 'December' },
  /** Wann der nächste freie Start beginnt. */
  naechsterStart: { de: 'KW 49', en: 'week 49' },
  /** Was das für den Kunden bedeutet. Ein Satzteil, kein Satz. */
  hinweis: { de: 'Live vor Weihnachten', en: 'Live before Christmas' },
};
// Bewusst OHNE `as const`: sonst wären gesamt und frei die Literaltypen
// 5 und 2, und jeder Vergleich im Code — der Einzahl-Zweig des Textes,
// die Prüfung auf frei === 0 — gälte dem Typchecker als unerreichbar.
// Er meldet dann einen Vergleich, der nie zutreffen kann. Die Zahlen
// sollen sich aber ändern lassen, genau dafür stehen sie hier.

/**
 * Tammos Geburtsdatum, einziger Zweck: das Alter auf /ueber.
 *
 * GERECHNET WIRD BEIM BAUEN, nicht im Browser. Damit steht im
 * ausgelieferten HTML nur die Zahl, nicht das Datum — das Alter war
 * vorher schon oeffentlich, der Geburtstag soll es nicht werden.
 *
 * Preis dafuer: zwischen dem 28. Oktober und dem naechsten Deploy
 * zeigt die Seite noch die alte Zahl. Ein Deploy genuegt, um es
 * geradezuziehen.
 *
 * Stand vorher als feste Zahl im Text („25 Jahre alt") und war
 * dadurch jedes Jahr einmal falsch.
 */
export const GEBURTSTAG = '2000-10-28';

/**
 * Das heutige Alter in vollen Jahren.
 *
 * Gerechnet in Bremer Zeit, nicht in UTC: der Bauserver steht auf
 * UTC, und am Geburtstag selbst waeren das zwischen Mitternacht und
 * zwei Uhr morgens ein Jahr zu wenig. Zwei Zeilen gegen einen Fehler,
 * der genau an dem Tag auftritt, an dem es auffaellt.
 *
 * Der Vergleich laeuft ueber die Zeichenketten „MM-TT". Beide sind
 * mit fuehrender Null geschrieben, damit stimmt die alphabetische
 * Reihenfolge mit der zeitlichen ueberein.
 */
/**
 * Ersetzt {alter} in einem Text durch das heutige Alter.
 *
 * WARUM ALS HELFER: die Zahl stand an drei Stellen. Der sichtbare
 * Untertitel auf /ueber wurde schon auf den Platzhalter umgestellt,
 * die META-BESCHREIBUNG derselben Seite nicht — dort stand weiter
 * fest „25", in beiden Sprachen. Eine SEO-Beschreibung ist genau der
 * Ort, an dem eine veraltete Zahl niemandem auffaellt und trotzdem
 * im Suchergebnis steht.
 */
export const mitAlter = (text: string): string =>
  text.replace('{alter}', String(alterJetzt()));

export const alterJetzt = (): number => {
  const heute = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  const jahre = Number(heute.slice(0, 4)) - Number(GEBURTSTAG.slice(0, 4));
  return heute.slice(5) >= GEBURTSTAG.slice(5) ? jahre : jahre - 1;
};

/**
 * Die Google-Bewertung, an EINER Stelle.
 *
 * Steht bisher dreimal als Text im Woerterbuch (Branchenseiten,
 * Startseite), und drei Zahlen, die dasselbe meinen, laufen
 * irgendwann auseinander.
 *
 * ACHTUNG, ZWEI DINGE:
 *
 * 1. `anzahl` pflegt der Betreiber von Hand. Sie wird NICHT
 *    automatisch aus Google geholt — dafuer braeuchte es die Places
 *    API und einen Schluessel, und eine Zahl, die von einer API
 *    kommen koennte, aber aus einer Konstante kommt, waere die
 *    gefaehrlichere Variante.
 *
 * 2. WEDER die Zahl als `aggregateRating` NOCH die drei Stimmen als
 *    `review` stehen im JSON-LD, und der Grund ist ein anderer als
 *    hier frueher stand.
 *
 *    Frueher stand da, aggregateRating sei ein Richtlinienverstoss
 *    und Einzelbewertungen seien erlaubt. Beides stimmt nicht.
 *    Googles FAQ zur Aenderung von 2019 beantwortet „Does this
 *    update apply to AggregateRating too?" mit „Yes. It applies to
 *    Review and AggregateRating" — beide werden gleich behandelt.
 *    Und ein Verstoss ist es auch nicht: „No, you don't need to
 *    remove them. Google Search just won't display review snippets
 *    for those pages anymore" sowie „You won't get a manual action
 *    just for this."
 *
 *    Der wirkliche Grund ist Wirkungslosigkeit. Die Doku zu Review
 *    snippets sagt: „If the entity that's being reviewed controls
 *    the reviews about itself, their pages that use LocalBusiness or
 *    any other type of Organization structured data are ineligible
 *    for star review feature." ProfessionalService ist ein Subtyp
 *    von LocalBusiness, der Fall liegt also vor. Sterne gibt es
 *    dafuer garantiert nie — die Auszeichnung waere Aufwand ohne
 *    jeden Gegenwert.
 *
 *    Dazu kaeme ein zweiter Punkt: „Don't aggregate reviews or
 *    ratings from other websites" und „Ratings must be sourced
 *    directly from users". Diese Note kommt aus Google, nicht aus
 *    einer eigenen Erhebung.
 *
 *    Was stattdessen wirkt: die Stimmen als sichtbarer Text mit
 *    Namen und Quelle (steht so auf der Startseite und den
 *    Landingpages, ist fuer Menschen und KI-Crawler lesbar), und
 *    `url` unten als sameAs auf das Unternehmensprofil — Sterne
 *    entstehen ueber das Profil, das von der Regel ausdruecklich
 *    nicht betroffen ist.
 *
 *    Belege, Stand 08.09.2026:
 *    https://developers.google.com/search/docs/appearance/structured-data/review-snippet
 *    https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful
 */
export const GOOGLE_BEWERTUNG = {
  /** Die Note in deutscher Schreibweise. */
  note: '5,0',
  /** Dieselbe Note auf Englisch. */
  noteEn: '5.0',
  /** Wie viele Bewertungen. Von Hand gepflegt. */
  anzahl: 4,
  /**
   * Das Google-Unternehmensprofil.
   *
   * Leer lassen, wenn keine Adresse vorliegt: ein Verweis ins Leere
   * ist schlechter als keiner. Die Komponenten blenden ihn dann aus.
   *
   * DIESE FORM, UND WARUM NICHT DIE AUFGELOESTE: der Kurzlink fuehrt
   * ueber zwei Weiterleitungen auf eine Google-SUCHSEITE mit
   * Sitzungsparametern (sca_esv, rlz, sxsrf, utm_source). Die taugt
   * nicht als dauerhafte Adresse. Stabil waere allenfalls die
   * Knowledge-Graph-Kennung kgmid=/g/11zgmt_dxz, aber die liefert
   * einem Abruf ohne Browser nur eine Zustimmungsseite — ob sie das
   * Profil zeigt, liess sich nicht pruefen. Der Kurzlink ist das,
   * was der Betreiber selbst teilt, und Google haelt ihn.
   */
  url: 'https://share.google/jLisCetP5L4vl37dY',
} as const;

/** Die Note in der Schreibweise der jeweiligen Sprache. */
export const bewertungsNote = (locale: 'de' | 'en'): string =>
  locale === 'en' ? GOOGLE_BEWERTUNG.noteEn : GOOGLE_BEWERTUNG.note;
