"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: any }) {
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();

  const imageUrl = product.main_image
    ? `http://127.0.0.1:8000/storage/${product.main_image}`
    : "/placeholder-product.jpg";

  const handleAdd = () => {
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 300);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round((product.discount / product.price) * 100)}% OFF
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-purple-600 transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.short_description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ৳{product.net_price.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ৳{product.price.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">{product.unit}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            disabled={adding}
            className={`flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition ${
              adding ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>

          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md text-center transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
