import type { AmenityKey } from "@/lib/types";
import type { ReactNode, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function Svg({ children, ...p }: P & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      {children}
    </svg>
  );
}

const AMENITY_PATHS: Record<AmenityKey, ReactNode> = {
  clubhouse: <><path d="M8 20 24 9l16 11" /><rect x="11" y="20" width="26" height="19" /><rect x="20" y="28" width="8" height="11" /><path d="M5 39h38" /></>,
  pool: <><path d="M16 30V12a4 4 0 0 1 8 0M28 30V12a4 4 0 0 1 8 0M16 18h12M16 24h12" /><path d="M6 34q4-4 8 0t8 0 8 0 8 0 4-2M6 40q4-4 8 0t8 0 8 0 8 0 4-2" /></>,
  fitness: <><path d="M6 24h36M11 16v16M16 12v24M32 12v24M37 16v16" /></>,
  spa: <><path d="M24 40c-9-3-13-10-13-18 6 1 10 5 13 11 3-6 7-10 13-11 0 8-4 15-13 18Z" /><path d="M24 30c-2-7-1-14 0-20 1 6 2 13 0 20Z" /></>,
  lifestyle: <><circle cx="16" cy="13" r="4" /><circle cx="32" cy="13" r="4" /><path d="M8 38V27a8 8 0 0 1 16 0 8 8 0 0 1 16 0v11" /></>,
  trails: <><circle cx="26" cy="9" r="3.5" /><path d="m26 15-5 9 6 6v11M21 24l-6 3-2 8M26 17l7 5 4-1M21 30l-4 11" /></>,
  dogPark: <><path d="M10 20c0-5 4-8 8-8l4 4h8l5-5 2 7c2 2 3 4 3 7 0 8-6 13-14 13h-4c-7 0-12-6-12-12Z" /><circle cx="19" cy="24" r="1.2" /><circle cx="30" cy="24" r="1.2" /><path d="M22 31q2.5 2 5 0" /></>,
  playground: <><path d="M8 40 17 10l9 30M30 40V14h10v26M12 28h10M30 22h10M30 30h10" /><path d="M26 40c6-2 6-10 12-12" /></>,
  golf: <><path d="M18 40V8l16 7-16 7" /><path d="M8 40q10-6 20 0t14-2" /><circle cx="32" cy="34" r="2" /></>,
  tennis: <><circle cx="19" cy="19" r="11" /><path d="M11 12q8 7 0 15M27 12q-8 7 0 15M27 27l13 13" /></>,
  pickleball: <><rect x="10" y="6" width="18" height="24" rx="8" /><path d="M19 30v12" /><circle cx="36" cy="32" r="6" /><path d="M34 31h.01M38 31h.01M36 35h.01" /></>,
  bocce: <><circle cx="17" cy="28" r="10" /><circle cx="34" cy="32" r="6" /><circle cx="36" cy="14" r="3" /><path d="M10 25q7-4 14 0" /></>,
  maintenance: <><path d="M8 40h32M12 40V24h10v16" /><path d="M10 24 17 14l7 10" /><path d="M30 40V20M30 20q-6-2-5-9 6 1 5 9Zm0 0q6-2 5-9-6 1-5 9Z" /></>,
  gated: <><path d="M6 40V16M42 40V16M6 22h36M6 40h36M14 40V18M22 40V14M30 40V18M38 40V22" /><path d="M6 16q18-12 36 0" /></>,
  fiftyFive: <><circle cx="24" cy="24" r="17" /><path d="M18 17h-5v6c5-2 7 2 5 5-1 2-4 2-6 1M32 17h-5v6c5-2 7 2 5 5-1 2-4 2-6 1M36 21v6M33 24h6" /></>,
};

export function AmenityIcon({ name, ...p }: P & { name: AmenityKey }) {
  return <Svg {...p}>{AMENITY_PATHS[name]}</Svg>;
}

export const HomeIcon = (p: P) => (
  <Svg {...p}><path d="M6 24 24 9l18 15M11 21v18h26V21M20 39V28h8v11" /><path d="M2 39h44" strokeDasharray="5 4" /></Svg>
);
export const PlanIcon = (p: P) => (
  <Svg {...p}><path d="M8 10q4-3 8 0h24v28H16q-4-3-8 0Z" /><path d="M16 10v28M22 30l12-12v12Z" /></Svg>
);
export const TagIcon = (p: P) => (
  <Svg {...p}><path d="M10 14 24 6l14 8v26H10Z" /><circle cx="24" cy="13" r="2" /><path d="M28 22c-1-2-7-3-7 1s7 2 7 6-6 3-8 1M24 18v16" /></Svg>
);
export const StarIcon = (p: P) => (
  <Svg {...p}><path d="m24 6 5.5 11 12 1.8-8.8 8.5 2 12L24 33.5 13.300 39.300l2-12-8.8-8.5 12-1.8Z" /></Svg>
);
export const PinIcon = (p: P) => (
  <Svg {...p}><path d="M24 30c-6-7-9-11-9-15a9 9 0 0 1 18 0c0 4-3 8-9 15Z" /><path d="M20 15l4-3.5 4 3.5v5h-8Z" /><path d="M14 30 6 42h36l-8-12" /></Svg>
);
export const SchoolIcon = (p: P) => (
  <Svg {...p}><path d="M24 6v8M24 7h7v4h-7M10 40V22l14-8 14 8v18M6 40h36M20 40v-9h8v9M15 26h4M29 26h4" /></Svg>
);
export const AmenityCardIcon = (p: P) => (
  <Svg {...p}><rect x="12" y="6" width="18" height="30" rx="2" /><path d="M17 12h8M30 22c5 2 8 6 8 12l-6 8H22l-5-9c2-2 4-1 6 1V22" /></Svg>
);
export const PhoneIcon = (p: P) => (
  <Svg {...p}><path d="M14 6h6l3 9-4 3c2 5 6 9 11 11l3-4 9 3v6c0 3-2 5-5 5C19 39 9 29 9 11c0-3 2-5 5-5Z" /><path d="M29 8c6 1 10 5 11 11M30 14c3 1 4 2 5 5" /></Svg>
);
export const TourIcon = (p: P) => (
  <Svg {...p}><path d="M6 24c0-5 8-9 18-9s18 4 18 9-8 9-18 9c-3 0-6 0-8-1" /><path d="m18 28-4 4 4 4" /><rect x="17" y="6" width="14" height="12" rx="1" /></Svg>
);
