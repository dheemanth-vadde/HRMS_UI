/**
 * Normalizes backend permission payload into a "screens" object
 * compatible with your static permission format.
 */
export function normalizePermissions(apiPermissions: Record<string, any>) {
  const normalized: Record<string, any> = {};

  if (!apiPermissions) return normalized;

  Object.entries(apiPermissions).forEach(([path, perms]) => {
    // Skip non-object permissions (like "menuname")
    if (typeof perms !== 'object' || perms === null) {
      return;
    }
    
    // Convert path to match static permission format
    // Example: "/superadmin/organization" -> "superadmin:organization"
    const key = path
      .replace(/^\//, '')  // Remove leading slash
      .replace(/\//g, ':'); // Replace slashes with colons

    if (key) {
      normalized[key] = perms;
    }
  });

  return normalized;
}