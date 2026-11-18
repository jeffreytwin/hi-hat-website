export const usd = (n: number) => "$" + n.toLocaleString("en-US");
export const num = (n: number) => n.toLocaleString("en-US");

/** "$400s", "$900s", "1M+", "2M+" — the price buckets used by every filter. */
export function priceBucket(price: number): string {
  if (price >= 2_000_000) return "2M+";
  if (price >= 1_000_000) return "1M+";
  return `$${Math.floor(price / 100_000)}00s`;
}

export const PRICE_BUCKETS = [
  "$300s", "$400s", "$500s", "$600s", "$700s", "$800s", "$900s", "1M+", "2M+",
];

const bucketFloor = (b: string) =>
  b === "2M+" ? 2_000_000 : b === "1M+" ? 1_000_000 : parseInt(b.slice(1)) * 1000;
const bucketCeil = (b: string) =>
  b === "2M+" ? Infinity : b === "1M+" ? 1_999_999 : bucketFloor(b) + 99_999;

/** Does a [min,max] price range overlap the bucket? */
export function rangeInBucket(min: number, max: number, bucket: string) {
  return min <= bucketCeil(bucket) && max >= bucketFloor(bucket);
}

/** "$400s - $1M+" style label for a price range. */
export function priceRangeLabel(min: number, max: number) {
  const label = (p: number) => {
    const b = priceBucket(p);
    return b.startsWith("$") ? b : "$" + b;
  };
  const a = label(min).replace("+", "");
  const b = label(max);
  return a === b.replace("+", "") ? b : `${a} - ${b}`;
}

export function uniqueSorted<T extends string | number>(values: T[]): T[] {
  return [...new Set(values)].sort((x, y) =>
    typeof x === "number" && typeof y === "number"
      ? x - y
      : String(x).localeCompare(String(y)),
  );
}
