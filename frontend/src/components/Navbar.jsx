import React, { useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0a0a0a]/60 backdrop-blur-xl border-b border-white/5 shadow-2xl supports-[backdrop-filter]:bg-[#0a0a0a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <img
              src="/logo.png"
              alt="Door2Door"
              className="h-12 w-auto mix-blend-screen"
              style={{ filter: "contrast(1.2) brightness(1.1)" }}
            />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-8 flex items-center space-x-1">
              {["Home", "Products", "Orders"].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="px-5 py-2 text-sm font-medium text-gray-300 transition-all duration-300 rounded-full hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium shadow-lg shadow-gray-900/40 transition-all duration-300 hover:scale-[1.02] border border-gray-600/50 hover:border-gray-500/70">
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </button>

            <button className="p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-2 right-2.5 h-2 w-2 bg-blue-500 rounded-full"></span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/5">
          {/* Mobile Search */}
          <div className="relative mt-3 mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all duration-300"
            />
          </div>

          {["Home", "Products", "Orders"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-all duration-300"
            >
              {item}
            </a>
          ))}

          {/* Mobile User Actions */}
          <div className="pt-4 grid grid-cols-2 gap-3 border-t border-white/5 mt-4">
            <button className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium shadow-lg transition-all duration-300 border border-gray-600/50 hover:border-gray-500/70">
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/5 transition-all duration-300">
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
