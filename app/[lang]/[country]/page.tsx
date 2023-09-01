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

export default function Home({
  params,
}: {
  params: { lang: string; country: string };
}) {
  const { lang, country } = params;
  console.log(lang, country, "Estos son los params");

  const dirBlog = lang && country === "es" ? "ESblog" : "ENblog";

  const Post: string[] = fs.readdirSync(dirBlog);

  const blogs: Post[] = Post.map((post) => {
    const postContent = fs.readFileSync(path.join(dirBlog, post), "utf-8");
    const { data: frontMatter } = matter(postContent);
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
        {lang === "es" ? "Bienvenido a Unscripted Fiasco" : "Welcome to Unscripted Fiasco"}
      </h1>
      <section className="p-4 w-full md:w-1/2 ">
        <h2 className="text-2xl font-bold">{lang === "es" ? "Ultimas entradas al blog" : "Last blog entries"}</h2>
        <div className="mt-14">
          {blogs.map((blog) => {
            return (
              <Link href={`/posts/${blog.slug}`} passHref key={blog.slug}>
                <div className="relative">
                  <div className=" flex justify-between  border border-zinc-600 rounded-md bg-black p-4 relative z-20">
                    <div>
                      <h3 className="text-lg font-bold">{blog.meta.title}</h3>
                      <p className="text-gray-400">{blog.meta.description}</p>
                    </div>
                    <div className="my-auto text-gray-400">
                      <p className="text-xs md:text-base">{blog.meta.date}</p>
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

//TODO: Comprobar que el link que pasamos metamos los params de lang y country
//en el middleware si el idioma es el mismo que el idioma por defecto que quite el lang del link y si el pais es el mismo que el pais por defecto que quite el pais del link
//para evitar problemas de redireccionamiento si el usuario selecciona otro local
// la url debe ser completa.
