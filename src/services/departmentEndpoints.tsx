const BASE_URL = "http://192.168.20.111:8081/api/employees";

export const DEPARTMENT_ENDPOINTS = {
  GET_DEPARTMENTS: `${BASE_URL}/departments`,
  POST_DEPARTMENT: `${BASE_URL}/departments`,
  PUT_DEPARTMENT: (id: string) => `${BASE_URL}/departments/${id}`,
DELETE_DEPARTMENT: (id: number) => `${BASE_URL}/departments/${id}`,
 
  // Add more department-related endpoints here
};

export default DEPARTMENT_ENDPOINTS;