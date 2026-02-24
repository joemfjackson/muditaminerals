import { createServerClient } from "./supabase";
import { mockProducts, mockCategories } from "./mock-data";
import type { Product, Category } from "./types";

function tryDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    return createServerClient();
  } catch {
    return null;
  }
}

export async function getProducts(options?: {
  category?: string;
  featured?: boolean;
  search?: string;
  sort?: "price-asc" | "price-desc" | "newest" | "name";
}): Promise<Product[]> {
  const client = tryDb();
  if (client) {
    try {
      let query = client
        .from("products")
        .select("*, categories(slug)")
        .eq("active", true);

      if (options?.category) query = query.eq("categories.slug", options.category);
      if (options?.featured) query = query.eq("featured", true);
      if (options?.search) query = query.ilike("name", `%${options.search}%`);

      switch (options?.sort) {
        case "price-asc": query = query.order("price", { ascending: true }); break;
        case "price-desc": query = query.order("price", { ascending: false }); break;
        case "newest": query = query.order("created_at", { ascending: false }); break;
        case "name": query = query.order("name", { ascending: true }); break;
        default: query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query;
      if (error) {
        console.error("[data.ts] getProducts query error:", error);
      } else {
        return (data ?? []).map((p: Record<string, unknown>) => ({
          ...p,
          category_slug: (p.categories as { slug?: string } | null)?.slug ?? undefined,
        })) as Product[];
      }
    } catch (err) {
      console.error("[data.ts] getProducts exception:", err);
    }
  } else {
    console.warn("[data.ts] Supabase not available — URL:", !!process.env.NEXT_PUBLIC_SUPABASE_URL, "KEY:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  }

  // Fallback to mock data
  let products = [...mockProducts].filter((p) => p.active);
  if (options?.category) products = products.filter((p) => p.category_slug === options.category);
  if (options?.featured) products = products.filter((p) => p.featured);
  if (options?.search) {
    const q = options.search.toLowerCase();
    products = products.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (options?.sort) {
    switch (options.sort) {
      case "price-asc": products.sort((a, b) => a.price - b.price); break;
      case "price-desc": products.sort((a, b) => b.price - a.price); break;
      case "newest": products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); break;
      case "name": products.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
  }
  return products;
}

export async function getProduct(slug: string): Promise<Product | null> {
  const client = tryDb();
  if (client) {
    try {
      const { data, error } = await client
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error && data) return data as Product;
      if (error) console.error("[data.ts] getProduct error:", error);
    } catch (err) {
      console.error("[data.ts] getProduct exception:", err);
    }
  }

  return mockProducts.find((p) => p.slug === slug) || null;
}

export async function getCategories(): Promise<Category[]> {
  const client = tryDb();
  if (client) {
    try {
      const { data, error } = await client
        .from("categories")
        .select("*")
        .order("name");

      if (!error && data) return data as Category[];
      if (error) console.error("[data.ts] getCategories error:", error);
    } catch (err) {
      console.error("[data.ts] getCategories exception:", err);
    }
  }

  return mockCategories;
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 4): Promise<Product[]> {
  const client = tryDb();
  if (client) {
    try {
      const { data, error } = await client
        .from("products")
        .select("*")
        .eq("category_id", categoryId)
        .eq("active", true)
        .neq("id", productId)
        .limit(limit);

      if (!error && data) return data as Product[];
      if (error) console.error("[data.ts] getRelatedProducts error:", error);
    } catch (err) {
      console.error("[data.ts] getRelatedProducts exception:", err);
    }
  }

  return mockProducts
    .filter((p) => p.category_id === categoryId && p.id !== productId && p.active)
    .slice(0, limit);
}
