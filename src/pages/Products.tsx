import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, Search } from 'lucide-react';
import { useMainCategories, useSubCategories, useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { ProductResponse } from '../types/api';

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 30;

  // API Queries
  const { data: mainCategoriesData, isLoading: mainCategoriesLoading, error: mainCategoriesError } = useMainCategories();
  const { data: subCategoriesData } = useSubCategories({
    page: 0,
    pageSize: 100,
    hydrateMainCategory: true
  });
  const { data: productsData, isLoading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts({
    page: currentPage,
    pageSize,
    sortBy: 'name',
    sortDi: 'asc'
  });
  console.log(mainCategoriesData)
  console.log(subCategoriesData)
  console.log(productsData)

  // Filter products based on selected categories and search
  const filteredProducts = useMemo(() => {
    if (!productsData?.data?.content) return [];
    
    let filtered = productsData.data.content;

    // Filter by main category
    if (selectedMainCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.productSubCategory.productMainCategory.productMainCategoryId === selectedMainCategory
      );
    }

    // Filter by sub category
    if (selectedSubCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.productSubCategory.productSubCategoryId === selectedSubCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [productsData, selectedMainCategory, selectedSubCategory, searchTerm]);

  // Get filtered sub categories based on selected main category
  const filteredSubCategories = useMemo(() => {
    if (!subCategoriesData?.data?.content) return [];
    
    if (selectedMainCategory === 'all') {
      return subCategoriesData.data.content;
    }
    
    return subCategoriesData.data.content.filter(subCat =>
      subCat.productMainCategory.productMainCategoryId === selectedMainCategory
    );
  }, [subCategoriesData, selectedMainCategory]);

  const handleMainCategoryChange = (categoryId: string) => {
    setSelectedMainCategory(categoryId);
    setSelectedSubCategory('all');
    setCurrentPage(0);
  };

  const handleSubCategoryChange = (subCategoryId: string) => {
    setSelectedSubCategory(subCategoryId);
    setCurrentPage(0);
  };

  if (mainCategoriesLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (mainCategoriesError || productsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage 
          message="Failed to load products. Please check if the API server is running."
          onRetry={refetchProducts}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600">
            Professional aquascaping solutions for every need
          </p>
          
          {/* Search Bar */}
          <div className="mt-6 relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Categories</h3>
              </div>
              
              {/* Main Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Main Categories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleMainCategoryChange('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedMainCategory === 'all'
                        ? 'bg-emerald-100 text-emerald-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All Categories
                  </button>
                  {mainCategoriesData?.data?.map(category => (
                    <button
                      key={category.productMainCategoryId}
                      onClick={() => handleMainCategoryChange(category.productMainCategoryId)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedMainCategory === category.productMainCategoryId
                          ? 'bg-emerald-100 text-emerald-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub Categories */}
              {filteredSubCategories.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Sub Categories</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSubCategoryChange('all')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedSubCategory === 'all'
                          ? 'bg-cyan-100 text-cyan-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All Sub Categories
                    </button>
                    {filteredSubCategories.map(subCategory => (
                      <button
                        key={subCategory.productSubCategoryId}
                        onClick={() => handleSubCategoryChange(subCategory.productSubCategoryId)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedSubCategory === subCategory.productSubCategoryId
                            ? 'bg-cyan-100 text-cyan-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {subCategory.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex justify-between items-center">
              <span className="text-gray-600">
                Showing {filteredProducts.length} products
              </span>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Package className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.productId}
                    product={product}
                    viewMode={viewMode}
                    onViewDetails={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Products;