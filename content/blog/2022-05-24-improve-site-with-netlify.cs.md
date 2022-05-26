---
lang: cs
title: Jak vylepšit váš web s Netlify
slugurl: improve-site-with-netlify
date: 2022-05-24T19:34:48.938Z
extra:
  description: Právě jsem přemigroval svůj web na Netlify a tady jsou mé myšlenky.
  image: /images/posts/netlify.svg
---
Po dlouhou dobu jsem pro hostování svých webů používal GitHub Pages a byl jsem s nimi relativně spokojený. Když jsem potom narazil na Netlify, chtěl jsem ho jen zkusit. Zkusil jsem tam tedy nahrát tento web. A bylo to... překvapivě jednoduché a rychlé. Tato stránka je postavená na generátoru [Zola](https://www.getzola.org/). S GitHub Pages musíte nastavit GitHub Actions, aby stránku na Zole sestavily, protože tam Zola není ve výchozím stavu nainstalována. Já měl také problémy s předdefinovanými akcemi a musel jsem si tedy vytvořit vlastní. Tato akce vždy stáhla archiv Zoly z vydání, rozbalila ho a až poté mohla kompilovat web. Pokud používáte Netlify, to jediné, co musíte udělat, je zkopírovat [pár řádků z dokumentace Zoly](https://www.getzola.org/documentation/deployment/netlify/) a máte hotovo. Pak už jen stačí commitnout do vašeho repozitáře a Netlify za vás web zkompiluje.

Také můžete využít [Netlify CMS](https://www.netlifycms.org/). Open source script v JS, který na váš web přidá plnohodnotný redakční systém. A to je vymoženost pro mě jako dělaná. Pokaždé, když chci napsat nový článek, musím naklonovat celý repozitář, napsat článek, commitnout a pushnout commit zpět na GitHub. A když začnu psát na jednom počítači, nemůžu článek dokončit na jiném. Netlify CMS právě tohle řeší. Díky jeho funkci zvané editorial workflow můžete články uložit jako koncepty a publikovat je až ve chvíli, kdy jsou hotové. Můžete si také vybrat, jestli chcete používat jejich pěkný WYSIWYG editor, nebo psát přímo markdown.

## Jak přemigrovat web na Netlify

Pokud vás Netlify aspoň trochu zaujalo (ne, tohle vážně není placená propagace... 😅️), zde je návod, jak ho nastavit.

První věc, kterou musíte udělat, je vytvořit si [účet na Netlify](https://app.netlify.com/). Potom jen importovat váš repozitář z GitHubu a jste hotovi (skoro). Nyní se na nástěnce vašeho webu v Netlify přepněte do sekce Deploys a zkontrolujte, jestli se stránka zkompilovala bez chyb. Pokud jako já používáte Zolu, jednu chybu uvidíte. Nicméně tato chyba je na opravu opravdu jednoduchá. Jen v kořenovém adresáři vašeho repozitáře vytvořte soubor `netlify.toml` a vložte do něj následující kód:

```toml
[build]
# pokud obsah webu není v kořenovém adresáři, nastavte zde cestu
base = ""
publish = "public"
command = "zola build"

[build.environment]
# nastavte na nejnovější verzi
ZOLA_VERSION = "0.15.3"

[context.deploy-preview]
command = "zola build --base-url $DEPLOY_PRIME_URL"
```

Pokud používáte jiný generátor, zkuste vyhledat `[váš generátor] deploy to netlify`.

Nyní by vše mělo fungovat

## Jak povolit Netlify CMS

Postup hodně závisí na šablonách vašeho webu, takže popíšu jen základní postup. Pro více informací se podívejte do [oficiální dokumentace](https://www.netlifycms.org/docs/).

V adresáři `static/` (pokud používáte Zolu) vytvořte nový adresář `admin`. V tomto adresáři vytvořte dva nové soubory, `index.html` a `config.yml`.

Obsah souboru `index.html` je jednoduchý:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```

Veškerá magie se odehrává v souboru `config.yml`. První věcí, kterou do tohoto souboru přídáme bude toto:

```yaml
backend:
  name: git-gateway
  branch: master # název vaší větve
```

Tímto kódem specifikujeme protokol backendu a větev pro publikaci.

Pod to přidáme tento řádek (nesmí být odsazen):

```yaml
publish_mode: editorial_workflow
```

To povolí již zmíněný editorial workflow.

Nyní musíme specifikovat cesty k obrázkům (znovu není odsazeno):

```yaml
# Soubory médií budou skladovány v repozitáři v static/images/uploads
media_folder: "static/images/posts"
# Atribut src nahraných médií bude začínat /images/uploads
public_folder: "/images/posts"
```

And now comes the biggest magic. Our collections. Collections define list of form elements in the CMS UI, that will be converted into your front matter.

A nyní přichází to největší kouzlo. Kolekce. Kolekce definují seznam elementů formuláře v grafickém rozhraní CMS, které budou převedeny do *front matter* vašich příspěvků.

Pokud tedy vaše *front matter* vypadá takto:

```toml
+++
title = "Můj první příspěvek"
date = "2022-05-25"

[extra]
image = "/images/posts/muj-nadherny-obrazek.png"
+++
```

Pod `collections` musíte vložit následující:

```yaml
collections:
  - name: "blog" # Použito v routech CMS, např. /admin/collections/blog
    label: "Blog" # Použito v grafickém rozhraní
    folder: "content/blog" # Cesta do adresáře, kde jsou uloženy články
    create: true # Povolit uživatelům vytvářet články v této kolekci
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Šablona jména souboru, např. YYYY-MM-DD-title.md
    fields: # Položky v front matter
      - { label: "Titulek", name: "title", widget: "string" }
      - { label: "Datum", name: "date", widget: "datetime", time_format: false }
      - label: "Extra"
        name: "extra"
        widget: "object"
        fields:
          - { label: "Obrázek", name: "image", widget: "image", required: false }
      - { label: "Obsah článku", name: "body", widget: "markdown" }
```

Veškerá konfigurace je nyní hotová. Celý soubor bude vypadat takto:

```yaml
backend:
  name: git-gateway
  branch: master # název vaší větve

publish_mode: editorial_workflow

# Soubory médií budou skladovány v repozitáři v static/images/uploads
media_folder: "static/images/posts"
# Atribut src nahraných médií bude začínat /images/uploads
public_folder: "/images/posts"

collections:
  - name: "blog" # Použito v routech CMS, např. /admin/collections/blog
    label: "Blog" # Použito v grafickém rozhraní
    folder: "content/blog" # Cesta do adresáře, kde jsou uloženy články
    create: true # Povolit uživatelům vytvářet články v této kolekci
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Šablona jména souboru, např. YYYY-MM-DD-title.md
    fields: # Položky v front matter
      - { label: "Titulek", name: "title", widget: "string" }
      - { label: "Datum", name: "date", widget: "datetime", time_format: false }
      - label: "Extra"
        name: "extra"
        widget: "object"
        fields:
          - { label: "Obrázek", name: "image", widget: "image", required: false }
      - { label: "Obsah článku", name: "body", widget: "markdown" }
```

### Přihlašování

Abychom mohli CMS využívat, potřebujeme se nějak přihlásit. K tomu použijeme autentikační službu od Netlify zvanou Identity.

1. Jděte do nastavení stránky (**site settings**) → **Identity** (ne to v horním menu, ale v bočním podmenu v nastavení), a vyberte **Enable Identity service**.
2. Pod **Registration preferences** vyberte **Invite only**. Nechceme povolit komukoli editovat naše články.
3. Pod **External providers** vyberte jako poskytovatele přihlášení např. GitHub. Jinak se budete přihlašovat vaším účtem Netlify.
4. Sescrollujte dolů k **Services** → **Git Gateway** a klikněte na **Enable Git Gateway**.
5. Nyní v horním menu vyberte **Identity** a pošlete si pozvánku na email, který je propojený s GitHubem, nebo vaším účtem Netlify.

Poslední věcí, kterou musíme udělat, je přídání tohoto řádku do `<head>` každé stránky a příspěvku (prostě šablony *base*) a také `index.html` našeho CMS:

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

A tohoto před uzavírací tak `</body>`, nyní POUZE naší šablony *base*:

```html
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", function(user) {
      if (!user) {
        window.netlifyIdentity.on("login", function() {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

A to je vše!

Poslední věcí, kterou musíte udělat, je jít do vašeho emailu, kliknout na zvací odkaz a postupovat podle instrukcí. Teď už jen navštivte `vasweb.tld/admin` a můžete se přihlásit!

A to je pro tento trochu delší příspěvek vše! Doufám, že jsem vám alespoň trochu pomohl, a díky za přečtení!