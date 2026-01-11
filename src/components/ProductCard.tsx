<<<<<<< Updated upstream
import React from "react";
import { ShoppingCart, Eye } from "lucide-react";
=======
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Eye, X } from "lucide-react";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    subject: `Inquiry about ${product.name}`,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

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

<<<<<<< Updated upstream
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
=======

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl?.startsWith("http")) {
      return imageUrl;
    }
    return imageUrl
      ? productApi.getImage(imageUrl)
      : "https://images.pexels.com/photos/1078736/pexels-photo-1078736.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop";
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({
        type: "error",
        message: "⚠️ Please enter a valid email address",
      });
      setIsLoading(false);
      return;
    }
    // console.log("🚀 ~ handleContactSubmit ~ formData:", formData);
    if (formData.message.length > 1000) {
      setStatus({
        type: "error",
        message: "⚠️ Message cannot exceed 1000 characters",
      });
      setIsLoading(false);
      return;
    }

    const appsScriptUrl = import.meta.env.VITE_APP_SCRIPT_EXCEL_URL || "";

    try {
      await fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        mode: "no-cors",
      });

      setStatus({
        type: "success",
        message: "✅ Your message has been sent successfully!",
      });
      setFormData({
        name: "",
        email: "",
        contact: "",
        subject: `Inquiry about ${product.name}`,
        message: "",
      });

      // auto-hide after 5s
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      setStatus({
        type: "error",
        message: "❌ There was an error sending your message",
      });
    } finally {
      setIsLoading(false);
>>>>>>> Stashed changes
    }

    // Fallback: construct URL if we only have filename
    const image = productApi.getImage(imageUrl);
    console.log("Image URL:", image);

    return image;
  };

  const [mainImage, setMainImage] = useState<string>(
    getImageUrl(product.primaryImageUrl)
  );
  const [thumbnails, setThumbnails] = useState<string[]>(
    (product.additionalImageUrls || []).map(getImageUrl)
  );

  const handleThumbnailClick = (clickedImage: string) => {
    if (clickedImage === mainImage) return;

    setThumbnails((prev) => {
      const updated = prev.filter((img) => img !== clickedImage);
      return [mainImage, ...updated];
    });

    setMainImage(clickedImage);
  };

  return (
    <div
      className={`bg-white overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      <div
<<<<<<< Updated upstream
        className={`relative overflow-hidden ${
          viewMode === "list" ? "w-48 flex-shrink-0" : ""
=======
        className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group ${
          viewMode === "list" ? "flex" : ""
>>>>>>> Stashed changes
        }`}
      >
        <img
          src={getImageUrl(product.primaryImageUrl)}
          alt={product.name}
          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
            viewMode === "list" ? "w-full h-full" : "w-full h-full"
          }`}
<<<<<<< Updated upstream
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
=======
        >
          <div className="w-full h-56 flex items-center justify-center bg-gray-50 overflow-hidden">
            <img
              src={getImageUrl(product.primaryImageUrl)}
              alt={product.name}
              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover transition-colors duration-300"></div>
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
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
=======
      {/* Contact Form Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Inquire About {product.name}
            </h2>

            {/* ✅ Status Banner */}
            {status && (
              <div
                className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                  status.type === "success"
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleContactChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleContactChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
                >
                  <span>{isLoading ? "Sending..." : "Send Inquiry"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {isDetailsModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsDetailsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {product.name}
            </h2>
            <div className="space-y-6">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-65 object-cover rounded-lg"
              />
              {thumbnails.length > 0 && (
                <div className="flex gap-2 p-2 justify-center">
                  {thumbnails.slice(0, 4).map((thumb, index) => (
                    <img
                      key={index}
                      src={thumb}
                      alt={`${product.name} ${index + 1}`}
                      onClick={() => handleThumbnailClick(thumb)}
                      className={`w-12 h-12 object-contain rounded-md cursor-pointer border transition ${
                        mainImage === thumb
                          ? "border-emerald-500"
                          : "border-gray-300 hover:border-emerald-400"
                      }`}
                    />
                  ))}
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Price</h3>
                <p className="text-emerald-600 font-bold text-xl">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Category
                </h3>
                <p className="text-gray-600">
                  {product.productSubCategory.name}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Minimum Quantity
                </h3>
                <p className="text-gray-600">{product.minimumQuantity}</p>
              </div>
              {product.shortDescription && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Description
                  </h3>
                  <p className="text-gray-600">{product.shortDescription}</p>
                </div>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setIsDetailsModalOpen(false);
                    setIsContactModalOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <span>Inquire About This Product</span>
                </button>
              </div>
            </div>
>>>>>>> Stashed changes
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
