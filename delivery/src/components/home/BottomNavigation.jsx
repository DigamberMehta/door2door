import { Home, Wallet, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Wallet, label: "Wallet", path: "/wallet" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 pb-safe z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-1 transition-all outline-none focus:outline-none focus:ring-0 select-none touch-none ${
                isActive
                  ? "text-blue-300 scale-105"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <item.icon className="w-5 h-5" />
              <span className={`text-[10px] font-medium tracking-tight ${isActive ? "font-bold" : ""}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
