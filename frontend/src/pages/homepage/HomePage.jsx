import { useState, useEffect } from "react";
import Header from "../../components/Header";
import {
  GroceryKitchenSection,
  SnacksDrinksSection,
  BeautyPersonalCareSection,
  HomeLifestyleSection,
} from "./subCategory";
import { StoreList } from "./store";
import { storeAPI, categoryAPI } from "../../services/api";
import { StoreListShimmer } from "../../components/shimmer";

const HomePage = ({ onStoreClick, onCategoryClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch stores and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch stores and categories separately to prevent one failure from affecting the other
        const storesResponse = await storeAPI.getAll({ limit: 50 });
        if (storesResponse?.data && Array.isArray(storesResponse.data)) {
          setStores(storesResponse.data);
        }

        // Fetch categories separately with its own error handling
        try {
          const categoriesResponse = await categoryAPI.getAll();
          if (
            categoriesResponse?.data &&
            Array.isArray(categoriesResponse.data)
          ) {
            setCategories(categoriesResponse.data);
          }
        } catch (categoryError) {
          console.error("Error fetching categories:", categoryError);
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
        setStores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter stores based on search and category
  const filteredStores = stores.filter((store) => {
    const matchesCategory =
      selectedCategory === "All" ||
      store.categories?.some(
        (cat) => cat.toLowerCase() === selectedCategory.toLowerCase(),
      );
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.categories?.some((cat) =>
        cat.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black pb-20">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <GroceryKitchenSection onCategoryClick={onCategoryClick} />
      <SnacksDrinksSection onCategoryClick={onCategoryClick} />
      <BeautyPersonalCareSection onCategoryClick={onCategoryClick} />
      <HomeLifestyleSection onCategoryClick={onCategoryClick} />

      {loading ? (
        <StoreListShimmer />
      ) : (
        <StoreList
          stores={filteredStores}
          onStoreClick={onStoreClick}
          onCategoryClick={onCategoryClick}
        />
      )}
    </div>
  );
};

export default HomePage;
