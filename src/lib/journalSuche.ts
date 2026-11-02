/**
 * Das Fundament der Journal-Suche: Normalisierung, Synonyme, Bewertung.
 *
 * Diese Datei wird an ZWEI Orten benutzt, und beide müssen genau
 * dasselbe tun:
 *   - beim Build, in src/pages/journal/suchindex.json.ts, um den
 *     Suchtext jedes Beitrags vorzubereiten
 *   - im Browser, im Skript von src/pages/journal/index.astro, um die
 *     Eingabe des Besuchers damit zu vergleichen
 *
 * Liefen die beiden auseinander, fände die Suche nichts, und zwar
 * lautlos: der Index enthielte „waermepower" und die Eingabe würde zu
 * „wärmepower" — kein Treffer, keine Fehlermeldung. Deshalb steht die
 * Normalisierung hier und nicht zweimal.
 *
 * WARUM GEZÄHLT UND NICHT GEPRÜFT WIRD: der erste Entwurf hat nur
 * gefragt, ob ein Wort im Beitrag vorkommt. Gemessen an den 21
 * Beiträgen war das unbrauchbar — „was kostet eine website" traf 20 von
 * 20, „kneipe" traf 11 inklusive des Beitrags über die eigene
 * Selbstständigkeit. Deutsche Fließtexte erwähnen eben jedes Thema
 * einmal im Vorbeigehen.
 *
 * Die Häufigkeit trennt dagegen klar. Gemessene Verteilungen:
 *   praxis  25, 25, 10, 5 | 3, 2, 1, 1, 1, 1, 1, 1
 *   wix     22            | 3, 1, 1, 1, 1
 *   dsgvo   13, 6, 4, 3   | 2, 2, 1, 1, 1
 * Links vom Strich stehen die Beiträge, die davon HANDELN, rechts die,
 * die es erwähnen. Deshalb: zählen, und alles unter einem Viertel des
 * besten Treffers wegwerfen.
 */

/**
 * Macht aus Text etwas Vergleichbares: Kleinschreibung, Umlaute
 * ausgeschrieben, Satzzeichen und Bindestriche zu Leerzeichen.
 *
 * Die Umlaut-Faltung ist kein Schönheitsfehler, sondern der Punkt: wer
 * „Waermepower" tippt, soll „Wärmepower" finden und umgekehrt. Und die
 * Bindestriche fallen, damit „Bearbeitungs-System" und
 * „bearbeitungssystem" dasselbe Wort sind — im Deutschen schreibt jeder
 * Zusammensetzungen anders.
 */
