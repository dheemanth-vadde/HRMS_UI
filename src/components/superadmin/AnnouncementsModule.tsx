import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Megaphone, Plus, Search, Filter, Edit, Trash2, Upload, FileSpreadsheet, MoreVertical } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";
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
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string | null }>({});
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
  const validateAnnouncementForm = (
    announcement: typeof newAnnouncement,
    existingAnnouncements: any[] = []
  ) => {
    const errors: { [key: string]: string | null } = {};

    const requiredFields: (keyof typeof newAnnouncement)[] = [
      "title",
      "startDate",
      "announcementType",
    ];

    for (const field of requiredFields) {
      const value = announcement[field];

      // Check for leading/trailing spaces
      if (typeof value === "string") {
        const spaceError = getValidationError(
          "noSpaces",
          value,
          `This field cannot start or end with a space`
        );
        if (spaceError) {
          errors[field] = spaceError;
          continue;
        }
      }

      const safeValue = typeof value === "boolean" ? String(value) : (value ?? "");

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
    const uniqueError = getValidationError("unique", announcement.title, "This field already exists", {
      list: existingAnnouncements,
      propertyName: "title",
    });
    if (uniqueError) {
      errors.title = uniqueError;
    }

    return errors;
  };


  // const filteredUnits = businessUnits.filter(unit =>
  //   unit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   unit.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   unit.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   unit.state.toLowerCase().includes(searchQuery.toLowerCase())
  // );

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
    // Validate form including unique title
    const errors = validateAnnouncementForm(newAnnouncement, announcements);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return; // stop if errors exist

    const payload = {
      title: newAnnouncement.title,
      message: newAnnouncement.message,
      startDate: new Date(newAnnouncement.startDate).toISOString(),
      announcementType: newAnnouncement.announcementType,
      isPinned: newAnnouncement.isPinned,
    };

    try {
      const response = await api.post(ANNOUNCEMENTS_ENDPOINTS.POST_ANNOUNCEMENTS, payload);

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
    setShowEditDialog(true);
  };



  const handleUpdate = async () => {
    if (!editingAnnouncement) return true;

    const errors = validateAnnouncementForm(editingAnnouncement);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return true; // return true = errors exist

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

      setFormErrors({});
      toast.success("Announcement updated successfully!");
      return false; // no errors
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
      a.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.announcementType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      new Date(a.startDate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.priority.toLowerCase().includes(searchQuery.toLowerCase())
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
          {/* <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          /> */}

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
            <Button className="btn-add-purple" onClick={() => setShowAddDialog(true)}>
              <Plus className="size-4 mr-2" />
              New Announcement
            </Button>
          )}
        </div>
      </div>


      <Card className="announcement_card">
        <CardContent className="p-6 announcements_hr">
          <div className="space-y-4">
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((announcement) => (
                <Card
                  key={announcement.id}
                  className="border-l-4 border-l-primary hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{announcement.title}</h3>
                        <Badge
                          variant={announcement.priority === "High" ? "destructive" : "secondary"}
                        >
                          {announcement.priority}
                        </Badge>
                        <Badge variant="outline">{announcement.announcementType}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">
                        {announcement.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Posted on:{" "}
                        {new Date(announcement.startDate).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
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
                {!viewOnly && (
                  <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
                    <Plus className="size-4 mr-2" />
                    Create Announcement
                  </Button>
                )}
              </div>
            )}


            {announcements.length === 0 && (
              <div className="text-center py-12">
                <Megaphone className="size-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No announcements yet</p>
                <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
                  <Plus className="size-4 mr-2" />
                  Create First Announcement
                </Button>
              </div>
            )}
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


      <Dialog
        open={showEditDialog && !!editingAnnouncement}
        onOpenChange={(open) => {
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
                    const value = e.target.value;
                    setEditingAnnouncement({ ...editingAnnouncement, title: value });
                    if (formErrors.title) {
                      setFormErrors((prev) => ({ ...prev, title: "" }));
                    }
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
                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Input
                    type="date"
                    value={editingAnnouncement.startDate}
                    onChange={(e) =>
                      setEditingAnnouncement({ ...editingAnnouncement, startDate: e.target.value })
                    }
                  />
                  {formErrors.startDate && (
                    <p className="text-sm text-destructive">{formErrors.startDate}</p>
                  )}
                </div>

                <div className="space-y-2">
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
              </div>



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
