import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UserCircle, Search, RefreshCw, Plus, Upload, Edit, Trash2, FileSpreadsheet, Mail, Phone, MoreVertical } from "lucide-react";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner@2.0.3";

const initialEmployees = [
  {
    id: 1,
    employeeId: "PNB12345",
    name: "Sanjay Kumar",
    email: "sanjay.kumar@pnb.co.in",
    phone: "+91 98765 43210",
    department: "Retail Banking",
    designation: "Senior Manager",
    joiningDate: "2015-03-15",
    location: "Head Office",
    status: "Active",
  },
  {
    id: 2,
    employeeId: "PNB12346",
    name: "Priya Sharma",
    email: "priya.sharma@pnb.co.in",
    phone: "+91 98765 43211",
    department: "Corporate Banking",
    designation: "Manager",
    joiningDate: "2017-07-20",
    location: "Mumbai Regional Office",
    status: "Active",
  },
  {
    id: 3,
    employeeId: "PNB12347",
    name: "Rahul Mehta",
    email: "rahul.mehta@pnb.co.in",
    phone: "+91 98765 43212",
    department: "Information Technology",
    designation: "Senior Officer",
    joiningDate: "2018-11-10",
    location: "Head Office",
    status: "Active",
  },
  {
    id: 4,
    employeeId: "PNB12348",
    name: "Anjali Desai",
    email: "anjali.desai@pnb.co.in",
    phone: "+91 98765 43213",
    department: "Human Resources",
    designation: "HR Officer",
    joiningDate: "2019-05-05",
    location: "Delhi Regional Office",
    status: "Active",
  },
  {
    id: 5,
    employeeId: "PNB12349",
    name: "Vikram Singh",
    email: "vikram.singh@pnb.co.in",
    phone: "+91 98765 43214",
    department: "Treasury Operations",
    designation: "Officer",
    joiningDate: "2020-01-15",
    location: "Kolkata Regional Office",
    status: "Active",
  },
  {
    id: 6,
    employeeId: "PNB12350",
    name: "Meera Patel",
    email: "meera.patel@pnb.co.in",
    phone: "+91 98765 43215",
    department: "Credit & Risk Management",
    designation: "Assistant Manager",
    joiningDate: "2016-08-22",
    location: "Ahmedabad Regional Office",
    status: "On Leave",
  },
];

