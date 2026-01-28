import { apiClient } from "./client.js";

/**
 * Order API Service for Admin
 * Manages all orders
 */
export const orderAPI = {
  /**
   * Get all orders with filters
   * @param {Object} params - Query parameters
   */
  getAll: async (params = {}) => {
    return apiClient.get("/orders", { params });
  },

  /**
   * Get order by ID
   * @param {string} orderId - Order ID
   */
  getById: async (orderId) => {
    return apiClient.get(`/orders/${orderId}`);
  },

  /**
   * Track order
   * @param {string} orderId - Order ID
   */
  track: async (orderId) => {
    return apiClient.get(`/orders/${orderId}/track`);
  },

  /**
   * Update order status
   * @param {string} orderId - Order ID
   * @param {Object} statusData - Status update data
   */
  updateStatus: async (orderId, statusData) => {
    return apiClient.patch(`/orders/${orderId}/status`, statusData);
  },

  /**
   * Cancel order
   * @param {string} orderId - Order ID
   * @param {Object} cancelData - Cancellation data
   */
  cancel: async (orderId, cancelData) => {
    return apiClient.post(`/orders/${orderId}/cancel`, cancelData);
  },

  /**
   * Get order statistics
   * @param {Object} params - Query parameters
   */
  getStats: async (params = {}) => {
    return apiClient.get("/orders/stats", { params });
  },
};
