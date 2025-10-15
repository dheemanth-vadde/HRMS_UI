import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Database,
  Building2,
  Users,
  Layout,
  Briefcase,
  MapPin,
  XCircle,
  Mail,
  Plus,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { cn } from "../ui/utils";

interface Permission {
  id: string;
  category: string;
  action: string;
  member: boolean;
  manager: boolean;
  admin: boolean;
}

export function SettingsModule() {
  const [activeSection, setActiveSection] = useState<string>("team-members");
  const [activeRoleTab, setActiveRoleTab] = useState<"all-users" | "user-role-manager">("all-users");

  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "job-1",
      category: "Jobs management",
      action: "Create new job and stages",
      member: false,
      manager: true,
      admin: true,
    },
    {
      id: "job-2",
      category: "Jobs management",
      action: "Edit job and stages",
      member: false,
      manager: true,
      admin: true,
    },
    {
      id: "job-3",
      category: "Jobs management",
      action: "Archive jobs",
      member: false,
      manager: true,
      admin: true,
    },
    {
      id: "job-4",
      category: "Jobs management",
      action: "Change job status",
      member: false,
      manager: true,
      admin: true,
    },
    {
      id: "candidate-1",
      category: "Candidate management",
      action: "Change candidate stage",
      member: true,
      manager: true,
      admin: true,
    },
    {
      id: "candidate-2",
      category: "Candidate management",
      action: "Move applicant to terminal stage (Hired, Rejected, On hold)",
      member: false,
      manager: true,
      admin: true,
    },
    {
      id: "candidate-3",
      category: "Candidate management",
      action: "Read messages",
      member: true,
      manager: true,
      admin: true,
    },
    {
      id: "candidate-4",
      category: "Candidate management",
      action: "Send ad-hoc messages to candidates",
      member: true,
      manager: true,
      admin: true,
    },
    {
      id: "candidate-5",
      category: "Candidate management",
      action: "Reschedule interviews",
      member: true,
      manager: true,
      admin: true,
    },
    {
      id: "candidate-6",
      category: "Candidate management",
      action: "Import applicants",
      member: true,
      manager: true,
      admin: true,
    },
    {
      id: "user-1",
      category: "User management",
      action: "Edit user details",
      member: true,
      manager: true,
      admin: true,
    },
    {
      id: "user-2",
      category: "User management",
      action: "Participate interviews / Set calendar",
      member: true,
      manager: true,
      admin: true,
    },
  ]);

  const handlePermissionChange = (permissionId: string, role: "member" | "manager" | "admin") => {
    setPermissions(
      permissions.map((perm) =>
        perm.id === permissionId ? { ...perm, [role]: !perm[role] } : perm
      )
    );
    toast.success("Permission updated successfully");
  };

  const personalSections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "password", label: "Password", icon: Lock },
    { id: "data", label: "Data", icon: Database },
  ];

  const companySections = [
    { id: "company-details", label: "Company details", icon: Building2 },
    { id: "team-members", label: "Team members", icon: Users },
    { id: "format-settings", label: "Format settings", icon: Layout },
    { id: "job-boards", label: "Job boards", icon: Briefcase },
    { id: "positions", label: "Positions", icon: MapPin },
    { id: "rejection-reasons", label: "Rejection reasons", icon: XCircle },
    { id: "automated-messages", label: "Automated messages", icon: Mail },
  ];

  const groupedPermissions = permissions.reduce((acc, perm) => {
    if (!acc[perm.category]) {
      acc[perm.category] = [];
    }
    acc[perm.category].push(perm);
    return acc;
  }, {} as Record<string, Permission[]>);

  const allUsersCount = 8;
  const rolesCount = 3;

  return (
    <div className="space-y-6">
      <div>
        <h1>Account Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex gap-6">
        {/* Left Sidebar Navigation */}
        <Card className="w-64 flex-shrink-0 h-fit">
          <CardContent className="p-4">
            {/* Personal Section */}
            <div className="mb-6">
              <h3 className="text-sm mb-3 text-muted-foreground">Personal</h3>
              <div className="space-y-1">
                {personalSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                      activeSection === section.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <section.icon className="size-4" />
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="text-sm mb-3 text-muted-foreground">Company</h3>
              <div className="space-y-1">
                {companySections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                      activeSection === section.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <section.icon className="size-4" />
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="flex-1">
          {activeSection === "team-members" && (
            <Card>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team members</CardTitle>
                    <CardDescription className="mt-1">
                      Invite or manage your organisation's members.
                    </CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Plus className="size-4" />
                    Add Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs value={activeRoleTab} onValueChange={(value) => setActiveRoleTab(value as "all-users" | "user-role-manager")}>
                  <div className="flex items-center justify-between mb-6">
                    <TabsList>
                      <TabsTrigger value="all-users" className="gap-2">
                        All users
                        <Badge variant="secondary" className="bg-muted">
                          {allUsersCount}
                        </Badge>
                      </TabsTrigger>
                      <TabsTrigger value="user-role-manager">
                        User role manager
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* All Users Tab */}
                  <TabsContent value="all-users">
                    <div className="text-center py-12 text-muted-foreground">
                      <Users className="size-12 mx-auto mb-4 opacity-40" />
                      <p>User list will be displayed here</p>
                      <p className="text-sm mt-2">Click "Add Member" to invite new team members</p>
                    </div>
                  </TabsContent>

                  {/* User Role Manager Tab */}
                  <TabsContent value="user-role-manager">
                    <div className="space-y-6">
                      {/* Permissions Table */}
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-muted/50 px-6 py-3 border-b">
                          <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-4">
                            <div className="font-medium text-sm">Actions</div>
                            <div className="font-medium text-sm text-center">Member</div>
                            <div className="font-medium text-sm text-center">Manager</div>
                            <div className="font-medium text-sm text-center">Admin</div>
                          </div>
                        </div>

                        {Object.entries(groupedPermissions).map(([category, perms]) => (
                          <div key={category}>
                            {/* Category Header */}
                            <div className="bg-primary/5 px-6 py-3 border-b">
                              <div className="flex items-center gap-2">
                                <Briefcase className="size-4 text-primary" />
                                <span className="font-medium text-sm">{category}</span>
                              </div>
                            </div>

                            {/* Permission Rows */}
                            {perms.map((perm, index) => (
                              <div
                                key={perm.id}
                                className={cn(
                                  "px-6 py-4 hover:bg-muted/30 transition-colors",
                                  index !== perms.length - 1 && "border-b"
                                )}
                              >
                                <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 items-center">
                                  <div className="text-sm">{perm.action}</div>
                                  <div className="flex justify-center">
                                    <Checkbox
                                      checked={perm.member}
                                      onCheckedChange={() => handlePermissionChange(perm.id, "member")}
                                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                    />
                                  </div>
                                  <div className="flex justify-center">
                                    <Checkbox
                                      checked={perm.manager}
                                      onCheckedChange={() => handlePermissionChange(perm.id, "manager")}
                                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                    />
                                  </div>
                                  <div className="flex justify-center">
                                    <Checkbox
                                      checked={perm.admin}
                                      onCheckedChange={() => handlePermissionChange(perm.id, "admin")}
                                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>

                      {/* Save Button */}
                      <div className="flex justify-end">
                        <Button>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Profile Section */}
          {activeSection === "profile" && (
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your personal profile information</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  <User className="size-12 mx-auto mb-4 opacity-40" />
                  <p>Profile settings will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Password Section */}
          {activeSection === "password" && (
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Password & Security</CardTitle>
                <CardDescription>Update your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  <Lock className="size-12 mx-auto mb-4 opacity-40" />
                  <p>Password settings will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Data Section */}
          {activeSection === "data" && (
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Manage your data and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  <Database className="size-12 mx-auto mb-4 opacity-40" />
                  <p>Data management settings will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Company Details Section */}
          {activeSection === "company-details" && (
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Company Details</CardTitle>
                <CardDescription>Manage your organization's information</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  <Building2 className="size-12 mx-auto mb-4 opacity-40" />
                  <p>Company details will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Format Settings Section */}
          {activeSection === "format-settings" && (
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Format Settings</CardTitle>
                <CardDescription>Configure date, time, and regional formats</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  <Layout className="size-12 mx-auto mb-4 opacity-40" />
                  <p>Format settings will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Job Boards Section */}
          {activeSection === "job-boards" && (
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Job Boards</CardTitle>
                <CardDescription>Manage job board integrations and postings</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  <Briefcase className="size-12 mx-auto mb-4 opacity-40" />
                  <p>Job boards configuration will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Positions Section */}
          {activeSection === "positions" && (
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Positions</CardTitle>
                <CardDescription>Manage available positions and job titles</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="size-12 mx-auto mb-4 opacity-40" />
                  <p>Positions management will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Rejection Reasons Section */}
          {activeSection === "rejection-reasons" && (
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Rejection Reasons</CardTitle>
                <CardDescription>Configure rejection reasons for candidates</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  <XCircle className="size-12 mx-auto mb-4 opacity-40" />
                  <p>Rejection reasons will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Automated Messages Section */}
          {activeSection === "automated-messages" && (
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Automated Messages</CardTitle>
                <CardDescription>Set up automated email templates and notifications</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  <Mail className="size-12 mx-auto mb-4 opacity-40" />
                  <p>Automated messages configuration will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
