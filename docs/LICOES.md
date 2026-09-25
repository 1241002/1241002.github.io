# Lições deste projeto

- O nome em `text-display-fit` só cabe em mobile com a Archivo condensada; com a fonte de fallback transborda. Por isso: preload do woff2 no BaseLayout e testes de overflow medem depois de `document.fonts.ready`.
- No Git Bash, `BASE_PATH=/portfolio` vira `C:/Program Files/Git/portfolio` → usar `MSYS_NO_PATHCONV=1`.
- Fotos `.jfif` (WhatsApp) são JPEG: copiar como `.jpg` para o Astro e para as ler/ver.
- Playwright trata `aria-disabled="true"` como desativado: `click()` espera até ao timeout. Para testar que um botão desativado não faz nada, usar `click({ force: true })`.
- `<Picture>` do Astro: a classe vai para o `<img>`; para o elemento da grelha usar `pictureAttributes={{ class: "col-span-full block" }}`.
- Screenshots de página inteira apanham imagens lazy por carregar: forçar `loading="eager"` + `decode()` antes de capturar.
