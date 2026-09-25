# Design

Fonte de verdade visual. Tokens implementados em `src/styles/global.css` (`@theme`). Contexto do produto em `PRODUCT.md`.

## Brief

- **Assunto:** portfólio de Alexandre Costa, estudante de Engenharia de Sistemas (ISEP). Prova versatilidade: robôs completos (PCB + C), software/web, dados/otimização.
- **Público:** recrutadores de engenharia de qualquer área, em triagem rápida (desktop, às vezes mobile).
- **Tarefa principal:** perceber o alcance em < 1 min → abrir um projeto → descarregar CV / contactar.
- **Modo:** Experience (os projetos lideram), com a home a cumprir também Persuade (CV e contacto sempre à mão).
- **Direção escolhida pelo utilizador:** "Revista suíça" — Estilo Tipográfico Internacional. Escolhida entre 3 propostas; substitui o sorteio de direções do impeccable (direção fixada pelo utilizador ganha ao sorteio).
- **Cena física:** recrutador num portátil, escritório com luz de dia, várias abas abertas → fundo claro, contraste máximo, leitura rápida.

## Contrato de direção

- **THESIS:** o portfólio como catálogo de exposição suíço — uma grelha rígida onde cada projeto é uma entrada catalogada com número, área e ano. Recusa o template "hero + cards de skills + barra de progresso".
- **OWN-WORLD:** branco puro, preto tinta, um vermelho-sinal usado em campos inteiros (não em salpicos). Uma só família grotesca (Archivo) em duas larguras: condensada pesada para títulos, normal para texto. Filetes pretos de 1–2 px como estrutura. Sem sombras, sem cantos arredondados, sem cartões.
- **STORY:** o visitante vê o nome enorme e a frase "construo coisas inteiras", percorre o índice de projetos por área, abre um, e encontra o CV/contacto num campo vermelho impossível de falhar.
- **FIRST VIEWPORT:** barra superior fina (AC · Projetos · CV · EN) sobre filete; nome "ALEXANDRE COSTA" condensado a encher a largura da grelha (1 linha desktop, 2 linhas mobile), ponto vermelho no fim; por baixo, em grelha de 12 colunas: frase de posicionamento (col 1–6), retrato (col 9–12), 3 factos-prova (8.º Nacional · 2.º Open ISEP · Erasmus+) numa linha, CTA "Descarregar CV" visível sem scroll.
- **FORM:** direção fixada pelo utilizador (sem seed de concept-seed). Build code-led (sem geração de imagem).
- **Interação assinatura:** o nome entra letra a letra (React Bits, uma só vez, só na home; estático com reduced-motion). Hover nas linhas do índice: a linha inteira passa a vermelho e a capa do projeto aparece.
- **FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Cor

Estratégia: **Restrained com campo comprometido** — neutros + um acento, mas o acento ocupa regiões inteiras (bloco de contacto/CV, ponto do nome, linha ativa do índice).

| Token        | Hex       | Papel                                            | Contraste                |
| ------------ | --------- | ------------------------------------------------ | ------------------------ |
| `paper`      | `#FFFFFF` | Fundo                                            | —                        |
| `ink`        | `#0A0A0A` | Texto, filetes, botões                           | 19,8:1 sobre paper       |
| `signal`     | `#E5361B` | Campos vermelhos, ponto, grafismos, texto ≥ 24px | 4,31:1 (só texto grande) |
| `signal-ink` | `#D42E14` | Links e texto vermelho pequeno                   | 5,0:1 sobre paper        |
| `muted`      | `#5C5C5C` | Metadados, legendas                              | 6,69:1 sobre paper       |
| `rule-soft`  | `#E4E4E1` | Filetes secundários, fundo de imagem a carregar  | decorativo               |

Texto sobre campo `signal` é sempre `ink` (4,6:1), nunca branco (4,31:1).
Seleção de texto: fundo `signal`, texto `ink`. Focus ring: 2px `ink` + offset 3px (sobre `signal`: 2px `paper`).

## Tipografia

Família única: **Archivo** variável (`@fontsource-variable/archivo`, eixos `wdth` 62–125 e `wght` 100–900), self-hosted woff2, subset latin.
Porquê: grotesca de linhagem Akzidenz com eixo de largura real — dá a condensada de cartaz suíço e o texto corrido na mesma família, sem cair nas faces por defeito.

| Papel                                        | Tamanho                                                                | Largura / peso                     | Entrelinha / tracking |
| -------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------- | --------------------- |
| Display (nome, só home) — `text-display-fit` | `21vw` (2 linhas, < 1024px) · `min(13.4vw, 12rem)` (1 linha, ≥ 1024px) | wdth 62, wght 850                  | 0.86 / -0.03em        |
| H1 página                                    | `clamp(2.5rem, 6vw, 5rem)`                                             | wdth 75, wght 800                  | 0.95 / -0.02em        |
| H2 secção                                    | `clamp(1.75rem, 3vw, 2.5rem)`                                          | wdth 85, wght 700                  | 1.05 / -0.01em        |
| H3 / título no índice                        | 1.375rem                                                               | wdth 100, wght 650                 | 1.2 / 0               |
| Corpo                                        | 1.0625rem (17px)                                                       | wdth 100, wght 400                 | 1.55 / 0, medida 65ch |
| Pequeno / metadados                          | 0.875rem                                                               | wdth 100, wght 500, `tabular-nums` | 1.4 / 0.01em          |

