import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "brand" | "outline";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-brand-dark",
  brand: "bg-brand text-cream",
  outline: "border border-gold text-gold-dark",
};

export function Badge({
  className,
  variant = "gold",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
