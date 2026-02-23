import { getCategoriesWithCounts } from "@/lib/admin-data";
import { CategoryRow, CategoryCreateForm } from "./CategoryActions";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await getCategoriesWithCounts();

  return (
    <div>
      <h1 className="font-heading text-2xl text-[var(--color-bone)] mb-6">
        Categories
      </h1>

      <div className="bg-[var(--color-charcoal)] border border-[var(--color-stone)] rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-stone)] text-left text-[var(--color-muted)]">
              <th className="p-3">Name</th>
              <th className="p-3 hidden sm:table-cell">Slug</th>
              <th className="p-3 hidden md:table-cell">Description</th>
              <th className="p-3">Products</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-stone)]">
            {categories.map((category) => (
              <CategoryRow key={category.id} category={category} />
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[var(--color-muted)]">
                  No categories yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Inline create form */}
        <div className="border-t border-[var(--color-stone)] p-3">
          <CategoryCreateForm />
        </div>
      </div>
    </div>
  );
}
