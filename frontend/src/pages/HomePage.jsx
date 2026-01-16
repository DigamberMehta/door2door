import { useState } from "react";
import Header from "../components/Header";
import {
  GroceryKitchenSection,
  SnacksDrinksSection,
  BeautyPersonalCareSection,
  HomeLifestyleSection,
} from "./homepage/subCategory";
import { StoreList, storesData } from "./homepage/store";

const HomePage = ({ onStoreClick, onCategoryClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [location, setLocation] = useState("Srishti, E512, Khajurla");

  const filteredStores = storesData.filter((store) => {
    const matchesCategory =
      selectedCategory === "All" ||
      store.category === selectedCategory.toLowerCase();
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-page">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        location={location}
      />

      <GroceryKitchenSection onCategoryClick={onCategoryClick} />
      <SnacksDrinksSection onCategoryClick={onCategoryClick} />
      <BeautyPersonalCareSection onCategoryClick={onCategoryClick} />
      <HomeLifestyleSection onCategoryClick={onCategoryClick} />

      <StoreList
        stores={filteredStores}
        onStoreClick={onStoreClick}
        onCategoryClick={onCategoryClick}
      />
    </div>
  );
};

export default HomePage;
