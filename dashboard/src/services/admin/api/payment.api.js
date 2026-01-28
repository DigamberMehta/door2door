import { apiClient } from "./client.js";

/**
 * Payment API Service for Admin
 * Manages all payments and refunds
 */
export const paymentAPI = {
  /**
   * Get all payments
   * @param {Object} params - Query parameters
   */
  getAll: async (params = {}) => {
    return apiClient.get("/payments", { params });
  },

  /**
   * Get payment by ID
   * @param {string} paymentId - Payment ID
   */
  getById: async (paymentId) => {
    return apiClient.get(`/payments/${paymentId}`);
  },

  /**
   * Get payment statistics
   * @param {Object} params - Query parameters
   */
  getStats: async (params = {}) => {
    return apiClient.get("/payments/stats", { params });
  },

  /**
   * Process refund
   * @param {string} paymentId - Payment ID
   * @param {Object} refundData - Refund data
   */
  refund: async (paymentId, refundData) => {
    return apiClient.post(`/payments/${paymentId}/refund`, refundData);
  },

  /**
   * Get refund history
   * @param {Object} params - Query parameters
   */
  getRefunds: async (params = {}) => {
    return apiClient.get("/payments/refunds", { params });
  },
};
