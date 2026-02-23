"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];

const SCROLL_THRESHOLD = 5;
const SCROLL_TOP_ZONE = 50;

export function Header() {
  const { toggleCart, totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const itemCount = totalItems();

  // ---------- scroll direction detection ----------
  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;

    if (currentY < SCROLL_TOP_ZONE) {
      setVisible(true);
      lastScrollY.current = currentY;
      return;
    }

    const delta = currentY - lastScrollY.current;
    if (Math.abs(delta) < SCROLL_THRESHOLD) return;

    setVisible(delta < 0);
    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ---------- close mobile nav on resize to desktop ----------
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ---------- lock body scroll when mobile menu is open ----------
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-transform duration-200 ease-out",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* ===== Top bar with backdrop blur ===== */}
      <div className="bg-charcoal/90 backdrop-blur-md border-b-2 border-gold/30">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ---- Logo ---- */}
          <Link
            href="/"
            className="flex-shrink-0"
            aria-label="Mudita Minerals — Home"
          >
            <Image
              src="/logo-v2.png"
              alt="Mudita Minerals"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
              priority
            />
          </Link>

          {/* ---- Desktop nav links (center) ---- */}
          <nav
            className="hidden md:flex md:items-center md:gap-8"
            aria-label="Main"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider text-bone/70 transition-colors duration-200 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ---- Right actions ---- */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <Link
              href="/shop"
              className={cn(
                "hidden md:inline-flex",
                "rounded-sm px-5 py-2",
                "bg-gold text-black",
                "font-heading font-bold uppercase tracking-wider text-sm",
                "transition-colors duration-200 hover:bg-gold-light"
              )}
            >
              Shop Now
            </Link>

            {/* Cart button */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 text-bone/70 transition-colors duration-200 hover:text-gold"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span
                  key={itemCount}
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-sm bg-amethyst text-[10px] font-bold text-white animate-badge-pop"
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="p-2.5 text-bone/70 transition-colors duration-200 hover:text-gold md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ===== Mobile dropdown ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-charcoal/95 backdrop-blur-md border-t border-stone/50 overflow-hidden md:hidden"
          >
            <nav className="flex flex-col px-4 py-3" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium uppercase tracking-wider text-bone/70 transition-colors duration-200 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "mt-2 flex items-center justify-center",
                  "rounded-sm px-4 py-3",
                  "bg-gold text-black",
                  "font-heading font-bold uppercase tracking-wider text-sm",
                  "transition-colors duration-200 hover:bg-gold-light"
                )}
              >
                Shop Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
