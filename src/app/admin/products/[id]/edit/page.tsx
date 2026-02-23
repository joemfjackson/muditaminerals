import { notFound } from "next/navigation";
import { getAdminProduct, getAdminCategories } from "@/lib/admin-data";
import { ProductForm } from "../../ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getAdminProduct(id),
    getAdminCategories(),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl text-[var(--color-bone)] mb-6">
        Edit Product
      </h1>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
