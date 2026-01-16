import { Heart, Star } from "lucide-react";
import { useState } from "react";

const RecommendedProducts = () => {
  const [wishlist, setWishlist] = useState([]);

  const products = [
    {
      id: 1,
      name: "Dove 10 in 1 Deep Repair Treatment Hair Mask",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
      rating: 4.5,
      reviews: 3027,
      price: 215,
    },
    {
      id: 2,
      name: "Love Beauty & Planet Argan oil and Lavender Shampoo",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400",
      rating: 4.3,
      reviews: 852,
      price: 374,
    },
    {
      id: 3,
      name: "Dove Deep Moisture Body Wash",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
      rating: 4.6,
      reviews: 5243,
      price: 374,
    },
    {
      id: 4,
      name: "Pantene Pro-V Advanced Hair Fall Solution Shampoo",
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400",
      rating: 4.4,
      reviews: 1892,
      price: 299,
    },
    {
      id: 5,
      name: "Garnier Fructis Hair Food Banana Conditioner",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400",
      rating: 4.2,
      reviews: 1456,
      price: 325,
    },
    {
      id: 6,
      name: "L'Oréal Paris Total Repair 5 Shampoo",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400",
      rating: 4.7,
      reviews: 2890,
      price: 449,
    },
  ];

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm py-6 px-4 mb-6">
      <h2 className="text-white font-semibold text-lg mb-4">
        You might also like
      </h2>
      
      {/* Grid Container - 3 items per row */}
      <div className="grid grid-cols-3 gap-3 pb-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-3 relative flex flex-col"
          >
            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-5 right-5 z-10 p-1.5 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors border border-white/10"
            >
              <Heart
                className={`w-4 h-4 ${
                  wishlist.includes(product.id)
                    ? "fill-red-500 text-red-500"
                    : "text-white/60"
                }`}
              />
            </button>

            {/* Product Image */}
            <div className="w-full aspect-square bg-white/5 rounded-xl overflow-hidden mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col flex-1">
              <h3 className="text-white text-[10px] font-medium line-clamp-2 leading-snug h-7 mb-1">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-2 h-2 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white/40 text-[8px]">
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="mt-auto mb-2">
                <span className="text-white font-bold text-sm">
                  ₹{product.price}
                </span>
              </div>

              {/* Add Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full py-1.5 border border-blue-300 text-blue-300 rounded-lg font-semibold text-[10px] hover:bg-blue-300 hover:text-black transition-all duration-300"
              >
                ADD
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* See All Products Banner */}
      <div className="mt-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-4 hover:border-white/20 transition-all cursor-pointer">
        <div className="flex items-center justify-center gap-4">
          {/* Product Images Stack */}
          <div className="flex -space-x-2">
            {products.slice(0, 3).map((product, index) => (
              <div
                key={product.id}
                className="w-12 h-12 rounded-xl overflow-hidden border-2 border-black/40 bg-white/5"
                style={{ zIndex: 3 - index }}
              >
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* See All Text */}
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-base">
              See all products
            </span>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;

