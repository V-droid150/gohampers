"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Lock } from "lucide-react";
import { useCartStore, cartSubtotal } from "@/store/cart";
import { formatRupiah, generateOrderId, todayISO } from "@/lib/utils";
import { PROVINCES, getShippingChoice, getShippingOptions } from "@/lib/shipping";
import {
  getPaymentMethodLabel,
  getPaymentProvider,
  paymentMethods,
} from "@/lib/payment";
import { saveOrder } from "@/lib/orders";
import type { Order, PaymentMethodId } from "@/types";
import { Button, buttonClasses } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const checkoutSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  phone: z
    .string()
    .regex(/^(\+62|62|0)8\d{8,11}$/, "Gunakan format 08xx atau +628xx"),
  email: z.union([z.literal(""), z.email("Format email tidak valid")]).optional(),
  address: z.string().min(10, "Tulis alamat lengkap (jalan, nomor, RT/RW)"),
  province: z.string().min(1, "Pilih provinsi"),
  city: z.string().min(2, "Isi kota/kabupaten"),
  district: z.string().min(2, "Isi kecamatan"),
  postalCode: z.string().regex(/^\d{5}$/, "Kode pos 5 digit angka"),
  courierId: z.string().min(1, "Pilih kurir pengiriman"),
  deliveryDate: z
    .string()
    .min(1, "Pilih tanggal pengiriman")
    .refine((d) => d >= todayISO(), "Tanggal tidak boleh di masa lalu"),
  cardMessage: z.string().max(300).optional(),
  note: z.string().max(300).optional(),
  paymentMethod: z.enum(
    ["va-bca", "va-mandiri", "va-bni", "gopay", "ovo", "dana", "qris"],
    { error: "Pilih metode pembayaran" }
  ),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1 text-xs text-red-600">
      {message}
    </p>
  );
}

