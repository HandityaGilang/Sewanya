import Link from "next/link";
import { Heart, Star } from "lucide-react";

import { ProductImage } from "@/components/product-image";
import type { Produk } from "@/lib/data";
import { rupiah } from "@/lib/utils";

export function ProductCard({ produk }: { produk: Produk }) {
  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/produk/${produk.slug}`}
        className="flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <div className="relative aspect-[3/4] overflow-hidden border border-line bg-white">
          <ProductImage
            merek={produk.merek}
            kategori={produk.kategori}
            kode={produk.kode}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <span className="absolute top-3 left-3 bg-white/90 px-2 py-1 font-mono text-[9px] font-semibold tracking-[0.16em] text-ink uppercase">
            {produk.kategori}
          </span>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between gap-3">
            <p className="label-eyebrow text-[10px] text-ink-soft">
              {produk.merek}
            </p>
            <p className="flex items-center gap-1 text-[10px] font-semibold text-ink-soft">
              <Star className="size-3 fill-brand text-brand" />
              {produk.rating.toFixed(1)}
            </p>
          </div>

          <h3 className="mt-1.5 font-display text-base leading-snug font-bold transition-colors group-hover:text-brand">
            {produk.nama}
          </h3>

          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-sm font-bold">{rupiah(produk.hargaSewa)}</span>
            <span className="text-[10px] text-ink-soft">/ 3 hari</span>
          </div>
        </div>
      </Link>

      <button
        className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/80 text-ink-soft transition-colors hover:bg-white hover:text-brand"
        aria-label="Tambah ke wishlist"
      >
        <Heart className="size-4" />
      </button>
    </div>
  );
}
