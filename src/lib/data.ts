import { getSupabase, isSupabaseConfigured } from "./supabase";
import { mockProducts, mockCategories } from "./mock-data";
import type { Product, Category } from "./types";

function db() {
  return getSupabase();
}

export async function getProducts(options?: {
  category?: string;
  featured?: boolean;
  search?: string;
  sort?: "price-asc" | "price-desc" | "newest" | "name";
}): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
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

  let query = db()
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
  if (error) throw error;
  return data as Product[];
}

export async function getProduct(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return mockProducts.find((p) => p.slug === slug) || null;
  }

  const { data, error } = await db()
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Product;
}

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured) return mockCategories;

  const { data, error } = await db()
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;
  return data as Category[];
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 4): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return mockProducts
      .filter((p) => p.category_id === categoryId && p.id !== productId && p.active)
      .slice(0, limit);
  }

  const { data, error } = await db()
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .eq("active", true)
    .neq("id", productId)
    .limit(limit);

  if (error) throw error;
  return data as Product[];
}
