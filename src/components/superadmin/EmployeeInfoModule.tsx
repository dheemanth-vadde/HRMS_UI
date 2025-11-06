import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Search, Plus, Upload, Edit, Trash2, FileSpreadsheet, Mail, Phone, MoreVertical, FileDown, FileUp, Grid3x3, List, Briefcase, Eye, Filter, Delete, LucideDelete } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { EmployeeDetailsView } from "./EmployeeDetailsView";
import { Trash, UserCircle } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
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
// import '../../styles/globals.css';
import data from "../../data.json";
import api from "../../services/interceptors";
import { EMPLOYEE_ENDPOINTS } from "../../services/employeeEndpoints";
import { getValidationError } from "../../utils/validations";
import DEPARTMENT_ENDPOINTS from "../../services/departmentEndpoints";
import DESIGNATION_ENDPOINTS from "../../services/designationEndpoints";
import ROLES_ENDPOINTS from "../../services/rolesEndpoints";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { readExcelFile } from "../../utils/utils";
import Papa from "papaparse";
import BUSSINESSUNIT_ENDPOINTS from "../../services/businessUnitEndpoints";
import { usePermissions } from "../../utils/permissionUtils";

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
  const { hasPermission } = usePermissions();
  const [newEmployee, setNewEmployee] = useState({
    fullName: "",
    personalEmail: "",
    emailAddress: "",
    contactNumber: "",
    deptId: "",         // was department
    designationId: "",  // was designation
    empRole: "",        // was role
    selectedDate: "",   // was joiningDate
    unitId: "",
    managerId: "",    
    userStatus: "Active", // was status
  });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [designations, setDesignations] = useState<{ id: string; name: string }[]>([]);
  const [businessUnits, setBusinessUnits] = useState<{ id: string; name: string }[]>([]);
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const statusOptions = ["Active", "Inactive", "On Leave"];
  const [showFilters, setShowFilters] = useState(false);
const [filteredDepartments, setFilteredDepartments] = useState<{ id: string; name: string }[]>([]);
const [managers, setManagers] = useState<{ id: string; name: string }[]>([]);
  const emptyForm = {
    fullName: "",
    personalEmail: "",
    emailAddress: "",
    contactNumber: "",
    deptId: "",         // was department
    designationId: "",  // was designation
    empRole: "",        // was role
    selectedDate: "",   // was joiningDate
    unitId: "",
    managerId: "",    
    userStatus: "Active", // was status
  }

  const mapEmployeeForUI = (emp: any) => {
    return {
      ...emp,
      department:
        departments.find((d) => d.id === emp.deptId || d.name === emp.deptId)?.name ||
        emp.department ||
        "",
      designation:
        designations.find((d) => d.id === emp.designationId || d.name === emp.designationId)?.name ||
        emp.designation ||
        "",
      role:
        roles.find((r) => r.id === emp.empRole || r.name === emp.empRole)?.name ||
        emp.role ||
        "",
      businessUnit:
        businessUnits.find((b) => b.id === emp.unitId || b.name === emp.unitName)?.name ||
        emp.businessUnit ||
        "",
      // unify status field used in UI
      status: emp.userStatus || emp.status || "",
    };
  };
 
  // remap existing employee list when lookup lists (departments/designations/roles) change
  useEffect(() => {
    setEmployees((prev) => prev.map((e) => mapEmployeeForUI(e)));
  }, [departments, designations, roles, businessUnits]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await api.get(EMPLOYEE_ENDPOINTS.GET_EMPLOYEES);
        // Assuming API returns data in response.data
        const list = response?.data?.data || [];
        setEmployees(list.map((emp: any) => mapEmployeeForUI(emp)));
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
  const fetchManagers = async () => {
    try {
      const response = await api.get(EMPLOYEE_ENDPOINTS.GET_MANAGERS);
      const data = response?.data?.data || [];
      const mappedManagers = data.map((m: any) => ({
        id: m.id,
        name: m.fullName || m.name,
      }));
      setManagers(mappedManagers);
    } catch (err) {
      console.error("Error fetching managers:", err);
      setManagers([]);
    }
  };

  fetchManagers();
}, []);

