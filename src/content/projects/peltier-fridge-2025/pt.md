---
title: Mini-frigorífico com célula de Peltier
summary: Um mini-frigorífico feito de raiz com uma célula de Peltier — montagem, eletrónica, sensores e código. De ~20 °C ambiente a cerca de 7,9 °C lá dentro.
date: 2025-01-24
areas: [hardware]
context: isep
course: LENG1
tech: [Célula de Peltier, Eletrónica, Sensores, Controlo liga/desliga]
cover: ./cover.jpg
featured: 3
coverAlt: O mini-frigorífico, uma caixa de esferovite com a palavra FRIGO pintada, com o dissipador e a ventoinha montados em cima, numa secretária.
---

Projeto de LENG1, no 1.º semestre do 1.º ano. O desafio: arrefecer uma caixa pequena sem compressor, só com uma **célula de Peltier** — uma placa que, com corrente, aquece de um lado e arrefece do outro.

## O que fiz

Mais uma vez, um pouco de tudo: a montagem da caixa isolada, a eletrónica, os sensores de temperatura e o código de controlo — um controlo liga/desliga da célula consoante a temperatura medida.

O calor do lado quente sai por um dissipador de CPU com ventoinha, montado na tampa; cá dentro, uma ventoinha pequena espalha o frio pelo volume da caixa.

![O dissipador de alumínio com a ventoinha, montado sobre a célula de Peltier na tampa da caixa.](./heatsink.jpg)

![A eletrónica dentro da caixa: placa de controlo, sensores e a cablagem presa às paredes de esferovite.](./electronics.jpg)

## Resultado

Com a sala a cerca de 20 °C, o interior chegou a cerca de **7,9 °C** — o mínimo que conseguimos.

![Termómetro de sonda espetado na caixa a marcar 7,9 °C.](./thermometer.jpg)
