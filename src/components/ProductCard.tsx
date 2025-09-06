import React from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { ProductResponse } from "../types/api";
import { productApi } from "../services/api";

interface ProductCardProps {
  product: ProductResponse;
  viewMode?: "grid" | "list";
  onViewDetails?: (product: ProductResponse) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = "grid",
  onViewDetails,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const fixImageUrl = (url: string): string => {
    if (!url) return "";

    // Fix incorrect URLs from backend that have double path
    // Convert: http://localhost:8080/images/uploads/images/filename.png
    // To: http://localhost:8080/images/filename.webp
    if (url.includes("/images/uploads/images/")) {
      const filename = url.split("/").pop()?.replace(".png", ".webp") || "";
      return `http://localhost:8080/images/${filename}`;
    }

    return url;
  };

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) {
      // If primaryImageUrl is null, try to use the first additional image
      if (
        product.additionalImageUrls &&
        product.additionalImageUrls.length > 0
      ) {
        const additionalImageUrl = fixImageUrl(product.additionalImageUrls[0]);
        console.log(
          "Using additional image URL as fallback:",
          additionalImageUrl
        );
        return additionalImageUrl;
      }
      console.warn(
        "Image URL is null or undefined and no additional images available"
      );
      return "/images/nursary-product.png"; // fallback image
    }

    // If it's already a complete URL (from backend), use it directly
    if (imageUrl.startsWith("http")) {
      return fixImageUrl(imageUrl);
    }

    // Fallback: construct URL if we only have filename
    const image = productApi.getImage(imageUrl);
    console.log("Image URL:", image);

    return image;
  };

  return (
    <div
      className={`bg-white overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          viewMode === "list" ? "w-48 flex-shrink-0" : ""
        }`}
      >
        <img
          src={getImageUrl(product.primaryImageUrl)}
          alt={product.name}
          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
            viewMode === "list" ? "w-full h-full" : "w-full h-full"
          }`}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onViewDetails?.(product)}
            className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg text-gray-900/80 group-hover:text-emerald-700 transition-colors">
              {product.name}
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
              {product.productSubCategory.name}
            </span>
          </div>

          {product.shortDescription && (
            <p className="text-gray-500 mb-4 text-sm leading-relaxed">
              {product.shortDescription}
            </p>
          )}

          <div className="text-xs text-gray-500 mb-4">
            Min. Quantity: {product.minimumQuantity}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-emerald-600 font-bold text-xl">
            {formatPrice(product.price)}
          </span>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 group">
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
