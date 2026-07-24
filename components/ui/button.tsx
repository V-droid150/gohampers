import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand text-cream hover:bg-brand-light active:bg-brand-dark shadow-sm",
  gold: "bg-gold text-brand-dark hover:bg-gold-light active:bg-gold-dark shadow-sm",
  outline:
    "border border-gold text-brand hover:bg-gold/10 active:bg-gold/20",
  ghost: "text-brand hover:bg-brand/5 active:bg-brand/10",
  whatsapp: "bg-[#1faf5c] text-white hover:bg-[#25c268] active:bg-[#188f4b] shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-wide transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

/** Gaya tombol untuk dipakai pada <Link>/<a> agar tampil identik dengan Button */
export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-wide transition-colors duration-200",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}