const fetchDepartmentsByUnit = async (unitId: string) => {
  console.log(unitId,"unitId")
  if (!unitId) {
    setFilteredDepartments([]);
    return;
  }

  try {
    const response = await  api.get(DEPARTMENT_ENDPOINTS.GET_DEPARTMENTS_BY_UNIT(unitId));
    const deptData = response?.data?.data || [];
    const mappedDepartments = deptData.map((d: any) => ({
      id: d.department_id,
      name: d.department_name || "",
    }));
    setFilteredDepartments(mappedDepartments);
    setDepartments(mappedDepartments);
  } catch (err) {
    console.error("Failed to fetch departments by unit", err);
    toast.error("Unable to load departments for this business unit");
    setFilteredDepartments([]);
  }
};


  // useEffect(() => {
  //   const fetchDepartments = async () => {
  //     try {
  //       const response = await api.get(DEPARTMENT_ENDPOINTS.GET_DEPARTMENTS);
  //       const deptData = response?.data?.data || [];
  //       // map to { id, name } for Select usage
  //       const mappedDepartments = deptData.map((d: any) => ({ id: d.department_id, name: d.department_name }));
  //       setDepartments(mappedDepartments);
  //     } catch (err) {
  //       console.error("Error fetching departments:", err);
  //       setDepartments([]); // fallback empty
  //     }
  //   };
    
  //   fetchDepartments();
  // }, []);

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

  useEffect(() => {
    const fetchBusinessUnits = async () => {
      try {
        const response = await api.get(BUSSINESSUNIT_ENDPOINTS.GET_BUSSINESSUNIT);
        const businessUnitData = response?.data?.data || [];
        console.log("Business Units Data:", businessUnitData);
        // map to { id, name } for Select usage
        const mappedBusinessUnits = businessUnitData.map((d: any) => ({ id: d.id, name: d.unitName }));
        setBusinessUnits(mappedBusinessUnits);
      } catch (err) {
        console.error("Error fetching business units:", err);
        setBusinessUnits([]); // fallback empty
      }
    };
    fetchBusinessUnits();
  }, []);

  const handleAdd = async () => {
    const isValid = validateAllNewEmployee();
    if (!isValid) {
      toast.error("Please fix validation errors before adding.");
      return; // stop — errors are shown inline
    }

    try {
      setLoading(true);
      const deptId =
        departments.find((d) => d.id === newEmployee.deptId)?.id ||
        departments.find((d) => d.name === newEmployee.deptId)?.id ||
        "";
      const designationId =
        designations.find((d) => d.id === newEmployee.designationId)?.id ||
        designations.find((d) => d.name === newEmployee.designationId)?.id ||
        "";
      const empRole =
        roles.find((r) => r.id === newEmployee.empRole)?.id ||
        roles.find((r) => r.name === newEmployee.empRole)?.id ||
        "";
      const unitId =
        businessUnits.find((b) => b.id === newEmployee.unitId)?.id ||
        businessUnits.find((b) => b.name === newEmployee.unitId)?.id ||
        "";

      const payload = {
        ...newEmployee,
        deptId,
        designationId,
        empRole,
        unitId,
        managerId: newEmployee.managerId,
        selectedDate: newEmployee.selectedDate || "",
        userStatus: newEmployee.userStatus || "Active",
        firstName: newEmployee.fullName
      };
      console.log("Payload:", payload);
      const response = await api.post(EMPLOYEE_ENDPOINTS.POST_EMPLOYEE, payload);
      const createdEmployee = response.data.data;
      setEmployees([...employees, mapEmployeeForUI(createdEmployee)]);
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
        unitId: "",
        managerId: "",
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
    fetchDepartmentsByUnit(employee.unitId);
    console.log('departments',departments)
    setEditingEmployee({
      ...employee,
      department: departments.find(d => d.id === employee.deptId)?.name || "",
      designation: designations.find(d => d.id === employee.designationId)?.name || "",
      role: roles.find(r => r.id === employee.empRole)?.name || "",
      businessUnit: businessUnits.find(b => b.id === employee.unitId)?.name || "",
      userStatus: employee.userStatus || "Active",
      joiningDate: employee.selectedDate || "",
      managerId: employee.managerId || "",
    });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      // Map names to IDs for API payload
      const payload = {
        ...editingEmployee,
        deptId: departments.find(d => d.name === editingEmployee.department)?.id || "",
        designationId: designations.find(d => d.name === editingEmployee.designation)?.id || "",
        empRole: roles.find(r => r.name === editingEmployee.role)?.id || "",
        unitId: businessUnits.find(b => b.name === editingEmployee.businessUnit)?.id || "",
        managerId: editingEmployee.managerId || "",
        selectedDate: editingEmployee.joiningDate || "",
        userStatus: editingEmployee.userStatus || "Active",
      };

      // Remove name fields not needed by API
      delete payload.department;
      delete payload.designation;
      delete payload.role;
      delete payload.businessUnit;
      delete payload.joiningDate;

      const response = await api.put(EMPLOYEE_ENDPOINTS.UPDATE_EMPLOYEE(editingEmployee.id), payload);
      const updatedEmployee = response.data.data;
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editingEmployee.id ? mapEmployeeForUI(updatedEmployee) : emp))
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
      const usersResponse = await api.get(EMPLOYEE_ENDPOINTS.GET_EMPLOYEES);
      if (usersResponse?.data?.data) {
        setEmployees(usersResponse.data.data.map((emp: any) => mapEmployeeForUI(emp)));
      }
      toast.success("Employee updated successfully!");
    } catch (error: any) {
      console.error("Error updating employee:", error);
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

  const handleDownloadTemplate = async (type: "xlsx" | "csv") => {
    try {
      const response = await api.get(EMPLOYEE_ENDPOINTS.EXCEL_TEMPLATE_DOWNLOAD,
        {
          params: { type }, // if backend expects a query param like ?type=xlsx
          responseType: "blob", // important for file download
        }
      );

      // Determine filename and MIME type
      const fileName =
        type === "xlsx" ? "EmployeeTemplate.xlsx" : "EmployeeTemplate.csv";
      const mimeType =
        type === "xlsx"
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : "text/csv";

      // Create a blob URL and trigger download
      const blob = new Blob([response.data], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Failed to download template:", error);
      // alert("Failed to download the template. Please try again later.");
    }
  };

  const handleBulkUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create a FormData object
    const formData = new FormData();
    formData.append("file", file); // the backend should expect "file" key

    try {
      // Send the file as multipart/form-data
      const response = await api.post(
        EMPLOYEE_ENDPOINTS.BULK_UPLOAD_EMPLOYEES,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ Bulk upload response:", response.data);
      toast.success("Employees uploaded successfully!");

      // Refresh employee list
      const usersResponse = await api.get(EMPLOYEE_ENDPOINTS.GET_EMPLOYEES);
      if (usersResponse?.data?.data) {
        setEmployees(usersResponse.data.data.map((emp: any) => mapEmployeeForUI(emp)));
      }

      setShowAddDialog(false);
    } catch (error) {
      console.error("❌ Bulk upload error:", error);
      toast.error("Error uploading employees. Check console.");
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
      "unitId",
      "managerId",   
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

  const filteredEmployees = Array.isArray(employees)
    ? employees.filter((emp) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          (emp.fullName || "").toLowerCase().includes(q) ||
          (emp.department || "").toLowerCase().includes(q) ||
          (emp.emailAddress || "").toLowerCase().includes(q);
        const matchesDepartment = filterDepartment === "all" || emp.department === filterDepartment;
        const matchesStatus = filterStatus === "all" || emp.status === filterStatus;
        const matchesLocation = filterLocation === "all" || emp.location === filterLocation;
        return matchesSearch && matchesDepartment && matchesStatus && matchesLocation;
      })
    : [];

  const getInitials = (name: string) => {
    if (!name || typeof name !== "string" || name.trim() === "") {
      return "N/A"; // fallback for missing names
    }
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (id: any) => {
    // stable hash function for strings (works for numbers too)
    const hashString = (s: any) => {
      const str = String(s ?? "");
      let h = 0;
      for (let i = 0; i < str.length; i++) {
        h = (h << 5) - h + str.charCodeAt(i);
        h |= 0;
      }
      return Math.abs(h);
    };

    const seed = typeof id === "number" && !Number.isNaN(id) ? Math.floor(id) : hashString(id);
    const colors = [
      "from-blue-400 to-cyan-300",
      "from-purple-400 to-pink-300",
      "from-green-400 to-emerald-300",
      "from-orange-400 to-amber-300",
      "from-pink-400 to-rose-300",
    ];
    return colors[seed % colors.length];
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

  const handleCloseDialog = () => {
    setShowAddDialog(false);
    setNewEmployee(emptyForm);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Employees</h1>
          <p className="text-muted-foreground mt-1">
            {viewOnly ? "View employee records and information" : "Manage employee records and information"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="size-4 mr-2" />
              Filters
            </Button>
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
          {!viewOnly && hasPermission('/employees', 'create') === true && (
            <>
              {/* <Button variant="outline" size="sm">
                <FileUp className="size-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <FileDown className="size-4 mr-2" />
                Export
              </Button> */}
              <Button className="btn-add-purple" onClick={() => setShowAddDialog(true)}>
                <Plus className="size-4 mr-2" />
                Add Employee
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Filters Bar */}
      {showFilters && (
        <Card className="border-[#e5e7eb]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-1 justify-between">
                <div className="relative flex-1 max-w-xs justify-between">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative flex gap-1">
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
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
                  {/* <Select value={filterLocation} onValueChange={setFilterLocation}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {data.locations.map(loc => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Employee Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-columns-three xl:grid-cols-4 gp-4">
          {filteredEmployees.map((employee) => (
            <Card
              key={employee.id}
              onClick={() => setViewingEmployee(employee)}
              className="relative hover:shadow-lg transition-all duration-300 bg-white overflow-hidden group cursor-pointer border-[#e5e7eb]"
            >
              {/* {!viewOnly && (
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
              )} */}
              {!viewOnly && (
                <div className="absolute top-3 right-3 flex items-center gap-2 op-0 group-hover:opacity-100 transition-opacity z-10">
                  {/* ✅ Show Edit button only if user has 'edit' permission */}
                  {hasPermission('/employees', 'edit') === true && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(employee);
                      }}
                      className="size-8 rounded-full bg-[#f5f5f5] hover:bg-gray-300 flex items-center justify-center shadow-sm transition-colors"
                    >
                      <Edit className="size-4 text-gray-600" />
                    </button>
                  )}

                  {/* ✅ Show Delete button only if user has 'delete' permission */}
                  {hasPermission('/employees', 'delete') === true && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(employee.id);
                      }}
                      className="size-8 rounded-full bg-[#f5f5f5] hover:bg-gray-300 flex items-center justify-center shadow-sm transition-colors"
                    >
                      <Trash2 className="size-4 text-gray-600" />
                    </button>
                  )}
                </div>
              )}
              <CardContent className="pp-5">
                {/* Profile Image */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative flex-shrink-0">
                    {employee.avatar ? (
                      <ImageWithFallback
                        src={employee?.avatar}
                        alt={employee?.fullName}
                        className="size-12 rounded-full object-cover ring-2 ring-offset-2 ring-gray-100"
                      />
                    ) : (
                      <div className={cn(
                        "size-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white ring-2 ring-offset-2 ring-gray-100",
                        getAvatarColor(employee.employeeId ?? employee.id)
                      )}>
                        <span className="text-sm font-semibold">{getInitials(employee?.fullName)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-0.5 truncate">{employee.fullName}</h3>
                    <p className="text-xs text-muted-foreground truncate">{employee.designation}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <UserCircle className="size-3.5 flex-shrink-0 text-gray-400" />
                    <span>{employee.employeeId}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <Mail className="size-3.5 flex-shrink-0 text-gray-400" />
                    <span className="truncate">{employee.emailAddress}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <Phone className="size-3.5 flex-shrink-0 text-gray-400" />
                    <span>{employee.contactNumber}</span>
                  </div>
                </div>
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
                  {/* <TableHead className="font-semibold">Position</TableHead> */}
                  <TableHead className="font-semibold">Business Unit</TableHead>
                  <TableHead className="font-semibold">Department</TableHead>
                  <TableHead className="font-semibold">Designation</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  {/* <TableHead className="font-semibold">Type</TableHead> */}
                  <TableHead className="font-semibold">Manager</TableHead>
                  {/* <TableHead className="font-semibold">Reports</TableHead> */}
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-muted/20">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "size-9 rounded-full bg-gradient-to-br flex items-center justify-center text-white",
                            // use the same color selector as grid view
                            getAvatarColor(employee.employeeId ?? employee.id)
                          )}
                        >
                          <span className="text-sm font-medium">
                            {getInitials(employee?.fullName)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{employee.fullName}</div>
                          <div className="text-xs text-muted-foreground">{employee.employeeId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{employee?.businessUnit || ''}</TableCell>
                    <TableCell className="text-sm">{employee.department || ''}</TableCell>
                    <TableCell className="text-sm">{employee.designation || ''}</TableCell>
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
                        {employee.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{employee?.manager || ''}</TableCell>
                    {/* <TableCell className="text-sm">{employee.reports}</TableCell> */}
                    <TableCell>
                      <div className="flex gap-1">
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
      <Dialog open={showAddDialog} onOpenChange={(open: any) => {
          if (!open) handleCloseDialog(); // when modal closes (click outside / Esc)
          else setShowAddDialog(true);    // when modal opens
        }}
      >
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
              <div className="grid grid-cols-2 gp-4">
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
                  {errors["new_fullName"] && (
                    <small className="error_text">{errors["new_fullName"]}</small>
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
                  {errors["new_contactNumber"] && (
                    <small className="error_text">{errors["new_contactNumber"]}</small>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Business Unit *</Label>
                  <Select
                    value={newEmployee.unitId}
                    onValueChange={(value: any) => {
                        setNewEmployee({ ...newEmployee, unitId: value, deptId: "" });
                        fetchDepartmentsByUnit(value); // ✅ dynamic API call
                      }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessUnits.map(unit => (
                        <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors["new_unitId"] && (
                    <small className="error_text">{errors["new_unitId"]}</small>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Department *</Label>
                  <Select
                    value={newEmployee.deptId}
                    onValueChange={(value: any) => setNewEmployee({ ...newEmployee, deptId: value })}
                    disabled={!newEmployee.unitId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={!newEmployee.unitId ? "Select business unit first" : "Select department"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredDepartments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors["new_deptId"] && (
                    <small className="error_text">{errors["new_deptId"]}</small>
                  )}
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
                        <SelectItem key={designation.id} value={designation.name}>{designation.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors["new_designationId"] && (
                    <small className="error_text">{errors["new_designationId"]}</small>
                  )}
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
                        <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors["new_empRole"] && (
                    <small className="error_text">{errors["new_empRole"]}</small>
                  )}
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
                    type="date"
                    placeholder="DD-MM-YYYY"
                    value={newEmployee.selectedDate}
                    onChange={(e) => setNewEmployee({ ...newEmployee, selectedDate: e.target.value })}
                  />
                  {errors["new_selectedDate"] && (
                    <small className="error_text">{errors["new_selectedDate"]}</small>
                  )}
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
                  {errors["new_userStatus"] && (
                    <small className="error_text">{errors["new_userStatus"]}</small>
                  )}
                </div>
                <div className="space-y-2">
                      <Label>Reporting Manager *</Label>
                      <Select
                        value={newEmployee.managerId}
                        onValueChange={(value: any) => setNewEmployee({ ...newEmployee, managerId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select reporting manager" />
                        </SelectTrigger>
                        <SelectContent>
                          {managers.map(manager => (
                            <SelectItem key={manager.id} value={manager.id}>
                              {manager.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors["new_managerId"] && (
                        <small className="error_text">{errors["new_managerId"]}</small>
                      )}
                    </div>
               
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setShowAddDialog(false);
                  setNewEmployee(emptyForm);
                  setErrors({});
                }}>
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
                  <div className="flex justify-center gp-4">
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
                  <div className="flex justify-center gp-4">
                    {/* <div>
                      <input
                        type="file"
                        accept=".csv"
                        className="hidden"
                        id="csv-upload-employee"
                        onChange={(e) => handleBulkUpload(e)}
                      />
                      <Button type="button" variant="outline" onClick={() => document.getElementById('csv-upload-employee')?.click()}>
                        <Upload className="size-4 mr-2" />
                        Upload CSV
                      </Button>
                    </div> */}
                    <div>
                      <input
                        type="file"
                        accept=".xlsx,.xls"
                        className="hidden"
                        id="bulk-upload"
                        onChange={(e) => handleBulkUpload(e)}
                      />
                      <Button type="button" onClick={() => document.getElementById('bulk-upload')?.click()}>
                        <Upload className="size-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Required Columns:</p>
                    <div className="grid grid-columns-three gap-2 text-xs text-muted-foreground">
                      {/* <span>• Employee ID</span> */}
                      <span>• Full Name</span>
                      <span>• Personal Email</span>
                      <span>• Company Email</span>
                      <span>• Phone Number</span>
                      <span>• Business Unit</span>
                      <span>• Department</span>
                      <span>• Designation</span>
                      <span>• Role</span>
                      <span>• Joining Date</span>
                      {/* <span>• Location</span> */}
                      <span>• Status</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Download template: <button className="text-primary hover:underline" onClick={() => handleDownloadTemplate("csv")}>CSV</button> | <button className="text-primary hover:underline" onClick={() => handleDownloadTemplate("xlsx")}>XLSX</button>
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
            <div className="grid grid-cols-2 gp-4 mt-4">
              <div className="space-y-2">
                <Label>Employee ID *</Label>
                <Input
                  value={editingEmployee.employeeId}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, employeeId: e.target.value })}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input
                  value={editingEmployee.fullName}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, fullName: e.target.value })}
                  onBlur={(e) => validateField("fullName", e.target.value)}
                />
                {errors["new_fullName"] && (
                  <small className="error_text">{errors["new_fullName"]}</small>
                )}
              </div>
              <div className="space-y-2">
                <Label>Personal Email *</Label>
                <Input
                  type="email"
                  value={editingEmployee.personalEmail}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, personalEmail: e.target.value })}
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
                  value={editingEmployee.emailAddress}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, emailAddress: e.target.value })}
                  onBlur={(e) => validateField("emailAddress", e.target.value)}
                />
                {errors["new_emailAddress"] && (
                  <small className="error_text">{errors["new_emailAddress"]}</small>
                )}
              </div>
              <div className="space-y-2">
                <Label>Phone Number *</Label>
                <Input
                  value={editingEmployee.contactNumber}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, contactNumber: e.target.value })}
                  onBlur={(e) => validateField("contactNumber", e.target.value)}
                />
                {errors["new_contactNumber"] && (
                  <small className="error_text">{errors["new_contactNumber"]}</small>
                )}
              </div>
              <div className="space-y-2">
                  <Label>Business Unit *</Label>
                  <Select
                    value={businessUnits.find(u => u.name === editingEmployee.businessUnit)?.id || editingEmployee.unitId}
                    onValueChange={(value: any) => {
                      setEditingEmployee({ ...editingEmployee, unitId: value, department: "" });
                      fetchDepartmentsByUnit(value); // ✅ fetch depts by selected business unit
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessUnits.map(unit => (
                        <SelectItem key={unit.id} value={unit.id}>
                          {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors["new_unitId"] && (
                    <small className="error_text">{errors["new_unitId"]}</small>
                  )}
                </div>

             <div className="space-y-2">
                  <Label>Department *</Label>
                  <Select
                    value={
                      filteredDepartments.find(d => d.name === editingEmployee.department)?.id ||
                      editingEmployee.deptId
                    }
                    onValueChange={(value: any) =>
                      setEditingEmployee({ ...editingEmployee, deptId: value })
                    }
                    disabled={!editingEmployee.unitId}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !editingEmployee.unitId
                            ? "Select business unit first"
                            : "Select department"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredDepartments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors["new_deptId"] && (
                    <small className="error_text">{errors["new_deptId"]}</small>
                  )}
                </div>

              <div className="space-y-2">
                <Label>Designation *</Label>
                <Select
                  value={editingEmployee.designation}
                  onValueChange={(value: any) => setEditingEmployee({ ...editingEmployee, designation: value })}
                  onBlur={(e: any) => validateField("designation", e.target.value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {designations.map(designation => (
                      <SelectItem key={designation.id} value={designation.name}>{designation.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors["new_designation"] && (
                  <small className="error_text">{errors["new_designation"]}</small>
                )}
              </div>
              <div className="space-y-2">
                <Label>Role *</Label>
                <Select
                  value={editingEmployee.role}
                  onValueChange={(value: any) => setEditingEmployee({ ...editingEmployee, role: value })}
                  onBlur={(e: any) => validateField("role", e.target.value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors["new_role"] && (
                  <small className="error_text">{errors["new_role"]}</small>
                )}
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
                  type="date"
                  placeholder="DD-MM-YYYY"
                  value={editingEmployee.joiningDate}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, joiningDate: e.target.value })}
                  onBlur={(e) => validateField("joiningDate", e.target.value)}
                />
                {errors["new_joiningDate"] && (
                  <small className="error_text">{errors["new_joiningDate"]}</small>
                )}
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
                <Label>Reporting Manager *</Label>
                <Select
                  value={editingEmployee.managerId}
                  onValueChange={(value: any) => setEditingEmployee({ ...editingEmployee, managerId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reporting manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {managers.map(manager => (
                      <SelectItem key={manager.id} value={manager.id}>
                        {manager.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors["new_managerId"] && (
                  <small className="error_text">{errors["new_managerId"]}</small>
                )}
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={editingEmployee.userStatus}
                  onValueChange={(value: any) => setEditingEmployee({ ...editingEmployee, userStatus: value })}
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
