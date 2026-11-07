import type { APIRoute } from 'astro';
import { llmsTxt } from '../lib/llms';

/**
 * /llms.txt — die deutsche Fassung. Aufbau, Begruendung und die
 * ehrliche Erwartungshaltung stehen in src/lib/llms.ts.
 *
 * Content-Type bewusst text/plain: die Spezifikation sagt dazu
 * nichts, und text/markdown ist bei einigen Abnehmern berichtet
 * fehlgeschlagen. Eine .txt, die als Text ausgeliefert wird, liest
 * jeder.
 */
export const GET: APIRoute = async () =>
  new Response(await llmsTxt('de'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
