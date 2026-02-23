"use client";

import { useActionState, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
  type ActionState,
} from "@/lib/admin-actions";
import type { Category } from "@/lib/types";
import { Pencil, Trash2, Check, X } from "lucide-react";

const inputClass =
  "px-2 py-1 bg-[var(--color-charcoal)] border border-[var(--color-stone)] rounded text-[var(--color-bone)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors";

export function CategoryRow({
  category,
}: {
  category: Category & { product_count: number };
}) {
  const [editing, setEditing] = useState(false);
  const [deleting, startDelete] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (category.product_count > 0) {
      alert(
        `Cannot delete "${category.name}" — it has ${category.product_count} product(s). Reassign them first.`
      );
      return;
    }
    if (!confirm(`Delete "${category.name}"?`)) return;
    startDelete(async () => {
      await deleteCategoryAction(category.id);
      router.refresh();
    });
  };

  if (editing) {
    return (
      <CategoryEditRow
        category={category}
        onCancel={() => setEditing(false)}
      />
    );
  }

  return (
    <tr className="hover:bg-[var(--color-stone)]/20">
      <td className="p-3 text-[var(--color-bone)] font-medium">
        {category.name}
      </td>
      <td className="p-3 hidden sm:table-cell text-[var(--color-muted)]">
        {category.slug}
      </td>
      <td className="p-3 hidden md:table-cell text-[var(--color-muted)]">
        {category.description || "—"}
      </td>
      <td className="p-3 text-[var(--color-muted)]">
        {category.product_count}
      </td>
      <td className="p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing(true)}
            className="text-[var(--color-gold)] hover:text-[var(--color-gold-light)]"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-400 hover:text-red-300 disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function CategoryEditRow({
  category,
  onCancel,
}: {
  category: Category;
  onCancel: () => void;
}) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    updateCategoryAction,
    { error: undefined }
  );

  return (
    <tr>
      <td colSpan={5} className="p-3">
        <form action={formAction} className="flex gap-2 items-start flex-wrap">
          <input type="hidden" name="id" value={category.id} />
          <input
            name="name"
            defaultValue={category.name}
            required
            placeholder="Name"
            className={`${inputClass} w-40`}
          />
          <input
            name="description"
            defaultValue={category.description ?? ""}
            placeholder="Description (optional)"
            className={`${inputClass} flex-1 min-w-[200px]`}
          />
          <button
            type="submit"
            disabled={isPending}
            className="p-1.5 bg-[var(--color-gold)] text-[#0A0A0A] rounded hover:bg-[var(--color-gold-light)] disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 border border-[var(--color-stone)] text-[var(--color-muted)] rounded hover:bg-[var(--color-stone)]/30"
          >
            <X className="w-4 h-4" />
          </button>
          {state?.error && (
            <p className="text-red-400 text-xs w-full">{state.error}</p>
          )}
        </form>
      </td>
    </tr>
  );
}

export function CategoryCreateForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    createCategoryAction,
    { error: undefined }
  );

  return (
    <form action={formAction} className="flex gap-2 items-start flex-wrap">
      <input
        name="name"
        required
        placeholder="New category name"
        className={`${inputClass} w-40`}
      />
      <input
        name="description"
        placeholder="Description (optional)"
        className={`${inputClass} flex-1 min-w-[200px]`}
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-3 py-1 bg-[var(--color-gold)] text-[#0A0A0A] text-sm font-semibold rounded hover:bg-[var(--color-gold-light)] disabled:opacity-50"
      >
        {isPending ? "Adding..." : "Add"}
      </button>
      {state?.error && (
        <p className="text-red-400 text-xs w-full">{state.error}</p>
      )}
    </form>
  );
}
