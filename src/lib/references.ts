export const REFERENCES = [
  {
    slug: 'samedos',
    title: 'Samedos',
    subtitle: 'Arbeitsmedizinische Praxis',
    url: 'https://www.samedos.de',
    /**
     * Der Journal-Beitrag, der DIESES Projekt beschreibt.
     *
     * Der Verweis wird nur gesetzt, wenn es den Beitrag wirklich
     * gibt — geprueft beim Bauen gegen die veroeffentlichten
     * Beitraege. Ein fester Link waere sonst zweierlei: eine 404 fuer
     * Besucher und ein Abbruch im Build (journal-verweis-guard).
     * Sobald der Beitrag live geht, erscheint er von selbst.
     */
    fallstudie: 'praxis-websites-samedos-ibi',
    preview: '/referenzen/samedoswebsite.webp',
    tags: ['Astro', 'Tailwind', 'Sanity', 'Vercel'],
    category: 'Medizin',
  },
  {
    slug: 'er-und-sie',
    title: 'Er & Sie',
    subtitle: 'Eckkneipe in Bremen Walle',
    url: 'https://erundsiebremen.de',
    preview: '/referenzen/erundsiewebsite.webp',
    tags: ['Astro', 'Tailwind', 'Sanity', 'Vercel'],
    category: 'Gastronomie',
  },
  {
    slug: 'waermepower',
    title: 'Wärmepower',
    subtitle: 'Heizung, Wärmepumpe, Sanitär',
    url: 'https://waermepower.de',
    preview: '/referenzen/waermepowerwebsite.webp',
    tags: ['Astro', 'Tailwind', 'Sanity', 'Vercel'],
    category: 'Handwerk',
  },
  {
    slug: 'ibi-doc',
    title: 'Institut für Betriebsmedizin Isernhagen',
    shortTitle: 'Institut Betriebsmedizin Isernhagen',
    subtitle: 'Betriebsmedizinische Praxis',
    url: 'https://www.ibi-doc.de',
    // Derselbe Beitrag: er stellt beide Praxen gegenueber.
    fallstudie: 'praxis-websites-samedos-ibi',
    preview: '/referenzen/ibi.webp',
    tags: ['Astro', 'Tailwind', 'Sanity', 'Vercel'],
    category: 'Medizin',
  },
  {
    slug: 'graefe-media',
    title: 'Gräfe Media',
    subtitle: 'Mediengestaltung aus Bremen',
    url: 'https://graefemedia.de',
    preview: '/referenzen/graefe-media.webp',
    tags: ['Astro', 'Tailwind', 'Sanity', 'Vercel'],
    category: 'Medien',
  },
  {
    slug: 'kirsch-dach-fassade',
    title: 'Kirsch Dach & Fassade',
    subtitle: 'Dach & Fassade in Bremen',
    url: 'https://kirsch-dach-fassade.de',
    preview: '/referenzen/kirsch-dach-fassade.webp',
    tags: ['Astro', 'Tailwind', 'Sanity', 'Vercel'],
    category: 'Handwerk',
  },
] as const;

/**
 * Welche Fallstudien es WIRKLICH gibt.
 *
 * Die Referenzen oben benennen Journal-Beitraege, die zum Zeitpunkt
 * des Eintrags noch unveroeffentlicht sein koennen. Diese Funktion
 * gleicht beim Bauen gegen die veroeffentlichten Beitraege ab und
 * liefert nur die, die auch erreichbar sind. Ein fester Verweis waere
 * sonst eine 404 fuer Besucher und ein Abbruch im Build
 * (journal-verweis-guard in astro.config.mjs).
 *
 * NUR AUF DEUTSCH: das Journal gibt es nicht auf Englisch. Ein Knopf
 * „Read the case study", der in einen deutschen Text fuehrt, waere
 * eine Falle — deshalb bleibt er auf den englischen Fassungen aus.
 */
export const fallstudienPfade = async (
  locale: 'de' | 'en'
): Promise<Record<string, string>> => {
  if (locale !== 'de') return {};

  const gesucht = new Set<string>();
  for (const r of REFERENCES) {
    const f = (r as { fallstudie?: string }).fallstudie;
    if (f) gesucht.add(f);
  }
  if (!gesucht.size) return {};

  try {
    const { getJournalPosts } = await import('./sanity');
    const posts = await getJournalPosts();
    const da = new Set(posts.map((p) => p.slug));
    const raus: Record<string, string> = {};
    for (const slug of gesucht) {
      if (da.has(slug)) raus[slug] = `/journal/${slug}`;
    }
    return raus;
  } catch {
    // Sanity nicht erreichbar: lieber keine Verweise als ein
    // fehlgeschlagener Build.
    return {};
  }
};
