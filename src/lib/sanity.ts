/**
 * Sanity Read-Client + Journal-Queries.
 *
 * Studio (eingebettet unter /admin) schreibt in Sanity, Astro liest zur
 * Build-Zeit via diesem Client (getStaticPaths in /journal/[slug].astro).
 *
 * useCdn:true = schneller + gecached. Fuer Journal-Content passt das —
 * neue Posts werden ueber den Sanity→Vercel Deploy-Hook eh mit einem
 * kompletten Rebuild live gebracht, da ist kein Bedarf fuer noCdn.
 *
 * SANITY_READ_TOKEN ist optional. Wird nur gebraucht wenn das Dataset
 * auf "Private" steht. Fuer "Public" reicht der Client ohne Token.
 */
import { createClient, type SanityImageAssetDocument } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  useCdn: true,
  token: import.meta.env.SANITY_READ_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: Parameters<typeof builder.image>[0]) =>
  builder.image(source);

// --- Types ---

export type SanityImage = {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
};

export type JournalPostSummary = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  coverImage: SanityImage;
  author?: string;
  tags?: string[];
};

export type JournalPost = JournalPostSummary & {
  body: any[]; // Portable Text blocks — beliebige Struktur
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImage;
};

// --- Queries ---

/**
 * Alle veröffentlichten Journal-Beiträge, neueste zuerst.
 * publishedAt in der Zukunft = Draft, wird gefiltert.
 */
export const getJournalPosts = async (): Promise<JournalPostSummary[]> =>
  sanityClient.fetch(
    `*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      coverImage,
      author,
      tags
    }`
  );

/**
 * Einzelner Journal-Beitrag inkl. Body (Portable Text) + SEO-Felder.
 * Return null wenn Slug nicht existiert oder Datum in der Zukunft.
 */
export const getJournalPost = async (slug: string): Promise<JournalPost | null> =>
  sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      coverImage,
      author,
      tags,
      body,
      seoTitle,
      seoDescription,
      ogImage
    }`,
    { slug }
  );

// --- Helpers ---

/**
 * Deutsche Datumsformatierung fuer Journal-Karten + Detail-Header.
 * "15. Juli 2026" statt "15.07.2026" — matcht editorial Tonfall.
 */
export const formatJournalDate = (iso: string): string => {
  try {
    return new Date(iso).toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};

/**
 * Extrahiert Plain-Text aus einem Portable-Text-Block fuer TOC + Word-Count.
 * Ignoriert Marks/Annotations — nur .text der children.
 */
export const blockToPlainText = (block: any): string => {
  if (!block?.children) return '';
  return block.children
    .filter((c: any) => c._type === 'span')
    .map((c: any) => c.text || '')
    .join('');
};

/**
 * Grobe Wort-Zaehlung ueber alle Text-Blocks im Body. Bilder + Code
 * werden nicht gezaehlt.
 */
export const countWords = (body: any[]): number => {
  if (!Array.isArray(body)) return 0;
  return body
    .filter((b) => b._type === 'block')
    .map(blockToPlainText)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
};

/**
 * Extrahiert H2-Blocks fuer die Table-of-Contents-Sidebar.
 * ID = URL-safe Slug aus dem H2-Text.
 */
export type TocItem = { id: string; text: string };
export const extractToc = (body: any[]): TocItem[] => {
  if (!Array.isArray(body)) return [];
  return body
    .filter((b) => b._type === 'block' && b.style === 'h2')
    .map((b) => {
      const text = blockToPlainText(b);
      return { id: slugifyHeading(text), text };
    })
    .filter((item) => item.text && item.id);
};

/**
 * URL-safer Slug aus einem Heading-Text — deckungsgleich mit dem was der
 * Portable-Text-Renderer als id auf <h2> setzt, damit die TOC-Links
 * scrollen.
 */
export const slugifyHeading = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
