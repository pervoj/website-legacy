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

This really depends on your site templates, so I'll provide only the basic guide. For more information take a look at the [official docs](https://www.netlifycms.org/docs/).

Add `admin` directory into your `static/` (if you are using Zola). In this directory create two files, `index.html` and `config.yml`.

The content of `index.html` is simple:

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

All the magic is done in our `config.yml`. The first thing we'll add into the file will be this:

```yaml
backend:
  name: git-gateway
  branch: master # your branch name
```

With that we are specifying our backend protocol and our publication branch.

Bellow that add this line (can't be indented):

```yaml
publish_mode: editorial_workflow
```

This enables the editorial workflow I talked about above.

Now we need to specify the paths for our images (again not indented):

```yaml
# Media files will be stored in the repo under static/images/uploads
media_folder: "static/images/posts"
# The src attribute for uploaded media will begin with /images/uploads
public_folder: "/images/posts"
```

And now comes the biggest magic. Our collections. Collections define list of form elements in the CMS UI, that will be converted into your front matter.

So if your front matter looks like this:

```toml
+++
title = "My first post"
date = "2022-05-25"

[extra]
image = "/images/posts/my-beautiful-image.png"
+++
```

Then your `collections` will look like so:

```yaml
collections:
  - name: "blog" # Used in CMS routes, e.g. /admin/collections/blog
    label: "Blog" # Used in the UI
    folder: "content/blog" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template, e.g. YYYY-MM-DD-title.md
    fields: # The fields in front matter
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime", time_format: false }
      - label: "Extra"
        name: "extra"
        widget: "object"
        fields:
          - { label: "Image", name: "image", widget: "image", required: false }
      - { label: "Body", name: "body", widget: "markdown" }
```

All the configuration is done by now. The whole file should look like this:

```yaml
backend:
  name: git-gateway
  branch: master # your branch name

publish_mode: editorial_workflow

# Media files will be stored in the repo under static/images/uploads
media_folder: "static/images/posts"
# The src attribute for uploaded media will begin with /images/uploads
public_folder: "/images/posts"

collections:
  - name: "blog" # Used in CMS routes, e.g. /admin/collections/blog
    label: "Blog" # Used in the UI
    folder: "content/blog" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template, e.g. YYYY-MM-DD-title.md
    fields: # The fields in front matter
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime", time_format: false }
      - label: "Extra"
        name: "extra"
        widget: "object"
        fields:
          - { label: "Image", name: "image", widget: "image", required: false }
      - { label: "Body", name: "body", widget: "markdown" }
```

### Authentication

To be able to use the CMS, we also need to setup some login methods. For that we will use Netlify's authentication service Identidy.

1. Go to your **site settings** → **Identity** (not the one in the top menu, but in submenu of site settings), and select **Enable Identity service**.
2. Under **Registration preferences** select **Invite only**. We don't want to let everyone to edit our site.
3. Under **External providers** we can select e.g. GitHub as our login provider. Otherwise we will be logging in with our Netlify account.
4. Scroll down to **Services** → **Git Gateway** and click **Enable Git Gateway**.
5. In the top menu click **Identity** and send invite to your email, that is linked with GitHub or with your Netlify account.

The last thing we need to do is to add this to `<head>` of every page and post (our base template) as well as the CMS `index.html`:

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

And this before the closing </body> tag, now ONLY to our base template:

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

And that's all!

The last thing you need to do is to go to your email, click the invitation link and follow instructions. Now just visit `yoursite.tld/admin` and you can login!

And that is everything for this longer post! Hope it helped and thanks for reading!