"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { getOrderById } from "@/lib/orders";
import { formatRupiah } from "@/lib/utils";
import { buildWaUrl, waOrderMessage } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/button";
import type { Order } from "@/types";

export function OrderSuccess({ orderId }: { orderId?: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (orderId) setOrder(getOrderById(orderId) ?? null);
    setLoaded(true);
  }, [orderId]);

  if (!loaded) {
    return (
      <div className="py-20 text-center text-muted" aria-busy="true">
        Memuat pesanan…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="rounded-lg border border-dashed border-brand/20 bg-white py-20 text-center">
        <p className="font-serif text-2xl text-brand">Pesanan tidak ditemukan</p>
        <p className="mt-2 text-sm text-muted">
          Nomor order tidak valid atau data sudah tidak tersimpan di perangkat ini.
        </p>
        <Link href="/products" className={buttonClasses("primary", "md", "mt-6")}>
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const c = order.customer;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" aria-hidden />
        <h1 className="mt-4 font-serif text-3xl text-brand sm:text-4xl">
          Terima Kasih, Pesanan Diterima
        </h1>
        <p className="mt-2 text-muted">
          Nomor order Anda:{" "}
          <span className="font-semibold text-brand">{order.id}</span>
        </p>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">
          Simpan nomor ini. Untuk mempercepat proses, kirimkan detail pesanan ke
          admin kami melalui tombol WhatsApp di bawah.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-gold/40 bg-white p-6 shadow-[0_2px_16px_rgba(20,52,43,0.06)]">
        <h2 className="font-serif text-xl text-brand">Ringkasan Pesanan</h2>
        <div className="gold-rule my-4" />
        <ul className="space-y-3 text-sm">
          {order.items.map((item) => (
            <li key={item.lineId}>
              <div className="flex justify-between gap-3">
                <span className="text-ink/85">
                  {item.name}
                  {item.variantName ? ` (${item.variantName})` : ""} × {item.qty}
                </span>
                <span className="shrink-0 font-medium text-brand">
                  {formatRupiah(item.price * item.qty)}
                </span>
              </div>
              {item.custom && (
                <p className="mt-0.5 text-xs text-muted">
                  Isi: {item.custom.itemNames.join(", ")} ·{" "}
                  {item.custom.packagingName} · {item.custom.ribbonName}
                </p>
              )}
            </li>
          ))}
        </ul>
        <div className="gold-rule my-4" />
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="font-medium text-brand">{formatRupiah(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Ongkir ({order.shipping.courierName})</dt>
            <dd className="font-medium text-brand">
              {formatRupiah(order.shipping.cost)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-brand">Total</dt>
            <dd className="font-serif text-xl text-brand">
              {formatRupiah(order.total)}
            </dd>
          </div>
        </dl>
        <div className="gold-rule my-4" />
        <div className="grid gap-1.5 text-sm text-ink/85">
          <p>
            <span className="text-muted">Pembayaran:</span>{" "}
            {order.payment.methodLabel} —{" "}
            <span className="font-medium text-green-700">
              {order.payment.status === "success" ? "Berhasil (simulasi)" : order.payment.status}
            </span>
          </p>
          <p>
            <span className="text-muted">Penerima:</span> {c.name} ({c.phone})
          </p>
          <p>
            <span className="text-muted">Alamat:</span> {c.address}, {c.district},{" "}
            {c.city}, {c.province} {c.postalCode}
          </p>
          <p>
            <span className="text-muted">Tanggal kirim:</span> {c.deliveryDate}
          </p>
          {c.cardMessage && (
            <p>
              <span className="text-muted">Kartu ucapan:</span> “{c.cardMessage}”
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={buildWaUrl(waOrderMessage(order))}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("whatsapp", "lg", "flex-1")}
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          Kirim Detail ke Admin
        </a>
        <Link href="/products" className={buttonClasses("outline", "lg", "flex-1")}>
          Belanja Lagi
        </Link>
      </div>
    </div>
  );
}
