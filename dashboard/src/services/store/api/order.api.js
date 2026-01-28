import { apiClient } from "./client.js";

/**
 * Order API Service for Store Managers
 * Manages store orders
 */
export const orderAPI = {
  /**
   * Get store orders
   * @param {Object} params - Query parameters
   */
  getMyOrders: async (params = {}) => {
    return apiClient.get("/orders/store/my", { params });
  },

  /**
   * Get order by ID
   * @param {string} orderId - Order ID
   */
  getById: async (orderId) => {
    return apiClient.get(`/orders/${orderId}`);
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
   * Get order statistics
   * @param {Object} params - Query parameters (date range, etc.)
   */
  getStats: async (params = {}) => {
    return apiClient.get("/orders/store/my/stats", { params });
  },

  /**
   * Get active orders (preparing, ready for pickup)
   */
  getActive: async () => {
    return apiClient.get("/orders/store/my/active");
  },
};
