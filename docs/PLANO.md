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
- D2 Schema: title, summary (≤160), date, areas[software|hardware|robotics], context[isep|personal], course?, tech[], cover, coverAlt, featured, links{repo,demo,docs}?, draft.
- D3 URLs: prefixo nas duas línguas (`/pt/projects/<slug>/`), `trailingSlash: "always"`, `/` redireciona.
- D4 Base: repo `<user>.github.io` sem `base`; todos os links via helpers.
- D5 Filtro: HTML estático + script vanilla (<40 linhas), `aria-pressed`.
- D6 React Bits: só no hero da home, via `MotionGate` (reduced-motion + import dinâmico), orçamento ~60 KB gzip.
- D7 Testes: Playwright (e2e + screenshots) e Vitest só para a junção PT/EN.

## Fatias

0. Sistema de design — `docs/DESIGN.md` + `@theme` em `global.css`, fontes self-hosted.
1. Esqueleto i18n + layout + Playwright — `/pt/` `/en/`, header/footer, seletor, 404, redirect.
2. Deploy GitHub Pages — workflow Actions com `npm run check` antes do deploy.
3. Modelo de conteúdo + página de projeto (2 projetos reais) — schema, junção, Vitest.
4. Arquivo com filtro — cards, filtro área/contexto, teste com e sem JS.
5. Home para recrutadores (estática) — hero, sobre, competências, destaques, CV, contactos.
6. React Bits no hero — `shadcn init` isolado, `MotionGate`, teste de ilhas e reduced-motion.
7. Conteúdo completo + polimento — todos os projetos, imagens ≤1 MB, axe sem erros críticos.

## Riscos

- Maiúsculas/minúsculas (Windows vs CI Linux) em nomes de imagem → tudo em minúsculas.
- shadcn/React Bits em Astro + Tailwind v4 → fatia isolada, diff revisto.
- Peso/a11y das animações → MotionGate + orçamento + teste.
- `href="/..."` à mão parte com `base` → helpers + crawl.
- Tradução dupla dá trabalho → `draft: true` até haver EN.
- Trabalhos ISEP: confirmar o que é publicável (regras da UC, colegas de grupo).
- APIs recentes (Astro 7, Tailwind 4.3) → confirmar na doc em cada fatia.
