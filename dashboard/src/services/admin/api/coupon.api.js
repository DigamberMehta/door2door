import { apiClient } from "./client.js";

/**
 * Coupon API Service for Admin
 * Manages all coupons
 */
export const couponAPI = {
  /**
   * Get all coupons
   * @param {Object} params - Query parameters
   */
  getAll: async (params = {}) => {
    return apiClient.get("/coupons/admin/all", { params });
  },

  /**
   * Get coupon by ID
   * @param {string} id - Coupon ID
   */
  getById: async (id) => {
    return apiClient.get(`/coupons/admin/${id}`);
  },

  /**
   * Get active coupons
   */
  getActive: async () => {
    return apiClient.get("/coupons/active");
  },

  /**
   * Validate coupon code
   * @param {Object} validationData - Coupon code and validation data
   */
  validate: async (validationData) => {
    return apiClient.post("/coupons/validate", validationData);
  },

  /**
   * Create coupon
   * @param {Object} couponData - Coupon data
   */
  create: async (couponData) => {
    return apiClient.post("/coupons/admin", couponData);
  },

  /**
   * Update coupon
   * @param {string} id - Coupon ID
   * @param {Object} couponData - Updated coupon data
   */
  update: async (id, couponData) => {
    return apiClient.put(`/coupons/admin/${id}`, couponData);
  },

  /**
   * Delete coupon
   * @param {string} id - Coupon ID
   */
  delete: async (id) => {
    return apiClient.delete(`/coupons/admin/${id}`);
  },

  /**
   * Toggle coupon status
   * @param {string} id - Coupon ID
   */
  toggleStatus: async (id) => {
    return apiClient.patch(`/coupons/admin/${id}/toggle`);
  },

  /**
   * Get coupon statistics
   * @param {string} id - Coupon ID
   */
  getStats: async (id) => {
    return apiClient.get(`/coupons/admin/${id}/stats`);
  },
};
