import { notFound } from "next/navigation";
import { allPosts, type Post } from "contentlayer2/generated";
import MDX from "@/components/MDX";

export const dynamicParams = false;

export function generateStaticParams() {
  return (allPosts as Post[])
    .filter((p) => !p.draft)
    .map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = (allPosts as Post[]).find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Embuscon`,
    description: post.excerpt ?? undefined,
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = (allPosts as Post[]).find((p) => p.slug === params.slug && !p.draft);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto container-px py-12 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="opacity-80 text-sm">
          {new Date(post.date).toLocaleDateString()} • {post.readingTime}
        </p>
      </header>

      {post.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover} alt="" className="rounded-2xl border border-brand-border" />
      ) : null}

      <MDX code={post.body.code} />
    </div>
  );
}
