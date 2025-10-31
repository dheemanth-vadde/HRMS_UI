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
  User,
} from "lucide-react";

export type AppRoute = {
  path: string;
  name: string;
  elementPath: string;
  icon?: LucideIcon;
  children?: Omit<AppRoute, 'children'>[];
  hidden?: boolean;
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
        name: "Roles",
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

  {
    path: "/recruitment",
    name: "Recruitment",
    icon: Building2,
    elementPath: "recruitment/job-postings",
    children: [
      {
        path: "/recruitment/job-postings",
        name: "Job Postings",
        elementPath: "recruitment/job-postings",
        icon: Briefcase
      },
      {
        path: "/recruitment/candidate-shortlist",
        name: "Candidate Shortlist",
        elementPath: "recruitment/candidate-shortlist",
        icon: User
      },
      {
        path: "/recruitment/interviews",
        name: "Interviews",
        elementPath: "recruitment/interviews",
        icon: Calendar
      },
      {
        path: "/recruitment/bulk-upload",
        name: "Bulk Upload",
        elementPath: "recruitment/bulk-upload",
        icon: Users
      },
      {
        path: "/recruitment/job-creation",
        name: "Job Creation",
        elementPath: "recruitment/job-creation",
        icon: Briefcase,
        hidden: true
      },
      {
        path: "/recruitment/candidate-assign",
        name: "Candidate Assign",
        elementPath: "recruitment/candidate-assign",
        icon: User,
        hidden: true
      }
    ]
  },

  {
    path: "/recruitment/master",
    name: "Master",
    icon: Building2,
    elementPath: "recruitment/master",
    children: [
      {
        path: "/recruitment/master/skill",
        name: "Skill",
        elementPath: "recruitment/master/skill",
        icon: Briefcase
      },
      
      {
        path: "/recruitment/master/location",
        name: "Location",
        elementPath: "recruitment/master/location",
        icon: Calendar
      },
     
      {
        path: "/recruitment/master/job-grade",
        name: "Job Grade",
        elementPath: "recruitment/master/job-grade",
        icon: Users
      },
    
      {
        path: "/recruitment/master/position",
        name: "Position",
        elementPath: "recruitment/master/position",
        icon: Briefcase
      },
      
      {
        path: "/recruitment/master/department",
        name: "Department",
        elementPath: "recruitment/master/department",
        icon: Briefcase
      },
      {
        path: "/recruitment/master/document",
        name: "Document",
        elementPath: "recruitment/master/document",
        icon: Briefcase
      },
      {
        path: "/recruitment/master/template",
        name: "OfferTemplate",
        elementPath: "recruitment/master/template",
        icon: Briefcase
      },
      {
        path: "/recruitment/master/interview-panel",
        name: "Interview Panel",
        elementPath: "recruitment/master/interview-panel",
        icon: Briefcase
      },
      
      
      
      {
        path: "/recruitment/job-creation",
        name: "Job Creation",
        elementPath: "recruitment/job-creation",
        icon: Briefcase,
        hidden: true
      },
      {
        path: "/recruitment/candidate-assign",
        name: "Candidate Assign",
        elementPath: "recruitment/candidate-assign",
        icon: User,
        hidden: true
      },
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
  },
  {
    path: "/change-password",
    name: "Change Password",
    elementPath: "/change-password",
    icon: Settings
  }

];

