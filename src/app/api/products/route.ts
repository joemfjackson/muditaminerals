import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const sort = (searchParams.get("sort") as "price-asc" | "price-desc" | "newest" | "name") || undefined;
    const featured = searchParams.get("featured") === "true" || undefined;

    const products = await getProducts({ category, search, sort, featured });
    return NextResponse.json(products);
  } catch (err) {
    console.error("Products API error:", err);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
