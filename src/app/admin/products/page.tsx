import Link from "next/link";
import { getAdminProducts, getAdminCategories } from "@/lib/admin-data";
import { formatCurrency } from "@/lib/utils";
import { Plus } from "lucide-react";
import { ProductToggle, ProductDeleteButton } from "./ProductActions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getAdminProducts(),
    getAdminCategories(),
  ]);

  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-[var(--color-bone)]">
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-gold)] text-[#0A0A0A] text-sm font-semibold rounded hover:bg-[var(--color-gold-light)] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="bg-[var(--color-charcoal)] border border-[var(--color-stone)] rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-stone)] text-left text-[var(--color-muted)]">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3 hidden md:table-cell">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3 hidden sm:table-cell">Stock</th>
              <th className="p-3">Featured</th>
              <th className="p-3">Active</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-stone)]">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-[var(--color-stone)]/20">
                <td className="p-3">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-10 h-10 rounded object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded bg-[var(--color-stone)]" />
                  )}
                </td>
                <td className="p-3 text-[var(--color-bone)] font-medium">
                  {product.name}
                </td>
                <td className="p-3 hidden md:table-cell text-[var(--color-muted)]">
                  {categoryMap[product.category_id] || "—"}
                </td>
                <td className="p-3 text-[var(--color-bone)]">
                  {formatCurrency(product.price)}
                  {product.compare_at_price && (
                    <span className="text-[var(--color-muted)] line-through ml-1 text-xs">
                      {formatCurrency(product.compare_at_price)}
                    </span>
                  )}
                </td>
                <td className="p-3 hidden sm:table-cell text-[var(--color-muted)]">
                  {product.stock}
                </td>
                <td className="p-3">
                  <ProductToggle
                    id={product.id}
                    field="featured"
                    value={product.featured}
                  />
                </td>
                <td className="p-3">
                  <ProductToggle
                    id={product.id}
                    field="active"
                    value={product.active}
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-[var(--color-gold)] hover:underline text-xs"
                    >
                      Edit
                    </Link>
                    <ProductDeleteButton id={product.id} name={product.name} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-[var(--color-muted)]">
                  No products yet.{" "}
                  <Link href="/admin/products/new" className="text-[var(--color-gold)] hover:underline">
                    Create one
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
