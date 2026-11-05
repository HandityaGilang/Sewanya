import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { ProductDetail } from "@/components/product-detail";
import { SectionHeading } from "@/components/section-heading";
import { getProdukBySlug, PRODUK_LIST } from "@/lib/data";

type ProdukPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUK_LIST.map((produk) => ({ slug: produk.slug }));
}

export async function generateMetadata({
  params,
}: ProdukPageProps): Promise<Metadata> {
  const { slug } = await params;
  const produk = getProdukBySlug(slug);

  if (!produk) {
    return { title: "Produk tidak ditemukan" };
  }

  return {
    title: produk.nama,
    description: produk.deskripsi,
  };
}

export default async function ProdukPage({ params }: ProdukPageProps) {
  const { slug } = await params;
  const produk = getProdukBySlug(slug);

  if (!produk) {
    notFound();
  }

  const sekategori = PRODUK_LIST.filter(
    (item) => item.kategori === produk.kategori && item.id !== produk.id,
  );
  const pelengkap = PRODUK_LIST.filter(
    (item) => item.kategori !== produk.kategori && item.featured,
  );
  const terkait = [...sekategori, ...pelengkap].slice(0, 4);

  return (
    <>
      <div className="border-b border-line bg-white">
        <nav
          aria-label="Breadcrumb"
          className="container-editorial py-5 text-sm text-ink-soft"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-brand">
                Beranda
              </Link>
            </li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li>
              <Link
                href="/katalog"
                className="transition-colors hover:text-brand"
              >
                Katalog
              </Link>
            </li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li>
              <Link
                href={{
                  pathname: "/katalog",
                  query: { kategori: produk.kategori },
                }}
                className="transition-colors hover:text-brand"
              >
                {produk.kategori}
              </Link>
            </li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li aria-current="page" className="text-ink">
              {produk.nama}
            </li>
          </ol>
        </nav>
      </div>

      <section className="container-editorial py-12 lg:py-16">
        <ProductDetail produk={produk} />
      </section>

      {terkait.length > 0 ? (
        <section className="border-t border-line bg-white">
          <div className="container-editorial py-16 lg:py-20">
            <SectionHeading
              eyebrow="Rekomendasi"
              title="Item lain yang mungkin Anda suka"
              href="/katalog"
              hrefLabel="Lihat katalog"
            />
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {terkait.map((item) => (
                <ProductCard key={item.id} produk={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
