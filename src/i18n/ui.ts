import { getRelativeLocaleUrl } from "astro:i18n";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const languageNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
};

const ui = {
  pt: {
    "site.title": "Alexandre Costa",
    "site.description":
      "Portfólio de Alexandre Costa — Engenharia de Sistemas no ISEP. Robôs, PCBs, sistemas embebidos, software e dados.",
    "nav.home": "Início",
    "nav.projects": "Projetos",
    "nav.cv": "CV",
    "nav.main": "Navegação principal",
    "lang.switch": "Ver em português",
    "footer.contact": "Contacto",
    "footer.top": "Voltar ao topo",
    "projects.title": "Projetos",
    "projects.soon": "O arquivo de projetos está a ser montado.",
    "home.tagline":
      "Construo coisas inteiras — da PCB ao código C, e também web e dados.",
    "home.meta": "Engenharia de Sistemas · ISEP · Porto",
    "cv.download": "Descarregar CV",
    skip: "Saltar para o conteúdo",
  },
  en: {
    "site.title": "Alexandre Costa",
    "site.description":
      "Portfolio of Alexandre Costa — Systems Engineering at ISEP. Robots, PCBs, embedded systems, software and data.",
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.cv": "CV",
    "nav.main": "Main navigation",
    "lang.switch": "View in English",
    "footer.contact": "Contact",
    "footer.top": "Back to top",
    "projects.title": "Projects",
    "projects.soon": "The project archive is being put together.",
    "home.tagline":
      "I build whole things — from the PCB to the C code, plus web and data.",
    "home.meta": "Systems Engineering · ISEP · Porto",
    "cv.download": "Download CV (PT)",
    skip: "Skip to content",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)["pt"];

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function useTranslations(lang: Locale) {
  return (key: UiKey): string => ui[lang][key];
}

export function otherLocale(lang: Locale): Locale {
  return lang === "pt" ? "en" : "pt";
}

/** Locale-prefixed URL that respects `base` and `trailingSlash`. */
export function localePath(lang: Locale, path = ""): string {
  return getRelativeLocaleUrl(lang, path);
}

/** Same page in the other language: swaps the locale segment after `base`. */
export function switchLocalePath(
  pathname: string,
  target: Locale,
  base = import.meta.env.BASE_URL,
): string {
  const baseNoSlash = base.replace(/\/$/, "");
  const rest = pathname.slice(baseNoSlash.length);
  const [, , ...segments] = rest.split("/");
  return localePath(target, segments.join("/"));
}

/** Path to a file in `public/`, prefixed with `base`. */
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

export function getStaticLocalePaths() {
  return locales.map((lang) => ({ params: { lang } }));
}
