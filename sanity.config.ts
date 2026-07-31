/**
 * Sanity Studio Config — eingebettet unter /admin auf tammostudios.de.
 *
 * Studio v6 embed pattern: React-Component rendert <Studio config={...} />
 * in einer Astro-Page mit client:only="react". Deep-Links wie /admin/desk/post
 * werden ueber vercel.json rewrite auf /admin geroutet — Studios browser-
 * router uebernimmt dann.
 *
 * Schemas leben in ./sanity/schemaTypes/ — additiv, verdrängen bestehende
 * Document-Types im Projekt nicht (Sanity zeigt nur was im Schema deklariert
 * ist, laesst unbekannte Types unangetastet).
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Tammo Studios',

  projectId: 'dszzp6oh',
  dataset: 'production',

  // Studio laeuft embedded unter /admin. basePath teilt dem browserRouter
  // mit dass alle Studio-URLs mit /admin praefixiert sind.
  basePath: '/admin',

  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],

  schema: {
    types: schemaTypes,
  },
});
