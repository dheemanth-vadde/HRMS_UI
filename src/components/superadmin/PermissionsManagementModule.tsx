import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Search,
  Zap,
  Copy,
  Check,
  X,
  Download,
  Upload,
  RefreshCw,
  FileText,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { cn } from "../ui/utils";

interface Screen {
  id: string;
  name: string;
  permissions: {
    all: boolean;
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
}

export function PermissionsManagementModule() {
  const [selectedRole, setSelectedRole] = useState("manager");
  const [copyFromRole, setCopyFromRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [screens, setScreens] = useState<Screen[]>([
    // Dashboard
    {
      id: "dashboard",
      name: "Dashboard",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    
    // Organization Management
    {
      id: "organization-info",
      name: "Organization Info",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    {
      id: "business-units",
      name: "Business Units",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    {
      id: "departments",
      name: "Departments",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    {
      id: "announcements",
      name: "Announcements",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    
    // Employee Management
    {
      id: "my-profile",
      name: "My Profile",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    {
      id: "employees",
      name: "Employees",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    {
      id: "master-data",
      name: "Master Data",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    
    // Attendance Management
    {
      id: "my-attendance",
      name: "My Attendance",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    {
      id: "team-attendance",
      name: "Team Attendance",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    
    // Leave Management
    {
      id: "my-leave",
      name: "My Leave",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    {
      id: "team-leave",
      name: "Team Leave",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    
    // Performance Management
    {
      id: "performance",
      name: "Performance",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    
    // Payroll
    {
      id: "payroll",
      name: "Payroll",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    
    // HR Policies
    {
      id: "hr-policies",
      name: "HR Policies",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    
    // Recruitment
    {
      id: "recruitment",
      name: "Recruitment",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    
    // Expenses Management
    {
      id: "receipts",
      name: "Receipts",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    {
      id: "trips",
      name: "Trips",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    {
      id: "advances",
      name: "Advances",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    {
      id: "my-expenses",
      name: "My Expenses",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    
    // Grievances
    {
      id: "grievances",
      name: "Grievances",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    
    // Exit Process
    {
      id: "exit-process",
      name: "Exit Process",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    
    // Reports & Analytics
    {
      id: "reports",
      name: "Reports",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    
    // Access Control (Super Admin)
    {
      id: "access-control",
      name: "Roles & Privileges",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    {
      id: "permissions",
      name: "Permissions",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
    {
      id: "site-configuration",
      name: "Site Configuration",
      permissions: { all: false, view: true, create: false, edit: false, delete: false },
    },
  ]);

  const roles = [
    { id: "employee", name: "Employee" },
    { id: "manager", name: "Manager" },
    { id: "hr", name: "HR Admin" },
    { id: "superadmin", name: "Super Admin" },
  ];

  const togglePermission = (screenId: string, permissionType: keyof Screen["permissions"]) => {
    setScreens((prev) =>
      prev.map((screen) => {
        if (screen.id === screenId) {
          const newPermissions = { ...screen.permissions };
          
          if (permissionType === "all") {
            const newAllValue = !screen.permissions.all;
            return {
              ...screen,
              permissions: {
                all: newAllValue,
                view: newAllValue,
                create: newAllValue,
                edit: newAllValue,
                delete: newAllValue,
              },
            };
          } else {
            newPermissions[permissionType] = !screen.permissions[permissionType];
            // Update "all" based on other permissions
            newPermissions.all =
              newPermissions.view &&
              newPermissions.create &&
              newPermissions.edit &&
              newPermissions.delete;
            return { ...screen, permissions: newPermissions };
          }
        }
        return screen;
      })
    );
  };

  const handleApplyCopyFrom = () => {
    if (!copyFromRole) {
      toast.error("Please select a role to copy from");
      return;
    }
    toast.success(`Permissions copied from ${roles.find(r => r.id === copyFromRole)?.name}`);
    setCopyFromRole("");
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "enable-all":
        setScreens((prev) =>
          prev.map((screen) => ({
            ...screen,
            permissions: { all: true, view: true, create: true, edit: true, delete: true },
          }))
        );
        toast.success("All permissions enabled");
        break;
      case "disable-all":
        setScreens((prev) =>
          prev.map((screen) => ({
            ...screen,
            permissions: { all: false, view: false, create: false, edit: false, delete: false },
          }))
        );
        toast.success("All permissions disabled");
        break;
      case "view-only":
        setScreens((prev) =>
          prev.map((screen) => ({
            ...screen,
            permissions: { all: false, view: true, create: false, edit: false, delete: false },
          }))
        );
        toast.success("Set to view-only permissions");
        break;
      case "export":
        toast.success("Permissions exported");
        break;
      case "import":
        toast.info("Import functionality");
        break;
      case "reset":
        toast.info("Reset to default permissions");
        break;
    }
  };

  const filteredScreens = screens.filter((screen) => {
    const matchesSearch = screen.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === "all") return matchesSearch;
    if (filterType === "with-permissions") {
      return matchesSearch && (screen.permissions.view || screen.permissions.create || screen.permissions.edit || screen.permissions.delete);
    }
    if (filterType === "without-permissions") {
      return matchesSearch && !screen.permissions.view && !screen.permissions.create && !screen.permissions.edit && !screen.permissions.delete;
    }
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-primary">
          Role Permissions Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure access permissions for different user roles
        </p>
      </div>

      {/* Top Controls Section */}
      <Card className="border shadow-md">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Row 1: Role Selection & Copy From */}
            <div className="lg:col-span-3">
              <label className="text-sm text-muted-foreground mb-2 block">Selected Role</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="bg-input-background border-input-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-3">
              <label className="text-sm text-muted-foreground mb-2 block">Copy from Role</label>
              <Select value={copyFromRole} onValueChange={setCopyFromRole}>
                <SelectTrigger className="bg-input-background border-input-border">
                  <SelectValue placeholder="Select role..." />
                </SelectTrigger>
                <SelectContent>
                  {roles.filter(r => r.id !== selectedRole).map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-2 flex items-end">
              <Button 
                onClick={handleApplyCopyFrom}
                disabled={!copyFromRole}
                className="w-full bg-gradient-to-r from-primary to-[#2171b5] hover:from-[#2171b5] hover:to-[#1a5a8a] text-white"
              >
                <Copy className="size-4 mr-2" />
                Apply
              </Button>
            </div>

            {/* Row 2: Search & Filter */}
            <div className="lg:col-span-3">
              <label className="text-sm text-muted-foreground mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search screens..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-input-background border-input-border"
                />
              </div>
            </div>

            <div className="lg:col-span-1 flex items-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full border-input-border">
                    <Zap className="size-4 mr-2" />
                    Quick
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => handleQuickAction("enable-all")}>
                    <Check className="size-4 mr-2 text-success" />
                    Enable All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleQuickAction("disable-all")}>
                    <X className="size-4 mr-2 text-destructive" />
                    Disable All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleQuickAction("view-only")}>
                    <FileText className="size-4 mr-2 text-primary" />
                    View Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleQuickAction("export")}>
                    <Download className="size-4 mr-2" />
                    Export
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleQuickAction("import")}>
                    <Upload className="size-4 mr-2" />
                    Import
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleQuickAction("reset")}>
                    <RefreshCw className="size-4 mr-2" />
                    Reset
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Permissions Table */}
      <Card className="border shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="sticky top-0 z-10">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-foreground border-b border-border">
                    Screen
                  </th>
                  <th className="text-center px-4 py-4 font-semibold text-foreground border-b border-border w-24">
                    All
                  </th>
                  <th className="text-center px-4 py-4 font-semibold text-foreground border-b border-border w-24">
                    <div className="flex flex-col items-center gap-1">
                      <span>View</span>
                      <span className="text-xs text-muted-foreground font-normal">[V]</span>
                    </div>
                  </th>
                  <th className="text-center px-4 py-4 font-semibold text-foreground border-b border-border w-24">
                    <div className="flex flex-col items-center gap-1">
                      <span>Create</span>
                      <span className="text-xs text-muted-foreground font-normal">[C]</span>
                    </div>
                  </th>
                  <th className="text-center px-4 py-4 font-semibold text-foreground border-b border-border w-24">
                    <div className="flex flex-col items-center gap-1">
                      <span>Edit</span>
                      <span className="text-xs text-muted-foreground font-normal">[E]</span>
                    </div>
                  </th>
                  <th className="text-center px-4 py-4 font-semibold text-foreground border-b border-border w-24">
                    <div className="flex flex-col items-center gap-1">
                      <span>Delete</span>
                      <span className="text-xs text-muted-foreground font-normal">[D]</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredScreens.map((screen, index) => {
                  return (
                    <tr
                      key={screen.id}
                      className={cn(
                        "transition-colors hover:bg-accent/30 border-b border-border last:border-0",
                        index % 2 === 0 ? "bg-white dark:bg-card" : "bg-accent/10 dark:bg-accent/5"
                      )}
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-foreground">{screen.name}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={screen.permissions.all}
                            onCheckedChange={() => togglePermission(screen.id, "all")}
                            className="size-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={screen.permissions.view}
                            onCheckedChange={() => togglePermission(screen.id, "view")}
                            className="size-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={screen.permissions.create}
                            onCheckedChange={() => togglePermission(screen.id, "create")}
                            className="size-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={screen.permissions.edit}
                            onCheckedChange={() => togglePermission(screen.id, "edit")}
                            className="size-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={screen.permissions.delete}
                            onCheckedChange={() => togglePermission(screen.id, "delete")}
                            className="size-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden p-4 space-y-4">
            {filteredScreens.map((screen) => {
              return (
                <Card key={screen.id} className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="mb-4">
                      <span className="font-semibold text-foreground">{screen.name}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between p-2 rounded-md bg-accent/20">
                        <span className="text-sm">All</span>
                        <Checkbox
                          checked={screen.permissions.all}
                          onCheckedChange={() => togglePermission(screen.id, "all")}
                          className="size-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-accent/20">
                        <span className="text-sm">View</span>
                        <Checkbox
                          checked={screen.permissions.view}
                          onCheckedChange={() => togglePermission(screen.id, "view")}
                          className="size-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-accent/20">
                        <span className="text-sm">Create</span>
                        <Checkbox
                          checked={screen.permissions.create}
                          onCheckedChange={() => togglePermission(screen.id, "create")}
                          className="size-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-accent/20">
                        <span className="text-sm">Edit</span>
                        <Checkbox
                          checked={screen.permissions.edit}
                          onCheckedChange={() => togglePermission(screen.id, "edit")}
                          className="size-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-accent/20 col-span-2">
                        <span className="text-sm">Delete</span>
                        <Checkbox
                          checked={screen.permissions.delete}
                          onCheckedChange={() => togglePermission(screen.id, "delete")}
                          className="size-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          className="border-input-border"
        >
          <X className="size-4 mr-2" />
          Cancel
        </Button>
        <Button className="bg-gradient-to-r from-primary to-[#2171b5] hover:from-[#2171b5] hover:to-[#1a5a8a] text-white shadow-lg hover:shadow-xl transition-all">
          <Check className="size-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
