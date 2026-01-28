import { apiClient } from "./client.js";

/**
 * Store API Service for Admin
 * Manages all stores
 */
export const storeAPI = {
  /**
   * Get all stores with filters
   * @param {Object} params - Query parameters
   */
  getAll: async (params = {}) => {
    return apiClient.get("/stores", { params });
  },

  /**
   * Get store by ID or slug
   * @param {string} identifier - Store ID or slug
   */
  getById: async (identifier) => {
    return apiClient.get(`/stores/${identifier}`);
  },

  /**
   * Get stores by category
   * @param {string} category - Category name
   * @param {Object} params - Query parameters
   */
  getByCategory: async (category, params = {}) => {
    return apiClient.get(`/stores/category/${category}`, { params });
  },

  /**
   * Get featured stores
   * @param {Object} params - Query parameters
   */
  getFeatured: async (params = {}) => {
    return apiClient.get("/stores/featured", { params });
  },

  /**
   * Search stores
   * @param {string} query - Search query
   * @param {Object} params - Additional parameters
   */
  search: async (query, params = {}) => {
    return apiClient.get("/stores/search", { params: { q: query, ...params } });
  },

  /**
   * Create a new store
   * @param {Object} storeData - Store data
   */
  create: async (storeData) => {
    return apiClient.post("/stores", storeData);
  },

  /**
   * Update store
   * @param {string} id - Store ID
   * @param {Object} storeData - Updated store data
   */
  update: async (id, storeData) => {
    return apiClient.put(`/stores/${id}`, storeData);
  },

  /**
   * Delete store
   * @param {string} id - Store ID
   */
  delete: async (id) => {
    return apiClient.delete(`/stores/${id}`);
  },

  /**
   * Toggle store active status
   * @param {string} id - Store ID
   */
  toggleActive: async (id) => {
    return apiClient.patch(`/stores/${id}/toggle-active`);
  },

  /**
   * Get store statistics
   * @param {Object} params - Query parameters
   */
  getStats: async (params = {}) => {
    return apiClient.get("/stores/stats", { params });
  },
};
