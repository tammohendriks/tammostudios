/**
 * Sanity CLI Config — noetig fuer `sanity` Kommandos die im Projekt-Kontext
 * laufen (z.B. `sanity dataset export`, `sanity graphql deploy`).
 */
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'dszzp6oh',
    dataset: 'production',
  },
});
