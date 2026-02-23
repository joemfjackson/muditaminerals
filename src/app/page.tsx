import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Shield,
  Pickaxe,
  Package,
} from "lucide-react";
import { getProducts } from "@/lib/data";
import { ProductCard } from "@/components/shop/ProductCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GradientMesh } from "@/components/GradientMesh";

export default async function HomePage() {
  const featuredProducts = await getProducts({ featured: true });

  return (
    <>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative flex min-h-[85vh] flex-col overflow-hidden bg-black">
        {/* Animated gradient mesh background */}
        <GradientMesh />

        {/* Content — centered in space above trust strip */}
        <div className="relative z-10 flex flex-1 items-center justify-center pt-20">
          <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
          {/* Logo */}
          <div className="animate-fade-in-heading">
            <Image
              src="/logo-v2.png"
              alt="Mudita Minerals"
              width={320}
              height={320}
              className="mx-auto mb-5 w-64 sm:w-80 md:w-96"
              priority
            />
          </div>

          {/* Gold rule */}
          <div className="mb-4 h-0.5 w-24 bg-gold" />

          {/* Tagline */}
          <p className="animate-fade-in-subheading mb-8 font-heading text-sm uppercase tracking-[0.25em] text-muted sm:text-base">
            UNEARTHED WITH CARE, DELIVERED WITH JOY
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-buttons flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 rounded-sm bg-gold px-8 py-4 font-heading font-bold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-gold-light"
            >
              SHOP THE COLLECTION
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-sm border-2 border-stone px-8 py-4 font-heading uppercase tracking-wider text-bone transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              OUR STORY
            </Link>
          </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="animate-fade-in-trust relative z-10 mt-auto w-full bg-charcoal border-t border-b border-stone/50 py-3">
          <p className="text-center text-xs uppercase tracking-widest text-muted">
            FREE SHIPPING OVER $75 &bull; 100% AUTHENTIC &bull; ETHICALLY
            SOURCED &bull; HAND SELECTED
          </p>
        </div>
      </section>

      {/* ═══════════════════ FEATURED PRODUCTS ═══════════════════ */}
      <section className="bg-black py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            {/* Section heading — left aligned */}
            <div className="mb-12">
              <h2 className="font-heading text-3xl font-bold uppercase tracking-wider text-bone">
                FEATURED FINDS
              </h2>
              <div className="mt-3 h-0.5 w-16 bg-gold" />
            </div>
          </ScrollReveal>

          {/* Product grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <ScrollReveal
                key={product.id}
                delay={index * 0.1}
                direction="up"
              >
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>

          {/* View all link */}
          <ScrollReveal delay={0.4}>
            <div className="mt-12">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 font-heading text-sm uppercase tracking-wider text-muted transition-colors duration-200 hover:text-gold"
              >
                VIEW FULL COLLECTION
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════ BRAND STORY ═══════════════════ */}
      <section className="bg-charcoal py-20 border-t border-stone/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid items-start gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
              {/* Text column */}
              <div>
                <h2 className="mb-6 font-heading text-3xl font-bold uppercase tracking-wider text-bone">
                  WHY MUDITA?
                </h2>
                <div className="space-y-4 text-sm leading-relaxed text-muted">
                  <p>
                    Mudita is the Sanskrit word for{" "}
                    <em className="text-crystal">sympathetic joy</em> — the
                    pure delight found in the beauty and power of the natural
                    world. We source every crystal, gemstone, and mineral
                    specimen directly from trusted mines and artisan cutters
                    around the globe.
                  </p>
                  <p>
                    Each piece in our collection is hand-selected for its
                    quality, energy, and character. No mass production, no
                    synthetic fillers — just authentic minerals unearthed with
                    respect for the earth and delivered with care to your door.
                  </p>
                </div>

                {/* Value props */}
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    {
                      icon: Pickaxe,
                      title: "ETHICALLY SOURCED",
                      sub: "Direct from mines",
                    },
                    {
                      icon: Shield,
                      title: "100% AUTHENTIC",
                      sub: "No synthetics",
                    },
                    {
                      icon: Package,
                      title: "HAND SELECTED",
                      sub: "Quality first",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm border border-stone/50 bg-stone/30">
                        <item.icon className="h-4 w-4 text-gold" />
                      </div>
                      <div>
                        <p className="font-heading text-sm font-semibold uppercase text-bone">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical gold line accent */}
              <div className="hidden lg:flex lg:items-stretch lg:justify-center lg:px-8">
                <div className="w-0.5 bg-gold/40" style={{ minHeight: "300px" }} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════ CTA BANNER ═══════════════════ */}
      <section className="bg-black py-16 sm:py-20 border-t border-stone/50">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="mb-4 font-heading text-3xl font-bold uppercase tracking-wider text-bone">
              START YOUR COLLECTION
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-muted">
              Explore our curated selection of crystals, gemstones, and mineral
              specimens. Every piece tells a story millions of years in the
              making.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 rounded-sm bg-gold px-8 py-4 font-heading font-bold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-gold-light"
            >
              BROWSE THE COLLECTION
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
