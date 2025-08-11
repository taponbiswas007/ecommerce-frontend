import HeroSlider from "./components/HeroSlider";
import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSlider />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the Ecommerce App
        </h1>
        <p className="text-gray-700">
          This is a simple ecommerce application built with Next.js and Laravel.
        </p>
      </div>
    </div>
  );
}
