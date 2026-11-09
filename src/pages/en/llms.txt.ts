import type { APIRoute } from 'astro';
import { llmsTxt } from '../../lib/llms';

/**
 * /en/llms.txt — die englische Fassung, mit ausschliesslich
 * englischen URLs.
 *
 * Eigener Pfad statt einer erfundenen Sprach-Syntax in einer Datei:
 * die Spezifikation (v2) sieht genau das vor — eine llms.txt unter
 * einem Pfad gilt fuer die Seiten darunter, die spezifischste
 * gewinnt.
 */
export const GET: APIRoute = async () =>
  new Response(await llmsTxt('en'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
