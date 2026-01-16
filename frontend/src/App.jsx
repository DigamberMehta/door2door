import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/home/herosection";
import Categories from "./pages/home/categories";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <Categories />
                </>
              }
            />
            <Route
              path="/products"
              element={
                <div className="text-white container mx-auto px-4 py-8">
                  Products Page
                </div>
              }
            />
            <Route
              path="/orders"
              element={
                <div className="text-white container mx-auto px-4 py-8">
                  Orders Page
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
