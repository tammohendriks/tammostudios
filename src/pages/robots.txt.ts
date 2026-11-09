import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  // Default Allow: nur ein explizites PUBLIC_ALLOW_INDEXING="false"
  // blockt Crawling. Schützt Production gegen Env-Var-Fehlkonfiguration —
  // wenn die Variable verschwindet oder ungesetzt ist, indexiert Google
  // weiter. Preview-Deploys können explizit "false" setzen.
  //
  // STOLPERSTELLE: die Variable steuert nicht nur diese Datei, sondern
  // auch das noindex-Meta auf JEDER Seite (BaseLayout). Steht sie in
  // einer lokalen .env auf "false", trägt der daraus gebaute dist/
  // Disallow UND noindex. Niemals von einem solchen Build deployen.
  //
  // Hier steht bewusst nur eine Gruppe für alle. Benannte Gruppen für
  // einzelne KI-Crawler wären ein Eigentor: nach der Robots-Spec gelten
  // für einen Bot mit eigener Gruppe ausschließlich deren Regeln, die
  // "*"-Gruppe wird dann NICHT mehr zusätzlich angewendet. Eine aus
  // einem Blog kopierte Liste macht eine Seite so unbeabsichtigt für
  // genau die Systeme unsichtbar, in denen sie vorkommen soll.
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
