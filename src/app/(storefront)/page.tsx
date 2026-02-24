export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Shield,
  Pickaxe,
  Package,
} from "lucide-react";
import { getProducts } from "@/lib/data";
import { categories } from "@/lib/branding";
import { categoryImages } from "@/lib/mock-data";
import { ProductCard } from "@/components/shop/ProductCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HeroAurora } from "@/components/HeroAurora";

const MARQUEE_ITEMS = [
  "AMETHYST",
  "ROSE QUARTZ",
  "CITRINE",
  "LABRADORITE",
  "PYRITE",
  "TOURMALINE",
  "FLUORITE",
  "SELENITE",
  "OBSIDIAN",
  "MALACHITE",
];

export default async function HomePage() {
  const featuredProducts = await getProducts({ featured: true });

  return (
    <>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-black">
        {/* Aurora WebGL background */}
        <HeroAurora />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

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
                className="mx-auto mb-5 w-72 sm:w-80 md:w-96 lg:w-[28rem]"
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
        <div className="animate-fade-in-trust relative z-10 mt-auto w-full bg-charcoal/80 backdrop-blur-sm border-t border-b border-stone/50 py-3">
          <p className="text-center text-xs uppercase tracking-widest text-muted">
            FREE SHIPPING OVER $75 &bull; 100% AUTHENTIC &bull; ETHICALLY
            SOURCED &bull; HAND SELECTED
          </p>
        </div>
      </section>

      {/* ═══════════════════ MARQUEE STRIP ═══════════════════ */}
      <div className="overflow-hidden border-b border-stone/50 bg-black py-4">
        <div className="animate-slide-left flex whitespace-nowrap">
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="flex items-center gap-8 px-4">
              {MARQUEE_ITEMS.map((name) => (
                <span
                  key={`${setIndex}-${name}`}
                  className="flex items-center gap-3 font-heading text-sm uppercase tracking-[0.3em] text-muted/50"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════ FEATURED PRODUCTS ═══════════════════ */}
      <section className="bg-black py-12 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            {/* Section heading */}
            <div className="mb-12">
              <h2 className="font-heading text-3xl font-bold uppercase tracking-wider text-bone">
                FEATURED FINDS
              </h2>
              <div className="mt-3 h-0.5 w-16 bg-gold" />
            </div>
          </ScrollReveal>

          {/* Product grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
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

      {/* ═══════════════════ SHOP BY CATEGORY ═══════════════════ */}
      <section className="bg-charcoal py-12 sm:py-20 border-t border-stone/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12">
              <h2 className="font-heading text-3xl font-bold uppercase tracking-wider text-bone">
                SHOP BY CATEGORY
              </h2>
              <div className="mt-3 h-0.5 w-16 bg-gold" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.slug} delay={i * 0.1}>
                <Link
                  href={`/shop?category=${cat.slug}`}
                  className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-md border border-stone/50 transition-all duration-300 hover:border-gold/50"
                >
                  <Image
                    src={categoryImages[cat.slug] || ""}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="relative z-10 p-4 sm:p-5">
                    <h3 className="font-heading text-base font-bold uppercase tracking-wider text-bone sm:text-lg">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-[10px] text-muted sm:text-xs">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ BRAND STORY ═══════════════════ */}
      <section className="bg-black py-12 sm:py-20 border-t border-stone/50">
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
      <section className="relative bg-charcoal py-12 sm:py-16 md:py-20 border-t border-stone/50 overflow-hidden">
        <ScrollReveal>
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
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
