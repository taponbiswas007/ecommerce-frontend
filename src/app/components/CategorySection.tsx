import React from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import type { CategoryWithProducts } from "@/types";

interface CategorySectionProps {
  category: CategoryWithProducts;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{category.name}</h2>
        <Link
          href={`/categories/${category.id}`}
          className="text-purple-400 hover:text-purple-300 text-sm font-medium"
        >
          See All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
