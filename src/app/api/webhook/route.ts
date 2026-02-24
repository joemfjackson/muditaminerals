import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const db = createServerClient();

      // Extract customer info (Stripe v20: shipping under collected_information)
      const shipping = session.collected_information?.shipping_details ?? null;
      const customerEmail = session.customer_details?.email || "";
      const customerName =
        session.customer_details?.name || shipping?.name || "";

      // Calculate total from line items metadata
      const totalCents = session.amount_total ?? 0;
      const totalDollars = totalCents / 100;

      // Create the order
      const { data: order, error: orderError } = await db
        .from("orders")
        .insert({
          stripe_session_id: session.id,
          status: "pending",
          customer_email: customerEmail,
          customer_name: customerName,
          shipping_address: shipping?.address ?? {},
          total: totalDollars,
        })
        .select("id")
        .single();

      if (orderError || !order) {
        console.error("Failed to create order:", orderError);
        return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
      }

      // Parse items from metadata and create order_items
      const itemsStr = session.metadata?.items || "";
      if (itemsStr) {
        const pairs = itemsStr.split(",");
        const productIds = pairs.map((p) => p.split(":")[0]);

        // Look up products for prices
        const { data: products } = await db
          .from("products")
          .select("id, price")
          .in("id", productIds);

        const priceMap = new Map(products?.map((p) => [p.id, p.price]) ?? []);

        const orderItems = pairs.map((pair) => {
          const [productId, qtyStr] = pair.split(":");
          return {
            order_id: order.id,
            product_id: productId,
            quantity: parseInt(qtyStr, 10),
            price: priceMap.get(productId) ?? 0,
          };
        });

        const { error: itemsError } = await db
          .from("order_items")
          .insert(orderItems);

        if (itemsError) {
          console.error("Failed to create order items:", itemsError);
        }
      }

      console.log(`Order ${order.id} created for session ${session.id}`);
    } catch (err) {
      console.error("Failed to create order from webhook:", err);
      return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
