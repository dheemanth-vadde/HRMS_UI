import React from "react";

// Lazy import map for all components
export const lazyImportMap: Record<string, React.LazyExoticComponent<any>> = {
  // Dashboard components
  "superadmin/SuperAdminDashboard": React.lazy(() => import("../components/superadmin/SuperAdminDashboard").then(m => ({ default: m.SuperAdminDashboard }))),
  
  // Employee modules
  "employee/AttendanceModule": React.lazy(() => import("../components/employee/AttendanceModule").then(m => ({ default: m.AttendanceModule }))),
  "employee/LeaveModule": React.lazy(() => import("../components/employee/LeaveModule").then(m => ({ default: m.LeaveModule }))),
  "employee/PayrollModule": React.lazy(() => import("../components/employee/PayrollModule").then(m => ({ default: m.PayrollModule }))),
  "employee/PerformanceModule": React.lazy(() => import("../components/employee/PerformanceModule").then(m => ({ default: m.PerformanceModule }))),
  "employee/ProfileModule": React.lazy(() => import("../components/employee/ProfileModule").then(m => ({ default: m.ProfileModule }))),
  "employee/PoliciesModule": React.lazy(() => import("../components/employee/PoliciesModule").then(m => ({ default: m.PoliciesModule }))),
  "employee/grievance": React.lazy(() => import("../components/employee/GrievanceModule").then(m => ({ default: m.GrievanceModule }))),
  "employee/exit": React.lazy(() => import("../components/employee/ExitModule").then(m => ({ default: m.ExitModule }))),
  "employee/trips": React.lazy(() => import("../components/employee/TripsModule").then(m => ({ default: m.TripsModule }))),
  "employee/advances": React.lazy(() => import("../components/employee/AdvancesModule").then(m => ({ default: m.AdvancesModule }))),
  "employee/receipts": React.lazy(() => import("../components/employee/ReceiptsModule").then(m => ({ default: m.ReceiptsModule }))),
  "employee/expenses": React.lazy(() => import("../components/employee/MyEmployeeExpenses").then(m => ({ default: m.MyEmployeeExpenses }))),

  // HR modules
 
  "hr/recruitment": React.lazy(() => import("../components/hr/RecruitmentModule").then(m => ({ default: m.RecruitmentModule }))),
  "hr/reports": React.lazy(() => import("../components/hr/ReportsModule").then(m => ({ default: m.ReportsModule }))),

  // Manager modules
  "manager/attendance": React.lazy(() => import("../components/manager/TeamAttendance").then(m => ({ default: m.TeamAttendance }))),
  "manager/leave": React.lazy(() => import("../components/manager/LeaveApprovals").then(m => ({ default: m.LeaveApprovals }))),
  "manager/performance": React.lazy(() => import("../components/manager/PerformanceManagement").then(m => ({ default: m.PerformanceManagement }))),
  "manager/recruitment": React.lazy(() => import("../components/manager/RecruitmentModule").then(m => ({ default: m.RecruitmentModule }))),

  // SuperAdmin modules
  "superadmin/organization-info": React.lazy(() => import("../components/superadmin/OrganizationInfoModule").then(m => ({ default: m.OrganizationInfoModule }))),
  "superadmin/business-units": React.lazy(() => import("../components/superadmin/BusinessUnitsModule").then(m => ({ default: m.BusinessUnitsModule }))),
  "superadmin/departments": React.lazy(() => import("../components/superadmin/DepartmentsModule").then(m => ({ default: m.DepartmentsModule }))),
  "superadmin/announcements": React.lazy(() => import("../components/superadmin/AnnouncementsModule").then(m => ({ default: m.AnnouncementsModule }))),
  "superadmin/access": React.lazy(() => import("../components/superadmin/AccessControlModule").then(m => ({ default: m.AccessControlModule }))),
  "superadmin/roles": React.lazy(() => import("../components/superadmin/AccessControlModule").then(m => ({ default: m.AccessControlModule }))),

  // Reacruitment Modules
  "recruitment/job-postings": React.lazy(() => import("../components/recruitment/pages/JobPosting")),
  "recruitment/candidate-shortlist": React.lazy(() => import("../components/recruitment/components/CandidateCard")),
  "recruitment/interviews": React.lazy(() => import("../components/recruitment/pages/Calendar")),
  "recruitment/bulk-upload": React.lazy(() => import("../components/recruitment/pages/BulkUploadBatch")),
  
  // "superadmin/users": React.lazy(() => import("../components/superadmin/UserManagementModule").then(m => ({ default: m.UserManagementModule }))),
  "superadmin/permissions": React.lazy(() => import("../components/superadmin/PermissionsManagementModule").then(m => ({ default: m.PermissionsManagementModule }))),
  "superadmin/employee-info": React.lazy(() => import("../components/superadmin/EmployeeInfoModule").then(m => ({ default: m.EmployeeInfoModule }))),
  "superadmin/employee-details": React.lazy(() => import("../components/superadmin/EmployeeDetailsView").then(m => ({ default: m.EmployeeDetailsView }))),
  "superadmin/settings": React.lazy(() => import("../components/superadmin/SettingsModule").then(m => ({ default: m.SettingsModule }))),
  "superadmin/site-config": React.lazy(() => import("../components/superadmin/SiteConfigurationModule").then(m => ({ default: m.SiteConfigurationModule })))
};

