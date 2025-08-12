"use client";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // auth context
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } =
    useCart();
  const { isLoggedIn } = useAuth(); // **missing in your code**
  const router = useRouter(); // **missing in your code**

  const total = cart.reduce(
    (sum, item) => sum + item.net_price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (isLoggedIn) {
      router.push("/main/checkout");
    } else {
      router.push("/auth"); // লগইন/সাইনআপ পেজের URL
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            href="/"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border">Product</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Quantity</th>
                  <th className="p-3 border">Subtotal</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={`${item.id}-${index}`} className="text-center">
                    <td className="p-3 border flex items-center gap-3">
                      <Image
                        src={
                          item.main_image
                            ? `http://127.0.0.1:8000/storage/${item.main_image}`
                            : "/placeholder-product.jpg"
                        }
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded"
                        unoptimized={true}
                      />
                      <span>{item.name}</span>
                    </td>
                    <td className="p-3 border">৳{item.net_price.toFixed(2)}</td>
                    <td className="p-3 border">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) decreaseQty(item.id);
                          }}
                          className={`px-2 py-1 rounded ${
                            item.quantity > 1
                              ? "bg-gray-200 hover:bg-gray-300"
                              : "bg-gray-100 cursor-not-allowed"
                          }`}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3 border">
                      ৳{(item.net_price * item.quantity).toFixed(2)}
                    </td>
                    <td className="p-3 border">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
            <button
              onClick={clearCart}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Clear Cart
            </button>
            <div className="text-lg font-semibold">
              Total: ৳{total.toFixed(2)}
            </div>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
