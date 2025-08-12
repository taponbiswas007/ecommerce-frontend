// src/app/categories/[id]/page.tsx
import { fetchCategoryProducts } from "@/lib/api";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";
import type { Product } from "@/types";

export default async function CategoryProductsPage({
  params,
}: {
  params: { id: string };
}) {
  const products: Product[] = await fetchCategoryProducts(Number(params.id));
  const categoryName = products[0]?.category?.name || "Category";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link
            href="/products"
            className="text-purple-400 hover:text-purple-300 mr-4"
          >
            ← Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-white">{categoryName}</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
