import { cn } from "@/lib/utils";

type ProductImageProps = {
  merek: string;
  kategori: string;
  kode: string;
  className?: string;
  /** Tampilkan keterangan bahwa foto asli belum tersedia */
  catatanPlaceholder?: boolean;
  /** Label sudut untuk membedakan sudut pandang pada galeri */
  tampilan?: string;
};

/**
 * Visual produk berbasis tipografi.
 * Belum memakai foto asli agar tidak menampilkan gambar buatan AI.
 * Ganti komponen ini dengan <Image /> saat foto produk resmi tersedia.
 */
export function ProductImage({
  merek,
  kategori,
  kode,
  className,
  catatanPlaceholder = false,
  tampilan,
}: ProductImageProps) {
  return (
    <div
      role="img"
      aria-label={`Pratinjau produk ${merek} kategori ${kategori}`}
      className={cn(
        "relative flex aspect-3/4 w-full flex-col items-center justify-center overflow-hidden bg-ivory-dark",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.9),transparent_62%)]"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/12 to-transparent"
      />
      <span
        aria-hidden
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink/5"
      />

      <span className="relative px-4 text-center font-display text-2xl font-black tracking-[0.14em] text-ink/80 uppercase">
        {merek}
      </span>
      <span className="label-eyebrow relative mt-3 text-ink-soft">
        {kategori}
      </span>

      <span className="absolute bottom-3 left-3 font-mono text-[10px] font-semibold tracking-[0.18em] text-ink-soft uppercase">
        {kode}
      </span>

      {tampilan ? (
        <span className="absolute top-3 left-3 font-mono text-[10px] font-semibold tracking-[0.16em] text-ink-soft uppercase">
          {tampilan}
        </span>
      ) : null}

      {catatanPlaceholder ? (
        <span className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.14em] text-ink-soft uppercase">
          Foto segera hadir
        </span>
      ) : null}
    </div>
  );
}
