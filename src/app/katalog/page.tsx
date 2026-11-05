import type { Metadata } from "next";
import { Suspense } from "react";

import { CatalogClient } from "@/components/catalog-client";

export const metadata: Metadata = {
  title: "Katalog",
  description:
    "Telusuri koleksi sewa SEWANYA.ID. Filter berdasarkan merek, kategori, ukuran, dan harga, lalu urutkan sesuai kebutuhan Anda.",
};

type KatalogPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function keArray(nilai: string | string[] | undefined): string[] {
  if (!nilai) return [];
  return Array.isArray(nilai) ? nilai : [nilai];
}

async function KatalogHasil({ searchParams }: KatalogPageProps) {
  const params = await searchParams;
  const kategori = keArray(params.kategori);
  const merek = keArray(params.merek);
  const query = keArray(params.q)[0] ?? "";

  return (
    <CatalogClient
      key={`${kategori.join("-")}|${merek.join("-")}|${query}`}
      initialKategori={kategori}
      initialMerek={merek}
      initialQuery={query}
    />
  );
}

function KatalogMemuat() {
  return (
    <div
      role="status"
      className="flex min-h-64 items-center justify-center border border-line bg-white text-sm text-ink-soft"
    >
      Memuat katalog…
    </div>
  );
}

export default function KatalogPage({ searchParams }: KatalogPageProps) {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="container-editorial py-12 lg:py-16">
          <p className="label-eyebrow text-brand">Katalog sewa</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.02] font-black tracking-tight sm:text-5xl">
            Semua koleksi yang siap Anda kenakan
          </h1>
          <p className="mt-5 max-w-2xl text-base text-ink-soft">
            Gunakan pencarian dan filter di bawah untuk menemukan item yang
            tepat. Harga yang tertera adalah biaya sewa untuk 3 hari dan belum
            termasuk deposit yang dapat dikembalikan.
          </p>
        </div>
      </section>

      <section className="container-editorial py-12 lg:py-16">
        <Suspense fallback={<KatalogMemuat />}>
          <KatalogHasil searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}
