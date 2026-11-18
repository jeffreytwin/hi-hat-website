import type { Metadata } from "next";
import Link from "next/link";
import { Scene } from "@/components/Scene";
import { getPosts } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `News, guides and insider tips about living in ${site.community}.`,
};

export default async function Page() {
  const posts = await getPosts();
  return (
    <section className="container-site py-12">
      <h1 className="display text-center text-[28px] text-brand-blue sm:text-[34px]">All Posts</h1>
      <ul className="mt-8 space-y-6">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/post/${p.slug}`} className="card grid sm:grid-cols-[320px_1fr]">
              <div className="aspect-[4/3] sm:aspect-auto"><Scene seed={p.scene} kind="land" /></div>
              <div className="p-6">
                <p className="text-[12.5px] text-ink-light">{new Date(p.date + "T12:00:00").toLocaleDateString("en-US", { dateStyle: "long" })}</p>
                <h2 className="heading mt-1 text-[24px] leading-tight">{p.title}</h2>
                <p className="mt-2 text-[14px]">{p.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
