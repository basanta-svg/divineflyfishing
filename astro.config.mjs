import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site: https://basanta-svg.github.io/divineflyfishing/
// When moving to a custom domain, set `site` to that domain and remove `base`.
export default defineConfig({
  site: 'https://basanta-svg.github.io',
  base: '/divineflyfishing',
  integrations: [sitemap()],
});
