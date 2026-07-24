/**
 * Opsi untuk Custom Hampers Builder (/custom).
 * Harga box sudah termasuk packaging dasar (box premium + dekorasi + kartu).
 */

export interface BoxOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  /** Jumlah item maksimum yang muat di box ini */
  maxItems: number;
}

export interface ItemOption {
  id: string;
  name: string;
  price: number;
}

export interface PackagingOption {
  id: string;
  name: string;
  priceDiff: number;
}

export interface RibbonOption {
  id: string;
  name: string;
  /** Kelas Tailwind untuk swatch warna pita */
  swatchClass: string;
}

export const boxOptions: BoxOption[] = [
  {
    id: "s",
    name: "Box S",
    description: "Ringkas & manis — muat hingga 4 item",
    basePrice: 150000,
    maxItems: 4,
  },
  {
    id: "m",
    name: "Box M",
    description: "Paling populer — muat hingga 7 item",
    basePrice: 250000,
    maxItems: 7,
  },
  {
    id: "l",
    name: "Box L",
    description: "Megah & lengkap — muat hingga 10 item",
    basePrice: 350000,
    maxItems: 10,
  },
];

export const itemOptions: ItemOption[] = [
  { id: "kopi-arabika", name: "Kopi arabika single origin 200 g", price: 85000 },
  { id: "teh-artisan", name: "Teh artisan 8 kantong", price: 65000 },
  { id: "cokelat-praline", name: "Praline cokelat 8 pcs", price: 95000 },
  { id: "madu-hutan", name: "Madu hutan murni 250 ml", price: 70000 },
  { id: "lilin-soy", name: "Lilin soy aromaterapi 120 g", price: 90000 },
  { id: "kukis-butter", name: "Kukis butter 150 g", price: 55000 },
  { id: "granola", name: "Granola artisan 200 g", price: 60000 },
  { id: "tumbler", name: "Tumbler thermal 500 ml", price: 120000 },
  { id: "diffuser", name: "Reed diffuser 100 ml", price: 150000 },
  { id: "sirup-rempah", name: "Sirup rempah 500 ml", price: 75000 },
  { id: "kacang-mede", name: "Kacang mede panggang 250 g", price: 80000 },
  { id: "cake-jar", name: "Cake jar red velvet", price: 65000 },
];

export const packagingOptions: PackagingOption[] = [
  { id: "premium", name: "Box premium (termasuk)", priceDiff: 0 },
  { id: "kayu", name: "Box kayu pinus", priceDiff: 50000 },
  { id: "rotan", name: "Keranjang rotan", priceDiff: 65000 },
];

export const ribbonOptions: RibbonOption[] = [
  { id: "gold", name: "Pita gold", swatchClass: "bg-gold" },
  { id: "emerald", name: "Pita emerald", swatchClass: "bg-brand" },
  { id: "cream", name: "Pita cream", swatchClass: "bg-cream-dark" },
  { id: "burgundy", name: "Pita burgundy", swatchClass: "bg-[#6d1f2c]" },
];
