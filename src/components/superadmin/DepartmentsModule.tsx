import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Briefcase, Search, RefreshCw, Plus, Upload, Edit, Trash2, FileSpreadsheet, MoreVertical } from "lucide-react";
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
import { toast } from "sonner";
import { organizationDepartments } from "../../data.json";
import { getValidationError } from "../../utils/validations";



interface DepartmentsModuleProps {
  viewOnly?: boolean;
}

export function DepartmentsModule({ viewOnly = false }: DepartmentsModuleProps) {
  const [departments, setDepartments] = useState(organizationDepartments);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingDept, setEditingDept] = useState<any>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deptToDelete, setDeptToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newDept, setNewDept] = useState({
    name: "",
    code: "",
    startedOn: "",
    departmentHead: "",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "",
  });
  const resetNewDept = () => {
    setNewDept({
      name: "",
      code: "",
      startedOn: "",
      departmentHead: "",
      timezone: "Asia/Kolkata [IST]",
      businessUnit: "",
    });
    setFormErrors({});
  };
  const [formErrors, setFormErrors] = useState<{ [key: string]: string | null }>({});
  const validateDeptForm = (dept: typeof newDept) => {
    const errors: { [key: string]: string | null } = {};
    const requiredFields: (keyof typeof newDept)[] = ["name", "code", "departmentHead", "startedOn", "businessUnit"];

    for (const field of requiredFields) {
      const value = dept[field];

      let error = getValidationError(
        "noSpaces",
        value,
        `${String(field).charAt(0).toUpperCase() + String(field).slice(1)} cannot start or end with a space`
      );
      if (error) {
        errors[String(field)] = error;
        continue;
      }

      error = getValidationError(
        "required",
        value,
        `${String(field).charAt(0).toUpperCase() + String(field).slice(1)} is required`
      );
      if (error) errors[String(field)] = error;
    }

    return errors;
  };


  const handleAdd = () => {
    const errors = validateDeptForm(newDept);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const deptToAdd = {
      id: departments.length + 1,
      ...newDept,
    };
    setDepartments([...departments, deptToAdd]);
    setShowAddDialog(false);
    setNewDept({
      name: "",
      code: "",
      startedOn: "",
      departmentHead: "",
      timezone: "Asia/Kolkata [IST]",
      businessUnit: "",
    });
    setFormErrors({});
    resetNewDept();
    toast.success("Department added successfully!");
  };


  const handleEdit = (dept: any) => {
    setEditingDept({ ...dept });
  };

  const handleUpdate = () => {
    if (!editingDept) return;

    const errors = validateDeptForm(editingDept);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setDepartments(departments.map(d => d.id === editingDept.id ? editingDept : d));
    setEditingDept(null);
    setFormErrors({});
    toast.success("Department updated successfully!");
  };



  const handleDeleteClick = (id: number) => {
    setDeptToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deptToDelete !== null) {
      setDepartments(departments.filter(d => d.id !== deptToDelete));
      toast.success("Department deleted successfully!");
      setDeleteConfirmOpen(false);
      setDeptToDelete(null);
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
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.departmentHead.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.businessUnit.toLowerCase().includes(searchQuery.toLowerCase())
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
              placeholder="Search departments..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {!viewOnly && (
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
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Started On</TableHead>
                  <TableHead>Department Head</TableHead>
                  <TableHead>Time Zone</TableHead>
                  <TableHead>Business Unit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell className="font-medium">
                      {editingDept?.id === dept.id ? (
                        <>
                          <Input
                            value={editingDept.name}
                            onChange={(e) => setEditingDept({ ...editingDept, name: e.target.value })}
                          />
                          {formErrors.name && <p className="text-destructive text-xs mt-1">{formErrors.name}</p>}
                        </>
                      ) : (
                        dept.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingDept?.id === dept.id ? (
                        <>
                          <Input
                            value={editingDept.code}
                            onChange={(e) => setEditingDept({ ...editingDept, code: e.target.value })}
                          />
                          {formErrors.code && <p className="text-destructive text-xs mt-1">{formErrors.code}</p>}
                        </>
                      ) : (
                        dept.code
                      )}
                    </TableCell>
                    <TableCell>{dept.startedOn || "-"}</TableCell>
                    <TableCell>
                      {editingDept?.id === dept.id ? (
                        <>
                          <Input
                            value={editingDept.departmentHead}
                            onChange={(e) => setEditingDept({ ...editingDept, departmentHead: e.target.value })}
                          />
                          {formErrors.departmentHead && <p className="text-destructive text-xs mt-1">{formErrors.departmentHead}</p>}
                        </>
                      ) : (
                        dept.departmentHead || "-"
                      )}
                    </TableCell>
                    <TableCell>{dept.timezone}</TableCell>
                    <TableCell>{dept.businessUnit}</TableCell>
                    <TableCell className="text-right">
                      {!viewOnly && (
                        <div className="flex items-center justify-end gap-2">
                          {editingDept?.id === dept.id ? (
                            <>
                              <Button size="sm" onClick={handleUpdate}>
                                Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingDept(null)}>
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(dept)}>
                                  <Edit className="size-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleDeleteClick(dept.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="size-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <span>←</span>
              </Button>
              <Button variant="outline" size="icon" disabled>
                <span>→</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Records per page:</span>
              <Select defaultValue="20">
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
        // onOpenChange={setShowAddDialog}
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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="import">Import File</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Department Name *</Label>
                  <Input
                    placeholder="e.g., Customer Service"
                    value={newDept.name}
                    onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                  />
                  {formErrors.name && <p className="text-sm text-destructive">{formErrors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Department Code *</Label>
                  <Input
                    placeholder="e.g., CS"
                    value={newDept.code}
                    onChange={(e) => setNewDept({ ...newDept, code: e.target.value })}
                  />
                  {formErrors.code && <p className="text-sm text-destructive">{formErrors.code}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Started On</Label>
                  <Input
                    type="date" // <-- makes it a date picker
                    placeholder="DD-MM-YYYY"
                    value={newDept.startedOn}
                    onChange={(e) => setNewDept({ ...newDept, startedOn: e.target.value })}

                  />
                  {formErrors.startedOn && <p className="text-sm text-destructive">{formErrors.startedOn}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Department Head *</Label>
                  <Input
                    placeholder="Enter name"
                    value={newDept.departmentHead}
                    onChange={(e) => setNewDept({ ...newDept, departmentHead: e.target.value })}
                  />
                  {formErrors.departmentHead && <p className="text-sm text-destructive">{formErrors.departmentHead}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Business Unit *</Label>
                  <Select
                    value={newDept.businessUnit}
                    onValueChange={(value) => setNewDept({ ...newDept, businessUnit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Head Office">Head Office</SelectItem>
                      <SelectItem value="Mumbai Regional Office">Mumbai Regional Office</SelectItem>
                      <SelectItem value="Kolkata Regional Office">Kolkata Regional Office</SelectItem>
                      <SelectItem value="Chennai Regional Office">Chennai Regional Office</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.businessUnit && (
                    <p className="text-sm text-destructive">{formErrors.businessUnit}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Time Zone</Label>
                  <Input
                    value={newDept.timezone}
                    onChange={(e) => setNewDept({ ...newDept, timezone: e.target.value })}
                  />
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
                  <div className="flex justify-center gap-4">
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
                  <div className="flex justify-center gap-4">
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the department from the system.
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
