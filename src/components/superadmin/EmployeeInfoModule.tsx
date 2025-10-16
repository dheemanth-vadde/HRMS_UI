import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Search, Plus, Upload, Edit, Trash2, FileSpreadsheet, Mail, Phone, MoreVertical, FileDown, FileUp, Grid3x3, List, Briefcase, Eye, Filter, Delete, LucideDelete } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { EmployeeDetailsView } from "./EmployeeDetailsView";
import { Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { cn } from "../ui/utils";
import data from "../../data.json";

interface EmployeeInfoModuleProps {
  viewOnly?: boolean;
}

export function EmployeeInfoModule({ viewOnly = false }: EmployeeInfoModuleProps) {
  const [employees, setEmployees] = useState(data.employees);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [viewingEmployee, setViewingEmployee] = useState<any>(null);
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [newEmployee, setNewEmployee] = useState({
    employeeId: "",
    name: "",
    personalEmail: "",
    companyEmail: "",
    phone: "",
    department: "",
    designation: "",
    role: "",
    project: "",
    joiningDate: "",
    location: "Head Office",
    status: "Active",
    type: "Full-time",
    manager: "",
    reports: 0,
  });

  const handleAdd = () => {
    const employeeToAdd = {
      id: employees.length + 1,
      ...newEmployee,
    };
    setEmployees([...employees, employeeToAdd]);
    setShowAddDialog(false);
    setNewEmployee({
      employeeId: "",
      name: "",
      personalEmail: "",
      companyEmail: "",
      phone: "",
      department: "",
      designation: "",
      role: "",
      project: "",
      joiningDate: "",
      location: "Head Office",
      status: "Active",
      type: "Full-time",
      manager: "",
      reports: 0,
    });
    toast.success("Employee added successfully!");
  };

  const handleEdit = (employee: any) => {
    setEditingEmployee({ ...employee });
  };

  const handleUpdate = () => {
    setEmployees(employees.map(e => e.id === editingEmployee.id ? editingEmployee : e));
    setEditingEmployee(null);
    toast.success("Employee updated successfully!");
  };

  const handleDeleteClick = (id: number) => {
    setEmployeeToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (employeeToDelete !== null) {
      setEmployees(employees.filter(e => e.id !== employeeToDelete));
      toast.success("Employee deleted successfully!");
      setDeleteConfirmOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>, type: 'csv' | 'xlsx') => {
    const file = event.target.files?.[0];
    if (file) {
      toast.success(`${type.toUpperCase()} file "${file.name}" uploaded successfully!`);
      setShowAddDialog(false);
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || emp.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || emp.status === filterStatus;
    const matchesLocation = filterLocation === "all" || emp.location === filterLocation;
    return matchesSearch && matchesDepartment && matchesStatus && matchesLocation;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (id: number) => {
    const colors = [
      "from-blue-400 to-cyan-300",
      "from-purple-400 to-pink-300",
      "from-green-400 to-emerald-300",
      "from-orange-400 to-amber-300",
      "from-pink-400 to-rose-300",
    ];
    return colors[id % colors.length];
  };

  // If viewing an employee, show the details view
  if (viewingEmployee) {
    return (
      <EmployeeDetailsView
        employee={viewingEmployee}
        onBack={() => setViewingEmployee(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Employee</h1>
          <p className="text-muted-foreground mt-1">
            {viewOnly ? "View employee records and information" : "Manage employee records and information"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!viewOnly && (
            <>
              <Button variant="outline" size="sm">
                <FileUp className="size-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <FileDown className="size-4 mr-2" />
                Export
              </Button>
              <Button className="btn-add-purple" onClick={() => setShowAddDialog(true)}>
                <Plus className="size-4 mr-2" />
                Add Employee
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="border-[#e5e7eb]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {data.departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {data.locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="size-4 mr-2" />
                More Filters
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className={cn("rounded-r-none", viewMode === "grid" && "bg-primary text-white hover:bg-primary/90")}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="size-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className={cn("rounded-l-none border-l", viewMode === "list" && "bg-primary text-white hover:bg-primary/90")}
                  onClick={() => setViewMode("list")}
                >
                  <List className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="relative hover:shadow-xl transition-all duration-300 bg-white overflow-hidden group">
              {/* Edit Menu - Top Right */}
              {!viewOnly && (
                <div className="absolute top-3 right-3 z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-7 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm hover:bg-white">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(employee)}>
                        <Edit className="size-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDeleteClick(employee.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              <CardContent className="p-6 flex flex-col items-center text-center">
                {/* Profile Image */}
                <div className="mb-4 relative">
                  <div className={cn(
                    "size-20 rounded-full bg-gradient-to-br flex items-center justify-center text-white shadow-lg",
                    getAvatarColor(employee.id)
                  )}>
                    <span className="text-xl font-bold">{getInitials(employee.name)}</span>
                  </div>
                </div>

                {/* Employee Name */}
                <h3 className="font-semibold text-base mb-1">{employee.name}</h3>
                
                {/* Designation */}
                <p className="text-sm text-muted-foreground mb-1">{employee.designation}</p>

                {/* Project Name */}
                {employee.project && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <Briefcase className="size-3" />
                    <span>{employee.project}</span>
                  </div>
                )}

                {/* Contact Info */}
                <div className="w-full space-y-2 mb-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Phone className="size-3.5 flex-shrink-0" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Mail className="size-3.5 flex-shrink-0" />
                    <span className="truncate">{employee.companyEmail}</span>
                  </div>
                </div>

                {/* View Profile Button */}
                <button 
                  onClick={() => setViewingEmployee(employee)}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View profile &rarr;
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-[#e5e7eb]">
          {/* <CardHeader className="border-b bg-white">
            <div className="flex items-center justify-between">
              <CardTitle>Employees ({filteredEmployees.length})</CardTitle>
            </div>
          </CardHeader> */}
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="font-semibold">Employee</TableHead>
                  <TableHead className="font-semibold">Position</TableHead>
                  <TableHead className="font-semibold">Department</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Manager</TableHead>
                  <TableHead className="font-semibold">Reports</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-muted/20">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback 
                            className="text-sm font-medium"
                            style={{
                              backgroundColor: `hsl(${(employee.id * 137.5) % 360}, 65%, 85%)`,
                              color: `hsl(${(employee.id * 137.5) % 360}, 45%, 35%)`
                            }}
                          >
                            {getInitials(employee.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{employee.name}</div>
                          <div className="text-xs text-muted-foreground">{employee.employeeId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{employee.designation}</TableCell>
                    <TableCell className="text-sm">{employee.department}</TableCell>
                    <TableCell className="text-sm">{employee.location}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "font-medium border",
                          employee.status === "Active" && "bg-green-50 text-green-700 border-green-200",
                          employee.status === "Inactive" && "bg-gray-50 text-gray-700 border-gray-200",
                          employee.status === "On Leave" && "bg-yellow-50 text-yellow-700 border-yellow-200"
                        )}
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className="font-medium bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {employee.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{employee.manager}</TableCell>
                    <TableCell className="text-sm">{employee.reports}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="size-8 hover:bg-muted"
                          onClick={() => setViewingEmployee(employee)}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="size-8 hover:bg-muted"
                        >
                          <Mail className="size-4" />
                        </Button>
                        {!viewOnly && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="size-8 hover:bg-muted"
                              onClick={() => handleEdit(employee)}
                            >
                              <Edit className="size-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="size-8 hover:bg-muted"
                                 onClick={() => handleDeleteClick(employee.id)}
                                 >
                               <Trash className="size-4" />
                            
                            </Button>
                            
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Summary */}
      <div className="text-sm text-muted-foreground text-center">
        Showing {filteredEmployees.length} of {employees.length} employees
      </div>

      {/* Add/Import Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogDescription>
              Choose to add manually or import from CSV/XLSX file
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="import">Import File</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Employee ID *</Label>
                  <Input
                    placeholder="e.g., PNB011"
                    value={newEmployee.employeeId}
                    onChange={(e) => setNewEmployee({ ...newEmployee, employeeId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    placeholder="Enter full name"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Personal Email *</Label>
                  <Input
                    type="email"
                    placeholder="personal.email@gmail.com"
                    value={newEmployee.personalEmail}
                    onChange={(e) => setNewEmployee({ ...newEmployee, personalEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company Email *</Label>
                  <Input
                    type="email"
                    placeholder="employee@pnb.co.in"
                    value={newEmployee.companyEmail}
                    onChange={(e) => setNewEmployee({ ...newEmployee, companyEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  <Input
                    placeholder="+91 98765 43210"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Department *</Label>
                  <Select
                    value={newEmployee.department}
                    onValueChange={(value: any) => setNewEmployee({ ...newEmployee, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Designation *</Label>
                  <Select
                    value={newEmployee.designation}
                    onValueChange={(value: any) => setNewEmployee({ ...newEmployee, designation: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.designations.map(designation => (
                        <SelectItem key={designation} value={designation}>{designation}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Role *</Label>
                  <Select
                    value={newEmployee.role}
                    onValueChange={(value: any) => setNewEmployee({ ...newEmployee, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.roles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Project</Label>
                  <Select
                    value={newEmployee.project}
                    onValueChange={(value: any) => setNewEmployee({ ...newEmployee, project: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.projects.map(project => (
                        <SelectItem key={project} value={project}>{project}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Joining Date *</Label>
                  <Input
                    placeholder="DD-MM-YYYY"
                    value={newEmployee.joiningDate}
                    onChange={(e) => setNewEmployee({ ...newEmployee, joiningDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location *</Label>
                  <Select
                    value={newEmployee.location}
                    onValueChange={(value: any) => setNewEmployee({ ...newEmployee, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {data.locations.map(loc => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={newEmployee.status}
                    onValueChange={(value: any) => setNewEmployee({ ...newEmployee, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button className="btn-add-purple" onClick={handleAdd}>
                  <Plus className="size-4 mr-2" />
                  Add Employee
                </Button>
              </DialogFooter>
            </TabsContent>

            <TabsContent value="import" className="space-y-4 mt-4">
              <div className="border-2 border-dashed rounded-lg p-8">
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                      <FileSpreadsheet className="size-12 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Upload Employee Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Support for CSV and XLSX formats
                    </p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <div>
                      <input
                        type="file"
                        accept=".csv"
                        className="hidden"
                        id="csv-upload-employee"
                        onChange={(e) => handleFileImport(e, 'csv')}
                      />
                      <Button type="button" variant="outline" onClick={() => document.getElementById('csv-upload-employee')?.click()}>
                        <Upload className="size-4 mr-2" />
                        Upload CSV
                      </Button>
                    </div>
                    <div>
                      <input
                        type="file"
                        accept=".xlsx,.xls"
                        className="hidden"
                        id="xlsx-upload-employee"
                        onChange={(e) => handleFileImport(e, 'xlsx')}
                      />
                      <Button type="button" onClick={() => document.getElementById('xlsx-upload-employee')?.click()}>
                        <Upload className="size-4 mr-2" />
                        Upload XLSX
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Required Columns:</p>
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <span>• Employee ID</span>
                      <span>• Full Name</span>
                      <span>• Email</span>
                      <span>• Phone</span>
                      <span>• Department</span>
                      <span>• Designation</span>
                      <span>• Joining Date</span>
                      <span>• Location</span>
                      <span>• Status</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Download template: <button className="text-primary hover:underline">CSV</button> | <button className="text-primary hover:underline">XLSX</button>
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      {editingEmployee && (
        <Dialog open={!!editingEmployee} onOpenChange={() => setEditingEmployee(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
              <DialogDescription>
                Update employee information
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Employee ID *</Label>
                <Input
                  value={editingEmployee.employeeId}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, employeeId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input
                  value={editingEmployee.name}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Personal Email *</Label>
                <Input
                  type="email"
                  value={editingEmployee.personalEmail}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, personalEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Company Email *</Label>
                <Input
                  type="email"
                  value={editingEmployee.companyEmail}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, companyEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone Number *</Label>
                <Input
                  value={editingEmployee.phone}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Department *</Label>
                <Select
                  value={editingEmployee.department}
                  onValueChange={(value: any) => setEditingEmployee({ ...editingEmployee, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {data.departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Designation *</Label>
                <Select
                  value={editingEmployee.designation}
                  onValueChange={(value: any) => setEditingEmployee({ ...editingEmployee, designation: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {data.designations.map(designation => (
                      <SelectItem key={designation} value={designation}>{designation}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Role *</Label>
                <Select
                  value={editingEmployee.role}
                  onValueChange={(value: any) => setEditingEmployee({ ...editingEmployee, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {data.roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Type *</Label>
                <Select
                  value={editingEmployee.type}
                  onValueChange={(value: any) => setEditingEmployee({ ...editingEmployee, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Manager</Label>
                <Input
                  value={editingEmployee.manager}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, manager: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Project</Label>
                <Select
                  value={editingEmployee.project}
                  onValueChange={(value: any) => setEditingEmployee({ ...editingEmployee, project: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.projects.map(project => (
                      <SelectItem key={project} value={project}>{project}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Joining Date *</Label>
                <Input
                  placeholder="DD-MM-YYYY"
                  value={editingEmployee.joiningDate}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, joiningDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Location *</Label>
                <Select
                  value={editingEmployee.location}
                  onValueChange={(value: any) => setEditingEmployee({ ...editingEmployee, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {data.locations.map(loc => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={editingEmployee.status}
                  onValueChange={(value: any) => setEditingEmployee({ ...editingEmployee, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingEmployee(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate}>
                <Edit className="size-4 mr-2" />
                Update Employee
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the employee record from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
