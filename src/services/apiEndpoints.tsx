// Centralized API endpoints
const BASE_URL = "https://your-api-base-url.com"; // Replace with your actual base URL

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  USER_INFO: `${BASE_URL}/user/info`,
  ROLE_ACCESS: `${BASE_URL}/user/role-access`,
  // Add more endpoints as needed
};

export default API_ENDPOINTS;