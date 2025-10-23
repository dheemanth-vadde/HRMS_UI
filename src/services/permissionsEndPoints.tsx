const BASE_URL = "https://bobjava.sentrifugo.com:8443/hrms-employees-app/api";
const BASE_URLs = "http://192.168.20.111:8081/api/employees";

export const PERMISSIONS_ENDPOINTS = {
    GET_GROUPS: `${BASE_URLs}/groups`, 
    GET_ROLES:(groupid: string)=> `${BASE_URLs}/roles/group/${groupid}`, 

    GET_PERMISSIONS: (roleId: string,groupId: string) =>`${BASE_URL}/privileges/role/${roleId}/group/${groupId}`,
    POST_PERMISSIONS: `${BASE_URL}/privileges`,
    PUT_PERMISSIONS: (roleId: string,groupId: string) => `${BASE_URL}/privileges/role/${roleId}/group/${groupId}`,
    DELETE_PERMISSIONS: (id: number) => `${BASE_URL}/privileges/${id}`,
  GET_MENUS: `${BASE_URL}/employees/menus`,
 
  // Add more department-related endpoints here
};

export default PERMISSIONS_ENDPOINTS;