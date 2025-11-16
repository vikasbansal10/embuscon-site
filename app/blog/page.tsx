// app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="max-w-5xl mx-auto px-4 py-16">
        <header className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-emerald-400">
            Embuscon Insights
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold">
            Blog & Thought Leadership
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl">
            Curated perspectives on Data Platforms, Agentic AI, BFSI controls and
            pragmatic digital transformation.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-6 hover:border-emerald-400/70 hover:bg-slate-900 transition"
            >
              <div className="flex flex-col gap-3 h-full">
                <div className="text-xs text-slate-400">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                <h2 className="text-lg md:text-xl font-semibold leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:text-emerald-400">
                    {post.title}
                  </Link>
                </h2>

                {post.subtitle && (
                  <p className="text-sm text-slate-300 line-clamp-3">
                    {post.subtitle}
                  </p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-slate-800 text-emerald-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-medium text-emerald-400"
                  >
                    Read article
                    <span className="ml-1">↗</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
