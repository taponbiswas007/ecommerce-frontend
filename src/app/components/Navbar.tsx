"use client";

import React, { useEffect, useState } from "react";

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

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("John Doe");
  const [cartCount, setCartCount] = useState(3);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  // Auto-rotate offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % OFFERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Google Translate Widget loader
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (document.getElementById("google-translate-script")) return;
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: (window as any).google.translate.TranslateElement
              .InlineLayout.HORIZONTAL,
            autoDisplay: false,
            includedLanguages: "en,es,fr,de,it,pt,ja,ar,hi,bn", // Add more languages as needed
          },
          "google_translate_element"
        );
      };
    };
    addGoogleTranslateScript();
  }, []);

  return (
    <>
      {/* Top Offer Bar with Language Switcher */}
      <div className="bg-gradient-to-r from-purple-900 via-green-600 to-purple-900 text-white text-sm font-medium relative overflow-hidden">
        {/* Animated Offer Text */}
        <div className="py-2 text-center">
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

        {/* Language Switcher - Top Right */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-green-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <div
              id="google_translate_element"
              className="text-xs bg-black/20 rounded px-1 py-0.5 border border-purple-400"
            ></div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-black shadow-lg sticky top-0 z-50 border-b border-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Left side: Logo & NavLinks */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <a href="/" className="flex items-center space-x-3">
                <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-green-300 to-purple-400 bg-clip-text text-transparent">
                  Sobkichu360
                </span>
              </a>

              {/* Desktop nav links */}
              <div className="hidden md:flex space-x-1">
                {NAV_LINKS.map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    className="text-white hover:bg-purple-900/50 hover:text-green-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center"
                  >
                    <span className="relative group">
                      {name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Center: Search Bar */}
            <div className="flex-1 mx-6 max-w-xl hidden md:block">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-full border-2 border-purple-700 bg-black text-white px-5 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent pl-12"
                  aria-label="Search products"
                />
                <svg
                  className="absolute left-4 top-2.5 h-5 w-5 text-purple-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Right side: Cart, Auth */}
            <div className="flex items-center space-x-5">
              {/* Cart Icon */}
              <a
                href="/cart"
                className="relative p-2 hover:bg-purple-900/30 rounded-full transition group"
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-green-300 group-hover:text-purple-300 transition"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M16 16a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-purple-600 rounded-full transform group-hover:bg-green-500 transition">
                      {cartCount}
                    </span>
                  )}
                </div>
              </a>

              {/* Auth Buttons */}
              {!isLoggedIn ? (
                <div className="flex space-x-3">
                  <a
                    href="/login"
                    className="hidden md:block text-green-300 hover:text-white font-semibold px-4 py-2 rounded-lg text-sm border border-green-400 hover:bg-green-400/20 transition-all duration-300 hover:scale-105"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="hidden md:block bg-gradient-to-r from-purple-600 to-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/30"
                  >
                    Sign Up
                  </a>
                </div>
              ) : (
                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none group">
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
                      ></path>
                    </svg>
                  </button>

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50 border border-purple-900 overflow-hidden">
                    <div className="px-4 py-3 border-b border-purple-900">
                      <p className="text-sm text-white">Signed in as</p>
                      <p className="text-sm font-medium text-green-300 truncate">
                        {username}
                      </p>
                    </div>
                    <a
                      href="/profile"
                      className="block px-4 py-3 text-sm text-white hover:bg-purple-900/50 transition flex items-center"
                    >
                      <svg
                        className="mr-2 h-4 w-4 text-green-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                      Profile
                    </a>
                    <a
                      href="/logout"
                      className="block px-4 py-3 text-sm text-white hover:bg-purple-900/50 transition flex items-center"
                    >
                      <svg
                        className="mr-2 h-4 w-4 text-green-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                      Logout
                    </a>
                  </div>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-purple-900/30 transition"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-green-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-green-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black px-4 pt-2 pb-6 space-y-2 shadow-lg border-t border-purple-900">
            {/* Search Bar for Mobile */}
            <div className="relative mb-3">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-full border-2 border-purple-700 bg-black text-white px-5 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent pl-12"
                aria-label="Search products"
              />
              <svg
                className="absolute left-4 top-2.5 h-5 w-5 text-purple-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {NAV_LINKS.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-purple-900/50 hover:text-green-300 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {name}
              </a>
            ))}

            {!isLoggedIn ? (
              <div className="pt-2 space-y-3">
                <a
                  href="/login"
                  className="block w-full text-center text-green-300 hover:text-white font-semibold px-4 py-3 rounded-lg text-base border border-green-400 hover:bg-green-400/20 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="block w-full text-center bg-gradient-to-r from-purple-600 to-green-600 text-white px-4 py-3 rounded-lg text-base font-semibold hover:from-purple-700 hover:to-green-700 transition shadow-lg hover:shadow-purple-500/30"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </a>
              </div>
            ) : (
              <div className="pt-2 space-y-3">
                <a
                  href="/profile"
                  className="block px-4 py-3 rounded-lg text-base font-semibold text-white hover:bg-purple-900/50 transition flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg
                    className="mr-3 h-5 w-5 text-green-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  Profile
                </a>
                <a
                  href="/logout"
                  className="block px-4 py-3 rounded-lg text-base font-semibold text-white hover:bg-purple-900/50 transition flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg
                    className="mr-3 h-5 w-5 text-green-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  Logout
                </a>
              </div>
            )}

            {/* Language Switcher for Mobile */}
            <div className="pt-3 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <div
                id="google_translate_element_mobile"
                className="text-sm bg-black/20 rounded px-2 py-1 border border-purple-400"
              ></div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
