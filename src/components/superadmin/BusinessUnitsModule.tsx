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
import { toast } from "sonner@2.0.3";

const initialBusinessUnits = [
  {
    id: 1,
    name: "Head Office",
    code: "PNB-HO",
    startedOn: "12-04-1894",
    streetAddress: "7, Bhikaiji Cama Place",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    timezone: "Asia/Kolkata [IST]",
  },
  {
    id: 2,
    name: "Mumbai Regional Office",
    code: "PNB-MUM",
    startedOn: "15-08-1947",
    streetAddress: "5, Chhatrapati Shivaji Maharaj Marg, Fort",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    timezone: "Asia/Kolkata [IST]",
  },
  {
    id: 3,
    name: "Kolkata Regional Office",
    code: "PNB-KOL",
    startedOn: "22-03-1950",
    streetAddress: "33, Netaji Subhas Road",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    timezone: "Asia/Kolkata [IST]",
  },
  {
    id: 4,
    name: "Chennai Regional Office",
    code: "PNB-CHE",
    startedOn: "10-06-1955",
    streetAddress: "168, Anna Salai, Mount Road",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    timezone: "Asia/Kolkata [IST]",
  },
  {
    id: 5,
    name: "Bangalore Regional Office",
    code: "PNB-BLR",
    startedOn: "14-11-1960",
    streetAddress: "45, Mahatma Gandhi Road",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    timezone: "Asia/Kolkata [IST]",
  },
  {
    id: 6,
    name: "Hyderabad Regional Office",
    code: "PNB-HYD",
    startedOn: "05-09-1965",
    streetAddress: "6-3-879/B, Greenlands Road",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    timezone: "Asia/Kolkata [IST]",
  },
  {
    id: 7,
    name: "Pune Regional Office",
    code: "PNB-PUN",
    startedOn: "18-12-1972",
    streetAddress: "1134/1, Shivajinagar",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    timezone: "Asia/Kolkata [IST]",
  },
  {
    id: 8,
    name: "Ahmedabad Regional Office",
    code: "PNB-AMD",
    startedOn: "25-01-1978",
    streetAddress: "Ashram Road, Ellisbridge",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    timezone: "Asia/Kolkata [IST]",
  },
];

interface BusinessUnitsModuleProps {
  viewOnly?: boolean;
}

export function BusinessUnitsModule({ viewOnly = false }: BusinessUnitsModuleProps) {
  const [businessUnits, setBusinessUnits] = useState(initialBusinessUnits);
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

  const handleAdd = () => {
    const unitToAdd = {
      id: businessUnits.length + 1,
      ...newUnit,
    };
    setBusinessUnits([...businessUnits, unitToAdd]);
    setShowAddDialog(false);
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
    toast.success("Business unit added successfully!");
  };

  const handleEdit = (unit: any) => {
    setEditingUnit({ ...unit });
  };

  const handleUpdate = () => {
    setBusinessUnits(businessUnits.map(u => u.id === editingUnit.id ? editingUnit : u));
    setEditingUnit(null);
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
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Started On</TableHead>
                  <TableHead>Street Address</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Time zone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUnits.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">
                      {editingUnit?.id === unit.id ? (
                        <Input
                          value={editingUnit.name}
                          onChange={(e) => setEditingUnit({ ...editingUnit, name: e.target.value })}
                        />
                      ) : (
                        unit.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingUnit?.id === unit.id ? (
                        <Input
                          value={editingUnit.code}
                          onChange={(e) => setEditingUnit({ ...editingUnit, code: e.target.value })}
                        />
                      ) : (
                        unit.code
                      )}
                    </TableCell>
                    <TableCell>{unit.startedOn}</TableCell>
                    <TableCell>
                      {editingUnit?.id === unit.id ? (
                        <Input
                          value={editingUnit.streetAddress}
                          onChange={(e) => setEditingUnit({ ...editingUnit, streetAddress: e.target.value })}
                        />
                      ) : (
                        unit.streetAddress
                      )}
                    </TableCell>
                    <TableCell>
                      {editingUnit?.id === unit.id ? (
                        <Input
                          value={editingUnit.city}
                          onChange={(e) => setEditingUnit({ ...editingUnit, city: e.target.value })}
                        />
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
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
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
                <Label>Unit Name</Label>
                <Input
                  placeholder="e.g., Delhi Regional Office"
                  value={newUnit.name}
                  onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Unit Code</Label>
                <Input
                  placeholder="e.g., PNB-DEL"
                  value={newUnit.code}
                  onChange={(e) => setNewUnit({ ...newUnit, code: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Started On</Label>
                <Input
                  placeholder="DD-MM-YYYY"
                  value={newUnit.startedOn}
                  onChange={(e) => setNewUnit({ ...newUnit, startedOn: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Street Address</Label>
                <Input
                  placeholder="Enter address"
                  value={newUnit.streetAddress}
                  onChange={(e) => setNewUnit({ ...newUnit, streetAddress: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  placeholder="Enter city"
                  value={newUnit.city}
                  onChange={(e) => setNewUnit({ ...newUnit, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  placeholder="Enter state"
                  value={newUnit.state}
                  onChange={(e) => setNewUnit({ ...newUnit, state: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
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
