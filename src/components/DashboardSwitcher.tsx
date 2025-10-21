// src/components/DashboardSwitcher.tsx
import React, { Suspense } from "react";
import type { FC } from "react";
import { staticRolePermissions } from "../config/staticPermissions";

/**
 * Lazy-load dashboards directly to avoid circular imports with lazyImportMap.
 * Adjust import paths if your files are in different folders.
 */
const SuperAdminDashboard = React.lazy(() => import("./superadmin/SuperAdminDashboard"));
const EmployeeDashboard = React.lazy(() => import("./employee/EmployeeDashboard"));
const HRDashboard = React.lazy(() => import("./hr/HRDashboard"));
const ManagerDashboard = React.lazy(() => import("./manager/ManagerDashboard"));

const Loading = () => <div className="p-6">Loading dashboard...</div>;

const DashboardSwitcher: FC = () => {
  // derive roleName from static permissions for now
  // Later you can read from Redux / Auth context instead
  const roleName: string =
    (staticRolePermissions && staticRolePermissions.roleName) || "super admin";

  // Normalize role string to choose target
  const role = roleName.toLowerCase().trim();

  let DashboardComponent: React.LazyExoticComponent<React.ComponentType<any>>;

  if (role === "super admin" || role === "superadmin") {
    DashboardComponent = SuperAdminDashboard;
  } else if (role === "hr" || role === "hr admin") {
    DashboardComponent = HRDashboard;
  } else if (role === "manager") {
    DashboardComponent = ManagerDashboard;
  } else if (role === "employee") {
    DashboardComponent = EmployeeDashboard;
  } else {
    // fallback: superadmin (safe default)
    DashboardComponent = SuperAdminDashboard;
  }

  return (
    <Suspense fallback={<Loading />}>
      <DashboardComponent />
    </Suspense>
  );
};

export default DashboardSwitcher;
