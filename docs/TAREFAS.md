# Tarefas / estado

## Agora

- [ ] Fatia 7 — conteúdo completo + polimento
  - [x] Dragster: PCB + certificado Prémio Chita; BIP (paper, só imagens, sem download); Meireles Connect (capa tipográfica, link notícia ISEP); Space Benders F1 in Schools
  - [x] Áreas novas: Investigação, Comunicação; `featured` passa a posição na home (1–4)
  - [x] Mini-frigorífico Peltier (LENG1) e Drone dirigível (LENG2, colegas aceitam aparecer)
  - [ ] Paiva MILP (à espera de material: modelo, gráficos ou mapa)
  - [ ] Meireles: diagramas/mockups se aparecerem; foto grande do robô Dragster (só há miniatura 160px)
  - [ ] Polimento: axe sem erros críticos, imagens ≤1 MB

## A seguir

## Bloqueios

- Fotos e textos dos restantes projetos (Meireles Connect, Peltier, Paiva MILP, F1 in Schools…).
- Confirmar com os colegas da Tropa do Massas que aceitam aparecer nas fotos.

## Feito

- [x] Fatia 6 — entrada do nome letra a letra em CSS puro (React Bits medido a ~99 KB gzip e rejeitado pelo utilizador); estático com reduced-motion; 0 ilhas JS; e2e 36/36 (2026-09-25)
- [x] Fatia 5 — home para recrutadores: hero com retrato + 3 factos-prova, destaques (`featured`, máx. 4, 7+5 col), sobre, competências (sem "Ferramentas de IA", decisão do utilizador), campo vermelho de contacto; contactos partilhados em `src/lib/contacts.ts`; e2e 32/32 (2026-09-25)
- [x] Fatia 4 — arquivo `/projects/`: catálogo numerado (mais recente = número mais alto), filtros área/contexto em JS vanilla (`aria-pressed`, `aria-disabled` quando não há resultados possíveis), estado vazio, sem JS mostra tudo; hover com linha vermelha + capa; e2e 26/26 (2026-09-25)
- [x] Fatia 3 — Content Collections (`projects` pt.md + `projectsEn` en.md), junção PT/EN com Vitest (4 testes) e teste negativo (sem en.md → build falha com mensagem), página de projeto com capa AVIF/WebP; 2 projetos reais (Dragster FNR 2026, TrackBotGP Open Robótica 2026); e2e 22/22 (2026-09-25)
- [x] Fatia 2 — GitHub Pages via Actions (check → e2e → deploy); site em https://1241002.github.io ; e2e 16/16 contra o site publicado (`E2E_URL=https://1241002.github.io/ npx playwright test`) (2026-09-25)
- [x] Fatia 1 — i18n `/pt/` `/en/` (seletor mantém a página), BaseLayout (lang, hreflang, canonical), Header/Footer, raiz → `/pt/`, 404 bilingue, arquivo provisório; Playwright 16/16 (desktop+mobile), também com `BASE_PATH=/portfolio` (2026-09-25)
- [x] CV publicado tal como está, com telefone (decisão do utilizador, 2026-09-25)
- [x] Fatia 0 — PRODUCT.md, DESIGN.md, tokens `@theme`, Archivo self-hosted; specimen validado a 390/1024/1440 e removido (2026-09-25)
- [x] Plano aprovado (2026-09-25): PT por omissão, 1 CV em PT, com retrato, username GitHub `1241002`
- [x] Scaffold Astro 7 + React + Tailwind v4 + `npm run check` + LF (2026-09-25)
