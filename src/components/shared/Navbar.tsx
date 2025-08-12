"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  ShoppingCart,
  User,
  LogIn,
  LogOut,
  Search,
  Menu,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const OFFERS = [
  "🔥 50% OFF on First Order | Use Code: WELCOME50",
  "🚀 Free Shipping on Orders Over $50",
  "🎉 Buy 1 Get 1 Free on Selected Items",
  "💎 New Arrivals Every Week",
];

export default function Navbar({
  isLoggedIn,
  username,
  toggleLogin,
}: {
  isLoggedIn: boolean;
  username: string;
  toggleLogin: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", price: 29.99, quantity: 1 },
    { id: 2, name: "Product 2", price: 49.99, quantity: 2 },
  ]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate total items in cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Auto-rotate offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % OFFERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle cart operations
  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const { cart } = useCart();

  return (
    <>
      {/* Top Offer Bar */}
      <div className="bg-gradient-to-r from-purple-900 via-green-600 to-purple-900 text-white text-sm font-medium py-2 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block whitespace-nowrap animate-marquee">
            {OFFERS.map((offer, index) => (
              <span
                key={index}
                className={`mx-8 inline-block transition-opacity duration-500 ${
                  index === currentOfferIndex
                    ? "opacity-100"
                    : "opacity-0 absolute"
                }`}
              >
                {offer}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-black shadow-lg sticky top-0 z-50 border-b border-purple-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-green-300 to-purple-400 bg-clip-text text-transparent">
                  Sobkichu360
                </span>
              </Link>
            </div>

            {/* Desktop Navigation (992px and up) */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Nav Links */}
              <div className="flex space-x-1">
                {NAV_LINKS.map(({ name, href }) => (
                  <Link
                    key={name}
                    href={href}
                    className="text-white hover:bg-purple-900/50 hover:text-green-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center"
                  >
                    <span className="relative group">
                      {name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative mx-4 w-64">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-full border-2 border-purple-700 bg-black text-white px-5 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent pl-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-2.5 h-5 w-5 text-purple-400" />
              </div>

              {/* Cart with Dropdown */}
              <div className="relative group">
                <Link href="/main/cart" className="relative">
                  🛒 Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </Link>
              </div>

              {/* Auth Buttons */}
              {!isLoggedIn ? (
                <div className="flex space-x-3">
                  <button
                    onClick={toggleLogin}
                    className="text-green-300 hover:text-white font-semibold px-4 py-2 rounded-lg text-sm border border-green-400 hover:bg-green-400/20 transition-all duration-300 hover:scale-105"
                  >
                    Login
                  </button>
                  <button
                    onClick={toggleLogin}
                    className="bg-gradient-to-r from-purple-600 to-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/30"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="relative group">
                  <button
                    type="button"
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="h-9 w-9 rounded-full bg-gradient-to-r from-purple-600 to-green-500 flex items-center justify-center text-white font-bold">
                      {username.charAt(0).toUpperCase()}
                    </div>
                    <svg
                      className="w-4 h-4 text-green-300 group-hover:text-purple-300 transition"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* User Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50 border border-purple-900 overflow-hidden">
                    <div className="px-4 py-3 border-b border-purple-900">
                      <p className="text-sm text-white">Signed in as</p>
                      <p className="text-sm font-medium text-green-300 truncate">
                        {username}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-3 text-sm text-white hover:bg-purple-900/50 transition flex items-center"
                    >
                      {/* Replace with your User Icon */}
                      <svg
                        className="mr-2 h-4 w-4 text-green-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="7" r="4" />
                        <path d="M5.5 21h13a2 2 0 002-2v-2a5 5 0 00-10 0v2a2 2 0 002 2z" />
                      </svg>
                      Profile
                    </Link>
                    <button
                      onClick={toggleLogin}
                      className="w-full text-left px-4 py-3 text-sm text-white hover:bg-purple-900/50 transition flex items-center"
                    >
                      {/* Replace with your Logout Icon */}
                      <svg
                        className="mr-2 h-4 w-4 text-green-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2"
              >
                <ShoppingCart className="h-6 w-6 text-green-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-purple-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md hover:bg-purple-900/30 transition"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-green-300" />
                ) : (
                  <Menu className="h-6 w-6 text-green-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black px-4 pt-2 pb-6 space-y-2 shadow-lg border-t border-purple-900">
            {/* Search Bar */}
            <div className="relative mb-3">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-full border-2 border-purple-700 bg-black text-white px-5 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-2.5 h-5 w-5 text-purple-400" />
            </div>

            {/* Nav Links */}
            {NAV_LINKS.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-purple-900/50 hover:text-green-300 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {name}
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="pt-2 space-y-3">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={toggleLogin}
                    className="block w-full text-center text-green-300 hover:text-white font-semibold px-4 py-3 rounded-lg text-base border border-green-400 hover:bg-green-400/20 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={toggleLogin}
                    className="block w-full text-center bg-gradient-to-r from-purple-600 to-green-600 text-white px-4 py-3 rounded-lg text-base font-semibold hover:from-purple-700 hover:to-green-700 transition shadow-lg hover:shadow-purple-500/30"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <div className="px-4 py-3 flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-green-500 flex items-center justify-center text-white font-bold">
                      {username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm text-white">Signed in as</p>
                      <p className="text-sm font-medium text-green-300">
                        {username}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-3 rounded-lg text-base font-semibold text-white hover:bg-purple-900/50 transition flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="mr-3 h-5 w-5 text-green-300" />
                    Profile
                  </Link>
                  <button
                    onClick={toggleLogin}
                    className="w-full text-left px-4 py-3 rounded-lg text-base font-semibold text-white hover:bg-purple-900/50 transition flex items-center"
                  >
                    <LogOut className="mr-3 h-5 w-5 text-green-300" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Mobile Cart Drawer */}
        {isCartOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsCartOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-black shadow-xl border-l border-purple-900 overflow-y-auto">
              <div className="p-4 flex justify-between items-center border-b border-purple-900">
                <h3 className="text-lg font-semibold text-white">Your Cart</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-purple-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              {cartItems.length > 0 ? (
                <>
                  <div className="divide-y divide-purple-900/50">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 flex items-center">
                        <img
                          src={`/products/${item.id}.jpg`}
                          alt={item.name}
                          className="h-16 w-16 rounded object-cover mr-4"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">
                            {item.name}
                          </h4>
                          <p className="text-sm text-green-300">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center mt-2 space-x-3">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="text-purple-400 hover:text-white"
                            >
                              -
                            </button>
                            <span className="text-white">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="text-purple-400 hover:text-white"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300 ml-auto"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-purple-900 sticky bottom-0 bg-black">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white">Subtotal:</span>
                      <span className="text-green-300 font-bold">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <Link
                      href="/checkout"
                      className="block w-full text-center bg-gradient-to-r from-purple-600 to-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-green-700 transition"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Checkout
                    </Link>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <ShoppingCart className="mx-auto h-12 w-12 text-gray-600" />
                  <p className="mt-4 text-gray-400">Your cart is empty</p>
                  <Link
                    href="/shop"
                    className="inline-block mt-4 text-purple-400 hover:text-purple-300 text-sm"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