export const normalisieren = (text: string): string =>
  text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[-–—/_.,;:!?()„""'»«]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Suchwort → die Wörter, die in den Beiträgen tatsächlich stehen.
 *
 * Diese Tabelle ist nicht Beiwerk, sie ist der Kern. Gemessen an den 21
 * Beiträgen: „bearbeitungssystem" und „redaktionssystem" kommen in
 * keinem einzigen vor — geschrieben steht dort „CMS" (9 Beiträge) und
 * „pflegen" (7). Ohne diese Tabelle liefert die Suche also genau bei
 * dem Wort nichts, mit dem die Idee zu dieser Funktion anfing. Und ein
 * leeres Ergebnis ist schlechter als kein Suchfeld.
 *
 * GERICHTET, nicht gleichbedeutend: links das Wort, das jemand EINGIBT,
 * rechts die Wörter, unter denen es im Bestand steht. „zahnarzt" soll
 * die Praxis-Beiträge finden; dass umgekehrt „praxis" nicht nach
 * Zahnärzten sucht, ist richtig. Der erste Entwurf hatte hier
 * Äquivalenzklassen, und damit traf „zahnarzt" jeden Beitrag, in dem
 * irgendwo „in der Praxis" stand — im Deutschen ein böser falscher
 * Freund.
 *
 * Gewachsen wird diese Tabelle aus Suchanfragen, die nichts finden,
 * nicht aus Vermutungen.
 */
export const SYNONYME: Readonly<Record<string, readonly string[]>> = {
  // Das Werkzeug zum Selbstpflegen. Tammo nennt es CMS, Kunden nennen
  // es alles andere.
  bearbeitungssystem: ['cms', 'pflegen', 'selbst aendern'],
  redaktionssystem: ['cms', 'pflegen'],
  backend: ['cms', 'pflegen'],
  // Stellenanzeigen stehen unter Recruiting.
  stellenanzeige: ['recruiting', 'bewerber'],
  stellenausschreibung: ['recruiting', 'bewerber'],
  fachkraefte: ['recruiting', 'bewerber'],
  // Preise.
  honorar: ['preis', 'kostet'],
  budget: ['preis', 'kostet'],
  // Baukästen.
  baukasten: ['wix', 'squarespace', 'baukasten'],
  jimdo: ['wix', 'squarespace', 'baukasten'],
  wordpress: ['wix', 'squarespace', 'baukasten'],
  // Geschwindigkeit.
  geschwindigkeit: ['ladezeit', 'schnell'],
  performance: ['ladezeit', 'schnell'],
  // Mobil.
  handy: ['mobil', 'smartphone'],
  responsive: ['mobil', 'smartphone'],
  // Branchen, wie Kunden sie nennen. Nur nach innen: „praxis" selbst
  // steht hier NICHT, weil das Wort im Deutschen auch „Erfahrung"
  // heisst und dann überall trifft.
  zahnarzt: ['praxis', 'patienten'],
  arzt: ['praxis', 'patienten'],
  arztpraxis: ['praxis', 'patienten'],
  patient: ['praxis', 'patienten'],
  dachdecker: ['handwerk', 'dach'],
  heizung: ['handwerk', 'heizung'],
  sanitaer: ['handwerk', 'sanitaer'],
  restaurant: ['gastronomie', 'gastro'],
  kneipe: ['gastronomie', 'gastro', 'kneipe'],
  cafe: ['gastronomie', 'gastro'],
  // Auffindbarkeit.
  sichtbarkeit: ['seo', 'google', 'gefunden'],
  ranking: ['seo', 'google'],
  // Formulare und Termine.
  kontaktformular: ['formular', 'anfrage'],
  terminbuchung: ['termin', 'buchung'],
};

/** Ein Suchwort mit den Wörtern, unter denen es im Bestand steht. */
export type Suchwort = { eingabe: string; gesucht: string[] };

/**
 * Zerlegt die Eingabe in Suchwörter und ergänzt jedes um die Wörter,
 * unter denen es im Bestand zu finden ist.
 *
 * Zwei Zeichen sind die Untergrenze, nicht drei: „KI" ist auf diesem
 * Blog ein echter Suchbegriff (ein Beitrag heißt so), und mit drei
 * Zeichen fiel er heraus — die Eingabe wurde zur leeren Wortliste und
 * die Suche zeigte alle 20 Beiträge. Damit „ki" nicht gleichzeitig in
 * „cookie" und „ranking" trifft, gelten für kurze Wörter Wortgrenzen,
 * siehe zaehlen().
 */
export const anfrageZerlegen = (eingabe: string): Suchwort[] =>
  normalisieren(eingabe)
    .split(' ')
    .filter((w) => w.length >= 2)
    .map((wort) => ({
      eingabe: wort,
      gesucht: [wort, ...(SYNONYME[wort] ?? [])],
    }));

/** Ein Beitrag im Suchindex: was durchsucht wird. */
export type Indexeintrag = {
  /** Titel, Teaser und Tags, normalisiert. Ein Treffer hier wiegt schwer. */
  kopf: string;
  /** Der Fließtext, normalisiert. */
  body: string;
};

/**
 * Ab dieser Länge darf ein Suchwort mitten in einem Wort treffen.
 *
 * Darunter muss es ein ganzes Wort sein. Gemessen: „ki" als Teilkette
 * steckt in cookie, ranking, markiert, overkill, booking, kinderwagen,
 * kickoff — 17 der 20 Beiträge, von denen drei wirklich von KI
 * handeln. Ab vier Zeichen kippt es ins Gegenteil, weil deutsche
 * Komposita das gesuchte Wort verstecken: „formular" steht als
 * Kontaktformular, „arzt" als Zahnarzt, „preis" als Preiserhöhung. Wer
 * dort auf Wortgrenzen bestünde, fände genau das nicht, wonach gesucht
 * wird.
 */
const TEILWORT_AB = 4;

/**
 * Wie oft kommt das Wort vor — ganzes Wort bei kurzen, Teilkette bei
 * langen Suchwörtern (siehe TEILWORT_AB).
 */
const zaehlen = (heu: string, nadel: string): number => {
  if (!nadel) return 0;
  if (nadel.length >= TEILWORT_AB) {
    let n = 0;
    let i = heu.indexOf(nadel);
    while (i !== -1) {
      n += 1;
      i = heu.indexOf(nadel, i + nadel.length);
    }
    return n;
  }
  // Der Text ist normalisiert, Wörter sind durch einzelne Leerzeichen
  // getrennt — Wortgrenzen sind also Leerzeichen oder Textanfang/-ende.
  let n = 0;
  for (const _ of heu.split(' ')) if (_ === nadel) n += 1;
  return n;
};

/** Treffer eines Suchworts in einem Beitrag, nach Fundort getrennt. */
type Treffer = { kopf: number; body: number };

const treffer = (eintrag: Indexeintrag, wort: Suchwort): Treffer => {
  let kopf = 0;
  let body = 0;
  for (const gesucht of wort.gesucht) {
    kopf += zaehlen(eintrag.kopf, gesucht);
    body += zaehlen(eintrag.body, gesucht);
  }
  return { kopf, body };
};

/**
 * Gewicht eines Suchworts: wie aussagekräftig es in diesem Bestand ist.
 *
 * log(Beiträge / Beiträge-mit-diesem-Wort) — das klassische Maß. Der
 * Grund, es hier zu brauchen, ist der Gegenstand des Blogs: „website"
 * steht in 20 von 20 Beiträgen, „was", „wie", „zeit", „ich" ebenso.
 * Gemessen sind das genau die Wörter, die eine Anfrage wie „was kostet
 * eine website" auf 12 von 20 Treffern aufblähten. Ihr Gewicht ist
 * damit 0, und übrig bleibt „kostet" (df 12/20) — die Preis-Beiträge.
 *
 * Bei einer Anfrage aus einem einzigen Wort ändert das Gewicht nichts,
 * weil die Schwelle unten ein Verhältnis ist und sich mitskaliert. Es
 * entscheidet nur, welches Wort einer mehrteiligen Anfrage den Ton
 * angibt — und genau da wird es gebraucht.
 */
export const gewicht = (
  index: Readonly<Record<string, Indexeintrag>>,
  wort: Suchwort
): number => {
  const gesamt = Object.keys(index).length;
  if (!gesamt) return 0;
  let drin = 0;
  for (const eintrag of Object.values(index)) {
    const t = treffer(eintrag, wort);
    if (t.kopf || t.body) drin += 1;
  }
  if (!drin) return -1; // Wort kommt nirgends vor
  return Math.log(gesamt / drin);
};

/** Punkte eines Beitrags für ein Suchwort, Titeltreffer zehnfach. */
export const punkte = (
  eintrag: Indexeintrag,
  wort: Suchwort,
  wortgewicht: number
): number => {
  const t = treffer(eintrag, wort);
  return wortgewicht * (10 * t.kopf + t.body);
};

/**
 * Anteil des besten Treffers, unter dem ein Beitrag wegfällt.
 *
 * Gemessen an den Verteilungen oben trennt ein Viertel die Beiträge,
 * die von einem Thema HANDELN, von denen, die es im Vorbeigehen
 * erwähnen: bei „wix" bleibt der eine Beitrag mit 22 Treffern, die fünf
 * mit einem fallen weg. Ohne diese Grenze wären es sechs Ergebnisse,
 * von denen fünf nicht weiterhelfen.
 */
export const ANTEIL = 0.25;

/**
 * Welche Beiträge passen zur Anfrage?
 *
 * Drei Hürden, jede gegen einen gemessenen Fehlschlag:
 *   1. Jedes aussagekräftige Wort muss vorkommen (zwischen den Wörtern
 *      gilt „und"). Wörter mit Gewicht 0 stehen in jedem Beitrag und
 *      dürfen deshalb keinen ausschließen.
 *   2. Ein Beitrag muss das Thema wirklich anfassen: im Titel genannt
 *      oder mindestens zweimal im Text. Sonst käme bei „ladezeit", das
 *      kein Beitrag zum Thema hat, der ganze Bestand mit je einer
 *      Erwähnung zurück.
 *   3. Wer unter einem Viertel des besten Treffers liegt, fällt weg.
 *
 * Zurück kommt eine Menge von Slugs — das Skript blendet die
 * vorhandenen Karten ein und aus und lässt ihre Reihenfolge, damit der
 * hervorgehobene Beitrag oben nicht aus dem Raster springt.
 */
export const suchen = (
  index: Readonly<Record<string, Indexeintrag>>,
  eingabe: string
): Set<string> => {
  const alle = new Set(Object.keys(index));
  const woerter = anfrageZerlegen(eingabe);
  if (!woerter.length) return alle;

  const gewichtet: { wort: Suchwort; gewicht: number }[] = [];
  for (const wort of woerter) {
    const g = gewicht(index, wort);
    if (g < 0) return new Set(); // ein Wort kommt nirgends vor
    if (g > 0) gewichtet.push({ wort, gewicht: g });
  }
  // Nur Wörter, die überall stehen: „website" auf einem Website-Blog.
  // Dann ist jeder Beitrag eine ehrliche Antwort.
  if (!gewichtet.length) return alle;

  const bewertet: [string, number][] = [];
  for (const [slug, eintrag] of Object.entries(index)) {
    let summe = 0;
    let alleDa = true;
    let handeltDavon = false;
    for (const { wort, gewicht: g } of gewichtet) {
      const t = treffer(eintrag, wort);
      if (!t.kopf && !t.body) {
        alleDa = false;
        break;
      }
      if (t.kopf > 0 || t.body >= 2) handeltDavon = true;
      summe += g * (10 * t.kopf + t.body);
    }
    if (alleDa && handeltDavon) bewertet.push([slug, summe]);
  }
  if (!bewertet.length) return new Set();

  const beste = Math.max(...bewertet.map(([, p]) => p));
  return new Set(bewertet.filter(([, p]) => p >= beste * ANTEIL).map(([slug]) => slug));
};
