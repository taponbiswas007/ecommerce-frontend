import { fetchProducts } from "@/lib/api";
import CategorySection from "@/components/home/CategorySection";
import { Product } from "@/types";
import Navbar from "@/components/shared/Navbar";
import HeroSlider from "@/components/home/HeroSlider";

export default async function Home() {
  // Fetch all active products from your API
  const products = await fetchProducts();

  // Group products by category
  const categoriesMap = new Map<
    number,
    {
      id: number;
      name: string;
      products: any[];
    }
  >();

  products.forEach((product: Product) => {
    if (!product.category) return; // Skip if product has no category

    if (!categoriesMap.has(product.category.id)) {
      categoriesMap.set(product.category.id, {
        id: product.category.id,
        name: product.category.name,
        products: [],
      });
    }
    categoriesMap.get(product.category.id)?.products.push(product);
  });

  const categories = Array.from(categoriesMap.values());

  return (
    <div>
      <Navbar />
      <HeroSlider />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Our Products
        </h1>

        {categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            products={category.products}
          />
        ))}
      </div>
    </div>
  );
}
