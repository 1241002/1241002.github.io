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
    "home.tagline":
      "Construo coisas inteiras — da PCB ao código C, e também web e dados.",
    "home.meta": "Engenharia de Sistemas · ISEP · Porto",
    "cv.download": "Descarregar CV",
    "home.portraitAlt":
      "Alexandre Costa, de óculos e camisola escura, numa selfie ao ar livre ao pôr do sol.",
    "home.facts": "Resultados",
    "home.fact.fnr": "8.º no Nacional de Robótica — Dragster",
    "home.fact.open": "2.º no Open Robótica ISEP",
    "home.fact.erasmus": "Erasmus+ htw saar 2026",
    "home.featured": "Projetos em destaque",
    "home.allProjects": "Ver todos",
    "home.about": "Sobre",
    "home.about.p1":
      "Estou no 3.º ano de Engenharia de Sistemas no ISEP e gosto de fazer as coisas do princípio ao fim. Este ano isso quis dizer robôs autónomos feitos de raiz: desenhar os esquemas e as PCBs, montar tudo, escrever o C que os põe a andar — e repará-los à pressa entre rondas.",
    "home.about.p2":
      "Em 2026 fui a Saarbrücken com o Erasmus+ e, numa equipa de seis estudantes de seis instituições europeias, fui coautor de um artigo de revisão sobre microplásticos. Interessam-me sistemas embebidos e automação, sem largar a web e os dados.",
    "home.skills": "O que sei fazer",
    "home.languages": "Idiomas",
    "home.languages.list": "Português (nativo) · Inglês (B2)",
    "home.contact": "Vamos falar.",
    "home.contact.lead":
      "À procura de estágio e de projetos onde haja coisas para construir.",
    skip: "Saltar para o conteúdo",
    "project.back": "Projetos",
    "project.year": "Ano",
    "project.area": "Área",
    "project.context": "Contexto",
    "project.tech": "Tecnologia",
    "project.links": "Ligações",
    "project.prev": "Anterior",
    "project.next": "Seguinte",
    "link.repo": "Código",
    "link.demo": "Demo",
    "link.docs": "Documentação",
    "area.software": "Software",
    "area.hardware": "Hardware",
    "area.robotics": "Robótica",
    "area.research": "Investigação",
    "area.communication": "Comunicação",
    "context.isep": "ISEP",
    "context.personal": "Pessoal",
    "archive.lead":
      "Tudo o que construí: robôs, placas, software e trabalhos do ISEP.",
    "archive.filters": "Filtrar projetos",
    "archive.area": "Área",
    "archive.context": "Contexto",
    "archive.all": "Todos",
    "archive.number": "N.º",
    "archive.project": "Projeto",
    "archive.year": "Ano",
    "archive.empty": "Nenhum projeto com estes filtros.",
    "archive.clear": "Limpar filtros",
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
    "home.tagline":
      "I build whole things — from the PCB to the C code, plus web and data.",
    "home.meta": "Systems Engineering · ISEP · Porto",
    "cv.download": "Download CV (PT)",
    "home.portraitAlt":
      "Alexandre Costa, wearing glasses and a dark hoodie, in an outdoor selfie at sunset.",
    "home.facts": "Results",
    "home.fact.fnr": "8th at the Portuguese Robotics Championship — Dragster",
    "home.fact.open": "2nd at Open Robótica ISEP",
    "home.fact.erasmus": "Erasmus+ htw saar 2026",
    "home.featured": "Featured projects",
    "home.allProjects": "See all",
    "home.about": "About",
    "home.about.p1":
      "I'm a third-year Systems Engineering student at ISEP and I like to build things end to end. This year that meant autonomous robots made from scratch: drawing the schematics and PCBs, assembling everything, writing the C that makes them move — and fixing them in a hurry between rounds.",
    "home.about.p2":
      "In 2026 I went to Saarbrücken on Erasmus+ and, in a team of six students from six European institutions, co-authored a review paper on microplastics. I'm drawn to embedded systems and automation, without letting go of web and data.",
    "home.skills": "What I can do",
    "home.languages": "Languages",
    "home.languages.list": "Portuguese (native) · English (B2)",
    "home.contact": "Let's talk.",
    "home.contact.lead":
      "Looking for an internship and for projects with things to build.",
    skip: "Skip to content",
    "project.back": "Projects",
    "project.year": "Year",
    "project.area": "Area",
    "project.context": "Context",
    "project.tech": "Technology",
    "project.links": "Links",
    "project.prev": "Previous",
    "project.next": "Next",
    "link.repo": "Code",
    "link.demo": "Demo",
    "link.docs": "Docs",
    "area.software": "Software",
    "area.hardware": "Hardware",
    "area.robotics": "Robotics",
    "area.research": "Research",
    "area.communication": "Communication",
    "context.isep": "ISEP",
    "context.personal": "Personal",
    "archive.lead":
      "Everything I've built: robots, boards, software and ISEP coursework.",
    "archive.filters": "Filter projects",
    "archive.area": "Area",
    "archive.context": "Context",
    "archive.all": "All",
    "archive.number": "No.",
    "archive.project": "Project",
    "archive.year": "Year",
    "archive.empty": "No projects match these filters.",
    "archive.clear": "Clear filters",
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
