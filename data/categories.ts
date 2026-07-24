import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "lebaran",
    name: "Lebaran",
    description:
      "Rangkaian hampers Idul Fitri yang hangat dan penuh makna — dari kurma premium hingga kue kering klasik.",
  },
  {
    slug: "natal-tahun-baru",
    name: "Natal & Tahun Baru",
    description:
      "Sambut akhir tahun dengan hampers bernuansa perayaan yang elegan dan menghangatkan.",
  },
  {
    slug: "wedding",
    name: "Wedding",
    description:
      "Door gift, bridesmaid box, hingga hantaran — dikemas anggun untuk hari paling istimewa.",
  },
  {
    slug: "corporate",
    name: "Corporate",
    description:
      "Apresiasi klien dan tim dengan hampers korporat yang berkelas, lengkap dengan opsi branding.",
  },
  {
    slug: "birthday",
    name: "Birthday",
    description:
      "Kejutan ulang tahun yang manis dan berkesan, dikurasi untuk segala usia.",
  },
];

export function getCategoryName(slug: string): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}
