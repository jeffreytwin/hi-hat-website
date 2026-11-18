import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthPanel } from "@/components/AuthPanel";
import { getMember, safeNext } from "@/lib/auth";

export const metadata: Metadata = { title: "Log In", robots: { index: false } };

export default async function Page({ searchParams }: PageProps<"/login">) {
  const sp = await searchParams;
  const next = safeNext(sp.next);
  if (await getMember()) redirect(next);
  return (
    <section className="bg-brand-cream px-4 py-16">
      <div className="mx-auto max-w-[456px] bg-white px-8 py-10 shadow-[0_4px_30px_rgb(0_0_0/0.14)]">
        <AuthPanel next={next} what="Homes & Floor Plans" socialError={sp.error === "social"} />
      </div>
    </section>
  );
}
