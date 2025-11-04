const BASE_URL = "https://bobjava.sentrifugo.com:8443/hrms-master-app/api";
// const BASE_URL = "http://192.168.20.111:8081/api";

export const DEPARTMENT_ENDPOINTS = {
  GET_DEPARTMENTS: `${BASE_URL}/v1/master/departments`,
  POST_DEPARTMENT: `${BASE_URL}/v1/master/departments`,
  PUT_DEPARTMENT: (id: string) => `${BASE_URL}/v1/master/departments/${id}`,
  DELETE_DEPARTMENT: (id: number) => `${BASE_URL}/v1/master/departments/${id}`,
 
  // Add more department-related endpoints here
};

export default DEPARTMENT_ENDPOINTS;