export const brand = {
  name: "Mudita Minerals",
  tagline: "Unearthed with Care, Delivered with Joy",
  description:
    "Curated crystals, gemstones, jewelry, and mineral specimens sourced from around the world.",
  url: "https://muditaminerals.com",
  email: "hello@muditaminerals.com",
} as const;

export const categories = [
  { name: "Crystals", slug: "crystals", description: "Raw and polished healing crystals" },
  { name: "Gemstones", slug: "gemstones", description: "Premium cut and polished gemstones" },
  { name: "Jewelry", slug: "jewelry", description: "Handcrafted crystal and gemstone jewelry" },
  { name: "Specimens", slug: "specimens", description: "Museum-quality mineral specimens" },
] as const;
