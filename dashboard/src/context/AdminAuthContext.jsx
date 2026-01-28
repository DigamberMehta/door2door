import { createContext, useContext, useState, useEffect } from "react";
import {
  authAPI,
  storeAuthData,
  getAuthData,
  clearAuthData,
} from "../services/admin/api";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const { user: storedUser, token: storedToken } = getAuthData();
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Login user
  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);

      if (response.success) {
        const { user, token, refreshToken } = response.data;

        // Verify user is an admin
        if (user.role !== "admin") {
          throw new Error("Access denied. Admin credentials required.");
        }

        // Store in state
        setUser(user);
        setToken(token);

        // Store in localStorage
        storeAuthData({ user, token, refreshToken });

        return { success: true, data: response.data };
      }
    } catch (error) {
      throw error;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear state
      setUser(null);
      setToken(null);

      // Clear localStorage
      clearAuthData();
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await authAPI.updateProfile(profileData);

      if (response.success && response.data.user) {
        setUser(response.data.user);
        localStorage.setItem("adminUser", JSON.stringify(response.data.user));
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const response = await authAPI.getProfile();

      if (response.success && response.data.user) {
        setUser(response.data.user);
        localStorage.setItem("adminUser", JSON.stringify(response.data.user));
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      const response = await authAPI.changePassword(passwordData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      const response = await authAPI.forgotPassword(email);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (resetData) => {
    try {
      const response = await authAPI.resetPassword(resetData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === "admin",
    login,
    logout,
    updateProfile,
    refreshUser,
    changePassword,
    forgotPassword,
    resetPassword,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// Custom hook to use admin auth context
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }

  return context;
};

export default AdminAuthContext;
