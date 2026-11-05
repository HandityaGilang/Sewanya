import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Warna teks logo (bila memakai SVG/font), gunakan "light" di atas latar gelap */
  tone?: "dark" | "light";
  href?: string | null;
  /** Gunakan versi ikon (S) saja, biasanya untuk mobile atau footer minimalis */
  iconOnly?: boolean;
};

/**
 * Logo SEWANYA.ID menggunakan berkas gambar resmi.
 * Pastikan Sewanya.png dan Sewanya s.png tersedia di folder /public.
 */
export function Logo({
  className,
  tone = "dark",
  href = "/",
  iconOnly = false,
}: LogoProps) {
  const src = iconOnly ? "/Sewanya S.png" : "/Sewanya.png";

  const content = (
    <div className={cn("relative flex items-center", className)}>
      <Image
        src={src}
        alt="SEWANYA.ID"
        width={iconOnly ? 40 : 180}
        height={iconOnly ? 40 : 60}
        className={cn(
          "h-auto w-auto object-contain",
          tone === "light" && "brightness-0 invert",
        )}
        priority
      />
    </div>
  );

  if (!href) {
    return (
      <span className={cn("inline-flex", className)} aria-label="SEWANYA.ID">
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label="SEWANYA.ID — Beranda"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      {content}
    </Link>
  );
}
