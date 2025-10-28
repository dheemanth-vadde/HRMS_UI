 const BASE_URL = "https://bobjava.sentrifugo.com:8443/hrms-employees-app/api/employees";
//const BASE_URL = "http://192.168.20.111:8081/api/employees";

 const AUTH_URL = "https://bobjava.sentrifugo.com:8443/hrms-auth-app/api";
// const AUTH_URL = "http://192.168.20.111:8083/api";
// const AUTH_URL = "http://192.168.20.115:8083/api";

export const EMPLOYEE_ENDPOINTS = {
  GET_EMPLOYEES: `${BASE_URL}/users`,
  GET_EMPLOYEE_BY_ID: (id: any) => `${BASE_URL}/users/${id}`,
  POST_EMPLOYEE: `${AUTH_URL}/register`,
  UPDATE_EMPLOYEE: (id: any) => `${BASE_URL}/users/${id}`,
  DELETE_EMPLOYEE: (id: any) => `${BASE_URL}/users/${id}`,
  BULK_UPLOAD_EMPLOYEES: `${AUTH_URL}/register/bulkUpload`, // FILE UPLOAD
  EXCEL_TEMPLATE_DOWNLOAD: `${AUTH_URL}/excel-templates/download`,
  // Add more employee-related endpoints here
};

export default EMPLOYEE_ENDPOINTS;