import { Package, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({ count = 4 }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-300/[0.07] backdrop-blur-sm rounded-2xl p-4 mx-2 mt-2 border border-blue-400/20 animate-beat shadow-[0_0_15px_rgba(59,130,246,0.1)]">
      <div className="flex items-center gap-4">
        <div className="bg-blue-500/10 rounded-xl p-3 border border-blue-400/10">
          <Package className="w-5 h-5 text-blue-300" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-blue-300/60 font-bold uppercase tracking-widest mb-1.5">Rush hour, be careful</p>
          <h3 className="text-sm font-bold text-white">
            {count} delivery orders found!
          </h3>
          <button 
            onClick={() => navigate("/deliveries")}
            className="text-[11px] text-blue-300 font-bold flex items-center gap-1 mt-2 active:translate-x-1 transition-transform outline-none focus:outline-none select-none" 
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            View details
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
