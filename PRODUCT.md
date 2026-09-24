# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 (static) + TypeScript strict + Tailwind v4, React only as islands for React Bits components. Hosted on GitHub Pages (`https://1241002.github.io`) via GitHub Actions.

## Users

- **Primary:** engineering recruiters and hiring engineers across any area (software, data, hardware, embedded), deciding in a few minutes whether to contact Alexandre for an internship or job.
- **Secondary:** Alexandre himself and peers — the site doubles as a complete archive of every project.

## Product Purpose

Personal portfolio of Alexandre Costa, 3rd-year Systems Engineering student at ISEP (Porto, 2024–2027). Success: a recruiter understands his range in under a minute, opens at least one project, and downloads the CV or makes contact.

## Positioning

Versatility is the claim: a systems engineer who builds the whole thing — schematics and PCBs, embedded C, 3D structure — and also works in software/web, data and optimisation (MILP), and team/sponsor management. Backed by competition results, not adjectives.

## Operating Context

- Visitors arrive from the CV, LinkedIn or GitHub; often on desktop during screening, sometimes on mobile.
- Bilingual: PT is the default at `/`, EN available on every page with a language switch.
- Single CV PDF, in Portuguese.

## Capabilities and Constraints

- Home for recruiters (about, skills, featured projects, CV, contact) + archive of all projects filterable by area (software, hardware, robotics) and context (ISEP, personal) + one page per project.
- Projects are Markdown files; no backend, no forms, no CMS.
- ISEP coursework: publish only what course rules allow; avoid exposing teammates without consent.
- Open: whether to publish the phone number that appears in the CV PDF.

## Brand Commitments

- Name shown: **Alexandre Costa**.
- Voice: first person, relaxed, with some humour (team name "Tropa do Massas" is fair game), but facts stay precise.
- Visual direction chosen by the user: Swiss/editorial — white, black, one signal red, large grotesque type, numbered grid.

## Evidence on Hand

- CV: `public/cv/cv-alexandre-costa.pdf` (source: Desktop `CV_Alexandre_Costa.pdf`).
- Portrait: `src/assets/portrait.png` (637×636, outdoor selfie at sunset).
- Results (from CV): Campeonato Nacional de Robótica, Dragster — 8.º of 16 + Prémio Chita (Mar–Abr 2026); Open Robótica ISEP 2026, TrackBotGP — 2.º lugar; Robô Dragster V2 in progress (PCB as chassis); Erasmus+ BIP htw saar 2026 — co-author of an IEEE-format review paper on self-cleaning textiles; F1 in Schools marketing lead (2024).
- Academic projects: Meireles Connect (B2B after-sales web portal), Peltier mini-fridge, Passadiços do Paiva route optimisation (MILP).
- Project photos: not yet provided — never fabricate images, results or testimonials.

## Product Principles

1. Prove range with real projects, not skill bars or self-ratings.
2. Every claim traceable to a project or result.
3. Fast and readable first: content works without JavaScript.
4. One expressive moment per page; the projects are the protagonists.

## Accessibility & Inclusion

WCAG 2.2 AA contrast, keyboard navigation, `prefers-reduced-motion` respected, correct `lang` per locale.
