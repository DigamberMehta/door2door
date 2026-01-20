import {
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Package,
  Heart,
  Gift,
  Bell,
  Palette,
  Globe,
  HelpCircle,
  MessageCircle,
  MessageSquare,
  Info,
  Star,
  Share2,
  FileText,
  Shield,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import UserInfoSection from "./components/UserInfoSection";
import AccountSection from "./components/AccountSection";
import OrdersSection from "./components/OrdersSection";
import PreferencesSection from "./components/PreferencesSection";
import SupportSection from "./components/SupportSection";
import AboutSection from "./components/AboutSection";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [view, setView] = useState("main");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const userData = {
    name: user?.name || "User",
    email: user?.email || "",
    phone: user?.phone || "",
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[rgb(49,134,22)]/30 font-sans pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-3 py-2.5">
          <button
            onClick={() => {
              if (view === "account") setView("main");
              else navigate(-1);
            }}
            className="p-1.5 -ml-1.5 active:bg-white/10 rounded-full transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-semibold tracking-tight">
            {view === "account" ? "Account Details" : "Profile"}
          </h1>
          <div className="w-8"></div>
        </div>
      </div>

      {view === "main" ? (
        <>
          {/* User Info Section */}
          <UserInfoSection
            isAuthenticated={isAuthenticated}
            userData={userData}
          />

          {/* Settings Content */}
          <div className="px-3 pt-2 pb-4 space-y-4">
            <AccountSection
              onProfileClick={() => navigate("/profile/details")}
            />
            <OrdersSection />
            <PreferencesSection />
            <SupportSection />
            <AboutSection />

            {/* Sign Out Button - Inlined */}
            {isAuthenticated && (
              <button
                className="w-full bg-white/5 backdrop-blur-2xl rounded-xl border border-white/5 p-3 active:bg-white/10 transition-all text-left group"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-white/5 rounded-lg border border-white/10">
                    <LogOut className="w-4 h-4 text-white/60 group-active:text-white" />
                  </div>
                  <span className="text-white/70 font-medium text-xs">
                    {isLoggingOut ? "Signing out..." : "Sign out"}
                  </span>
                </div>
              </button>
            )}
          </div>
        </>
      ) : (
        /* Account Details View */
        <div className="px-3 pt-3 space-y-2.5">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/5 p-3 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-xl">
                  <User className="w-5 h-5 text-white/70" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-white/40 mb-0.5 uppercase tracking-wider font-semibold">
                    Name
                  </p>
                  <p className="text-white font-medium text-sm">
                    {userData.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-white/5 pt-3">
                <div className="p-2 bg-white/5 rounded-xl">
                  <Mail className="w-5 h-5 text-white/70" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-white/40 mb-0.5 uppercase tracking-wider font-semibold">
                    Email
                  </p>
                  <p className="text-white font-medium text-sm">
                    {userData.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-white/5 pt-3">
                <div className="p-2 bg-white/5 rounded-xl">
                  <Phone className="w-5 h-5 text-white/70" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-white/40 mb-0.5 uppercase tracking-wider font-semibold">
                    Phone Number
                  </p>
                  <p className="text-white font-medium text-sm">
                    {userData.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
