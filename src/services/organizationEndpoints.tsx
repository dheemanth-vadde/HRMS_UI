const BASE_URL = "http://192.168.20.111:8081/api/employees";

export const ORGANIZATION_ENDPOINTS = {
  GET_ORGANIZATION: `${BASE_URL}/organizations`,
  POST_ORGANIZATION: `${BASE_URL}/organizations`,
  DELETE_ORGANIZATION: (id: number) => `${BASE_URL}/organizations/${id}`,
  
 
  // Add more department-related endpoints here
};

export default ORGANIZATION_ENDPOINTS;