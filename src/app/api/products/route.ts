import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const sort = (searchParams.get("sort") as "price-asc" | "price-desc" | "newest" | "name") || undefined;
    const featured = searchParams.get("featured") === "true" || undefined;
    const debug = searchParams.get("debug") === "1";

    const products = await getProducts({ category, search, sort, featured });

    if (debug) {
      return NextResponse.json({
        productCount: products.length,
        firstProductId: products[0]?.id ?? null,
        isMockData: products[0]?.id?.startsWith("prod-") ?? null,
        env: {
          hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          urlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) || "(not set)",
          hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        },
      });
    }

    return NextResponse.json(products);
  } catch (err) {
    console.error("Products API error:", err);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
