"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, cartSubtotal } from "@/store/cart";
import { formatRupiah } from "@/lib/utils";
import { buildWaUrl, waCartMessage } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function CartView() {
  const { items, note, updateQty, removeItem, setNote } = useCartStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Hindari mismatch hydration dengan localStorage
  if (!mounted) {
    return (
      <div className="py-20 text-center text-muted" aria-busy="true">
        Memuat keranjang…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-brand/20 bg-white py-20 text-center">
        <p className="font-serif text-2xl text-brand">Keranjang Anda masih kosong</p>
        <p className="mt-2 text-sm text-muted">
          Mulailah dari koleksi kami, atau rangkai hampers Anda sendiri.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/products" className={buttonClasses("primary")}>
            Jelajahi Katalog
          </Link>
          <Link href="/custom" className={buttonClasses("outline")}>
            Custom Hampers
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = cartSubtotal(items);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div>
        <ul className="divide-y divide-brand/10 rounded-lg border border-brand/10 bg-white">
          {items.map((item) => (
            <li key={item.lineId} className="flex gap-4 p-4 sm:p-5">
              <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-md bg-cream-dark sm:w-24">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {item.type === "product" && item.productSlug ? (
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="font-serif text-lg text-brand hover:text-brand-light"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <p className="font-serif text-lg text-brand">{item.name}</p>
                    )}
                    {item.variantName && (
                      <p className="text-xs text-muted">Varian: {item.variantName}</p>
                    )}
                    {item.custom && (
                      <p className="mt-1 line-clamp-2 text-xs text-muted">
                        Isi: {item.custom.itemNames.join(", ")} ·{" "}
                        {item.custom.packagingName} · {item.custom.ribbonName}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.lineId)}
                    className="rounded-md p-1.5 text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label={`Hapus ${item.name} dari keranjang`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </div>
                <div className="mt-auto flex items-end justify-between pt-3">
                  <div className="flex items-center rounded-md border border-brand/20">
                    <button
                      type="button"
                      onClick={() => updateQty(item.lineId, item.qty - 1)}
                      className="flex h-9 w-9 items-center justify-center text-brand transition-colors hover:bg-brand/5"
                      aria-label={`Kurangi jumlah ${item.name}`}
                    >
                      <Minus className="h-3.5 w-3.5" aria-hidden />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.lineId, item.qty + 1)}
                      className="flex h-9 w-9 items-center justify-center text-brand transition-colors hover:bg-brand/5"
                      aria-label={`Tambah jumlah ${item.name}`}
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </div>
                  <p className="font-semibold text-brand">
                    {formatRupiah(item.price * item.qty)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Label htmlFor="cart-note">Catatan untuk penjual (opsional)</Label>
          <Textarea
            id="cart-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Contoh: tolong sertakan bon terpisah, bungkus ekstra rapat, dsb."
            maxLength={300}
          />
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-lg border border-gold/40 bg-white p-6 shadow-[0_2px_16px_rgba(20,52,43,0.06)]">
          <h2 className="font-serif text-xl text-brand">Ringkasan Belanja</h2>
          <div className="gold-rule my-4" />
          <div className="flex justify-between text-sm">
            <span className="text-muted">
              Subtotal ({items.reduce((n, i) => n + i.qty, 0)} item)
            </span>
            <span className="font-semibold text-brand">{formatRupiah(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-muted">
            Ongkir dihitung di halaman checkout berdasarkan alamat tujuan.
          </p>
          <div className="mt-5 space-y-3">
            <Link href="/checkout" className={buttonClasses("primary", "lg", "w-full")}>
              Lanjut ke Checkout
            </Link>
            <a
              href={buildWaUrl(waCartMessage(items, subtotal, note || undefined))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("whatsapp", "lg", "w-full")}
            >
              <MessageCircle className="h-5 w-5" aria-hidden /> Checkout via
              WhatsApp
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
