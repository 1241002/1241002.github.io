import { expect, test } from "@playwright/test";

// Relative paths (no leading slash) resolve against baseURL, which carries `base`.
const pages = [
  { path: "pt/", lang: "pt", switchTo: "en/" },
  { path: "en/", lang: "en", switchTo: "pt/" },
  { path: "pt/projects/", lang: "pt", switchTo: "en/projects/" },
  { path: "en/projects/", lang: "en", switchTo: "pt/projects/" },
];

for (const p of pages) {
  test(`${p.path} renders in ${p.lang} with a working language switch`, async ({
    page,
    baseURL,
  }) => {
    const response = await page.goto(p.path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", p.lang);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(
      page.locator(`link[rel="alternate"][hreflang="${p.lang}"]`),
    ).toHaveCount(1);

    const switcher = page.locator("header a[hreflang]");
    await switcher.click();
    await expect(page).toHaveURL(new URL(p.switchTo, baseURL).href);
  });
}

test("root redirects to the Portuguese home", async ({ page, baseURL }) => {
  await page.goto("");
  await expect(page).toHaveURL(new URL("pt/", baseURL).href);
});

test("unknown URL shows the bilingual 404", async ({ page }) => {
  const response = await page.goto("does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("404");
  await expect(
    page.getByRole("link", { name: "Back to the home page" }),
  ).toBeVisible();
});

test("no internal link is broken", async ({ page, request, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const queue = [new URL("pt/", baseURL).href, new URL("en/", baseURL).href];
  const seen = new Set<string>();
  const broken: string[] = [];

  while (queue.length) {
    const url = queue.shift()!;
    if (seen.has(url)) continue;
    seen.add(url);

    const res = await request.get(url);
    if (!res.ok()) {
      broken.push(`${res.status()} ${url}`);
      continue;
    }
    if (!res.headers()["content-type"]?.includes("text/html")) continue;

    await page.goto(url);
    const hrefs = await page
      .locator("a[href], link[href]")
      .evaluateAll((els) => els.map((el) => (el as HTMLAnchorElement).href));
    for (const href of hrefs) {
      const u = new URL(href);
      u.hash = "";
      if (u.origin === origin && !seen.has(u.href)) queue.push(u.href);
    }
  }

  expect(broken).toEqual([]);
  expect(seen.size).toBeGreaterThan(4);
});

test("no horizontal overflow and screenshots for review", async ({
  page,
}, testInfo) => {
  for (const p of ["pt/", "en/projects/"]) {
    await page.goto(p);
    // Measure the settled layout: the fallback face has no condensed width.
    const overflow = await page.evaluate(async () => {
      await document.fonts.ready;
      return (
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
      );
    });
    expect(overflow, `${p} overflows horizontally`).toBeLessThanOrEqual(0);
    const name = `${p.replaceAll("/", "_")}${testInfo.project.name}.png`;
    await page.screenshot({
      path: `.impeccable/review/${name}`,
      fullPage: true,
    });
  }
});
