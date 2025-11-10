// hooks/usePermissions.ts
import { useAppSelector } from '../store/hooks';

export const usePermissions = () => {
  const rolePermissions = useAppSelector(
    (state) => state.auth?.rolePermissions || {}
  );

  const hasPermission = (path: string, action: string): boolean => {
    if (!rolePermissions || typeof rolePermissions !== 'object') return false;
    const permission = rolePermissions[path];
    // console.log("permission",action, permission[action])
    if (!permission) return false;
    return  permission[action];
  };

  return { hasPermission };
};