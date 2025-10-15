import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://your-api-base-url.com", // Replace with your actual base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token or other headers here if needed
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    // Example: redirect to login on 401
    // if (error.response?.status === 401) { ... }
    return Promise.reject(error);
  }
);

export default api;