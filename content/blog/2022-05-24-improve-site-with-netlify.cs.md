---
lang: cs
title: Jak vylepšit váš web s Netlify
slugurl: improve-site-with-netlify
date: 2022-05-24T19:34:48.938Z
extra:
  description: Právě jsem přemigroval svůj web na Netlify a tady jsou mé myšlenky.
  image: /images/posts/netlify.svg
---
For a long time I used Github Pages to host my websites and I was relatively satisfied with it. Then, when I found Netlify, I just wanted to give it a try. So I tried to deploy this website there. And it was... surprisingly easy and fast. I am using [Zola](https://www.getzola.org/) to build this site. With GitHub Pages you need to setup GitHub Action for building your site, because it doesn't have Zola installed by default. I had also problems with the existing Zola actions so I had to make my own. It had to download Zola archive from releases, upack it and only then build the site. With Netlify the only thing you need to do is to copy [a few lines from Zola documentation](https://www.getzola.org/documentation/deployment/netlify/) and you are done. Then just commit to the repository and Netlify will build the site for you.

There is also [Netlify CMS](https://www.netlifycms.org/). An open source script in JS that adds a full-fledged CMS to your website. That's a convenience made just for me. Always when I wanted to write new post, I had to clone the whole repository, write the post, commit and push it back. And when I started writing on one computer, I couldn't finish it on another. Netlify CMS solves it. Thanks to its editorial workflow you can save posts as drafts and publish them when they're ready. You can also choose if you want to use their nice WYSIWYG editor or write markdown directly.

## How to migrate your site to Netlify

If you're at all interested in Netlify (no, this really isn't paid advertising... 😅️), here is how to setup it.

First thing you need to do is to create a [Netlify account](https://app.netlify.com/). Then import your repository from GitHub and you are done (mostly). Go to Deploys section of your site dashbord and check if the site was built without any errors. If you use Zola like I do, you will get an error. However, this error is really easy to fix. Just create a `netlify.toml` in your repository root directory and fill it with the content bellow.

```toml
[build]
# if the site content isn't in the root directory, specify the path here
base = ""
publish = "public"
command = "zola build"

[build.environment]
# set to the latest version from Zola releases
ZOLA_VERSION = "0.15.3"

[context.deploy-preview]
command = "zola build --base-url $DEPLOY_PRIME_URL"
```

If you are using a different static site generator, try to search for `[your generator] deploy to netlify`.

Everything should be working by now.

## How to enable Netlify CMS

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