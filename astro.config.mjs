// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://1241002.github.io",
  // Override with BASE_PATH to prove every internal link respects `base`.
  base: process.env.BASE_PATH ?? "/",
  trailingSlash: "always",
  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en"],
    routing: {
      prefixDefaultLocale: true,
      // Root redirect is a static page (src/pages/index.astro).
      redirectToDefaultLocale: false,
    },
  },
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
