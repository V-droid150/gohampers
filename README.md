# Gohampers — Hampers untuk Momen Istimewa

Website e-commerce hampers premium (Lebaran, Natal & Tahun Baru, Wedding, Corporate, Birthday) dengan nuansa elegan deep green–gold–cream. Dibangun dengan Next.js App Router, siap dikembangkan menjadi toko yang beroperasi nyata.

## Menjalankan Proyek

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produksi
```

## Tech Stack

- **Next.js 16 (App Router) + TypeScript** — SSR/SSG, metadata API, next/image
- **Tailwind CSS v4** — token warna & font di `app/globals.css` (`@theme`)
- **Zustand (persist)** — keranjang tersimpan di localStorage
- **React Hook Form + Zod** — validasi form checkout
- **lucide-react** — ikon
- Font: **Playfair Display** (heading) + **Inter** (body) via `next/font`

## Struktur Proyek

```
app/                  Halaman (App Router)
  page.tsx            Home
  products/           Katalog + detail produk [slug]
  custom/             Custom hampers builder
  cart/  checkout/    Keranjang & checkout
  order/success/      Konfirmasi pesanan
  tentang/ faq/ kebijakan/ kontak/   Halaman statis
  sitemap.ts robots.ts               SEO
components/           Komponen (ui/ = komponen dasar, layout/ = navbar & footer)
data/                 Seed catalog: products.ts, categories.ts, custom-options.ts
lib/                  site.ts (konfigurasi brand), whatsapp.ts, shipping.ts,
                      payment.ts (abstraksi + simulasi), orders.ts, utils.ts
store/                cart.ts (Zustand)
types/                Tipe bersama
scripts/              generate-placeholders.mjs (gambar SVG placeholder)
public/products/      Gambar produk (placeholder — ganti dengan foto asli)
```

## Konfigurasi Brand

Semua identitas ada di `lib/site.ts`:

- **`whatsappNumber`** — saat ini **placeholder `6281234567890`. WAJIB diganti** dengan nomor asli sebelum go-live.
- `url` — ganti dengan domain produksi (dipakai untuk metadata & sitemap).
- Email/alamat/Instagram — opsional.

## Mengganti Data Produk

Edit `data/products.ts` (struktur ada di `types/index.ts`). Untuk foto asli: letakkan file di `public/products/`, isi `images` produk, dan hapus opsi `dangerouslyAllowSVG` di `next.config.ts` bila SVG placeholder tidak dipakai lagi. Placeholder dapat dibuat ulang dengan `node scripts/generate-placeholders.mjs`.

## Integrasi Nyata (TODO)

### Payment gateway (Midtrans / Xendit)
Checkout saat ini berjalan dalam **mode simulasi** (`lib/payment.ts` — selalu sukses). Langkah integrasi Midtrans Snap tertulis lengkap di komentar file tersebut:
1. `npm install midtrans-client`, buat route handler `app/api/payment/route.ts` yang memanggil `snap.createTransaction()`.
2. Env var: `MIDTRANS_SERVER_KEY` (server-only), `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY`, `MIDTRANS_IS_PRODUCTION` — jangan hardcode kunci.
3. Ganti `simulatedProvider` dengan provider yang membuka Snap popup, plus webhook `app/api/payment/notification` (verifikasi signature).

### Ongkir (RajaOngkir / Biteship)
Tarif saat ini dari tabel zona sederhana di `lib/shipping.ts`. Ganti isi `getShippingOptions()` dengan panggilan API — bentuk kembaliannya (`{id, label, eta, cost}`) sudah disiapkan agar UI tidak berubah.

### Penyimpanan order & CMS
Order saat ini disimpan di localStorage (`lib/orders.ts`). Untuk produksi: simpan ke database (Supabase/Prisma) via route handler, dan pindahkan catalog ke CMS bila diperlukan — fungsi akses data di `data/products.ts` menjadi satu-satunya titik yang perlu diubah.

### Deploy ke Vercel
1. Push ke GitHub, import di vercel.com.
2. Set env var payment saat integrasi sudah dilakukan.
3. Ganti `siteConfig.url` ke domain produksi.
