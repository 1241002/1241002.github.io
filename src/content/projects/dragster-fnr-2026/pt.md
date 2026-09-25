---
title: Robô Dragster — Festival Nacional de Robótica
summary: Um robô autónomo feito de raiz — esquemas, PCBs e código C num Teensy 4.0. 8.º lugar nacional em 16 equipas e Prémio Chita.
date: 2026-04-01
areas: [robotics, hardware]
context: isep
tech: [C, Teensy 4.0, PCB, Sensores]
cover: ./cover.jpg
coverAlt: A equipa de costas, com as t-shirts dos patrocinadores, a olhar para o ecrã do RoboCup Portugal Open 2026 em Barcelos.
featured: 1
---

Campeonato Nacional de Robótica, categoria Dragster, pela equipa **Tropa do Massas** (sim, o nome é mesmo esse). A prova foi no 26.º Festival Nacional de Robótica — RoboCup Portugal Open, em Barcelos.

## O que fiz

- Desenvolvi o robô de raiz: esquemas elétricos, PCBs próprias para controlo e para distribuição de potência, e a montagem completa.
- Programei em C a integração dos sensores com o microcontrolador Teensy 4.0, para controlar e corrigir a trajetória em tempo real.
- Tratei da comunicação com os patrocinadores: Gislotica, Critical TechWorks e PTRobotics.

## A prova

Foram três dias de competição. Houve avarias, houve reparações de emergência entre rondas, e chegámos às finais: **8.º lugar em 16 equipas** e o **Prémio Chita**.

![A equipa Tropa do Massas no pavilhão do festival, com o ecrã do RoboCup Portugal Open ao fundo.](./team.jpg)

## Por dentro

A PCB de controlo, desenhada por mim: o Teensy 4.0 ao centro, dois drivers de motor Pololu TB9051FTG, os condensadores de alimentação e os conectores dos sensores.

![Layout da PCB de controlo do Dragster: Teensy 4.0 ao centro, dois drivers de motor Pololu TB9051FTG, condensadores e conectores.](./pcb.png)

![Certificado do Prémio Chita, categoria Dragster, em nome de Alexandre Costa, equipa Tropa do Massas, no RoboCup Portugal Open 2026.](./award.jpg)

## A seguir

Já estou a trabalhar na versão 2 para o Festival Nacional de Robótica 2027 — desta vez a PCB também faz de chassis.
