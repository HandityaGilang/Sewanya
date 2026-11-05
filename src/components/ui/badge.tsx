import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-sm px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-brand text-white",
        dark: "bg-ink text-white",
        outline: "border border-ink/25 text-ink",
        muted: "bg-ivory-dark text-ink",
        light: "bg-white/90 text-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
