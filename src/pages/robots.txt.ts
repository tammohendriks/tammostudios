import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const allowIndexing = import.meta.env.PUBLIC_ALLOW_INDEXING === 'true';

  const body = allowIndexing
    ? [
        'User-agent: *',
        'Allow: /',
        site ? `Sitemap: ${new URL('sitemap-index.xml', site).toString()}` : '',
      ]
        .filter(Boolean)
        .join('\n')
    : ['User-agent: *', 'Disallow: /'].join('\n');

  return new Response(body + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
