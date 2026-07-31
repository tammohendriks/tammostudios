/**
 * Portable-Text → HTML Renderer fuer Journal-Beitraege.
 *
 * Custom serializer die Sanity-Blocks in unser Design-System uebersetzt:
 * - Bilder: <figure> mit Alt + lazy load, urlFor liefert optimierte Groesse
 * - Code-Blocks: <pre><code> mit data-lang Attribut fuer optionales
 *   Styling per Sprache
 * - Links: Rel-Handling (external → target=_blank + noopener)
 * - H2/H3: id-Attribut fuer TOC-Anchor-Links (deckungsgleich mit
 *   slugifyHeading in sanity.ts)
 * - Inline-Code decorator: <code class="inline-code">
 *
 * Rendered als HTML-String via set:html in /journal/[slug].astro. Kein
 * React noetig auf der Lese-Seite.
 */
import { toHTML, type PortableTextHtmlComponents } from '@portabletext/to-html';
import { urlFor, slugifyHeading, blockToPlainText } from './sanity';

const escapeHtml = (str: unknown): string =>
  String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const components: Partial<PortableTextHtmlComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return '';
      const url = urlFor(value).width(1400).auto('format').url();
      const alt = escapeHtml(value.alt || '');
      return `<figure class="post-figure"><img src="${url}" alt="${alt}" loading="lazy" decoding="async" /></figure>`;
    },
    codeBlock: ({ value }) => {
      const lang = escapeHtml(value?.language || 'text');
      const code = escapeHtml(value?.code || '');
      return `<pre class="post-code" data-lang="${lang}"><code>${code}</code></pre>`;
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || '#';
      const isExternal = /^https?:\/\//.test(href);
      const rel = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a class="post-link" href="${escapeHtml(href)}"${rel}>${children}</a>`;
    },
    code: ({ children }) => `<code class="inline-code">${children}</code>`,
    strong: ({ children }) => `<strong>${children}</strong>`,
    em: ({ children }) => `<em>${children}</em>`,
  },
  block: {
    normal: ({ children }) => `<p>${children}</p>`,
    h2: ({ children, value }) => {
      const id = slugifyHeading(blockToPlainText(value));
      return `<h2 id="${id}">${children}</h2>`;
    },
    h3: ({ children, value }) => {
      const id = slugifyHeading(blockToPlainText(value));
      return `<h3 id="${id}">${children}</h3>`;
    },
    blockquote: ({ children }) => `<blockquote class="post-quote">${children}</blockquote>`,
  },
  list: {
    bullet: ({ children }) => `<ul class="post-list">${children}</ul>`,
    number: ({ children }) => `<ol class="post-list post-list-numbered">${children}</ol>`,
  },
  listItem: {
    bullet: ({ children }) => `<li>${children}</li>`,
    number: ({ children }) => `<li>${children}</li>`,
  },
};

export const renderPortableText = (blocks: any[]): string => {
  if (!Array.isArray(blocks) || blocks.length === 0) return '';
  return toHTML(blocks, { components });
};
