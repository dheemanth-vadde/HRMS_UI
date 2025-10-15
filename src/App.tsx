import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Clock,
  Calendar,
  TrendingUp,
  FileText,
  LogOut,
  Building2,
  Users,
  UserPlus,
  Briefcase,
  DollarSign,
  Settings,
  BarChart3,
  UserCircle,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Megaphone,
  Receipt,
  Shield,
  Lock,
  Info,
  Layers,
  Menu,
  Bell,
  Search,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import { SagarsoftLogo } from "./components/SagarsoftLogo";
import { LoginPage } from "./components/LoginPage";
import { cn } from "./components/ui/utils";
import { Input } from "./components/ui/input";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { EmployeeDashboard } from "./components/employee/EmployeeDashboard";
import { AttendanceModule } from "./components/employee/AttendanceModule";
import { LeaveModule } from "./components/employee/LeaveModule";
import { PerformanceModule } from "./components/employee/PerformanceModule";
import { ExitModule } from "./components/employee/ExitModule";
import { PoliciesModule } from "./components/employee/PoliciesModule";
import { PayrollModule } from "./components/employee/PayrollModule";
import { ProfileModule } from "./components/employee/ProfileModule";
import { GrievanceModule } from "./components/employee/GrievanceModule";
import { ManagerDashboard } from "./components/manager/ManagerDashboard";
import { TeamAttendance } from "./components/manager/TeamAttendance";
import { LeaveApprovals } from "./components/manager/LeaveApprovals";
import { RecruitmentModule as ManagerRecruitmentModule } from "./components/manager/RecruitmentModule";
import { PerformanceManagement } from "./components/manager/PerformanceManagement";
import { HRDashboard } from "./components/hr/HRDashboard";
import { RecruitmentModule } from "./components/hr/RecruitmentModule";
import { ReportsModule } from "./components/hr/ReportsModule";
import { EmployeeManagement } from "./components/hr/EmployeeManagement";
import { SuperAdminDashboard } from "./components/superadmin/SuperAdminDashboard";
import { OrganizationInfoModule } from "./components/superadmin/OrganizationInfoModule";
import { BusinessUnitsModule } from "./components/superadmin/BusinessUnitsModule";
import { DepartmentsModule } from "./components/superadmin/DepartmentsModule";
import { AnnouncementsModule } from "./components/superadmin/AnnouncementsModule";
import { EmployeeInfoModule } from "./components/superadmin/EmployeeInfoModule";
import { ReceiptsModule } from "./components/employee/ReceiptsModule";
import { TripsModule } from "./components/employee/TripsModule";
import { AdvancesModule } from "./components/employee/AdvancesModule";
import { MyEmployeeExpenses } from "./components/employee/MyEmployeeExpenses";
import { AccessControlModule } from "./components/superadmin/AccessControlModule";
import { PermissionsManagementModule } from "./components/superadmin/PermissionsManagementModule";
import { SiteConfigurationModule } from "./components/superadmin/SiteConfigurationModule";

