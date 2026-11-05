import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
  tone?: "dark" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  hrefLabel = "Lihat semua",
  className,
  tone = "dark",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p
            className={cn(
              "label-eyebrow mb-3",
              tone === "light" ? "text-white/70" : "text-brand",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "font-display text-3xl leading-[1.05] font-black tracking-tight sm:text-4xl",
            tone === "light" ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 text-base",
              tone === "light" ? "text-white/75" : "text-ink-soft",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {href ? (
        <Link
          href={href}
          className={cn(
            "inline-flex items-center gap-2 text-sm font-semibold tracking-[0.1em] uppercase transition-colors",
            tone === "light"
              ? "text-white hover:text-brand-light"
              : "text-ink hover:text-brand",
          )}
        >
          {hrefLabel}
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
