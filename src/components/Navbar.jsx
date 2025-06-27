import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/removebg.png';
import { useSearch } from '../context/SearchContext';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } = useSearch();
  const navigate = useNavigate();

  const fragranceDropdownItems = [
    { name: "Men's Collection", href: '/fragrance/men' },
    { name: "Women's Collection", href: '/fragrance/women' },
    { name: 'Sugar Muse Collection', href: '/fragrance/sugar-muse' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/shop');
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Navigate to shop page when user starts typing
    if (value.trim() && window.location.pathname !== '/shop') {
      navigate('/shop');
    }
  };

  return (
    <div className="w-full bg-white">
      {/* Announcement Bar */}
      <div className="w-full bg-pink-100 py-2 text-center whitespace-nowrap">
        <Link to="/shop" className="text-black hover:text-gray-800">
          Viral Smells Like A Warm Hug™ Solid Perfume →
        </Link>
      </div>

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Search Icon and Input */}
            <div className="flex-shrink-0 flex items-center justify-start relative">
              <button 
                className="text-gray-600 hover:text-pink-500 transition-colors duration-200"
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (!isSearchOpen && window.location.pathname !== '/shop') {
                    navigate('/shop');
                  }
                }}
              >
                {isSearchOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <MagnifyingGlassIcon className="h-6 w-6" />
                )}
              </button>
              {isSearchOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg z-50 p-4">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search fragrances..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        autoFocus
                      />
                      <MagnifyingGlassIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link to="/" className="flex items-center">
                <img 
                  src={logo} 
                  alt="Blur Logo" 
                  className="h-24 w-auto object-contain"
                />
              </Link>
            </div>

            {/* User and Cart */}
            <div className="flex-shrink-0 flex items-center justify-end space-x-4">
              <Link to="/account" className="text-gray-600 hover:text-pink-500 transition-colors duration-200">
                <UserIcon className="h-6 w-6" />
              </Link>
              <Link to="/cart" className="text-gray-600 hover:text-pink-500 transition-colors duration-200 relative">
                <ShoppingBagIcon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  8
                </span>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex justify-center space-x-8 py-4">
            <div className="flex items-center space-x-8">
              {/* Regular Home Link */}
              <Link to="/" className="text-black hover:text-pink-500 px-3 py-2 text-sm font-medium">
                Home
              </Link>

              {/* Shop Fragrance with Dropdown */}
              <div className="relative group">
                <Link
                  to="/shop-fragrance"
                  className="text-black hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors duration-200 group-hover:text-pink-500"
                  onMouseEnter={() => setOpenDropdown('shop-fragrance')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  Shop Fragrance
                  <span className="ml-1 inline-block transform group-hover:rotate-180 transition-transform duration-200">▼</span>
                </Link>
                
                {/* Shop Fragrance Dropdown Menu */}
                {openDropdown === 'shop-fragrance' && (
                  <div 
                    className="absolute left-0 mt-2 w-72 bg-white border border-pink-100 rounded-lg shadow-lg z-50 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out"
                    onMouseEnter={() => setOpenDropdown('shop-fragrance')}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="py-2">
                      {fragranceDropdownItems.map((item, index) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`block px-6 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150
                            ${index !== 0 ? 'border-t border-pink-50' : ''}`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="flex-grow">{item.name}</span>
                            <span className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-4 h-4 bg-white border-t border-l border-pink-100 transform rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Navigation Links */}
              <Link to="/bestsellers" className="text-black hover:text-pink-500 px-3 py-2 text-sm font-medium">
                Bestsellers
              </Link>
              <Link to="/gifting" className="text-black hover:text-pink-500 px-3 py-2 text-sm font-medium">
                Gift Sets
              </Link>
              <Link to="/creator-zone" className="text-black hover:text-pink-500 px-3 py-2 text-sm font-medium">
                Creator Zone
              </Link>
              <Link to="/about" className="text-black hover:text-pink-500 px-3 py-2 text-sm font-medium">
                About
              </Link>
              <Link to="/contact" className="text-black hover:text-pink-500 px-3 py-2 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar; 
