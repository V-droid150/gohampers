export type CategorySlug = "idul-adha" | "christmas";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  /** Selisih harga terhadap harga dasar produk (bisa 0) */
  priceDiff: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  /** Momen/occasion terkait, untuk filter & pencarian */
  occasions: string[];
  /** Harga dasar (varian pertama) dalam Rupiah */
  price: number;
  images: string[];
  shortDescription: string;
  longDescription: string;
  /** Isi/komponen hampers */
  contents: string[];
  variants: ProductVariant[];
  stock: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  /** Jumlah terjual — dipakai untuk sorting "terlaris" */
  sold: number;
  /** ISO date — dipakai untuk sorting "terbaru" */
  createdAt: string;
}

/** Detail pilihan pada custom hampers builder */
export interface CustomSelection {
  boxName: string;
  itemNames: string[];
  packagingName: string;
  ribbonName: string;
  cardMessage?: string;
  senderName?: string;
  recipientName?: string;
}

export interface CartItem {
  /** ID unik baris keranjang */
  lineId: string;
  type: "product" | "custom";
  productSlug?: string;
  name: string;
  variantName?: string;
  /** Harga satuan */
  price: number;
  qty: number;
  image: string;
  custom?: CustomSelection;
}

export type PaymentMethodId =
  | "va-bca"
  | "va-mandiri"
  | "va-bni"
  | "gopay"
  | "ovo"
  | "dana"
  | "qris";

export interface CheckoutInfo {
  name: string;
  phone: string;
  email?: string;
  address: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  courierId: string;
  deliveryDate: string;
  cardMessage?: string;
  note?: string;
  paymentMethod: PaymentMethodId;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: {
    courierId: string;
    courierName: string;
    cost: number;
  };
  total: number;
  customer: Omit<CheckoutInfo, "courierId" | "paymentMethod">;
  payment: {
    method: PaymentMethodId;
    methodLabel: string;
    status: "pending" | "success" | "failed";
    transactionId: string;
  };
}
