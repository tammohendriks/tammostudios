/**
 * Sanity Read-Client fuer Astro-Pages (server-side rendering von Journal-
 * Content). Studio schreibt via /admin, Astro liest via diesem Client.
 *
 * useCdn: true = schneller, gecached (~1min stale). Fuer Journal-Content
 * total OK. Falls Preview-Mode gebraucht wird (Draft-Previews vor
 * publish), separaten Client mit useCdn:false + Token bauen.
 */
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: Parameters<typeof builder.image>[0]) =>
  builder.image(source);

// --- Journal Queries ---

export type JournalPostSummary = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  heroImage?: { asset: { _ref: string }; alt?: string };
  tags?: string[];
};

export type JournalPost = JournalPostSummary & {
  body: unknown[];
};

/**
 * Listet alle veröffentlichten Journal-Beiträge, neueste zuerst.
 * Filtert Drafts (publishedAt in der Zukunft) automatisch raus.
 */
export const getJournalPosts = async (): Promise<JournalPostSummary[]> =>
  sanityClient.fetch(
    `*[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      heroImage,
      tags
    }`
  );

/**
 * Einzelner Journal-Beitrag inkl. Body (Portable Text).
 */
export const getJournalPost = async (slug: string): Promise<JournalPost | null> =>
  sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      heroImage,
      tags,
      body
    }`,
    { slug }
  );
