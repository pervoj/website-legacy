---
lang: en
title: How to improve your site with Netlify
slugurl: improve-site-with-netlify
date: 2022-05-24T19:32:08.613Z
extra:
  description: I just migrated my website to Netlify and here are my thougts.
  image: /images/posts/netlify.svg
---
## notes

* where I hosted before

  * why netlify is better
* guide to host on netlify

For a long time I used Github Pages to host my websites and I was relatively satisfied with it. Then, when I found Netlify, I just wanted to give it a try. So I tried to deploy this website there. And it was... surprisingly easy and fast. I am using [Zola](https://www.getzola.org/) to build this site. With GitHub Pages you need to setup GitHub Action for building your site, because it doesn't have Zola installed by default. I had also problems with the existing Zola actions so I had to make my own. It had to download Zola archive from releases, upack it and only then build the site. With Netlify the only thing you need to do is to copy [a few lines from Zola documentation](https://www.getzola.org/documentation/deployment/netlify/) and you are done. Then just commit to the repository and Netlify will build the site for you.

There is also [Netlify CMS](https://www.netlifycms.org/). An open source script in JS that adds a full-fledged CMS to your website. That's a convenience made just for me. Always when I wanted to write new post, I had to clone the whole repository, write the post, commit and push it back. And when I started writing on one computer, I couldn't finish it on another. Netlify CMS solves it. Thanks to its editorial workflow you can save posts as drafts and publish them when they're ready.