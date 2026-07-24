import { siteConfig } from "@/lib/site";
import { formatRupiah } from "@/lib/utils";
import type { CartItem, CustomSelection, Order, Product } from "@/types";

/** Bangun URL wa.me dengan pesan yang sudah di-encode */
export function buildWaUrl(message: string, number = siteConfig.whatsappNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Pesan untuk tombol "Pesan via WhatsApp" di halaman detail produk */
export function waProductMessage(product: Product, variantName?: string, qty = 1): string {
  const lines = [
    `Halo ${siteConfig.name}, saya ingin memesan:`,
    ``,
    `• ${product.name}${variantName ? ` — ${variantName}` : ""} (${qty}x)`,
    `  ${siteConfig.url}/products/${product.slug}`,
    ``,
    `Mohon info ketersediaan dan ongkirnya. Terima kasih!`,
  ];
  return lines.join("\n");
}

function cartLines(items: CartItem[]): string[] {
  return items.map((item) => {
    const variant = item.variantName ? ` — ${item.variantName}` : "";
    const base = `• ${item.name}${variant} (${item.qty}x @ ${formatRupiah(item.price)})`;
    if (item.type === "custom" && item.custom) {
      const c = item.custom;
      const detail = [
        `   Isi: ${c.itemNames.join(", ")}`,
        `   Packaging: ${c.packagingName}, ${c.ribbonName}`,
      ];
      if (c.cardMessage) detail.push(`   Kartu: "${c.cardMessage}"`);
      return [base, ...detail].join("\n");
    }
    return base;
  });
}

/** Pesan untuk checkout cepat via WhatsApp dari halaman keranjang */
export function waCartMessage(items: CartItem[], subtotal: number, note?: string): string {
  const lines = [
    `Halo ${siteConfig.name}, saya ingin memesan:`,
    ``,
    ...cartLines(items),
    ``,
    `Subtotal: ${formatRupiah(subtotal)}`,
  ];
  if (note) lines.push(`Catatan: ${note}`);
  lines.push(``, `Mohon info total + ongkir. Terima kasih!`);
  return lines.join("\n");
}

/** Pesan untuk custom hampers builder */
export function waCustomMessage(selection: CustomSelection, total: number): string {
  const lines = [
    `Halo ${siteConfig.name}, saya ingin memesan custom hampers:`,
    ``,
    `• ${selection.boxName}`,
    `• Isi: ${selection.itemNames.join(", ")}`,
    `• Packaging: ${selection.packagingName}`,
    `• ${selection.ribbonName}`,
  ];
  if (selection.recipientName) lines.push(`• Untuk: ${selection.recipientName}`);
  if (selection.senderName) lines.push(`• Dari: ${selection.senderName}`);
  if (selection.cardMessage) lines.push(`• Kartu ucapan: "${selection.cardMessage}"`);
  lines.push(``, `Estimasi total: ${formatRupiah(total)}`, ``, `Mohon konfirmasinya. Terima kasih!`);
  return lines.join("\n");
}

/** Pesan lengkap berisi detail order — dipakai di halaman konfirmasi pesanan */
export function waOrderMessage(order: Order): string {
  const c = order.customer;
  const lines = [
    `Halo ${siteConfig.name}, berikut detail pesanan saya:`,
    ``,
    `No. Order: ${order.id}`,
    ``,
    `PESANAN`,
    ...cartLines(order.items),
    ``,
    `Subtotal: ${formatRupiah(order.subtotal)}`,
    `Ongkir (${order.shipping.courierName}): ${formatRupiah(order.shipping.cost)}`,
    `Total: ${formatRupiah(order.total)}`,
    `Pembayaran: ${order.payment.methodLabel} (${order.payment.status === "success" ? "sudah dibayar — simulasi" : order.payment.status})`,
    ``,
    `PENGIRIMAN`,
    `Penerima: ${c.name} (${c.phone})`,
    `Alamat: ${c.address}, ${c.district}, ${c.city}, ${c.province} ${c.postalCode}`,
    `Tanggal kirim: ${c.deliveryDate}`,
  ];
  if (c.cardMessage) lines.push(`Kartu ucapan: "${c.cardMessage}"`);
  if (c.note) lines.push(`Catatan: ${c.note}`);
  lines.push(``, `Terima kasih!`);
  return lines.join("\n");
}
