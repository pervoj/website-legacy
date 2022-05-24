+++
title = "Brand new CSS library"
date = "2022-04-20"

[extra]
lang = "en"
image = "images/posts/nuclear.svg"
+++

In the last few months I started 2 brand new websites and I'm working on 3rd. Since I want the pages to look the same, the same HTML and CSS is being writed over and over. That makes the pages quite difficult to maintain. When you make a small change in design of the one page, you also have to make the same change in the other pages. This prompted me to separate the design library into a separate project.

And that's exactly how **Nuclear** came about. With Nuclear I made the very building block for all my future websites. It is built with SCSS and a little of JS and it has Font Awesome 6 Free built-in.

Since Nuclear is built with my brand design in mind, it is not prepared to be used in other pages. If you like it and want to use it in your projects, you can fork the [GitHub repository](https://github.com/pervoj/nuclear) and modify it to fit your needs. To only try it just add this lines to your page `<head>`:

```html
<link rel="stylesheet" href="https://pervoj.cz/nuclear/css/nuclear.css">
<script src="https://pervoj.cz/nuclear/js/nuclear.js" type="module" defer></script>
```

And then mark your page content with classes as described on the [Nuclear website](https://pervoj.cz/nuclear/).

In the future I also plan:

- Remake all my pages to use Nuclear.
- Implement big localization system into Nuclear.
- Add comment system into Nuclear.
- Add other features that will improve that library.
