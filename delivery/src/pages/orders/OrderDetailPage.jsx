import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, MapPin, Store, Phone, MessageSquare, Clock, ShieldCheck, Package,
  PhoneOff, BellOff, DoorOpen, PawPrint, Mic
} from "lucide-react";

const OrderDetailPage = () => {
  const navigate = useNavigate();

  // Mock order data
  const order = {
    id: "ORD-7234",
    status: "Heading to store",
    shopName: "Fresh Mart Corner",
    shopAddress: "24/B Baker Street, Green Valley",
    customerAddress: "99 Skyline Towers, Apt 4C",
    customerInstructions: [
      { id: "avoid-calling", label: "Avoid calling", icon: PhoneOff },
      { id: "dont-ring", label: "Don't ring the bell", icon: BellOff },
      { id: "pet-at-home", label: "Pet at home", icon: PawPrint },
    ],
    voiceNote: true,
    storeInstructions: "The pickup counter is at the back of the store near the freezer section.",
    items: [
      { name: "Organic Bananas", qty: 1, price: "$2.99" },
      { name: "Whole Milk 1L", qty: 2, price: "$4.50" },
      { name: "Sourdough Bread", qty: 1, price: "$3.75" },
    ],
    total: "$15.74",
    basePay: "$5.50",
    tip: "$3.00",
  };

  return (
    <div className="bg-black min-h-screen text-white pb-32">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <p className="text-2xl font-bold">Order Details</p>
          
        </div>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* Route Details */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-3 h-3 bg-blue-400 rounded-full" />
              <div className="w-0.5 flex-1 bg-dashed border-l border-white/20" />
              <div className="w-3 h-3 bg-emerald-400 rounded-full" />
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Store Pickup</p>
                  <div className="flex gap-2">
                    <button className="p-1.5 bg-white/5 rounded-lg text-white">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-sm font-bold mt-1">{order.shopName}</h3>
                <p className="text-xs text-zinc-400 mt-0.5">{order.shopAddress}</p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Customer Drop-off</p>
                  <div className="flex gap-2">
                    <button className="p-1.5 bg-white/5 rounded-lg text-white">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 bg-white/5 rounded-lg text-white">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-zinc-300 mt-1">{order.customerAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Customer Delivery Instructions</p>
            
            {/* Voice Note if available */}
            {order.voiceNote && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Mic className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-300">Voice Instruction</p>
                    <p className="text-[10px] text-blue-300/60">0:12 seconds</p>
                  </div>
                </div>
                <button className="bg-blue-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-transform">
                  Play
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              {order.customerInstructions.map((instruction) => {
                const Icon = instruction.icon;
                return (
                  <div key={instruction.id} className="flex items-center gap-2.5 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                    <div className="bg-zinc-800 p-1.5 rounded-lg">
                      <Icon className="w-3.5 h-3.5 text-zinc-300" />
                    </div>
                    <span className="text-[11px] font-medium text-zinc-300">{instruction.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Earning Summary */}
        <div className="bg-emerald-500/[0.03] border border-emerald-500/10 rounded-2xl p-4">
          <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-4">Earning Summary</p>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Base Pay</span>
              <span className="text-white">{order.basePay}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Tips</span>
              <span className="text-emerald-400 font-bold">{order.tip}</span>
            </div>
            <div className="pt-2 mt-2 border-t border-white/5 flex justify-between">
              <span className="text-sm font-bold text-white">Total Expected</span>
              <span className="text-base font-bold text-emerald-400">$8.50</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent">
        <div className="flex gap-3">
          <button className="flex-1 bg-white/10 py-4 rounded-xl text-sm font-bold hover:bg-white/15 transition-colors">
            Direction
          </button>
          <button 
            onClick={() => navigate("/")}
            className="flex-1 bg-emerald-500 py-4 rounded-xl text-sm font-bold text-black active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/20"
          >
            Delivered
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
