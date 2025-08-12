// src/app/products/page.tsx
import { fetchProducts } from "@/lib/api";
// import CategorySection from "@/components/app/CategorySection";
import type { Product, CategoryWithProducts } from "@/types";
import CategorySection from "../components/CategorySection";

export default async function ProductsPage() {
  const products: Product[] = await fetchProducts();

  // Group products by category
  const categoriesMap = new Map<number, CategoryWithProducts>();

  products.forEach((product) => {
    if (!categoriesMap.has(product.category_id)) {
      categoriesMap.set(product.category_id, {
        id: product.category_id,
        name: product.category.name,
        products: [],
      });
    }
    categoriesMap.get(product.category_id)?.products.push(product);
  });

  const categories = Array.from(categoriesMap.values());

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-purple-400">
          Our Products
        </h1>

        {categories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
