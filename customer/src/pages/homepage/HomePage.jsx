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
import { useUserLocation } from "../../hooks/useUserLocation";

const HomePage = ({ onStoreClick, onCategoryClick }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { latitude, longitude, loading: locationLoading } = useUserLocation();

  // Fetch stores and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Build params with user location if available
        const params = { limit: 50 };
        if (latitude && longitude) {
          params.userLat = latitude;
          params.userLon = longitude;
        }

        // Fetch stores and categories separately to prevent one failure from affecting the other
        const storesResponse = await storeAPI.getAll(params);
        if (storesResponse?.data && Array.isArray(storesResponse.data)) {
          setStores(storesResponse.data);
        }

        // Fetch categories separately with its own error handling
        try {
          const categoriesResponse = await categoryAPI.getAll();
          if (categoriesResponse && Array.isArray(categoriesResponse)) {
            setCategories(categoriesResponse);
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
  }, [latitude, longitude]); // Re-fetch when location changes

  // Filter stores based on category
  const filteredStores = stores.filter((store) => {
    const matchesCategory =
      selectedCategory === "All" ||
      store.categories?.some(
        (cat) => cat.toLowerCase() === selectedCategory.toLowerCase(),
      );
    return matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black pb-20">
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
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
