/**
 * RSS-Feed fuer das Journal.
 *
 * Wird beim Build regeneriert, alle publishedAt <= now Posts landen drin.
 * Deep-Link im <head> von /journal/index.astro sagt Browsern und Reader-
 * Apps wo der Feed liegt.
 */
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE } from '../../lib/constants';
import { getJournalPosts } from '../../lib/sanity';

export const GET: APIRoute = async (context) => {
  const posts = await getJournalPosts();
  return rss({
    title: `${SITE.name} Journal`,
    description: 'Gedanken über Webdesign, Preise, Prozess — Tammo Studios aus Bremen.',
    site: context.site ?? SITE.url,
    items: posts.map((p) => ({
      title: p.title,
      link: `/journal/${p.slug}`,
      description: p.excerpt,
      pubDate: new Date(p.publishedAt),
      author: p.author || 'Tammo Hendriks',
    })),
    stylesheet: false,
    customData: `<language>de-de</language>`,
  });
};
