import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdStar,
  MdAccessTime,
  MdLocationOn,
  MdShoppingCart,
  MdLocalOffer,
} from "react-icons/md";
import { storesData } from "./homepage/store/storesData";

const StoreDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("products");

  // Get store from location state or find by id
  const store =
    location.state?.store || storesData.find((s) => s.id === parseInt(id));

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (!store) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Store not found
          </h2>
          <button
            onClick={handleBack}
            className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:from-orange-600 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            <MdArrowBack /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const StoreIcon = store.icon;

  // Sample products for the store
  const products = [
    {
      id: 1,
      name: "Fresh Milk",
      price: 65,
      originalPrice: 80,
      icon: MdShoppingCart,
      iconColor: "#10b981",
      unit: "1L",
      inStock: true,
    },
    {
      id: 2,
      name: "Brown Bread",
      price: 45,
      originalPrice: 55,
      icon: MdShoppingCart,
      iconColor: "#f59e0b",
      unit: "400g",
      inStock: true,
    },
    {
      id: 3,
      name: "Fresh Eggs",
      price: 120,
      originalPrice: 150,
      icon: MdShoppingCart,
      iconColor: "#ef4444",
      unit: "12 pcs",
      inStock: true,
    },
    {
      id: 4,
      name: "Greek Yogurt",
      price: 180,
      originalPrice: 220,
      icon: MdShoppingCart,
      iconColor: "#8b5cf6",
      unit: "500g",
      inStock: false,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="sticky top-0 bg-zinc-950 border-b border-zinc-800 z-40">
        <button
          className="flex items-center gap-3 p-4 text-white hover:text-orange-500 transition-colors"
          onClick={handleBack}
        >
          <MdArrowBack className="text-xl" />{" "}
          <span className="font-medium">Back</span>
        </button>
        <div className="p-4">
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${store.iconColor}30, ${store.iconColor}50)`,
            }}
          >
            <StoreIcon
              className="text-3xl"
              style={{ color: store.iconColor }}
            />
          </div>
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-3">
              {store.name}
            </h1>
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 text-xs md:text-sm text-zinc-300">
              <span className="flex items-center gap-1">
                <MdStar className="text-amber-500" /> {store.rating}
              </span>
              <span className="flex items-center gap-1">
                <MdAccessTime className="text-blue-500" /> {store.deliveryTime}
              </span>
              <span className="flex items-center gap-1">
                <MdLocationOn className="text-red-500" /> {store.distance}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {store.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-zinc-800 text-zinc-300 px-2 md:px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            {store.offer && (
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 md:px-4 py-2 rounded-lg inline-flex items-center gap-2 text-xs md:text-sm font-bold shadow-lg">
                <MdLocalOffer className="text-base" /> {store.offer}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-16 bg-zinc-950 border-b border-zinc-800 z-30">
        <div className="flex">
          <button
            className={`flex-1 py-3 md:py-4 px-4 md:px-6 text-center text-sm md:text-base font-medium transition-all ${
              selectedTab === "products"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => setSelectedTab("products")}
          >
            Products
          </button>
          <button
            className={`flex-1 py-3 md:py-4 px-4 md:px-6 text-center text-sm md:text-base font-medium transition-all ${
              selectedTab === "about"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => setSelectedTab("about")}
          >
            About
          </button>
          <button
            className={`flex-1 py-3 md:py-4 px-4 md:px-6 text-center text-sm md:text-base font-medium transition-all ${
              selectedTab === "reviews"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => setSelectedTab("reviews")}
          >
            Reviews
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="p-4">
        {selectedTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-xl font-bold text-white">
                Available Products
              </h2>
              <span className="text-xs md:text-sm text-zinc-400">
                {products.length} items
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => {
                const ProductIcon = product.icon;
                return (
                  <div
                    key={product.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
                  >
                    <div
                      className="relative w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${product.iconColor}15, ${product.iconColor}30)`,
                      }}
                    >
                      <ProductIcon
                        className="text-2xl"
                        style={{ color: product.iconColor }}
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-70 rounded-lg flex items-center justify-center text-xs text-red-400 font-bold">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm md:text-base text-white font-semibold">
                        {product.name}
                      </h3>
                      <p className="text-xs md:text-sm text-zinc-400">
                        {product.unit}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-base md:text-lg font-bold text-white">
                          ₹{product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs md:text-sm text-zinc-500 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <button
                        className={`w-full py-1.5 md:py-2 px-3 md:px-4 rounded-lg text-sm font-medium transition-all ${
                          product.inStock
                            ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700"
                            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        }`}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selectedTab === "about" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-4">
              About {store.name}
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              {store.name} is committed to providing you with the best quality
              products delivered right to your doorstep. We pride ourselves on
              fast delivery, fresh products, and excellent customer service.
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                Store Timings
              </h3>
              <p className="text-zinc-300">Open 24/7</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
              <p className="text-zinc-300">
                {store.distance} from your location
              </p>
            </div>
          </div>
        )}

        {selectedTab === "reviews" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Customer Reviews
            </h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center mb-6">
              <div className="space-y-2">
                <span className="text-4xl font-bold text-white">
                  {store.rating}
                </span>
                <div className="flex justify-center gap-1 text-amber-500">
                  <MdStar />
                  <MdStar />
                  <MdStar />
                  <MdStar />
                  <MdStar />
                </div>
                <span className="text-sm text-zinc-400">
                  Based on 1,234 reviews
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">Rahul S.</span>
                  <span className="flex items-center gap-1 text-amber-500 text-sm">
                    <MdStar /> 5.0
                  </span>
                </div>
                <p className="text-zinc-300 mb-2">
                  Great service! Products are always fresh and delivery is super
                  fast.
                </p>
                <span className="text-xs text-zinc-500">2 days ago</span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">Priya M.</span>
                  <span className="flex items-center gap-1 text-amber-500 text-sm">
                    <MdStar /> 4.5
                  </span>
                </div>
                <p className="text-zinc-300 mb-2">
                  Good variety of products. Delivery person was very polite.
                </p>
                <span className="text-xs text-zinc-500">1 week ago</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StoreDetailPage;
