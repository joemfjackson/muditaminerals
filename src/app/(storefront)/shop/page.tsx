import { Suspense } from "react";
import { ShopContent } from "./ShopContent";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black pt-24 pb-16 md:pt-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center sm:mb-14">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
                Browse
              </p>
              <h1 className="font-heading text-3xl tracking-wider text-bone sm:text-4xl md:text-5xl">
                The Collection
              </h1>
              <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-amethyst to-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-lg border border-stone bg-charcoal"
                >
                  <div className="aspect-[4/3] bg-stone/30" />
                  <div className="space-y-3 p-4">
                    <div className="h-2 w-16 rounded bg-stone/40" />
                    <div className="h-4 w-3/4 rounded bg-stone/40" />
                    <div className="h-5 w-20 rounded bg-stone/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
