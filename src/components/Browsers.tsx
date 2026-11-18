"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import type { NameMaps } from "@/lib/data";
import { PRICE_BUCKETS, priceBucket, rangeInBucket, uniqueSorted } from "@/lib/format";
import { AMENITIES, type AmenityKey, type FloorPlan, type Listing, type Neighborhood } from "@/lib/types";
import { FloorPlanCard, ListingCard, NeighborhoodCompareCard } from "./Cards";

const ALL = "All";

function Select({ label, value, onChange, options, light }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: (string | [value: string, label: string])[];
  light?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={`field-label ${light ? "text-white" : "text-brand-green"}`}>{label}</label>
      <select id={id} className="field !h-[30px] !text-[13px]" value={value} onChange={(e) => onChange(e.target.value)}>
        <option>{ALL}</option>
        {options.map((o) => {
          const [v, l] = typeof o === "string" ? [o, o] : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </div>
  );
}

function FilterGrid({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className={`mx-auto mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2 ${wide ? "max-w-[830px]" : "max-w-[560px]"}`}>
      {children}
    </div>
  );
}

function Results<T>({ items, render, pageSize = 6, empty }: {
  items: T[];
  render: (item: T) => ReactNode;
  pageSize?: number;
  empty: string;
}) {
  const [shown, setShown] = useState(pageSize);
  if (items.length === 0) {
    return <p role="status" className="mx-auto mt-10 max-w-md text-center text-[15px]">{empty}</p>;
  }
  return (
    <>
      <p role="status" className="sr-only">{items.length} results</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.slice(0, shown).map(render)}</div>
      {items.length > shown && (
        <div className="mt-6 text-center">
          <button className="btn btn-outline" onClick={() => setShown(shown + pageSize)}>load more</button>
        </div>
      )}
    </>
  );
}

const sortBuckets = (values: string[]) => PRICE_BUCKETS.filter((b) => values.includes(b));
const garageLabel = (g: number) => `${g} Car`;

/* ---------------------------------------------------------------- floor plans */

type PlanFilter = "homeType" | "beds" | "builder" | "garage" | "price" | "amenity" | "neighborhood";

export function FloorPlanBrowser({ plans, names, neighborhoodAmenities = {}, filters, light, pageSize }: {
  plans: FloorPlan[];
  names: NameMaps;
  neighborhoodAmenities?: Record<string, AmenityKey[]>;
  filters: PlanFilter[];
  light?: boolean;
  pageSize?: number;
}) {
  const [f, setF] = useState<Record<PlanFilter, string>>({
    homeType: ALL, beds: ALL, builder: ALL, garage: ALL, price: ALL, amenity: ALL, neighborhood: ALL,
  });
  const [qmi, setQmi] = useState(false);
  const set = (k: PlanFilter) => (v: string) => setF({ ...f, [k]: v });

  const results = useMemo(
    () =>
      plans.filter(
        (p) =>
          (f.homeType === ALL || p.homeType === f.homeType) &&
          (f.beds === ALL || String(p.beds) === f.beds) &&
          (f.builder === ALL || p.builder === f.builder) &&
          (f.garage === ALL || String(p.garage) === f.garage) &&
          (f.price === ALL || priceBucket(p.price) === f.price) &&
          (f.neighborhood === ALL || p.neighborhood === f.neighborhood) &&
          (f.amenity === ALL || neighborhoodAmenities[p.neighborhood]?.includes(f.amenity as AmenityKey)) &&
          (!qmi || p.quickMoveIn),
      ),
    [plans, f, qmi, neighborhoodAmenities],
  );

  const controls: Record<PlanFilter, ReactNode> = {
    homeType: <Select key="homeType" light={light} label="Home Type" value={f.homeType} onChange={set("homeType")} options={uniqueSorted(plans.map((p) => p.homeType))} />,
    beds: <Select key="beds" light={light} label="Bedrooms" value={f.beds} onChange={set("beds")} options={uniqueSorted(plans.map((p) => p.beds)).map(String)} />,
    builder: <Select key="builder" light={light} label="Builder" value={f.builder} onChange={set("builder")} options={uniqueSorted(plans.map((p) => p.builder)).map((b) => [b, names.builders[b]])} />,
    garage: <Select key="garage" light={light} label="Garage Size" value={f.garage} onChange={set("garage")} options={uniqueSorted(plans.map((p) => p.garage)).map((g) => [String(g), garageLabel(g)])} />,
    price: <Select key="price" light={light} label="Price Range" value={f.price} onChange={set("price")} options={sortBuckets(plans.map((p) => priceBucket(p.price)))} />,
    amenity: <Select key="amenity" light={light} label="Neighborhood Amenities" value={f.amenity} onChange={set("amenity")} options={AMENITIES.map(([k, l]) => [k, l])} />,
    neighborhood: <Select key="neighborhood" light={light} label="Neighborhood" value={f.neighborhood} onChange={set("neighborhood")} options={uniqueSorted(plans.map((p) => p.neighborhood)).map((n) => [n, names.neighborhoods[n]])} />,
  };

  return (
    <>
      <FilterGrid wide={filters.length > 4}>
        {filters.map((k) => controls[k])}
        <div>
          <span className={`field-label ${light ? "text-white" : "text-brand-green"}`} title="Homes that are finished or under construction and can close soon">
            Quick Move-In Homes
          </span>
          <label className={`flex h-[30px] items-center gap-3 font-nav text-[14px] ${light ? "text-white" : ""}`}>
            <input type="checkbox" className="h-[18px] w-[18px]" checked={qmi} onChange={(e) => setQmi(e.target.checked)} />
            See Quick Move-Ins Only
          </label>
        </div>
      </FilterGrid>
      <Results
        key={JSON.stringify(f) + qmi}
        items={results}
        pageSize={pageSize}
        empty="No floor plans match those filters yet. Try widening your search."
        render={(p) => <FloorPlanCard key={p.slug} plan={p} names={names} />}
      />
    </>
  );
}

/* ------------------------------------------------------------------- listings */

type ListingFilter = "homeType" | "beds" | "baths" | "garage" | "price" | "neighborhood";

export function ListingBrowser({ listings, names, neighborhoodAmenityLabels, filters, light, pageSize, bandBackground, bandHeading }: {
  listings: Listing[];
  names: NameMaps;
  neighborhoodAmenityLabels: Record<string, string[]>;
  filters: ListingFilter[];
  light?: boolean;
  pageSize?: number;
  /** When given, the filters sit on a full-width photo band with results below it. */
  bandBackground?: ReactNode;
  bandHeading?: ReactNode;
}) {
  const [f, setF] = useState<Record<ListingFilter, string>>({
    homeType: ALL, beds: ALL, baths: ALL, garage: ALL, price: ALL, neighborhood: ALL,
  });
  const set = (k: ListingFilter) => (v: string) => setF({ ...f, [k]: v });

  const matches = useMemo(
    () =>
      listings.filter(
        (l) =>
          (f.homeType === ALL || l.homeType === f.homeType) &&
          (f.beds === ALL || String(l.beds) === f.beds) &&
          (f.baths === ALL || String(l.baths) === f.baths) &&
          (f.garage === ALL || String(l.garage) === f.garage) &&
          (f.price === ALL || priceBucket(l.price) === f.price) &&
          (f.neighborhood === ALL || l.neighborhood === f.neighborhood),
      ),
    [listings, f],
  );

  const controls: Record<ListingFilter, ReactNode> = {
    homeType: <Select key="homeType" light={light} label="Home Type" value={f.homeType} onChange={set("homeType")} options={uniqueSorted(listings.map((l) => l.homeType))} />,
    price: <Select key="price" light={light} label="Price Range" value={f.price} onChange={set("price")} options={sortBuckets(listings.map((l) => priceBucket(l.price)))} />,
    beds: <Select key="beds" light={light} label="Bedrooms" value={f.beds} onChange={set("beds")} options={uniqueSorted(listings.map((l) => l.beds)).map(String)} />,
    baths: <Select key="baths" light={light} label="Bathrooms" value={f.baths} onChange={set("baths")} options={uniqueSorted(listings.map((l) => l.baths)).map(String)} />,
    garage: <Select key="garage" light={light} label="Garages" value={f.garage} onChange={set("garage")} options={uniqueSorted(listings.map((l) => l.garage)).map((g) => [String(g), garageLabel(g)])} />,
    neighborhood: <Select key="neighborhood" light={light} label="Neighborhood" value={f.neighborhood} onChange={set("neighborhood")} options={uniqueSorted(listings.map((l) => l.neighborhood)).map((n) => [n, names.neighborhoods[n]])} />,
  };

  const filterGrid = <FilterGrid wide={filters.length > 4}>{filters.map((k) => controls[k])}</FilterGrid>;
  const results = (
    <Results
      key={JSON.stringify(f)}
      items={matches}
      pageSize={pageSize}
      empty="No homes match those filters right now. Try widening your search."
      render={(l) => (
        <ListingCard key={l.slug} listing={l} names={names} amenities={neighborhoodAmenityLabels[l.neighborhood] ?? []} />
      )}
    />
  );

  if (!bandBackground) return <>{filterGrid}{results}</>;
  return (
    <>
      <section className="relative">
        <div className="absolute inset-0">{bandBackground}</div>
        <div className="brand-wash-blue relative px-5 pb-14 pt-12">
          {bandHeading}
          {filterGrid}
        </div>
      </section>
      <section className="container-site pb-16">{results}</section>
    </>
  );
}

/* -------------------------------------------------------------- neighborhoods */

export type NeighborhoodFacets = Record<string, { beds: number[]; baths: number[]; garages: number[] }>;

export function NeighborhoodBrowser({ neighborhoods, facets, full = false }: {
  neighborhoods: Neighborhood[];
  facets?: NeighborhoodFacets;
  /** Show all six filters (Neighborhoods page) rather than two (Amenities page). */
  full?: boolean;
}) {
  const [f, setF] = useState({ price: ALL, amenity: ALL, beds: ALL, baths: ALL, homeType: ALL, garage: ALL });
  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v });
  const all = Object.values(facets ?? {});

  const results = neighborhoods.filter((n) => {
    const nf = facets?.[n.slug];
    return (
      (f.price === ALL || rangeInBucket(n.priceMin, n.priceMax, f.price)) &&
      (f.amenity === ALL || n.amenities.includes(f.amenity as AmenityKey)) &&
      (f.homeType === ALL || n.homeTypes.includes(f.homeType)) &&
      (f.beds === ALL || nf?.beds.includes(Number(f.beds))) &&
      (f.baths === ALL || nf?.baths.includes(Number(f.baths))) &&
      (f.garage === ALL || nf?.garages.includes(Number(f.garage)))
    );
  });

  return (
    <>
      <FilterGrid wide={full}>
        {!full && <Select label="Amenities" value={f.amenity} onChange={set("amenity")} options={AMENITIES.map(([k, l]) => [k, l])} />}
        <Select label="Price Range" value={f.price} onChange={set("price")} options={PRICE_BUCKETS.filter((b) => neighborhoods.some((n) => rangeInBucket(n.priceMin, n.priceMax, b)))} />
        {full && (
          <>
            <Select label="Amenities" value={f.amenity} onChange={set("amenity")} options={AMENITIES.map(([k, l]) => [k, l])} />
            <Select label="Bedrooms" value={f.beds} onChange={set("beds")} options={uniqueSorted(all.flatMap((x) => x.beds)).map(String)} />
            <Select label="Bathrooms" value={f.baths} onChange={set("baths")} options={uniqueSorted(all.flatMap((x) => x.baths)).map(String)} />
            <Select label="Home Type" value={f.homeType} onChange={set("homeType")} options={uniqueSorted(neighborhoods.flatMap((n) => n.homeTypes))} />
            <Select label="Garage Size" value={f.garage} onChange={set("garage")} options={uniqueSorted(all.flatMap((x) => x.garages)).map((g) => [String(g), garageLabel(g)])} />
          </>
        )}
      </FilterGrid>
      <Results
        key={JSON.stringify(f)}
        items={results}
        pageSize={9}
        empty="No neighborhoods match those filters. Try widening your search."
        render={(n) => <NeighborhoodCompareCard key={n.slug} n={n} />}
      />
    </>
  );
}
