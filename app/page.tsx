import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Link from "next/link";

type Post = {
  meta: {
    title: string;
    description: string;
    date: string;
  };
  slug: string;
};

export default function Home() {
  const blogDir = "blog";
  const posts: string[] = fs.readdirSync(blogDir);

  const blogs: Post[] = posts.map((post) => {
    const postContent = fs.readFileSync(path.join(blogDir, post), "utf-8");
    const { data: frontMatter } = matter(postContent);

    // Asegúrate de que 'frontMatter' contenga las propiedades esperadas
    if (
      typeof frontMatter.title !== "string" ||
      typeof frontMatter.description !== "string" ||
      typeof frontMatter.date !== "string"
    ) {
      throw new Error("Los metadatos no tienen la estructura esperada.");
    }

    return {
      meta: {
        title: frontMatter.title,
        description: frontMatter.description,
        date: frontMatter.date,
      },
      slug: post.replace(".mdx", ""),
    };
  });

  return (
    <main className="flex flex-col w-full h-screen justify-start items-center ">
      <h1 className="text-2xl md:text-3xl font-bold ">
        Welcome to UnscriptedFiasco
      </h1>
      <section className="p-4 w-full md:w-1/2 ">
        <h2 className="text-2xl font-bold">Latest Blogs</h2>
        <div className="mt-14">
          {blogs.map((blog) => {
            return (
              <Link href={"/posts/" + blog.slug} passHref key={blog.slug}>
                <div className="relative">
                  <div className=" flex justify-between  border border-zinc-600 rounded-md bg-black p-4 relative z-20">
                    <div>
                      <h3 className="text-lg font-bold">{blog.meta.title}</h3>
                      <p className="text-gray-400">{blog.meta.description}</p>
                    </div>
                    <div className="my-auto text-gray-400">
                      <p>{blog.meta.date}</p>
                    </div>
                  </div>
                  <div className="absolute -inset-1 rounded-md blur-xl bg-gradient-to-br from-pink-500 via-cyan-500 to-violet-500 z-10"></div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

// <div className="relative">
// <div className="bg-black p-4 flex justify-between align-middle gap-2  border border-gray-400 rounded-md  relative z-2">
//   <div>
//     <h3 className="text-lg font-bold">{blog.meta.title}</h3>
//     <p className="text-gray-400">{blog.meta.description}</p>
//   </div>
//   <div className="my-auto text-gray-400">
//     <p>{blog.meta.date}</p>
//   </div>
// </div>
// <div className="absolute -inset-1 rounded-md blur-md bg-gradient-to-br from-pink-500 via-cyan-500 to-violet-500 z-10"></div>
// </div>
