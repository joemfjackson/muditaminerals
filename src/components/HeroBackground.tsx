"use client";

import { useState } from "react";

export function HeroBackground() {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/hero-bg.jpg"
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      loading="eager"
      onError={() => setFailed(true)}
    />
  );
}
