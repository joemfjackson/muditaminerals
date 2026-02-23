import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem, Globe, Heart, Pickaxe, Shield, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata = {
  title: "About Us | Mudita Minerals",
  description:
    "Learn about Mudita Minerals — our story, our sourcing, and our commitment to authentic, ethically sourced crystals and minerals.",
};

const VALUES = [
  {
    icon: Pickaxe,
    title: "Ethically Sourced",
    description:
      "We work directly with trusted mines and artisan cutters around the world, ensuring fair practices and sustainable extraction at every step.",
  },
  {
    icon: Shield,
    title: "100% Authentic",
    description:
      "Every piece is verified for authenticity. No synthetics, no treatments, no misleading labels — just genuine minerals as nature intended.",
  },
  {
    icon: Heart,
    title: "Hand Selected",
    description:
      "Each specimen is personally chosen for its quality, energy, and visual beauty. We only offer pieces we'd proudly add to our own collection.",
  },
  {
    icon: Globe,
    title: "Global Sourcing",
    description:
      "From the amethyst cathedrals of Uruguay to the labradorite fields of Madagascar, we source from the world's finest mineral regions.",
  },
  {
    icon: Gem,
    title: "Collector Quality",
    description:
      "Whether you're starting your first collection or adding to a curated display, our specimens are selected to museum-grade standards.",
  },
  {
    icon: Sparkles,
    title: "Delivered with Joy",
    description:
      "Every order is carefully wrapped and shipped with the same excitement we feel when we first discover a beautiful new piece.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16 md:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <ScrollReveal>
          <div className="mb-12 sm:mb-16">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Our Story
            </p>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-bone sm:text-4xl md:text-5xl">
              About Mudita Minerals
            </h1>
            <div className="mt-4 h-0.5 w-16 bg-gold" />
          </div>
        </ScrollReveal>

        {/* Story section */}
        <ScrollReveal>
          <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-5 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                <span className="font-heading text-lg font-bold text-bone">Mudita</span> is the
                Sanskrit word for{" "}
                <em className="text-crystal">sympathetic joy</em> — the pure delight found in the
                beauty and power of the natural world. It&apos;s the feeling you get when you hold a
                perfectly formed crystal for the first time, when light catches an amethyst
                cathedral just right, or when you discover a mineral you never knew existed.
              </p>
              <p>
                Founded in Las Vegas, Nevada, Mudita Minerals was born from a lifelong passion for
                geology, gemology, and the incredible artistry of nature. What started as a personal
                collection has grown into a curated shop dedicated to sharing that joy with fellow
                mineral enthusiasts, crystal collectors, and anyone drawn to the beauty of the earth.
              </p>
              <p>
                We source every piece directly from trusted mines and artisan cutters around the
                globe — from the amethyst cathedrals of Uruguay to the labradorite fields of
                Madagascar. Each specimen is hand-selected for its quality, energy, and character.
                No mass production, no synthetic fillers — just authentic minerals unearthed with
                respect for the earth.
              </p>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-stone/50 shadow-lg shadow-black/40 lg:aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1759719441142-6db4045f39e6?w=800&q=80"
                alt="Collection of crystals and minerals"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </ScrollReveal>

        {/* Values grid */}
        <section className="mb-16">
          <ScrollReveal>
            <div className="mb-10">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-bone sm:text-3xl">
                What We Stand For
              </h2>
              <div className="mt-3 h-0.5 w-16 bg-gold" />
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.08}>
                <div className="rounded-md border border-stone/50 bg-charcoal p-6 transition-colors duration-300 hover:border-gold/30">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm border border-stone/50 bg-stone/30">
                    <value.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="mb-2 font-heading text-sm font-bold uppercase tracking-wider text-bone">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <ScrollReveal>
          <div className="rounded-md border border-stone/50 bg-charcoal p-8 text-center sm:p-12">
            <h2 className="mb-3 font-heading text-2xl font-bold uppercase tracking-wider text-bone">
              Ready to Explore?
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-sm text-muted">
              Browse our curated collection of crystals, gemstones, and mineral specimens. Every
              piece tells a story millions of years in the making.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 rounded-sm bg-gold px-8 py-4 font-heading font-bold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-gold-light"
            >
              Shop the Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
