import { createServerClient, isSupabaseConfigured } from "./supabase";
import { mockProducts, mockCategories } from "./mock-data";
import type { Product, Category, Order } from "./types";

function db() {
  return createServerClient();
}

// ---------- Stats ----------

export async function getAdminStats() {
  if (!isSupabaseConfigured()) {
    return {
      productCount: mockProducts.length,
      categoryCount: mockCategories.length,
      orderCount: 0,
      revenue: 0,
    };
  }

  const [products, categories, orders] = await Promise.all([
    db().from("products").select("id", { count: "exact", head: true }),
    db().from("categories").select("id", { count: "exact", head: true }),
    db().from("orders").select("id, total", { count: "exact" }),
  ]);

  const revenue =
    orders.data?.reduce((sum, o) => sum + (o.total || 0), 0) ?? 0;

  return {
    productCount: products.count ?? 0,
    categoryCount: categories.count ?? 0,
    orderCount: orders.count ?? 0,
    revenue,
  };
}

// ---------- Products ----------

export async function getAdminProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return mockProducts;
  }

  const { data, error } = await db()
    .from("products")
    .select("*, categories(slug)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((p) => ({
    ...p,
    category_slug: p.categories?.slug ?? undefined,
  })) as Product[];
}

export async function getAdminProduct(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return mockProducts.find((p) => p.id === id) ?? null;
  }

  const { data, error } = await db()
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Product;
}

// ---------- Categories ----------

export async function getAdminCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    return mockCategories;
  }

  const { data, error } = await db()
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function getCategoriesWithCounts(): Promise<
  (Category & { product_count: number })[]
> {
  if (!isSupabaseConfigured()) {
    return mockCategories.map((c) => ({
      ...c,
      product_count: mockProducts.filter((p) => p.category_id === c.id).length,
    }));
  }

  const { data: categories, error } = await db()
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;

  const { data: products } = await db()
    .from("products")
    .select("category_id");

  const counts: Record<string, number> = {};
  (products ?? []).forEach((p) => {
    if (p.category_id) {
      counts[p.category_id] = (counts[p.category_id] || 0) + 1;
    }
  });

  return (categories ?? []).map((c) => ({
    ...c,
    product_count: counts[c.id] || 0,
  })) as (Category & { product_count: number })[];
}

// ---------- Orders ----------

export async function getAdminOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const { data, error } = await db()
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Order[];
}

export async function getAdminOrder(id: string) {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const { data: order, error } = await db()
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;

  const { data: items } = await db()
    .from("order_items")
    .select("*, products(name, images, slug)")
    .eq("order_id", id);

  return {
    ...order,
    items: items ?? [],
  };
}

export async function getRecentOrders(limit = 5): Promise<Order[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const { data, error } = await db()
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as Order[];
}
