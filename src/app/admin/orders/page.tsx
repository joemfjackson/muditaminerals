import Link from "next/link";
import { getAdminOrders } from "@/lib/admin-data";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400",
  processing: "bg-blue-500/10 text-blue-400",
  shipped: "bg-purple-500/10 text-purple-400",
  delivered: "bg-green-500/10 text-green-400",
  cancelled: "bg-red-500/10 text-red-400",
};

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div>
      <h1 className="font-heading text-2xl text-[var(--color-bone)] mb-6">
        Orders
      </h1>

      <div className="bg-[var(--color-charcoal)] border border-[var(--color-stone)] rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-stone)] text-left text-[var(--color-muted)]">
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3 hidden sm:table-cell">Date</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-stone)]">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-[var(--color-stone)]/20">
                <td className="p-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-[var(--color-gold)] hover:underline font-mono text-xs"
                  >
                    {order.id.slice(0, 8)}...
                  </Link>
                </td>
                <td className="p-3 text-[var(--color-bone)]">
                  <div>{order.customer_name}</div>
                  <div className="text-xs text-[var(--color-muted)]">
                    {order.customer_email}
                  </div>
                </td>
                <td className="p-3 hidden sm:table-cell text-[var(--color-muted)]">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="p-3 text-[var(--color-bone)]">
                  {formatCurrency(order.total)}
                </td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs capitalize ${
                      statusStyles[order.status] ||
                      "bg-[var(--color-stone)] text-[var(--color-muted)]"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[var(--color-muted)]">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
