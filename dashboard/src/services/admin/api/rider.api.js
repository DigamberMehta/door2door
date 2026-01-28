import { apiClient } from "./client.js";

/**
 * Rider API Service for Admin
 * Manages delivery riders
 */
export const riderAPI = {
  /**
   * Get all riders
   * @param {Object} params - Query parameters
   */
  getAll: async (params = {}) => {
    return apiClient.get("/riders", { params });
  },

  /**
   * Get rider by ID
   * @param {string} riderId - Rider ID
   */
  getById: async (riderId) => {
    return apiClient.get(`/riders/${riderId}`);
  },

  /**
   * Verify rider document
   * @param {string} riderId - Rider ID
   * @param {string} documentType - Document type
   * @param {Object} verificationData - Verification data
   */
  verifyDocument: async (riderId, documentType, verificationData) => {
    return apiClient.post(`/riders/${riderId}/verify-document`, {
      documentType,
      ...verificationData,
    });
  },

  /**
   * Reject rider document
   * @param {string} riderId - Rider ID
   * @param {string} documentType - Document type
   * @param {Object} rejectionData - Rejection data
   */
  rejectDocument: async (riderId, documentType, rejectionData) => {
    return apiClient.post(`/riders/${riderId}/reject-document`, {
      documentType,
      ...rejectionData,
    });
  },

  /**
   * Get rider earnings
   * @param {string} riderId - Rider ID
   * @param {Object} params - Query parameters
   */
  getEarnings: async (riderId, params = {}) => {
    return apiClient.get(`/riders/${riderId}/earnings`, { params });
  },

  /**
   * Get rider statistics
   * @param {Object} params - Query parameters
   */
  getStats: async (params = {}) => {
    return apiClient.get("/riders/stats", { params });
  },

  /**
   * Toggle rider active status
   * @param {string} riderId - Rider ID
   */
  toggleActive: async (riderId) => {
    return apiClient.patch(`/riders/${riderId}/toggle-active`);
  },
};
