# Lições deste projeto

- O nome em `text-display-fit` só cabe em mobile com a Archivo condensada; com a fonte de fallback transborda. Por isso: preload do woff2 no BaseLayout e testes de overflow medem depois de `document.fonts.ready`.
- No Git Bash, `BASE_PATH=/portfolio` vira `C:/Program Files/Git/portfolio` → usar `MSYS_NO_PATHCONV=1`.
