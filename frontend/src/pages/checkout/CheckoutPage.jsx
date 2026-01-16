import { useState } from "react";
import { ChevronLeft, Share2, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RecommendedProducts from "./RecommendedProducts";
import BillDetails from "./BillDetails";
import DeliveryInstructions from "./DeliveryInstructions";
import CheckoutFooter from "./CheckoutFooter";
import "./scrollbar.css";

const CheckoutPage = () => {
  const navigate = useNavigate();

  // Sample cart items - In real app, this would come from state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Love Beauty & Planet Argan Oil and Lavender Shampoo",
      size: "2 x 200 ml",
      price: 597,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400",
    },
    {
      id: 2,
      name: "Organic Green Tea Leaves Premium Quality",
      size: "1 x 500 g",
      price: 399,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
    },
    {
      id: 3,
      name: "Dove Moisturizing Body Wash Deep Moisture",
      size: "3 x 250 ml",
      price: 649,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handleShare = () => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: "My Cart",
        text: `I have ${cartItems.length} items in my cart`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-3 py-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Checkout</h1>
          <button
            onClick={handleShare}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <Share2 className="w-4 h-4 text-blue-300" />
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="pb-24">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-3">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-12 h-12 text-white/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold mb-1">Your cart is empty</h2>
            <p className="text-white/60 text-center mb-4 text-sm">
              Add items to your cart to get started
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-black rounded-lg font-medium transition-colors text-sm"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="px-3 py-3 space-y-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3"
              >
                <div className="flex gap-3">
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-white mb-1 line-clamp-2 text-xs leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-white/60 mb-1">
                        {item.size}
                      </p>
                      <button className="text-[10px] text-white/60 hover:text-white/80 transition-colors">
                        Move to wishlist
                      </button>
                    </div>
                  </div>

                  {/* Price and Quantity */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      <div className="text-base font-bold text-blue-300">
                        ₹{item.price}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-1 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-white/60 hover:text-white transition-colors w-5 h-5 flex items-center justify-center"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-2 h-2" />
                      </button>
                      <span className="font-medium text-xs w-5 text-center text-blue-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-white/60 hover:text-white transition-colors w-5 h-5 flex items-center justify-center"
                      >
                        <Plus className="w-2 h-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommended Products Section */}
        {cartItems.length > 0 && <RecommendedProducts />}

        {/* Bill Details Section */}
        {cartItems.length > 0 && <BillDetails cartItems={cartItems} />}

        {/* Delivery Instructions Section */}
        {cartItems.length > 0 && <DeliveryInstructions />}
      </div>

      {/* Checkout Footer - Fixed */}
      {cartItems.length > 0 && <CheckoutFooter total={total.toFixed(0)} />}
    </div>
  );
};

export default CheckoutPage;
