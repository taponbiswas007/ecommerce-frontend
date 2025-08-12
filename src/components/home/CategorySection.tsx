import Link from "next/link";
import ProductCard from "../products/ProductCard";

export default function CategorySection({
  category,
  products,
}: {
  category: { id: number; name: string };
  products: any[];
}) {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
        <Link
          href={`/categories/${category.id}`}
          className="text-purple-600 hover:text-purple-500 text-sm font-medium"
        >
          See All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
