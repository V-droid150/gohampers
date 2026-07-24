import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { getCategoryName } from "@/data/categories";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-lg border border-brand/10 bg-white shadow-[0_2px_16px_rgba(20,52,43,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(20,52,43,0.14)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
        <Image
          src={product.images[0]}
          alt={`Hampers ${product.name} — ${getCategoryName(product.category)}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isBestSeller && (
          <Badge className="absolute left-3 top-3">Terlaris</Badge>
        )}
      </div>
      <div className="p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
          {getCategoryName(product.category)}
        </p>
        <h3 className="mt-1 font-serif text-lg text-brand transition-colors group-hover:text-brand-light">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          {product.shortDescription}
        </p>
        <p className="mt-3 text-base font-semibold text-brand">
          {formatRupiah(product.price)}
        </p>
      </div>
    </Link>
  );
}
