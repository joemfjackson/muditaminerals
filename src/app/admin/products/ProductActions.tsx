"use client";

import { useTransition } from "react";
import { toggleProductFieldAction, deleteProductAction } from "@/lib/admin-actions";
import { useRouter } from "next/navigation";

export function ProductToggle({
  id,
  field,
  value,
}: {
  id: string;
  field: "featured" | "active";
  value: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await toggleProductFieldAction(id, field, !value);
          router.refresh();
        })
      }
      className={`w-9 h-5 rounded-full relative transition-colors ${
        value ? "bg-[var(--color-gold)]" : "bg-[var(--color-stone)]"
      } ${isPending ? "opacity-50" : ""}`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
          value ? "left-[18px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

export function ProductDeleteButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
        startTransition(async () => {
          await deleteProductAction(id);
          router.refresh();
        });
      }}
      className="text-red-400 hover:underline text-xs disabled:opacity-50"
    >
      {isPending ? "..." : "Delete"}
    </button>
  );
}
