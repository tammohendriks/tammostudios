import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  // Default ist Allow: nur ein explizites PUBLIC_ALLOW_INDEXING="false"
  // blockt Crawling. Schützt Production gegen Env-Var-Fehlkonfiguration —
  // wenn die Variable verschwindet oder ungesetzt ist, indexiert Google
  // weiter. Preview-Deploys können explizit "false" setzen.
  const allowIndexing = import.meta.env.PUBLIC_ALLOW_INDEXING !== 'false';

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
