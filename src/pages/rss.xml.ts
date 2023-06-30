import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import getPosts from "../utils/posts";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export async function get(context: APIContext) {
  const blog = await getPosts();
  return rss({
    title: "Vojtěch Perník",
    description: "Simple apps built with passion",
    site: context.site?.href!,
    items: blog.map((post) => ({
      link: `/blog/${post.slug}`,
      title: post.title,
      pubDate: post.date,
      content: sanitizeHtml(parser.render(post.contentString)),
    })),
  });
}
