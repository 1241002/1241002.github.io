# Portfolio — Alexandre

## O quê e porquê

Portfólio pessoal bilingue (PT/EN): destaque para recrutadores + arquivo completo de projetos
(software, hardware/PCB, robótica/firmware, trabalhos ISEP). Estilo editorial limpo.

## Comandos

- Correr: `npx astro dev --background` (parar: `npx astro dev stop`)
- Formatar: `npm run format`
- Verificar tudo (tipos + formatação + build): `npm run check`

## Convenções

- Stack: Astro 7 + TypeScript strict + Tailwind v4; React só em ilhas (componentes React Bits em `src/components/ui/`).
- Projetos = um ficheiro Markdown por projeto em `src/content/projects/`, validado por schema em `src/content.config.ts`.
- Alias `@/*` → `src/*`. Código e commits em inglês; textos do site em PT e EN.
- Deploy: GitHub Pages via GitHub Actions.

## Memória do projeto

Plano: docs/PLANO.md · Estado: docs/TAREFAS.md · Decisões: docs/DECISOES.md · Design: docs/DESIGN.md · Lições: docs/LICOES.md

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
