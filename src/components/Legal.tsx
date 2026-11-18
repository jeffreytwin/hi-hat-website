import type { ReactNode } from "react";

export function Legal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-[760px] px-5 py-12">
      <h1 className="display text-[26px] sm:text-[34px] text-brand-blue">{title}</h1>
      <p className="mt-3 border border-[#e6c35c] bg-[#fff4d6] px-4 py-2 text-[13.5px] text-[#6b4e00]">
        Draft template. Have this reviewed by your broker or attorney before launch.
      </p>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed [&_h2]:mt-6 [&_h2]:font-heading [&_h2]:text-[25px] [&_h2]:font-bold [&_h2]:text-brand-blue">
        {children}
      </div>
    </article>
  );
}
