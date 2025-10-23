const BASE_URL = "https://bobjava.sentrifugo.com:8443/hrms-employees-app/api/employees";

export const BUSSINESSUNIT_ENDPOINTS = {
  GET_BUSSINESSUNIT: `${BASE_URL}/business-units`,
  POST_BUSSINESSUNIT: `${BASE_URL}/business-units`,
PUT_BUSSINESSUNIT: (id: string) => `${BASE_URL}/business-units/${id}`,
  DELETE_BUSSINESSUNIT: (id: number) => `${BASE_URL}/business-units/${id}`,
  
 
  // Add more department-related endpoints here
};

export default BUSSINESSUNIT_ENDPOINTS;