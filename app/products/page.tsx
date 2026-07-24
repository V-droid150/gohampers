import type { Metadata } from "next";
import { products } from "@/data/products";
import { Catalog } from "@/components/catalog";

export const metadata: Metadata = {
  title: "Katalog Hampers",
  description:
    "Jelajahi koleksi hampers buah premium Centrepreneur untuk Idul Adha dan Christmas. Filter berdasarkan kategori, harga, dan momen.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <div className="container-luxe py-12 lg:py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
          Katalog
        </p>
        <h1 className="mt-2 font-serif text-4xl text-brand">Koleksi Hampers</h1>
        <div className="gold-rule mt-4 w-24" />
      </div>
      <Catalog products={products} initialCategory={category} />
    </div>
  );
}
