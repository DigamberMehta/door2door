import HeroSection from "../../components/home/HeroSection";
import BottomNavigation from "../../components/home/BottomNavigation";
import { Package, MapPin, Store, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DeliveriesPage = () => {
  const navigate = useNavigate();

  const deliveries = [
    {
      id: "ORD-7234",
      shopName: "Fresh Mart Corner",
      shopAddress: "88 Main Street, Sector 4",
      distanceToShop: "1.3 mi",
      address: "24/B Baker Street, Green Valley",
      distanceFromShop: "2.4 mi",
      time: "15 min",
    },
    {
      id: "ORD-8812",
      shopName: "The Burger House",
      shopAddress: "Food Court, Mall Road",
      distanceToShop: "0.8 mi",
      address: "Suite 405, Downtown Plaza",
      distanceFromShop: "1.2 mi",
      time: "10 min",
    },
    {
      id: "ORD-9901",
      shopName: "Organic Greens",
      shopAddress: "Farmers Market, East Wing",
      distanceToShop: "2.5 mi",
      address: "Block 7, West Side Residency",
      distanceFromShop: "4.1 mi",
      time: "25 min",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white pb-24">
      <div className="relative">
        <HeroSection />
        <button 
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-2xl font-bold">Available Deliveries</p>
          
        </div>

        <div className="space-y-4">
          {deliveries.map((delivery) => (
            <div 
              key={delivery.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/5 active:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-500/10 p-2 rounded-xl">
                  <Package className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none mb-1">Order ID</p>
                  <p className="text-xs font-mono text-white tracking-tighter">{delivery.id}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Store className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{delivery.shopName}</h3>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{delivery.shopAddress}</p>
                    <p className="text-[10px] text-emerald-400 font-medium mt-1">Pickup point • {delivery.distanceToShop} away</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{delivery.address}</p>
                    <p className="text-[10px] text-emerald-400 mt-1 font-medium italic">Destination • {delivery.distanceFromShop} from shop</p>
                    
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate("/order-detail")}
                className="w-full mt-4 bg-emerald-500 py-3 rounded-xl text-sm font-bold text-black active:scale-[0.98] transition-all"
              >
                Accept Delivery
              </button>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default DeliveriesPage;
