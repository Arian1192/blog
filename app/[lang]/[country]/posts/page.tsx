import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Disclaimer } from "@/components/Molecules/mdx/Disclaimer";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  
  const posts: string[] = fs.readdirSync(path.join("blog"));
  const paths = posts.map((post) => ({
    slug: post.replace(".mdx", ""),
  }));

  return paths;
}

function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("blog", slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownFile);
  return {
    frontMatter,
    slug,
    content,
  };
}

export default function Post({ params }: any) {
  const props = getPost(params);

  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto p-6 pb-64">
      <h1>{props.frontMatter.title}</h1>
      <MDXRemote source={props.content} components={{ Disclaimer }} />
    </article>
  );
}
