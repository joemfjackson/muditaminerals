"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gold" />
        <h1 className="mt-6 font-heading text-2xl font-bold uppercase tracking-wider text-bone">
          Checkout Cancelled
        </h1>
        <p className="mt-3 text-muted">
          Your cart is still waiting for you. No payment was processed.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-sm bg-gold px-6 py-3 font-heading font-bold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-gold-light"
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
