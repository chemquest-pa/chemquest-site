// Cloudflare Worker "chemquest-newsletter-timer".
// GitHub's own schedule never fired for this repository, so this Cloudflare timer asks GitHub to run the
// "Import newsletter" workflow instead. The live copy is edited in Cloudflare (Workers & Pages →
// chemquest-newsletter-timer) or here. The schedule is in wrangler.toml next to this file; publish changes with
// `npx wrangler deploy` from this folder.
//
// Secret GITHUB_TOKEN: a fine-grained GitHub token for chemquest-pa/chemquest-site with only
// "Actions: Read and write". It expires; when it does, make a new one and replace the secret (TECH-PLAN.md).

export default {
  async scheduled(event, env) {
    const res = await fetch(
      'https://api.github.com/repos/chemquest-pa/chemquest-site/actions/workflows/newsletter.yml/dispatches',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent': 'chemquest-newsletter-timer',
        },
        body: JSON.stringify({ ref: 'main' }),
      },
    );
    if (res.status !== 204) throw new Error(`GitHub answered ${res.status}: ${await res.text()}`);
  },

  // The Worker has a web address too; it does nothing there.
  async fetch() {
    return new Response('Not found', { status: 404 });
  },
};
