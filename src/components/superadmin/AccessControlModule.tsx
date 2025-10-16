import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
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
  Shield,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { cn } from "../ui/utils";

interface Role {
  id: number;
  roleName: string;
  roleType: string;
  roleDescription: string;
  group: string;
}

export function AccessControlModule() {
  // Roles State
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, roleName: "Employee", roleType: "employee", roleDescription: "Standard employee access", group: "Employees" },
    { id: 2, roleName: "Manager", roleType: "manager", roleDescription: "Team management capabilities", group: "Management" },
    { id: 3, roleName: "HR Admin", roleType: "hradmin", roleDescription: "HR operations and reporting", group: "HR" },
    { id: 4, roleName: "Super Admin", roleType: "superadmin", roleDescription: "Full system access", group: "Administration" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Role Dialog States
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  const [isDeleteRoleDialogOpen, setIsDeleteRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [roleFormData, setRoleFormData] = useState({
    roleName: "",
    roleType: "",
    roleDescription: "",
    group: "",
  });

  const groups = ["Employees", "Management", "HR", "Administration"];

  // Role Handlers
  const handleAddRole = () => {
    if (!roleFormData.roleName || !roleFormData.roleType || !roleFormData.group) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newRole: Role = {
      id: roles.length + 1,
      roleName: roleFormData.roleName,
      roleType: roleFormData.roleType,
      roleDescription: roleFormData.roleDescription,
      group: roleFormData.group,
    };

    setRoles([...roles, newRole]);
    setIsAddRoleDialogOpen(false);
    resetRoleForm();
    toast.success("Role created successfully");
  };

  const handleEditRole = () => {
    if (!selectedRole) return;
    if (!roleFormData.roleName || !roleFormData.roleType || !roleFormData.group) {
      toast.error("Please fill in all required fields");
      return;
    }

    setRoles(
      roles.map((role) =>
        role.id === selectedRole.id
          ? { ...role, roleName: roleFormData.roleName, roleType: roleFormData.roleType, roleDescription: roleFormData.roleDescription, group: roleFormData.group }
          : role
      )
    );

    setIsEditRoleDialogOpen(false);
    setSelectedRole(null);
    resetRoleForm();
    toast.success("Role updated successfully");
  };

  const handleDeleteRole = () => {
    if (!selectedRole) return;
    setRoles(roles.filter((role) => role.id !== selectedRole.id));
    setIsDeleteRoleDialogOpen(false);
    setSelectedRole(null);
    toast.success("Role deleted successfully");
  };

  const openEditRoleDialog = (role: Role) => {
    setSelectedRole(role);
    setRoleFormData({
      roleName: role.roleName,
      roleType: role.roleType,
      roleDescription: role.roleDescription,
      group: role.group,
    });
    setIsEditRoleDialogOpen(true);
  };

  const openDeleteRoleDialog = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteRoleDialogOpen(true);
  };

  const resetRoleForm = () => {
    setRoleFormData({ roleName: "", roleType: "", roleDescription: "", group: "" });
  };

  // Filtering and Pagination
  const filteredRoles = roles.filter(
    (role) =>
      role.roleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.roleType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRoles = filteredRoles.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Roles & Privileges</h1>
          <p className="text-muted-foreground mt-1">
            Manage roles and privileges across the organization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              {groups.map(group => (
                <SelectItem key={group} value={group}>{group}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            className="gap-2 btn-add-purple"
            onClick={() => setIsAddRoleDialogOpen(true)}
          >
            <Plus className="size-4" />
            Add Role
          </Button>
        </div>
      </div>

      {/* Roles Table */}
      <Card className="border-[#e5e7eb]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  
                  <TableHead className="font-semibold text-base mb-1">Role Name</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Role Type</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Role Description</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Group</TableHead>
                  <TableHead className="font-semibold text-base mb-1 w-24">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentRoles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No roles found
                    </TableCell>
                  </TableRow>
                ) : (
                  currentRoles.map((role) => (
                    <TableRow key={role.id} className="hover:bg-muted/30">
                      
                      <TableCell className="font-medium">{role.roleName}</TableCell>
                      <TableCell className="text-muted-foreground">{role.roleType}</TableCell>
                      <TableCell className="text-muted-foreground">{role.roleDescription || "-"}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-sm">
                          {role.group}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-primary hover:bg-primary/10"
                            onClick={() => openEditRoleDialog(role)}
                          >
                            <Edit className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-destructive hover:bg-destructive/10"
                            onClick={() => openDeleteRoleDialog(role)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                {startIndex + 1}-{Math.min(endIndex, filteredRoles.length)} of {filteredRoles.length} items
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
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "size-8",
                        currentPage === page && "bg-primary text-white hover:bg-primary/90"
                      )}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
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
          )}
        </CardContent>
      </Card>

      {/* Add Role Dialog */}
      <Dialog open={isAddRoleDialogOpen} onOpenChange={setIsAddRoleDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
            <DialogDescription>Create a new role with specific privileges</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add-roleName">
                Role Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="add-roleName"
                placeholder="Enter role name"
                value={roleFormData.roleName}
                onChange={(e) => setRoleFormData({ ...roleFormData, roleName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-roleType">
                Role Type <span className="text-destructive">*</span>
              </Label>
              <Input
                id="add-roleType"
                placeholder="Enter role type (lowercase)"
                value={roleFormData.roleType}
                onChange={(e) => setRoleFormData({ ...roleFormData, roleType: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="add-roleDescription">Role Description</Label>
              <Textarea
                id="add-roleDescription"
                placeholder="Enter role description (optional)"
                value={roleFormData.roleDescription}
                onChange={(e) => setRoleFormData({ ...roleFormData, roleDescription: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-group">
                Group <span className="text-destructive">*</span>
              </Label>
              <Select value={roleFormData.group} onValueChange={(value) => setRoleFormData({ ...roleFormData, group: value })}>
                <SelectTrigger id="add-group">
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setIsAddRoleDialogOpen(false); resetRoleForm(); }}>
              Cancel
            </Button>
            <Button onClick={handleAddRole}>
              <Plus className="size-4 mr-2" />
              Add Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>Update role information and privileges</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-roleName">
                Role Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-roleName"
                placeholder="Enter role name"
                value={roleFormData.roleName}
                onChange={(e) => setRoleFormData({ ...roleFormData, roleName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-roleType">
                Role Type <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-roleType"
                placeholder="Enter role type (lowercase)"
                value={roleFormData.roleType}
                onChange={(e) => setRoleFormData({ ...roleFormData, roleType: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-roleDescription">Role Description</Label>
              <Textarea
                id="edit-roleDescription"
                placeholder="Enter role description (optional)"
                value={roleFormData.roleDescription}
                onChange={(e) => setRoleFormData({ ...roleFormData, roleDescription: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-group">
                Group <span className="text-destructive">*</span>
              </Label>
              <Select value={roleFormData.group} onValueChange={(value) => setRoleFormData({ ...roleFormData, group: value })}>
                <SelectTrigger id="edit-group">
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setIsEditRoleDialogOpen(false); setSelectedRole(null); resetRoleForm(); }}>
              Cancel
            </Button>
            <Button onClick={handleEditRole}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Role Dialog */}
      <AlertDialog open={isDeleteRoleDialogOpen} onOpenChange={setIsDeleteRoleDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the role "{selectedRole?.roleName}"? This action cannot be undone and may affect users assigned to this role.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedRole(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRole} className="bg-destructive hover:bg-destructive/90">
              Delete Role
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
