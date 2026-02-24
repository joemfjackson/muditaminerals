"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-emerald-500" />
        <h1 className="mt-6 font-heading text-2xl font-bold uppercase tracking-wider text-bone">
          Payment Successful!
        </h1>
        <p className="mt-3 text-muted">
          Thank you for your order. You&apos;ll receive a confirmation email
          shortly.
        </p>
        {sessionId && (
          <p className="mt-2 text-xs text-stone">
            Reference: {sessionId.slice(0, 24)}...
          </p>
        )}
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-sm bg-gold px-6 py-3 font-heading font-bold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-gold-light"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-muted">
          Loading...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
