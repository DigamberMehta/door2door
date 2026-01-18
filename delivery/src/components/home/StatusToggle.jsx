import { useState } from "react";

const StatusToggle = () => {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 mx-2 mt-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)] relative z-10 border border-white/5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">
            Status: <span className={isOnline ? "text-emerald-400" : "text-zinc-400"}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </h3>
          <p className="text-[10px] text-zinc-500 mt-1">
            {isOnline ? "Open to any delivery" : "Not accepting deliveries"}
          </p>
        </div>
        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`relative w-11 h-6 rounded-full transition-all duration-500 ease-in-out focus:outline-none select-none ${
            isOnline ? "bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-white/10"
          }`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
              isOnline ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default StatusToggle;
