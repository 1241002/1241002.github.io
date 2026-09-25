import { defineConfig } from "@playwright/test";

const PORT = 4322;
// Same BASE_PATH the build used, so tests hit the real URLs.
const BASE = (process.env.BASE_PATH ?? "/").replace(/\/?$/, "/");
// E2E_URL=https://1241002.github.io/ runs the suite against the deployed site.
const REMOTE = process.env.E2E_URL;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: REMOTE ?? `http://localhost:${PORT}${BASE}`,
    channel: "chrome",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2,
      },
    },
  ],
  webServer: REMOTE
    ? undefined
    : {
        command: `npx astro build && npx astro preview --port ${PORT}`,
        port: PORT,
        reuseExistingServer: false,
        timeout: 120_000,
      },
});
