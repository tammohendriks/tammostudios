/**
 * Welche Journal-Beiträge gehören zusammen?
 *
 * Gerechnet beim Build, nicht gepflegt. Der Grund steht in den Zahlen:
 * von 46 Verweisen zwischen den Beiträgen zeigen 38 auf /kontakt oder
 * /preisrechner — rund einer von jeder Sorte pro Beitrag. Das ist kein
 * Versehen, das ist eine Vorlage: jeder Beitrag behandelt den Leser als
 * jemanden, der gleich kaufen will. 16 der 20 verlinken keinen einzigen
 * anderen Beitrag. Wer unten ankommt, hat genau einen Weg, und der
 * führt aus dem Journal heraus.
 *
 * Von Hand ließe sich das pflegen, aber dann wäre es bei jedem neuen
 * Beitrag wieder veraltet — und veraltete Verweise sind schlimmer als
 * keine. Also gerechnet.
 *
 * WIE: jeder Beitrag wird ein Vektor aus seinen Wörtern, jedes Wort
 * gewichtet nach tf-idf — wie oft es hier steht, geteilt durch die
 * Allgegenwart im Bestand. Die Ähnlichkeit zweier Beiträge ist der
 * Kosinus zwischen ihren Vektoren. Dasselbe Prinzip wie in der Suche,
 * und aus demselben Grund: „website" steht in 20 von 20 Beiträgen und
 * darf deshalb nichts zur Ähnlichkeit beitragen.
 *
 * Die Tags gehen als zusätzliche Begriffe in denselben Vektor, nur
 * schwerer gezählt. Damit fällt „Prozess" (20/20 Beiträge, Gewicht 0)
 * von selbst heraus, während ein geteiltes „Recruiting" (1/20) zählt —
 * ohne dass irgendwo eine Liste auszunehmender Tags gepflegt werden
 * muss.
 */
import { normalisieren } from './journalSuche.ts';

/** Ein Beitrag, wie ihn die Berechnung braucht. */
export type VerwandtEingabe = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  volltext: string;
};

/**
 * Wie oft ein Tag in den Vektor geschrieben wird.
 *
 * Gemessen an den 20 Beiträgen ist die Reihenfolge zwischen 12 und 50
 * praktisch dieselbe — die Normierung auf Vektorlänge gleicht den Wert
 * wieder aus. 25 ist die Mitte dieses stabilen Bereichs und entspricht
 * grob einem Wort, das in einem Beitrag zwanzigmal vorkommt: ein
 * geteilter Tag wiegt damit ungefähr so viel wie ein geteiltes starkes
 * Thema. Bei 3 war der Tag zu leise — dann schlug „dsgvo-praxis" dem
 * Leser als dritten Beitrag die Tool-Liste vor statt der Praxis.
 */
const TAG_GEWICHT = 25;

/**
 * Wortlänge, ab der ein Wort in den Vektor darf. Kürzere sind im
 * Deutschen fast nur Funktionswörter („und", „der", „ist"); die
 * stehen ohnehin überall und bekämen durch idf das Gewicht 0, kosten
 * aber Rechenzeit und Speicher.
 */
const MINDESTLAENGE = 4;

const begriffe = (b: VerwandtEingabe): string[] => {
  const text = normalisieren([b.title, b.excerpt, b.volltext].join(' '));
  const liste = text.split(' ').filter((w) => w.length >= MINDESTLAENGE);
  for (const tag of b.tags) {
    const marke = 'tag:' + normalisieren(tag);
    for (let i = 0; i < TAG_GEWICHT; i += 1) liste.push(marke);
  }
  return liste;
};

/**
 * Zu jedem Slug die ähnlichsten anderen Beiträge, der ähnlichste zuerst.
 *
 * Bei weniger als zwei Beiträgen kommt für jeden eine leere Liste —
 * dann gibt es schlicht nichts zu verweisen, und der Aufrufer blendet
 * den Abschnitt aus.
 */
