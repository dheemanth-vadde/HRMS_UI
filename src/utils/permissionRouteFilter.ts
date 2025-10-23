// src/helpers/permissionRouteFilter.ts
import type { AppRoute } from "../config/routes";
import { staticRolePermissions } from "../config/staticPermissions";

/**
 * Convert route.path to permission key used in staticPermissions.
 * Examples:
 *  "/dashboard" => "dashboard"
 *  "/superadmin/organization/info" => "superadmin:organization:info"
 */
export const pathToPermissionKey = (path: string) =>
  path.replace(/^\//, "").replace(/\//g, ":").trim() || "root";

/**
 * Build a Set of allowed keys (where view === true) from staticRolePermissions.
 */
export const buildAllowedSetFromStatic = (perms = staticRolePermissions): Set<string> => {
  const allowed = new Set<string>();
  if (!perms || !perms.screens) return allowed;
  Object.entries(perms.screens).forEach(([k, v]) => {
    // v might be typed as any if TS can't infer — assume { view: boolean }
    if ((v as any).view) allowed.add(k);
  });
  return allowed;
};

/**
 * Recursively filter routes.
 * Keep a route if:
 *  - its own key is allowed OR
 *  - it has children and at least one child survives filtering
 */
export function filterRoutesByAllowedKeys(routes: AppRoute[], allowedKeys: Set<string>): AppRoute[] {
  const walker = (rts: AppRoute[]): AppRoute[] =>
    rts
      .map((r) => {
        const key = pathToPermissionKey(r.path);
        const children = r.children ? walker(r.children as AppRoute[]) : undefined;

        const keepSelf = allowedKeys.has(key);
        const keepBecauseChild = !!(children && children.length);

        if (!keepSelf && !keepBecauseChild) return null;

        return {
          ...r,
          children: children && children.length ? children : undefined,
        } as AppRoute;
      })
      .filter(Boolean) as AppRoute[];

  return walker(routes);
}
