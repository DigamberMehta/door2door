import { MapPin, ChevronDown } from "lucide-react";

const CheckoutFooter = ({ total }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10">
      {/* Delivery Address */}
      <div className="px-4 pt-4 pb-3 border-b border-white/10">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/5 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">
                Delivering to Home
              </h3>
              <p className="text-white/60 text-xs">
                Srishti, E512 Khajuria, India
              </p>
            </div>
          </div>
          <button className="text-blue-300 text-sm font-medium hover:text-blue-400 transition-colors">
            Change
          </button>
        </div>
      </div>

      {/* Payment Method & Place Order */}
      <div className="px-4 py-4 flex items-center gap-3">
        {/* Payment Method */}
        <button className="flex items-center gap-2 px-3 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all">
          <div className="text-left">
            <div className="text-white/60 text-[10px] uppercase font-medium">
              Pay Using
            </div>
            <div className="text-white text-xs font-semibold">
              Google Pay UPI
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-white/60" />
        </button>

        {/* Place Order Button */}
        <button className="flex-1 bg-blue-300 hover:bg-blue-400 text-black rounded-lg py-3 px-4 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-blue-300/20 flex items-center justify-between">
          <div className="text-left">
            <div className="text-black/70 text-xs">TOTAL</div>
            <div className="text-black font-bold text-lg">₹{total}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Place Order</span>
            <svg
              className="w-4 h-4"
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
        </button>
      </div>
    </div>
  );
};

export default CheckoutFooter;
