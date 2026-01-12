/* eslint-disable @typescript-eslint/no-unused-vars */
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
    contact: "",
    subject: `Inquiry about ${product.name}`,
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  /* -------------------- Helpers -------------------- */

  const getCurrencyFromTimeZone = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timeZone.startsWith("Asia")) return { locale: "en-IN", currency: "INR" };
    if (timeZone.startsWith("America"))
      return { locale: "en-US", currency: "USD" };
    if (timeZone.startsWith("Europe"))
      return { locale: "de-DE", currency: "EUR" };

    return { locale: "en-US", currency: "USD" };
  };

  const formatPrice = (price: number) => {
    const { locale, currency } = getCurrencyFromTimeZone();
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(price);
  };

  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl)
      return "https://images.pexels.com/photos/1078736/pexels-photo-1078736.jpeg";
    if (imageUrl.startsWith("http")) return imageUrl;
    return productApi.getImage(imageUrl);
  };

  /* -------------------- Contact Form -------------------- */

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ type: "error", message: "Invalid email address" });
      setIsLoading(false);
      return;
    }

    try {
      await fetch(import.meta.env.VITE_APP_SCRIPT_EXCEL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        mode: "no-cors",
      });

      setStatus({
        type: "success",
        message: "Your inquiry has been sent successfully!",
      });

      setFormData({
        name: "",
        email: "",
        contact: "",
        subject: `Inquiry about ${product.name}`,
        message: "",
      });

      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus({ type: "error", message: "Failed to send message" });
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- Images -------------------- */

  const [mainImage, setMainImage] = useState(
    getImageUrl(product.primaryImageUrl)
  );

  const thumbnails =
    product.additionalImageUrls?.map(getImageUrl) || [];

  /* -------------------- UI -------------------- */

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden group">
        <div className="relative">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
          />

          <button
            onClick={() =>
              onViewDetails
                ? onViewDetails(product)
                : setIsDetailsModalOpen(true)
            }
            className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="font-bold text-lg">{product.name}</h3>

          <p className="text-sm text-gray-600 mt-2">
            {product.shortDescription}
          </p>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-emerald-600 font-bold text-xl">
              {formatPrice(product.price)}
            </span>

            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
            >
              Enquire
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- Contact Modal ---------------- */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">
              Inquire about {product.name}
            </h2>

            {status && (
              <p
                className={`mb-3 text-sm ${
                  status.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {status.message}
              </p>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleContactChange}
                required
                className="w-full border p-2 rounded"
              />
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleContactChange}
                required
                className="w-full border p-2 rounded"
              />
              <input
                name="contact"
                placeholder="Contact"
                value={formData.contact}
                onChange={handleContactChange}
                className="w-full border p-2 rounded"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleContactChange}
                required
                className="w-full border p-2 rounded"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-emerald-600 text-white px-4 py-2 rounded"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
