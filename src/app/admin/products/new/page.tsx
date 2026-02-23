import { getAdminCategories } from "@/lib/admin-data";
import { ProductForm } from "../ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await getAdminCategories();

  return (
    <div>
      <h1 className="font-heading text-2xl text-[var(--color-bone)] mb-6">
        New Product
      </h1>
      <ProductForm categories={categories} />
    </div>
  );
}
