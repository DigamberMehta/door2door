import { apiClient } from "./client.js";

/**
 * Analytics API Service for Admin
 * Get platform analytics and statistics
 */
export const analyticsAPI = {
  /**
   * Get dashboard overview stats
   * @param {Object} params - Query parameters (date range)
   */
  getOverview: async (params = {}) => {
    return apiClient.get("/analytics/overview", { params });
  },

  /**
   * Get sales analytics
   * @param {Object} params - Query parameters
   */
  getSales: async (params = {}) => {
    return apiClient.get("/analytics/sales", { params });
  },

  /**
   * Get revenue analytics
   * @param {Object} params - Query parameters
   */
  getRevenue: async (params = {}) => {
    return apiClient.get("/analytics/revenue", { params });
  },

  /**
   * Get customer analytics
   * @param {Object} params - Query parameters
   */
  getCustomers: async (params = {}) => {
    return apiClient.get("/analytics/customers", { params });
  },

  /**
   * Get order analytics
   * @param {Object} params - Query parameters
   */
  getOrders: async (params = {}) => {
    return apiClient.get("/analytics/orders", { params });
  },

  /**
   * Get performance metrics
   * @param {Object} params - Query parameters
   */
  getPerformance: async (params = {}) => {
    return apiClient.get("/analytics/performance", { params });
  },
};
