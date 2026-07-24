"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCartStore, cartCount } from "@/store/cart";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/products", label: "Katalog" },
  { href: "/custom", label: "Custom Hampers" },
  { href: "/tentang", label: "Tentang" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontak", label: "Kontak" },
];

export function Navbar() {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  // Hindari mismatch hydration: badge hanya dirender setelah mount
  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  const count = mounted ? cartCount(items) : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-brand/10 bg-cream/95 backdrop-blur">
      <div className="container-luxe flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-1" aria-label="Gohampers — beranda">
          <span className="font-serif text-2xl font-semibold tracking-wide text-brand">
            Gohampers
          </span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-gold-dark sm:inline">
            Jakarta
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-wide transition-colors hover:text-gold-dark",
                pathname === link.href
                  ? "font-semibold text-brand"
                  : "text-ink/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative rounded-md p-2 text-brand transition-colors hover:bg-brand/5"
            aria-label={`Keranjang belanja${count > 0 ? `, ${count} item` : ""}`}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-brand-dark">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-brand transition-colors hover:bg-brand/5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-brand/10 bg-cream lg:hidden"
          aria-label="Navigasi seluler"
        >
          <div className="container-luxe flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "border-b border-brand/5 py-3 text-sm tracking-wide last:border-0",
                  pathname === link.href
                    ? "font-semibold text-brand"
                    : "text-ink/80"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
