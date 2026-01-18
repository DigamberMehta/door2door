import {
  MdStorefront,
  MdShoppingCart,
  MdLocalPharmacy,
  MdPhoneIphone,
  MdFace,
  MdCheckroom,
  MdRestaurant,
  MdHome,
} from "react-icons/md";

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { id: "all", name: "All", icon: MdStorefront },
    { id: "grocery", name: "Grocery", icon: MdShoppingCart },
    { id: "pharmacy", name: "Pharmacy", icon: MdLocalPharmacy },
    { id: "electronics", name: "Electronics", icon: MdPhoneIphone },
    { id: "beauty", name: "Beauty", icon: MdFace },
    { id: "fashion", name: "Fashion", icon: MdCheckroom },
    { id: "food", name: "Food", icon: MdRestaurant },
    { id: "home", name: "Home", icon: MdHome },
  ];

  return (
    <div className="py-2 pb-3 overflow-x-auto scrollbar-none bg-black/20 backdrop-blur-sm border-b border-white/10 relative">
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

      <div className="flex gap-2 md:gap-3 px-3 md:px-4 min-w-min relative z-10">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              className={`flex flex-col items-center gap-1 bg-transparent border-none rounded-xl px-2 py-1.5 md:px-3 md:py-2 min-w-[55px] md:min-w-[65px] cursor-pointer transition-all duration-300 whitespace-nowrap flex-shrink-0 relative active:scale-95 group ${
                selectedCategory === category.name
                  ? "text-white font-semibold bg-white/15 backdrop-blur-sm border border-white/20 shadow-lg after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 md:after:w-8 after:h-0.5 after:bg-[rgb(49,134,22)] after:rounded-full after:opacity-100"
                  : "text-white/85 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm hover:border hover:border-white/15 hover:scale-105 after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 md:after:w-8 after:h-0.5 after:bg-[rgb(49,134,22)] after:rounded-full after:opacity-0 after:transition-all after:duration-300"
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <IconComponent
                className={`text-lg md:text-xl transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "scale-110 text-[rgb(49,134,22)]"
                    : "group-hover:scale-110 group-hover:text-[rgb(49,134,22)]"
                }`}
              />
              <span className="text-[10px] md:text-xs font-medium text-center leading-tight tracking-wide">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
