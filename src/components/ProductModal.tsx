import React from "react";
import { X, ShoppingCart, Package, Tag } from "lucide-react";
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

<<<<<<< Updated upstream
=======
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [mainImage, setMainImage] = useState<string>("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const getCurrencyFromTimeZone = () => {
    const timeZone =
      Intl.DateTimeFormat().resolvedOptions().timeZone;

    // console.log("🚀 ~ timeZone:", timeZone);

    if (timeZone.startsWith("Asia/Kolkata") || timeZone.startsWith("Asia/Calcutta"))
      return { locale: "en-IN", currency: "INR" };

    if (timeZone.startsWith("America"))
      return { locale: "en-US", currency: "USD" };

    if (timeZone.startsWith("Europe"))
      return { locale: "de-DE", currency: "EUR" };

    return { locale: "en-US", currency: "USD" };
  };

>>>>>>> Stashed changes
  const formatPrice = (price: number) => {
    const { locale, currency } = getCurrencyFromTimeZone();

    // console.log("🚀 ~ locale:", locale);
    // console.log("🚀 ~ currency:", currency);

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
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
        product?.additionalImageUrls &&
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
    return productApi.getImage(imageUrl);
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
                  src={getImageUrl(product.primaryImageUrl)}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* {product.additionalImageUrls &&
                product.additionalImageUrls.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.additionalImageUrls.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={getImageUrl(imageUrl)}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </div>
                )} */}
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

              {/* Actions */}
              <div className="space-y-4">
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <button className="border border-gray-300 hover:border-emerald-600 text-gray-700 hover:text-emerald-600 py-3 rounded-xl font-medium transition-colors">
                    Add to Wishlist
                  </button>
                  <button className="border border-gray-300 hover:border-emerald-600 text-gray-700 hover:text-emerald-600 py-3 rounded-xl font-medium transition-colors">
                    Compare
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