O display excede os 6rem do craft-floor por decisão do brief ("grotesca 120px"): o nome enche a largura da grelha, como num cartaz. Maiúsculas só no nome e na navegação curta.

## Espaçamento, grelha e forma

- Base 4px. Escala: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 144.
- Grelha: 12 colunas desktop (≥ 1024px), 6 tablet, 4 mobile. Gutter 24px (16px mobile). Margem lateral `clamp(16px, 4vw, 56px)`. Largura máx. 1440px.
- Ritmo vertical: secção = 96px desktop / 64px mobile; mais espaço acima de um título do que abaixo.
- Filetes: 2px `ink` entre secções principais; 1px `ink` entre linhas do índice; 1px `rule-soft` secundário.
- Raios: **0** em tudo. Sombras: nenhuma.
- Imagens: proporção 3:2 nas capas, `object-fit: cover`, fundo `rule-soft` enquanto carregam.

## Layout (wireframes)

### Home `/pt/`

```
AC                               Projetos   CV   EN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALEXANDRE COSTA■     (desktop: 1 linha a toda a largura; mobile: 2 linhas)
───────────────────────────────────────────────────────
Construo coisas inteiras — da PCB      ┌───────────┐
ao código C, e também web e dados.     │  retrato  │
Engenharia de Sistemas · ISEP · Porto  │           │
[ Descarregar CV ↓ ]                   └───────────┘
8.º Nacional Robótica  ·  2.º Open ISEP  ·  Erasmus+ 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Projetos em destaque                    Ver todos (N) →
┌──────────────────────┐ ┌──────────┐
│ capa grande (7 col)  │ │ capa (5) │   títulos + área + ano
└──────────────────────┘ └──────────┘
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sobre (col 1–4 título | col 5–11 texto 1.ª pessoa)
O que sei fazer: 4 colunas tipográficas (Hardware · Embebidos · Software · Dados/gestão), listas simples, sem barras
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  campo signal
▓ Vamos falar.  email · LinkedIn · GitHub   [CV ↓]    ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

### Arquivo `/pt/projects/`

```
Projetos (N)                              (H1)
Área: [Todos] [Software] [Hardware] [Robótica]   Contexto: [Todos] [ISEP] [Pessoal]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
N.º  Projeto                      Área          Contexto  Ano
───────────────────────────────────────────────────────
012  Robô Dragster                Rob · HW      ISEP      2026   ← hover: linha signal + capa flutua à direita
011  Meireles Connect             Software      ISEP      2026
───────────────────────────────────────────────────────
(vazio) Nenhum projeto com estes filtros. [Limpar filtros]
```

Mobile: cada linha vira bloco (número + título; área · ano por baixo), capa pequena à esquerda.
O N.º é informativo: ordem cronológica de catálogo (o mais recente tem o número mais alto).

### Projeto `/pt/projects/<slug>/`

```
← Projetos                                      PT/EN
ROBÔ DRAGSTER                              (H1, wdth 75)
Resumo em 1–2 linhas (col 1–8)
───────────────────────────────────────────────────────
Ano 2026 │ Área Robótica, HW │ Contexto ISEP │ Tech C, KiCad, Teensy │ Repo ↗
┌─────────────────────────────────────────────────────┐
│ capa 3:2, largura total da grelha                   │
└─────────────────────────────────────────────────────┘
          corpo Markdown, 65ch, col 3–10
          imagens do corpo a col 2–11
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
← anterior                                   seguinte →
```

## Estados

- **Vazio (filtro):** frase + botão "Limpar filtros"; nunca ecrã branco.
- **Loading:** imagens com fundo `rule-soft` e dimensões reservadas (sem salto de layout). Sem spinners — site estático.
- **Erro:** página 404 bilingue no mesmo estilo: "404" em display + ligações para `/pt/` e `/en/`.
- **Desativado:** botão de filtro sem resultados possíveis → `muted`, `aria-disabled`.
- **Seletor de língua:** mostra só a língua de destino ("EN" na versão PT, "PT" na EN), com `hreflang` e `lang`.
- **Sucesso / ativo:** filtro ativo = preenchido `ink` com texto `paper` (`aria-pressed="true"`); link atual na nav sublinhado 2px.
- **Hover:** links → `signal-ink` + sublinhado offset 4px; linha do índice → fundo `signal` (sangra 12px além da grelha), texto `ink`, e a capa (16rem, 3:2) aparece à esquerda da coluna Área (só ≥ 1024px).
- **Focus:** anel 2px `ink`, offset 3px, sempre visível com teclado.

## Motion

- Um único momento autoral por página: na home, o nome entra letra a letra (React Bits, via `MotionGate`). Restantes páginas: sem animação de entrada.
- Transições de hover: 150ms, `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out exponencial).
- `prefers-reduced-motion: reduce` → tudo estático, o JS da animação não é carregado.
- Conteúdo visível por defeito (sem `opacity: 0` à espera de JS).

## Plataforma

Web responsivo, mobile-first nos breakpoints 640 / 1024 / 1440. Sem dark mode nesta versão (fora de âmbito, ver PLANO.md).
