import type { Metadata } from "next";
import { OrderSuccess } from "@/components/order-success";

export const metadata: Metadata = {
  title: "Pesanan Berhasil",
  description: "Konfirmasi pesanan hampers Anda di Gohampers.",
  robots: { index: false },
};

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <div className="container-luxe py-12 lg:py-16">
      <OrderSuccess orderId={id} />
    </div>
  );
}
