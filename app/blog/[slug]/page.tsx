// app/blog/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

interface PageParams {
  slug: string;
}

interface PageProps {
  params: Promise<PageParams>; // 🔴 this matches Next's current expectation
}

export default async function BlogPostPage({ params }: PageProps) {
  // because params is a Promise, we must await it
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="prose prose-invert mx-auto px-4 py-10">
      <p className="text-xs tracking-[0.25em] uppercase text-emerald-400">
        Embuscon Blog
      </p>

      <h1 className="mt-2 text-3xl md:text-4xl font-semibold">{post.title}</h1>

      {post.subtitle && (
        <p className="mt-3 text-sm md:text-base text-slate-300">
          {post.subtitle}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
        <span>{formattedDate}</span>
        {post.author && (
          <>
            <span>•</span>
            <span>By {post.author}</span>
          </>
        )}
        {post.tags && post.tags.length > 0 && (
          <>
            <span>•</span>
            <span>{post.tags.join(" • ")}</span>
          </>
        )}
      </div>

      {/* ✅ Cover image render */}
      {post.coverImageUrl && (
        <div className="mt-6 mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <hr className="my-6 border-slate-800" />

      {/* Very simple paragraph rendering from content */}
      {post.content
        .trim()
        .split("\n")
        .map((para, idx) =>
          para.trim() ? (
            <p key={idx} className="mb-4">
              {para.trim()}
            </p>
          ) : (
            <br key={idx} />
          )
        )}
    </article>
  );
}

// 👇 Keep same PageProps shape for metadata
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog – Embuscon",
    };
  }

  return {
    title: `${post.title} | Embuscon Blog`,
    description: post.subtitle ?? post.content.slice(0, 140),
  };
}

// Static params for SSG
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}
