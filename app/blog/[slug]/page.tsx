// app/blog/[slug]/page.tsx
import React from 'react';

type Params = Promise<{ slug: string }>;

export default async function BlogPostPage(
  { params }: { params: Params }
) {
  const { slug } = await params;

  // TODO: fetch your post by slug
  // const post = await getPostBySlug(slug);
  // if (!post) notFound();

  return (
    <article className="prose mx-auto p-6">
      <h1>Post: {slug}</h1>
      {/* render content */}
    </article>
  );
}

export async function generateMetadata(
  { params }: { params: Params }
) {
  const { slug } = await params;
  return { title: `Blog – ${slug}` };
}

// If you pre-generate pages, return slugs here:
export function generateStaticParams() {
  // return (await getAllSlugs()).map(slug => ({ slug }));
  return [];
}