export const verwandteBerechnen = (
  beitraege: readonly VerwandtEingabe[],
  anzahl = 3
): Record<string, string[]> => {
  const n = beitraege.length;
  const ergebnis: Record<string, string[]> = {};
  if (n < 2) {
    for (const b of beitraege) ergebnis[b.slug] = [];
    return ergebnis;
  }

  // Häufigkeit je Beitrag und Dokumenthäufigkeit je Wort.
  const haeufig = new Map<string, Map<string, number>>();
  const dokumente = new Map<string, number>();
  for (const b of beitraege) {
    const zaehler = new Map<string, number>();
    for (const wort of begriffe(b)) zaehler.set(wort, (zaehler.get(wort) ?? 0) + 1);
    haeufig.set(b.slug, zaehler);
    for (const wort of zaehler.keys()) dokumente.set(wort, (dokumente.get(wort) ?? 0) + 1);
  }

  // tf-idf, auf Länge 1 normiert — dann ist das Skalarprodukt zweier
  // Vektoren direkt der Kosinus, ohne jedes Mal zu teilen.
  const vektoren = new Map<string, Map<string, number>>();
  for (const b of beitraege) {
    const vektor = new Map<string, number>();
    let laenge = 0;
    for (const [wort, mal] of haeufig.get(b.slug) ?? []) {
      const df = dokumente.get(wort) ?? 0;
      if (df === n) continue; // steht in jedem Beitrag, sagt nichts
      const g = (1 + Math.log(mal)) * Math.log(n / df);
      vektor.set(wort, g);
      laenge += g * g;
    }
    laenge = Math.sqrt(laenge) || 1;
    for (const [wort, g] of vektor) vektor.set(wort, g / laenge);
    vektoren.set(b.slug, vektor);
  }

  /** Je Beitrag alle anderen, der ähnlichste zuerst. */
  const rangliste = new Map<string, [string, number][]>();
  for (const b of beitraege) {
    const eigen = vektoren.get(b.slug);
    if (!eigen) continue;
    const bewertet: [string, number][] = [];
    for (const andere of beitraege) {
      if (andere.slug === b.slug) continue;
      const fremd = vektoren.get(andere.slug);
      if (!fremd) continue;
      let summe = 0;
      // Über den kürzeren Vektor laufen: das Ergebnis ist dasselbe,
      // die Arbeit weniger.
      const [klein, gross] = eigen.size <= fremd.size ? [eigen, fremd] : [fremd, eigen];
      for (const [wort, g] of klein) {
        const h = gross.get(wort);
        if (h) summe += g * h;
      }
      if (summe > 0) bewertet.push([andere.slug, summe]);
    }
    bewertet.sort((x, y) => y[1] - x[1]);
    rangliste.set(b.slug, bewertet);
    ergebnis[b.slug] = bewertet.slice(0, anzahl).map(([slug]) => slug);
  }

  // --- Niemanden stehen lassen ---
  //
  // Die Ähnlichkeit ist nicht gegenseitig: ein Beitrag kann drei andere
  // verlinken und selbst in keiner einzigen Liste auftauchen. Gemessen
  // trifft das recruiting-mit-website — das einzige Stück zum Thema,
  // also niemandes nächster Nachbar. Ein Beitrag, den nur die Übersicht
  // erreicht, ist für Suchmaschinen so gut wie unverbunden, und genau
  // das sollte dieser Abschnitt ja beheben.
  //
  // Also: wer keinen eingehenden Verweis hat, wird bei seinem eigenen
  // nächsten Nachbarn eingesetzt — dort, wo er am wenigsten fremd
  // wirkt. Verdrängt wird nur jemand, der noch woanders verlinkt ist;
  // sonst wäre das Loch nur verschoben.
  const eingehend = new Map<string, number>();
  for (const b of beitraege) eingehend.set(b.slug, 0);
  for (const liste of Object.values(ergebnis)) {
    for (const ziel of liste) eingehend.set(ziel, (eingehend.get(ziel) ?? 0) + 1);
  }

  // Nach Slug sortiert, damit zwei Builds aus denselben Daten dieselbe
  // Seite ergeben — sonst wackelt bei jedem Deploy die Verweisstruktur.
  const verwaist = beitraege
    .map((b) => b.slug)
    .filter((slug) => (eingehend.get(slug) ?? 0) === 0)
    .sort();

  for (const allein of verwaist) {
    for (const [gastgeber] of rangliste.get(allein) ?? []) {
      const liste = ergebnis[gastgeber];
      if (!liste || liste.includes(allein)) continue;
      // Von hinten, also beim unähnlichsten Eintrag anfangen.
      const platz = liste
        .map((ziel, i) => [ziel, i] as const)
        .reverse()
        .find(([ziel]) => (eingehend.get(ziel) ?? 0) > 1);
      if (!platz) continue;
      const [weicht, i] = platz;
      eingehend.set(weicht, (eingehend.get(weicht) ?? 1) - 1);
      liste[i] = allein;
      eingehend.set(allein, 1);
      break;
    }
  }

  return ergebnis;
};
