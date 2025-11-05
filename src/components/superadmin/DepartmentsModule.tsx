import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Briefcase, Search, RefreshCw, Plus, Upload, Edit, Trash2, FileSpreadsheet, MoreVertical } from "lucide-react";
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
import { toast } from "sonner";
import { getValidationError } from "../../utils/validations";
import api from '../../services/interceptors';
import DEPARTMENT_ENDPOINTS from "../../services/departmentEndpoints";
import BUSSINESSUNIT_ENDPOINTS from "../../services/businessUnitEndpoints";
import EMPLOYEE_ENDPOINTS from "../../services/employeeEndpoints";
import TIMEZONE_ENDPOINTS from "../../services/timeZoneEndpoints";
import { usePermissions } from "../../utils/permissionUtils";

interface DepartmentsModuleProps {
  viewOnly?: boolean;
}

export function DepartmentsModule({ viewOnly = false }: DepartmentsModuleProps) {
  const [departments, setDepartments] = useState<any[]>([]);
  const [businessUnits, setBusinessUnits] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [timezones, setTimezones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingDept, setEditingDept] = useState<any>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deptToDelete, setDeptToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
       const { hasPermission } = usePermissions();
  const [newDept, setNewDept] = useState({
    deptName: "",
    deptCode: "",
    startedOn: "",
    deptHead: "",
    timezoneId: "",
    businessUnit: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default to 10, matching your Select

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const resetNewDept = () => {
    setNewDept({
      deptName: "",
      deptCode: "",
      startedOn: "",
      deptHead: "",
      timezoneId: "",
      businessUnit: "",
    });
    setFormErrors({});
  };
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(DEPARTMENT_ENDPOINTS.GET_DEPARTMENTS).then(res => res.data);
        const mappedData = data.map((dept: any) => ({
          id: dept.id,
          deptName: dept.deptName || "",
          deptCode: dept.deptCode || "",
          startedOn: dept.startDate || "",
          deptHead: dept.deptHead || "",  // store employee ID
          timezoneId: dept.timezoneId,
          businessUnit: dept.unitId,
        }));
        setDepartments(mappedData);
      } catch (err) {
        console.error("Failed to fetch departments", err);
        toast.error("Failed to load departments");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchBusinessUnits = async () => {
      try {
        const response = await api.get(BUSSINESSUNIT_ENDPOINTS.GET_BUSSINESSUNIT);
        const unitsArray = response.data.data; // your API wraps in `data`
        setBusinessUnits(unitsArray);
      } catch (err) {
        console.error("Failed to fetch business units", err);
        toast.error("Failed to load business units");
      }
    };
    const fetchEmployees = async () => {
      try {
        const response = await api.get(EMPLOYEE_ENDPOINTS.GET_EMPLOYEES);
        const employeesArray = response.data.data; // assuming your API wraps results in `data`
        setEmployees(employeesArray);
      } catch (err) {
        console.error("Failed to fetch employees", err);
        toast.error("Failed to load employees");
      }
    };
    const fetchTimezones = async () => {
      try {
        const response = await api.get(TIMEZONE_ENDPOINTS.GET_TIMEZONE);
        const timezonesArray = response.data.data; // assuming your API wraps results in `data`
        setTimezones(timezonesArray);
      } catch (err) {
        console.error("Failed to fetch timezones", err);
        toast.error("Failed to load timezones");
      }
    };

    fetchTimezones();

    fetchEmployees();
    fetchBusinessUnits();
  }, []);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string | null }>({});
  const validateDeptForm = (dept: typeof newDept, idToExclude?: string) => {
    const errors: { [key: string]: string | null } = {};
    const requiredFields: (keyof typeof newDept)[] = [
      "deptName",
      "deptCode",
      "deptHead",
      "startedOn",
      "businessUnit",
      "timezoneId",
    ];

    for (const field of requiredFields) {
      let value = dept[field];

      if (value === undefined || value === null) value = "";

      // --- No leading/trailing spaces ---
      let error = getValidationError(
        "noSpaces",
        value,
        `Field has extra spaces`
      );

      if (error) {
        errors[String(field)] = error;
        continue;
      }

      // --- Required validation ---
      if (["businessUnit", "deptHead", "timezoneId"].includes(field)) {
        // Check for empty, placeholder value, or if the referenced entity doesn't exist
        if (!value || value === "__select_placeholder__" || 
            (field === "businessUnit" && !businessUnits.some(u => u.id === value)) ||
            (field === "deptHead" && !employees.some(e => e.id === value)) ||
            (field === "timezoneId" && !timezones.some(t => t.id === value))) {
          error = "Please select an option";
        }
      } else {
        error = getValidationError("required", value, `This field is required`);
      }

      if (error) {
        errors[String(field)] = error;
        continue;
      }

      // --- Unique validation ---
      if (["deptName", "deptCode"].includes(field)) {
        error = getValidationError("unique", value, "This field already exists", {
          list: departments.filter((d) => d.id !== idToExclude),
          propertyName: field,
        });
        if (error) errors[field] = error;
      }
    }

    return errors;
  };

  const getBusinessUnitName = (unitId: string): string | null => {
    if (!unitId) return null;
    const unit = businessUnits.find(u => u.id === unitId);
    return unit?.unitName || null;
  };

  const getDeptHeadName = (empId: string | null): string => {
    if (!empId) return "-"; // handle null
    const employee = employees.find(emp => emp.id === empId);
    return employee ? employee.fullName || "-" : "-";
  };

  const handleAdd = async () => {
    const errors = validateDeptForm(newDept);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const payload = {
        deptName: newDept.deptName,
        deptCode: newDept.deptCode,
        startDate: newDept.startedOn,
        deptHead: newDept.deptHead,
        timezoneId: newDept.timezoneId,
        unitId: newDept.businessUnit,
      };

      const response = await api.post(DEPARTMENT_ENDPOINTS.POST_DEPARTMENT, payload);
      const addedDept = response.data.data || response.data;

      // Map the API response just like your fetchDepartments
      const mappedDept = {
        id: addedDept.id,
        deptName: addedDept.deptName || "",
        deptCode: addedDept.deptCode || "",
        startedOn: addedDept.startDate ? new Date(addedDept.startDate).toISOString().split("T")[0] : "",
        deptHead: addedDept.deptHead || "",
        timezoneId: addedDept.timezoneId || "",
        businessUnit: addedDept.unitId || "",
      };

      setDepartments((prev) => [mappedDept, ...prev,]);
      setShowAddDialog(false);
      resetNewDept();
      setCurrentPage(1);
      toast.success("Department added successfully!");
    } catch (err) {
      console.error("Failed to add department", err);
      toast.error("Failed to add department");
    }
  };

  const handleEdit = (dept: any) => {
    setEditingDept({
      ...dept,
      id: String(dept.id), // <-- force to string
      deptHead: dept.deptHead || "",
      timezoneId: dept.timezoneId || "",
      businessUnit: dept.unitId || "",
      deptName: dept.deptName || "",
      deptCode: dept.deptCode || "",
      startedOn: dept.startedOn || "",
    });
  };
  const handleUpdate = async () => {
    if (!editingDept) return;

    const errors = validateDeptForm(editingDept, editingDept.id); // pass current unit id
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      // Prepare correct payload
      const payload = {
        id: editingDept.id,
        deptName: editingDept.deptName,
        deptCode: editingDept.deptCode,
        startDate: editingDept.startedOn,
        deptHead: editingDept.deptHead,
        timezoneId: editingDept.timezoneId,
        unitId: editingDept.businessUnit,
      };

      console.log(" Payload for update:", payload);


      const response = await api.put(DEPARTMENT_ENDPOINTS.PUT_DEPARTMENT(editingDept.id),
        payload

      );

      console.log(" Update API response:", response.data);

      // Get updated data correctly
      const updatedDept = response.data.data || response.data;

      // Update local state list
      setDepartments((prev) =>
        prev.map((d) =>
          d.id === editingDept.id
            ? {
              ...d,
              deptName: updatedDept.deptName,
              deptCode: updatedDept.deptCode,
              startedOn: updatedDept.startDate
                ? new Date(updatedDept.startDate).toISOString().split("T")[0]
                : "",
              deptHead: String(updatedDept.deptHead || ""),
              timezoneId: String(updatedDept.timezoneId || ""),
              businessUnit: String(updatedDept.unitId || ""),
            }
            : d
        )
      );

      // Cleanup UI
      setEditingDept(null);
      setShowEditDialog(false);
      setFormErrors({});
      setCurrentPage(1);
      toast.success("Department updated successfully!");
    } catch (err) {
      console.error(" Failed to update department", err);
      toast.error("Failed to update department");
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeptToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deptToDelete !== null) {
      try {
        await api.delete(DEPARTMENT_ENDPOINTS.DELETE_DEPARTMENT(deptToDelete));
        setDepartments(departments.filter(d => d.id !== deptToDelete));
        toast.success("Department deleted successfully!");
        setCurrentPage(1);
      } catch (err) {
        console.error("Failed to delete department", err);
        toast.error("Failed to delete department");
      } finally {
        setDeleteConfirmOpen(false);
        setDeptToDelete(null);
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
  const filteredDepartments = departments.filter(dept =>
    (dept.deptName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (dept.deptCode || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (dept.startedOn || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    getDeptHeadName(dept.deptHead).toLowerCase().includes(searchQuery.toLowerCase()) ||
    (timezones.find(t => t.id === dept.timezoneId)?.timezone || "-").toLowerCase().includes(searchQuery.toLowerCase()) ||
    getBusinessUnitName(dept.businessUnit).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDepartments.length / pageSize);
  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Departments</h1>
          <p className="text-muted-foreground mt-1">
            {viewOnly ? "View organization departments" : "Manage organization departments"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {(!viewOnly && hasPermission('/superadmin/organization/departments', 'create')===true) && (
            <Button className="btn-add-purple" onClick={() => setShowAddDialog(true)}>
              <Plus className="size-4 mr-2" />
              Add Department
            </Button>
          )}
        </div>
      </div>

      {/* Departments Table */}
      <Card className="border-[#e5e7eb]">
        <CardContent className="p-0">
          <div className="rounded-md border-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-base mb-1">Name</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Code</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Started On</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Department Head</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Time Zone</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Business Unit</TableHead>
                    {!viewOnly && (
                      (hasPermission('/superadmin/organization/departments', 'edit') === true ||
                      hasPermission('/superadmin/organization/departments', 'delete') === true) && (
                        <TableHead className="font-semibold text-base mb-1">
                          Actions
                        </TableHead>
                      )
                    )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDepartments.filter(dept => dept.id).length > 0 ? (
                  paginatedDepartments
                    .filter(dept => dept.id) // render only rows with valid IDs
                    .map((dept) => (
                      <TableRow key={dept.id}>
                        <TableCell>{dept.deptName}</TableCell>
                        <TableCell>{dept.deptCode}</TableCell>
                        <TableCell>{dept.startedOn}</TableCell>
                        <TableCell>{getDeptHeadName(dept.deptHead)}</TableCell>
                        <TableCell>{timezones.find(t => t.id === dept.timezoneId)?.timezone || "-"}</TableCell>
                        <TableCell>{getBusinessUnitName(dept.businessUnit) || "-"}</TableCell>
                        <TableCell className="text-right">
                          {!viewOnly && (
                            <div className="flex items-center gap-2">
                              {/* ✅ Show Edit button only if user has 'edit' permission */}
                              {hasPermission('/superadmin/organization/departments', 'edit') === true && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    handleEdit(dept);
                                    setShowEditDialog(true); // open dialog
                                  }}
                                >
                                  <Edit className="size-4 text-gray-500" />
                                </Button>
                              )}

                              {/* ✅ Show Delete button only if user has 'delete' permission */}
                              {hasPermission('/superadmin/organization/departments', 'delete') === true && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteClick(dept.id)}
                                >
                                  <Trash2 className="size-4 text-gray-500" />
                                </Button>
                              )}
                            </div>
                          )}
                        </TableCell>

                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-4">
                      No records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1 || totalPages === 0}  // CHANGED: Enable/disable based on page
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}  // CHANGED: Handle prev
              >
                <span>←</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages || totalPages === 0}  // CHANGED: Enable/disable based on page
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}  // CHANGED: Handle next
              >
                <span>→</span>
              </Button>
              {/* OPTIONAL: Add page info for better UX */}
              <span className="text-sm text-muted-foreground ml-2">
                Page {currentPage} of {totalPages || 1}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Records per page:</span>
              <Select
                value={pageSize.toString()}  // CHANGED: Controlled by pageSize state
                onValueChange={(value: any) => {
                  setPageSize(Number(value));  // CHANGED: Update pageSize
                  setCurrentPage(1);  // CHANGED: Reset to page 1
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Import Dialog */}
      <Dialog open={showAddDialog}
        onOpenChange={(open: boolean) => {
          setShowAddDialog(open);
          if (!open) resetNewDept(); // Reset the form when dialog is closed
        }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Department</DialogTitle>
            <DialogDescription>
              Choose to add manually or import from CSV/XLSX file
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-columns-two">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="import">Import File</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4 mtop-4">
              <div className="grid grid-columns-two gp-4">
                <div className="space-y-2">
                  <Label>Business Unit *</Label>
                  <Select
                    value={newDept.businessUnit}
                    onValueChange={(value: any) => {
                      setNewDept({ ...newDept, businessUnit: value });
                      if (formErrors.businessUnit) {
                        setFormErrors((prev) => ({ ...prev, businessUnit: null }));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__select_placeholder__">Select an option</SelectItem>
                      {businessUnits.map((unit) => (
                        <SelectItem key={unit.id} value={String(unit.id)}>
                          {unit.unitName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.businessUnit && (
                    <p className="text-sm text-destructive">{formErrors.businessUnit}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Department Name *</Label>
                  <Input
                    placeholder="e.g., Customer Service"
                    value={newDept.deptName}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewDept({ ...newDept, deptName: value });
                      if (formErrors.deptName) {
                        setFormErrors((prev) => ({ ...prev, deptName: null }));
                      }
                    }} />
                  {formErrors.deptName && <p className="text-sm text-destructive">{formErrors.deptName}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Department Code *</Label>
                  <Input
                    placeholder="e.g., CS"
                    value={newDept.deptCode}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      setNewDept({ ...newDept, deptCode: value });
                      if (formErrors.deptCode) {
                        setFormErrors((prev) => ({ ...prev, deptCode: null }));
                      }
                    }}
                  />
                  {formErrors.deptCode && <p className="text-sm text-destructive">{formErrors.deptCode}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Started On</Label>
                  <Input
                    type="date" // <-- makes it a date picker
                    placeholder="DD-MM-YYYY"
                    value={newDept.startedOn}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewDept({ ...newDept, startedOn: value });
                      if (formErrors.startedOn) {
                        setFormErrors((prev) => ({ ...prev, startedOn: null }));
                      }
                    }}
                  />
                  {formErrors.startedOn && <p className="text-sm text-destructive">{formErrors.startedOn}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Department Head *</Label>
                  <Select
                    value={newDept.deptHead}
                    onValueChange={(value: any) => {
                      setNewDept({ ...newDept, deptHead: value });
                      if (formErrors.deptHead) {
                        setFormErrors((prev) => ({ ...prev, deptHead: null }));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__select_placeholder__">Select an option</SelectItem>
                      {employees.map((emp: any) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>

                  </Select>
                  {formErrors.deptHead && (
                    <p className="text-sm text-destructive">{formErrors.deptHead}</p>
                  )}
                </div>

                

                <div className="space-y-2">
                  <Label>Time Zone</Label>
                  <Select
                    value={newDept.timezoneId}
                    onValueChange={(value: any) => setNewDept({ ...newDept, timezoneId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__select_placeholder__">Select an option</SelectItem>
                      {timezones.map((tz: any) => (
                        <SelectItem key={tz.id} value={tz.id}>
                          {tz.timezone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.timezoneId && (<p className="text-sm text-destructive">{formErrors.timezoneId}</p>)}
                </div>

              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => { setShowAddDialog(false); resetNewDept(); }}>
                  Cancel
                </Button>
                <Button className="btn-add-purple" onClick={handleAdd}>
                  <Plus className="size-4 mr-2" />
                  Add Department
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
                    <h3 className="font-semibold mb-1">Upload Departments Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Support for CSV and XLSX formats
                    </p>
                  </div>
                  <div className="flex justify-center gp-4">
                    <div>
                      <input
                        type="file"
                        accept=".csv"
                        className="hidden"
                        id="csv-upload-dept"
                        onChange={(e) => handleFileImport(e, 'csv')}
                      />
                      <Button type="button" variant="outline" onClick={() => document.getElementById('csv-upload-dept')?.click()}>
                        <Upload className="size-4 mr-2" />
                        Upload CSV
                      </Button>
                    </div>
                    <div>
                      <input
                        type="file"
                        accept=".xlsx,.xls"
                        className="hidden"
                        id="xlsx-upload-dept"
                        onChange={(e) => handleFileImport(e, 'xlsx')}
                      />
                      <Button type="button" onClick={() => document.getElementById('xlsx-upload-dept')?.click()}>
                        <Upload className="size-4 mr-2" />
                        Upload XLSX
                      </Button>
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

      <Dialog
        open={showEditDialog}
        onOpenChange={(open: any) => {
          setShowEditDialog(open);
          if (!open) {
            setEditingDept(null);
            setFormErrors({});
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>
              Update department information
            </DialogDescription>
          </DialogHeader>

          {editingDept && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-columns-two gp-4">
                {/* Business Unit */}
                <div className="space-y-2">
                  <Label>Business Unit *</Label>
                  <Select
                    value={editingDept.businessUnit}
                    onValueChange={(value: any) => {
                      setEditingDept({ ...editingDept, businessUnit: value });
                      if (formErrors.businessUnit) setFormErrors(prev => ({ ...prev, businessUnit: null }));
                    }}
                  >
                   <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__select_placeholder__">Select an option</SelectItem>

                      {businessUnits.map(unit => (
                        <SelectItem key={unit.id} value={String(unit.id)}>{unit.unitName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.businessUnit && <p className="text-destructive text-sm">{formErrors.businessUnit}</p>}
                </div>
                {/* Department Name */}
                <div className="space-y-2">
                  <Label>Department Name *</Label>
                  <Input
                    value={editingDept.deptName}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditingDept({ ...editingDept, deptName: value });
                      if (formErrors.deptName) setFormErrors(prev => ({ ...prev, deptName: null }));
                    }}
                  />
                  {formErrors.deptName && <p className="text-destructive text-sm">{formErrors.deptName}</p>}
                </div>

                {/* Department Code */}
                <div className="space-y-2">
                  <Label>Department Code *</Label>
                  <Input
                    value={editingDept.deptCode}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      setEditingDept({ ...editingDept, deptCode: value });
                      if (formErrors.deptCode) setFormErrors(prev => ({ ...prev, deptCode: null }));
                    }}
                  />
                  {formErrors.deptCode && <p className="text-destructive text-sm">{formErrors.deptCode}</p>}
                </div>

                {/* Started On */}
                <div className="space-y-2">
                  <Label>Started On *</Label>
                  <Input
                    type="date"
                    value={editingDept.startedOn}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditingDept({ ...editingDept, startedOn: value });
                      if (formErrors.startedOn) setFormErrors(prev => ({ ...prev, startedOn: null }));
                    }}
                  />
                  {formErrors.startedOn && <p className="text-destructive text-sm">{formErrors.startedOn}</p>}
                </div>

                {/* Department Head */}
                <div className="space-y-2">
                  <Label>Department Head *</Label>
                  <Select
                    value={editingDept.deptHead}
                    onValueChange={(value: any) => {
                      setEditingDept({ ...editingDept, deptHead: value });
                      if (formErrors.deptHead) setFormErrors(prev => ({ ...prev, deptHead: null }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__select_placeholder__">Select an option</SelectItem>

                      {employees.map(emp => (
                        <SelectItem key={emp.id} value={emp.id}>{emp.fullName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.deptHead && <p className="text-destructive text-sm">{formErrors.deptHead}</p>}
                </div>

                

                {/* Time Zone */}
                <div className="space-y-2">
                  <Label>Time Zone *</Label>
                  <Select
                    value={editingDept.timezoneId}
                    onValueChange={(value: any) => {
                      setEditingDept({ ...editingDept, timezoneId: value });
                      if (formErrors.timezoneId) setFormErrors(prev => ({ ...prev, timezoneId: null }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                                            <SelectItem value="__select_placeholder__">Select an option</SelectItem>

                      {timezones.map(tz => (
                        <SelectItem key={tz.id} value={tz.id}>{tz.timezone}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.timezoneId && <p className="text-destructive text-sm">{formErrors.timezoneId}</p>}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
                <Button onClick={handleUpdate}>Save Changes</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>


      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>
              Are you sure you want to delete this?
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
