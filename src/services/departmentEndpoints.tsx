const BASE_URL = "https://bobjava.sentrifugo.com:8443/hrms-master-app/api/v1/master";
// const BASE_URL = "http://192.168.20.111:8081/api/v1/master";

export const DEPARTMENT_ENDPOINTS = {
  GET_DEPARTMENTS: `${BASE_URL}/departments`,
  POST_DEPARTMENT: `${BASE_URL}/departments`,
  PUT_DEPARTMENT: (id: string) => `${BASE_URL}/departments/${id}`,
  DELETE_DEPARTMENT: (id: number) => `${BASE_URL}/departments/${id}`,
 GET_DEPARTMENTS_BY_UNIT:(id: string) => `${BASE_URL}/departments/unit/${id}`,
  // Add more department-related endpoints here
};

export default DEPARTMENT_ENDPOINTS;