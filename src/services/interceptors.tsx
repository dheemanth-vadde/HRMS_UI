import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://bobjava.sentrifugo.com:8443/hrms-employees-app/api/employees", // Replace with your actual base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const isFormData = config.data instanceof FormData;
    if (["post", "put", "patch"].includes(config.method || "") && !isFormData) {
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