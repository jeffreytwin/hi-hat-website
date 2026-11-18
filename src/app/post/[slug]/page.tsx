import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Scene } from "@/components/Scene";
import { getPost, getPosts } from "@/lib/data";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/post/[slug]">): Promise<Metadata> {
  const p = await getPost((await params).slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function Page({ params }: PageProps<"/post/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  return (
    <article className="mx-auto max-w-[760px] px-5 py-12">
      <p className="text-[13.5px] text-ink-light">{new Date(post.date + "T12:00:00").toLocaleDateString("en-US", { dateStyle: "long" })}</p>
      <h1 className="heading mt-1 text-[34px] leading-tight">{post.title}</h1>
      <div className="mt-6 aspect-[16/9]"><Scene seed={post.scene} kind="land" /></div>
      <div className="mt-6 space-y-4 text-[17px] leading-relaxed">
        {post.body.map((b) => (
          <div key={b.text}>
            {b.heading && <h2 className="heading mb-1 mt-6 text-[25px]">{b.heading}</h2>}
            <p>{b.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 flex flex-wrap gap-3">
        <Link href="/contact-us" className="btn">Join the Interest List</Link>
        <Link href="/blog" className="btn btn-outline">All Posts</Link>
      </p>
    </article>
  );
}
