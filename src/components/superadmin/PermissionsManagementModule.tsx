import { useState, useEffect,useCallback  } from "react";
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
import { toast } from "sonner";
import { cn } from "../ui/utils";
import api from "../../services/interceptors";
import PERMISSIONS_ENDPOINTS from "../../services/permissionsEndPoints";
import ROLES_ENDPOINTS from "../../services/rolesEndpoints";
interface Role {
  id: string;
  roleName: string;
}
interface Screen {
  id: string;
  name: string;
  url: string;
  menuName?: string;  // Added menuName as an optional property
  permissions: {
    all: boolean;
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
}
interface Group {
  id: string;
  groupName: string;
}
// Add this interface at the top
interface Menu {
  id: string;
  menuName: string;
  url:string;
}
export function PermissionsManagementModule() {
   const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [copyFromRole, setCopyFromRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isSaving, setIsSaving] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [groups, setGroups] = useState<Group[]>([]);
const [selectedGroup, setSelectedGroup] = useState("");
const [hasExistingPrivileges, setHasExistingPrivileges] = useState(false);
  const [screens, setScreens] = useState<Screen[]>([]);
  const [isLoadingMenus, setIsLoadingMenus] = useState(true);
  //   // Dashboard
  //   {
  //     id: "dashboard",
  //     name: "Dashboard",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: true },
  //   },
    
  //   // Organization Management
  //   {
  //     id: "organization-info",
  //     name: "Organization Info",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
  //   {
  //     id: "business-units",
  //     name: "Business Units",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
  //   {
  //     id: "departments",
  //     name: "Departments",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
  //   {
  //     id: "announcements",
  //     name: "Announcements",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
    
  //   // Employee Management
  //   {
  //     id: "my-profile",
  //     name: "My Profile",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
  //   {
  //     id: "employees",
  //     name: "Employees",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
  //   {
  //     id: "master-data",
  //     name: "Master Data",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
    
  //   // Attendance Management
  //   {
  //     id: "my-attendance",
  //     name: "My Attendance",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
  //   {
  //     id: "team-attendance",
  //     name: "Team Attendance",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
    
  //   // Leave Management
  //   {
  //     id: "my-leave",
  //     name: "My Leave",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
  //   {
  //     id: "team-leave",
  //     name: "Team Leave",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
    
  //   // Performance Management
  //   {
  //     id: "performance",
  //     name: "Performance",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
    
  //   // Payroll
  //   {
  //     id: "payroll",
  //     name: "Payroll",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
    
  //   // HR Policies
  //   {
  //     id: "hr-policies",
  //     name: "HR Policies",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
    
  //   // Recruitment
  //   {
  //     id: "recruitment",
  //     name: "Recruitment",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
    
  //   // Expenses Management
  //   {
  //     id: "receipts",
  //     name: "Receipts",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
  //   {
  //     id: "trips",
  //     name: "Trips",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
  //   {
  //     id: "advances",
  //     name: "Advances",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
  //   {
  //     id: "my-expenses",
  //     name: "My Expenses",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
    
  //   // Grievances
  //   {
  //     id: "grievances",
  //     name: "Grievances",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
    
  //   // Exit Process
  //   {
  //     id: "exit-process",
  //     name: "Exit Process",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
    
  //   // Reports & Analytics
  //   {
  //     id: "reports",
  //     name: "Reports",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
    
  //   // Access Control (Super Admin)
  //   {
  //     id: "access-control",
  //     name: "Roles & Privileges",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
  //   {
  //     id: "permissions",
  //     name: "Permissions",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
  //   {
  //     id: "site-configuration",
  //     name: "Site Configuration",
  //     permissions: { all: false, view: true, create: false, edit: false, delete: false },
  //   },
  // ]);
  
  // Fetch menus on component mount
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setIsLoadingMenus(true);
        const response = await api.get(PERMISSIONS_ENDPOINTS.GET_MENUS);
        console.log("menus response", response);
        if (response.data && Array.isArray(response.data.data)) {
          // Transform the API response into the screens format
          const menuScreens = response.data.data.map((menu: Menu) => ({
            id: menu.id,
            name: menu.menuName,
            url:menu.url,
            permissions: {
              all: false,
              view: false,
              create: false,
              edit: false,
              delete: false
            }
          }));
          
          setScreens(menuScreens);
        }
      } catch (error) {
        console.error('Error fetching menus:', error);
        toast.error('Failed to load menus');
      } finally {
        setIsLoadingMenus(false);
      }
    };

    fetchMenus();
  }, []);

