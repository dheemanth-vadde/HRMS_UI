// src/config/permittedRoutes.ts
import { useSelector } from "react-redux";
import { selectRolePermissions } from "../store/authSlice";
import { normalizePermissions } from "../utils/permissionNormalizer";
import { buildAllowedSetFromStatic, filterRoutesByAllowedKeys } from "../utils/permissionRouteFilter";
import { routes as allRoutes } from "../config/routes";

/**
 * Dynamically build permitted routes based on logged-in user's permissions
 */
export function usePermittedRoutes() {
  const rolePermissions = useSelector(selectRolePermissions);
console.log(  "rolePermissions",rolePermissions)
  if (!rolePermissions || Object.keys(rolePermissions).length === 0) {
    return [];
  }

  const normalizedScreens = normalizePermissions(rolePermissions);
  console.log( "normalizedScreens", normalizedScreens)

  const normalizedRolePermissions = {
    RoleId: 0,
    roleName: "dynamic",
    screens: normalizedScreens,
  };

  const allowed = buildAllowedSetFromStatic(normalizedRolePermissions);
  console.log("allowed",allowed)
  console.log("allRoutes",allRoutes)
  const permittedRoutes = filterRoutesByAllowedKeys(allRoutes, allowed);

  console.log("permittedroute",permittedRoutes)

  return permittedRoutes;
}