export function EmployeeManagement() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [newEmployee, setNewEmployee] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
    location: "Head Office",
    status: "Active",
  });

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.employeeId || !newEmployee.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const employee = {
      id: employees.length + 1,
      ...newEmployee,
    };

    setEmployees([...employees, employee]);
    setNewEmployee({
      employeeId: "",
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      joiningDate: "",
      location: "Head Office",
      status: "Active",
    });
    setShowAddDialog(false);
    toast.success("Employee added successfully!");
  };

  const handleEdit = (employee: any) => {
    setEditingEmployee({ ...employee });
  };

  const handleUpdate = () => {
    if (!editingEmployee) return;
    
    setEmployees(employees.map(e => 
      e.id === editingEmployee.id ? editingEmployee : e
    ));
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

  const handleBulkImport = () => {
    toast.info("Bulk import functionality - Coming soon!");
  };

  const handleExport = () => {
    toast.success("Employee data exported successfully!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>;
      case "On Leave":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">On Leave</Badge>;
      case "Inactive":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Employee Management</h1>
          <p className="text-muted-foreground">Manage employee master data and information</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleExport} variant="outline" className="gap-2">
            <FileSpreadsheet className="size-4" />
            Export
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="btn-add-purple gap-2">
                <Plus className="size-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>Enter employee details below</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                  <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
                </TabsList>
                <TabsContent value="manual" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Employee ID *</Label>
                      <Input
                        value={newEmployee.employeeId}
                        onChange={(e) => setNewEmployee({ ...newEmployee, employeeId: e.target.value })}
                        placeholder="PNB12345"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Full Name *</Label>
                      <Input
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                        placeholder="email@pnb.co.in"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        value={newEmployee.phone}
                        onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select value={newEmployee.department} onValueChange={(value) => setNewEmployee({ ...newEmployee, department: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Retail Banking">Retail Banking</SelectItem>
                          <SelectItem value="Corporate Banking">Corporate Banking</SelectItem>
                          <SelectItem value="Information Technology">Information Technology</SelectItem>
                          <SelectItem value="Human Resources">Human Resources</SelectItem>
                          <SelectItem value="Treasury Operations">Treasury Operations</SelectItem>
                          <SelectItem value="Credit & Risk Management">Credit & Risk Management</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Designation</Label>
                      <Input
                        value={newEmployee.designation}
                        onChange={(e) => setNewEmployee({ ...newEmployee, designation: e.target.value })}
                        placeholder="Enter designation"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Joining Date</Label>
                      <Input
                        type="date"
                        value={newEmployee.joiningDate}
                        onChange={(e) => setNewEmployee({ ...newEmployee, joiningDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Select value={newEmployee.location} onValueChange={(value) => setNewEmployee({ ...newEmployee, location: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Head Office">Head Office</SelectItem>
                          <SelectItem value="Mumbai Regional Office">Mumbai Regional Office</SelectItem>
                          <SelectItem value="Delhi Regional Office">Delhi Regional Office</SelectItem>
                          <SelectItem value="Kolkata Regional Office">Kolkata Regional Office</SelectItem>
                          <SelectItem value="Ahmedabad Regional Office">Ahmedabad Regional Office</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddEmployee} className="btn-add-purple">
                      Add Employee
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="bulk" className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="size-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="mb-2">Upload CSV or Excel file</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Supports .csv, .xlsx, .xls files
                    </p>
                    <Button onClick={handleBulkImport} className="btn-gradient-primary">
                      <Upload className="size-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-2">Required columns:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Employee ID</li>
                      <li>Full Name</li>
                      <li>Email</li>
                      <li>Phone</li>
                      <li>Department</li>
                      <li>Designation</li>
                      <li>Joining Date</li>
                      <li>Location</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{employees.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {employees.filter(e => e.status === "Active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">On Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {employees.filter(e => e.status === "On Leave").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {new Set(employees.map(e => e.department)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Employee Directory</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <RefreshCw className="size-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No employees found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        {editingEmployee?.id === employee.id ? (
                          <Input
                            value={editingEmployee.employeeId}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, employeeId: e.target.value })}
                          />
                        ) : (
                          <span className="font-medium">{employee.employeeId}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingEmployee?.id === employee.id ? (
                          <Input
                            value={editingEmployee.name}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <UserCircle className="size-4 text-muted-foreground" />
                            {employee.name}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingEmployee?.id === employee.id ? (
                          <div className="space-y-1">
                            <Input
                              value={editingEmployee.email}
                              onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                              placeholder="Email"
                            />
                            <Input
                              value={editingEmployee.phone}
                              onChange={(e) => setEditingEmployee({ ...editingEmployee, phone: e.target.value })}
                              placeholder="Phone"
                            />
                          </div>
                        ) : (
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <Mail className="size-3 text-muted-foreground" />
                              <span>{employee.email}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Phone className="size-3" />
                              <span>{employee.phone}</span>
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingEmployee?.id === employee.id ? (
                          <Input
                            value={editingEmployee.department}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value })}
                          />
                        ) : (
                          employee.department
                        )}
                      </TableCell>
                      <TableCell>
                        {editingEmployee?.id === employee.id ? (
                          <Input
                            value={editingEmployee.designation}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, designation: e.target.value })}
                          />
                        ) : (
                          employee.designation
                        )}
                      </TableCell>
                      <TableCell>
                        {editingEmployee?.id === employee.id ? (
                          <Input
                            value={editingEmployee.location}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, location: e.target.value })}
                          />
                        ) : (
                          employee.location
                        )}
                      </TableCell>
                      <TableCell>
                        {editingEmployee?.id === employee.id ? (
                          <Select 
                            value={editingEmployee.status} 
                            onValueChange={(value) => setEditingEmployee({ ...editingEmployee, status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="On Leave">On Leave</SelectItem>
                              <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          getStatusBadge(employee.status)
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {editingEmployee?.id === employee.id ? (
                            <>
                              <Button size="sm" onClick={handleUpdate} className="btn-gradient-primary">
                                Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingEmployee(null)}>
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
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

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
