import { notFound } from "next/navigation";
import { getAdminOrder } from "@/lib/admin-data";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { OrderStatusSelect } from "./OrderStatusSelect";

interface OrderItemRow {
  id: string;
  quantity: number;
  price: number;
  products?: { name: string; images: string[]; slug: string } | null;
}

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getAdminOrder(id);

  if (!order) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/orders"
          className="text-[var(--color-muted)] hover:text-[var(--color-bone)] text-sm"
        >
          &larr; Orders
        </Link>
        <h1 className="font-heading text-2xl text-[var(--color-bone)]">
          Order Details
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Order info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-[var(--color-charcoal)] border border-[var(--color-stone)] rounded-lg">
            <h2 className="p-4 border-b border-[var(--color-stone)] font-heading text-lg text-[var(--color-bone)]">
              Items
            </h2>
            <div className="divide-y divide-[var(--color-stone)]">
              {(order.items as OrderItemRow[]).map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4">
                  {item.products?.images && item.products.images.length > 0 && (
                    <img
                      src={item.products.images[0]}
                      alt=""
                      className="w-12 h-12 rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-[var(--color-bone)] text-sm font-medium">
                      {item.products?.name || "Unknown Product"}
                    </p>
                    <p className="text-xs text-[var(--color-muted)]">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-[var(--color-bone)] text-sm">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-[var(--color-stone)] text-right">
              <span className="text-[var(--color-muted)] text-sm mr-3">
                Total
              </span>
              <span className="text-[var(--color-bone)] font-semibold">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-[var(--color-charcoal)] border border-[var(--color-stone)] rounded-lg p-4">
            <h3 className="text-sm text-[var(--color-muted)] mb-2">Status</h3>
            <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
          </div>

          {/* Customer */}
          <div className="bg-[var(--color-charcoal)] border border-[var(--color-stone)] rounded-lg p-4">
            <h3 className="text-sm text-[var(--color-muted)] mb-2">
              Customer
            </h3>
            <p className="text-[var(--color-bone)] text-sm">
              {order.customer_name}
            </p>
            <p className="text-[var(--color-muted)] text-sm">
              {order.customer_email}
            </p>
          </div>

          {/* Shipping */}
          {order.shipping_address && (
            <div className="bg-[var(--color-charcoal)] border border-[var(--color-stone)] rounded-lg p-4">
              <h3 className="text-sm text-[var(--color-muted)] mb-2">
                Shipping Address
              </h3>
              <div className="text-[var(--color-bone)] text-sm space-y-0.5">
                {Object.entries(order.shipping_address).map(([key, val]) => (
                  <p key={key}>{val as string}</p>
                ))}
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="bg-[var(--color-charcoal)] border border-[var(--color-stone)] rounded-lg p-4">
            <h3 className="text-sm text-[var(--color-muted)] mb-2">Details</h3>
            <div className="text-sm space-y-1">
              <p className="text-[var(--color-muted)]">
                Order ID:{" "}
                <span className="text-[var(--color-bone)] font-mono text-xs">
                  {order.id}
                </span>
              </p>
              <p className="text-[var(--color-muted)]">
                Date:{" "}
                <span className="text-[var(--color-bone)]">
                  {new Date(order.created_at).toLocaleString()}
                </span>
              </p>
              {order.stripe_session_id && (
                <p className="text-[var(--color-muted)]">
                  Stripe:{" "}
                  <span className="text-[var(--color-bone)] font-mono text-xs">
                    {order.stripe_session_id.slice(0, 20)}...
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
