import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://pervojcz-legacy.vercel.app/",
  publicDir: "static",
  integrations: [mdx(), prefetch(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
