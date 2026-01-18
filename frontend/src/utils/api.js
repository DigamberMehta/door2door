import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor - Add auth token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and token refresh
apiClient.interceptors.response.use(
  (response) => {
    // Return the data directly
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          // Try to refresh the token
          const response = await axios.post(`${API_BASE_URL}/users/refresh`, {
            refreshToken,
          });

          if (response.data.success) {
            const { token } = response.data.data;
            localStorage.setItem("authToken", token);

            // Retry the original request with new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh token failed, clear auth data and redirect to login
        clearAuthData();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";

    return Promise.reject(new Error(errorMessage));
  }
);

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    return apiClient.post("/users/register", userData);
  },

  login: async (credentials) => {
    return apiClient.post("/users/login", credentials);
  },

  logout: async () => {
    return apiClient.post("/users/logout");
  },

  refreshToken: async (refreshToken) => {
    return apiClient.post("/users/refresh", { refreshToken });
  },

  getProfile: async () => {
    return apiClient.get("/users/profile");
  },

  updateProfile: async (profileData) => {
    return apiClient.put("/users/profile", profileData);
  },

  changePassword: async (passwordData) => {
    return apiClient.put("/users/change-password", passwordData);
  },

  forgotPassword: async (email) => {
    return apiClient.post("/users/forgot-password", { email });
  },

  resetPassword: async (resetData) => {
    return apiClient.put("/users/reset-password", resetData);
  },
};

// Store user data in localStorage
export const storeAuthData = (data) => {
  if (data.token) {
    localStorage.setItem("authToken", data.token);
  }
  if (data.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
};

// Get user data from localStorage
export const getAuthData = () => {
  const token = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  return { token, refreshToken, user };
};

// Clear auth data
export const clearAuthData = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};
