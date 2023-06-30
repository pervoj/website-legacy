import { getCollection } from "astro:content";

export type FrontMatter = {
  title: string;
  image: string;
  summary?: string;
};

export default async function getPosts() {
  const blog = await getCollection("blog");
  const posts = await Promise.all(
    blog.map(async (post) => {
      const basename = post.id;
      const date = basename.split("-").slice(0, 3).join("-");
      const slug = basename // remove the date
        .replace(`${date}-`, "") // remove the file extension
        .replace(`.${basename.split(".").reverse()[0]}`, "");

      return {
        ...(post.data as FrontMatter),
        slug,
        date: new Date(date),
        ...(await post.render()),
        contentString: post.body,
      };
    })
  );
  posts.sort((a, b) => a.date.getTime() - b.date.getTime());
  posts.reverse();
  return posts;
}
