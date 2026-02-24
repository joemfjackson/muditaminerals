"use client";

import Link from "next/link";
import Image from "next/image";
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

  const hasImage =
    product.images.length > 0 && product.images[0].startsWith("http");

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-md border border-stone/50 bg-charcoal transition-all duration-300 hover:border-gold/50 hover:-translate-y-1 shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-[0_0_25px_rgba(197,165,90,0.1)]"
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {hasImage ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: `${product.focal_point?.x ?? 50}% ${product.focal_point?.y ?? 50}%` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone/40 via-earth to-stone/30" />
        )}

        {/* Sale badge */}
        {product.compare_at_price && (
          <div className="absolute left-3 top-3 z-10 rounded-sm bg-rust px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            Sale
          </div>
        )}

        {/* Add to Cart overlay */}
        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/80 via-black/30 to-transparent pb-6 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 rounded-sm bg-gold px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gold-light translate-y-3 group-hover:translate-y-0"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        {/* Category tag */}
        {product.category_slug && (
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted">
            {product.category_slug}
          </span>
        )}

        {/* Product name */}
        <h3 className="font-heading text-xs font-semibold uppercase leading-snug text-bone sm:text-sm md:text-base">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-base font-bold text-gold sm:text-lg">
            {formatCurrency(product.price)}
          </span>
          {product.compare_at_price && (
            <span className="text-xs text-muted line-through sm:text-sm">
              {formatCurrency(product.compare_at_price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
