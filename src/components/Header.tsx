import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { getMember } from "@/lib/auth";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Icons";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
      <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0 sm:h-[68px] sm:w-[68px]" aria-hidden="true">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3b9fd3" />
            <stop offset="1" stopColor="#62cf82" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="32" fill="url(#logo-g)" />
        <g fill="none" stroke="#fff" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
          <path d="M17 30 32 17l15 13v17H17Z" />
          {/* a hat brim and crown inside the house, for "Hi Hat" */}
          <path d="M23 40h18M27 40v-6q5-3 10 0v6" />
        </g>
      </svg>
      <span className="leading-tight">
        <span className="block font-nav text-[17px] font-medium uppercase tracking-[0.14em] text-brand-green sm:text-[19px]">
          {site.name}
        </span>
        <span className="block max-w-[230px] font-display text-[9px] font-extrabold uppercase tracking-[0.16em] text-brand-blue sm:text-[10px]">
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}

export async function Header() {
  const member = await getMember();
  return (
    <header className="bg-white">
      <div className="container-site flex flex-wrap items-center justify-between gap-4 py-3">
        <Logo />
        <Link
          href="/connect-with-a-realtor"
          className="flex items-center gap-3 bg-brand-green px-5 py-3 font-sans text-[15px] text-white underline underline-offset-2 hover:bg-[#51c173]"
        >
          <PhoneIcon className="h-6 w-6" />
          Contact our real estate agents!
        </Link>
      </div>
      <nav aria-label="Main" className="container-site">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-1 py-4 font-nav text-[15px] text-brand-blue sm:justify-around sm:gap-x-4 sm:px-16">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="py-2 hover:text-brand-green">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            {member ? (
              <form action={signOut}>
                <button className="cursor-pointer py-2 hover:text-brand-green" title={`Signed in as ${member.email}`}>
                  Log Out
                </button>
              </form>
            ) : (
              <Link href="/login" className="py-2 hover:text-brand-green">
                Log In
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
