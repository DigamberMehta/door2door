import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const banners = [
    {
      id: 1,
      title: "Daily Essentials",
      image:
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2026-01/Frame-1437256605-2-2.jpg",
      isMain: true,
    },
    {
      id: 2,
      title: "Pharmacy",
      image:
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg",
      isMain: false,
    },
    {
      id: 3,
      title: "Pet Care",
      image:
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2026-01/pet_crystal_WEB-1.png",
      isMain: false,
    },
    {
      id: 4,
      title: "Baby Care",
      image:
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2026-01/baby_crystal_WEB-1.png",
      isMain: false,
    },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const mobileBanners = banners.slice(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % mobileBanners.length);
    }, 3000); // Change banner every 3 seconds

    return () => clearInterval(interval);
  }, [mobileBanners.length]);

  return (
    <div className="bg-black px-2">
      <div className="md:px-8">
        {/* Auto-changing Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentBanner * 100}%)` }}
            >
              {mobileBanners.map((banner, index) => (
                <div key={banner.id} className="w-full flex-shrink-0">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-[180px] object-cover"
                    style={{ objectPosition: "center" }}
                  />
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {mobileBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentBanner ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-3">
          {banners.slice(1).map((banner) => (
            <div
              key={banner.id}
              className="relative overflow-hidden rounded-lg cursor-pointer"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-[220px] object-cover hover:scale-[1.02] transition-transform duration-300"
                style={{ objectPosition: "center" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
