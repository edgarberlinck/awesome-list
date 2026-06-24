import { defineConfig } from 'astro/config';

// Use base path only in production (GitHub Pages)
const base = process.env.NODE_ENV === 'production' ? '/awesome-list' : '/';

export default defineConfig({
  site: 'https://edgarberlinck.github.io',
  base: base,
  outDir: './dist',
});
