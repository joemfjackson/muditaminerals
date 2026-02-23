"use client";

import { useActionState, useState } from "react";
import type { Product, Category } from "@/lib/types";
import { createProductAction, updateProductAction, type ActionState } from "@/lib/admin-actions";
import Link from "next/link";
import { X, Plus } from "lucide-react";

interface Props {
  product?: Product;
  categories: Category[];
}

export function ProductForm({ product, categories }: Props) {
  const isEdit = !!product;
  const action = isEdit ? updateProductAction : createProductAction;
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(action, { error: undefined });

  const existingProps = product?.properties
    ? Object.entries(product.properties)
    : [];
  const [properties, setProperties] = useState<[string, string][]>(
    existingProps.length > 0 ? existingProps : [["", ""]]
  );

  const addProperty = () => setProperties([...properties, ["", ""]]);
  const removeProperty = (index: number) =>
    setProperties(properties.filter((_, i) => i !== index));

  const inputClass =
    "w-full px-3 py-2 bg-[var(--color-charcoal)] border border-[var(--color-stone)] rounded text-[var(--color-bone)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] transition-colors";
  const labelClass = "block text-sm text-[var(--color-bone)] mb-1";

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {isEdit && <input type="hidden" name="id" value={product.id} />}

      {state?.error && (
        <p className="text-red-400 text-sm bg-red-400/10 px-3 py-2 rounded">
          {state.error}
        </p>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Product Name *
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={product?.name}
          className={inputClass}
          placeholder="Amethyst Cathedral Cluster"
        />
        <p className="text-xs text-[var(--color-muted)] mt-1">
          Slug is auto-generated from the name.
        </p>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClass}>
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={product?.description}
          className={inputClass}
          placeholder="A stunning deep-purple amethyst cluster..."
        />
      </div>

      {/* Price + Compare at price */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className={labelClass}>
            Price *
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product?.price}
            className={inputClass}
            placeholder="89.99"
          />
        </div>
        <div>
          <label htmlFor="compare_at_price" className={labelClass}>
            Compare at Price
          </label>
          <input
            id="compare_at_price"
            name="compare_at_price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.compare_at_price ?? ""}
            className={inputClass}
            placeholder="129.99"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category_id" className={labelClass}>
          Category
        </label>
        <select
          id="category_id"
          name="category_id"
          defaultValue={product?.category_id}
          className={inputClass}
        >
          <option value="">No category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Images */}
      <div>
        <label htmlFor="images" className={labelClass}>
          Image URLs (one per line)
        </label>
        <textarea
          id="images"
          name="images"
          rows={3}
          defaultValue={product?.images?.join("\n")}
          className={inputClass}
          placeholder={"https://example.com/image1.jpg\nhttps://example.com/image2.jpg"}
        />
      </div>

      {/* Stock */}
      <div className="w-32">
        <label htmlFor="stock" className={labelClass}>
          Stock
        </label>
        <input
          id="stock"
          name="stock"
          type="number"
          min="0"
          defaultValue={product?.stock ?? 0}
          className={inputClass}
        />
      </div>

      {/* Toggles */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-[var(--color-bone)] cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured ?? false}
            className="accent-[var(--color-gold)]"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--color-bone)] cursor-pointer">
          <input
            type="checkbox"
            name="active"
            defaultChecked={product?.active ?? true}
            className="accent-[var(--color-gold)]"
          />
          Active
        </label>
      </div>

      {/* Properties */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={labelClass}>Properties</label>
          <button
            type="button"
            onClick={addProperty}
            className="text-xs text-[var(--color-gold)] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {properties.map(([key, value], i) => (
            <div key={i} className="flex gap-2">
              <input
                name="prop_key"
                defaultValue={key}
                placeholder="e.g. origin"
                className={`${inputClass} flex-1`}
              />
              <input
                name="prop_value"
                defaultValue={value}
                placeholder="e.g. Brazil"
                className={`${inputClass} flex-1`}
              />
              {properties.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProperty(i)}
                  className="text-[var(--color-muted)] hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-[var(--color-gold)] text-[#0A0A0A] font-semibold rounded hover:bg-[var(--color-gold-light)] transition-colors disabled:opacity-50"
        >
          {isPending
            ? "Saving..."
            : isEdit
            ? "Update Product"
            : "Create Product"}
        </button>
        <Link
          href="/admin/products"
          className="px-6 py-2 border border-[var(--color-stone)] text-[var(--color-bone)] rounded hover:bg-[var(--color-stone)]/30 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
