"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
  } = useCart();

  const subtotal = totalPrice();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    },
    [closeCart]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-stone/50 bg-charcoal shadow-lg shadow-black/40 transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone/50 px-5 py-4">
          <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-bone">
            Your Cart
          </h2>
          <button
            onClick={closeCart}
            className="p-1.5 text-muted transition-colors duration-200 hover:text-bone"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5">
            <ShoppingBag className="h-10 w-10 text-muted" />
            <p className="text-sm text-muted">Your cart is empty</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="rounded-sm bg-gold px-5 py-2 font-heading text-sm font-bold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-gold-light"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <>
            {/* Items list */}
            <ul className="flex-1 overflow-y-auto px-5">
              <AnimatePresence initial={false}>
                {items.map((item) => {
                  const hasImage =
                    item.product.images.length > 0 &&
                    item.product.images[0].startsWith("http");

                  return (
                    <motion.li
                      key={item.product.id}
                      initial={{ opacity: 0, height: 0, x: 20 }}
                      animate={{ opacity: 1, height: "auto", x: 0 }}
                      exit={{ opacity: 0, height: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-4 border-b border-stone/50 py-4"
                    >
                      {/* Image / placeholder */}
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border border-stone/50">
                        {hasImage ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-stone/40 via-earth to-stone/30">
                            <span className="text-xs text-muted">No img</span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-heading text-sm font-semibold uppercase leading-snug text-bone">
                            {item.product.name}
                          </h3>
                          <p className="mt-0.5 text-sm font-bold text-gold">
                            {formatCurrency(item.product.price)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="flex h-9 w-9 sm:h-7 sm:w-7 items-center justify-center rounded-sm border border-stone/50 text-muted transition-colors duration-200 hover:border-gold/50 hover:text-bone"
                              aria-label={`Decrease quantity of ${item.product.name}`}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm tabular-nums text-bone">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="flex h-9 w-9 sm:h-7 sm:w-7 items-center justify-center rounded-sm border border-stone/50 text-muted transition-colors duration-200 hover:border-gold/50 hover:text-bone"
                              aria-label={`Increase quantity of ${item.product.name}`}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-1 text-muted transition-colors duration-200 hover:text-rust"
                            aria-label={`Remove ${item.product.name} from cart`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>

            {/* Footer */}
            <div className="border-t border-stone/50 px-5 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted">Subtotal</span>
                <span className="font-heading text-lg font-bold tracking-wide text-bone">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full rounded-sm bg-gold py-3 text-center font-heading font-bold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-gold-light"
              >
                Checkout
              </Link>

              <button
                onClick={closeCart}
                className="mt-3 block w-full text-center text-sm text-muted transition-colors duration-200 hover:text-bone"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
