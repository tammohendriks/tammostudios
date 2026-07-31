/**
 * Markdown → Portable-Text Konverter.
 *
 * Parse'd Markdown via `marked.lexer` und mapped die Tokens direkt auf
 * Sanity Portable-Text Blocks. Kein Umweg ueber HTML/DOM.
 *
 * Unterstuetzte Marked-Tokens:
 *   heading      → block style h2/h3 (h1 im MD-Body → h2 in PT, weil die
 *                  Post-H1 vom Frontmatter kommt und die Page als H1
 *                  rendert; body sollte nicht mit einer weiteren H1
 *                  konkurrieren)
 *   paragraph    → block style normal
 *   blockquote   → block style blockquote (inner paragraphs geflattet;
 *                  Nicht-Paragraphen im Blockquote warnen + skippen)
 *   code         → codeBlock object mit Language-Whitelist aus constants.js
 *   list         → block per item mit listItem: 'bullet'|'number';
 *                  nested lists werden mit Warning geskippt
 *   hr/html      → skip mit Warning
 *   space/def    → silent skip
 *
 * Unterstuetzte Inline-Tokens:
 *   text/escape  → span
 *   strong/em    → span mit decorator marks
 *   codespan     → span mit 'code' decorator
 *   link         → span mit markDef reference (Annotation) — nur https/http/
 *                  mailto/tel + root-relative URLs werden akzeptiert
 *                  (allowlist gegen javascript:/data:/vbscript:)
 *   br           → skip (Portable Text hat keinen echten soft-break)
 *
 * Alle Blocks + markDefs bekommen einen _key (Sanity braucht die fuer
 * Array-Reconciliation im Studio, sonst warnungen im Diff-View).
 */
import { randomUUID } from 'node:crypto';
import { normalizeCodeLanguage } from '../../sanity/schemaTypes/constants.js';

const key = () => randomUUID().replace(/-/g, '').slice(0, 12);

const HEADING_MAP = {
  1: 'h2', // MD-H1 → PT-H2 (siehe Kommentar oben)
  2: 'h2',
  3: 'h3',
  4: 'normal',
  5: 'normal',
  6: 'normal',
};

/**
 * Link-Href-Allowlist. Alles ausser diesen Schemes + root-relative Pfaden
 * wird als Annotation gedroppt (children bleiben als plain text bestehen).
 * Verhindert javascript:/data:/vbscript: URLs vor dem Sanity-Upload.
 */
const isSafeLinkHref = (href) => {
  if (typeof href !== 'string' || href.length === 0) return false;
  if (href.startsWith('/')) return true; // root-relative
  const lower = href.toLowerCase();
  return (
    lower.startsWith('http://') ||
    lower.startsWith('https://') ||
    lower.startsWith('mailto:') ||
    lower.startsWith('tel:')
  );
};

/**
 * Rekursive Sammlung von Inline-Children + Annotations.
 * marks: Array von decorator-Strings ODER markDef-Keys (fuer Link-Annotations).
 * markDefs: Wird beim Descent gefuellt.
 */
const collectChildren = (tokens, marks, markDefs) => {
  const children = [];
  for (const t of tokens ?? []) {
    if (t.type === 'text' || t.type === 'escape') {
      // marked liefert bei nested tokens sowohl t.text als auch t.tokens.
      // Wenn t.tokens existiert und mehr enthaelt als nur einen text-token,
      // gehen wir rekursiv rein (fuer Sachen wie {text}{link}{text} in einem
      // Paragraph).
      if (t.tokens && t.tokens.length > 0) {
        children.push(...collectChildren(t.tokens, marks, markDefs));
      } else {
        children.push({
          _type: 'span',
          _key: key(),
          text: t.text ?? '',
          marks,
        });
      }
    } else if (t.type === 'strong') {
      children.push(...collectChildren(t.tokens, [...marks, 'strong'], markDefs));
    } else if (t.type === 'em') {
      children.push(...collectChildren(t.tokens, [...marks, 'em'], markDefs));
    } else if (t.type === 'codespan') {
      children.push({
        _type: 'span',
        _key: key(),
        text: t.text ?? '',
        marks: [...marks, 'code'],
      });
    } else if (t.type === 'link') {
      if (!isSafeLinkHref(t.href)) {
        // Unsafe href → als plain-text ohne Annotation weiterreichen.
        // Kein javascript:/data: URL landet je in Sanity.
        console.warn(
          `  ⚠  Link mit unerlaubtem Schema geskippt (bleibt als Text): ${t.href}`
        );
        children.push(...collectChildren(t.tokens, marks, markDefs));
      } else {
        const linkKey = key();
        markDefs.push({
          _type: 'link',
          _key: linkKey,
          href: t.href,
        });
        children.push(...collectChildren(t.tokens, [...marks, linkKey], markDefs));
      }
    } else if (t.type === 'br') {
      // skip — Portable Text hat keinen echten soft-break
    } else if (t.type === 'image') {
      // Inline-Images im Fluesstext sind selten. Fuer MVP: skip mit Warnung.
      // Block-level Images wuerden ein separates PT-Objekt brauchen mit Upload.
      // Kann spaeter erweitert werden falls Bedarf.
      console.warn(`  ⚠  Inline-Image ignoriert: ${t.href} (block-images noch nicht supported)`);
    }
  }
  return children;
};

