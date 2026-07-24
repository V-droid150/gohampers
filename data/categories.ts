import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "idul-adha",
    name: "Idul Adha",
    description:
      "Hampers buah premium untuk merayakan Idul Adha — segar, elegan, dan penuh makna untuk keluarga maupun kolega.",
  },
  {
    slug: "christmas",
    name: "Christmas",
    description:
      "Rangkaian Natal yang hangat: buah pilihan, cokelat, dan sentuhan khas perayaan dalam kemasan berkelas.",
  },
];

export function getCategoryName(slug: string): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}
