import { NextResponse } from "next/server";
import { getCategories } from "@/lib/data";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (err) {
    console.error("Categories API error:", err);
    return NextResponse.json({ error: "Failed to load categories" }, { status: 500 });
  }
}
