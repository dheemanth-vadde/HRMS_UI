const BASE_URL = "https://bobjava.sentrifugo.com:8443/hrms-employees-app/api/employees";

export const ORGANIZATION_ENDPOINTS = {
  GET_ORGANIZATION: `${BASE_URL}/organizations`,
  POST_ORGANIZATION: `${BASE_URL}/organizations`,
  PUT_ORGANIZATION: (id: string) => `${BASE_URL}/organizations/${id}`,
  DELETE_ORGANIZATION: (id: number) => `${BASE_URL}/organizations/${id}`,
  
  // Add more department-related endpoints here
};

export default ORGANIZATION_ENDPOINTS;