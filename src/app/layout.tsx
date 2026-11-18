import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: `Compare neighborhoods, explore amenities and find homes for sale and new construction floor plans in ${site.community}, ${site.region}.`,
  openGraph: { siteName: site.name, type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2">
          Skip to Main Content
        </a>
        {site.previewData && (
          <p className="bg-[#fff4d6] px-4 py-1.5 text-center text-[12.5px] text-[#6b4e00]">
            Preview site: {site.community} neighborhoods open in 2027. The neighborhoods,
            builders, floor plans and listings shown here are placeholders for design purposes.
          </p>
        )}
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
