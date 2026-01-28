import { apiClient } from "./client.js";

/**
 * User API Service for Admin
 * Manages all users
 */
export const userAPI = {
  /**
   * Get all users
   * @param {Object} params - Query parameters
   */
  getAll: async (params = {}) => {
    return apiClient.get("/users", { params });
  },

  /**
   * Get user by ID
   * @param {string} userId - User ID
   */
  getById: async (userId) => {
    return apiClient.get(`/users/${userId}`);
  },

  /**
   * Create user
   * @param {Object} userData - User data
   */
  create: async (userData) => {
    return apiClient.post("/users/register", userData);
  },

  /**
   * Update user
   * @param {string} userId - User ID
   * @param {Object} userData - Updated user data
   */
  update: async (userId, userData) => {
    return apiClient.put(`/users/${userId}`, userData);
  },

  /**
   * Delete user
   * @param {string} userId - User ID
   */
  delete: async (userId) => {
    return apiClient.delete(`/users/${userId}`);
  },

  /**
   * Toggle user active status
   * @param {string} userId - User ID
   */
  toggleActive: async (userId) => {
    return apiClient.patch(`/users/${userId}/toggle-active`);
  },

  /**
   * Get user statistics
   * @param {Object} params - Query parameters
   */
  getStats: async (params = {}) => {
    return apiClient.get("/users/stats", { params });
  },
};
