import type { Product } from "@/types";

/**
 * Seed catalog Gohampers.
 * Struktur ini sengaja dibuat datar dan bertipe jelas agar mudah dipindah
 * ke database (Prisma/Supabase) atau CMS (Sanity/Payload) di kemudian hari —
 * cukup ganti sumber data pada fungsi-fungsi di bagian bawah file.
 */
export const products: Product[] = [
  {
    id: "p01",
    slug: "syawal-elegance",
    name: "Syawal Elegance",
    category: "lebaran",
    occasions: ["lebaran", "idul fitri", "ramadan", "keluarga"],
    price: 385000,
    images: ["/products/syawal-elegance-1.svg", "/products/syawal-elegance-2.svg"],
    shortDescription:
      "Hampers Idul Fitri klasik dengan kurma premium dan kue kering homemade dalam box hardcover hijau emas.",
    longDescription:
      "Syawal Elegance merangkum kehangatan silaturahmi dalam satu kotak yang anggun. Kurma Ajwa pilihan, kastengel dan nastar yang dipanggang perlahan, serta teh melati artisan tersusun rapi di atas alas satin dengan sentuhan pita emas. Pilihan yang tepat untuk keluarga, kolega, dan kerabat terdekat di hari yang fitri.",
    contents: [
      "Kurma Ajwa premium 250 g",
      "Kastengel homemade 250 g",
      "Nastar klasik 250 g",
      "Teh melati artisan 10 kantong",
      "Sirup markisa 500 ml",
      "Kartu ucapan eksklusif",
      "Box hardcover + pita satin emas",
    ],
    variants: [
      { id: "classic", name: "Classic", priceDiff: 0 },
      { id: "deluxe", name: "Deluxe (+ toples premium)", priceDiff: 165000 },
    ],
    stock: 48,
    isFeatured: true,
    isBestSeller: true,
    sold: 214,
    createdAt: "2026-05-02",
  },
  {
    id: "p02",
    slug: "ramadan-nights",
    name: "Ramadan Nights",
    category: "lebaran",
    occasions: ["lebaran", "ramadan", "idul fitri"],
    price: 550000,
    images: ["/products/ramadan-nights-1.svg", "/products/ramadan-nights-2.svg"],
    shortDescription:
      "Rangkaian premium bernuansa malam Ramadan: sajadah travel, kurma Medjool, madu hutan, dan lilin aromaterapi oud.",
    longDescription:
      "Terinspirasi ketenangan malam-malam Ramadan, hampers ini memadukan sajadah travel berbahan lembut, kurma Medjool berukuran jumbo, madu hutan murni, dan lilin aromaterapi beraroma oud. Sebuah hadiah yang terasa personal sekaligus bermakna untuk orang-orang tersayang.",
    contents: [
      "Sajadah travel premium",
      "Kurma Medjool 500 g",
      "Madu hutan murni 250 ml",
      "Teh tarik artisan 5 sachet",
      "Lilin aromaterapi oud 120 g",
      "Kartu ucapan eksklusif",
      "Box kayu pinus + pita satin",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 32,
    isFeatured: true,
    isBestSeller: false,
    sold: 96,
    createdAt: "2026-04-20",
  },
  {
    id: "p03",
    slug: "fitri-petite",
    name: "Fitri Petite",
    category: "lebaran",
    occasions: ["lebaran", "idul fitri", "hadiah kecil"],
    price: 195000,
    images: ["/products/fitri-petite-1.svg", "/products/fitri-petite-2.svg"],
    shortDescription:
      "Hampers mungil nan manis — duo kue kering dan teh premium untuk berbagi kebahagiaan tanpa berlebihan.",
    longDescription:
      "Fitri Petite membuktikan bahwa perhatian tidak diukur dari besarnya kemasan. Duo kue kering pilihan dan teh celup premium dikemas dalam box cream berpita emas — pas untuk tetangga, rekan kerja, atau hantaran dalam jumlah banyak.",
    contents: [
      "Putri salju 150 g",
      "Lidah kucing 150 g",
      "Teh celup premium 5 kantong",
      "Kartu ucapan",
      "Box cream + pita emas",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 120,
    isFeatured: false,
    isBestSeller: false,
    sold: 178,
    createdAt: "2026-05-10",
  },
  {
    id: "p04",
    slug: "noel-classique",
    name: "Noel Classique",
    category: "natal-tahun-baru",
    occasions: ["natal", "christmas", "keluarga"],
    price: 425000,
    images: ["/products/noel-classique-1.svg", "/products/noel-classique-2.svg"],
    shortDescription:
      "Hampers Natal klasik: praline cokelat, kukis jahe, cocoa artisan, dan lilin kayu manis dalam box hijau emas.",
    longDescription:
      "Noel Classique membawa kehangatan perayaan Natal ke dalam rumah. Dua belas praline cokelat buatan tangan, kukis jahe beraroma rempah, campuran cocoa artisan, dan lilin kayu manis tersusun bersama ornamen Natal mungil — hadiah yang terasa seperti pelukan hangat di bulan Desember.",
    contents: [
      "Praline cokelat artisan 12 pcs",
      "Kukis jahe 200 g",
      "Artisan cocoa mix 200 g",
      "Lilin aromaterapi kayu manis 120 g",
      "Ornamen Natal eksklusif",
      "Kartu ucapan",
      "Box hardcover hijau + pita emas",
    ],
    variants: [
      { id: "classic", name: "Classic", priceDiff: 0 },
      { id: "grande", name: "Grande (+ panettone mini)", priceDiff: 120000 },
    ],
    stock: 40,
    isFeatured: true,
    isBestSeller: false,
    sold: 87,
    createdAt: "2026-03-15",
  },
  {
    id: "p05",
    slug: "midnight-celebration",
    name: "Midnight Celebration",
    category: "natal-tahun-baru",
    occasions: ["tahun baru", "new year", "perayaan"],
    price: 680000,
    images: [
      "/products/midnight-celebration-1.svg",
      "/products/midnight-celebration-2.svg",
    ],
    shortDescription:
      "Sambut pergantian tahun dengan sparkling juice, keju, praline, dan dua gelas flute dalam kemasan mewah.",
    longDescription:
      "Dirancang untuk momen hitung mundur yang elegan: sparkling grape juice non-alkohol, cheese crackers gurih, praline cokelat, campuran buah kering, dan sepasang gelas flute kaca. Midnight Celebration adalah cara paling anggun mengucapkan selamat tahun baru.",
    contents: [
      "Sparkling grape juice 750 ml (non-alkohol)",
      "Cheese crackers premium 180 g",
      "Praline cokelat 8 pcs",
      "Mixed dried fruit 150 g",
      "Sepasang gelas flute kaca",
      "Kartu ucapan",
      "Box hardcover hitam + pita emas",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 25,
    isFeatured: false,
    isBestSeller: true,
    sold: 143,
    createdAt: "2026-02-01",
  },
  {
    id: "p06",
    slug: "eternal-vow",
    name: "Eternal Vow",
    category: "wedding",
    occasions: ["wedding", "pernikahan", "bridesmaid", "door gift"],
    price: 320000,
    images: ["/products/eternal-vow-1.svg", "/products/eternal-vow-2.svg"],
    shortDescription:
      "Bridesmaid box yang anggun: lilin soy, scrunchie satin, dan cokelat artisan — manis tanpa berlebihan.",
    longDescription:
      "Eternal Vow dirancang sebagai tanda terima kasih untuk para sahabat yang mendampingi di hari bahagia. Lilin soy beraroma white tea, scrunchie satin champagne, dan cokelat artisan dikemas dalam box cream dengan inisial yang dapat dipersonalisasi.",
    contents: [
      "Lilin soy white tea 120 g",
      "Scrunchie satin champagne",
      "Cokelat artisan 5 pcs",
      "Kartu ucapan personal",
      "Box cream + wax seal emas",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 80,
    isFeatured: false,
    isBestSeller: false,
    sold: 65,
    createdAt: "2026-06-01",
  },
  {
    id: "p07",
    slug: "rosewood-union",
    name: "Rosewood Union",
    category: "wedding",
    occasions: ["wedding", "pernikahan", "seserahan", "hantaran", "anniversary"],
    price: 895000,
    images: ["/products/rosewood-union-1.svg", "/products/rosewood-union-2.svg"],
    shortDescription:
      "Hampers pernikahan mewah dengan reed diffuser mawar, handuk premium bermonogram, dan teh bunga artisan.",
    longDescription:
      "Rosewood Union adalah persembahan untuk pasangan yang memulai babak baru. Reed diffuser beraroma mawar dan kayu cendana, sepasang handuk premium dengan monogram, cokelat artisan, teh bunga, dan bingkai foto kuningan tersusun dalam box kayu rosewood yang dapat disimpan sebagai kenangan.",
    contents: [
      "Reed diffuser rose & sandalwood 100 ml",
      "Sepasang handuk premium bermonogram",
      "Cokelat artisan 10 pcs",
      "Teh bunga artisan 8 kantong",
      "Bingkai foto kuningan 4R",
      "Kartu ucapan kaligrafi",
      "Box kayu rosewood + pita satin",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 18,
    isFeatured: true,
    isBestSeller: true,
    sold: 52,
    createdAt: "2026-05-25",
  },
  {
    id: "p08",
    slug: "executive-suite",
    name: "Executive Suite",
    category: "corporate",
    occasions: ["corporate", "kantor", "klien", "apresiasi"],
    price: 475000,
    images: ["/products/executive-suite-1.svg", "/products/executive-suite-2.svg"],
    shortDescription:
      "Hampers korporat berkelas: tumbler thermal, kopi single origin, notebook linen, dan pena metal.",
    longDescription:
      "Executive Suite berbicara dalam bahasa profesional: fungsional, rapi, dan berkelas. Tumbler thermal stainless, kopi single origin Gayo 200 g, notebook bersampul linen, dan pena metal dikemas dalam box hitam elegan. Tersedia opsi penambahan logo perusahaan untuk pemesanan korporat.",
    contents: [
      "Tumbler thermal stainless 500 ml",
      "Kopi single origin Gayo 200 g",
      "Notebook linen A5",
      "Pena metal premium",
      "Granola bar artisan 2 pcs",
      "Kartu ucapan korporat",
      "Box hitam + pita emas",
    ],
    variants: [
      { id: "std", name: "Standar", priceDiff: 0 },
      { id: "branded", name: "Dengan logo perusahaan", priceDiff: 50000 },
    ],
    stock: 60,
    isFeatured: true,
    isBestSeller: false,
    sold: 110,
    createdAt: "2026-04-05",
  },
  {
    id: "p09",
    slug: "grand-partnership",
    name: "Grand Partnership",
    category: "corporate",
    occasions: ["corporate", "klien", "kemitraan", "akhir tahun"],
    price: 1250000,
    images: [
      "/products/grand-partnership-1.svg",
      "/products/grand-partnership-2.svg",
    ],
    shortDescription:
      "Hampers premium untuk mitra terpenting: sparkling tea, kopi arabika, cokelat single origin, dalam chest kayu jati.",
    longDescription:
      "Untuk hubungan bisnis yang layak dirayakan. Grand Partnership menyatukan sparkling tea premium, kopi arabika microlot, cokelat single origin 70%, kacang mede panggang, reed diffuser, dan notebook kulit dalam chest kayu jati yang megah. Pernyataan apresiasi yang tidak mudah dilupakan.",
    contents: [
      "Sparkling tea premium 750 ml",
      "Kopi arabika microlot 250 g",
      "Cokelat single origin 70% 2 bar",
      "Kacang mede panggang 250 g",
      "Reed diffuser 100 ml",
      "Notebook kulit A5",
      "Kartu ucapan korporat",
      "Chest kayu jati + engraving opsional",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 12,
    isFeatured: true,
    isBestSeller: false,
    sold: 34,
    createdAt: "2026-01-20",
  },
  {
    id: "p10",
    slug: "welcome-aboard",
    name: "Welcome Aboard",
    category: "corporate",
    occasions: ["corporate", "onboarding", "karyawan baru"],
    price: 350000,
    images: ["/products/welcome-aboard-1.svg", "/products/welcome-aboard-2.svg"],
    shortDescription:
      "Onboarding kit yang hangat untuk anggota tim baru: mug keramik, kopi drip, kukis, dan catatan linen.",
    longDescription:
      "Kesan pertama menentukan. Welcome Aboard menyambut anggota tim baru dengan mug keramik matte, kopi drip single origin, kukis butter, sticky notes linen, dan kartu ucapan yang bisa ditandatangani satu tim. Sederhana, hangat, profesional.",
    contents: [
      "Mug keramik matte 350 ml",
      "Kopi drip single origin 5 sachet",
      "Kukis butter 150 g",
      "Sticky notes & memo linen",
      "Kartu ucapan tim",
      "Box kraft premium + pita",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 75,
    isFeatured: false,
    isBestSeller: false,
    sold: 89,
    createdAt: "2026-06-15",
  },
  {
    id: "p11",
    slug: "golden-hour",
    name: "Golden Hour",
    category: "birthday",
    occasions: ["birthday", "ulang tahun", "anniversary"],
    price: 395000,
    images: ["/products/golden-hour-1.svg", "/products/golden-hour-2.svg"],
    shortDescription:
      "Perayaan ulang tahun dalam nuansa emas: cake jar duo, praline, teh bunga telang, dan lilin premium.",
    longDescription:
      "Golden Hour dirancang untuk membuat hari jadi terasa semewah namanya. Duo cake jar red velvet dan vanila, praline cokelat, teh bunga telang yang berubah warna, lilin ulang tahun premium, dan kartu pop-up tersusun dalam box emas yang berkilau lembut.",
    contents: [
      "Cake jar red velvet & vanila 2 pcs",
      "Praline cokelat 6 pcs",
      "Teh bunga telang 5 kantong",
      "Lilin ulang tahun premium",
      "Kartu ucapan pop-up",
      "Box gold-foil + pita satin",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 55,
    isFeatured: true,
    isBestSeller: true,
    sold: 167,
    createdAt: "2026-06-20",
  },
  {
    id: "p12",
    slug: "sweet-celebration",
    name: "Sweet Celebration",
    category: "birthday",
    occasions: ["birthday", "ulang tahun", "hadiah kecil"],
    price: 285000,
    images: [
      "/products/sweet-celebration-1.svg",
      "/products/sweet-celebration-2.svg",
    ],
    shortDescription:
      "Kejutan manis yang ringkas: brownies fudge, kukis butter, dan teh stroberi dalam box merah muda lembut.",
    longDescription:
      "Tidak semua perayaan butuh pesta besar — kadang cukup sekotak kebahagiaan. Brownies fudge yang legit, kukis butter renyah, teh stroberi, dan lilin mini dikemas manis dengan pita satin. Kirimkan, dan biarkan senyumnya berbicara.",
    contents: [
      "Brownies fudge 250 g",
      "Kukis butter 150 g",
      "Teh stroberi 5 kantong",
      "Lilin mini & korek dekoratif",
      "Kartu ucapan",
      "Box blush + pita satin",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 90,
    isFeatured: false,
    isBestSeller: false,
    sold: 71,
    createdAt: "2026-07-01",
  },
  {
    id: "p13",
    slug: "blooming-wishes",
    name: "Blooming Wishes",
    category: "birthday",
    occasions: ["birthday", "ulang tahun", "anniversary", "wisuda"],
    price: 465000,
    images: [
      "/products/blooming-wishes-1.svg",
      "/products/blooming-wishes-2.svg",
    ],
    shortDescription:
      "Buket bunga kering mini berpadu madu stik, granola, mug, dan lilin soy — hadiah yang bermekaran.",
    longDescription:
      "Blooming Wishes menghadirkan keindahan yang bertahan lama: buket bunga kering mini yang tidak layu, madu stik untuk pagi yang manis, granola artisan, mug keramik, dan lilin soy lavender. Untuk ulang tahun, wisuda, atau sekadar mengatakan “aku ingat kamu”.",
    contents: [
      "Buket bunga kering mini",
      "Madu stik 10 pcs",
      "Granola artisan 200 g",
      "Mug keramik 300 ml",
      "Lilin soy lavender 120 g",
      "Kartu ucapan",
      "Box jendela + pita linen",
    ],
    variants: [{ id: "std", name: "Standar", priceDiff: 0 }],
    stock: 44,
    isFeatured: true,
    isBestSeller: false,
    sold: 58,
    createdAt: "2026-07-10",
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