type UserRole = "employee" | "manager" | "hr" | "superadmin" | null;
type ActiveModule =
  | "dashboard"
  | "attendance"
  | "my-attendance"
  | "team-attendance"
  | "leave"
  | "my-leave"
  | "team-leave"
  | "performance"
  | "access-control"
  | "permissions"
  | "site-configuration"
  | "exit"
  | "policies"
  | "payroll"
  | "profile"
  | "grievance"
  | "recruitment"
  | "master-data"
  | "reports"
  | "organization-info"
  | "business-units"
  | "departments"
  | "announcements"
  | "employee-info"
  | "receipts"
  | "trips"
  | "advances"
  | "my-expenses";

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [activeModule, setActiveModule] = useState<ActiveModule>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [organizationMenuOpen, setOrganizationMenuOpen] = useState(false);
  const [attendanceMenuOpen, setAttendanceMenuOpen] = useState(false);
  const [leaveMenuOpen, setLeaveMenuOpen] = useState(false);
  const [expensesMenuOpen, setExpensesMenuOpen] = useState(false);

  const handleLogout = () => {
    setUserRole(null);
    setActiveModule("dashboard");
  };

  if (!userRole) {
    return (
      <>
        <LoginPage onLogin={setUserRole} />
        <Toaster />
      </>
    );
  }

  const renderContent = () => {
    const isViewOnly = userRole !== "superadmin";
    
    if (userRole === "employee") {
      switch (activeModule) {
        case "attendance":
          return <AttendanceModule />;
        case "leave":
          return <LeaveModule />;
        case "performance":
          return <PerformanceModule />;
        case "exit":
          return <ExitModule />;
        case "policies":
          return <PoliciesModule />;
        case "payroll":
          return <PayrollModule />;
        case "profile":
          return <ProfileModule />;
        case "grievance":
          return <GrievanceModule />;
        case "receipts":
          return <ReceiptsModule />;
        case "trips":
          return <TripsModule />;
        case "advances":
          return <AdvancesModule />;
        case "my-expenses":
          return <MyEmployeeExpenses />;
        case "organization-info":
          return <OrganizationInfoModule viewOnly={true} />;
        case "business-units":
          return <BusinessUnitsModule viewOnly={true} />;
        case "departments":
          return <DepartmentsModule viewOnly={true} />;
        case "announcements":
          return <AnnouncementsModule viewOnly={true} />;
        case "employee-info":
          return <EmployeeInfoModule viewOnly={true} />;
        default:
          return <EmployeeDashboard />;
      }
    } else if (userRole === "manager") {
      switch (activeModule) {
        case "my-attendance":
          return <AttendanceModule />;
        case "team-attendance":
          return <TeamAttendance />;
        case "my-leave":
          return <LeaveModule />;
        case "team-leave":
          return <LeaveApprovals />;
        case "recruitment":
          return <ManagerRecruitmentModule />;
        case "performance":
          return <PerformanceManagement />;
        case "grievance":
          return <GrievanceModule />;
        case "exit":
          return <ExitModule />;
        case "receipts":
          return <ReceiptsModule />;
        case "trips":
          return <TripsModule />;
        case "advances":
          return <AdvancesModule />;
        case "my-expenses":
          return <MyEmployeeExpenses />;
        case "organization-info":
          return <OrganizationInfoModule viewOnly={true} />;
        case "business-units":
          return <BusinessUnitsModule viewOnly={true} />;
        case "departments":
          return <DepartmentsModule viewOnly={true} />;
        case "announcements":
          return <AnnouncementsModule viewOnly={true} />;
        case "employee-info":
          return <EmployeeInfoModule viewOnly={true} />;
        default:
          return <ManagerDashboard onNavigate={(module) => setActiveModule(module)} />;
      }
    } else if (userRole === "hr") {
      switch (activeModule) {
        case "master-data":
          return <EmployeeManagement />;
        case "announcements":
          return <AnnouncementsModule viewOnly={false} />;
        case "recruitment":
          return <RecruitmentModule />;
        case "reports":
          return <ReportsModule />;
        case "receipts":
          return <ReceiptsModule />;
        case "trips":
          return <TripsModule />;
        case "advances":
          return <AdvancesModule />;
        case "my-expenses":
          return <MyEmployeeExpenses />;
        case "organization-info":
          return <OrganizationInfoModule viewOnly={true} />;
        case "business-units":
          return <BusinessUnitsModule viewOnly={true} />;
        case "departments":
          return <DepartmentsModule viewOnly={true} />;
        case "employee-info":
          return <EmployeeInfoModule viewOnly={true} />;
        default:
          return <HRDashboard />;
      }
    } else if (userRole === "superadmin") {
      switch (activeModule) {
        case "organization-info":
          return <OrganizationInfoModule viewOnly={false} />;
        case "business-units":
          return <BusinessUnitsModule viewOnly={false} />;
        case "departments":
          return <DepartmentsModule viewOnly={false} />;
        case "employee-info":
          return <EmployeeInfoModule viewOnly={false} />;
        case "access-control":
          return <AccessControlModule />;
        case "permissions":
          return <PermissionsManagementModule />;
        case "site-configuration":
          return <SiteConfigurationModule />;
        default:
          return <SuperAdminDashboard />;
      }
    }
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case "employee":
        return "Employee Self Service";
      case "manager":
        return "Manager Self Service";
      case "hr":
        return "HR Admin Portal";
      case "superadmin":
        return "Super Admin Portal";
      default:
        return "";
    }
  };

  const getUserName = () => {
    switch (userRole) {
      case "employee":
        return "Sanjay Kumar";
      case "manager":
        return "Pradeep Singh";
      case "superadmin":
        return "Super Admin";
      default:
        return "Admin User";
    }
  };

  const getUserRole = () => {
    switch (userRole) {
      case "employee":
        return "Officer - Emp ID: PNB12345";
      case "manager":
        return "Senior Manager";
      case "superadmin":
        return "System Administrator";
      default:
        return "HR Administrator";
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-[#2d2d58] border-r border-white/10 transition-all duration-300 flex flex-col shadow-lg",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 border-b border-white/10 flex items-center justify-center p-0">
          {!sidebarCollapsed && (
            <div className="bg-primary w-full h-full flex items-center justify-center p-0">
              <SagarsoftLogo className="h-14 w-auto" />
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
          )}
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto py-4 px-2">
          <nav className="space-y-1 animate-fade-in">
            {/* Dashboard */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    setActiveModule("dashboard");
                    setOrganizationMenuOpen(false);
                    setAttendanceMenuOpen(false);
                    setLeaveMenuOpen(false);
                    setExpensesMenuOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-zynix relative",
                    sidebarCollapsed && "justify-center",
                    activeModule === "dashboard"
                      ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  )}
                  style={{ fontSize: '14px' }}
                >
                  <LayoutDashboard className="size-4 flex-shrink-0" />
                  {!sidebarCollapsed && <span>Dashboard</span>}
                </button>
              </TooltipTrigger>
              {sidebarCollapsed && (
                <TooltipContent side="right">
                  <p>Dashboard</p>
                </TooltipContent>
              )}
            </Tooltip>

            {/* Organization Menu */}
            {(userRole === "employee" || userRole === "manager" || userRole === "hr" || userRole === "superadmin") && (
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setOrganizationMenuOpen(!organizationMenuOpen)}
                      className={cn(
                        "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                        sidebarCollapsed && "justify-center",
                        organizationMenuOpen || ["organization-info", "business-units", "departments", "announcements"].includes(activeModule)
                          ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      )}
                      style={{ fontSize: '14px' }}
                    >
                      <div className={cn("flex items-center gap-3", sidebarCollapsed && "justify-center")}>
                        <Building2 className="size-4 flex-shrink-0" />
                        {!sidebarCollapsed && <span>Organization</span>}
                      </div>
                      {!sidebarCollapsed && (
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform",
                            organizationMenuOpen && "rotate-180"
                          )}
                        />
                      )}
                    </button>
                  </TooltipTrigger>
                  {sidebarCollapsed && (
                    <TooltipContent side="right">
                      <p>Organization</p>
                    </TooltipContent>
                  )}
                </Tooltip>
                {organizationMenuOpen && !sidebarCollapsed && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-white/20 pl-4">
                    <button
                      onClick={() => setActiveModule("organization-info")}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-zynix",
                        activeModule === "organization-info"
                          ? "text-white font-semibold bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                      style={{ fontSize: '13px' }}
                    >
                      <Info className="size-3.5 flex-shrink-0" />
                      <span>Organization Info</span>
                    </button>
                    <button
                      onClick={() => setActiveModule("business-units")}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                        activeModule === "business-units"
                          ? "text-white font-semibold bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                      style={{ fontSize: '13px' }}
                    >
                      <Layers className="size-3.5 flex-shrink-0" />
                      <span>Business Units</span>
                    </button>
                    {userRole !== "superadmin" && (
                      <button
                        onClick={() => setActiveModule("announcements")}
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                          activeModule === "announcements"
                            ? "text-white font-semibold bg-white/10"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        )}
                        style={{ fontSize: '13px' }}
                      >
                        <Megaphone className="size-3.5 flex-shrink-0" />
                        <span>Announcements</span>
                      </button>
                    )}
                    <button
                      onClick={() => setActiveModule("departments")}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                        activeModule === "departments"
                          ? "text-white font-semibold bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                      style={{ fontSize: '13px' }}
                    >
                      <Briefcase className="size-3.5 flex-shrink-0" />
                      <span>Departments</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Employee Profile (Employee only) */}
            {userRole === "employee" && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      setActiveModule("profile");
                      setOrganizationMenuOpen(false);
                      setAttendanceMenuOpen(false);
                      setLeaveMenuOpen(false);
                      setExpensesMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-zynix relative",
                      sidebarCollapsed && "justify-center",
                      activeModule === "profile"
                        ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                    )}
                    style={{ fontSize: '14px' }}
                  >
                    <UserCircle className="size-4 flex-shrink-0" />
                    {!sidebarCollapsed && <span>My Profile</span>}
                  </button>
                </TooltipTrigger>
                {sidebarCollapsed && (
                  <TooltipContent side="right">
                    <p>My Profile</p>
                  </TooltipContent>
                )}
              </Tooltip>
            )}

            {/* Employees */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    setActiveModule("employee-info");
                    setOrganizationMenuOpen(false);
                    setAttendanceMenuOpen(false);
                    setLeaveMenuOpen(false);
                    setExpensesMenuOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-zynix relative",
                    sidebarCollapsed && "justify-center",
                    activeModule === "employee-info"
                      ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  )}
                  style={{ fontSize: '14px' }}
                >
                  <Users className="size-4 flex-shrink-0" />
                  {!sidebarCollapsed && <span>Employees</span>}
                </button>
              </TooltipTrigger>
              {sidebarCollapsed && (
                <TooltipContent side="right">
                  <p>Employees</p>
                </TooltipContent>
              )}
            </Tooltip>

            {/* Super Admin specific menus */}
            {userRole === "superadmin" && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        setActiveModule("access-control");
                        setOrganizationMenuOpen(false);
                        setAttendanceMenuOpen(false);
                        setLeaveMenuOpen(false);
                        setExpensesMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-zynix relative",
                        sidebarCollapsed && "justify-center",
                        activeModule === "access-control"
                          ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      )}
                      style={{ fontSize: '14px' }}
                    >
                      <Shield className="size-4 flex-shrink-0" />
                      {!sidebarCollapsed && <span>Roles & Privileges</span>}
                    </button>
                  </TooltipTrigger>
                  {sidebarCollapsed && <TooltipContent side="right"><p>Roles & Privileges</p></TooltipContent>}
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        setActiveModule("permissions");
                        setOrganizationMenuOpen(false);
                        setAttendanceMenuOpen(false);
                        setLeaveMenuOpen(false);
                        setExpensesMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-zynix relative",
                        sidebarCollapsed && "justify-center",
                        activeModule === "permissions"
                          ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      )}
                      style={{ fontSize: '14px' }}
                    >
                      <Lock className="size-4 flex-shrink-0" />
                      {!sidebarCollapsed && <span>Permissions</span>}
                    </button>
                  </TooltipTrigger>
                  {sidebarCollapsed && <TooltipContent side="right"><p>Permissions</p></TooltipContent>}
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        setActiveModule("site-configuration");
                        setOrganizationMenuOpen(false);
                        setAttendanceMenuOpen(false);
                        setLeaveMenuOpen(false);
                        setExpensesMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-zynix relative",
                        sidebarCollapsed && "justify-center",
                        activeModule === "site-configuration"
                          ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      )}
                      style={{ fontSize: '14px' }}
                    >
                      <Settings className="size-4 flex-shrink-0" />
                      {!sidebarCollapsed && <span>Site Configuration</span>}
                    </button>
                  </TooltipTrigger>
                  {sidebarCollapsed && <TooltipContent side="right"><p>Site Configuration</p></TooltipContent>}
                </Tooltip>
              </>
            )}

            {/* Attendance */}
            {userRole === "employee" && (
              <button
                onClick={() => {
                  setActiveModule("attendance");
                  setOrganizationMenuOpen(false);
                  setAttendanceMenuOpen(false);
                  setLeaveMenuOpen(false);
                  setExpensesMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                  activeModule === "attendance"
                    ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                )}
                style={{ fontSize: '14px' }}
              >
                <Clock className="size-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Attendance</span>}
              </button>
            )}

            {/* Attendance Menu (Manager) */}
            {userRole === "manager" && (
              <div>
                <button
                  onClick={() => setAttendanceMenuOpen(!attendanceMenuOpen)}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                    attendanceMenuOpen || ["my-attendance", "team-attendance"].includes(activeModule)
                      ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  )}
                  style={{ fontSize: '14px' }}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="size-4 flex-shrink-0" />
                    {!sidebarCollapsed && <span>Attendance</span>}
                  </div>
                  {!sidebarCollapsed && (
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform",
                        attendanceMenuOpen && "rotate-180"
                      )}
                    />
                  )}
                </button>
                {attendanceMenuOpen && !sidebarCollapsed && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-white/20 pl-4">
                    <button
                      onClick={() => setActiveModule("my-attendance")}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                        activeModule === "my-attendance"
                          ? "text-white font-semibold bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                      style={{ fontSize: '13px' }}
                    >
                      My Attendance
                    </button>
                    <button
                      onClick={() => setActiveModule("team-attendance")}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                        activeModule === "team-attendance"
                          ? "text-white font-semibold bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                      style={{ fontSize: '13px' }}
                    >
                      Team Attendance
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Leave */}
            {userRole === "employee" && (
              <button
                onClick={() => {
                  setActiveModule("leave");
                  setOrganizationMenuOpen(false);
                  setAttendanceMenuOpen(false);
                  setLeaveMenuOpen(false);
                  setExpensesMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                  activeModule === "leave"
                    ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                )}
                style={{ fontSize: '14px' }}
              >
                <Calendar className="size-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Leave Management</span>}
              </button>
            )}

            {/* Leave Menu (Manager) */}
            {userRole === "manager" && (
              <div>
                <button
                  onClick={() => setLeaveMenuOpen(!leaveMenuOpen)}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                    leaveMenuOpen || ["my-leave", "team-leave"].includes(activeModule)
                      ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  )}
                  style={{ fontSize: '14px' }}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="size-4 flex-shrink-0" />
                    {!sidebarCollapsed && <span>Leaves</span>}
                  </div>
                  {!sidebarCollapsed && (
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform",
                        leaveMenuOpen && "rotate-180"
                      )}
                    />
                  )}
                </button>
                {leaveMenuOpen && !sidebarCollapsed && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-white/20 pl-4">
                    <button
                      onClick={() => setActiveModule("my-leave")}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                        activeModule === "my-leave"
                          ? "text-white font-semibold bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                      style={{ fontSize: '13px' }}
                    >
                      My Leaves
                    </button>
                    <button
                      onClick={() => setActiveModule("team-leave")}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                        activeModule === "team-leave"
                          ? "text-white font-semibold bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                      style={{ fontSize: '13px' }}
                    >
                      Team Leaves
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Performance */}
            {(userRole === "employee" || userRole === "manager" || userRole === "hr") && (
              <button
                onClick={() => {
                  setActiveModule("performance");
                  setOrganizationMenuOpen(false);
                  setAttendanceMenuOpen(false);
                  setLeaveMenuOpen(false);
                  setExpensesMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                  activeModule === "performance"
                    ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                )}
                style={{ fontSize: '14px' }}
              >
                <TrendingUp className="size-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Performance</span>}
              </button>
            )}

            {/* Payroll */}
            {(userRole === "employee" || userRole === "hr") && (
              <button
                onClick={() => {
                  setActiveModule("payroll");
                  setOrganizationMenuOpen(false);
                  setAttendanceMenuOpen(false);
                  setLeaveMenuOpen(false);
                  setExpensesMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                  activeModule === "payroll"
                    ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                )}
                style={{ fontSize: '14px' }}
              >
                <DollarSign className="size-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Payroll</span>}
              </button>
            )}

            {/* HR Policies (Employee) */}
            {userRole === "employee" && (
              <button
                onClick={() => {
                  setActiveModule("policies");
                  setOrganizationMenuOpen(false);
                  setAttendanceMenuOpen(false);
                  setLeaveMenuOpen(false);
                  setExpensesMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                  activeModule === "policies"
                    ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                )}
                style={{ fontSize: '14px' }}
              >
                <FileText className="size-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>HR Policies</span>}
              </button>
            )}

            {/* Recruitment */}
            {(userRole === "manager" || userRole === "hr") && (
              <button
                onClick={() => {
                  setActiveModule("recruitment");
                  setOrganizationMenuOpen(false);
                  setAttendanceMenuOpen(false);
                  setLeaveMenuOpen(false);
                  setExpensesMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                  activeModule === "recruitment"
                    ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                )}
                style={{ fontSize: '14px' }}
              >
                <UserPlus className="size-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Recruitment</span>}
              </button>
            )}

            {/* HR Specific */}
            {userRole === "hr" && (
              <>
                <button
                  onClick={() => {
                    setActiveModule("master-data");
                    setOrganizationMenuOpen(false);
                    setAttendanceMenuOpen(false);
                    setLeaveMenuOpen(false);
                    setExpensesMenuOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                    activeModule === "master-data"
                      ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  )}
                  style={{ fontSize: '14px' }}
                >
                  <Users className="size-4 flex-shrink-0" />
                  {!sidebarCollapsed && <span>Master Data</span>}
                </button>
                <button
                  onClick={() => {
                    setActiveModule("announcements");
                    setOrganizationMenuOpen(false);
                    setAttendanceMenuOpen(false);
                    setLeaveMenuOpen(false);
                    setExpensesMenuOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                    activeModule === "announcements"
                      ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  )}
                  style={{ fontSize: '14px' }}
                >
                  <Megaphone className="size-4 flex-shrink-0" />
                  {!sidebarCollapsed && <span>Announcements</span>}
                </button>
                <button
                  onClick={() => {
                    setActiveModule("reports");
                    setOrganizationMenuOpen(false);
                    setAttendanceMenuOpen(false);
                    setLeaveMenuOpen(false);
                    setExpensesMenuOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                    activeModule === "reports"
                      ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  )}
                  style={{ fontSize: '14px' }}
                >
                  <BarChart3 className="size-4 flex-shrink-0" />
                  {!sidebarCollapsed && <span>Reports</span>}
                </button>
              </>
            )}

            {/* Expenses Menu */}
            {(userRole === "employee" || userRole === "manager" || userRole === "hr") && (
              <div>
                <button
                  onClick={() => setExpensesMenuOpen(!expensesMenuOpen)}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                    expensesMenuOpen || ["receipts", "trips", "advances", "my-expenses"].includes(activeModule)
                      ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  )}
                  style={{ fontSize: '14px' }}
                >
                  <div className="flex items-center gap-3">
                    <Receipt className="size-4 flex-shrink-0" />
                    {!sidebarCollapsed && <span>Expenses</span>}
                  </div>
                  {!sidebarCollapsed && (
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform",
                        expensesMenuOpen && "rotate-180"
                      )}
                    />
                  )}
                </button>
                {expensesMenuOpen && !sidebarCollapsed && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-white/20 pl-4">
                    <button
                      onClick={() => setActiveModule("receipts")}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                        activeModule === "receipts"
                          ? "text-white font-semibold bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                      style={{ fontSize: '13px' }}
                    >
                      Receipts
                    </button>
                    <button
                      onClick={() => setActiveModule("trips")}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                        activeModule === "trips"
                          ? "text-white font-semibold bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                      style={{ fontSize: '13px' }}
                    >
                      Trips
                    </button>
                    <button
                      onClick={() => setActiveModule("advances")}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                        activeModule === "advances"
                          ? "text-white font-semibold bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                      style={{ fontSize: '13px' }}
                    >
                      Advances
                    </button>
                    <button
                      onClick={() => setActiveModule("my-expenses")}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                        activeModule === "my-expenses"
                          ? "text-white font-semibold bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                      style={{ fontSize: '13px' }}
                    >
                      My Expenses
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Grievances */}
            {(userRole === "employee" || userRole === "manager") && (
              <button
                onClick={() => {
                  setActiveModule("grievance");
                  setOrganizationMenuOpen(false);
                  setAttendanceMenuOpen(false);
                  setLeaveMenuOpen(false);
                  setExpensesMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                  activeModule === "grievance"
                    ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                )}
                style={{ fontSize: '14px' }}
              >
                <MessageSquare className="size-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Grievances</span>}
              </button>
            )}

            {/* Exit Process */}
            {(userRole === "employee" || userRole === "manager") && (
              <button
                onClick={() => {
                  setActiveModule("exit");
                  setOrganizationMenuOpen(false);
                  setAttendanceMenuOpen(false);
                  setLeaveMenuOpen(false);
                  setExpensesMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                  activeModule === "exit"
                    ? "text-[#f38883] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] font-semibold"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                )}
                style={{ fontSize: '14px' }}
              >
                <LogOut className="size-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Exit Process</span>}
              </button>
            )}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-card border-b border-border flex items-center justify-between px-6 shadow-md backdrop-blur-sm animate-slide-in-right">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hover:bg-accent transition-zynix hover:text-primary"
            >
              <Menu className="size-5" />
            </Button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-accent/50 to-blue-50 rounded-lg px-3 py-1.5 w-64 border border-primary/10 transition-zynix hover:border-primary/30">
              <Search className="size-4 text-primary" />
              <Input
                placeholder="Search..."
                className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm placeholder:text-muted-foreground/70"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-accent transition-zynix hover:text-primary">
              <Bell className="size-5" />
              <span className="absolute top-1 right-1 size-2 bg-gradient-to-r from-secondary to-[#e55a2b] rounded-full animate-pulse shadow-lg"></span>
            </Button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-accent transition-zynix">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-[#2171b5] text-white">
                      {getUserName().split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{getUserName()}</p>
                    <p className="text-xs text-muted-foreground">{getUserRole()}</p>
                  </div>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCircle className="mr-2 size-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 size-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 size-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-background" style={{ padding: '25px' }}>
          <div className="animate-fade-in">{renderContent()}</div>
        </main>
      </div>

      <Toaster />
    </div>
  );
}
