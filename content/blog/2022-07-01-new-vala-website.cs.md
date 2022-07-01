+++
title = "Nový web pro jazyk Vala"

[extra]
description = "Pracujeme na nové webové stránce pro programovací jazyk Vala."
image = "images/posts/vala.png"
+++

Jazyk Vala jsem objevil v roce 2020, když jsem hledal nějaký vhodný jazyk na tvorbu GTK aplikací podobný Javě. Už po prvních chvílích používání jsem byl z tohoto jazyka nadšený. Jeho skvělá integrace se systémem GObject zajišťuje pohodlné používání komponent knihoven GLib a GTK. Na rozdíl od jazyků jako C nebo Rust je zde GObject používán jako nativní typový systém.

I přes všechny jeho výhody ovšem jazyk není příliš populární. Jedním z důvodů je samozřejmě jeho závislost na GObjectu a tudíž i limitace pro použití jen v určitých projektech, nejčastěji aplikacích pro Linux. To ovšem není jediný důvod. Vala totiž ztrácí na popularitě i v projektu GNOME.

Prvním důvodem je určitě chybějící nebo alespoň pro začátečníky nepříliš jednoduchá dokumentace. A dokumentací teď nemyslím popis API, jako třeba [Valadoc](https://valadoc.org/), ale spíše nějaký lidsky psaný manuál. Pro nováčky je tedy těžší s jazykem začít. Dalším z důvodů je malý počet vývojářů (konkrétně jeden, který projekt aktivně udržuje). Vývoj jazyka je tedy pomalý, opravy chyb trvají dlouho a nové funkce nepřibývají moc často. A potom nedostatek vývojářských nástrojů, které by programátorovi usnadnily práci. Ať už jde o linter nebo správce projektů / závislostí.

Jazyk tedy moc nových uživatelů nezískává a o ty současné postupně přichází. Při životě ho drží hlavně projekt [Elementary OS](https://elementary.io/), který na Valu vsadil jako klíč ke svému úspěchu a nyní jsou v tomto jazyce napsány všechny jeho součásti. Dále pak určitě aplikace, které jsou v jazyce již napsány a jejichž vývojářům se nechce je přepisovat. A nakonec lidé, kteří mají jazyk rádi a dobrovolně u něj zůstávají. A právě tito lidé se rozhodli vzít situaci do vlastních rukou, postupně vše napravit a navrátit jazyku jeho bývalou popularitu.

Projektem, který z tohoto důvodu vznikl, je nová [webová stránka jazyka](https://vala.dev/) společně s [uživatelským manuálem](https://lwildberg.pages.gitlab.gnome.org/vala-tutorial/). Pracovat na projektu začal už v březnu 2021 [Nahuel Gomez Castro](https://github.com/nahuelwexd), ale větší zájem o něj se projevil až v dubnu 2022. Projektu se ujal [Colin Kiama](https://github.com/colinkiama) a, jak je vidět i na grafu aktivity, projekt se opravdu „rozjel“.

![aktivita projektu](/images/posts/new-vala-website/activity.png)

Do projektu přispěli i další lidé, jako např. [Rajdeep Singha](https://github.com/Suzie97), [Lorenz Wildberg](https://github.com/lw64), [Darshak Parikh](https://github.com/dar5hak), [Marki](https://github.com/Marki2019) a já. Dále poté [Ben Iofel](https://github.com/benwaffle) a [Princeton Ferro](https://github.com/Prince781), kteří koupili domény.

Společně s projektem webové stránky jazyka začal Lorenz Wildberg pracovat také na uživatelském manuálu, který obsahuje i na kapitoly rozdělené návody, a podpoře jazyka v aplikaci [Workbench](https://flathub.org/apps/details/re.sonny.Workbench) od [Sonnyho Pierse](https://github.com/sonnyp). Nováčci tedy nyní mají možnost jednoduše se jazyk naučit a vše si pohodlně vyzkoušet bez nutnosti instalace velkého množství nástrojů.

Cílem těchto kroků je přilákat k jazyku další uživatele, kteří by v něm vyvíjeli své aplikace a případně i přispívali do samotného jazyka.

Konečné oficiální vydání webu je naplánováno na [15. července](https://gitlab.gnome.org/GNOME/vala/-/commit/68986811db7b23c1c3b652cbee34fd45c62c2c6e). Na 22. července je naplánována [přednáška](https://events.gnome.org/event/77/contributions/298/) na letošní konferenci GUADEC, kterou povede Princeton Ferro. Pokud jste se tedy na GUADEC ještě nezaregistrovali, nezapomeňte [to udělat](https://events.gnome.org/event/77/registrations/44/).
