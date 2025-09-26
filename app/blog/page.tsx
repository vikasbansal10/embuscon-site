// app/blog/page.tsx
import Link from 'next/link';
// If you use Contentlayer:
import { allPosts } from 'contentlayer2/generated';

interface Post  {
  slug: string;
  title: string;
  date: string;
  description?: string;
  draft?: boolean;
};

function isPost(x: unknown): x is Post {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.slug === 'string' &&
    typeof o.title === 'string' &&
    typeof o.date === 'string'
  );
}

function normalize(input: unknown): Post[] {
  if (!Array.isArray(input)) return [];
  return input.filter(isPost).map(p => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    description: typeof p.description === 'string' ? p.description : undefined,
    draft: !!p.draft,
  }));
}

export default function BlogPage() {
  const posts = normalize(allPosts)
    .filter(p => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="container mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map(p => (
          <li key={p.slug} className="rounded-xl border p-5">
            <Link href={`/blog/${p.slug}`} className="text-xl font-semibold hover:opacity-80">
              {p.title}
            </Link>
            <div className="mt-1 text-sm opacity-80">
              {new Date(p.date).toLocaleDateString()}
            </div>
            {p.description ? <p className="mt-2">{p.description}</p> : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
