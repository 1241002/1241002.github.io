# Plano

## Objetivo e critérios de aceitação

Portfólio bilingue (PT/EN): home para recrutadores + arquivo completo de projetos. Astro estático em GitHub Pages.

1. Todas as páginas em `/pt/...` e `/en/...`; o seletor de língua leva à página equivalente.
2. Home: sobre, competências, 3–4 projetos em destaque, download do CV, contactos (mailto/LinkedIn/GitHub). Tudo visível sem JS.
3. Arquivo: todos os projetos não-`draft`, data decrescente; filtro por área e contexto; sem JS mostra tudo.
4. Página de projeto: capa otimizada (avif/webp + srcset), metadados, links, corpo Markdown com imagens.
5. Build falha se faltar a tradução EN de um projeto publicado, `cover`/`coverAlt` ou campo obrigatório.
6. Crawl Playwright sobre `astro preview` (com o `base` real): 0 links internos 404 (inclui CV e imagens).
7. `<html lang>` certo, `hreflang` alternates, `title`/`description` por página.
8. Máx. 1 componente "wow" hidratado por página; com `prefers-reduced-motion: reduce` o conteúdo fica estático e o JS da animação não é pedido.
9. Push para `main` publica via GitHub Actions; `npm run check` passa local e no CI.
10. Sem scroll horizontal a 390 px; screenshots desktop (1440×900) e mobile (390×844).
11. Fora de âmbito (opcional): dark mode, sitemap, imagens OG.

## Decisões principais (detalhe em DECISOES.md)

- D1 Conteúdo: uma pasta por projeto `src/content/projects/<slug>/{pt.md,en.md,cover.jpg}`; `pt.md` canónico, `en.md` só `title/summary/coverAlt` + corpo. Junção `getProjects(lang)` falha o build se faltar EN.
- D2 Schema: title, summary (≤160), date, areas[software|hardware|robotics], context[isep|personal], course?, tech[], cover, coverAlt, featured (posição na home, 1–4), links{repo,demo,docs}?, draft.
- D3 URLs: prefixo nas duas línguas (`/pt/projects/<slug>/`), `trailingSlash: "always"`, `/` redireciona.
- D4 Base: repo `<user>.github.io` sem `base`; todos os links via helpers.
- D5 Filtro: HTML estático + script vanilla (<40 linhas), `aria-pressed`.
- D6 Entrada do nome: CSS puro, letra a letra, só com `prefers-reduced-motion: no-preference` (React Bits medido a ~99 KB gzip, rejeitado — ver DECISOES.md).
- D7 Testes: Playwright (e2e + screenshots) e Vitest só para a junção PT/EN.

## Fatias

0. Sistema de design — `docs/DESIGN.md` + `@theme` em `global.css`, fontes self-hosted.
1. Esqueleto i18n + layout + Playwright — `/pt/` `/en/`, header/footer, seletor, 404, redirect.
2. Deploy GitHub Pages — workflow Actions com `npm run check` antes do deploy.
3. Modelo de conteúdo + página de projeto (2 projetos reais) — schema, junção, Vitest.
4. Arquivo com filtro — cards, filtro área/contexto, teste com e sem JS.
5. Home para recrutadores (estática) — hero, sobre, competências, destaques, CV, contactos.
6. Entrada do nome em CSS — letra a letra, sem JS, teste de reduced-motion e de 0 ilhas.
7. Conteúdo completo + polimento — todos os projetos, imagens ≤1 MB, axe sem erros críticos.

## Riscos

- Maiúsculas/minúsculas (Windows vs CI Linux) em nomes de imagem → tudo em minúsculas.
- shadcn/React Bits em Astro + Tailwind v4 → fatia isolada, diff revisto.
- Peso/a11y das animações → MotionGate + orçamento + teste.
- `href="/..."` à mão parte com `base` → helpers + crawl.
- Tradução dupla dá trabalho → `draft: true` até haver EN.
- Trabalhos ISEP: confirmar o que é publicável (regras da UC, colegas de grupo).
- APIs recentes (Astro 7, Tailwind 4.3) → confirmar na doc em cada fatia.

## Fatia 5 — detalhe (home para recrutadores)

Segue o wireframe "Home" de `docs/DESIGN.md`. Tudo estático, sem JS.

Secções (ordem):

1. **Hero** — nome (já existe) · frase + meta · CTA "Descarregar CV" · retrato (`src/assets/portrait.png` via `<Picture>` avif/webp) · linha de 3 factos-prova: 8.º Nacional de Robótica (Dragster) · 2.º Open Robótica ISEP · Erasmus+ htw saar 2026.
2. **Projetos em destaque** — `getProjects(lang)` filtrado por `featured`, máx. 4; primeiro a 7 col, segundo a 5 col; capa 3:2 + título + área · ano; "Ver todos (N) →" para o arquivo.
3. **Sobre** — 1.ª pessoa, 1 parágrafo curto, factos do CV (ISEP 3.º ano, robôs de raiz, Erasmus+, interesse em embebidos/automação).
4. **O que sei fazer** — 4 colunas tipográficas, listas simples (sem barras): Hardware (PCB KiCad/EasyEDA, esquemas, soldadura, sensores, drivers de motor) · Embebidos (C, Teensy 4.0, Arduino, MQTT) · Software (Python, PHP, SQL/MySQL, web) · Dados e gestão (regressão, MILP, modelação 3D, MS Project, Scrum). Idiomas: PT nativo, EN B2.
5. **Campo vermelho de contacto** — "Vamos falar." + email · LinkedIn · GitHub + CV. Contactos saem para `src/lib/contacts.ts` (partilhado com o Footer).

Textos novos em `src/i18n/ui.ts` (PT e EN).

Critérios de aceitação (e2e Playwright, desktop + mobile, PT e EN):

- [x] Home tem h1 com o nome, secções com h2: destaques, sobre, competências, contacto.
- [x] Link do CV resolve (200) e tem `download`; mailto, LinkedIn e GitHub presentes no campo de contacto.
- [x] Cartões de destaque = projetos `featured`, apontam para páginas de projeto existentes (sem 404); "Ver todos" leva ao arquivo da mesma língua.
- [x] Retrato com `alt` não vazio e `width`/`height` (sem salto de layout).
- [x] CTA do CV visível no primeiro viewport a 1440×900 (e acima da dobra num portátil).
- [x] Sem scroll horizontal a 390 px; screenshots 1440×900 e 390×844 revistas.
- [x] Funciona com JS desligado (conteúdo igual).
- [x] `npm run check` passa; e2e anteriores continuam verdes.
