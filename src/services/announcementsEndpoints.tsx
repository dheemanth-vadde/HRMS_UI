const BASE_URL = "https://bobjava.sentrifugo.com:8443/hrms-employees-app/api/employees";

export const ANNOUNCEMENTS_ENDPOINTS = {
  GET_ANNOUNCEMENTS: `${BASE_URL}/announcements`,
  POST_ANNOUNCEMENTS: `${BASE_URL}/announcements`,
PUT_ANNOUNCEMENTS: (id: string) => `${BASE_URL}/announcements/${id}`,
  DELETE_ANNOUNCEMENTS: (id: number) => `${BASE_URL}/announcements/${id}`,


  // Add more department-related endpoints here
};

export default ANNOUNCEMENTS_ENDPOINTS;