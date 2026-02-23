"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-md border border-stone/50 bg-charcoal transition-colors duration-200 hover:border-gold/50 shadow-lg shadow-black/40"
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone/40 via-earth to-stone/30" />

        {/* Sale badge */}
        {product.compare_at_price && (
          <div className="absolute left-3 top-3 z-10 rounded-sm bg-rust px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            Sale
          </div>
        )}

        {/* Add to Cart overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 rounded-sm bg-gold px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-gold-light"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Category tag */}
        {product.category_slug && (
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted">
            {product.category_slug}
          </span>
        )}

        {/* Product name */}
        <h3 className="font-heading text-sm font-semibold uppercase leading-snug text-bone md:text-base">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-lg font-bold text-gold">
            {formatCurrency(product.price)}
          </span>
          {product.compare_at_price && (
            <span className="text-sm text-muted line-through">
              {formatCurrency(product.compare_at_price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
