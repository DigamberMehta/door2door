import { apiClient } from "./client.js";

/**
 * Category API Service for Admin
 * Manages all categories
 */
export const categoryAPI = {
  /**
   * Get all categories
   * @param {Object} params - Query parameters
   */
  getAll: async (params = {}) => {
    return apiClient.get("/categories", { params });
  },

  /**
   * Get category by slug
   * @param {string} slug - Category slug
   */
  getBySlug: async (slug) => {
    return apiClient.get(`/categories/${slug}`);
  },

  /**
   * Get subcategories of a category
   * @param {string} slug - Parent category slug
   */
  getSubcategories: async (slug) => {
    return apiClient.get(`/categories/${slug}/subcategories`);
  },

  /**
   * Get featured categories
   */
  getFeatured: async () => {
    return apiClient.get("/categories/featured");
  },

  /**
   * Search categories
   * @param {string} query - Search query
   */
  search: async (query) => {
    return apiClient.get("/categories/search", { params: { q: query } });
  },

  /**
   * Create category
   * @param {Object} categoryData - Category data
   */
  create: async (categoryData) => {
    return apiClient.post("/categories", categoryData);
  },

  /**
   * Update category
   * @param {string} id - Category ID
   * @param {Object} categoryData - Updated category data
   */
  update: async (id, categoryData) => {
    return apiClient.put(`/categories/${id}`, categoryData);
  },

  /**
   * Delete category
   * @param {string} id - Category ID
   */
  delete: async (id) => {
    return apiClient.delete(`/categories/${id}`);
  },
};
