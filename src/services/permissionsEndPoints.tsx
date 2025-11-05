const BASE_URL = "https://bobjava.sentrifugo.com:8443/hrms-employees-app/api/employees";
// const BASE_URLs = "https://bobjava.sentrifugo.com:8443/hrms-employees-app/api/employees";

export const PERMISSIONS_ENDPOINTS = {
    GET_GROUPS: `${BASE_URL}/groups`, 
    GET_ROLES:(groupid: string)=> `${BASE_URL}/roles/group/${groupid}`, 
    GET_PRIVILEGES:(roleId: string)=>`${BASE_URL}/privileges/role/${roleId}`, 
    GET_PERMISSIONS: (roleId: string,groupId: string) =>`${BASE_URL}/privileges/role/${roleId}/group/${groupId}`,
    POST_PERMISSIONS: `${BASE_URL}/privileges`,
    PUT_PERMISSIONS: (roleId: string,groupId: string) => `${BASE_URL}/privileges/role/${roleId}/group/${groupId}`,
    DELETE_PERMISSIONS: (id: number) => `${BASE_URL}/privileges/${id}`,
  GET_MENUS: `${BASE_URL}/menus`,
 
  // Add more department-related endpoints here
};

export default PERMISSIONS_ENDPOINTS;