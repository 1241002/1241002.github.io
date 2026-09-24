# Decisões

## 2026-09-25 Stack: Astro + React islands + Tailwind v4, GitHub Pages

Contexto: portfólio estático bilingue; o utilizador quer componentes React Bits.
Opções: Astro (HTML estático, i18n e otimização de imagem nativos) · Next.js + MDX.
Escolha: Astro 7 com `@astrojs/react` só em ilhas + Tailwind v4. Deploy em GitHub Pages via Actions, repo `1241002.github.io`.
Porquê: zero JS por defeito, Content Collections com schema, React Bits continua possível nas ilhas.

## 2026-09-25 Conteúdo: uma pasta por projeto com pt.md canónico + en.md

Contexto: cada projeto tem de existir em PT e EN sem dados duplicados.
Opções: pastas por língua (schema completo duplicado) · pasta por projeto · um ficheiro com as duas línguas (impossível ter dois corpos).
Escolha: `src/content/projects/<slug>/{pt.md,en.md,imagens}`; `pt.md` tem os metadados, `en.md` só title/summary/coverAlt + corpo. A junção falha o build se faltar EN num projeto publicado; `draft: true` esconde projetos a meio.
Porquê: impossível divergir datas/links entre línguas; projeto autocontido.

## 2026-09-25 URLs e i18n

Escolha: prefixo nas duas línguas (`/pt/`, `/en/`), segmento `projects` igual nas duas, `trailingSlash: "always"`, `/` redireciona para `/pt/`. Textos de interface num dicionário tipado `src/i18n/ui.ts`.
Porquê: um só ficheiro de página por rota; seletor de língua trivial.

## 2026-09-25 Filtro do arquivo em JS vanilla

Escolha: todos os cards em HTML estático com `data-*` + script < 40 linhas com `aria-pressed`. Rejeitado: ilha React (JS a mais, gasta a animação da página) e páginas por área.

## 2026-09-25 Direção visual "Revista suíça" (fatia 0)

Contexto: o utilizador escolheu entre 3 direções (Caderno de engenharia · Revista suíça · Solder mask).
Escolha: Estilo Tipográfico Internacional — branco, preto, vermelho-sinal `#E5361B` em campos inteiros; grelha 12/6/4; raios e sombras a zero. Detalhe em DESIGN.md.
Nota: o `impeccable` normalmente sorteia direções (concept-seed); saltado porque a direção foi fixada pelo utilizador. Build code-led (não há geração de imagem).

## 2026-09-25 Tipografia: Archivo variável (uma só família)

Opções consideradas: Archivo · Schibsted Grotesk · Hanken Grotesk. Evitadas as faces por defeito (Inter, Space Grotesk, DM Sans, Instrument Sans…).
Escolha: `@fontsource-variable/archivo` (eixos wdth 62–125, wght 100–900), self-hosted.
Porquê: grotesca de linhagem Akzidenz com eixo de largura real — condensada de cartaz para o nome e texto corrido na mesma família.

## 2026-09-25 Nome ajustado à largura da grelha

Escolha: `text-display-fit` — 21vw em 2 linhas (< 1024px), `min(13.4vw, 12rem)` numa linha (≥ 1024px). Medido: 1 linha sem overflow a 1024 e 1440; 2 linhas a 390; CTA visível a 1440×900.
Porquê: o nome a encher a grelha é o gesto do cartaz suíço; excede o máximo de 6rem do craft-floor por decisão do brief.

## 2026-09-25 Vermelho de texto separado do vermelho de campo

`signal` #E5361B dá 4,31:1 sobre branco (só texto grande/grafismos) → `signal-ink` #D42E14 (5,0:1) para links e texto pequeno. Texto sobre campo vermelho é sempre preto (4,6:1).
