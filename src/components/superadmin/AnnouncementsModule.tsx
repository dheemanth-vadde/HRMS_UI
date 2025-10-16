import { useState } from "react";
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
import { organizationAnnocument } from "../../data.json";
import { getValidationError } from "../../utils/validations"; // ✅ same as in Department module


interface AnnouncementsModuleProps {
  viewOnly?: boolean;
}

export function AnnouncementsModule({ viewOnly = false }: AnnouncementsModuleProps) {
  const [announcements, setAnnouncements] = useState(organizationAnnocument);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string | null }>({});

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    priority: "",
  });
  const resetNewAnnoc = () => {
    setNewAnnouncement({
      title: "",
      description: "",
      date: "",
      category: "",
      priority: "",
    });
    setFormErrors({});
  };

  //  Validation logic (same style as DepartmentsModule)
  const validateAnnouncementForm = (announcement: typeof newAnnouncement) => {
    const errors: { [key: string]: string | null } = {};
    const requiredFields: (keyof typeof newAnnouncement)[] = ["title", "date", "category", "priority"];

    for (const field of requiredFields) {
      const value = announcement[field];

      //  Handle dropdowns separately
      if ((field === "category" || field === "priority")) {
        if (!value || value === "Select Category" || value === "Select Priority" || value === "") {
          errors[field] = `Please select a option`;
          continue;
        }
      }

      // Check for leading/trailing spaces
      let error = getValidationError(
        "noSpaces",
        value,
        `${String(field).charAt(0).toUpperCase() + String(field).slice(1)} cannot start or end with a space`
      );
      if (error) {
        errors[String(field)] = error;
        continue;
      }

      //  Required field check
      error = getValidationError(
        "required",
        value,
        `${String(field).charAt(0).toUpperCase() + String(field).slice(1)} is required`
      );
      if (error) errors[String(field)] = error;
    }

    return errors;
  };


  //  Add with validation
  const handleAdd = () => {
    const errors = validateAnnouncementForm(newAnnouncement);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const announcementToAdd = {
      id: announcements.length + 1,
      ...newAnnouncement,
    };
    setAnnouncements([announcementToAdd, ...announcements]);
    setShowAddDialog(false);
    setNewAnnouncement({
      title: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      category: "",
      priority: "",
    });
    setFormErrors({});
    resetNewAnnoc();
    toast.success("Announcement published successfully!");
  };

  const handleEdit = (announcement: any) => {
    setEditingAnnouncement({ ...announcement });
    setFormErrors({});
  };

  // Update with validation
  const handleUpdate = () => {
    if (!editingAnnouncement) return;
    const errors = validateAnnouncementForm(editingAnnouncement);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setAnnouncements(announcements.map(a => a.id === editingAnnouncement.id ? editingAnnouncement : a));
    setEditingAnnouncement(null);
    setFormErrors({});
    toast.success("Announcement updated successfully!");
  };

  const handleDeleteClick = (id: number) => {
    setAnnouncementToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (announcementToDelete !== null) {
      setAnnouncements(announcements.filter(a => a.id !== announcementToDelete));
      toast.success("Announcement deleted successfully!");
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
        {/* <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-white shadow-sm">
                <Megaphone className="size-6 text-primary" />
              </div>
              <CardTitle>Recent Announcements</CardTitle>
            </div>
            <Button variant="outline" size="icon">
              <Search className="size-4" />
            </Button>
          </div>
        </CardHeader> */}
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
                              setFormErrors((prev) => ({ ...prev, title: null }));
                            }
                          }}
                        //onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                        />
                        {formErrors.title && <p className="text-sm text-destructive">{formErrors.title}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={editingAnnouncement.description}
                          onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Category *</Label>
                          <Select
                            value={editingAnnouncement.category}
                            onValueChange={(value) => setEditingAnnouncement({ ...editingAnnouncement, category: value })}
                          >
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="General">General</SelectItem>
                              <SelectItem value="Training">Training</SelectItem>
                              <SelectItem value="Performance">Performance</SelectItem>
                              <SelectItem value="Security">Security</SelectItem>
                            </SelectContent>
                          </Select>
                          {formErrors.category && <p className="text-sm text-destructive">{formErrors.category}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Priority *</Label>
                          <Select
                            value={editingAnnouncement.priority}
                            onValueChange={(value) => setEditingAnnouncement({ ...editingAnnouncement, priority: value })}
                          >
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                          {formErrors.priority && <p className="text-sm text-destructive">{formErrors.priority}</p>}
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setEditingAnnouncement(null)}>Cancel</Button>
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
                          <Badge variant="outline">{announcement.category}</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{announcement.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Posted on: {new Date(announcement.date).toLocaleDateString("en-IN", {
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
                        setFormErrors((prev) => ({ ...prev, title: null }));
                      }
                    }}
                  //  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  />
                  {formErrors.title && <p className="text-sm text-destructive">{formErrors.title}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Enter announcement details"
                    value={newAnnouncement.description}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={newAnnouncement.date}
                      onChange={(e) => {
                        const value = e.target.value;
                        setNewAnnouncement({ ...newAnnouncement, date: value });
                        if (formErrors.date) {
                          setFormErrors((prev) => ({ ...prev, date: null }));
                        }
                      }}
                    // onChange={(e) => setNewAnnouncement({ ...newAnnouncement, date: e.target.value })}
                    />
                    {formErrors.date && <p className="text-sm text-destructive">{formErrors.date}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={newAnnouncement.category}
                      onValueChange={(value) => {
                        setNewAnnouncement({ ...newAnnouncement, category: value });
                        // Clear error as soon as an option is selected
                        if (formErrors.category) {
                          setFormErrors((prev) => ({ ...prev, category: null }));
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Training">Training</SelectItem>
                        <SelectItem value="Performance">Performance</SelectItem>
                        <SelectItem value="Security">Security</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.category && <p className="text-sm text-destructive">{formErrors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Priority *</Label>
                    <Select
                      value={newAnnouncement.priority}
                      onValueChange={(value) => {
                        setNewAnnouncement({ ...newAnnouncement, priority: value });
                        if (formErrors.priority) {
                          setFormErrors((prev) => ({ ...prev, priority: null }));
                        }
                      }}
                      //onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.priority && <p className="text-sm text-destructive">{formErrors.priority}</p>}
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
