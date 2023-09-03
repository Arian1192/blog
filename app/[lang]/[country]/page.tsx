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

  const dirBlog = lang && country === "es" ? "blog" : "enblog";

  try {
    const posts: string[] = fs.readdirSync(path.join(process.cwd(), dirBlog));

    const blogs: Post[] = posts.map((post) => {
      try {
        const postContent = fs.readFileSync(
          path.join(process.cwd(), dirBlog, post),
          "utf-8"
        );
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
      } catch (e) {
        console.error(`Error al leer el archivo ${post}: ${e}`);
        // Devolver un objeto de reemplazo en caso de error
        return {
          meta: {
            title: "Título predeterminado",
            description: "Descripción predeterminada",
            date: "Fecha predeterminada",
          },
          slug: "slug-predeterminado",
        };
      }
    });

    return (
      <main className="flex flex-col w-full h-screen justify-start items-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          {lang === "es"
            ? "Bienvenido a Unscripted Fiasco"
            : "Welcome to Unscripted Fiasco"}
        </h1>
        <section className="p-4 w-full md:w-1/2">
          <h2 className="text-2xl font-bold">
            {lang === "es"
              ? "Ultimas entradas al blog"
              : "Last blog entries"}
          </h2>
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
  } catch (error) {
    console.error(`Error al leer el directorio ${dirBlog}: ${error}`);
    // Puedes manejar este error de manera adecuada, por ejemplo, mostrando un mensaje de error en la página.
    return (
      <main className="flex flex-col w-full h-screen justify-start items-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          {lang === "es"
            ? "Bienvenido a Unscripted Fiasco"
            : "Welcome to Unscripted Fiasco"}
        </h1>
        <p>Error al cargar los blogs. Por favor, inténtalo de nuevo más tarde.</p>
      </main>
    );
  }
}
