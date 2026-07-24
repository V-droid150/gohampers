import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl text-brand sm:text-4xl">{title}</h2>
      <div
        className={cn(
          "gold-rule mt-4 w-24",
          align === "center" ? "mx-auto" : ""
        )}
      />
      {description && (
        <p className="mt-4 leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
