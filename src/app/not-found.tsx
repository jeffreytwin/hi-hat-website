import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-site py-24 text-center">
      <h1 className="display text-[30px] text-brand-blue">Page Not Found</h1>
      <p className="mt-4 font-nav text-[17px]">We couldn&rsquo;t find that page. It may have moved, or the home may no longer be available.</p>
      <p className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn">Go to Homepage</Link>
        <Link href="/homes-for-sale" className="btn btn-outline">Homes for Sale</Link>
      </p>
    </section>
  );
}
