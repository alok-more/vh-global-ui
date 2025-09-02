import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import { useMainCategories } from '../hooks/useProducts';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: mainCategoriesData } = useMainCategories();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      {/* Top Bar */}
      {/* <div className="bg-emerald-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex space-x-6">
            <span>Professional Aquascaping Solutions</span>
            <span>|</span>
            <span>Free Shipping over €50</span>
          </div>
          <div className="flex space-x-4">
            <span>DE</span>
            <span>EN</span>
            <span>FR</span>
          </div>
        </div>
      </div> */}

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-emerald-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">VH</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-emerald-800">VH Global Trader</h1>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Aquascaping Excellence</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-emerald-700 font-medium transition-colors">
              Products
            </Link>
            <div className="relative group">
              <span className="text-gray-700 hover:text-emerald-700 font-medium cursor-pointer transition-colors">
                Categories
              </span>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {mainCategoriesData?.data?.slice(0, 6).map(category => (
                    <Link
                      key={category.productMainCategoryId}
                      to={`/products?category=${category.productMainCategoryId}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/company" className="text-gray-700 hover:text-emerald-700 font-medium transition-colors">
              Company
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-emerald-700 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-600 hover:text-emerald-700 cursor-pointer transition-colors" />
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-emerald-700 cursor-pointer transition-colors" />
              <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-emerald-700 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <span className="text-gray-700 font-medium">Categories</span>
              <div className="ml-4 space-y-2">
                {mainCategoriesData?.data?.slice(0, 4).map(category => (
                  <Link
                    key={category.productMainCategoryId}
                    to={`/products?category=${category.productMainCategoryId}`}
                    className="block text-sm text-gray-600 hover:text-emerald-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <Link 
                to="/company" 
                className="text-gray-700 hover:text-emerald-700 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Company
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-emerald-700 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;