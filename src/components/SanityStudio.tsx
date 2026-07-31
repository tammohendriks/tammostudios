import { Studio } from 'sanity';
import config from '../../sanity.config';

/**
 * React-Wrapper fuer Sanity Studio. Wird von src/pages/admin/index.astro
 * via client:only="react" gerendert — Studio uebernimmt danach die
 * gesamte /admin-Route (browserRouter mit basePath: '/admin').
 */
export default function SanityStudio() {
  return <Studio config={config} />;
}
