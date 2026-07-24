import type { Order } from "@/types";

/**
 * Penyimpanan order sementara di localStorage (sisi klien).
 * TODO: saat backend tersedia, ganti dengan penyimpanan di database
 * melalui route handler / server action.
 */

const STORAGE_KEY = "centrepreneur-orders";

export function saveOrder(order: Order): void {
  if (typeof window === "undefined") return;
  const orders = loadOrders();
  orders.unshift(order);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.slice(0, 20)));
}

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as Order[];
  } catch {
    return [];
  }
}

export function getOrderById(id: string): Order | undefined {
  return loadOrders().find((o) => o.id === id);
}
