import React, { useState, useEffect } from "react";
import { X, Package, Tag } from "lucide-react";
import { ProductResponse } from "../types/api";
import { productApi } from "../services/api";

interface ProductModalProps {
  product: ProductResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !product) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [mainImage, setMainImage] = useState<string>("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const fixImageUrl = (url: string): string => {
    if (!url) return "";
    if (url.includes("/images/uploads/images/")) {
      const filename = url.split("/").pop()?.replace(".png", ".webp") || "";
      return `${process.env.BACKEND_URL}/images/${filename}`;
    }
    return url;
  };

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "/images/nursary-product.png";
    if (imageUrl.startsWith("http")) {
      return fixImageUrl(imageUrl);
    }
    return productApi.getImage(imageUrl);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (product) {
      const primary = getImageUrl(product.primaryImageUrl);
      const additional = (product.additionalImageUrls || []).map(getImageUrl);

      setMainImage(primary);
      setThumbnails(additional);
    }
  }, [product]);

  const handleThumbnailClick = (clickedImage: string) => {
    if (clickedImage === mainImage) return;

  // Swap logic
    setThumbnails((prev) => {
      const updated = prev.filter((img) => img !== clickedImage);
      return [mainImage, ...updated]; // push old main into thumbs
    });

    setMainImage(clickedImage);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              <div className="mb-4">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {thumbnails.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {thumbnails.map((thumb, index) => (
                    <img
                      key={index}
                      src={thumb}
                      alt={`${product.name} ${index + 1}`}
                      className={`w-full h-20 object-cover rounded-lg cursor-pointer transition-opacity ${
                        mainImage === thumb
                          ? "ring-2 ring-emerald-500"
                          : "hover:opacity-80"
                      }`}
                      onClick={() => handleThumbnailClick(thumb)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-gray-500">
                    {product.productSubCategory.productMainCategory.name} →{" "}
                    {product.productSubCategory.name}
                  </span>
                </div>

                <div className="text-3xl font-bold text-emerald-600 mb-4">
                  {formatPrice(product.price)}
                </div>

                <div className="flex items-center space-x-2 mb-6">
                  <Package className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    Minimum quantity: {product.minimumQuantity}
                  </span>
                </div>
              </div>

              {product.shortDescription && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>
              )}

              {product.longDescription && (
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Detailed Information
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