// Add this useEffect to fetch groups
useEffect(() => {
  const fetchGroups = async () => {
    try {
      const response = await api.get(PERMISSIONS_ENDPOINTS.GET_GROUPS);
      if (response.data && Array.isArray(response.data.data)) {
        setGroups(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedGroup(response.data.data[0].id);
        }
      }
    } catch (err) {
      console.error('Error fetching groups:', err);
      toast.error('Failed to load groups');
    }
  };

  fetchGroups();
}, []); // No dependencies needed here

const fetchPrivileges = async (roleId: string, groupId: string) => {
  try {
    setIsLoading(true);
    const response = await api.get(PERMISSIONS_ENDPOINTS.GET_PERMISSIONS(roleId, groupId));
    console.log("fetchPrivileges response:", response.data);

    const responseData = response?.data?.data;
    console.log("Privileges data:", responseData);

    if (responseData && responseData.rolePermissions) {
      setHasExistingPrivileges(true);
      
      // Parse the rolePermissions string into an object
      const screensData = typeof responseData.rolePermissions === 'string' 
        ? JSON.parse(responseData.rolePermissions) 
        : responseData.rolePermissions;

      console.log("Parsed screens data:", screensData);

      // Extract menuName if it exists at the root level
      const menuName = screensData.menuname || '';

      // Update screens with the fetched permissions
      setScreens(prevScreens => 
        prevScreens.map(screen => {
          // First try to find by URL path
          const screenKey = screen.url;
          const permissions = screensData[screenKey];
          
          if (permissions) {
            return { 
              ...screen, 
              menuName: menuName || screen.menuName || '', // Preserve existing menuName or use the one from response
              permissions: {
                all: permissions.all || false,
                view: permissions.view || false,
                create: permissions.create || false,
                edit: permissions.edit || false,
                delete: permissions.delete || false
              }
            };
          }
          
          // If no permissions found, return default false values
          return { 
            ...screen,
            menuName: screen.menuName || '', // Preserve existing menuName
            permissions: { 
              all: false, 
              view: false, 
              create: false, 
              edit: false, 
              delete: false 
            }
          };
        })
      );
    } else {
      setHasExistingPrivileges(false);
      // Reset all permissions to false if no privileges found
      setScreens(prevScreens => 
        prevScreens.map(screen => ({
          ...screen,
          permissions: { 
            all: false, 
            view: false, 
            create: false, 
            edit: false, 
            delete: false 
          }
        }))
      );
    }
  } catch (err) {
    console.error('Error fetching privileges:', err);
    toast.error('Failed to load role privileges');
    setHasExistingPrivileges(false);
  } finally {
    setIsLoading(false);
  }
};
  const fetchRoles = useCallback(async () => {
  if (!selectedGroup) return; // Add guard clause
  
  try {
    setIsLoading(true);
    console.log("selectedGroup", selectedGroup);
    const response = await api.get(PERMISSIONS_ENDPOINTS.GET_ROLES(selectedGroup));
    console.log("response", response.data.data);
    
    if (response.data && Array.isArray(response.data.data)) {
      const rolesData = response.data.data;
      setRoles(rolesData);
      
      if (rolesData.length > 0) {
        const firstRoleId = rolesData[0].id;
        setSelectedRole(firstRoleId);
        await fetchPrivileges(firstRoleId,selectedGroup);
      }
    }
  } catch (err) {
    console.error('Error fetching roles:', err);
    setError('Failed to load roles. Please try again later.');
    toast.error('Failed to load roles');
  } finally {
    setIsLoading(false);
  }
}, [selectedGroup]); // Add dependencies

