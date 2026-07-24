import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Lengkapi data pengiriman dan pilih metode pembayaran untuk menyelesaikan pesanan hampers Anda.",
};

export default function CheckoutPage() {
  return (
    <div className="container-luxe py-12 lg:py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
          Checkout
        </p>
        <h1 className="mt-2 font-serif text-4xl text-brand">
          Selesaikan Pesanan
        </h1>
        <div className="gold-rule mt-4 w-24" />
      </div>
      <CheckoutForm />
    </div>
  );
}
