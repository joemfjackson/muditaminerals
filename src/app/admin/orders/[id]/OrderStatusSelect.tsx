"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatusAction } from "@/lib/admin-actions";

const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

export function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <select
      value={currentStatus}
      disabled={isPending}
      onChange={(e) =>
        startTransition(async () => {
          await updateOrderStatusAction(orderId, e.target.value);
          router.refresh();
        })
      }
      className={`w-full px-3 py-2 bg-[var(--color-charcoal)] border border-[var(--color-stone)] rounded text-[var(--color-bone)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors capitalize ${
        isPending ? "opacity-50" : ""
      }`}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
