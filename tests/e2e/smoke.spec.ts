import { expect, test } from "@playwright/test";

// Relative paths (no leading slash) resolve against baseURL, which carries `base`.
const pages = [
  { path: "pt/", lang: "pt", switchTo: "en/" },
  { path: "en/", lang: "en", switchTo: "pt/" },
  { path: "pt/projects/", lang: "pt", switchTo: "en/projects/" },
  { path: "en/projects/", lang: "en", switchTo: "pt/projects/" },
  {
    path: "pt/projects/dragster-fnr-2026/",
    lang: "pt",
    switchTo: "en/projects/dragster-fnr-2026/",
  },
  {
    path: "en/projects/trackbotgp-open-robotica-2026/",
    lang: "en",
    switchTo: "pt/projects/trackbotgp-open-robotica-2026/",
  },
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
  for (const p of [
    "pt/",
    "en/",
    "pt/projects/",
    "en/projects/",
    "pt/projects/dragster-fnr-2026/",
  ]) {
    await page.goto(p);
    // Let the name's entrance finish so the capture shows the settled page.
    await page.evaluate(() =>
      Promise.all(document.getAnimations().map((a) => a.finished)),
    );
    // Measure the settled layout: the fallback face has no condensed width.
    const overflow = await page.evaluate(async () => {
      await document.fonts.ready;
      return (
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
      );
    });
    expect(overflow, `${p} overflows horizontally`).toBeLessThanOrEqual(0);
    // Load lazy images so the capture shows what a visitor scrolls into.
    await page.evaluate(async () => {
      for (const img of document.querySelectorAll("img")) {
        img.loading = "eager";
      }
      await Promise.all(
        [...document.images].map((img) =>
          img.complete ? null : img.decode().catch(() => null),
        ),
      );
    });
    const name = `${p.replaceAll("/", "_")}${testInfo.project.name}.png`;
    await page.screenshot({
      path: `.impeccable/review/${name}`,
      fullPage: true,
    });
  }
});

test("project page serves an optimised cover and an alt text", async ({
  page,
}) => {
  await page.goto("pt/projects/dragster-fnr-2026/");
  const cover = page.locator("article picture").first();
  await expect(cover.locator('source[type="image/avif"]')).toHaveCount(1);
  await expect(cover.locator('source[type="image/webp"]')).toHaveCount(1);
  await expect(cover.locator("img")).toHaveAttribute("alt", /.+/);
  // The cover spans the grid, not the image's intrinsic size.
  const coverBox = await cover.locator("img").boundingBox();
  const mainBox = await page.locator("main").boundingBox();
  expect(coverBox!.width).toBeGreaterThan(mainBox!.width * 0.85);
  const bodyImages = page.locator(".prose-body img");
  await expect(bodyImages.first()).toHaveAttribute("alt", /.+/);
});

test.describe("archive", () => {
  test("lists every project, newest first, and filters by area and context", async ({
    page,
  }) => {
    await page.goto("pt/projects/");
    const rows = page.locator(".project-row");
    await expect(rows).toHaveCount(2);
    await expect(rows.first()).toContainText("Robô Dragster");
    await expect(page.locator("[data-count]")).toHaveText("(2)");

    const filters = page.locator("[data-filters]");
    await expect(filters).toBeVisible();
    const software = filters.getByRole("button", { name: "Software" });
    await expect(software).toHaveAttribute("aria-disabled", "true");
    await software.click({ force: true }); // disabled: must be a no-op
    await expect(software).toHaveAttribute("aria-pressed", "false");
    await expect(rows.filter({ visible: true })).toHaveCount(2);

    const hardware = filters.getByRole("button", { name: "Hardware" });
    await hardware.click();
    await expect(hardware).toHaveAttribute("aria-pressed", "true");
    await expect(rows.filter({ visible: true })).toHaveCount(2);
    await expect(
      filters.getByRole("button", { name: "Pessoal" }),
    ).toHaveAttribute("aria-disabled", "true");

    await rows.first().getByRole("link").click();
    await expect(page).toHaveURL(/projects\/dragster-fnr-2026\/$/);
  });
});

test.describe("archive without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("shows every project and hides the filter controls", async ({
    page,
  }) => {
    await page.goto("en/projects/");
    await expect(page.locator(".project-row")).toHaveCount(2);
    await expect(page.locator(".project-row").first()).toBeVisible();
    await expect(page.locator("[data-filters]")).toBeHidden();
  });
});

test.describe("recruiter home", () => {
  for (const lang of ["pt", "en"] as const) {
    test(`${lang}: CV, featured projects, about, skills and contact`, async ({
      page,
      request,
      baseURL,
    }) => {
      await page.goto(`${lang}/`);

      const cv = page.locator("a[data-cv]");
      await expect(cv).toBeInViewport();
      await expect(cv).toHaveAttribute("download", "");
      const cvRes = await request.get(
        new URL((await cv.getAttribute("href"))!, baseURL).href,
      );
      expect(cvRes.status()).toBe(200);
      expect(cvRes.headers()["content-type"]).toContain("pdf");

      const portrait = page.locator("main picture img").first();
      await expect(portrait).toHaveAttribute("alt", /.+/);
      await expect(portrait).toHaveAttribute("width", /\d+/);
      await expect(portrait).toHaveAttribute("height", /\d+/);

      await expect(page.locator("main h2")).toHaveCount(4);

      const cards = page.locator("a[data-featured]");
      await expect(cards).toHaveCount(2);
      for (const href of await cards.evaluateAll((els) =>
        els.map((el) => (el as HTMLAnchorElement).href),
      )) {
        expect(href).toMatch(new RegExp(`/${lang}/projects/[a-z0-9-]+/$`));
      }

      await page.locator("a[data-all-projects]").click();
      await expect(page).toHaveURL(new URL(`${lang}/projects/`, baseURL).href);
      await page.goBack();

      const contact = page.locator("[data-contact]");
      await expect(contact.locator('a[href^="mailto:"]')).toHaveCount(1);
      await expect(contact.locator('a[href*="linkedin.com/in/"]')).toHaveCount(
        1,
      );
      await expect(contact.locator('a[href*="github.com/"]')).toHaveCount(1);
      await expect(contact.locator("a[download]")).toHaveCount(1);
    });
  }
});

test.describe("home without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("shows every section", async ({ page }) => {
    await page.goto("pt/");
    await expect(page.locator("a[data-featured]")).toHaveCount(2);
    await expect(page.locator("[data-contact]")).toBeVisible();
    await expect(page.locator("a[data-cv]")).toBeVisible();
  });
});

test.describe("home name entrance", () => {
  test("h1 reads as the plain name and the page ships no JS island", async ({
    page,
  }) => {
    await page.goto("pt/");
    await expect(
      page.getByRole("heading", { level: 1, name: "Alexandre Costa" }),
    ).toBeVisible();
    await expect(page.locator("astro-island")).toHaveCount(0);
    const letters = page.locator("h1 .letter");
    await expect(letters).toHaveCount(15); // 14 letters + the red full stop
    await expect(letters.first()).toHaveCSS("animation-name", "letter-in");
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("the name is static and fully visible", async ({ page }) => {
      await page.goto("en/");
      const letters = page.locator("h1 .letter");
      await expect(letters.first()).toHaveCSS("animation-name", "none");
      await expect(letters.last()).toHaveCSS("opacity", "1");
    });
  });
});
