import type { PaymentMethodId } from "@/types";

/**
 * Abstraksi payment provider.
 *
 * Saat ini berjalan dalam MODE SIMULASI: transaksi selalu sukses tanpa
 * memanggil layanan eksternal, agar alur checkout bisa diuji end-to-end.
 *
 * TODO integrasi Midtrans Snap:
 * 1. `npm install midtrans-client`
 * 2. Buat route handler `app/api/payment/route.ts` yang memanggil
 *    `snap.createTransaction()` memakai env var:
 *      MIDTRANS_SERVER_KEY=...        (server-only, JANGAN prefix NEXT_PUBLIC)
 *      NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=...
 *      MIDTRANS_IS_PRODUCTION=false
 * 3. Ganti `simulatedProvider` di bawah dengan provider yang memanggil
 *    route tersebut lalu buka Snap popup dengan token yang diterima.
 * 4. Tambahkan route webhook `app/api/payment/notification/route.ts`
 *    untuk menerima update status dari Midtrans (verifikasi signature key!).
 *
 * Alternatif Xendit: pola sama — buat Invoice via API server-side dengan
 * XENDIT_SECRET_KEY, lalu redirect ke `invoice_url` yang diterima.
 */

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  group: "Transfer Bank / Virtual Account" | "E-Wallet" | "QRIS";
}

export const paymentMethods: PaymentMethod[] = [
  { id: "va-bca", label: "BCA Virtual Account", group: "Transfer Bank / Virtual Account" },
  { id: "va-mandiri", label: "Mandiri Virtual Account", group: "Transfer Bank / Virtual Account" },
  { id: "va-bni", label: "BNI Virtual Account", group: "Transfer Bank / Virtual Account" },
  { id: "gopay", label: "GoPay", group: "E-Wallet" },
  { id: "ovo", label: "OVO", group: "E-Wallet" },
  { id: "dana", label: "DANA", group: "E-Wallet" },
  { id: "qris", label: "QRIS (semua aplikasi)", group: "QRIS" },
];

export function getPaymentMethodLabel(id: PaymentMethodId): string {
  return paymentMethods.find((m) => m.id === id)?.label ?? id;
}

export interface PaymentResult {
  status: "success" | "failed";
  transactionId: string;
}

export interface PaymentProvider {
  createTransaction(params: {
    orderId: string;
    amount: number;
    method: PaymentMethodId;
  }): Promise<PaymentResult>;
}

/** Provider simulasi — selalu sukses setelah jeda singkat */
const simulatedProvider: PaymentProvider = {
  async createTransaction({ orderId }) {
    await new Promise((r) => setTimeout(r, 800));
    return {
      status: "success",
      transactionId: `SIM-${orderId}-${Date.now().toString(36).toUpperCase()}`,
    };
  },
};

export function getPaymentProvider(): PaymentProvider {
  // TODO: kembalikan provider Midtrans/Xendit ketika env var tersedia.
  return simulatedProvider;
}
