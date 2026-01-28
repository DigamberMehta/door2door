import { apiClient } from "./client.js";

/**
 * Store API Service for Store Managers
 * Manages own store information
 */
export const storeAPI = {
  /**
   * Get own store information
   */
  getMy: async () => {
    return apiClient.get("/stores/my");
  },

  /**
   * Update own store
   * @param {Object} storeData - Updated store data
   */
  update: async (storeData) => {
    return apiClient.put("/stores/my", storeData);
  },

  /**
   * Update store operating hours
   * @param {Array} operatingHours - Operating hours array
   */
  updateOperatingHours: async (operatingHours) => {
    return apiClient.put("/stores/my/operating-hours", { operatingHours });
  },

  /**
   * Update store delivery settings
   * @param {Object} deliverySettings - Delivery settings
   */
  updateDeliverySettings: async (deliverySettings) => {
    return apiClient.put("/stores/my/delivery-settings", deliverySettings);
  },

  /**
   * Get store statistics
   */
  getStats: async () => {
    return apiClient.get("/stores/my/stats");
  },
};
