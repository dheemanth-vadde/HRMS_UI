// src/config/permittedRoutes.ts
import { useSelector } from "react-redux";
import { selectRolePermissions } from "../store/authSlice";
import { normalizePermissions } from "../utils/permissionNormalizer";
import {
  buildAllowedSetFromStatic,
  filterRoutesByAllowedKeys,
  pathToPermissionKey
} from "../utils/permissionRouteFilter";
import { routes as allRoutes } from "../config/routes";

/**
 * Dynamically build permitted routes based on logged-in user's permissions
 */
export function usePermittedRoutes() {
  const rolePermissions = useSelector(selectRolePermissions);
  console.log("rolePermissions", rolePermissions);

  // 🧩 Static routes that should always be accessible for all users
  const staticAlwaysAllowedPaths = [
    "/changepassword",
    "/forgotpassword",
   
  ];

  // 🧩 If there are no role permissions yet, return only static routes
  if (!rolePermissions || Object.keys(rolePermissions).length === 0) {
    const staticRoutes = allRoutes.filter((r) =>
      staticAlwaysAllowedPaths.includes(r.path)
    );
    return staticRoutes;
  }

  // 🧩 Normalize permissions (your existing logic)
  const normalizedScreens = normalizePermissions(rolePermissions);
  console.log("normalizedScreens", normalizedScreens);

  const normalizedRolePermissions = {
    RoleId: 0,
    roleName: "dynamic",
    screens: normalizedScreens,
  };

  const allowed = buildAllowedSetFromStatic(normalizedRolePermissions);

  // 🧩 Add static routes to the allowed keys (so they won’t be filtered out)
  staticAlwaysAllowedPaths.forEach((path) => {
    const key = pathToPermissionKey(path); // ✅ reuse same key normalization
    allowed.add(key);
  });

  console.log("allowed (with static paths)", allowed);
  console.log("allRoutes", allRoutes);

  const permittedRoutes = filterRoutesByAllowedKeys(allRoutes, allowed);
  console.log("permittedRoutes (filtered)", permittedRoutes);

  // 🧩 Ensure static routes are always present, even if not part of allowed keys
  const staticRoutes = allRoutes.filter((r) =>
    staticAlwaysAllowedPaths.includes(r.path)
  );

  // ✅ Merge static routes and remove duplicates
  const allPermittedRoutes = [
    ...permittedRoutes,
    ...staticRoutes.filter(
      (sr) => !permittedRoutes.some((pr) => pr.path === sr.path)
    ),
  ];

  console.log("✅ Final permitted routes (with static)", allPermittedRoutes);
  return allPermittedRoutes;
}
