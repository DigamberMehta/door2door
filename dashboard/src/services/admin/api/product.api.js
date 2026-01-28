import { apiClient } from "./client.js";

/**
 * Product API Service for Admin
 * Manages all products
 */
export const productAPI = {
  /**
   * Get all products with filters
   * @param {Object} params - Query parameters
   */
  getAll: async (params = {}) => {
    return apiClient.get("/products", { params });
  },

  /**
   * Get product by ID
   * @param {string} id - Product ID
   */
  getById: async (id) => {
    return apiClient.get(`/products/${id}`);
  },

  /**
   * Get products by category
   * @param {string} categorySlug - Category slug
   * @param {Object} params - Query parameters
   */
  getByCategory: async (categorySlug, params = {}) => {
    return apiClient.get(`/products/category/${categorySlug}`, { params });
  },

  /**
   * Get products by store
   * @param {string} storeId - Store ID
   * @param {Object} params - Query parameters
   */
  getByStore: async (storeId, params = {}) => {
    return apiClient.get("/products", {
      params: { ...params, storeId },
    });
  },

  /**
   * Search products
   * @param {string} query - Search query
   * @param {Object} params - Additional parameters
   */
  search: async (query, params = {}) => {
    return apiClient.get("/products/search", {
      params: { q: query, ...params },
    });
  },

  /**
   * Create a new product
   * @param {Object} productData - Product data
   */
  create: async (productData) => {
    return apiClient.post("/products", productData);
  },

  /**
   * Update product
   * @param {string} id - Product ID
   * @param {Object} productData - Updated product data
   */
  update: async (id, productData) => {
    return apiClient.put(`/products/${id}`, productData);
  },

  /**
   * Delete product
   * @param {string} id - Product ID
   */
  delete: async (id) => {
    return apiClient.delete(`/products/${id}`);
  },

  /**
   * Toggle product active status
   * @param {string} id - Product ID
   */
  toggleActive: async (id) => {
    return apiClient.patch(`/products/${id}/toggle-active`);
  },

  /**
   * Get product statistics
   * @param {Object} params - Query parameters
   */
  getStats: async (params = {}) => {
    return apiClient.get("/products/stats", { params });
  },
};
