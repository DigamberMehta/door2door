import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdShoppingCart,
  MdStar,
  MdFilterList,
  MdAccessTime,
  MdLocalOffer,
  MdStorefront,
} from "react-icons/md";

const FilterPage = ({ onStoreClick }) => {
  const { categoryName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get category from location state or derive from URL params
  const category = location.state?.category || {
    category:
      categoryName
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()) || "All Stores",
    route: `/${categoryName || "stores"}`,
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  useEffect(() => {
    console.log("FilterPage category:", category);
    if (category?.route) {
      console.log("Fetching stores from:", category.route);
      fetchStores(category.route);
    }
  }, [category]);

  const fetchStores = async (route) => {
    console.log("Making API call to:", `http://localhost:5000${route}`);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000${route}`);
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Received data:", data);
      setStores(data);
    } catch (error) {
      console.error("Error fetching stores:", error);
      // Fallback to sample data if API fails
      setStores([
        {
          id: 1,
          name: "QuickMart Express",
          rating: 4.5,
          deliveryTime: "10-15 min",
          distance: "0.5 km",
          categories: ["Groceries", "Kitchen Items", "Daily Essentials"],
          offer: "Up to 40% OFF",
          image:
            "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&auto=format&fit=crop",
          minOrder: 99,
        },
        {
          id: 2,
          name: "FreshMart Supermarket",
          rating: 4.7,
          deliveryTime: "15-20 min",
          distance: "1.2 km",
          categories: ["Groceries", "Vegetables", "Fruits"],
          offer: "Flat ₹50 OFF",
          image:
            "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400&auto=format&fit=crop",
          minOrder: 149,
        },
        {
          id: 3,
          name: "BigBasket Store",
          rating: 4.6,
          deliveryTime: "20-25 min",
          distance: "2.0 km",
          categories: ["Groceries", "Kitchen", "Household"],
          offer: "25% OFF up to ₹100",
          image:
            "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop",
          minOrder: 199,
        },
        {
          id: 4,
          name: "SpiceKart",
          rating: 4.4,
          deliveryTime: "25-30 min",
          distance: "2.5 km",
          categories: ["Spices", "Masala", "Kitchen Essentials"],
          offer: "Buy 2 Get 1 Free",
          image:
            "https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&auto=format&fit=crop",
          minOrder: 99,
        },
        {
          id: 5,
          name: "Daily Needs Mart",
          rating: 4.3,
          deliveryTime: "15-20 min",
          distance: "1.8 km",
          categories: ["Groceries", "Dairy", "Bakery"],
          offer: "Flat 30% OFF",
          image:
            "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400&auto=format&fit=crop",
          minOrder: 149,
        },
        {
          id: 6,
          name: "Organic Farm Store",
          rating: 4.8,
          deliveryTime: "30-35 min",
          distance: "3.0 km",
          categories: ["Organic", "Vegetables", "Fruits"],
          offer: "Up to 35% OFF",
          image:
            "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&auto=format&fit=crop",
          minOrder: 199,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filters = ["All", "Fast Delivery", "High Rated", "Best Offers"];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gradient-to-br from-slate-900 to-slate-700 px-4 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <button
          className="bg-white/10 border border-white/15 p-2 rounded-xl cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-white/20 hover:scale-105"
          onClick={handleBack}
        >
          <MdArrowBack className="text-xl text-white" />
        </button>
        <h1 className="text-base md:text-lg font-bold text-white m-0 flex-1 text-center">
          {category?.category || "Stores"}
        </h1>
        <button className="bg-white/10 border border-white/15 p-2 rounded-xl cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-white/20 hover:scale-105">
          <MdShoppingCart className="text-xl text-white" />
        </button>
      </header>

      {/* Filters */}
      <div className="flex items-center gap-4 p-4 bg-black overflow-x-auto">
        <MdFilterList className="text-xl text-white flex-shrink-0" />
        <div className="flex gap-3 overflow-x-auto scrollbar-none">
          {filters.map((filter, index) => (
            <button
              key={index}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                selectedFilter === filter.toLowerCase().replace(" ", "-")
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
              onClick={() =>
                setSelectedFilter(filter.toLowerCase().replace(" ", "-"))
              }
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Stores Grid */}
      <main className="p-4">
        {loading ? (
          <div className="text-center py-8 text-white">Loading stores...</div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <div
                key={store.id}
                className="bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border border-zinc-800 hover:-translate-y-1 hover:shadow-xl hover:border-zinc-700"
                onClick={() => onStoreClick && onStoreClick(store)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                  {store.offer && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-xs font-bold shadow-lg">
                      <MdLocalOffer className="text-sm" />
                      <span>{store.offer}</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-base md:text-lg font-bold text-white mb-2">
                    {store.name}
                  </h3>
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {store.categories.slice(0, 2).map((cat, idx) => (
                      <span
                        key={idx}
                        className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-xs font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 mb-3 text-xs md:text-sm">
                    <div className="flex items-center gap-1 text-white font-semibold">
                      <MdStar className="text-amber-500" />
                      <span>{store.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-400">
                      <MdAccessTime className="text-sm" />
                      <span>{store.deliveryTime}</span>
                    </div>
                    <div className="text-zinc-400">
                      <span>{store.distance}</span>
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-zinc-400">
                    <span>Min: ₹{store.minOrder}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FilterPage;
