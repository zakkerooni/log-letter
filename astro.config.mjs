// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://post-library.com', // ← 本番ドメインに変更
  adapter: cloudflare(),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
