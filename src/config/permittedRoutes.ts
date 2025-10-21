// src/config/permittedRoutes.ts
import { routes as allRoutes, type AppRoute } from "./routes";
import { staticRolePermissions } from "./staticPermissions";
import { buildAllowedSetFromStatic, filterRoutesByAllowedKeys } from "../utils/permissionRouteFilter";

/**
 * Compute allowed set from staticRolePermissions and export filtered routes.
 * If you later replace staticRolePermissions with dynamic data (from Redux / API),
 * you can re-export or compute routes at runtime in a provider instead.
 */
const allowed = buildAllowedSetFromStatic(staticRolePermissions);
export const routes: AppRoute[] = filterRoutesByAllowedKeys(allRoutes, allowed);
