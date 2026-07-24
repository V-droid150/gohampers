"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  note: string;
  addItem: (item: Omit<CartItem, "lineId">) => void;
  updateQty: (lineId: string, qty: number) => void;
  removeItem: (lineId: string) => void;
  clear: () => void;
  setNote: (note: string) => void;
}

function makeLineId(): string {
  return `line-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      note: "",
      addItem: (item) =>
        set((state) => {
          // Produk yang sama + varian sama digabung; custom selalu jadi baris baru
          if (item.type === "product") {
            const existing = state.items.find(
              (i) =>
                i.type === "product" &&
                i.productSlug === item.productSlug &&
                i.variantName === item.variantName
            );
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.lineId === existing.lineId
                    ? { ...i, qty: i.qty + item.qty }
                    : i
                ),
              };
            }
          }
          return { items: [...state.items, { ...item, lineId: makeLineId() }] };
        }),
      updateQty: (lineId, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.lineId !== lineId)
              : state.items.map((i) =>
                  i.lineId === lineId ? { ...i, qty: Math.min(qty, 99) } : i
                ),
        })),
      removeItem: (lineId) =>
        set((state) => ({
          items: state.items.filter((i) => i.lineId !== lineId),
        })),
      clear: () => set({ items: [], note: "" }),
      setNote: (note) => set({ note }),
    }),
    { name: "centrepreneur-cart" }
  )
);

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.qty, 0);
}
