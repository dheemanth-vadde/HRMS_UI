import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Megaphone, Plus, Search, Filter, Edit, Trash2, Upload, FileSpreadsheet, MoreVertical } from "lucide-react";
import { Badge } from "../ui/badge";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { toast } from "sonner";
import { getValidationError } from "../../utils/validations";
import ANNOUNCEMENTS_ENDPOINTS from "../../services/announcementsEndpoints";
import api from "../../services/interceptors";


interface AnnouncementsModuleProps {
  viewOnly?: boolean;
}

export function AnnouncementsModule({ viewOnly = false }: AnnouncementsModuleProps) {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string | null }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    startDate: "",
    announcementType: "",
    isPinned: false,
  });
  const resetNewAnnoc = () => {
    setNewAnnouncement({
      title: "",
      message: "",
      startDate: "",
      announcementType: "",
      isPinned: false,
    });
    setFormErrors({});
  };

  //  Validation logic (same style as DepartmentsModule)
  const validateAnnouncementForm = (announcement: typeof newAnnouncement) => {
    const errors: { [key: string]: string | null } = {};

    const requiredFields: (keyof typeof newAnnouncement)[] = [
      "title",
      "startDate",
      "announcementType",
    ];

    for (const field of requiredFields) {
      const value = announcement[field];

      // --- Check for leading/trailing spaces for string fields only ---
      if (typeof value === "string") {
        const spaceError = getValidationError(
          "noSpaces",
          value,
          `${field.charAt(0).toUpperCase() + field.slice(1)} cannot start or end with a space`
        );
        if (spaceError) {
          errors[field] = spaceError;
          continue; 
        }
      }
   
      const safeValue =
        typeof value === "boolean" ? String(value) : (value ?? "");

      const requiredError = getValidationError(
        "required",
        safeValue,
        `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      );
      if (requiredError) {
        errors[field] = requiredError;
      }
    }

    return errors;
  };
  useEffect(() => {
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
          startDate: a.startDate || "",
          announcementType: a.announcementType || "",
          priority: a.isPinned ? "High" : "Low",
        }));


        setAnnouncements(mapped);
      } catch (err) {
        console.error("Failed to fetch announcements", err);
        toast.error("Failed to load announcements");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);


  //  Add with validation
  const handleAdd = async () => {
    //  Validate form
    const errors = validateAnnouncementForm(newAnnouncement);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return; // stop if there are validation errors

    //  Prepare payload
    const payload = {
      title: newAnnouncement.title,
      message: newAnnouncement.message,
      startDate: new Date(newAnnouncement.startDate).toISOString(), // backend expects ISO
      announcementType: newAnnouncement.announcementType,
      isPinned: newAnnouncement.isPinned,
    };

    try {
      const response = await api.post(ANNOUNCEMENTS_ENDPOINTS.POST_ANNOUNCEMENTS, payload);

      // Map response to frontend structure
      const newItem = {
        id: response.data.data.id,
        title: response.data.data.title,
        message: response.data.data.message,
        startDate: response.data.data.startDate,
        announcementType: response.data.data.announcementType,
        priority: response.data.data.isPinned ? "High" : "Low",
      };

      setAnnouncements([...announcements, newItem]);
      setShowAddDialog(false);
      resetNewAnnoc();
      toast.success("Announcement added successfully!");
    } catch (err) {
      console.error("Failed to add announcement", err);
      toast.error("Failed to add announcement");
    }
  };



  const handleEdit = (announcement: any) => {
  setEditingAnnouncement({
    ...announcement,
    startDate: announcement.startDate
      ? new Date(announcement.startDate).toISOString().split("T")[0]
      : "",
  });
  setFormErrors({});
};


  const handleUpdate = async () => {
  if (!editingAnnouncement) return;

  //  Validate form
  const errors = validateAnnouncementForm(editingAnnouncement);
  setFormErrors(errors);
  if (Object.keys(errors).length > 0) return;

  // Convert priority back to boolean for backend
  const payload = {
    title: editingAnnouncement.title,
    message: editingAnnouncement.message,
    startDate: new Date(editingAnnouncement.startDate).toISOString(),
    announcementType: editingAnnouncement.announcementType,
    isPinned: editingAnnouncement.priority === "High",
  };

  try {
    const response = await api.put(
      ANNOUNCEMENTS_ENDPOINTS.PUT_ANNOUNCEMENTS(editingAnnouncement.id),
      payload
    );

    //  Update frontend state so the changes appear immediately
    const updatedItem = {
      id: response.data.data.id,
      title: response.data.data.title,
      message: response.data.data.message,
      startDate: response.data.data.startDate,
      announcementType: response.data.data.announcementType,
      priority: response.data.data.isPinned ? "High" : "Low",
    };

    setAnnouncements((prev) =>
      prev.map((a) => (a.id === updatedItem.id ? updatedItem : a))
    );

    setEditingAnnouncement(null);
    setFormErrors({});
    toast.success("Announcement updated successfully!");
  } catch (err) {
    console.error("Failed to update announcement", err);
    toast.error("Failed to update announcement");
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
      toast.success(`${type.toUpperCase()} file "${file.name}" uploaded successfully!`);
      setShowAddDialog(false);
    }
  };
  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Announcements</h1>
          <p className="text-muted-foreground mt-1">
            {viewOnly ? "View company-wide announcements" : "Manage company-wide announcements"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="size-4 mr-2" />
            Filter
          </Button>
          {!viewOnly && (
            <Button className="btn-add-purple" onClick={() => setShowAddDialog(true)}>
              <Plus className="size-4 mr-2" />
              New Announcement
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  {editingAnnouncement?.id === announcement.id ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Title *</Label>
                        <Input
                          value={editingAnnouncement.title}
                          onChange={(e) => {
                            const value = e.target.value;
                            setEditingAnnouncement({ ...editingAnnouncement, title: value });
                            if (formErrors.title) {
                              setFormErrors((prev) => ({ ...prev, title: "" }));
                            }
                          }}
                        />
                        {formErrors.title && <p className="text-sm text-destructive">{formErrors.title}</p>}
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
                        <div className="space-y-2">
                          <Label>Date *</Label>
                          <Input
                            type="date"
                            value={editingAnnouncement.startDate}
                            onChange={(e) =>
                              setEditingAnnouncement({ ...editingAnnouncement, startDate: e.target.value })
                            }
                          />
                          {formErrors.startDate && <p className="text-sm text-destructive">{formErrors.startDate}</p>}
                        </div>

                        <div className="space-y-2 col-span-2">
                          <Label>Category *</Label>
                          <Input
                            placeholder="Enter category"
                            value={editingAnnouncement.announcementType || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditingAnnouncement({ ...editingAnnouncement, announcementType: value });
                              if (formErrors.announcementType) {
                                setFormErrors((prev) => ({ ...prev, announcementType: "" }));
                              }
                            }}
                          />
                          {formErrors.announcementType && (
                            <p className="text-sm text-destructive">{formErrors.announcementType}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <input
                          type="checkbox"
                          checked={editingAnnouncement.priority === "High"}
                          onChange={(e) =>
                            setEditingAnnouncement({
                              ...editingAnnouncement,
                              priority: e.target.checked ? "High" : "Low",
                            })
                          }
                        />

                      </div>

                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setEditingAnnouncement(null)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpdate}>Save Changes</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{announcement.title}</h3>
                          <Badge variant={announcement.priority === "High" ? "destructive" : "secondary"}>
                            {announcement.priority}
                          </Badge>
                          <Badge variant="outline">{announcement.announcementType}</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{announcement.message}</p>
                        <p className="text-xs text-muted-foreground">
                          Posted on: {new Date(announcement.startDate).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(announcement)}>
                            <Edit className="size-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(announcement.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="size-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          {announcements.length === 0 && (
            <div className="text-center py-12">
              <Megaphone className="size-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No announcements yet</p>
              <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
                <Plus className="size-4 mr-2" />
                Create First Announcement
              </Button>
            </div>
          )}        </CardContent>
      </Card>

      {/* Add Dialog with validation */}
      <Dialog open={showAddDialog}
        //</div>onOpenChange={setShowAddDialog}
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
                      const value = e.target.value;
                      setNewAnnouncement({ ...newAnnouncement, title: value });
                      if (formErrors.title) {
                        setFormErrors((prev) => ({ ...prev, title: "" }));
                      }
                    }}
                  //onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
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
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={newAnnouncement.startDate}
                      onChange={(e) => {
                        const value = e.target.value;
                        setNewAnnouncement({ ...newAnnouncement, startDate: value });
                        if (formErrors.startDate) {
                          setFormErrors((prev) => ({ ...prev, startDate: "" }));
                        }
                      }}
                    //  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, startDate: e.target.value })}
                    />
                    {formErrors.startDate && <p className="text-sm text-destructive">{formErrors.startDate}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4 col-span-2">
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Input
                        placeholder="Enter category"
                        value={newAnnouncement.announcementType}
                        onChange={(e) => {
                          const value = e.target.value;
                          setNewAnnouncement({ ...newAnnouncement, announcementType: value });
                          if (formErrors.announcementType) {
                            setFormErrors((prev) => ({ ...prev, announcementType: "" }));
                          }
                        }}
                      //  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, announcementType: e.target.value })}
                      />
                      {formErrors.announcementType && <p className="text-sm text-destructive">{formErrors.announcementType}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <input
                        type="checkbox"
                        checked={newAnnouncement.isPinned}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, isPinned: e.target.checked })}
                      />
                      {formErrors.priority && <p className="text-sm text-destructive">{formErrors.priority}</p>}
                    </div>


                  </div>

                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => { setShowAddDialog(false); resetNewAnnoc() }}>Cancel</Button>
                <Button className="btn-add-purple" onClick={handleAdd}>
                  <Plus className="size-4 mr-2" /> Publish Announcement
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

      {/* Delete Confirmation */}
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
