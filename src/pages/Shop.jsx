import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fragranceCollections } from '../data/fragrances';
import { useSearch } from '../context/SearchContext';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [loadingStates, setLoadingStates] = useState({});
  const { searchQuery } = useSearch();
  const { addToCart } = useCart();

  // Update category when URL parameter changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && ['mens', 'womens', 'sugar'].includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams]);

  // Get products based on category and search query
  const getProducts = () => {
    let products = [];
    if (selectedCategory === 'all') {
      products = [
        ...fragranceCollections.mens,
        ...fragranceCollections.womens,
        ...fragranceCollections.sugar
      ];
    } else {
      products = fragranceCollections[selectedCategory] || [];
    }

    // If there's a search query, filter the products
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      return products.filter(product => {
        // Search through various product fields
        const searchFields = [
          product.name,
          product.description,
          product.fullDescription,
          product.family,
          ...(product.vibe || []),
          ...(product.notes?.top || []),
          ...(product.notes?.heart || []),
          ...(product.notes?.base || [])
        ];
        
        return searchFields.some(field => 
          field && field.toLowerCase().includes(query)
        );
      });
    }

    return products;
  };

  const products = getProducts().sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const categories = [
    { id: 'all', name: 'All Collections' },
    { id: 'mens', name: "Men's Collection" },
    { id: 'womens', name: "Women's Collection" },
    { id: 'sugar', name: 'Sugar Collection' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' }
  ];

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    // Set loading state for this specific product
    setLoadingStates(prev => ({ ...prev, [product.id]: true }));

    try {
      // Add to cart
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: typeof product.image === 'string' ? product.image : product.image.src || product.image,
        quantity: 1,
        description: product.description
      });

      // Reset loading state after a short delay for better UX
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [product.id]: false }));
      }, 300);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setLoadingStates(prev => ({ ...prev, [product.id]: false }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          {categories.find(cat => cat.id === selectedCategory)?.name || 'All Collections'}
        </h1>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border-gray-300 py-2 px-4 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border-gray-300 py-2 px-4 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Results Count when searching */}
      {searchQuery.trim() && (
        <div className="mb-6">
          <p className="text-gray-600">
            Found {products.length} {products.length === 1 ? 'result' : 'results'} for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Product List with Horizontal Scroll */}
      <div className="relative">
        <div className="overflow-x-auto hide-scrollbar">
          <div className="inline-flex space-x-8 pb-4">
            {products.map((product) => (
              <div key={product.id} className="w-[300px] flex-shrink-0">
                <div className="group">
                  <Link
                    to={`/product/${product.id}`}
                    className="block"
                  >
                    <div className="relative">
                      <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-pink-500 transition-colors duration-200">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">{product.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {product.vibe && product.vibe.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-2">
                          <span className="text-lg font-medium text-gray-900">£{product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={loadingStates[product.id]}
                    className={`mt-4 w-full py-2 px-4 text-sm font-medium rounded transition-all duration-200 ${
                      loadingStates[product.id]
                        ? 'bg-pink-500 text-white cursor-not-allowed opacity-75'
                        : 'bg-black text-white hover:bg-pink-500'
                    }`}
                  >
                    {loadingStates[product.id] ? 'ADDING...' : 'ADD TO CART'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchQuery.trim() 
              ? `No products match your search "${searchQuery}". Try different keywords or clear your search.`
              : 'Try changing your filters or check back later for new products.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Shop; 