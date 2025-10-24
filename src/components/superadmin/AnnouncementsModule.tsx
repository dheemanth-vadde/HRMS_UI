import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Megaphone, Plus, Search, Edit, Trash2, Upload, FileSpreadsheet, Check } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"; // ADDED Select components
import { toast } from "sonner";
import { getValidationError } from "../../utils/validations";
import ANNOUNCEMENTS_ENDPOINTS from "../../services/announcementsEndpoints";
import api from "../../services/interceptors";
import DEPARTMENT_ENDPOINTS from "../../services/departmentEndpoints";
import BUSSINESSUNIT_ENDPOINTS from "../../services/businessUnitEndpoints";

// --- Define Interfaces for clarity (UPDATED for multi-select) ---

interface BusinessUnit {
  id: string;
  unitName: string;
}

interface Department {
  id: string;
  deptName: string; // Assuming 'deptName' is the field for department name
}

interface AnnouncementFormData {
  title: string;
  message: string;
  startDate: string;
  // announcementType: string;
  // isPinned: boolean;
  unitId: string[]; // Array of Business Unit IDs
  deptId: string[]; // Array of Department IDs
}

interface AnnouncementsModuleProps {
  viewOnly?: boolean;
}
// --- Component Start ---

export function AnnouncementsModule({ viewOnly = false }: AnnouncementsModuleProps) {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string | null }>({});
  const [searchQuery, setSearchQuery] = useState("");

  // New states for dropdown data
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default to 10, matching your Select

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  const initialNewAnnouncement: AnnouncementFormData = {
    title: "",
    message: "",
    startDate: "",
    // announcementType: "",
    // isPinned: false,
    unitId: [], // Default to empty array
    deptId: [], // Default to empty array
  };

  const [newAnnouncement, setNewAnnouncement] = useState<AnnouncementFormData>(initialNewAnnouncement);

  const resetNewAnnoc = () => {
    setNewAnnouncement(initialNewAnnouncement);
    setFormErrors({});
  };

  //  Validation logic (Updated for multi-select arrays)
  const validateAnnouncementForm = (
    announcement: AnnouncementFormData | any,
    existingAnnouncements: any[] = []
  ) => {
    const errors: { [key: string]: string | null } = {};

    const requiredFields: (keyof AnnouncementFormData)[] = [
      "title",
      "startDate",
      // "announcementType",
      "unitId",
      "deptId",
    ];

    for (const field of requiredFields) {
      const value = announcement[field];

      if (field === "title" && typeof value === "string") {
        const spaceError = getValidationError(
          "noSpaces",
          value,
          `Field has extra space`
        );
        if (spaceError) {
          errors[field] = spaceError;
          continue;
        }
      }

      // MODIFIED: Handle Array Check for required fields
      const isArray = Array.isArray(value);
      const safeValue = isArray ? (value.length > 0 ? "not-empty" : "") : (value ?? "");

      const requiredError = getValidationError(
        "required",
        safeValue,
        `This field is required`
      );
      if (requiredError) {
        errors[field] = requiredError;
      }
    }

    // --- Unique Title Validation ---
    const isEditing = !!(announcement as any).id;
    const announcementsForCheck = isEditing
      ? existingAnnouncements.filter(a => a.id !== (announcement as any).id)
      : existingAnnouncements;

    const uniqueError = getValidationError("unique", announcement.title, "This field already exists", {
      list: announcementsForCheck,
      propertyName: "title",
    });
    if (uniqueError) {
      errors.title = uniqueError;
    }

    return errors;
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // Fetch Business Units
        const unitsResponse = await api.get(BUSSINESSUNIT_ENDPOINTS.GET_BUSSINESSUNIT);
        setBusinessUnits(unitsResponse.data.data.map((u: any) => ({
          id: u.id,
          unitName: u.unitName
        })));

        // Fetch Departments
        const deptsResponse = await api.get(DEPARTMENT_ENDPOINTS.GET_DEPARTMENTS); // Placeholder URL based on context
        setDepartments(deptsResponse.data.data.map((d: any) => ({
          id: d.id,
          deptName: d.deptName || "Department " + d.id.substring(0, 4), // Placeholder for missing deptName
        })));

      } catch (err) {
        console.error("Failed to fetch dropdown data", err);
        toast.error("Failed to load Business Units or Departments");
      }
    };

    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const response = await api.get(ANNOUNCEMENTS_ENDPOINTS.GET_ANNOUNCEMENTS);
        const dataArray = response.data.data || [];

        // Map backend fields to frontend
        const mapped = dataArray.map((a: any) => ({
          id: a.id,
          title: a.title || "",
          message: a.message || "",
          startDate: a.startDate ? a.startDate.split("T")[0] : "", // Store as YYYY-MM-DD for input type="date"
          // announcementType: a.announcementType || "",
          // priority: a.isPinned ? "High" : "Low",
          // New fields mapped to arrays, handling nested object structure
          unitId: a.unitId?.unitIds || [],
          deptId: a.deptId?.deptIds || [],
        }));

        setAnnouncements(mapped);
      } catch (err) {
        console.error("Failed to fetch announcements", err);
        toast.error("Failed to load announcements");
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownData();
    fetchAnnouncements();
  }, []);

  // Utility function to get name from ID
  const getUnitName = (unitId: string) => businessUnits.find(u => u.id === unitId)?.unitName;
  const getDeptName = (deptId: string) => departments.find(d => d.id === deptId)?.deptName;

  // Shared logic for toggling selection in a multi-select array
  const handleMultiSelectChange = (
    currentIds: string[],
    selectedId: string,
    stateUpdater: (value: AnnouncementFormData | any) => void,
    field: keyof AnnouncementFormData
  ) => {
    const isSelected = currentIds.includes(selectedId);
    let newIds: string[];

    if (isSelected) {
      // remove if already selected
      newIds = currentIds.filter((id) => id !== selectedId);
    } else {
      // add if not selected
      newIds = [...currentIds, selectedId];
    }

    stateUpdater((prev: any) => ({ ...prev, [field]: newIds }));
    setFormErrors(prev => ({ ...prev, [field]: "" }));
  };

  //  Add with validation
  const handleAdd = async () => {
    // 1. Validate form
    const errors = validateAnnouncementForm(newAnnouncement, announcements);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // 2. Prepare payload for API (UPDATED for array payload)
    const payload = {
      title: newAnnouncement.title,
      message: newAnnouncement.message,
      startDate: new Date(newAnnouncement.startDate).toISOString(),
      // announcementType: newAnnouncement.announcementType,
      // isPinned: newAnnouncement.isPinned,
      unitId: { unitIds: newAnnouncement.unitId },
      deptId: { deptIds: newAnnouncement.deptId },
    };

    try {
      const response = await api.post(ANNOUNCEMENTS_ENDPOINTS.POST_ANNOUNCEMENTS, payload);

      // 3. Map new item and update state (UPDATED to handle array response)
      const newItem = {
        id: response.data.data.id,
        title: response.data.data.title,
        message: response.data.data.message,
        startDate: response.data.data.startDate,
        // announcementType: response.data.data.announcementType,
        // priority: response.data.data.isPinned ? "High" : "Low",
        unitId: response.data.data.unitId?.unitIds || [],
        deptId: response.data.data.deptId?.deptIds || [],
      };

      setAnnouncements([newItem, ...announcements]);
      setShowAddDialog(false);
      resetNewAnnoc();
      setCurrentPage(1);
      toast.success("Announcement added successfully!");
    } catch (err) {
      console.error("Failed to add announcement", err);
      toast.error("Failed to add announcement");
    }
  };

  const handleEdit = (announcement: any) => {
    // Map data for the edit dialog, ensuring unitId/deptId are always arrays
    setEditingAnnouncement({
      ...announcement,
      startDate: announcement.startDate
        ? new Date(announcement.startDate).toISOString().split("T")[0]
        : "",
      unitId: Array.isArray(announcement.unitId) ? announcement.unitId : (announcement.unitId ? [announcement.unitId] : []),
      deptId: Array.isArray(announcement.deptId) ? announcement.deptId : (announcement.deptId ? [announcement.deptId] : []),
    });
    setFormErrors({});
    setShowEditDialog(true);
  };

  const handleUpdate = async () => {
    if (!editingAnnouncement) return true;

    // 1. Validate form
    const errors = validateAnnouncementForm(editingAnnouncement, announcements);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return true;

    // 2. Prepare payload for API (UPDATED for array payload)
    const payload = {
      title: editingAnnouncement.title,
      message: editingAnnouncement.message,
      startDate: new Date(editingAnnouncement.startDate).toISOString(),
      // announcementType: editingAnnouncement.announcementType,
      // isPinned: editingAnnouncement.priority === "High",
      unitId: { unitIds: editingAnnouncement.unitId },
      deptId: { deptIds: editingAnnouncement.deptId },
    };

    try {
      const response = await api.put(
        ANNOUNCEMENTS_ENDPOINTS.PUT_ANNOUNCEMENTS(editingAnnouncement.id),
        payload
      );

      // 3. Map updated item and update state (UPDATED to handle array response)
      const updatedItem = {
        id: response.data.data.id,
        title: response.data.data.title,
        message: response.data.data.message,
        startDate: response.data.data.startDate,
        // announcementType: response.data.data.announcementType,
        // priority: response.data.data.isPinned ? "High" : "Low",
        unitId: response.data.data.unitId?.unitIds || [],
        deptId: response.data.data.deptId?.deptIds || [],
      };

      setAnnouncements((prev) =>
        prev.map((a) => (a.id === updatedItem.id ? updatedItem : a))
      );

      setFormErrors({});
      setCurrentPage(1);
      toast.success("Announcement updated successfully!");
      return false;
    } catch (err) {
      console.error("Failed to update announcement", err);
      toast.error("Failed to update announcement");
      return true;
    }
  };

  const handleDeleteClick = (id: number) => {
    setAnnouncementToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!announcementToDelete) return;
    try {
      await api.delete(ANNOUNCEMENTS_ENDPOINTS.DELETE_ANNOUNCEMENTS(announcementToDelete));
      setAnnouncements(announcements.filter((a) => a.id !== announcementToDelete));
      setCurrentPage(1);
      toast.success("Announcement deleted successfully!");
    } catch (err) {
      console.error("Failed to delete announcement", err);
      toast.error("Failed to delete announcement");
    } finally {
      setDeleteConfirmOpen(false);
      setAnnouncementToDelete(null);
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>, type: 'csv' | 'xlsx') => {
    const file = event.target.files?.[0];
    if (file) {
      toast.success(`${type.toUpperCase()} file "${file.name}" uploaded successfully! 📤`);
      setShowAddDialog(false);
    }
  };

  // Update filteredAnnouncements to search by unit/dept name as well
  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // a.announcementType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.unitId.some((id: string) => {
        const unitName = getUnitName(id);
        return unitName ? unitName.toLowerCase().includes(searchQuery.toLowerCase()) : false;
      }) ||
      a.deptId.some((id: string) => {
        const deptName = getDeptName(id);
        return deptName ? deptName.toLowerCase().includes(searchQuery.toLowerCase()) : false;
      }) ||
      new Date(a.startDate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).toLowerCase().includes(searchQuery.toLowerCase())
    // a.priority.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAnnouncements.length / pageSize);
  const paginatedAnnouncements = filteredAnnouncements.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      {/* Header and Search/Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Announcements</h1>
          <p className="text-muted-foreground mt-1">
            {viewOnly ? "View company-wide announcements" : "Manage company-wide announcements"}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {!viewOnly && (
            <Button className="btn-add-purple" onClick={() => { setShowAddDialog(true); resetNewAnnoc(); }}>
              <Plus className="size-4 mr-2" />
              New Announcement
            </Button>
          )}
        </div>
      </div>

      {/* Announcements List */}
      <Card className="announcement_card">
        <CardContent className="p-6 announcements_hr">
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading announcements...</p>
              </div>
            ) : paginatedAnnouncements.length > 0 ? (
              paginatedAnnouncements.map((announcement) => (
                <Card
                  key={announcement.id}
                  className="border-l-4 border-l-primary hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4 flex items-start justify-between">
                    <div className="flex-1">
                      {/* Title */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-semibold">{announcement.title}</h3>
                      </div>

                      {/* Fixed columns: Business Unit | Department | Posted On */}
                      <div className="grid grid-cols-3 gap-4 mb-2 text-sm text-muted-foreground">
                        <div>
                          <strong className="inline">Business Units:</strong>{" "}
                          <span className="inline break-words">
                            {announcement.unitId.map((id: string) => getUnitName(id)).join(", ")}
                          </span>
                        </div>
                        <div>
                          <strong className="inline">Department:</strong>{" "}
                          <span className="inline break-words">
                            {/* {announcement.deptId.map((id: string) => getDeptName(id)).join(", ")} */}
                            {announcement.deptId
                              .map((id: string) => getDeptName(id))
                              .filter((name: string | undefined): name is string => !!name) // <-- Filter out undefined/empty names
                              .join(", ")}
                          </span>
                        </div>
                        <div>
                          <strong className="inline">Posted On:</strong>{" "}
                          <span className="inline">
                            {new Date(announcement.startDate).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>


                      {/* Message */}
                      <div className="grid mb-2 text-sm text-muted-foreground">
                        <strong>Description:</strong>{" "}
                        <p className="text-sm text-muted-foreground mb-2">
                          {announcement.message}
                        </p>
                      </div>
                    </div>

                    {/* Edit/Delete Buttons */}
                    {!viewOnly && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(announcement)}
                        >
                          <Edit className="size-4 text-gray-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(announcement.id)}
                        >
                          <Trash2 className="size-4 text-gray-500" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

              ))
            ) : (
              <div className="text-center py-12">
                <Megaphone className="size-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No announcements found</p>
                {/* {!viewOnly && (
                  <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
                    <Plus className="size-4 mr-2" />
                    Create Announcement
                  </Button>
                )} */}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
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
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Add Dialog with validation */}
      <Dialog open={showAddDialog}
        onOpenChange={(open: boolean) => {
          setShowAddDialog(open);
          if (!open) resetNewAnnoc(); // Reset the form when dialog is closed
        }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Announcement</DialogTitle>
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    placeholder="Enter announcement title"
                    value={newAnnouncement.title}
                    onChange={(e) => {
                      setNewAnnouncement({ ...newAnnouncement, title: e.target.value });
                      setFormErrors((prev) => ({ ...prev, title: "" }));
                    }}
                  />
                  {formErrors.title && <p className="text-sm text-destructive">{formErrors.title}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Enter announcement details"
                    value={newAnnouncement.message}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {/* Business Unit Multi-Select (ADD) */}
                  <div className="space-y-2">
                    <Label>Business Unit(s) *</Label>
                    <Select
                      value={newAnnouncement.unitId.join(',')} // Join array to string for SelectValue to display
                      onValueChange={(value: any) => {
                        // value is the clicked unit ID
                        handleMultiSelectChange(newAnnouncement.unitId, value, setNewAnnouncement, 'unitId');
                      }}
                      // The multiple prop is a pseudo-prop used to keep the dropdown open
                      multiple
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Business Unit(s)">
                          {newAnnouncement.unitId.length > 0
                            ? newAnnouncement.unitId.map(getUnitName).join(", ")
                            : "Select Business Unit(s)"}
                        </SelectValue>
                      </SelectTrigger>

                      <SelectContent>
                        {businessUnits.map((unit) => {
                          const isSelected = newAnnouncement.unitId.includes(unit.id);
                          return (
                            <div
                              key={unit.id}
                              onClick={() => {
                                const updated = isSelected
                                  ? newAnnouncement.unitId.filter((v) => v !== unit.id)
                                  : [...newAnnouncement.unitId, unit.id];
                                setNewAnnouncement((prev) => ({ ...prev, unitId: updated }));
                                if (formErrors.unitId) setFormErrors((prev) => ({ ...prev, unitId: "" }));
                              }}
                              className={`flex items-center justify-between w-full cursor-pointer px-2 py-1.5 rounded-md hover:bg-accent text-sm ${isSelected ? "bg-accent text-primary" : ""
                                }`}
                            >
                              <span>{unit.unitName}</span>
                              {isSelected && <Check className="size-4 text-primary" />}
                            </div>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    {formErrors.unitId && <p className="text-sm text-destructive">{formErrors.unitId}</p>}
                  </div>

                  {/* Department Multi-Select (ADD) */}
                  <div className="space-y-2">
                    <Label>Department(s) *</Label>
                    <Select
                      value={newAnnouncement.deptId.join(',')} // Join array to string for SelectValue to display
                      onValueChange={(value: any) => {
                        // value is the clicked department ID
                        handleMultiSelectChange(newAnnouncement.deptId, value, setNewAnnouncement, 'deptId');
                      }}
                      // The multiple prop is a pseudo-prop used to keep the dropdown open
                      multiple
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Department(s)">
                          {newAnnouncement.deptId.length > 0
                            ? newAnnouncement.deptId.map(getDeptName).join(", ")
                            : "Select Department(s)"}
                        </SelectValue>
                      </SelectTrigger>

                      <SelectContent>
                        {departments.map((dept) => {
                          const isSelected = newAnnouncement.deptId.includes(dept.id);
                          return (
                            <div
                              key={dept.id}
                              onClick={() => {
                                const updated = isSelected
                                  ? newAnnouncement.deptId.filter((v) => v !== dept.id)
                                  : [...newAnnouncement.deptId, dept.id];
                                setNewAnnouncement((prev) => ({ ...prev, deptId: updated }));
                                if (formErrors.deptId)
                                  setFormErrors((prev) => ({ ...prev, deptId: "" }));
                              }}
                              className={`flex items-center justify-between w-full cursor-pointer px-2 py-1.5 rounded-md hover:bg-accent text-sm ${isSelected ? "bg-accent text-primary" : ""
                                }`}
                            >
                              <span>{dept.deptName}</span>
                              {isSelected && <Check className="size-4 text-primary" />}
                            </div>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    {formErrors.deptId && <p className="text-sm text-destructive">{formErrors.deptId}</p>}
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={newAnnouncement.startDate}
                      onChange={(e) => {
                        setNewAnnouncement({ ...newAnnouncement, startDate: e.target.value });
                        setFormErrors((prev) => ({ ...prev, startDate: "" }));
                      }}
                    />
                    {formErrors.startDate && <p className="text-sm text-destructive">{formErrors.startDate}</p>}
                  </div>
                </div>

                {/* <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Input
                      placeholder="Enter category"
                      value={newAnnouncement.announcementType}
                      onChange={(e) => {
                        setNewAnnouncement({ ...newAnnouncement, announcementType: e.target.value });
                        setFormErrors((prev) => ({ ...prev, announcementType: "" }));
                      }}
                    />
                    {formErrors.announcementType && <p className="text-sm text-destructive">{formErrors.announcementType}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <div className="flex rounded-lg border border-input overflow-hidden borderpri">
                      <button
                        type="button"
                        onClick={() => setNewAnnouncement({ ...newAnnouncement, isPinned: false })}
                        className={cn(
                          "flex-1 px-4 py-2 text-sm transition-colors",
                          !newAnnouncement.isPinned
                            ? "bg-primary text-primary-foreground"
                            : "bg-background hover:bg-muted"
                        )}
                      >
                        Low
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewAnnouncement({ ...newAnnouncement, isPinned: true })}
                        className={cn(
                          "flex-1 px-4 py-2 text-sm transition-colors",
                          newAnnouncement.isPinned
                            ? "bg-primary text-primary-foreground"
                            : "bg-background hover:bg-muted"
                        )}
                      >
                        High
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => { setShowAddDialog(false); resetNewAnnoc() }}>Cancel</Button>
                <Button className="btn-add-purple" onClick={handleAdd}>
                  <Plus className="size-4 mr-2" /> Publish Announcement
                </Button>
              </DialogFooter>
            </TabsContent>

            {/* Import Tab (Unchanged) */}
            <TabsContent value="import" className="space-y-4 mt-4">
              <div className="border-2 border-dashed rounded-lg p-8">
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                      <FileSpreadsheet className="size-12 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Upload Announcements Data</h3>
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
                        id="csv-upload-announce"
                        onChange={(e) => handleFileImport(e, 'csv')}
                      />
                      <Button type="button" variant="outline" onClick={() => document.getElementById('csv-upload-announce')?.click()}>
                        <Upload className="size-4 mr-2" />
                        Upload CSV
                      </Button>
                    </div>
                    <div>
                      <input
                        type="file"
                        accept=".xlsx,.xls"
                        className="hidden"
                        id="xlsx-upload-announce"
                        onChange={(e) => handleFileImport(e, 'xlsx')}
                      />
                      <Button type="button" onClick={() => document.getElementById('xlsx-upload-announce')?.click()}>
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


      {/* Edit Dialog with validation */}
      <Dialog
        open={showEditDialog && !!editingAnnouncement}
        onOpenChange={(open: any) => {
          if (!open) setEditingAnnouncement(null);
          setShowEditDialog(open);
        }}
      >
        {editingAnnouncement && showEditDialog && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Announcement</DialogTitle>
              <DialogDescription>Update announcement information</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  value={editingAnnouncement.title}
                  onChange={(e) => {
                    setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value });
                    setFormErrors((prev) => ({ ...prev, title: "" }));
                  }}
                />
                {formErrors.title && (
                  <p className="text-sm text-destructive">{formErrors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editingAnnouncement.message}
                  onChange={(e) =>
                    setEditingAnnouncement({ ...editingAnnouncement, message: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Business Unit Multi-Select (EDIT) */}
                <div className="space-y-2">
                  <Label>Business Unit(s) *</Label>
                  <Select
                    value={editingAnnouncement.unitId.join(',')} // Join array to string for SelectValue to display
                    onValueChange={(value: any) => {
                      // value is the clicked unit ID
                      handleMultiSelectChange(editingAnnouncement.unitId, value, setEditingAnnouncement, 'unitId');
                    }}
                    // The multiple prop is a pseudo-prop used to keep the dropdown open
                    multiple
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Business Unit(s)">
                        {editingAnnouncement.unitId.length > 0
                          ? editingAnnouncement.unitId.map(getUnitName).join(", ")
                          : "Select Business Unit(s)"}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {businessUnits.map((unit) => {
                        const isSelected = editingAnnouncement.unitId.includes(unit.id);
                        return (
                          <div
                            key={unit.id}
                            onClick={() => {
                              const updated = isSelected
                                ? editingAnnouncement.unitId.filter((id: any) => id !== unit.id)
                                : [...editingAnnouncement.unitId, unit.id];
                              setEditingAnnouncement((prev: any) => ({ ...prev, unitId: updated }));
                              setFormErrors((prev) => ({ ...prev, unitId: "" }));
                            }}
                            className={`flex items-center justify-between w-full cursor-pointer px-2 py-1.5 rounded-md hover:bg-accent text-sm ${isSelected ? "bg-accent text-primary" : ""
                              }`}
                          >
                            <span>{unit.unitName}</span>
                            {isSelected && <Check className="size-4 text-primary" />}
                          </div>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {formErrors.unitId && <p className="text-sm text-destructive">{formErrors.unitId}</p>}
                </div>

                {/* Department Multi-Select (EDIT) */}
                <div className="space-y-2">
                  <Label>Department(s) *</Label>
                  <Select
                    value={editingAnnouncement.deptId.join(',')} // Join array to string for SelectValue to display
                    onValueChange={(value: any) => {
                      // value is the clicked department ID
                      handleMultiSelectChange(editingAnnouncement.deptId, value, setEditingAnnouncement, 'deptId');
                    }}
                    // The multiple prop is a pseudo-prop used to keep the dropdown open
                    multiple
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department(s)">
                        {editingAnnouncement.deptId.length > 0
                          ? editingAnnouncement.deptId.map(getDeptName).join(", ")
                          : "Select Department(s)"}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {departments.map((dept) => {
                        const isSelected = editingAnnouncement.deptId.includes(dept.id);
                        return (
                          <div
                            key={dept.id}
                            onClick={() => {
                              const updated = isSelected
                                ? editingAnnouncement.deptId.filter((id: any) => id !== dept.id)
                                : [...editingAnnouncement.deptId, dept.id];
                              setEditingAnnouncement((prev: any) => ({ ...prev, deptId: updated }));
                              setFormErrors((prev) => ({ ...prev, deptId: "" }));
                            }}
                            className={`flex items-center justify-between w-full cursor-pointer px-2 py-1.5 rounded-md hover:bg-accent text-sm ${isSelected ? "bg-accent text-primary" : ""
                              }`}
                          >
                            <span>{dept.deptName}</span>
                            {isSelected && <Check className="size-4 text-primary" />}
                          </div>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {formErrors.deptId && <p className="text-sm text-destructive">{formErrors.deptId}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Input
                    type="date"
                    value={editingAnnouncement.startDate}
                    onChange={(e) => {
                      setEditingAnnouncement({ ...editingAnnouncement, startDate: e.target.value });
                      setFormErrors((prev) => ({ ...prev, startDate: "" }));
                    }}
                  />
                  {formErrors.startDate && (
                    <p className="text-sm text-destructive">{formErrors.startDate}</p>
                  )}
                </div>
              </div>

              {/* <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Input
                    placeholder="Enter category"
                    value={editingAnnouncement.announcementType || ""}
                    onChange={(e) => {
                      setEditingAnnouncement({ ...editingAnnouncement, announcementType: e.target.value });
                      setFormErrors((prev) => ({ ...prev, announcementType: "" }));
                    }}
                  />
                  {formErrors.announcementType && (
                    <p className="text-sm text-destructive">{formErrors.announcementType}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <div className="flex rounded-lg border border-input overflow-hidden borderpri">
                    <button
                      type="button"
                      onClick={() => setEditingAnnouncement({ ...editingAnnouncement, priority: 'Low' })}
                      className={cn(
                        "flex-1 px-4 py-2 text-sm transition-colors",
                        editingAnnouncement.priority === 'Low'
                          ? "bg-primary text-primary-foreground"
                          : "bg-background hover:bg-muted"
                      )}
                    >
                      Low
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingAnnouncement({ ...editingAnnouncement, priority: 'High' })}
                      className={cn(
                        "flex-1 px-4 py-2 text-sm transition-colors",
                        editingAnnouncement.priority === 'High'
                          ? "bg-primary text-primary-foreground"
                          : "bg-background hover:bg-muted"
                      )}
                    >
                      High
                    </button>
                  </div>
                </div>
              </div> */}

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowEditDialog(false);
                    setEditingAnnouncement(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    const hasErrors = await handleUpdate();
                    if (!hasErrors) {
                      setShowEditDialog(false);
                      setEditingAnnouncement(null);
                    }
                  }}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        )}
      </Dialog>


      {/* Delete Confirmation (Unchanged) */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the announcement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
