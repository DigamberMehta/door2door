import SubCategorySection from "./SubCategorySection";

const SnacksDrinksSection = ({ onCategoryClick }) => {
  const snacksItems = [
    {
      id: 1,
      name: "Chips & Namkeen",
      image:
        "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=400&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Sweets & Cookies",
      image:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Drinks & Juices",
      image:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Tea, Coffee & Milk Drinks",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Instant Food",
      image:
        "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=400&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Sauces & Spreads",
      image:
        "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400&auto=format&fit=crop",
    },
    {
      id: 7,
      name: "Paan Corner",
      image:
        "https://images.unsplash.com/photo-1608452964553-9b4d97b2752f?w=400&auto=format&fit=crop",
    },
    {
      id: 8,
      name: "Ice Creams & More",
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop",
    },
  ];

  return (
    <SubCategorySection
      title="Snacks & Drinks"
      items={snacksItems}
      onCategoryClick={onCategoryClick}
      route="/snacks"
    />
  );
};

export default SnacksDrinksSection;
