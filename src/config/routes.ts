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
  elementPath: "superadmin/SuperAdminDashboard",
  icon: LayoutDashboard
},
  // SuperAdmin Section - Organization (Nested)
  {
    path: "/superadmin/organization",
    name: "Organization",
    icon: Building2,
    elementPath: "superadmin/organization-info",
    children: [
      {
        path: "/superadmin/organization/info",
        name: "Organization Info",
        elementPath: "superadmin/organization-info",
        icon: Info
      },
      {
        path: "/superadmin/organization/units",
        name: "Business Units",
        elementPath: "superadmin/business-units",
        icon: Layers
      },
      {
        path: "/superadmin/organization/departments",
        name: "Departments",
        elementPath: "superadmin/departments",
        icon: Briefcase
      },
      {
        path: "/superadmin/organization/announcements",
        name: "Announcements",
        elementPath: "superadmin/announcements",
        icon: Megaphone
      }
    ]
  },
  // SuperAdmin Section - Access Management (Nested)
  {
    path: "/superadmin/access-control",
    name: "Access Management",
    icon: Shield,
    elementPath: "superadmin/access",
    children: [
      {
        path: "/superadmin/access-control/roles",
        name: "Roles & Privileges",
        elementPath: "superadmin/roles",
        icon: Shield
      },
      // {
      //   path: "/superadmin/access-control/users",
      //   name: "User Management",
      //   elementPath: "superadmin/users",
      //   icon: Users
      // },
      {
        path: "/superadmin/access-control/permissions",
        name: "Permissions",
        elementPath: "superadmin/permissions",
        icon: Shield
      }
    ]
  },
  // Flat menu items
  {
    path: "/employees",
    name: "Employees",
    elementPath: "superadmin/employee-info",
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
    path: "/profile",
    name: "Profile",
    elementPath: "employee/ProfileModule",
    icon: UserCircle
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
    path: "/policies",
    name: "Policies",
    elementPath: "employee/PoliciesModule",
    icon: Info
  },
  {
    path: "/grievance",
    name: "Grievance",
    elementPath: "employee/grievance",
    icon: Megaphone
  },
  {
    path: "/exit",
    name: "Exit",
    elementPath: "employee/exit",
    icon: Briefcase
  },
  {
    path: "/trips",
    name: "Trips",
    elementPath: "employee/trips",
    icon: TrendingUp
  },
  {
    path: "/advances",
    name: "Advances",
    elementPath: "employee/advances",
    icon: DollarSign
  },
  {
    path: "/receipts",
    name: "Receipts",
    elementPath: "employee/receipts",
    icon: DollarSign
  },
  {
    path: "/expenses",
    name: "Expenses",
    elementPath: "employee/expenses",
    icon: DollarSign
  },
  {
    path: "/hr/recruitment",
    name: "HR Recruitment",
    elementPath: "hr/recruitment",
    icon: Users
  },
  {
    path: "/hr/reports",
    name: "HR Reports",
    elementPath: "hr/reports",
    icon: TrendingUp
  },
  {
    path: "/manager/attendance",
    name: "Team Attendance",
    elementPath: "manager/attendance",
    icon: Clock
  },
  {
    path: "/manager/leave",
    name: "Leave Approvals",
    elementPath: "manager/leave",
    icon: Calendar
  },
  {
    path: "/manager/performance",
    name: "Performance Management",
    elementPath: "manager/performance",
    icon: TrendingUp
  },
  {
    path: "/manager/recruitment",
    name: "Manager Recruitment",
    elementPath: "manager/recruitment",
    icon: Users
  },

  {
    path: "/settings/site",
    name: "Site Configuration",
    elementPath: "superadmin/site-config",
    icon: Settings
  }
];

