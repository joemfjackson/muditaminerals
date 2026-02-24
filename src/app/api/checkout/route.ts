import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase";

type CheckoutItem = {
  productId: string;
  quantity: number;
};

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY to enable checkout." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const items: CheckoutItem[] = body.items;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Look up each product in Supabase to get the real price
    const db = createServerClient();
    const productIds = items.map((i) => i.productId);

    const { data: products, error } = await db
      .from("products")
      .select("id, name, description, price, images, active, stock")
      .in("id", productIds);

    if (error) {
      console.error("Product lookup error:", error);
      return NextResponse.json({ error: "Failed to look up products" }, { status: 500 });
    }

    const productMap = new Map(products.map((p) => [p.id, p]));

    const lineItems = [];
    const metadataPairs: string[] = [];

    for (const item of items) {
      const product = productMap.get(item.productId);

      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 400 }
        );
      }

      if (!product.active) {
        return NextResponse.json(
          { error: `${product.name} is no longer available` },
          { status: 400 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Not enough stock for ${product.name} (${product.stock} available)` },
          { status: 400 }
        );
      }

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            ...(product.description && { description: product.description }),
            ...(product.images?.[0]?.startsWith("http") && {
              images: [product.images[0]],
            }),
          },
          unit_amount: Math.round(product.price * 100), // price is in dollars, Stripe wants cents
        },
        quantity: item.quantity,
      });

      metadataPairs.push(`${item.productId}:${item.quantity}`);
    }

    const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["US"] },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
      metadata: {
        items: metadataPairs.join(","),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
