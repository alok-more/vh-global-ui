import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useMainCategories,
  useSubCategoriesByMainCategory,
  useProductsBySubCategory,
} from "../hooks/useProducts";

interface ProductMegaMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ProductMegaMenu: React.FC<ProductMegaMenuProps> = ({
  isVisible,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [hoveredMainCategory, setHoveredMainCategory] = useState<string | null>(
    null
  );
  const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(
    null
  );

  const { data: mainCategoriesData } = useMainCategories();
  const { data: subCategoriesData } = useSubCategoriesByMainCategory(
    hoveredMainCategory || "",
    { pageSize: 20 }
  );
  const { data: productsData } = useProductsBySubCategory(
    hoveredSubCategory || "",
    { pageSize: 10 }
  );

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Invisible bridge to prevent hover gaps */}
          <div
            className="w-full h-2 bg-transparent !z-50 relative"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 z-40 rounded-b-[40px]"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="flex min-h-[420px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                {/* Main Categories - Left Side */}
                <div className="w-1/4 border-r border-gray-100 py-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4">
                    Plant Categories
                  </h3>
                  <div className="space-y-1">
                    {mainCategoriesData?.data?.map((category, index) => (
                      <motion.div
                        key={category.productMainCategoryId}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className={`px-4 py-3 cursor-pointer transition-colors flex items-center justify-between group ${
                          hoveredMainCategory === category.productMainCategoryId
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onMouseEnter={() => {
                          setHoveredMainCategory(
                            category.productMainCategoryId
                          );
                          setHoveredSubCategory(null);
                        }}
                      >
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            {category.shortDescription}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Sub Categories - Middle */}
                {hoveredMainCategory && (
                  <motion.div
                    className="w-1/3 border-r border-gray-100 py-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4">
                      Plant Types
                    </h3>
                    <div className="space-y-1">
                      {subCategoriesData?.data?.content?.map((subCategory) => (
                        <div
                          key={subCategory.productSubCategoryId}
                          className={`px-4 py-3 cursor-pointer transition-colors flex items-center justify-between group ${
                            hoveredSubCategory ===
                            subCategory.productSubCategoryId
                              ? "bg-emerald-50 text-emerald-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onMouseEnter={() =>
                            setHoveredSubCategory(
                              subCategory.productSubCategoryId
                            )
                          }
                        >
                          <div>
                            <Link
                              to={`/products?subCategory=${subCategory.productSubCategoryId}`}
                              className="font-medium block"
                              onClick={onClose}
                            >
                              {subCategory.name}
                            </Link>
                            <div className="text-sm text-gray-500 mt-1">
                              {subCategory.shortDescription}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Products - Right Side */}
                {hoveredSubCategory && (
                  <motion.div
                    className="flex-1 py-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4">
                      Featured Products
                    </h3>
                    <div className="grid grid-cols-2 gap-4 px-4">
                      {productsData?.data?.content
                        ?.slice(0, 6)
                        .map((product, index) => (
                          <motion.div
                            key={product.productId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <Link
                              to={`/product/${product.productId}`}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                              onClick={onClose}
                            >
                              <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                {product.primaryImageUrl ? (
                                  <img
                                    src={product.primaryImageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                                    <span className="text-emerald-600 text-xs font-medium">
                                      {product.name.charAt(0)}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                                  {product.name}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                  {product.shortDescription}
                                </div>
                                <div className="text-sm font-semibold text-emerald-600 mt-1">
                                  ${product.price.toFixed(2)}
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                    </div>

                    {hoveredSubCategory && (
                      <div className="px-4 mt-4">
                        <Link
                          to={`/products?subCategory=${hoveredSubCategory}`}
                          className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                          onClick={onClose}
                        >
                          View all products
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Default View - No Category Selected */}
                {!hoveredMainCategory && (
                  <div className="flex-1 py-6 px-4 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-emerald-600 text-2xl">🌱</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Explore Our Plants
                      </h3>
                      <p className="text-sm">
                        Hover over a category to see available plant types and
                        products
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductMegaMenu;
