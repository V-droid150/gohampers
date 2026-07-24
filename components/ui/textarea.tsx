import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-24 w-full rounded-md border border-brand/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-gold focus:outline-none",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
