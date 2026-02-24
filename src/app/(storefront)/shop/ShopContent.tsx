"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { getProducts, getCategories } from "@/lib/data";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product, Category } from "@/lib/types";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A-Z" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");

  const activeCategory = searchParams.get("category") || "";
  const activeSort = (searchParams.get("sort") as SortValue) || "newest";
  const activeSearch = searchParams.get("q") || "";

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      router.push(`/shop?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProducts({
      category: activeCategory || undefined,
      search: activeSearch || undefined,
      sort: activeSort,
    })
      .then(setProducts)
      .catch((err) => setError(err?.message || "Failed to load products"))
      .finally(() => setLoading(false));
  }, [activeCategory, activeSearch, activeSort]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== activeSearch) {
        updateParams({ q: searchInput });
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 md:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-10 sm:mb-14">
          <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-bone sm:text-4xl">
            The Collection
          </h1>
          <div className="mt-3 h-0.5 w-16 bg-gold" />
        </div>

        {/* Filter bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search minerals..."
                className="w-full rounded-sm border border-stone/50 bg-charcoal py-2.5 pl-10 pr-9 text-sm text-bone placeholder:text-muted/60 outline-none transition-colors duration-200 focus:border-gold"
              />
              {searchInput && (
                <button
                  onClick={() => {
                    setSearchInput("");
                    updateParams({ q: "" });
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-muted hover:text-bone"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted" />
              <select
                value={activeSort}
                onChange={(e) => updateParams({ sort: e.target.value })}
                className="rounded-sm border border-stone/50 bg-charcoal px-3 py-2.5 text-sm text-bone outline-none transition-colors duration-200 focus:border-gold cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => updateParams({ category: "" })}
              className={`rounded-sm border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                !activeCategory
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-stone/50 text-muted hover:border-gold/40 hover:text-bone"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  updateParams({
                    category: activeCategory === cat.slug ? "" : cat.slug,
                  })
                }
                className={`rounded-sm border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  activeCategory === cat.slug
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-stone/50 text-muted hover:border-gold/40 hover:text-bone"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results info */}
        {!loading && (
          <p className="mb-6 text-xs text-muted">
            {products.length} {products.length === 1 ? "product" : "products"} found
            {activeCategory && (
              <>
                {" "}
                in{" "}
                <span className="text-crystal">
                  {categories.find((c) => c.slug === activeCategory)?.name || activeCategory}
                </span>
              </>
            )}
            {activeSearch && (
              <>
                {" "}
                for &ldquo;<span className="text-crystal">{activeSearch}</span>&rdquo;
              </>
            )}
          </p>
        )}

        {/* Product grid */}
        {error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="mb-1 text-lg font-heading font-bold uppercase text-bone">Something went wrong</p>
            <p className="text-sm text-muted">{error}</p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-md border border-stone/50 bg-charcoal"
              >
                <div className="aspect-[4/3] bg-stone/30" />
                <div className="space-y-3 p-4">
                  <div className="h-2 w-16 bg-stone/40" />
                  <div className="h-4 w-3/4 bg-stone/40" />
                  <div className="h-5 w-20 bg-stone/40" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="mb-1 text-lg font-heading font-bold uppercase text-bone">No Products Found</p>
            <p className="text-sm text-muted">
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
