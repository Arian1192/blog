import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { Disclaimer } from "@/components/Molecules/mdx/Disclaimer";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams({
  params,
}: {
  params: { lang: string; country: string };
}) {
  const { lang, country } = params;

  console.log(lang, country);

  const dirBlog = lang && country === "es" ? "esblog" : "enblog";

  const posts: string[] = await fs.readdir(path.join(dirBlog));

  const paths = posts.map((post) => ({
    slug: post.replace(".mdx", ""),
  }));

  return paths;
}

 async function getPost(params: { lang: string; country: string; slug: string }) {
  const { lang, country } = params;

  const dirBlog = lang && country === "es" ? "esblog" : "enblog";
  const markdownFile = fs.readFile(
    path.join(dirBlog, params.slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } =  matter(await markdownFile);
  return {
    frontMatter,
    params,
    content,
  };
}

export default async function Post({ params }: any) {
  const props = await getPost(params);
  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto p-6 pb-64">
      <h1>{props.frontMatter.title}</h1>
      <MDXRemote source={props.content} components={{ Disclaimer }} />
    </article>
  );
}
