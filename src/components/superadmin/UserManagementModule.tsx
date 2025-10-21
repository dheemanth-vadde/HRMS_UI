import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  UserCircle,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "../ui/utils";

interface User {
  id: number;
  fullName: string;
  emailAddress: string;
  role: string;
  team: string;
  status: "Active" | "Inactive";
}

interface Team {
  id: number;
  teamName: string;
  members: number;
  department: string;
  teamLead: string;
  status: "Active" | "Inactive";
}

export function UserManagementModule() {
  const [activeTab, setActiveTab] = useState<"users" | "teams">("users");
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      fullName: "Adewale Bolangun",
      emailAddress: "ibrahimsuleimon95@gmail.com",
      role: "Owner",
      team: "HSE2",
      status: "Active",
    },
    {
      id: 2,
      fullName: "Oluwatoyi Adelola",
      emailAddress: "nigeobankwushih@yahoo.com",
      role: "Admin",
      team: "IT",
      status: "Active",
    },
    {
      id: 3,
      fullName: "Nnamdi Chinwike",
      emailAddress: "tebioluleyemi99@gmail.com",
      role: "Super Admin",
      team: "IT",
      status: "Active",
    },
    {
      id: 4,
      fullName: "Adelakum Oyewade",
      emailAddress: "tebioluleyemi99@gmail.com",
      role: "Owner",
      team: "Morning",
      status: "Active",
    },
    {
      id: 5,
      fullName: "Emeka Olisakwe",
      emailAddress: "tebioluleyemi99@gmail.com",
      role: "User",
      team: "Human Resources",
      status: "Active",
    },
    {
      id: 6,
      fullName: "Funmileyo Adesina",
      emailAddress: "aishaoladuhullah@yahoo.com",
      role: "User",
      team: "Operations",
      status: "Active",
    },
    {
      id: 7,
      fullName: "Chiamaka Otufor",
      emailAddress: "chikaabi49@gmail.com",
      role: "Manager",
      team: "Engineering",
      status: "Active",
    },
    {
      id: 8,
      fullName: "Zainab Adegoke",
      emailAddress: "feilaimi123@yahoo.com",
      role: "Admin",
      team: "Engineering",
      status: "Inactive",
    },
    {
      id: 9,
      fullName: "Adebayo Ogunleye",
      emailAddress: "ogechukuforli88@yahoo.com",
      role: "Admin",
      team: "IT",
      status: "Active",
    },
    {
      id: 10,
      fullName: "Nneka Igbokwe",
      emailAddress: "emekainyene77@gmail.com",
      role: "User",
      team: "Marketing",
      status: "Active",
    },
    {
      id: 11,
      fullName: "Olajide Adeleke",
      emailAddress: "chinadueze79@gmail.com",
      role: "Manager",
      team: "Marketing",
      status: "Inactive",
    },
    {
      id: 12,
      fullName: "Ayoola Ajiyi",
      emailAddress: "ogechukuforli88@yahoo.com",
      role: "Manager",
      team: "Marketing",
      status: "Active",
    },
    {
      id: 13,
      fullName: "Oluwaseun Ogunsele",
      emailAddress: "aolaolokunote27@yahoo.com",
      role: "Manager",
      team: "Marketing",
      status: "Inactive",
    },
  ]);

  const [teams, setTeams] = useState<Team[]>([
    { id: 1, teamName: "HSE2", members: 12, department: "Health & Safety", teamLead: "Adewale Bolangun", status: "Active" },
    { id: 2, teamName: "IT", members: 15, department: "Information Technology", teamLead: "Oluwatoyi Adelola", status: "Active" },
    { id: 3, teamName: "Morning", members: 8, department: "Operations", teamLead: "Adelakum Oyewade", status: "Active" },
    { id: 4, teamName: "Human Resources", members: 10, department: "HR", teamLead: "Emeka Olisakwe", status: "Active" },
    { id: 5, teamName: "Operations", members: 20, department: "Operations", teamLead: "Funmileyo Adesina", status: "Active" },
    { id: 6, teamName: "Engineering", members: 18, department: "Engineering", teamLead: "Chiamaka Otufor", status: "Active" },
    { id: 7, teamName: "Marketing", members: 14, department: "Marketing", teamLead: "Ayoola Ajiyi", status: "Active" },
  ]);

  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [userFormData, setUserFormData] = useState({
    fullName: "",
    emailAddress: "",
    role: "",
    team: "",
    status: "Active" as "Active" | "Inactive",
  });

  const roles = ["Owner", "Super Admin", "Admin", "Manager", "User"];
  const teamsList = ["HSE2", "IT", "Morning", "Human Resources", "Operations", "Engineering", "Marketing"];

  const handleAddUser = () => {
    if (!userFormData.fullName || !userFormData.emailAddress || !userFormData.role || !userFormData.team) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newUser: User = {
      id: users.length + 1,
      fullName: userFormData.fullName,
      emailAddress: userFormData.emailAddress,
      role: userFormData.role,
      team: userFormData.team,
      status: userFormData.status,
    };

    setUsers([...users, newUser]);
    setIsAddUserDialogOpen(false);
    resetUserForm();
    toast.success("User added successfully");
  };

  const handleEditUser = () => {
    if (!selectedUser) return;

    if (!userFormData.fullName || !userFormData.emailAddress || !userFormData.role || !userFormData.team) {
      toast.error("Please fill in all required fields");
      return;
    }

    setUsers(
      users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              fullName: userFormData.fullName,
              emailAddress: userFormData.emailAddress,
              role: userFormData.role,
              team: userFormData.team,
              status: userFormData.status,
            }
          : user
      )
    );

    setIsEditUserDialogOpen(false);
    setSelectedUser(null);
    resetUserForm();
    toast.success("User updated successfully");
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    setUsers(users.filter((user) => user.id !== selectedUser.id));
    setIsDeleteUserDialogOpen(false);
    setSelectedUser(null);
    toast.success("User deleted successfully");
  };

  const handleAssignRole = (user: User) => {
    setSelectedUser(user);
    setUserFormData({
      fullName: user.fullName,
      emailAddress: user.emailAddress,
      role: user.role,
      team: user.team,
      status: user.status,
    });
    setIsEditUserDialogOpen(true);
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setUserFormData({
      fullName: user.fullName,
      emailAddress: user.emailAddress,
      role: user.role,
      team: user.team,
      status: user.status,
    });
    setIsEditUserDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteUserDialogOpen(true);
  };

  const resetUserForm = () => {
    setUserFormData({
      fullName: "",
      emailAddress: "",
      role: "",
      team: "",
      status: "Active",
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.emailAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTeams = teams.filter(
    (team) =>
      team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.teamLead.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const totalTeamPages = Math.ceil(filteredTeams.length / itemsPerPage);
  const teamStartIndex = (currentPage - 1) * itemsPerPage;
  const teamEndIndex = teamStartIndex + itemsPerPage;
  const currentTeams = filteredTeams.slice(teamStartIndex, teamEndIndex);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Management</span>
            <span>/</span>
            <span className="text-primary">User Management</span>
          </div>
          <h1>Users Management</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your organization users and teams.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search anything here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value:any) => setActiveTab(value as "users" | "teams")}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="users" className="relative">
              Users
              <Badge variant="secondary" className="ml-2 bg-primary text-white">
                {users.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="teams" className="relative">
              Teams
              <Badge variant="secondary" className="ml-2">
                {teams.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="size-4" />
              Filters
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-2">
                  <Plus className="size-4" />
                  Create New
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsAddUserDialogOpen(true)}>
                  <UserCircle className="size-4 mr-2" />
                  Add User
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="size-4 mr-2" />
                  Create Team
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Users Tab */}
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-24">Action</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email Address</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-muted/30">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                                onClick={() => openEditDialog(user)}
                              >
                                <Edit className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                onClick={() => openDeleteDialog(user)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{user.fullName}</TableCell>
                          <TableCell className="text-muted-foreground">{user.emailAddress}</TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">{user.role}</span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{user.team}</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-between">
                              <Badge
                                variant={user.status === "Active" ? "default" : "secondary"}
                                className={cn(
                                  "flex items-center gap-1.5",
                                  user.status === "Active" 
                                    ? "bg-success/10 text-success hover:bg-success/20" 
                                    : "bg-muted text-muted-foreground"
                                )}
                              >
                                <span className={cn(
                                  "size-1.5 rounded-full",
                                  user.status === "Active" ? "bg-success" : "bg-muted-foreground"
                                )} />
                                {user.status}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-8 text-muted-foreground hover:text-foreground"
                                  >
                                    <MoreVertical className="size-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => openEditDialog(user)}>
                                    <Edit className="size-4 mr-2" />
                                    Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleAssignRole(user)}>
                                    <UserCircle className="size-4 mr-2" />
                                    Assign Role
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => openDeleteDialog(user)}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="size-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <div className="text-sm text-muted-foreground">
                  {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} items
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="size-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="size-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-24">Action</TableHead>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Team Lead</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentTeams.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No teams found
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentTeams.map((team) => (
                        <TableRow key={team.id} className="hover:bg-muted/30">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                              >
                                <Edit className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{team.teamName}</TableCell>
                          <TableCell className="text-muted-foreground">{team.department}</TableCell>
                          <TableCell className="text-muted-foreground">{team.teamLead}</TableCell>
                          <TableCell className="text-muted-foreground">{team.members}</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-between">
                              <Badge
                                variant={team.status === "Active" ? "default" : "secondary"}
                                className={cn(
                                  "flex items-center gap-1.5",
                                  team.status === "Active" 
                                    ? "bg-success/10 text-success hover:bg-success/20" 
                                    : "bg-muted text-muted-foreground"
                                )}
                              >
                                <span className={cn(
                                  "size-1.5 rounded-full",
                                  team.status === "Active" ? "bg-success" : "bg-muted-foreground"
                                )} />
                                {team.status}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-8 text-muted-foreground hover:text-foreground"
                                  >
                                    <MoreVertical className="size-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="size-4 mr-2" />
                                    Edit Team
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Users className="size-4 mr-2" />
                                    Manage Members
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                                    <Trash2 className="size-4 mr-2" />
                                    Delete Team
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination for Teams */}
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <div className="text-sm text-muted-foreground">
                  {teamStartIndex + 1}-{Math.min(teamEndIndex, filteredTeams.length)} of {filteredTeams.length} items
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="size-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalTeamPages}
                  >
                    Next
                    <ChevronRight className="size-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account with role and team assignment</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add-fullName">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="add-fullName"
                placeholder="Enter full name"
                value={userFormData.fullName}
                onChange={(e) => setUserFormData({ ...userFormData, fullName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-emailAddress">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="add-emailAddress"
                type="email"
                placeholder="Enter email address"
                value={userFormData.emailAddress}
                onChange={(e) => setUserFormData({ ...userFormData, emailAddress: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-role">
                Role <span className="text-destructive">*</span>
              </Label>
              <Select value={userFormData.role} onValueChange={(value:any) => setUserFormData({ ...userFormData, role: value })}>
                <SelectTrigger id="add-role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-team">
                Team <span className="text-destructive">*</span>
              </Label>
              <Select value={userFormData.team} onValueChange={(value:any) => setUserFormData({ ...userFormData, team: value })}>
                <SelectTrigger id="add-team">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {teamsList.map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-status">Status</Label>
              <Select value={userFormData.status} onValueChange={(value:any) => setUserFormData({ ...userFormData, status: value as "Active" | "Inactive" })}>
                <SelectTrigger id="add-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddUserDialogOpen(false);
                resetUserForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddUser}>
              <Plus className="size-4 mr-2" />
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and role assignment</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-fullName">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-fullName"
                placeholder="Enter full name"
                value={userFormData.fullName}
                onChange={(e) => setUserFormData({ ...userFormData, fullName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-emailAddress">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-emailAddress"
                type="email"
                placeholder="Enter email address"
                value={userFormData.emailAddress}
                onChange={(e) => setUserFormData({ ...userFormData, emailAddress: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">
                Role <span className="text-destructive">*</span>
              </Label>
              <Select value={userFormData.role} onValueChange={(value:any) => setUserFormData({ ...userFormData, role: value })}>
                <SelectTrigger id="edit-role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-team">
                Team <span className="text-destructive">*</span>
              </Label>
              <Select value={userFormData.team} onValueChange={(value:any) => setUserFormData({ ...userFormData, team: value })}>
                <SelectTrigger id="edit-team">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {teamsList.map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={userFormData.status} onValueChange={(value:any) => setUserFormData({ ...userFormData, status: value as "Active" | "Inactive" })}>
                <SelectTrigger id="edit-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditUserDialogOpen(false);
                setSelectedUser(null);
                resetUserForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleEditUser}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteUserDialogOpen} onOpenChange={setIsDeleteUserDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedUser?.fullName}"? This action cannot be undone and will remove all user data and access permissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedUser(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
