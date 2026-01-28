import { apiClient } from "./client.js";

/**
 * Earnings API Service for Store Managers
 * View earnings and payouts
 */
export const earningsAPI = {
  /**
   * Get earnings summary
   * @param {Object} params - Query parameters (date range)
   */
  getSummary: async (params = {}) => {
    return apiClient.get("/earnings/store/my", { params });
  },

  /**
   * Get transaction history
   * @param {Object} params - Query parameters
   */
  getTransactions: async (params = {}) => {
    return apiClient.get("/earnings/store/my/transactions", { params });
  },

  /**
   * Get payout history
   * @param {Object} params - Query parameters
   */
  getPayouts: async (params = {}) => {
    return apiClient.get("/earnings/store/my/payouts", { params });
  },

  /**
   * Update bank account details
   * @param {Object} bankData - Bank account data
   */
  updateBankAccount: async (bankData) => {
    return apiClient.put("/earnings/store/my/bank-account", bankData);
  },
};
