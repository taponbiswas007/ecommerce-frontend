import CategorySection from "./components/CategorySection";
import HeroSlider from "./components/HeroSlider";
import Navbar from "./components/Navbar";
import { fetchProducts } from "@/lib/api";
import type { CategoryWithProducts, Product } from "@/types";

export default async function HomePage() {
  // Fetch products from API
  const products = await fetchProducts();

  // Group products by category
  const categoriesMap = new Map<number, CategoryWithProducts>();

  products.forEach((product: Product) => {
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
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <HeroSlider />

      <div className="container mx-auto px-4 py-8">
        {/* Featured Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Shop by Category
          </h2>

          {categories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </section>

        {/* Welcome Message (optional) */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Welcome to Our Ecommerce Store
          </h1>
          <p className="text-gray-600">
            Discover amazing products in our carefully curated collections.
          </p>
        </div>
      </div>
    </div>
  );
}
