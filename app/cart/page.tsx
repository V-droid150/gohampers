import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Keranjang Belanja",
  description: "Tinjau hampers pilihan Anda sebelum melanjutkan ke checkout.",
};

export default function CartPage() {
  return (
    <div className="container-luxe py-12 lg:py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
          Keranjang
        </p>
        <h1 className="mt-2 font-serif text-4xl text-brand">Keranjang Belanja</h1>
        <div className="gold-rule mt-4 w-24" />
      </div>
      <CartView />
    </div>
  );
}
