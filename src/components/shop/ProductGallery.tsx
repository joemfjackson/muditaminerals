"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  hasComparePrice: boolean;
}

export function ProductGallery({
  images,
  productName,
  hasComparePrice,
}: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const hasImages = images.length > 0 && images[0].startsWith("http");

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-md border border-stone/50 bg-charcoal shadow-lg shadow-black/40">
        {hasImages ? (
          <Image
            key={selected}
            src={images[selected] || images[0]}
            alt={productName}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain transition-opacity duration-300"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone/40 via-earth to-stone/30" />
        )}

        {/* Sale badge */}
        {hasComparePrice && (
          <div className="absolute left-4 top-4 z-10 rounded-sm bg-rust px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            Sale
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {hasImages && images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative aspect-square overflow-hidden rounded-md border bg-charcoal transition-all duration-200 ${
                i === selected
                  ? "border-gold/50 ring-1 ring-gold/30"
                  : "border-stone/50 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} view ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