export function CheckoutForm() {
  const router = useRouter();
  const { items, note: cartNote, clear } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => setMounted(true), []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { note: "", courierId: "" },
  });

  const province = watch("province");
  const courierId = watch("courierId");
  const shippingOptions = province ? getShippingOptions(province) : [];
  const shipping = province ? getShippingChoice(courierId, province) : undefined;

  const subtotal = cartSubtotal(items);
  const total = subtotal + (shipping?.cost ?? 0);

  if (!mounted) {
    return (
      <div className="py-20 text-center text-muted" aria-busy="true">
        Memuat checkout…
      </div>
    );
  }

  if (items.length === 0 && !submitting) {
    return (
      <div className="rounded-lg border border-dashed border-brand/20 bg-white py-20 text-center">
        <p className="font-serif text-2xl text-brand">
          Tidak ada item untuk di-checkout
        </p>
        <p className="mt-2 text-sm text-muted">
          Tambahkan hampers ke keranjang terlebih dahulu.
        </p>
        <Link href="/products" className={buttonClasses("primary", "md", "mt-6")}>
          Jelajahi Katalog
        </Link>
      </div>
    );
  }

  async function onSubmit(values: CheckoutValues) {
    const chosenShipping = getShippingChoice(values.courierId, values.province);
    if (!chosenShipping) return;

    setSubmitting(true);
    try {
      const orderId = generateOrderId();
      const provider = getPaymentProvider();
      const payment = await provider.createTransaction({
        orderId,
        amount: total,
        method: values.paymentMethod,
      });

      const order: Order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        items,
        subtotal,
        shipping: {
          courierId: chosenShipping.id,
          courierName: chosenShipping.label,
          cost: chosenShipping.cost,
        },
        total: subtotal + chosenShipping.cost,
        customer: {
          name: values.name,
          phone: values.phone,
          email: values.email || undefined,
          address: values.address,
          province: values.province,
          city: values.city,
          district: values.district,
          postalCode: values.postalCode,
          deliveryDate: values.deliveryDate,
          cardMessage: values.cardMessage || undefined,
          note: values.note || cartNote || undefined,
        },
        payment: {
          method: values.paymentMethod,
          methodLabel: getPaymentMethodLabel(values.paymentMethod),
          status: payment.status,
          transactionId: payment.transactionId,
        },
      };

      saveOrder(order);
      clear();
      router.push(`/order/success?id=${orderId}`);
    } catch {
      setSubmitting(false);
    }
  }

  const groups = Array.from(new Set(paymentMethods.map((m) => m.group)));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-10 lg:grid-cols-[1fr_380px]"
      noValidate
    >
      <div className="space-y-10">
        {/* Data penerima */}
        <section>
          <h2 className="mb-4 font-serif text-xl text-brand">Data Penerima</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Nama lengkap *</Label>
              <Input id="name" {...register("name")} placeholder="Nama penerima" />
              <ErrorText message={errors.name?.message} />
            </div>
            <div>
              <Label htmlFor="phone">No. HP (WhatsApp) *</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="08xxxxxxxxxx"
              />
              <ErrorText message={errors.phone?.message} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email">Email (opsional)</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="nama@email.com"
              />
              <ErrorText message={errors.email?.message} />
            </div>
          </div>
        </section>

        {/* Alamat */}
        <section>
          <h2 className="mb-4 font-serif text-xl text-brand">Alamat Pengiriman</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="address">Alamat lengkap *</Label>
              <Textarea
                id="address"
                {...register("address")}
                placeholder="Nama jalan, nomor rumah, RT/RW, patokan"
              />
              <ErrorText message={errors.address?.message} />
            </div>
            <div>
              <Label htmlFor="province">Provinsi *</Label>
              <Select
                id="province"
                {...register("province", {
                  onChange: () => setValue("courierId", ""),
                })}
                defaultValue=""
              >
                <option value="" disabled>
                  Pilih provinsi
                </option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
              <ErrorText message={errors.province?.message} />
            </div>
            <div>
              <Label htmlFor="city">Kota / Kabupaten *</Label>
              <Input id="city" {...register("city")} placeholder="mis. Jakarta Selatan" />
              <ErrorText message={errors.city?.message} />
            </div>
            <div>
              <Label htmlFor="district">Kecamatan *</Label>
              <Input id="district" {...register("district")} placeholder="mis. Kebayoran Baru" />
              <ErrorText message={errors.district?.message} />
            </div>
            <div>
              <Label htmlFor="postalCode">Kode pos *</Label>
              <Input
                id="postalCode"
                inputMode="numeric"
                maxLength={5}
                {...register("postalCode")}
                placeholder="12345"
              />
              <ErrorText message={errors.postalCode?.message} />
            </div>
          </div>
        </section>

        {/* Pengiriman */}
        <section>
          <h2 className="mb-4 font-serif text-xl text-brand">Kurir & Jadwal</h2>
          {!province && (
            <p className="rounded-md bg-gold/10 px-4 py-3 text-sm text-gold-dark">
              Pilih provinsi terlebih dahulu untuk melihat pilihan kurir dan tarifnya.
            </p>
          )}
          {province && (
            <div
              className="space-y-2"
              role="radiogroup"
              aria-label="Pilihan kurir"
            >
              {shippingOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 rounded-md border bg-white px-4 py-3.5 text-sm transition-colors",
                    courierId === opt.id ? "border-gold bg-gold/5" : "border-brand/10 hover:border-gold/50"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      value={opt.id}
                      {...register("courierId")}
                      className="h-4 w-4 accent-[#14342b]"
                    />
                    <span>
                      <span className="font-medium text-brand">{opt.label}</span>
                      <span className="block text-xs text-muted">{opt.eta}</span>
                    </span>
                  </span>
                  <span className="font-semibold text-brand">
                    {formatRupiah(opt.cost)}
                  </span>
                </label>
              ))}
            </div>
          )}
          <ErrorText message={errors.courierId?.message} />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="deliveryDate">Tanggal pengiriman diinginkan *</Label>
              <Input
                id="deliveryDate"
                type="date"
                min={todayISO()}
                {...register("deliveryDate")}
              />
              <ErrorText message={errors.deliveryDate?.message} />
            </div>
          </div>
        </section>

        {/* Kartu & catatan */}
        <section>
          <h2 className="mb-4 font-serif text-xl text-brand">
            Kartu Ucapan & Catatan
          </h2>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="cardMessage">Pesan kartu ucapan (opsional)</Label>
              <Textarea
                id="cardMessage"
                {...register("cardMessage")}
                placeholder="Pesan yang akan kami tuliskan pada kartu ucapan"
                maxLength={300}
              />
            </div>
            <div>
              <Label htmlFor="note">Catatan pesanan (opsional)</Label>
              <Textarea
                id="note"
                {...register("note")}
                placeholder="Instruksi tambahan untuk pesanan Anda"
                maxLength={300}
              />
            </div>
          </div>
        </section>

        {/* Pembayaran */}
        <section>
          <h2 className="mb-4 font-serif text-xl text-brand">Metode Pembayaran</h2>
          <div className="space-y-5">
            {groups.map((group) => (
              <div key={group}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  {group}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {paymentMethods
                    .filter((m) => m.group === group)
                    .map((m) => (
                      <label
                        key={m.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-md border bg-white px-4 py-3 text-sm transition-colors",
                          watch("paymentMethod") === m.id
                            ? "border-gold bg-gold/5"
                            : "border-brand/10 hover:border-gold/50"
                        )}
                      >
                        <input
                          type="radio"
                          value={m.id satisfies PaymentMethodId}
                          {...register("paymentMethod")}
                          className="h-4 w-4 accent-[#14342b]"
                        />
                        {m.label}
                      </label>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <ErrorText message={errors.paymentMethod?.message} />
          <p className="mt-3 flex items-start gap-2 text-xs text-muted">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            Mode demo: pembayaran disimulasikan dan langsung dianggap berhasil.
            Integrasi Midtrans/Xendit tinggal diaktifkan di lib/payment.ts.
          </p>
        </section>
      </div>

      {/* Ringkasan */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-lg border border-gold/40 bg-white p-6 shadow-[0_2px_16px_rgba(20,52,43,0.06)]">
          <h2 className="font-serif text-xl text-brand">Ringkasan Pesanan</h2>
          <div className="gold-rule my-4" />
          <ul className="space-y-2.5 text-sm">
            {items.map((item) => (
              <li key={item.lineId} className="flex justify-between gap-3">
                <span className="text-muted">
                  {item.name}
                  {item.variantName ? ` (${item.variantName})` : ""} × {item.qty}
                </span>
                <span className="shrink-0 font-medium text-brand">
                  {formatRupiah(item.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>
          <div className="gold-rule my-4" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-medium text-brand">{formatRupiah(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Ongkir</dt>
              <dd className="font-medium text-brand">
                {shipping ? formatRupiah(shipping.cost) : "—"}
              </dd>
            </div>
          </dl>
          <div className="gold-rule my-4" />
          <div className="flex items-baseline justify-between">
            <p className="font-medium text-brand">Total</p>
            <p className="font-serif text-2xl text-brand">{formatRupiah(total)}</p>
          </div>
          <Button
            type="submit"
            size="lg"
            className="mt-5 w-full"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                Memproses pembayaran…
              </>
            ) : (
              "Bayar & Buat Pesanan"
            )}
          </Button>
          <p className="mt-3 text-center text-xs text-muted">
            Dengan memesan, Anda menyetujui{" "}
            <Link href="/kebijakan" className="underline underline-offset-2">
              kebijakan pengiriman & pengembalian
            </Link>{" "}
            kami.
          </p>
        </div>
      </aside>
    </form>
  );
}
