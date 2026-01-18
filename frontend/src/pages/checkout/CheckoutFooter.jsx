import { MapPin, ChevronDown } from "lucide-react";

const CheckoutFooter = ({ total }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10">
      {/* Delivery Address */}
      <div className="px-3 pt-3 pb-2 border-b border-white/10">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <div className="p-1 bg-white/5 rounded-lg">
              <MapPin className="w-4 h-4 text-[rgb(49,134,22)]" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-xs mb-1">
                Delivering to Home
              </h3>
              <p className="text-white/60 text-[10px]">
                Srishti, E512 Khajuria, India
              </p>
            </div>
          </div>
          <button className="text-[rgb(49,134,22)] text-xs font-medium hover:text-[rgb(49,134,22)]/80 transition-colors">
            Change
          </button>
        </div>
      </div>

      {/* Payment Method & Place Order */}
      <div className="px-3 py-3 flex items-center gap-2">
        {/* Payment Method */}
        <button className="flex items-center gap-2 px-2 py-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all">
          <div className="text-left">
            <div className="text-white/60 text-[8px] uppercase font-medium">
              Pay Using
            </div>
            <div className="text-white text-[10px] font-semibold">
              Google Pay UPI
            </div>
          </div>
          <ChevronDown className="w-3 h-3 text-white/60" />
        </button>

        {/* Place Order Button */}
        <button className="flex-1 bg-[rgb(49,134,22)] hover:bg-[rgb(49,134,22)]/90 text-white rounded-lg py-2 px-3 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[rgb(49,134,22)]/20 flex items-center justify-between">
          <div className="text-left">
            <div className="text-black/70 text-[10px]">TOTAL</div>
            <div className="text-black font-bold text-base">₹{total}</div>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm">Place Order</span>
            <svg
              className="w-3 h-3"
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
