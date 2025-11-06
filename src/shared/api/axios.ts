import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type");
    if (token && tokenType) {
      config.headers.Authorization = `${tokenType} ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh or logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, logout
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token_type");
      localStorage.removeItem("full_name");
      localStorage.removeItem("role");
      // You might want to dispatch logout action here, but since it's shared, keep it simple
    }
    return Promise.reject(error);
  }
);

export default api;
