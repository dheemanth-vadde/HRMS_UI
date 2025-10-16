import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Building2, Search, RefreshCw, Plus, Edit, Trash2, MoreVertical } from "lucide-react";
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
import { toast } from "sonner";
import data from "../../data.json";
import { getValidationError } from "../../utils/validations";
interface BusinessUnitsModuleProps {
  viewOnly?: boolean;
}

export function BusinessUnitsModule({ viewOnly = false }: BusinessUnitsModuleProps) {
  // const [businessUnits, setBusinessUnits] = useState(initialBusinessUnits);
  const [businessUnits, setBusinessUnits] = useState(data.businessUnits);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingUnit, setEditingUnit] = useState<any>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [unitToDelete, setUnitToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newUnit, setNewUnit] = useState({
    name: "",
    code: "",
    startedOn: "",
    streetAddress: "",
    city: "",
    state: "",
    country: "India",
    timezone: "Asia/Kolkata [IST]",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateUnit = (unit: typeof newUnit) => {
    const requiredFields: (keyof typeof unit)[] = ["name", "code", "startedOn", "streetAddress", "city", "state"];
    const newErrors: { [key: string]: string } = {};

    for (const field of requiredFields) {
      const value = unit[field];

      // Leading/trailing space check
      let error = getValidationError(
        "noSpaces",
        value,
        `${String(field).charAt(0).toUpperCase() + String(field).slice(1)} cannot start or end with a space`
      );

      if (error) {
        newErrors[String(field)] = error;
        continue;
      }

      // Required check
      error = getValidationError(
        "required",
        value,
        `${String(field).charAt(0).toUpperCase() + String(field).slice(1)} is required`
      );

      if (error) {
        newErrors[String(field)] = error;
      }
    }

    return newErrors;
  };

  const handleAdd = () => {
    const newErrors = validateUnit(newUnit);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const unitToAdd = {
      id: businessUnits.length + 1,
      ...newUnit,
    };

    setBusinessUnits([...businessUnits, unitToAdd]);
    setShowAddDialog(false);
    resetNewUnit();
  };

  const handleEdit = (unit: any) => {
    setEditingUnit({ ...unit });
  };

  const handleUpdate = () => {
    if (!editingUnit) return;

    const newErrors = validateUnit(editingUnit);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setBusinessUnits(
      businessUnits.map((u) => (u.id === editingUnit.id ? editingUnit : u))
    );
    setEditingUnit(null);
    setErrors({});
    toast.success("Business unit updated successfully!");
  };


  const handleDeleteClick = (id: number) => {
    setUnitToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (unitToDelete !== null) {
      setBusinessUnits(businessUnits.filter(u => u.id !== unitToDelete));
      toast.success("Business unit deleted successfully!");
      setDeleteConfirmOpen(false);
      setUnitToDelete(null);
    }
  };

  const filteredUnits = businessUnits.filter(unit =>
    unit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    unit.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    unit.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    unit.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetNewUnit = () => {
    setNewUnit({
      name: "",
      code: "",
      startedOn: "",
      streetAddress: "",
      city: "",
      state: "",
      country: "India",
      timezone: "Asia/Kolkata [IST]",
    });
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Business Units</h1>
          <p className="text-muted-foreground mt-1">
            {viewOnly ? "View organization business units" : "Manage organization business units"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search business units..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {!viewOnly && (
            <Button className="btn-add-purple" onClick={() => setShowAddDialog(true)}>
              <Plus className="size-4 mr-2" />
              Add Business Unit
            </Button>
          )}
        </div>
      </div>

      {/* Business Units Table */}
      <Card className="border-[#e5e7eb]">
        <CardContent className="p-0">
          <div className="rounded-md border-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-base mb-1">Name</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Code</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Started On</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Street Address</TableHead>
                  <TableHead className="font-semibold text-base mb-1">City</TableHead>
                  <TableHead className="font-semibold text-base mb-1"> State</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Country</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Time zone</TableHead>
                  <TableHead className="font-semibold text-base mb-1"> Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUnits.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">
                      {editingUnit?.id === unit.id ? (
                        <>
                          <Input
                            value={editingUnit.name}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditingUnit({ ...editingUnit, name: value });
                              if (errors.name) {
                                setErrors((prev) => ({ ...prev, name: "" }));
                              }
                            }}
                           // onChange={(e) => setEditingUnit({ ...editingUnit, name: e.target.value })}
                          />
                          {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                        </>
                      ) : (
                        unit.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingUnit?.id === unit.id ? (
                        <>
                          <Input
                            value={editingUnit.code}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditingUnit({ ...editingUnit, code: value });
                              if (errors.code) {
                                setErrors((prev) => ({ ...prev, code: "" }));
                              }
                            }}
                           // onChange={(e) => setEditingUnit({ ...editingUnit, code: e.target.value })}
                          />
                          {errors.code && <p className="text-destructive text-sm mt-1">{errors.code}</p>}
                        </>
                      ) : (
                        unit.code
                      )}
                    </TableCell>
                    <TableCell>{unit.startedOn}</TableCell>
                    <TableCell>
                      {editingUnit?.id === unit.id ? (
                        <>
                          <Input
                            value={editingUnit.streetAddress}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditingUnit({ ...editingUnit, streetAddress: value });
                              if (errors.streetAddress) {
                                setErrors((prev) => ({ ...prev, streetAddress: "" }));
                              }
                            }}
                         //   onChange={(e) => setEditingUnit({ ...editingUnit, streetAddress: e.target.value })}
                          />
                          {errors.streetAddress && <p className="text-destructive text-sm mt-1">{errors.streetAddress}</p>}
                        </>
                      ) : (
                        unit.streetAddress
                      )}
                    </TableCell>
                    <TableCell>
                      {editingUnit?.id === unit.id ? (
                        <>
                          <Input
                            value={editingUnit.city}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditingUnit({ ...editingUnit, city: value });
                              if (errors.city) {
                                setErrors((prev) => ({ ...prev, city: "" }));
                              }
                            }}
                           // onChange={(e) => setEditingUnit({ ...editingUnit, city: e.target.value })}
                          />
                          {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
                        </>
                      ) : (
                        unit.city
                      )}
                    </TableCell>
                    <TableCell>{unit.state}</TableCell>
                    <TableCell>{unit.country}</TableCell>
                    <TableCell>{unit.timezone}</TableCell>
                    <TableCell className="text-right">
                      {!viewOnly && (
                        <div className="flex items-center justify-end gap-2">
                          {editingUnit?.id === unit.id ? (
                            <>
                              <Button size="sm" onClick={handleUpdate}>
                                Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingUnit(null)}>
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
                                <DropdownMenuItem onClick={() => handleEdit(unit)}>
                                  <Edit className="size-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleDeleteClick(unit.id)}
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

      {/* Add Business Unit Dialog */}
      <Dialog open={showAddDialog}
        // onOpenChange={setShowAddDialog}
        onOpenChange={(open: boolean) => {
          setShowAddDialog(open);
          if (!open) resetNewUnit(); // Reset the form when dialog is closed
        }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Business Unit</DialogTitle>
            <DialogDescription>
              Add a new business unit to your organization
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Unit Name *</Label>
                <Input
                  placeholder="e.g., Delhi Regional Office"
                  value={newUnit.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewUnit({ ...newUnit, name: value });
                    if (errors.name) {
                      setErrors((prev) => ({ ...prev, name: "" }));
                    } }}
                 // onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label>Unit Code *</Label>
                <Input
                  placeholder="e.g., PNB-DEL"
                  value={newUnit.code}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewUnit({ ...newUnit, code: value });
                    if (errors.code) {
                      setErrors((prev) => ({ ...prev, code: "" }));
                    }
                  }}
                 // onChange={(e) => setNewUnit({ ...newUnit, code: e.target.value })}
                />
                {errors.code && <p className="text-destructive text-sm mt-1">{errors.code}</p>}
              </div>
              <div className="space-y-2">
                <Label>Started On *</Label>
                <Input
                  type="date"
                  placeholder="DD-MM-YYYY"
                  value={newUnit.startedOn}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewUnit({ ...newUnit, startedOn: value });
                    if (errors.startedOn) {
                      setErrors((prev) => ({ ...prev, startedOn: "" }));
                    }
                  }}
                //  onChange={(e) => setNewUnit({ ...newUnit, startedOn: e.target.value })}
                />
                {errors.startedOn && <p className="text-destructive text-sm mt-1">{errors.startedOn}</p>}
              </div>
              <div className="space-y-2">
                <Label>Street Address *</Label>
                <Input
                  placeholder="Enter address"
                  value={newUnit.streetAddress}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewUnit({ ...newUnit, streetAddress: value });
                    if (errors.streetAddress) {
                      setErrors((prev) => ({ ...prev, streetAddress: "" }));
                    }
                  }}
                 // onChange={(e) => setNewUnit({ ...newUnit, streetAddress: e.target.value })}
                />
                {errors.streetAddress && <p className="text-destructive text-sm mt-1">{errors.streetAddress}</p>}
              </div>
              <div className="space-y-2">
                <Label>City *</Label>
                <Input
                  placeholder="Enter city"
                  value={newUnit.city}
                  onChange={(e) => {
                    setNewUnit({ ...newUnit, city: e.target.value });
                    if (errors.city) {
                      setErrors((prev) => ({ ...prev, city: "" }));
                    }
                  }}
                //onChange={(e) => setNewUnit({ ...newUnit, city: e.target.value })}
                />
                {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
              </div>
              <div className="space-y-2">
                <Label>State *</Label>
                <Input
                  placeholder="Enter state"
                  value={newUnit.state}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewUnit({ ...newUnit, state: value });
                    if (errors.state) {
                      setErrors((prev) => ({ ...prev, state: "" }));
                    }
                  }}
                 // onChange={(e) => setNewUnit({ ...newUnit, state: e.target.value })}
                />
                {errors.state && <p className="text-destructive text-sm mt-1">{errors.state}</p>}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setShowAddDialog(false); resetNewUnit(); }}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>
                <Plus className="size-4 mr-2" />
                Add Unit
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the business unit from the system.
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
