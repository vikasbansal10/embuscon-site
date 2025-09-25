import { allPosts, type Post } from "contentlayer2/generated";
import Link from "next/link";

export const metadata = { title: "Blog — Embuscon" };

export default function BlogIndex() {
  const posts = (allPosts as Post[])
    .filter((p: Post) => !p.draft)
    .sort((a: Post, b: Post) => (a.date < b.date ? 1 : -1));

  return (
    <div className="max-w-4xl mx-auto container-px py-12 space-y-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      {posts.length === 0 ? (
        <p className="opacity-80">No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((p: Post) => (
            <li key={p.slug} className="card p-5">
              <Link href={p.url} className="text-xl font-semibold hover:opacity-80">
                {p.title}
              </Link>
              <div className="mt-1 text-sm opacity-80">
                {new Date(p.date).toLocaleDateString()} • {p.readingTime}
              </div>
              {p.excerpt ? <p className="mt-2 opacity-90">{p.excerpt}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
