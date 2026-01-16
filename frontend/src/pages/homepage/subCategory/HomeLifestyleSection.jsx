import SubCategorySection from "./SubCategorySection";

const HomeLifestyleSection = ({ onCategoryClick }) => {
  const homeItems = [
    {
      id: 1,
      name: "Cleaning Essentials",
      image:
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Home & Office",
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Pet Care",
      image:
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Stationery",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Kitchen Accessories",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Electricals",
      image:
        "https://images.unsplash.com/photo-1558089687-7b1e15e904d0?w=400&auto=format&fit=crop",
    },
    {
      id: 7,
      name: "Home Decor",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop",
    },
    {
      id: 8,
      name: "Garden & Outdoor",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop",
    },
  ];

  return (
    <SubCategorySection
      title="Home & Lifestyle"
      items={homeItems}
      onCategoryClick={onCategoryClick}
      route="/home"
    />
  );
};

export default HomeLifestyleSection;
