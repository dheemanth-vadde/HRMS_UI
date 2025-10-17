const BASE_URL = "http://192.168.20.111:8081/api/employees";

export const EMPLOYEE_ENDPOINTS = {
  GET_EMPLOYEES: `${BASE_URL}/users`,
  GET_EMPLOYEE_BY_ID: (id: any) => `${BASE_URL}/users/${id}`,
  POST_EMPLOYEE: `${BASE_URL}/users`,
  UPDATE_EMPLOYEE: (id: any) => `${BASE_URL}/users/${id}`,
  DELETE_EMPLOYEE: (id: any) => `${BASE_URL}/users/${id}`,
  BULK_UPLOAD_EMPLOYEES: `${BASE_URL}/users/bulk`,
  // Add more employee-related endpoints here
};

export default EMPLOYEE_ENDPOINTS;