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
import { toast } from "sonner@2.0.3";

const initialDepartments = [
  {
    id: 1,
    name: "Retail Banking",
    code: "RB",
    startedOn: "12-04-1894",
    departmentHead: "Rajesh Kumar Sharma",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
  {
    id: 2,
    name: "Corporate Banking",
    code: "CB",
    startedOn: "15-06-1950",
    departmentHead: "Amit Verma",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
  {
    id: 3,
    name: "Treasury Operations",
    code: "TO",
    startedOn: "22-03-1960",
    departmentHead: "Priya Deshmukh",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
  {
    id: 4,
    name: "Risk Management",
    code: "RM",
    startedOn: "10-08-1985",
    departmentHead: "Suresh Reddy",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
  {
    id: 5,
    name: "Credit & Recovery",
    code: "CR",
    startedOn: "05-11-1970",
    departmentHead: "Meena Iyer",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
  {
    id: 6,
    name: "Human Resources",
    code: "HR",
    startedOn: "18-02-1955",
    departmentHead: "Deepak Singh",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
  {
    id: 7,
    name: "Information Technology",
    code: "IT",
    startedOn: "12-09-1995",
    departmentHead: "Anil Kumar Gupta",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
  {
    id: 8,
    name: "Digital Banking",
    code: "DB",
    startedOn: "20-04-2015",
    departmentHead: "Neha Kapoor",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
  {
    id: 9,
    name: "Compliance & Legal",
    code: "CL",
    startedOn: "14-07-1980",
    departmentHead: "Vikram Malhotra",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
  {
    id: 10,
    name: "International Banking",
    code: "IB",
    startedOn: "30-10-1988",
    departmentHead: "Sunita Patel",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
  {
    id: 11,
    name: "Operations & Services",
    code: "OS",
    startedOn: "08-03-1965",
    departmentHead: "Ramesh Nair",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
  {
    id: 12,
    name: "Internal Audit",
    code: "IA",
    startedOn: "25-12-1975",
    departmentHead: "Kavita Joshi",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
  {
    id: 13,
    name: "Marketing & Communications",
    code: "MC",
    startedOn: "16-05-2000",
    departmentHead: "Rohit Mehta",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
  {
    id: 14,
    name: "Priority Banking Services",
    code: "PBS",
    startedOn: "22-08-2010",
    departmentHead: "Anjali Rao",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
  {
    id: 15,
    name: "MSME & Agriculture",
    code: "MA",
    startedOn: "11-01-1990",
    departmentHead: "Santosh Kumar",
    timezone: "Asia/Kolkata [IST]",
    businessUnit: "Head Office",
  },
];

interface DepartmentsModuleProps {
  viewOnly?: boolean;
}

export function DepartmentsModule({ viewOnly = false }: DepartmentsModuleProps) {
  const [departments, setDepartments] = useState(initialDepartments);
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
    businessUnit: "Head Office",
  });

  const handleAdd = () => {
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
      businessUnit: "Head Office",
    });
    toast.success("Department added successfully!");
  };

  const handleEdit = (dept: any) => {
    setEditingDept({ ...dept });
  };

  const handleUpdate = () => {
    setDepartments(departments.map(d => d.id === editingDept.id ? editingDept : d));
    setEditingDept(null);
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
                        <Input
                          value={editingDept.name}
                          onChange={(e) => setEditingDept({ ...editingDept, name: e.target.value })}
                        />
                      ) : (
                        dept.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingDept?.id === dept.id ? (
                        <Input
                          value={editingDept.code}
                          onChange={(e) => setEditingDept({ ...editingDept, code: e.target.value })}
                        />
                      ) : (
                        dept.code
                      )}
                    </TableCell>
                    <TableCell>{dept.startedOn || "-"}</TableCell>
                    <TableCell>
                      {editingDept?.id === dept.id ? (
                        <Input
                          value={editingDept.departmentHead}
                          onChange={(e) => setEditingDept({ ...editingDept, departmentHead: e.target.value })}
                        />
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
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
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
                  <Label>Department Name</Label>
                  <Input
                    placeholder="e.g., Customer Service"
                    value={newDept.name}
                    onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Department Code</Label>
                  <Input
                    placeholder="e.g., CS"
                    value={newDept.code}
                    onChange={(e) => setNewDept({ ...newDept, code: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Started On</Label>
                  <Input
                    placeholder="DD-MM-YYYY"
                    value={newDept.startedOn}
                    onChange={(e) => setNewDept({ ...newDept, startedOn: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Department Head</Label>
                  <Input
                    placeholder="Enter name"
                    value={newDept.departmentHead}
                    onChange={(e) => setNewDept({ ...newDept, departmentHead: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Business Unit</Label>
                  <Select value={newDept.businessUnit} onValueChange={(value) => setNewDept({ ...newDept, businessUnit: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Head Office">Head Office</SelectItem>
                      <SelectItem value="Mumbai Regional Office">Mumbai Regional Office</SelectItem>
                      <SelectItem value="Kolkata Regional Office">Kolkata Regional Office</SelectItem>
                      <SelectItem value="Chennai Regional Office">Chennai Regional Office</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
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
