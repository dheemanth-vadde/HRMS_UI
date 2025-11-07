import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
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
import { Shield, Plus, Edit, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

import { usePermissions } from '../../utils/permissionUtils';

interface Role {
  id: number;
  roleName: string;
  roleType: string;
  roleDescription: string;
  group: string;
}

export function RolesPrivilegesModule() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      roleName: "H Manager",
      roleType: "hmanager",
      roleDescription: "Manager with Analytics permission",
      group: "HR",
    },
    {
      id: 2,
      roleName: "Manager",
      roleType: "manager",
      roleDescription: "",
      group: "Manager",
    },
    {
      id: 3,
      roleName: "Employee",
      roleType: "employee",
      roleDescription: "",
      group: "Employees",
    },
    {
      id: 4,
      roleName: "Manager with Docs",
      roleType: "MgrDocs",
      roleDescription: "Manager with Docs upload option",
      group: "Manager",
    },
    {
      id: 5,
      roleName: "Employee with Docs",
      roleType: "EmpDocs",
      roleDescription: "Employee Role with Docs upload option",
      group: "Employees",
    },
    {
      id: 6,
      roleName: "System Admin Manager",
      roleType: "systemadminmanager",
      roleDescription: "",
      group: "System Admin",
    },
    {
      id: 7,
      roleName: "General Admin",
      roleType: "generaladmin",
      roleDescription: "",
      group: "Manager",
    },
    {
      id: 8,
      roleName: "HR Employee",
      roleType: "hremployee",
      roleDescription: "hr employee",
      group: "HR",
    },
    {
      id: 9,
      roleName: "Recruiter",
      roleType: "domesticrecruitment",
      roleDescription: "Domestic Recruitment",
      group: "HR",
    },
    {
      id: 10,
      roleName: "General Admin Manager",
      roleType: "generaladminmanager",
      roleDescription: "general admin manager",
      group: "Manager",
    },
    {
      id: 11,
      roleName: "Contract Employee",
      roleType: "contemployee",
      roleDescription: "Contract Employee privileges",
      group: "Employees",
    },
    {
      id: 12,
      roleName: "Accountant",
      roleType: "accountant",
      roleDescription: "",
      group: "Manager",
    },
    {
      id: 13,
      roleName: "Higher Management",
      roleType: "hmanagement",
      roleDescription: "",
      group: "Management",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
 const { hasPermission } = usePermissions();
  const [formData, setFormData] = useState({
    roleName: "",
    roleType: "",
    roleDescription: "",
    group: "",
  });

  const groups = [
    "HR",
    "Manager",
    "Employees",
    "System Admin",
    "Management",
    "Finance",
    "IT",
    "Operations",
  ];

  const handleAddRole = () => {
    if (!formData.roleName || !formData.roleType || !formData.group) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newRole: Role = {
      id: roles.length + 1,
      roleName: formData.roleName,
      roleType: formData.roleType,
      roleDescription: formData.roleDescription,
      group: formData.group,
    };

    setRoles([...roles, newRole]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success("Role created successfully");
  };

  const handleEditRole = () => {
    if (!selectedRole) return;

    if (!formData.roleName || !formData.roleType || !formData.group) {
      toast.error("Please fill in all required fields");
      return;
    }

    setRoles(
      roles.map((role) =>
        role.id === selectedRole.id
          ? {
              ...role,
              roleName: formData.roleName,
              roleType: formData.roleType,
              roleDescription: formData.roleDescription,
              group: formData.group,
            }
          : role
      )
    );

    setIsEditDialogOpen(false);
    setSelectedRole(null);
    resetForm();
    toast.success("Role updated successfully");
  };

  const handleDeleteRole = () => {
    if (!selectedRole) return;

    setRoles(roles.filter((role) => role.id !== selectedRole.id));
    setIsDeleteDialogOpen(false);
    setSelectedRole(null);
    toast.success("Role deleted successfully");
  };

  const openEditDialog = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      roleName: role.roleName,
      roleType: role.roleType,
      roleDescription: role.roleDescription,
      group: role.group,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      roleName: "",
      roleType: "",
      roleDescription: "",
      group: "",
    });
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.roleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.roleType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Roles & Privileges</h1>
          <p className="text-muted-foreground mt-1">
            Manage user roles and their access privileges
          </p>
        </div>
        <Button className="btn-gradient-primary" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="size-4 mr-2" />
          Add
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-white shadow-sm">
              <Shield className="size-6 text-primary" />
            </div>
            <div>
              <CardTitle>Roles & Privileges</CardTitle>
              <CardDescription>
                {filteredRoles.length} role{filteredRoles.length !== 1 ? "s" : ""} configured
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  
                  <TableHead className="font-semibold text-base mb-1">Role Name</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Role Type</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Role Description</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Group</TableHead>
                  {(hasPermission('/superadmin/access-control/roles', 'edit') ||
                      hasPermission('/superadmin/access-control/roles', 'delete')) && (
                      <TableHead className="font-semibold text-base mb-1 w-24">
                        Action
                      </TableHead>
                    )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No roles found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRoles.map((role) => (
                    <TableRow key={role.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {hasPermission('/superadmin/access-control/roles', 'edit') && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 text-primary hover:bg-primary/10"
                              onClick={() => openEditDialog(role)}
                            >
                              <Edit className="size-4" />
                            </Button>
                          )}

                          {hasPermission('/superadmin/access-control/roles', 'delete') && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 text-destructive hover:bg-destructive/10"
                              onClick={() => openDeleteDialog(role)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          )}

                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{role.roleName}</TableCell>
                      <TableCell className="text-muted-foreground">{role.roleType}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {role.roleDescription || "-"}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-sm">
                          {role.group}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Role Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                value={formData.roleName}
                onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-roleType">
                Role Type <span className="text-destructive">*</span>
              </Label>
              <Input
                id="add-roleType"
                placeholder="Enter role type (lowercase)"
                value={formData.roleType}
                onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="add-roleDescription">Role Description</Label>
              <Textarea
                id="add-roleDescription"
                placeholder="Enter role description (optional)"
                value={formData.roleDescription}
                onChange={(e) => setFormData({ ...formData, roleDescription: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-group">
                Group <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.group} onValueChange={(value) => setFormData({ ...formData, group: value })}>
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
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            {hasPermission('/superadmin/access-control/roles', 'create') && (
                <Button className="btn-gradient-primary" onClick={handleAddRole}>
                  <Plus className="size-4 mr-2" />
                  Add Role
                </Button>
              )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
                value={formData.roleName}
                onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-roleType">
                Role Type <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-roleType"
                placeholder="Enter role type (lowercase)"
                value={formData.roleType}
                onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-roleDescription">Role Description</Label>
              <Textarea
                id="edit-roleDescription"
                placeholder="Enter role description (optional)"
                value={formData.roleDescription}
                onChange={(e) => setFormData({ ...formData, roleDescription: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-group">
                Group <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.group} onValueChange={(value) => setFormData({ ...formData, group: value })}>
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
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedRole(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button className="btn-gradient-primary" onClick={handleEditRole}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the role "{selectedRole?.roleName}"? This action cannot be undone and may affect users assigned to this role.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedRole(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRole}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete Role
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
