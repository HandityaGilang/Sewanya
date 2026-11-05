import Image from "next/image";

import type { Merek } from "@/lib/data";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  merek: Merek;
  className?: string;
  tone?: "dark" | "light";
};

/**
 * Logo merek resmi bila berkas tersedia di /public/brands.
 * Tanpa berkas logo, nama merek ditampilkan sebagai teks (fallback resmi).
 */
export function BrandLogo({ merek, className, tone = "dark" }: BrandLogoProps) {
  if (merek.logo) {
    return (
      <Image
        src={merek.logo}
        alt={`Logo ${merek.nama}`}
        width={132}
        height={36}
        className={cn("h-7 w-auto object-contain", className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "font-display text-lg font-bold tracking-[0.14em] whitespace-nowrap uppercase",
        tone === "light" ? "text-white/85" : "text-ink/75",
        className,
      )}
    >
      {merek.nama}
    </span>
  );
}
