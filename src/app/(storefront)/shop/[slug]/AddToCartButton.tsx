"use client";

import { useState } from "react";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const disabled = product.stock <= 0;

  const handleAdd = () => {
    if (disabled) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Quantity selector */}
      <div className="flex items-center rounded-sm border border-stone/50">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-12 w-12 items-center justify-center rounded-sm text-muted transition-colors duration-200 hover:bg-stone/30 hover:text-bone"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="flex h-12 w-12 items-center justify-center border-x border-stone/50 text-sm font-medium tabular-nums text-bone">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          className="flex h-12 w-12 items-center justify-center rounded-sm text-muted transition-colors duration-200 hover:bg-stone/30 hover:text-bone"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Add to Cart button */}
      <button
        onClick={handleAdd}
        disabled={disabled}
        className={`flex h-12 flex-1 items-center justify-center gap-2.5 rounded-sm px-8 font-heading font-bold uppercase tracking-wider transition-colors duration-200 ${
          disabled
            ? "cursor-not-allowed bg-stone/30 text-muted"
            : added
              ? "bg-green-700 text-white"
              : "bg-gold py-3.5 text-black hover:bg-gold-light"
        }`}
      >
        {added ? (
          <>
            <Check className="h-4 w-4" />
            Added!
          </>
        ) : disabled ? (
          "Out of Stock"
        ) : (
          <>
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
