import React, { useState } from "react";
import { Eye, X } from "lucide-react";
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
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: `Inquiry about ${product.name}`,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // ✅ status banner state
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

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
      setStatus({ type: "error", message: "⚠️ Please enter a valid email address" });
      setIsLoading(false);
      return;
    }
    if (formData.message.length > 1000) {
      setStatus({ type: "error", message: "⚠️ Message cannot exceed 1000 characters" });
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

      setStatus({ type: "success", message: "✅ Your message has been sent successfully!" });
      setFormData({
        name: "",
        email: "",
        subject: `Inquiry about ${product.name}`,
        message: "",
      });

      // auto-hide after 5s
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      setStatus({ type: "error", message: "❌ There was an error sending your message" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div
        className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group ${
          viewMode === "list" ? "flex" : ""
        }`}
      >
        <div
          className={`relative ${
            viewMode === "list" ? "w-48 flex-shrink-0" : ""
          }`}
        >
          <img
            src={getImageUrl(product.primaryImageUrl)}
            alt={product.name}
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
              viewMode === "list" ? "w-full h-32" : "w-full h-48"
            }`}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => {
                if (onViewDetails) {
                  onViewDetails(product);
                } else {
                  setIsDetailsModalOpen(true);
                }
              }}
              className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-colors"
              aria-label="View product details"
            >
              <Eye className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-700 transition-colors">
                {product.name}
              </h3>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                {product.productSubCategory.name}
              </span>
            </div>

            {product.shortDescription && (
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
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
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 group"
            >
              <span>Enquire Now</span>
            </button>
          </div>
        </div>
      </div>

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
                src={getImageUrl(product.primaryImageUrl)}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
              />
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
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
