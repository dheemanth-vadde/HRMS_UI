import { useState, useEffect } from "react";
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
import '../../styles/globals.css';
import data from "../../data.json";
import api from "../../services/interceptors";
import { EMPLOYEE_ENDPOINTS } from "../../services/employeeEndpoints";
import { getValidationError } from "../../utils/validations";
import DEPARTMENT_ENDPOINTS from "../../services/departmentEndpoints";
import DESIGNATION_ENDPOINTS from "../../services/designationEndpoints";
import ROLES_ENDPOINTS from "../../services/rolesEndpoints";

interface EmployeeInfoModuleProps {
  viewOnly?: boolean;
}

export function EmployeeInfoModule({ viewOnly = false }: EmployeeInfoModuleProps) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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
    fullName: "",
    personalEmail: "",
    emailAddress: "",
    contactNumber: "",
    deptId: "",         // was department
    designationId: "",  // was designation
    empRole: "",        // was role
    selectedDate: "",   // was joiningDate
    userStatus: "Active", // was status
  });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [designations, setDesignations] = useState<{ id: string; name: string }[]>([]);
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await api.get(EMPLOYEE_ENDPOINTS.GET_EMPLOYEES);
        // Assuming API returns data in response.data
        setEmployees(response?.data?.data);
        console.log(response?.data?.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setEmployees(data.employees); // fallback to static data
        // setError("Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get(DEPARTMENT_ENDPOINTS.GET_DEPARTMENTS);
        const deptData = response?.data?.data || [];
        // map to { id, name } for Select usage
        const mappedDepartments = deptData.map((d: any) => ({ id: d.id, name: d.deptName }));
        setDepartments(mappedDepartments);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setDepartments([]); // fallback empty
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await api.get(DESIGNATION_ENDPOINTS.GET_DESIGNATIONS);
        const designationData = response?.data?.data || [];
        // map to { id, name } for Select usage
        const mappedDesignations = designationData.map((d: any) => ({ id: d.id, name: d.designationName }));
        setDesignations(mappedDesignations);
      } catch (err) {
        console.error("Error fetching designations:", err);
        setDesignations([]); // fallback empty
      }
    };
    fetchDesignations();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get(ROLES_ENDPOINTS.GET_ROLES);
        const rolesData = response?.data?.data || [];
        // map to { id, name } for Select usage
        const mappedRoles = rolesData.map((d: any) => ({ id: d.id, name: d.roleName }));
        setRoles(mappedRoles);
      } catch (err) {
        console.error("Error fetching roles:", err);
        setRoles([]); // fallback empty
      }
    };
    fetchRoles();
  }, []);

  const handleAdd = async () => {
    const isValid = validateAllNewEmployee();
    if (!isValid) {
      toast.error("Please fix validation errors before adding.");
      return; // stop — errors are shown inline
    }

    try {
      setLoading(true);
      const response = await api.post(EMPLOYEE_ENDPOINTS.POST_EMPLOYEE, newEmployee);
      const createdEmployee = response.data.data;
      setEmployees([...employees, createdEmployee]);
      setShowAddDialog(false);
      setNewEmployee({
        fullName: "",
        personalEmail: "",
        emailAddress: "",
        contactNumber: "",
        deptId: "",
        designationId: "",
        empRole: "",
        selectedDate: "",
        userStatus: "Active",
      });

      // Clear errors
      setErrors(prev => {
        const copy = { ...prev };
        Object.keys(copy).forEach(k => {
          if (k.startsWith("new_")) copy[k] = null;
        });
        return copy;
      });

      toast.success("Employee added successfully!");
    } catch (error: any) {
      console.error("Error creating employee:", error);
      // toast.error(error?.response?.data?.message || "Failed to add employee.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (employee: any) => {
    setEditingEmployee({ ...employee });
  };

  const handleUpdate = async () => {
    // const isValid = validateAllNewEmployee();
    // if (!isValid) {
    //   toast.error("Please fix validation errors before updating.");
    //   return;
    // }
    try {
      setLoading(true);
      const response = await api.put(
        `${EMPLOYEE_ENDPOINTS.UPDATE_EMPLOYEE}/${editingEmployee.id}`,
        editingEmployee
      );
      const updatedEmployee = response.data.data;
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployee.id ? updatedEmployee : emp
        )
      );
      setEditingEmployee(null);
      setShowAddDialog(false);
      setErrors((prev) => {
        const copy = { ...prev };
        Object.keys(copy).forEach((k) => {
          if (k.startsWith("new_")) copy[k] = null;
        });
        return copy;
      });
      toast.success("Employee updated successfully!");
    } catch (error: any) {
      console.error("Error updating employee:", error);
      // toast.error(error?.response?.data?.message || "Failed to update employee.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setEmployeeToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (employeeToDelete !== null) {
      try {
        await api.delete(EMPLOYEE_ENDPOINTS.DELETE_EMPLOYEE(employeeToDelete));
        setEmployees(employees.filter(e => e.id !== employeeToDelete));
        toast.success("Employee deleted successfully!");
      } catch (error) {
        console.error("Error deleting employee:", error);
        // toast.error("Failed to delete employee. Please try again.");
      } finally {
        setDeleteConfirmOpen(false);
        setEmployeeToDelete(null);
      }
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>, type: 'csv' | 'xlsx') => {
    const file = event.target.files?.[0];
    if (file) {
      toast.success(`${type.toUpperCase()} file "${file.name}" uploaded successfully!`);
      setShowAddDialog(false);
    }
  };

  const validateField = (field: string, value: string): string | null => {
    let error: string | null = null;
    if (!value || value.trim() === "") {
      error = "This field is required.";
    }

    // email / phone format checks (only if not empty)
    if (!error) {
      if (field === "personalEmail" || field === "emailAddress") {
        error = getValidationError("email", value);
      } else if (field === "contactNumber") {
        error = getValidationError("phone", value);
      }
    }

    setErrors(prev => ({ ...prev, [`new_${field}`]: error }));
    return error;
  };

  // validate all required fields for newEmployee on submit
  const validateAllNewEmployee = (): boolean => {
    const requiredFields = [
      "fullName",
      "personalEmail",
      "emailAddress",
      "contactNumber",
      "deptId",
      "designationId",
      "empRole",
      "selectedDate",
    ];

    const newErrors: { [key: string]: string | null } = { ...errors };

    requiredFields.forEach(field => {
      const value = (newEmployee as any)[field] ?? "";
      let error: string | null = null;

      if (!value || String(value).trim() === "") {
        error = "This field is required.";
      } else {
        if (field === "personalEmail" || field === "emailAddress") {
          error = getValidationError("email", value);
        } else if (field === "contactNumber") {
          error = getValidationError("phone", value);
        }
      }
      newErrors[`new_${field}`] = error;
    });

    setErrors(newErrors);
    // if any error exists -> return false (invalid)
    return !Object.values(newErrors).some(v => v !== null);
  };
  console.log(employees)
  const filteredEmployees = Array.isArray(employees)
  ? employees.filter(emp => {
      const matchesSearch = emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.deptId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = filterDepartment === "all" || emp.deptId === filterDepartment;
      const matchesStatus = filterStatus === "all" || emp.status === filterStatus;
      const matchesLocation = filterLocation === "all" || emp.location === filterLocation;
      return matchesSearch && matchesDepartment && matchesStatus && matchesLocation;
    })
  : [];

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
                  {departments.map(dept => (
                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
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
                    getAvatarColor(employee.employeeId)
                  )}>
                    <span className="text-xl font-bold">{getInitials(employee.fullName)}</span>
                  </div>
                </div>

                {/* Employee Name */}
                <h3 className="font-semibold text-base mb-1">{employee.fullName}</h3>
                
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
                    <span>{employee.contactNumber}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Mail className="size-3.5 flex-shrink-0" />
                    <span className="truncate">{employee.emailAddress}</span>
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
                            {getInitials(employee.fullName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{employee.fullName}</div>
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
                {/* <div className="space-y-2">
                  <Label>Employee ID *</Label>
                  <Input
                    placeholder="e.g., PNB011"
                    value={newEmployee.employeeId}
                    onChange={(e) => setNewEmployee({ ...newEmployee, employeeId: e.target.value })}
                  />
                </div> */}
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    placeholder="Enter full name"
                    value={newEmployee.fullName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, fullName: e.target.value })}
                    onBlur={(e) => validateField("fullName", e.target.value)}
                  />
                  {errors["new_name"] && (
                    <small className="error_text">{errors["new_name"]}</small>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Personal Email *</Label>
                  <Input
                    type="email"
                    placeholder="personal.email@gmail.com"
                    value={newEmployee.personalEmail}
                    onChange={(e) => setNewEmployee({ ...newEmployee, personalEmail: e.target.value })}
                    onBlur={(e) => validateField("personalEmail", e.target.value)}
                  />
                  {errors["new_personalEmail"] && (
                    <small className="error_text">{errors["new_personalEmail"]}</small>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Company Email *</Label>
                  <Input
                    type="email"
                    placeholder="employee@sentrifugo.in"
                    value={newEmployee.emailAddress}
                    onChange={(e) => setNewEmployee({ ...newEmployee, emailAddress: e.target.value })}
                    onBlur={(e) => validateField("emailAddress", e.target.value)}
                  />
                  {errors["new_emailAddress"] && (
                    <small className="error_text">{errors["new_emailAddress"]}</small>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  <Input
                    placeholder="9876543210"
                    value={newEmployee.contactNumber}
                    onChange={(e) => setNewEmployee({ ...newEmployee, contactNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Department *</Label>
                  <Select
                    value={newEmployee.deptId}
                    onValueChange={(value: any) => setNewEmployee({ ...newEmployee, deptId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Designation *</Label>
                  <Select
                    value={newEmployee.designationId}
                    onValueChange={(value: any) => setNewEmployee({ ...newEmployee, designationId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      {designations.map(designation => (
                        <SelectItem key={designation.id} value={designation.id}>{designation.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Role *</Label>
                  <Select
                    value={newEmployee.empRole}
                    onValueChange={(value: any) => setNewEmployee({ ...newEmployee, empRole: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="space-y-2">
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
                </div> */}
                <div className="space-y-2">
                  <Label>Joining Date *</Label>
                  <Input
                    placeholder="DD-MM-YYYY"
                    value={newEmployee.selectedDate}
                    onChange={(e) => setNewEmployee({ ...newEmployee, selectedDate: e.target.value })}
                  />
                </div>
                {/* <div className="space-y-2">
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
                </div> */}
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={newEmployee.userStatus}
                    onValueChange={(value: any) => setNewEmployee({ ...newEmployee, userStatus: value })}
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
              {/* <div className="space-y-2">
                <Label>Employee ID *</Label>
                <Input
                  value={editingEmployee.employeeId}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, employeeId: e.target.value })}
                  disabled
                />
              </div> */}
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input
                  value={editingEmployee.fullName}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, fullName: e.target.value })}
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
                  value={editingEmployee.emailAddress}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, emailAddress: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone Number *</Label>
                <Input
                  value={editingEmployee.contactNumber}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, contactNumber: e.target.value })}
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
                    {departments.map(dept => (
                      <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
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
                    {designations.map(designation => (
                      <SelectItem key={designation.id} value={designation.id}>{designation.name}</SelectItem>
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
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* <div className="space-y-2">
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
              </div> */}
              {/* <div className="space-y-2">
                <Label>Manager</Label>
                <Input
                  value={editingEmployee.manager}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, manager: e.target.value })}
                />
              </div> */}
              {/* <div className="space-y-2">
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
              </div> */}
              <div className="space-y-2">
                <Label>Joining Date *</Label>
                <Input
                  placeholder="DD-MM-YYYY"
                  value={editingEmployee.joiningDate}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, joiningDate: e.target.value })}
                />
              </div>
              {/* <div className="space-y-2">
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
              </div> */}
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
