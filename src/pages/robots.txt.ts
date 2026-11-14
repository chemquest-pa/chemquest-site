// Tells search engines they may read every page, and where the sitemap is. Follows `site` in astro.config.mjs.
export const GET = ({ site }: { site: URL }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`);