// Fetch roles when selectedGroup changes
useEffect(() => {
  fetchRoles();
}, [fetchRoles]); // fetchRoles is now memoized with useCallback

  const handleSaveChanges = async () => {
  try {
    // Check if at least one permission is selected
    const hasAnyPermission = screens.some((screen) =>
      Object.values(screen.permissions).some((val) => val === true)
    );

    if (!hasAnyPermission) {
      toast.error("Please select at least one permission before saving.");
      return;
    }

    setIsSaving(true);

    // Transform screens into the required format
    const screensObject: Record<string, any> = {};
    
    // Add menu name at the root level
    if (screens.length > 0) {
      screensObject.menuname = screens[0].menuName || 'default';
    }
    
    screens.forEach(screen => {
      // Use URL as the primary key
      const screenKey = screen.url;
      screensObject[screenKey] = {
        all: screen.permissions.all,
        view: screen.permissions.view,
        create: screen.permissions.create,
        edit: screen.permissions.edit,
        delete: screen.permissions.delete
      };
    });

    // Prepare the final payload
    const payload = {
      roleId: selectedRole,
      groupId: selectedGroup,
      rolePermissions: JSON.stringify(screensObject)
    };

    console.log("Saving payload:", payload);
    
    // ... rest of your save logic
    let response;
    if (hasExistingPrivileges) {
      response = await api.put(
        PERMISSIONS_ENDPOINTS.PUT_PERMISSIONS(selectedRole, selectedGroup),
        payload
      );
      console.log("response", response.status);
      if (response.status === 200) {
        toast.success("Permissions updated successfully!");
      } else {
        toast.error("Failed to update permissions.");
      }
    } else {
      response = await api.post(
        PERMISSIONS_ENDPOINTS.POST_PERMISSIONS,
        payload
      );
      console.log("response", response.status);
      if (response.status === 200) {
        toast.success("Permissions created successfully!");
        setHasExistingPrivileges(true);
      } else {
        toast.error("Failed to create permissions.");
      }
    }
  } catch (error: any) {
    console.error("Error saving permissions:", error);
    toast.error("Something went wrong while saving permissions.");
  } finally {
    setIsSaving(false);
  }
};
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
      // case "export":
      //   toast.success("Permissions exported");
      //   break;
      // case "import":
      //   toast.info("Import functionality");
      //   break;
      // case "reset":
      //   toast.info("Reset to default permissions");
      //   break;
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

            {/* Groups Dropdown */}
            <div className="lg:col-span-3">
              <label className="text-sm text-muted-foreground mb-2 block">Select Group</label>
              <Select 
                value={selectedGroup} 
                onValueChange={setSelectedGroup}
                disabled={isLoading || groups.length === 0}
              >
                <SelectTrigger className="bg-input-background border-input-border">
                  <SelectValue placeholder={groups.length === 0 ? "No groups available" : "Select group"} />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.groupName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Row 1: Role Selection & Copy From */}
           <div className="lg:col-span-3">
            <label className="text-sm text-muted-foreground mb-2 block">
              Selected Role
              {isLoading && <span className="ml-2 text-xs text-muted-foreground">(Loading...)</span>}
              {error && !isLoading && <span className="ml-2 text-xs text-destructive">(Error loading roles)</span>}
            </label>
            <Select 
              value={selectedRole} 
              onValueChange={setSelectedRole}
              disabled={isLoading || roles.length === 0}
            >
              <SelectTrigger className="bg-input-background border-input-border">
                <SelectValue placeholder={roles.length === 0 ? "No roles available" : "Select role"} />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.roleName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

            {/* <div className="lg:col-span-3">
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
            </div> */}

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
                  {/* <DropdownMenuItem onClick={() => handleQuickAction("export")}>
                    <Download className="size-4 mr-2" />
                    Export
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleQuickAction("import")}>
                    <Upload className="size-4 mr-2" />
                    Import
                  </DropdownMenuItem> */}
                  {/* <DropdownMenuItem onClick={() => handleQuickAction("reset")}>
                    <RefreshCw className="size-4 mr-2" />
                    Reset
                  </DropdownMenuItem> */}
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
                    Screens
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
      <div className="flex justify-end gap-4">
        {/* <Button
          variant="outline"
          className="border-input-border"
        >
          <X className="size-4 mr-2" />
          Cancel
        </Button> */}
        <Button   onClick={handleSaveChanges} className="bg-gradient-to-r from-primary to-[#2171b5] hover:from-[#2171b5] hover:to-[#1a5a8a] text-white shadow-lg hover:shadow-xl transition-all">
          <Check className="size-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
