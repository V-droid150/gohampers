import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-md border border-brand/20 bg-white px-4 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-gold focus:outline-none",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
