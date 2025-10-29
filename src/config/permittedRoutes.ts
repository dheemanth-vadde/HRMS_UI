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

  if (!rolePermissions || Object.keys(rolePermissions).length === 0) {
    return [];
  }

  const normalizedScreens = normalizePermissions(rolePermissions);

  const normalizedRolePermissions = {
    RoleId: 0,
    roleName: "dynamic",
    screens: normalizedScreens,
  };

  const allowed = buildAllowedSetFromStatic(normalizedRolePermissions);
  const permittedRoutes = filterRoutesByAllowedKeys(allRoutes, allowed);

  return permittedRoutes;
}
