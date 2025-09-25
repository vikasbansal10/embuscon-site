"use client";
import { useMDXComponent } from "next-contentlayer2/hooks";

export default function MDX({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <article className="prose prose-neutral max-w-none dark:prose-invert">
      <Component />
    </article>
  );
}
