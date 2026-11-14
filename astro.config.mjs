import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // The site's address, used for link previews and the sitemap. Change it when the site moves to its final domain.
  site: 'https://chemquest.pages.dev',
  devToolbar: { enabled: false },
  // Pictures in Markdown (newsletter issues) get several sizes, so phones download small copies.
  image: { layout: 'constrained' },
  // A list of every page for Google and Bing (dist/sitemap-index.xml). The 404 page stays out of it.
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
});
