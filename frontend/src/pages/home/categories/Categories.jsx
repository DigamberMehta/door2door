import React from "react";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Spiritual",
      image: "/src/assets/category/food.png",
    },
    {
      id: 2,
      name: "Pharma",
      image: "/src/assets/category/pharmacy.png",
    },
    {
      id: 3,
      name: "E-Gifts",
      image: "/src/assets/category/electronics.png",
    },
    {
      id: 4,
      name: "Pet",
      image: "/src/assets/category/home and garden.png",
    },
    {
      id: 5,
      name: "Sports",
      image: "/src/assets/category/Groceries.png",
    },
    {
      id: 6,
      name: "Fashion",
      image: "/src/assets/category/Fashion.png",
    },
    {
      id: 7,
      name: "Toy",
      image: "/src/assets/category/electronics.png",
    },
    {
      id: 8,
      name: "Book",
      image: "/src/assets/category/home and garden.png",
    },
  ];

  return (
    <div className="bg-black px-2">
      <div className="md:px-8">
        {/* Section Header */}
        <div className="text-left mb-4 md:mt-8 mt-2">
          <h2 className="text-xl md:text-4xl font-bold text-white">
            Shop by Category
          </h2>
        </div>
        {/* Categories Grid */}
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="group cursor-pointer">
              <div className="text-center">
                {/* Category Icon Container */}
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Category Name */}
                <h3 className="text-white font-medium text-xs leading-tight">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
