import SubCategorySection from "./SubCategorySection";

const GroceryKitchenSection = ({ onCategoryClick }) => {
  const groceryItems = [
    {
      id: 2,
      name: "Dairy, Bread & Eggs",
      image:
        "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&auto=format&fit=crop",
      category: "Grocery & Kitchen",
      color: "#3b82f6",
    },
    {
      id: 3,
      name: "Fruits & Vegetables",
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop",
      category: "Grocery & Kitchen",
      color: "#10b981",
    },
    {
      id: 10,
      name: "Atta, Rice & Dal",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop",
      category: "Grocery & Kitchen",
      color: "#f59e0b",
    },
    {
      id: 11,
      name: "Masala, Oil & More",
      image:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop",
      category: "Grocery & Kitchen",
      color: "#ef4444",
    },
    {
      id: 13,
      name: "Chicken, Meat & Fish",
      image:
        "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop",
      category: "Grocery & Kitchen",
      color: "#f97316",
    },
    {
      id: 14,
      name: "Organic & Healthy Living",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&auto=format&fit=crop",
      category: "Grocery & Kitchen",
      color: "#10b981",
    },
    {
      id: 15,
      name: "Baby Care",
      image:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&auto=format&fit=crop",
      category: "Grocery & Kitchen",
      color: "#ec4899",
    },
    {
      id: 16,
      name: "Pharma & Wellness",
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop",
      category: "Grocery & Kitchen",
      color: "#3b82f6",
    },
    {
      id: 17,
      name: "Cleaning Essentials",
      image:
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&auto=format&fit=crop",
      category: "Grocery & Kitchen",
      color: "#06b6d4",
    },
    {
      id: 18,
      name: "Home & Office",
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&auto=format&fit=crop",
      category: "Grocery & Kitchen",
      color: "#8b5cf6",
    },
    {
      id: 19,
      name: "Personal Care",
      image:
        "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&auto=format&fit=crop",
      category: "Grocery & Kitchen",
      color: "#a855f7",
    },
    {
      id: 20,
      name: "Pet Care",
      image:
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&auto=format&fit=crop",
      category: "Grocery & Kitchen",
      color: "#f59e0b",
    },
  ];

  return (
    <SubCategorySection
      title="Grocery & Kitchen"
      items={groceryItems}
      onCategoryClick={onCategoryClick}
      route="/grocery"
    />
  );
};

export default GroceryKitchenSection;
