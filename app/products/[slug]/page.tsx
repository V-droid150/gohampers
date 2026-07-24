import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Package, Truck } from "lucide-react";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { getCategoryName } from "@/data/categories";
import { formatRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/product-gallery";
import { AddToCart } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} — Centrepreneur`,
      description: product.shortDescription,
      images: [{ url: product.images[0], alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="container-luxe py-12 lg:py-16">
      <nav className="mb-8 text-sm text-muted" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-1.5">
          <li>
            <a href="/products" className="transition-colors hover:text-gold-dark">
              Katalog
            </a>
          </li>
          <li aria-hidden>/</li>
          <li>
            <a
              href={`/products?category=${product.category}`}
              className="transition-colors hover:text-gold-dark"
            >
              {getCategoryName(product.category)}
            </a>
          </li>
          <li aria-hidden>/</li>
          <li className="text-brand" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.isBestSeller && <Badge>Terlaris</Badge>}
            {product.stock <= 20 && (
              <Badge variant="outline">Stok terbatas: {product.stock}</Badge>
            )}
          </div>
          <h1 className="mt-3 font-serif text-3xl text-brand sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gold-dark">
            {getCategoryName(product.category)}
          </p>
          <p className="mt-4 font-serif text-3xl text-brand">
            {formatRupiah(product.price)}
          </p>
          <div className="gold-rule my-6" />
          <p className="leading-relaxed text-ink/85">{product.longDescription}</p>

          <div className="mt-6 rounded-lg border border-brand/10 bg-white p-5">
            <h2 className="flex items-center gap-2 font-serif text-lg text-brand">
              <Package className="h-5 w-5 text-gold-dark" aria-hidden />
              Isi Hampers
            </h2>
            <ul className="mt-3 grid gap-1.5 text-sm text-ink/85 sm:grid-cols-2">
              {product.contents.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <AddToCart product={product} />
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm text-muted">
            <Truck className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" aria-hidden />
            Dikirim dari Jakarta dengan kemasan pelindung berlapis. Same-day
            delivery tersedia untuk Jabodetabek; luar kota 1–3 hari kerja.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <SectionHeading
            eyebrow="Anda Mungkin Suka"
            title="Produk Terkait"
            align="left"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
