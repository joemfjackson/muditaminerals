import { getAdminStats, getRecentOrders } from "@/lib/admin-data";
import { formatCurrency } from "@/lib/utils";
import { Package, FolderOpen, ShoppingCart, DollarSign } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const stats = await getAdminStats();
  const recentOrders = await getRecentOrders();

  const cards = [
    {
      label: "Products",
      value: stats.productCount,
      icon: Package,
      href: "/admin/products",
    },
    {
      label: "Categories",
      value: stats.categoryCount,
      icon: FolderOpen,
      href: "/admin/categories",
    },
    {
      label: "Orders",
      value: stats.orderCount,
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      label: "Revenue",
      value: formatCurrency(stats.revenue),
      icon: DollarSign,
      href: "/admin/orders",
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl text-[var(--color-bone)] mb-6">
        Dashboard
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-[var(--color-charcoal)] border border-[var(--color-stone)] rounded-lg p-4 hover:border-[var(--color-gold)]/30 transition-colors"
            >
              <div className="flex items-center gap-2 text-[var(--color-muted)] text-sm mb-2">
                <Icon className="w-4 h-4" />
                {card.label}
              </div>
              <p className="text-2xl font-semibold text-[var(--color-bone)]">
                {card.value}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Recent orders */}
      <div className="bg-[var(--color-charcoal)] border border-[var(--color-stone)] rounded-lg">
        <div className="p-4 border-b border-[var(--color-stone)] flex items-center justify-between">
          <h2 className="font-heading text-lg text-[var(--color-bone)]">
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-sm text-[var(--color-gold)] hover:underline"
          >
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="p-4 text-[var(--color-muted)] text-sm">
            No orders yet.
          </p>
        ) : (
          <div className="divide-y divide-[var(--color-stone)]">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex items-center justify-between p-4 hover:bg-[var(--color-stone)]/20 transition-colors"
              >
                <div>
                  <p className="text-sm text-[var(--color-bone)]">
                    {order.customer_name || order.customer_email}
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[var(--color-bone)]">
                    {formatCurrency(order.total)}
                  </p>
                  <OrderStatusBadge status={order.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-400",
    processing: "bg-blue-500/10 text-blue-400",
    shipped: "bg-purple-500/10 text-purple-400",
    delivered: "bg-green-500/10 text-green-400",
    cancelled: "bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs ${
        styles[status] || "bg-[var(--color-stone)] text-[var(--color-muted)]"
      }`}
    >
      {status}
    </span>
  );
}
