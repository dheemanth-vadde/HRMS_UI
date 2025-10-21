const BASE_URL = "http://192.168.20.111:8081/api/employees";

export const ROLES_ENDPOINTS = {
  GET_ROLES: `${BASE_URL}/roles`,
  POST_ROLE: `${BASE_URL}/roles`,
  UPDATE_ROLE:(id:any)=>`${BASE_URL}/roles/${id}`,
  DELETE_ROLE:(id:any)=> `${BASE_URL}/roles/${id}`
  // Add more roles-related endpoints here
};

export default ROLES_ENDPOINTS;