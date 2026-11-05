import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-sm border border-ink/25 bg-white px-4 py-2 text-base text-ink transition-colors",
        "placeholder:text-ink-soft/70",
        "focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-brand aria-invalid:outline-brand",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
