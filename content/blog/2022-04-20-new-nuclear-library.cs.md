+++
lang = "cs"
title = "Zcelá nová CSS knihovna"
date = "2022-04-20"

[extra]
image = "images/posts/nuclear.png"
+++

V posledních měsících jsem spustil hned 2 zcela nové stránky a chystám se spustit 3. Protože chci, aby všechny mé stránky vypadaly stejně, musím pořád dokola opisovat stejné HTML a CSS. To dělá údržbu stránek hodně složitou. Když uděláte malou změnu v designu jedné stránky, musíte stejnou změnu udělat i v těch ostatních. To mě přimělo oddělit designovou knihovnu do samostatného projektu.

Tak přesně vznikl **Nuclear**. Knihovnou Nuclear jsem vytvořil základní stavební kámen pro všechny mé budoucí stránky. Je vytvořený v SCSS se špetkou JS a má zabudované Font Awesome 6 Free.

Nuclear je vytvořený pro zjednodušení tvorby mých stránek a je postavený na mém značkovém designu, není připravený na používání v jiných projektech. Pokud však chcete Nuclear použít, můžete vytvořit fork [repozitáře na GitHubu](https://github.com/pervoj/nuclear) a upravit si Nuclear podle sebe. Pokud chcete Nuclear jenom vyzkoušet, přidejte těchto pár řádků do hlavičky vaší stránky:

```html
<link rel="stylesheet" href="https://pervoj.cz/nuclear/css/nuclear.css" />
<script
  src="https://pervoj.cz/nuclear/js/nuclear.js"
  type="module"
  defer
></script>
```

A poté přidejte třídy podle návodu na [webové stránce projektu](https://pervoj.cz/nuclear/).

V budoucnosti také plánuji:

- Předělat všechny své stránky tak, aby Nuclear využívaly.
- Implementovat do Nuclearu velký lokalizační systém.
- Přidat do Nuclearu systém komentářů.
- Přidat další funkce a vylepšení.
