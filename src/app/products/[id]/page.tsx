// src/app/products/[id]/page.tsx
import { fetchProductDetails } from "@/lib/api";
import Link from "next/link";
import type { Product } from "@/types";

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const product: Product = await fetchProductDetails(Number(params.id));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-gray-800 rounded-lg overflow-hidden mb-4">
              <img
                src={`http://127.0.0.1:8000/storage/${product.main_image}`}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                product.image_1,
                product.image_2,
                product.image_3,
                product.image_4,
                product.image_5,
              ]
                .filter((img) => img)
                .map((img, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded overflow-hidden h-24"
                  >
                    <img
                      src={`http://127.0.0.1:8000/storage/${img}`}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-purple-400 text-sm">
                {product.category.name}
              </span>
            </div>

            <div className="mb-6">
              {product.discount > 0 ? (
                <div className="flex items-center">
                  <span className="text-green-500 text-3xl font-bold mr-3">
                    ${product.net_price.toFixed(2)}
                  </span>
                  <span className="text-gray-400 line-through text-xl">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded ml-3">
                    Save {Math.round((product.discount / product.price) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="text-white text-3xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-300 mb-6">{product.short_description}</p>

            <div
              className="prose prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            <div className="flex space-x-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium flex-1 transition-colors">
                Add to Cart
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium flex-1 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
