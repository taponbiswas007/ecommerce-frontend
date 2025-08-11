"use client";

import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Smart Home Essentials",
      subtitle: "Upgrade Your Living Space",
      description: "Get 30% off on all smart home devices this week only!",
      image: "/images/smart-home-banner.jpg",
      buttonText: "Shop Now",
      buttonLink: "/shop/smart-home",
      bgClass: "bg-gradient-to-r from-purple-900/80 to-green-600/80",
    },
    {
      id: 2,
      title: "Latest Gadgets 2023",
      subtitle: "Cutting-Edge Technology",
      description: "New arrivals with exclusive launch discounts",
      image: "/images/gadgets-banner.jpg",
      buttonText: "Explore New Tech",
      buttonLink: "/shop/new-arrivals",
      bgClass: "bg-gradient-to-r from-green-600/80 to-purple-900/80",
    },
    {
      id: 3,
      title: "Home Entertainment",
      subtitle: "Cinematic Experience",
      description: "4K TVs, Sound Systems & Projectors starting at $299",
      image: "/images/tv-banner.jpg",
      buttonText: "View Deals",
      buttonLink: "/shop/entertainment",
      bgClass:
        "bg-gradient-to-r from-purple-900/80 via-black/80 to-green-600/80",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto play slider
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000); // Resume auto-play after pause
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <section className="relative h-[80vh] max-h-[800px] w-full overflow-hidden">
      {/* Slider */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 flex items-center transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div
                className={`absolute inset-0 ${slide.bgClass} opacity-90`}
              ></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 lg:px-8">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight">
                  {slide.title}
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-green-300">
                  {slide.subtitle}
                </h2>
                <p className="text-lg md:text-xl mb-8">{slide.description}</p>
                <a
                  href={slide.buttonLink}
                  className="inline-block bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <FiChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-green-400 w-6"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Overlay Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
};

export default HeroSlider;
