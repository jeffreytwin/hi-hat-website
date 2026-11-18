import type { ReactNode } from "react";
import { Scene } from "./Scene";

/** Full-width photo band + big blue title + intro, used at the top of most pages. */
export function PageHero({
  title,
  intro,
  seed,
  kind = "aerial",
  children,
}: {
  title: string;
  intro?: ReactNode;
  seed: number;
  kind?: "home" | "land" | "aerial";
  children?: ReactNode;
}) {
  return (
    <>
      <div className="h-[220px] overflow-hidden sm:h-[380px]">
        <Scene seed={seed} kind={kind} />
      </div>
      <section className="container-site py-10 text-center">
        <h1 className="display text-[26px] text-brand-blue sm:text-[34px]">{title}</h1>
        {intro && (
          <div className="mx-auto mt-4 max-w-[900px] space-y-4 font-nav text-[17px] leading-snug">
            {intro}
          </div>
        )}
        {children}
      </section>
    </>
  );
}

/** Line icon over a condensed blue heading — the section opener used everywhere. */
export function SectionHeading({
  icon,
  title,
  sub,
  light = false,
  id,
}: {
  icon?: ReactNode;
  title: string;
  sub?: ReactNode;
  light?: boolean;
  id?: string;
}) {
  return (
    <div id={id} className="scroll-mt-6 text-center">
      {icon && (
        <div className={`mx-auto mb-2 h-16 w-16 ${light ? "text-white" : "text-brand-blue"}`}>
          {icon}
        </div>
      )}
      <h2 className={`heading text-[27px] ${light ? "!text-white" : ""}`}>{title}</h2>
      {sub && <p className={`mt-1 text-[16px] ${light ? "text-white" : ""}`}>{sub}</p>}
    </div>
  );
}
