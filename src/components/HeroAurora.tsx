"use client";

import { useEffect, useState } from "react";
import Aurora from "@/components/Aurora";

export function HeroAurora() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR / first-paint fallback: static gradient
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-amethyst-dark/30 via-black to-gold/10" />
    );
  }

  return (
    <div className="absolute inset-0">
      <Aurora
        colorStops={["#3d1a6e", "#C5A55A", "#7B2FBE"]}
        amplitude={1.2}
        blend={0.6}
        speed={0.4}
      />
    </div>
  );
}
