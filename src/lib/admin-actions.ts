"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerClient } from "./supabase";
import { slugify } from "./utils";

export type ActionState = { error: string | undefined };

// ---------- Auth ----------

function generateToken(password: string): string {
  let hash = 0;
  const str = `mudita-admin:${password}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return `admin_${Math.abs(hash).toString(36)}`;
}

export async function loginAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: "ADMIN_PASSWORD not configured on the server." };
  }

  if (password !== adminPassword) {
    return { error: "Invalid password." };
  }

  const token = generateToken(adminPassword);
  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/admin/login");
}

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const expected = generateToken(process.env.ADMIN_PASSWORD || "");
  if (!token || token !== expected) {
    redirect("/admin/login");
  }
}

function db() {
  return createServerClient();
}

// ---------- Products ----------

export async function createProductAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const name = formData.get("name") as string;
  const slug = slugify(name);
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const compareAtPrice = formData.get("compare_at_price") as string;
  const categoryId = formData.get("category_id") as string;
  const imagesRaw = formData.get("images") as string;
  const stock = parseInt(formData.get("stock") as string) || 0;
  const featured = formData.get("featured") === "on";
  const active = formData.get("active") !== "off"; // default on

  // Parse properties
  const propKeys = formData.getAll("prop_key") as string[];
  const propValues = formData.getAll("prop_value") as string[];
  const properties: Record<string, string> = {};
  propKeys.forEach((key, i) => {
    if (key.trim() && propValues[i]?.trim()) {
      properties[key.trim()] = propValues[i].trim();
    }
  });

  const images = imagesRaw
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);

  const focalPointRaw = formData.get("focal_point") as string;
  const focal_point = focalPointRaw ? JSON.parse(focalPointRaw) : { x: 50, y: 50 };

  const { error } = await db().from("products").insert({
    name,
    slug,
    description,
    price,
    compare_at_price: compareAtPrice ? parseFloat(compareAtPrice) : null,
    category_id: categoryId || null,
    images,
    stock,
    featured,
    active,
    properties: Object.keys(properties).length > 0 ? properties : null,
    focal_point,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProductAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const slug = slugify(name);
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const compareAtPrice = formData.get("compare_at_price") as string;
  const categoryId = formData.get("category_id") as string;
  const imagesRaw = formData.get("images") as string;
  const stock = parseInt(formData.get("stock") as string) || 0;
  const featured = formData.get("featured") === "on";
  const active = formData.get("active") !== "off";

  const propKeys = formData.getAll("prop_key") as string[];
  const propValues = formData.getAll("prop_value") as string[];
  const properties: Record<string, string> = {};
  propKeys.forEach((key, i) => {
    if (key.trim() && propValues[i]?.trim()) {
      properties[key.trim()] = propValues[i].trim();
    }
  });

  const images = imagesRaw
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);

  const focalPointRaw = formData.get("focal_point") as string;
  const focal_point = focalPointRaw ? JSON.parse(focalPointRaw) : { x: 50, y: 50 };

  const { error } = await db()
    .from("products")
    .update({
      name,
      slug,
      description,
      price,
      compare_at_price: compareAtPrice ? parseFloat(compareAtPrice) : null,
      category_id: categoryId || null,
      images,
      stock,
      featured,
      active,
      properties: Object.keys(properties).length > 0 ? properties : null,
      focal_point,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProductAction(id: string) {
  await requireAdmin();

  const { error } = await db().from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
}

export async function toggleProductFieldAction(
  id: string,
  field: "featured" | "active",
  value: boolean
) {
  await requireAdmin();

  const { error } = await db()
    .from("products")
    .update({ [field]: value, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
}

// ---------- Categories ----------

export async function createCategoryAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const name = formData.get("name") as string;
  const slug = slugify(name);
  const description = (formData.get("description") as string) || null;

  const { error } = await db()
    .from("categories")
    .insert({ name, slug, description });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/shop");
  revalidatePath("/");
  return { error: undefined };
}

export async function updateCategoryAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const slug = slugify(name);
  const description = (formData.get("description") as string) || null;

  const { error } = await db()
    .from("categories")
    .update({ name, slug, description })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/shop");
  revalidatePath("/");
  return { error: undefined };
}

export async function deleteCategoryAction(id: string) {
  await requireAdmin();

  const { error } = await db().from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  revalidatePath("/shop");
  revalidatePath("/");
}

// ---------- Orders ----------

export async function updateOrderStatusAction(
  id: string,
  status: string
) {
  await requireAdmin();

  const { error } = await db()
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
}
