import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlineSearch,
  HiOutlineMinus,
  HiOutlinePlus,
} from "react-icons/hi";
import { MdStar, MdVerified } from "react-icons/md";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Heart,
  Clock,
  Truck,
  ShieldCheck,
  Package,
} from "lucide-react";

const ProductDetailPage = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedReviewFilter, setSelectedReviewFilter] = useState("all");

  // Mock product data - replace with actual data fetching
  const product = {
    id: 1,
    name: decodeURIComponent(productName).replace(/-/g, " "),
    rating: 4.5,
    reviewCount: "2.5K+",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80",
    description:
      "Premium quality product with best in class features. Fresh and hygienically packed for your convenience.",
    inStock: true,
    brand: "Amul",
    deliveryTime: "20-30 mins",
    variants: [
      { unit: "500 ml", price: 28, originalPrice: null },
      { unit: "1 L", price: 54, originalPrice: 60 },
      { unit: "2 L", price: 105, originalPrice: 120 },
    ],
    features: [
      "100% Fresh and Pure",
      "No Added Preservatives",
      "Premium Quality",
      "Hygienically Packed",
      "Rich in Calcium & Protein",
      "Farm Fresh Quality",
    ],
    nutritionInfo: {
      calories: "150 kcal",
      protein: "8g",
      carbs: "12g",
      fat: "8g",
      calcium: "280mg",
      vitamin: "D3",
    },
    reviews: [
      {
        id: 1,
        name: "Rahul Sharma",
        rating: 5,
        date: "2 days ago",
        comment:
          "Excellent quality! Fresh milk delivered on time. The taste is amazing and it stays fresh for days.",
        verified: true,
        helpful: 24,
        images: [],
      },
      {
        id: 2,
        name: "Priya Patel",
        rating: 4,
        date: "5 days ago",
        comment:
          "Good product but packaging could be better. Otherwise satisfied with the quality and freshness.",
        verified: true,
        helpful: 12,
        images: [],
      },
      {
        id: 3,
        name: "Amit Kumar",
        rating: 5,
        date: "1 week ago",
        comment:
          "Best milk in town! My kids love it. Highly recommend for daily use.",
        verified: true,
        helpful: 8,
        images: [],
      },
      {
        id: 4,
        name: "Sneha Singh",
        rating: 4,
        date: "2 weeks ago",
        comment:
          "Fresh and pure milk. Good taste and quality. Delivery was quick.",
        verified: false,
        helpful: 15,
        images: [],
      },
    ],
    ratingBreakdown: {
      5: 1250,
      4: 850,
      3: 300,
      2: 75,
      1: 25,
    },
  };

  const currentVariant = product.variants[selectedVariant];

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const totalReviews = Object.values(product.ratingBreakdown).reduce(
    (a, b) => a + b,
    0
  );
  const avgRating = (
    Object.entries(product.ratingBreakdown).reduce(
      (acc, [rating, count]) => acc + rating * count,
      0
    ) / totalReviews
  ).toFixed(1);

  const filteredReviews =
    selectedReviewFilter === "all"
      ? product.reviews
      : product.reviews.filter(
          (r) => r.rating === parseInt(selectedReviewFilter)
        );

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5 px-3 py-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1.5 active:bg-white/10 rounded-full transition-all"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-1.5 active:bg-white/10 rounded-full transition-all"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-white"
                }`}
              />
            </button>
            <button
              onClick={() => {}}
              className="p-1.5 active:bg-white/10 rounded-full transition-all"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/search")}
              className="p-1.5 -mr-1.5 active:bg-white/10 rounded-full transition-all"
            >
              <HiOutlineSearch className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="w-full px-3 pt-2">
        <div className="w-full bg-white/5 p-6 flex items-center justify-center rounded-2xl border border-white/5 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-xs h-60 object-contain"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="px-3 pt-3 space-y-3">
        {/* Quick Info Badges */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          <div className="flex-shrink-0 flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/5">
            <Clock className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">
              {product.deliveryTime}
            </span>
          </div>
          <div className="flex-shrink-0 flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-[rgb(49,134,22)]" />
            <span className="text-xs text-white/80 font-medium">
              Quality Assured
            </span>
          </div>
          <div className="flex-shrink-0 flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/5">
            <Package className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs text-white/80 font-medium">
              Safe Packaging
            </span>
          </div>
        </div>

        {/* Name and Basic Details */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h1 className="text-lg font-bold text-white leading-tight flex-1">
              {product.name}
            </h1>
          </div>

          <p className="text-white/50 text-xs mb-2">by {product.brand}</p>

          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex items-center gap-1 bg-[rgb(49,134,22)]/20 px-2 py-1 rounded-lg border border-[rgb(49,134,22)]/30">
              <MdStar className="text-[rgb(49,134,22)] text-sm" />
              <span className="text-white font-bold text-xs">
                {product.rating}
              </span>
            </div>
            <span className="text-white/40 text-xs font-medium">
              {product.reviewCount} ratings
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-2xl font-black text-white">
              ₹{currentVariant.price}
            </span>
            {currentVariant.originalPrice && (
              <>
                <span className="text-sm text-white/40 line-through font-medium">
                  ₹{currentVariant.originalPrice}
                </span>
                <span className="bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border border-green-500/30">
                  {Math.round(
                    (1 - currentVariant.price / currentVariant.originalPrice) *
                      100
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>
        </div>

        {/* Select Unit Section */}
        <div className="space-y-2">
          <h2 className="text-white/50 text-[10px] font-bold tracking-wider uppercase">
            Select Unit
          </h2>
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            {product.variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(index)}
                className={`flex-shrink-0 min-w-[90px] p-2 rounded-lg border transition-all ${
                  selectedVariant === index
                    ? "bg-[rgb(49,134,22)]/20 border-[rgb(49,134,22)]/50"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <p
                  className={`text-[10px] font-bold mb-0.5 ${
                    selectedVariant === index ? "text-white" : "text-white/50"
                  }`}
                >
                  {variant.unit}
                </p>
                <span
                  className={`font-black text-sm ${
                    selectedVariant === index ? "text-white" : "text-white/70"
                  }`}
                >
                  ₹{variant.price}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5">
          <h2 className="text-white font-semibold text-xs mb-1.5">
            About this product
          </h2>
          <p className="text-white/60 text-xs leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Features */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5">
          <h2 className="text-white font-semibold text-xs mb-2">
            Key Features
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-1.5">
                <div className="w-1 h-1 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></div>
                <span className="text-white/70 text-xs leading-tight">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition Info */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5">
          <h2 className="text-white font-semibold text-xs mb-2">
            Nutrition Information
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(product.nutritionInfo).map(([key, value]) => (
              <div
                key={key}
                className="bg-white/5 rounded-lg p-2 border border-white/5"
              >
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">
                  {key}
                </p>
                <p className="text-white font-bold text-xs">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ratings & Reviews Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5">
          <h2 className="text-white font-semibold text-sm mb-3">
            Ratings & Reviews
          </h2>

          {/* Overall Rating */}
          <div className="flex items-start gap-4 mb-4 pb-3 border-b border-white/5">
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">
                {avgRating}
              </div>
              <div className="flex items-center gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <MdStar
                    key={star}
                    className={`text-xs ${
                      star <= Math.round(avgRating)
                        ? "text-[rgb(49,134,22)]"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              <p className="text-white/40 text-[10px]">
                {totalReviews.toLocaleString()} ratings
              </p>
            </div>

            <div className="flex-1 space-y-1.5">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = product.ratingBreakdown[rating];
                const percentage = (count / totalReviews) * 100;
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-[10px] text-white/50 w-2">
                      {rating}
                    </span>
                    <MdStar className="text-[10px] text-white/40" />
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[rgb(49,134,22)] to-[rgb(49,134,22)]/80 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-white/50 w-8 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Filter Reviews */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-3">
            <button
              onClick={() => setSelectedReviewFilter("all")}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedReviewFilter === "all"
                  ? "bg-[rgb(49,134,22)]/20 text-white border border-[rgb(49,134,22)]/30"
                  : "bg-white/5 text-white/50 border border-white/10"
              }`}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setSelectedReviewFilter(rating.toString())}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                  selectedReviewFilter === rating.toString()
                    ? "bg-[rgb(49,134,22)]/20 text-white border border-[rgb(49,134,22)]/30"
                    : "bg-white/5 text-white/50 border border-white/10"
                }`}
              >
                {rating} <MdStar className="text-[10px]" />
              </button>
            ))}
          </div>

          {/* Reviews List */}
          <div className="space-y-3">
            {filteredReviews.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-white/5 rounded-lg p-3 border border-white/5"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-white font-medium text-xs">
                        {review.name}
                      </span>
                      {review.verified && (
                        <MdVerified className="text-green-400 text-xs" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <MdStar
                            key={star}
                            className={`text-[10px] ${
                              star <= review.rating
                                ? "text-[rgb(49,134,22)]"
                                : "text-white/20"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white/40 text-[10px]">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-white/70 text-xs leading-relaxed mb-2">
                  {review.comment}
                </p>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-white/40 hover:text-white transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    <span className="text-[10px]">{review.helpful}</span>
                  </button>
                  <button className="flex items-center gap-1 text-white/40 hover:text-white transition-colors">
                    <ThumbsDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

            {filteredReviews.length > 3 && (
              <button className="w-full py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/70 active:bg-white/10 transition-all">
                View all {filteredReviews.length} reviews
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Fixed Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/5 p-3">
        <div className="flex items-center gap-2.5">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl px-2.5 py-2 border border-white/10">
            <button
              onClick={() => handleQuantityChange("decrement")}
              className="p-0.5 active:bg-white/10 rounded transition-all"
              disabled={quantity <= 1}
            >
              <HiOutlineMinus className="w-4 h-4 text-white" />
            </button>
            <span className="text-white font-bold text-sm min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange("increment")}
              className="p-0.5 active:bg-white/10 rounded transition-all"
            >
              <HiOutlinePlus className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button className="flex-1 bg-gradient-to-r from-[rgb(49,134,22)] to-[rgb(49,134,22)]/80 text-white font-bold py-2.5 rounded-xl text-sm shadow-lg active:scale-[0.98] transition-all">
            Add • ₹{currentVariant.price * quantity}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
