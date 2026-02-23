import { notFound } from "next/navigation";
import Link from "next/link";
import { Package, Shield, Truck, RotateCcw } from "lucide-react";
import { getProduct, getRelatedProducts } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { ProductCard } from "@/components/shop/ProductCard";
import { AddToCartButton } from "./AddToCartButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.id,
    product.category_id
  );

  const properties = product.properties || {};
  const propertyEntries = Object.entries(properties).filter(
    ([, value]) => value
  );

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 md:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-muted transition-colors duration-200 hover:text-gold"
        >
          &larr; Back to Collection
        </Link>

        {/* Main content */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-md border border-stone/50 bg-charcoal shadow-lg shadow-black/40">
              <div className="absolute inset-0 bg-gradient-to-br from-stone/40 via-earth to-stone/30" />

              {/* Sale badge */}
              {product.compare_at_price && (
                <div className="absolute left-4 top-4 rounded-sm bg-rust px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                  Sale
                </div>
              )}
            </div>

            {/* Thumbnail placeholders */}
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`aspect-square overflow-hidden rounded-md border bg-charcoal ${
                    i === 0
                      ? "border-gold/50"
                      : "border-stone/50 opacity-50"
                  }`}
                >
                  <div className="h-full w-full bg-gradient-to-br from-stone/40 via-earth/30 to-stone/20" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product details */}
          <div className="flex flex-col">
            {/* Category tag */}
            {product.category_slug && (
              <Link
                href={`/shop?category=${product.category_slug}`}
                className="mb-3 inline-flex w-fit text-xs font-medium uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-gold"
              >
                {product.category_slug}
              </Link>
            )}

            {/* Product name */}
            <h1 className="mb-4 font-heading text-2xl font-bold uppercase text-bone md:text-3xl">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gold">
                {formatCurrency(product.price)}
              </span>
              {product.compare_at_price && (
                <span className="text-lg text-muted line-through">
                  {formatCurrency(product.compare_at_price)}
                </span>
              )}
              {product.compare_at_price && (
                <span className="rounded-sm bg-rust/20 px-2 py-0.5 text-xs font-bold text-rust">
                  Save{" "}
                  {formatCurrency(product.compare_at_price - product.price)}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="mb-6 h-px bg-stone/50" />

            {/* Description */}
            <p className="mb-8 text-sm leading-relaxed text-muted">
              {product.description}
            </p>

            {/* Properties table */}
            {propertyEntries.length > 0 && (
              <div className="mb-8 overflow-hidden border border-stone/50">
                <table className="w-full text-sm">
                  <tbody>
                    {propertyEntries.map(([key, value]) => (
                      <tr
                        key={key}
                        className="border-b border-stone/50 last:border-b-0"
                      >
                        <td className="px-4 py-3 font-bold capitalize text-bone">
                          {key}
                        </td>
                        <td className="px-4 py-3 text-muted">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Stock indicator */}
            <div className="mb-6 flex items-center gap-2">
              {product.stock > 5 ? (
                <>
                  <span className="h-2 w-2 rounded-none bg-green-500" />
                  <span className="text-sm text-green-400">In Stock</span>
                </>
              ) : product.stock > 0 ? (
                <>
                  <span className="h-2 w-2 rounded-none bg-amber-500" />
                  <span className="text-sm text-amber-400">
                    Only {product.stock} left
                  </span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-none bg-red-500" />
                  <span className="text-sm text-red-400">Out of Stock</span>
                </>
              )}
            </div>

            {/* Add to Cart */}
            <AddToCartButton product={product} />

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders $75+" },
                { icon: Shield, label: "Secure Checkout", sub: "SSL Encrypted" },
                { icon: RotateCcw, label: "Easy Returns", sub: "30-Day Policy" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="rounded-sm border border-stone/50 bg-charcoal px-2 py-3 text-center"
                >
                  <badge.icon className="mx-auto mb-1.5 h-4 w-4 text-crystal" />
                  <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-bone sm:text-xs">
                    {badge.label}
                  </p>
                  <p className="text-[9px] text-muted sm:text-[10px]">
                    {badge.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-stone/50 pt-16">
            <div className="mb-10">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-bone">
                You May Also Like
              </h2>
              <div className="mt-3 h-0.5 w-16 bg-gold" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
