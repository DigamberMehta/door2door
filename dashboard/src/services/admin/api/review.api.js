import { apiClient } from "./client.js";

/**
 * Review API Service for Admin
 * Moderates all reviews
 */
export const reviewAPI = {
  /**
   * Get all reviews
   * @param {Object} params - Query parameters
   */
  getAll: async (params = {}) => {
    return apiClient.get("/reviews", { params });
  },

  /**
   * Get product reviews
   * @param {string} productId - Product ID
   * @param {Object} params - Query parameters
   */
  getProductReviews: async (productId, params = {}) => {
    return apiClient.get(`/reviews/product/${productId}`, { params });
  },

  /**
   * Get review stats
   * @param {Object} params - Query parameters
   */
  getStats: async (params = {}) => {
    return apiClient.get("/reviews/stats", { params });
  },

  /**
   * Respond to review
   * @param {string} reviewId - Review ID
   * @param {Object} responseData - Response data
   */
  respond: async (reviewId, responseData) => {
    return apiClient.post(`/reviews/${reviewId}/respond`, responseData);
  },

  /**
   * Delete review
   * @param {string} reviewId - Review ID
   */
  delete: async (reviewId) => {
    return apiClient.delete(`/reviews/${reviewId}`);
  },

  /**
   * Flag review as inappropriate
   * @param {string} reviewId - Review ID
   * @param {Object} flagData - Flag reason
   */
  flag: async (reviewId, flagData) => {
    return apiClient.post(`/reviews/${reviewId}/flag`, flagData);
  },
};
