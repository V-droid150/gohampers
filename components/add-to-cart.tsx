"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, MessageCircle, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cart";
import { formatRupiah, cn } from "@/lib/utils";
import { buildWaUrl, waProductMessage } from "@/lib/whatsapp";
import { Button, buttonClasses } from "@/components/ui/button";

export function AddToCart({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const unitPrice = product.price + variant.priceDiff;

  function handleAdd() {
    addItem({
      type: "product",
      productSlug: product.slug,
      name: product.name,
      variantName: product.variants.length > 1 ? variant.name : undefined,
      price: unitPrice,
      qty,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-6">
      {product.variants.length > 1 && (
        <div>
          <p className="mb-2 text-sm font-medium text-brand">Varian</p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Pilih varian">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={v.id === variantId}
                onClick={() => setVariantId(v.id)}
                className={cn(
                  "rounded-md border px-4 py-2.5 text-sm transition-colors",
                  v.id === variantId
                    ? "border-brand bg-brand text-cream"
                    : "border-brand/20 bg-white text-ink hover:border-gold"
                )}
              >
                {v.name}
                {v.priceDiff > 0 && (
                  <span className="ml-1 text-xs opacity-75">
                    +{formatRupiah(v.priceDiff)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-medium text-brand">Jumlah</p>
          <div className="flex items-center rounded-md border border-brand/20 bg-white">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center text-brand transition-colors hover:bg-brand/5 disabled:opacity-40"
              disabled={qty <= 1}
              aria-label="Kurangi jumlah"
            >
              <Minus className="h-4 w-4" aria-hidden />
            </button>
            <span className="w-10 text-center text-sm font-semibold" aria-live="polite">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="flex h-11 w-11 items-center justify-center text-brand transition-colors hover:bg-brand/5"
              aria-label="Tambah jumlah"
            >
              <Plus className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted">Total</p>
          <p className="font-serif text-2xl text-brand">
            {formatRupiah(unitPrice * qty)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="flex-1" onClick={handleAdd}>
          {added ? (
            <>
              <Check className="h-5 w-5" aria-hidden /> Masuk Keranjang
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" aria-hidden /> Tambah ke Keranjang
            </>
          )}
        </Button>
        <a
          href={buildWaUrl(
            waProductMessage(
              product,
              product.variants.length > 1 ? variant.name : undefined,
              qty
            )
          )}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("whatsapp", "lg", "flex-1")}
        >
          <MessageCircle className="h-5 w-5" aria-hidden /> Pesan via WhatsApp
        </a>
      </div>

      {added && (
        <button
          type="button"
          onClick={() => router.push("/cart")}
          className="text-sm font-medium text-gold-dark underline underline-offset-4"
        >
          Lihat keranjang →
        </button>
      )}
    </div>
  );
}
