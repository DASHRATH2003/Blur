import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-pink-50">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Luxury Beyond Imagination
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            A New Era in Beauty, Lifestyle & Fragrances
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Our Story */}
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded in 2025, QuQu London is a UK-based luxury beauty brand redefining elegance with purpose and innovation. 
              Rooted in the vibrant heart of London, we exist to go beyond the ordinary—crafting beauty experiences that awaken 
              the senses and speak to individuality.
            </p>

            {/* Signature Line */}
            <div className="my-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Signature Line</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our signature line of solid perfumes blends timeless sophistication with modern simplicity, offering a refined 
                alternative to traditional fragrance. Portable, powerful, and deeply personal, each scent is designed to 
                accompany you effortlessly through life's moments.
              </p>
            </div>

            {/* Beyond Perfume */}
            <div className="my-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Beyond Perfume</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                But we're more than perfume. QuQu London is a growing universe of curated beauty products—each one thoughtfully 
                formulated and exquisitely designed to elevate your everyday rituals into experiences of pure luxury.
              </p>
            </div>

            {/* Our Philosophy */}
            <div className="my-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Philosophy</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At QuQu London, we believe beauty should feel intimate, enduring, and extraordinary. Join us on our journey 
                as we continue to craft products that embody modern elegance, conscious luxury, and a bold new vision of 
                self-expression.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 