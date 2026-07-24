"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { CategorySlug, Product } from "@/types";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";

const PAGE_SIZE = 9;

const priceRanges = [
  { id: "all", label: "Semua harga", min: 0, max: Infinity },
  { id: "under-300", label: "Di bawah Rp 300.000", min: 0, max: 299999 },
  { id: "300-600", label: "Rp 300.000 – Rp 600.000", min: 300000, max: 600000 },
  { id: "over-600", label: "Di atas Rp 600.000", min: 600001, max: Infinity },
];

const sortOptions = [
  { id: "featured", label: "Unggulan" },
  { id: "newest", label: "Terbaru" },
  { id: "best-seller", label: "Terlaris" },
  { id: "price-asc", label: "Harga termurah" },
  { id: "price-desc", label: "Harga termahal" },
];

interface CatalogProps {
  products: Product[];
  initialCategory?: string;
}

export function Catalog({ products, initialCategory }: CatalogProps) {
  const validInitial = categories.some((c) => c.slug === initialCategory)
    ? (initialCategory as CategorySlug)
    : "all";

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategorySlug | "all">(validInitial);
  const [priceRange, setPriceRange] = useState("all");
  const [occasion, setOccasion] = useState("all");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const occasions = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.occasions.forEach((o) => set.add(o)));
    return Array.from(set).sort();
  }, [products]);

  const filtered = useMemo(() => {
    const range = priceRanges.find((r) => r.id === priceRange) ?? priceRanges[0];
    const q = query.trim().toLowerCase();

    const result = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (p.price < range.min || p.price > range.max) return false;
      if (occasion !== "all" && !p.occasions.includes(occasion)) return false;
      if (
        q &&
        ![p.name, p.shortDescription, ...p.occasions, ...p.contents]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });

    switch (sort) {
      case "newest":
        result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "best-seller":
        result.sort((a, b) => b.sold - a.sold);
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort(
          (a, b) => Number(b.isFeatured) - Number(a.isFeatured) || b.sold - a.sold
        );
    }
    return result;
  }, [products, query, category, priceRange, occasion, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function resetPage<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  const setQ = resetPage(setQuery);
  const setCat = resetPage(setCategory);
  const setPrice = resetPage(setPriceRange);
  const setOcc = resetPage(setOccasion);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Filter */}
      <aside>
        <Button
          variant="outline"
          className="w-full lg:hidden"
          onClick={() => setFiltersOpen((v) => !v)}
          aria-expanded={filtersOpen}
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          {filtersOpen ? "Sembunyikan Filter" : "Tampilkan Filter"}
        </Button>

        <div
          className={cn(
            "mt-4 space-y-8 lg:mt-0 lg:block",
            filtersOpen ? "block" : "hidden"
          )}
        >
          <div>
            <h3 className="mb-3 font-serif text-lg text-brand">Kategori</h3>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setCat("all")}
                className={cn(
                  "block w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                  category === "all"
                    ? "bg-brand font-medium text-cream"
                    : "text-ink/80 hover:bg-brand/5"
                )}
              >
                Semua kategori
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setCat(cat.slug)}
                  className={cn(
                    "block w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                    category === cat.slug
                      ? "bg-brand font-medium text-cream"
                      : "text-ink/80 hover:bg-brand/5"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-serif text-lg text-brand">Rentang Harga</h3>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label
                  key={range.id}
                  className="flex cursor-pointer items-center gap-2.5 text-sm text-ink/80"
                >
                  <input
                    type="radio"
                    name="price-range"
                    checked={priceRange === range.id}
                    onChange={() => setPrice(range.id)}
                    className="h-4 w-4 accent-[#14342b]"
                  />
                  {range.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-serif text-lg text-brand">Momen</h3>
            <Select
              value={occasion}
              onChange={(e) => setOcc(e.target.value)}
              aria-label="Filter momen"
            >
              <option value="all">Semua momen</option>
              {occasions.map((o) => (
                <option key={o} value={o}>
                  {o.charAt(0).toUpperCase() + o.slice(1)}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </aside>

      {/* Hasil */}
      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Cari hampers, isi, atau momen…"
              value={query}
              onChange={(e) => setQ(e.target.value)}
              className="pl-10"
              aria-label="Cari produk"
            />
          </div>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="sm:w-52"
            aria-label="Urutkan produk"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                Urutkan: {opt.label}
              </option>
            ))}
          </Select>
        </div>

        <p className="mb-4 text-sm text-muted" aria-live="polite">
          {filtered.length} produk ditemukan
        </p>

        {visible.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-brand/20 bg-white py-16 text-center">
            <p className="font-serif text-xl text-brand">Tidak ada produk yang cocok</p>
            <p className="mt-2 text-sm text-muted">
              Coba ubah kata kunci atau longgarkan filter Anda.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <nav
            className="mt-10 flex items-center justify-center gap-2"
            aria-label="Navigasi halaman"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={n === safePage ? "page" : undefined}
                className={cn(
                  "h-10 w-10 rounded-md border text-sm font-medium transition-colors",
                  n === safePage
                    ? "border-brand bg-brand text-cream"
                    : "border-brand/20 bg-white text-ink hover:border-gold"
                )}
              >
                {n}
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}
