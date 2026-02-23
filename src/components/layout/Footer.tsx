import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Pickaxe } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const shopLinks = [
    { href: "/shop", label: "Shop All" },
    { href: "/shop?category=crystals", label: "Crystals" },
    { href: "/shop?category=gemstones", label: "Gemstones" },
    { href: "/shop?category=jewelry", label: "Jewelry" },
    { href: "/shop?category=specimens", label: "Specimens" },
  ];

  const companyLinks = [
    { href: "#", label: "About Us" },
    { href: "#", label: "Contact" },
    { href: "#", label: "Shipping & Returns" },
    { href: "#", label: "FAQ" },
  ];

  return (
    <footer className="border-t-2 border-gold/30 bg-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-v2.png"
                alt="Mudita Minerals"
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Unearthed with care. Curated crystals, gemstones, and mineral
              specimens sourced from around the world.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-gold">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-gold">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-gold">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-muted">
                <Mail className="h-4 w-4 text-crystal" />
                hello@muditaminerals.com
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted">
                <MapPin className="h-4 w-4 text-crystal" />
                Las Vegas, NV
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted">
                <Pickaxe className="h-4 w-4 text-crystal" />
                Ethically Sourced
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-12 border-t border-stone/50 pt-8">
          <p className="text-xs text-muted/50">
            &copy; {currentYear} Mudita Minerals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
