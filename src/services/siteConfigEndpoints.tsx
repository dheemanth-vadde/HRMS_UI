// const BASE_URL = "http://192.168.20.111:8081/api/employees";
const BASE_URL = "https://bobjava.sentrifugo.com:8443/hrms-employees-app/api/employees";

export const SITE_CONFIG_ENDPOINTS = {
  GET_SITE_CONFIG_BY_BU_ID : (id: string) => `${BASE_URL}/site-configuration-master/${id}`,
  PUT_SITE_CONFIG_BY_BU_ID : (id: string) => `${BASE_URL}/site-configuration-master/${id}`,
};

export default SITE_CONFIG_ENDPOINTS;