//const BASE_URL = "http://192.168.20.111:8081/api/employees";
const BASE_URL = "https://bobjava.sentrifugo.com:8443/hrms-auth-app/api";


export const PASSWORD_ENDPOINTS = {
  POST_EMAIL: `${BASE_URL}/register/forgot-password`,
  POST_RESET: `${BASE_URL}/auth/changepassword`,
  // Add more department-related endpoints here
};

export default PASSWORD_ENDPOINTS;