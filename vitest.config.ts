import { defineConfig } from "vitest/config";

// Unit tests only; Playwright owns tests/e2e.
export default defineConfig({
  test: { include: ["src/**/*.test.ts"] },
});
