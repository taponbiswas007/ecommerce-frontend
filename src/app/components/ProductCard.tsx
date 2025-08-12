import React from "react";
import Link from "next/link";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 hover:shadow-purple-500/20">
      <div className="relative">
        <img
          src={`http://127.0.0.1:8000/storage/${product.main_image}`}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            {Math.round((product.discount / product.price) * 100)}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-2 line-clamp-2">
          {product.short_description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div>
            {product.discount > 0 ? (
              <>
                <span className="text-green-500 font-bold text-lg">
                  ${product.net_price.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through text-sm ml-2">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-white font-bold text-lg">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded text-center text-sm font-medium transition-colors"
          >
            View Details
          </Link>
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
