import type { Product } from "@/types";

/**
 * Seed catalog Centrepreneur — 6 hampers buah premium (Idul Adha & Christmas).
 * Struktur ini sengaja dibuat datar dan bertipe jelas agar mudah dipindah
 * ke database (Prisma/Supabase) atau CMS (Sanity/Payload) di kemudian hari —
 * cukup ganti sumber data pada fungsi-fungsi di bagian bawah file.
 */
export const products: Product[] = [
  {
    id: "p01",
    slug: "idul-adha-elegant",
    name: "Idul Adha Elegant",
    category: "idul-adha",
    occasions: ["idul adha", "kurban", "hari raya", "keluarga"],
    price: 385000,
    images: ["/products/idul-adha-elegant.jpg"],
    shortDescription:
      "Box hijau elegan berisi anggur, apel, jeruk, pir, kiwi, kurma cokelat, dan madu — dihias pita satin hijau.",
    longDescription:
      "Idul Adha Elegant merangkum kesegaran dan keanggunan dalam satu box hijau tua berpita satin. Anggur hijau, apel merah, jeruk, pir, dan kiwi tersusun bersama kurma berbalut cokelat, sebotol madu premium, serta bunga kering — lengkap dengan kartu ucapan Selamat Idul Adha. Hadiah yang pantas untuk keluarga, tetangga, dan rekan terdekat di hari raya.",
    contents: [
      "Anggur hijau premium",
      "Apel merah & pir pilihan",
      "Jeruk segar & kiwi",
      "Kurma berbalut cokelat",
      "Madu premium 250 ml",
      "Bunga kering dekoratif",
      "Kartu ucapan Selamat Idul Adha",
      "Box premium + pita satin hijau",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 50,
    isFeatured: true,
    isBestSeller: false,
    sold: 128,
    createdAt: "2026-06-01",
  },
  {
    id: "p02",
    slug: "idul-adha-premium",
    name: "Idul Adha Premium",
    category: "idul-adha",
    occasions: ["idul adha", "kurban", "hari raya", "keluarga"],
    price: 550000,
    images: ["/products/idul-adha-premium.jpg"],
    shortDescription:
      "Keranjang anyaman berpita emas dengan anggur, apel, jeruk, kurma, kiwi, dan selai premium.",
    longDescription:
      "Idul Adha Premium hadir dalam keranjang anyaman klasik dengan pita hijau bersimpul emas. Anggur hijau, apel merah dan hijau, jeruk, pir, kiwi, kurma pilihan, serta sebotol selai premium tertata penuh hingga ke bibir keranjang, dimahkotai kartu ucapan Selamat Idul Adha. Kesan hangat dan berlimpah untuk orang-orang istimewa.",
    contents: [
      "Anggur hijau premium",
      "Apel merah & hijau pilihan",
      "Jeruk segar, pir & kiwi",
      "Kurma pilihan",
      "Selai buah premium",
      "Daun cemara dekoratif",
      "Kartu ucapan Selamat Idul Adha",
      "Keranjang anyaman + pita emas",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 35,
    isFeatured: true,
    isBestSeller: true,
    sold: 176,
    createdAt: "2026-06-05",
  },
  {
    id: "p03",
    slug: "idul-adha-luxury",
    name: "Idul Adha Luxury",
    category: "idul-adha",
    occasions: ["idul adha", "kurban", "hari raya", "korporat"],
    price: 750000,
    images: ["/products/idul-adha-luxury.jpg"],
    shortDescription:
      "Peti kayu mewah berisi melon utuh, anggur, apel, jeruk, kiwi, kurma, dan madu premium.",
    longDescription:
      "Persembahan tertinggi untuk Idul Adha: peti kayu pinus berpita hijau yang memuat melon utuh, anggur merah, apel, jeruk, kiwi, kurma premium, dan madu artisan. Setiap isi dipilih dan disusun satu per satu hingga tampil megah — pilihan tepat untuk kolega bisnis dan keluarga besar.",
    contents: [
      "Melon premium utuh",
      "Anggur merah & hijau",
      "Apel merah pilihan",
      "Jeruk segar & kiwi",
      "Kurma premium",
      "Madu artisan 250 ml",
      "Daun cemara & ranting dekoratif",
      "Kartu ucapan Selamat Idul Adha",
      "Peti kayu pinus + pita satin",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 20,
    isFeatured: true,
    isBestSeller: false,
    sold: 92,
    createdAt: "2026-06-10",
  },
  {
    id: "p04",
    slug: "christmas-classic",
    name: "Christmas Classic",
    category: "christmas",
    occasions: ["natal", "christmas", "keluarga"],
    price: 425000,
    images: ["/products/christmas-classic.jpg"],
    shortDescription:
      "Box merah klasik dengan apel, anggur, kiwi, jeruk, ornamen Santa, dan kartu Merry Christmas.",
    longDescription:
      "Christmas Classic membawa keceriaan Natal dalam box merah berpita besar. Apel merah mengkilap, anggur hijau, kiwi, dan jeruk tersusun di antara daun cemara, beri merah, dan ornamen Santa mungil — lengkap dengan kartu Merry Christmas. Hangat, meriah, dan tak lekang oleh waktu.",
    contents: [
      "Apel merah premium",
      "Anggur hijau & kiwi",
      "Jeruk segar",
      "Ornamen Santa & beri dekoratif",
      "Daun cemara asli",
      "Kartu ucapan Merry Christmas",
      "Box merah + pita satin merah",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 45,
    isFeatured: true,
    isBestSeller: false,
    sold: 104,
    createdAt: "2026-06-15",
  },
  {
    id: "p05",
    slug: "christmas-premium",
    name: "Christmas Premium",
    category: "christmas",
    occasions: ["natal", "christmas", "tahun baru", "keluarga"],
    price: 600000,
    images: ["/products/christmas-premium.jpg"],
    shortDescription:
      "Keranjang Natal berlimpah: apel, pir, anggur, stroberi, jeruk, dan cokelat dengan pita merah.",
    longDescription:
      "Christmas Premium menata kelimpahan musim perayaan dalam keranjang anyaman berpita merah. Apel merah, pir, anggur hijau, stroberi segar, jeruk, dan cokelat premium berpadu dengan cemara dan beri merah — dimahkotai kartu Merry Christmas. Sempurna untuk keluarga besar dan momen kebersamaan.",
    contents: [
      "Apel merah & pir pilihan",
      "Anggur hijau premium",
      "Stroberi segar",
      "Jeruk pilihan",
      "Cokelat premium",
      "Beri & cemara dekoratif",
      "Kartu ucapan Merry Christmas",
      "Keranjang anyaman + pita merah",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 30,
    isFeatured: true,
    isBestSeller: true,
    sold: 158,
    createdAt: "2026-06-20",
  },
  {
    id: "p06",
    slug: "christmas-luxury",
    name: "Christmas Luxury",
    category: "christmas",
    occasions: ["natal", "christmas", "tahun baru", "korporat"],
    price: 800000,
    images: ["/products/christmas-luxury.jpg"],
    shortDescription:
      "Box hijau mewah dengan melon utuh, kiwi, anggur, apel, jeruk, kurma cokelat, dan madu artisan.",
    longDescription:
      "Puncak kemewahan Natal: box hijau tua berpita emas berisi melon utuh, kiwi, anggur hijau, apel, jeruk, kurma berbalut cokelat, dan madu artisan. Disusun rapat dengan cemara dan beri merah hingga setiap sudutnya terasa istimewa — pernyataan kasih yang paling anggun di penghujung tahun.",
    contents: [
      "Melon premium utuh",
      "Kiwi & anggur hijau",
      "Apel merah pilihan",
      "Jeruk segar",
      "Kurma berbalut cokelat",
      "Madu artisan 250 ml",
      "Beri & cemara dekoratif",
      "Kartu ucapan Merry Christmas",
      "Box premium + pita emas",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 18,
    isFeatured: true,
    isBestSeller: false,
    sold: 87,
    createdAt: "2026-06-25",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
