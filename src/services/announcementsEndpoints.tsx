const BASE_URL = "http://192.168.20.111:8081/api/employees";

export const ANNOUNCEMENTS_ENDPOINTS = {
  GET_BUSSINESSUNIT: `${BASE_URL}/announcements`,
  POST_BUSSINESSUNIT: `${BASE_URL}/announcements`,
  DELETE_BUSSINESSUNIT: (id: number) => `${BASE_URL}/announcements/${id}`,
  
 
  // Add more department-related endpoints here
};

export default ANNOUNCEMENTS_ENDPOINTS;