"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, MessageCircle, ShoppingBag } from "lucide-react";
import {
  boxOptions,
  itemOptions,
  packagingOptions,
  ribbonOptions,
} from "@/data/custom-options";
import type { CustomSelection } from "@/types";
import { useCartStore } from "@/store/cart";
import { cn, formatRupiah } from "@/lib/utils";
import { buildWaUrl, waCustomMessage } from "@/lib/whatsapp";
import { Button, buttonClasses } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function StepHeading({ step, title, hint }: { step: number; title: string; hint?: string }) {
  return (
    <div className="mb-4">
      <h2 className="flex items-center gap-3 font-serif text-xl text-brand">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-gold">
          {step}
        </span>
        {title}
      </h2>
      {hint && <p className="mt-1.5 pl-11 text-sm text-muted">{hint}</p>}
    </div>
  );
}

export function CustomBuilder() {
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  const [boxId, setBoxId] = useState(boxOptions[1].id);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [packagingId, setPackagingId] = useState(packagingOptions[0].id);
  const [ribbonId, setRibbonId] = useState(ribbonOptions[0].id);
  const [cardMessage, setCardMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [added, setAdded] = useState(false);

  const box = boxOptions.find((b) => b.id === boxId) ?? boxOptions[0];
  const packaging =
    packagingOptions.find((p) => p.id === packagingId) ?? packagingOptions[0];
  const ribbon = ribbonOptions.find((r) => r.id === ribbonId) ?? ribbonOptions[0];

  const chosenItems = useMemo(
    () => itemOptions.filter((i) => selectedItems.includes(i.id)),
    [selectedItems]
  );

  const itemsTotal = chosenItems.reduce((sum, i) => sum + i.price, 0);
  const total = box.basePrice + itemsTotal + packaging.priceDiff;
  const isValid = chosenItems.length >= 1;

  function toggleItem(id: string) {
    setSelectedItems((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= box.maxItems) return prev; // box penuh
      return [...prev, id];
    });
  }

  function changeBox(id: string) {
    setBoxId(id);
    const newBox = boxOptions.find((b) => b.id === id);
    if (newBox) {
      // Buang item berlebih bila pindah ke box yang lebih kecil
      setSelectedItems((prev) => prev.slice(0, newBox.maxItems));
    }
  }

  function buildSelection(): CustomSelection {
    return {
      boxName: box.name,
      itemNames: chosenItems.map((i) => i.name),
      packagingName: packaging.name,
      ribbonName: ribbon.name,
      cardMessage: cardMessage.trim() || undefined,
      senderName: senderName.trim() || undefined,
      recipientName: recipientName.trim() || undefined,
    };
  }

  function handleAddToCart() {
    if (!isValid) return;
    addItem({
      type: "custom",
      name: `Custom Hampers (${box.name})`,
      price: total,
      qty: 1,
      image: "/products/syawal-elegance.jpg",
      custom: buildSelection(),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="space-y-12">
        {/* Langkah 1: Box */}
        <section>
          <StepHeading
            step={1}
            title="Pilih Ukuran Box"
            hint="Harga box sudah termasuk packaging premium, dekorasi, dan kartu ucapan."
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {boxOptions.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => changeBox(b.id)}
                aria-pressed={b.id === boxId}
                className={cn(
                  "rounded-lg border-2 bg-white p-5 text-left transition-colors",
                  b.id === boxId
                    ? "border-gold shadow-[0_4px_20px_rgba(201,162,39,0.2)]"
                    : "border-brand/10 hover:border-gold/50"
                )}
              >
                <p className="font-serif text-xl text-brand">{b.name}</p>
                <p className="mt-1 text-sm text-muted">{b.description}</p>
                <p className="mt-3 font-semibold text-brand">
                  {formatRupiah(b.basePrice)}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Langkah 2: Isi */}
        <section>
          <StepHeading
            step={2}
            title="Pilih Isi Hampers"
            hint={`Terpilih ${chosenItems.length} dari maksimal ${box.maxItems} item untuk ${box.name}.`}
          />
          <div className="grid gap-2.5 sm:grid-cols-2">
            {itemOptions.map((item) => {
              const selected = selectedItems.includes(item.id);
              const full = !selected && selectedItems.length >= box.maxItems;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  disabled={full}
                  aria-pressed={selected}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-md border bg-white px-4 py-3 text-left text-sm transition-colors",
                    selected
                      ? "border-gold bg-gold/5"
                      : "border-brand/10 hover:border-gold/50",
                    full && "cursor-not-allowed opacity-40"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                        selected
                          ? "border-gold bg-gold text-brand-dark"
                          : "border-brand/30"
                      )}
                      aria-hidden
                    >
                      {selected && <Check className="h-3.5 w-3.5" />}
                    </span>
                    {item.name}
                  </span>
                  <span className="shrink-0 font-medium text-brand">
                    {formatRupiah(item.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Langkah 3: Packaging & pita */}
        <section>
          <StepHeading step={3} title="Packaging & Pita" />
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium text-brand">Jenis packaging</p>
              <div className="space-y-2">
                {packagingOptions.map((p) => (
                  <label
                    key={p.id}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-md border border-brand/10 bg-white px-4 py-3 text-sm has-[:checked]:border-gold"
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="packaging"
                        checked={packagingId === p.id}
                        onChange={() => setPackagingId(p.id)}
                        className="h-4 w-4 accent-[#14342b]"
                      />
                      {p.name}
                    </span>
                    <span className="font-medium text-brand">
                      {p.priceDiff > 0 ? `+${formatRupiah(p.priceDiff)}` : "Gratis"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-brand">Warna pita</p>
              <div className="flex flex-wrap gap-3">
                {ribbonOptions.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRibbonId(r.id)}
                    aria-pressed={r.id === ribbonId}
                    aria-label={r.name}
                    className={cn(
                      "flex items-center gap-2 rounded-md border bg-white px-3.5 py-2.5 text-sm transition-colors",
                      r.id === ribbonId
                        ? "border-gold bg-gold/5"
                        : "border-brand/10 hover:border-gold/50"
                    )}
                  >
                    <span
                      className={cn(
                        "h-4 w-4 rounded-full border border-black/10",
                        r.swatchClass
                      )}
                      aria-hidden
                    />
                    {r.name.replace("Pita ", "")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Langkah 4: Kartu ucapan */}
        <section>
          <StepHeading
            step={4}
            title="Kartu Ucapan"
            hint="Opsional — kami tuliskan dengan rapi pada kartu eksklusif Centrepreneur."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="recipient">Nama penerima</Label>
              <Input
                id="recipient"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Untuk siapa hampers ini?"
                maxLength={60}
              />
            </div>
            <div>
              <Label htmlFor="sender">Nama pengirim</Label>
              <Input
                id="sender"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Dari siapa?"
                maxLength={60}
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="card-message">Pesan kartu ucapan</Label>
              <Textarea
                id="card-message"
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
                placeholder="Tulis pesan hangat Anda di sini…"
                maxLength={300}
              />
              <p className="mt-1 text-right text-xs text-muted">
                {cardMessage.length}/300
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Ringkasan */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-lg border border-gold/40 bg-white p-6 shadow-[0_2px_16px_rgba(20,52,43,0.06)]">
          <h2 className="font-serif text-xl text-brand">Ringkasan</h2>
          <div className="gold-rule my-4" />
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">{box.name}</dt>
              <dd className="font-medium text-brand">
                {formatRupiah(box.basePrice)}
              </dd>
            </div>
            {chosenItems.map((i) => (
              <div key={i.id} className="flex justify-between gap-3">
                <dt className="text-muted">{i.name}</dt>
                <dd className="font-medium text-brand">{formatRupiah(i.price)}</dd>
              </div>
            ))}
            {packaging.priceDiff > 0 && (
              <div className="flex justify-between gap-3">
                <dt className="text-muted">{packaging.name}</dt>
                <dd className="font-medium text-brand">
                  {formatRupiah(packaging.priceDiff)}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-3">
              <dt className="text-muted">{ribbon.name}</dt>
              <dd className="font-medium text-brand">Gratis</dd>
            </div>
          </dl>
          <div className="gold-rule my-4" />
          <div className="flex items-baseline justify-between">
            <p className="font-medium text-brand">Total</p>
            <p className="font-serif text-2xl text-brand" aria-live="polite">
              {formatRupiah(total)}
            </p>
          </div>

          {!isValid && (
            <p className="mt-4 rounded-md bg-gold/10 px-3 py-2 text-xs text-gold-dark">
              Pilih minimal 1 item untuk melanjutkan.
            </p>
          )}

          <div className="mt-5 space-y-3">
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!isValid}
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" aria-hidden /> Masuk Keranjang
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" aria-hidden /> Tambah ke
                  Keranjang
                </>
              )}
            </Button>
            <a
              href={
                isValid
                  ? buildWaUrl(waCustomMessage(buildSelection(), total))
                  : undefined
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!isValid}
              className={buttonClasses(
                "whatsapp",
                "lg",
                cn("w-full", !isValid && "pointer-events-none opacity-50")
              )}
            >
              <MessageCircle className="h-5 w-5" aria-hidden /> Kirim via
              WhatsApp
            </a>
            {added && (
              <button
                type="button"
                onClick={() => router.push("/cart")}
                className="w-full text-center text-sm font-medium text-gold-dark underline underline-offset-4"
              >
                Lihat keranjang →
              </button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
