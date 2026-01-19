import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
} from "../utils/token";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`, // IMPORTANT FIX
});

// Attach token to requests
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
let isRefreshing = false;
let requestQueue = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized (401) and not retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      const refresh = getRefreshToken();
      if (!refresh) {
        clearTokens();
        return Promise.reject(error);
      }

      // Prevent multiple refresh requests
      if (isRefreshing) {
        return new Promise((resolve) => {
          requestQueue.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      // Start refreshing
      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/auth/refresh`, // FIXED URL
          { refreshToken: refresh },
        );

        const newAccess = res.data.data.accessToken;
        const newRefresh = res.data.data.refreshToken;

        saveTokens({ accessToken: newAccess, refreshToken: newRefresh });

        // Release queued requests
        requestQueue.forEach((cb) => cb(newAccess));
        requestQueue = [];
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (err) {
        clearTokens();
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
