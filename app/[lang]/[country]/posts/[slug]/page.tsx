import fs from "fs"
import path from "path";
import matter from "gray-matter";
import { Disclaimer } from "@/components/Molecules/mdx/Disclaimer";
import { SyntaxHighlighterCode } from "@/components/Atoms/mdx/SyntaxHighlighterCode";
import { PropDrillingCodeExample } from "@/components/Atoms/mdx/CodeExamples/PropDrillingCodeExample";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams({
  params,
}: {
  params: { lang: string; country: string };
}) {
  const { lang, country } = params;

  console.log(lang, country);

  const dirBlog = lang && country === "es" ? "blog" : "enblog";

  const posts: string[] = fs.readdirSync(path.join(process.cwd(), dirBlog));

  const paths = posts.map((post) => ({
    slug: post.replace(".mdx", ""),
  }));

  return paths;
}

function getPost(params: { lang: string; country: string; slug: string }) {
  const { lang, country } = params;

  const dirBlog = lang && country === "es" ? "blog" : "enblog";
  const markdownFile = fs.readFileSync(
    path.join(dirBlog, params.slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownFile);
  return {
    frontMatter,
    params,
    content,
  };
}

export default function Post({ params }: any) {
  const props = getPost(params);
  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto p-6 pb-64">
      <h1>{props.frontMatter.title}</h1>
      <MDXRemote
        source={props.content}
        components={{
          Disclaimer,
          SyntaxHighlighterCode,
          PropDrillingCodeExample,
        }}
      />
    </article>
  );
}
