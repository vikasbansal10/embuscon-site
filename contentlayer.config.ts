import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date:  { type: "date",   required: true },
    excerpt: { type: "string" },
    tags:  { type: "list", of: { type: "string" } },
    draft: { type: "string", required: false },
    cover: { type: "string" } // e.g. /blog/cover.jpg
  },
  computedFields: {
    slug: { type: "string", resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx?$/, "") },
    url:  { type: "string", resolve: (doc) => `/blog/${doc._raw.sourceFileName.replace(/\.mdx?$/, "")}` },
    readingTime: { type: "string", resolve: (doc) => readingTime(doc.body.raw).text },
     isDraft: {
    type: "boolean",
    resolve: (doc) => /^(true|1)$/i.test(String(doc.draft ?? "").trim()),
  },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append" }]],
  },
});
