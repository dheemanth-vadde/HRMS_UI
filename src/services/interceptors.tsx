import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://192.168.20.111:8081/api/", // Replace with your actual base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (["post", "put", "patch"].includes(config.method || "")) {
      config.headers["Content-Type"] = "application/json";
    }
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