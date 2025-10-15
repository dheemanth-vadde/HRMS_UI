import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Clock,
  Calendar,
  TrendingUp,
  Building2,
  Users,
  Briefcase,
  DollarSign,
  Settings,
  UserCircle,
  Megaphone,
  Shield,
  Info,
  Layers,
} from "lucide-react";

export type AppRoute = {
  path: string;
  name: string;
  elementPath: string;
  icon?: LucideIcon;
  children?: Omit<AppRoute, 'children'>[];
};

// Main navigation routes
export const routes: AppRoute[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    elementPath: "Dashboard",
    icon: LayoutDashboard
  },
  {
    path: "/organization/info",
    name: "Organization Info",
    elementPath: "superadmin/OrganizationInfoModule",
    icon: Building2
  },
  {
    path: "/organization/units",
    name: "Business Units",
    elementPath: "superadmin/BusinessUnitsModule",
    icon: Layers
  },
  {
    path: "/organization/departments",
    name: "Departments",
    elementPath: "superadmin/DepartmentsModule",
    icon: Briefcase
  },
  {
    path: "/organization/announcements",
    name: "Announcements",
    elementPath: "superadmin/AnnouncementsModule",
    icon: Megaphone
  },
   {
    path: "/employeeDetails",
    name: "Employee Details",
    elementPath: "superadmin/EmployeeDetailsView",
    icon: Megaphone
  },
  {
    path: "/employees",
    name: "Employees",
    elementPath: "superadmin/EmployeeInfoModule",
    icon: Users
  },
  {
    path: "/attendance",
    name: "Attendance",
    elementPath: "employee/AttendanceModule",
    icon: Clock
  },
  {
    path: "/leave",
    name: "Leave",
    elementPath: "employee/LeaveModule",
    icon: Calendar
  },
  {
    path: "/payroll",
    name: "Payroll",
    elementPath: "employee/PayrollModule",
    icon: DollarSign
  },
  {
    path: "/performance",
    name: "Performance",
    elementPath: "employee/PerformanceModule",
    icon: TrendingUp
  },
  {
    path: "/settings/profile",
    name: "Profile Settings",
    elementPath: "employee/ProfileModule",
    icon: UserCircle
  },
  {
    path: "/settings/access-control",
    name: "Access Control",
    elementPath: "superadmin/AccessControlModule",
    icon: Shield
  }
];

