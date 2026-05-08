/**
 * One-shot OG-image generator.
 *
 * Renders a 1200×630 PNG to public/og-image.png from a hand-written
 * SVG. Brand layout matches the site's Section 2 wordmark:
 *   - "tammo" top line in Neue Montreal Bold
 *   - dash + "STUDIOS." bottom line in Aileron Black Italic
 * Plus an "EST. 2026 · BREMEN" eyebrow top-left, "tammostudios.de"
 * bottom-left, "Websites, handgemacht." bottom-right.
 *
 * Fonts are embedded as base64 data URIs so sharp's librsvg-based
 * rasterizer doesn't have to resolve external font references at
 * render time. The two cuts we need (NeueMontreal-Bold woff2 and
 * Aileron-BlackItalic.otf) are read from public/fonts.
 *
 * Run with: node scripts/build-og-image.mjs
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const W = 1200;
const H = 630;

async function loadFontDataUri(relPath, mime) {
  const buf = await readFile(join(root, 'public', relPath));
  return `data:${mime};charset=utf-8;base64,${buf.toString('base64')}`;
}

const montrealBold = await loadFontDataUri(
  'fonts/montreal/NeueMontreal-Bold.woff2',
  'font/woff2'
);
const aileronBlackItalic = await loadFontDataUri(
  'fonts/aileron/Aileron-BlackItalic.otf',
  'font/otf'
);

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <style type="text/css"><![CDATA[
      @font-face {
        font-family: 'Neue Montreal';
        src: url('${montrealBold}') format('woff2');
        font-weight: 700;
        font-style: normal;
      }
      @font-face {
        font-family: 'Aileron';
        src: url('${aileronBlackItalic}') format('opentype');
        font-weight: 900;
        font-style: italic;
      }
    ]]></style>
    <radialGradient id="amberGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.15"/>
      <stop offset="60%" stop-color="#f59e0b" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- 1) dunkler Background -->
  <rect width="${W}" height="${H}" fill="#0a0a0a"/>

  <!-- 2) Grid-Overlay, dezent -->
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <!-- 3) Amber-Radial-Glow zentral -->
  <ellipse cx="${W / 2}" cy="${H / 2}" rx="500" ry="350" fill="url(#amberGlow)"/>

  <!-- 4) EST-Label oben links -->
  <text x="60" y="60"
        font-family="Neue Montreal, Inter, sans-serif"
        font-weight="700"
        font-size="18"
        fill="rgba(245, 245, 244, 0.5)"
        letter-spacing="3">EST. 2026 · BREMEN</text>

  <!-- 5) Wordmark zentriert: "tammo" oben, "— STUDIOS." unten -->
  <g transform="translate(${W / 2}, ${H / 2 - 20})">
    <text x="0" y="0"
          font-family="Neue Montreal, Inter, sans-serif"
          font-weight="700"
          font-size="200"
          fill="#f5f5f4"
          text-anchor="middle"
          letter-spacing="-8">tammo</text>
    <g transform="translate(0, 80)">
      <line x1="-265" y1="0" x2="-205" y2="0" stroke="#f5f5f4" stroke-width="9" stroke-linecap="round"/>
      <text x="265" y="14"
            font-family="Aileron, Inter, sans-serif"
            font-weight="900"
            font-style="italic"
            font-size="84"
            fill="#f5f5f4"
            text-anchor="end"
            letter-spacing="-2">STUDIOS.</text>
    </g>
  </g>

  <!-- 6) Footer-Zeile -->
  <text x="60" y="${H - 50}"
        font-family="Neue Montreal, Inter, sans-serif"
        font-weight="700"
        font-size="18"
        fill="rgba(245, 245, 244, 0.5)"
        letter-spacing="2">tammostudios.de</text>

  <text x="${W - 60}" y="${H - 50}"
        font-family="Neue Montreal, Inter, sans-serif"
        font-weight="700"
        font-size="20"
        fill="rgba(245, 245, 244, 0.7)"
        text-anchor="end"
        font-style="italic">Websites, handgemacht.</text>
</svg>`;

const out = join(root, 'public', 'og-image.png');
await sharp(Buffer.from(svg)).png().toFile(out);

const stats = await readFile(out);
await writeFile(join(root, 'public', 'og-image.svg'), svg);
console.log(
  `og-image written: ${out} (${(stats.byteLength / 1024).toFixed(1)} KB)`
);