/**
 * Erzeugt einen block-Token aus inline-tokens + Style. Optional listItem
 * fuer bullet/numbered lists.
 */
const paragraphBlock = (inlineTokens, style = 'normal', listItem = null) => {
  const markDefs = [];
  const children = collectChildren(inlineTokens, [], markDefs);
  const block = {
    _type: 'block',
    _key: key(),
    style,
    markDefs,
    children,
  };
  if (listItem) {
    block.listItem = listItem;
    block.level = 1;
  }
  return block;
};

/**
 * Extrahiert die inline-tokens aus einem list-item. marked liefert das
 * Item entweder als paragraph-token (loose lists) oder als text-token mit
 * eigenen tokens (tight lists) — beide Faelle abfangen.
 * Warnt bei nested lists — Portable Text supported nesting via level:
 * aber MVP behandelt nur flat lists.
 */
const listItemTokens = (item) => {
  if (!item.tokens || item.tokens.length === 0) return [];

  // Nested-List Detection: warnen wenn irgendein child ein list-token ist
  for (const child of item.tokens) {
    if (child.type === 'list') {
      const preview = (item.raw ?? '').split('\n')[0].slice(0, 60);
      console.warn(
        `  ⚠  Verschachtelte Liste geskippt (nur oberste Ebene wird konvertiert): ${preview}…`
      );
      break;
    }
  }

  const first = item.tokens[0];
  if (first.type === 'paragraph' || first.type === 'text') {
    return first.tokens ?? [];
  }
  return item.tokens.filter((c) => c.type !== 'list');
};

/**
 * Hauptkonverter: marked-tokens Array → Sanity Portable-Text Blocks Array.
 */
export const tokensToBlocks = (tokens) => {
  const blocks = [];
  for (const t of tokens ?? []) {
    if (t.type === 'heading') {
      const style = HEADING_MAP[t.depth] ?? 'normal';
      blocks.push(paragraphBlock(t.tokens, style));
    } else if (t.type === 'paragraph') {
      blocks.push(paragraphBlock(t.tokens));
    } else if (t.type === 'blockquote') {
      // blockquote hat inner block-tokens; wir flatten paragraphs.
      // Non-paragraph content (nested lists, code) wird geskippt mit Warnung.
      for (const inner of t.tokens ?? []) {
        if (inner.type === 'paragraph') {
          blocks.push(paragraphBlock(inner.tokens, 'blockquote'));
        } else if (inner.type !== 'space') {
          console.warn(
            `  ⚠  Blockquote-Inhalt Typ '${inner.type}' geskippt (nur Paragraphen supported)`
          );
        }
      }
    } else if (t.type === 'code') {
      blocks.push({
        _type: 'codeBlock',
        _key: key(),
        language: normalizeCodeLanguage(t.lang),
        code: t.text ?? '',
      });
    } else if (t.type === 'list') {
      const listItem = t.ordered ? 'number' : 'bullet';
      for (const item of t.items ?? []) {
        blocks.push(paragraphBlock(listItemTokens(item), 'normal', listItem));
      }
    } else if (t.type === 'hr') {
      console.warn(`  ⚠  Horizontal Rule (---) geskippt`);
    } else if (t.type === 'html') {
      const preview = (t.raw ?? '').slice(0, 60).replace(/\n/g, ' ');
      console.warn(`  ⚠  HTML-Block geskippt: ${preview}…`);
    } else if (t.type === 'space' || t.type === 'def') {
      // silent skip
    } else {
      console.warn(`  ⚠  Unbekannter block-token type: ${t.type} (uebersprungen)`);
    }
  }
  return blocks;
};
