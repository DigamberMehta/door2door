import { apiClient } from "./client.js";

/**
 * Delivery Settings API Service for Admin
 * Manages delivery configuration
 */
export const deliverySettingsAPI = {
  /**
   * Get delivery settings
   */
  get: async () => {
    return apiClient.get("/delivery-settings");
  },

  /**
   * Create or update delivery settings
   * @param {Object} settingsData - Delivery settings data
   */
  createOrUpdate: async (settingsData) => {
    return apiClient.post("/delivery-settings", settingsData);
  },

  /**
   * Calculate delivery charge
   * @param {Object} params - Distance parameters
   */
  calculateCharge: async (params = {}) => {
    return apiClient.get("/delivery-settings/calculate-charge", { params });
  },
};
