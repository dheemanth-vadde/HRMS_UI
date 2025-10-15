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
import { toast } from "sonner@2.0.3";

const initialAnnouncements = [
  {
    id: 1,
    title: "Festival Bonus Announcement",
    description: "The bank is pleased to announce the Diwali festival bonus for all employees. Details have been shared via email.",
    date: "2025-10-08",
    category: "Compensation",
    priority: "High",
  },
  {
    id: 2,
    title: "Digital Banking Initiative Launch",
    description: "PNB launches new digital banking services. All employees are requested to attend the training session on October 18, 2025.",
    date: "2025-10-07",
    category: "Training",
    priority: "High",
  },
  {
    id: 3,
    title: "Branch Network Expansion",
    description: "PNB is expanding its branch network with 200+ new branches across rural India. Opportunities for transfers and promotions available.",
    date: "2025-10-06",
    category: "Expansion",
    priority: "Medium",
  },
  {
    id: 4,
    title: "Quarterly Performance Review",
    description: "Q3 performance review cycle begins from October 15, 2025. All employees must complete self-assessment by October 30.",
    date: "2025-10-05",
    category: "Performance",
    priority: "High",
  },
  {
    id: 5,
    title: "Cybersecurity Awareness Week",
    description: "Join us for Cybersecurity Awareness Week from October 20-26. Mandatory training sessions for all staff members.",
    date: "2025-10-04",
    category: "Security",
    priority: "High",
  },
  {
    id: 6,
    title: "Health & Wellness Program",
    description: "New health insurance benefits and wellness programs now available. Visit HR portal for enrollment details.",
    date: "2025-10-02",
    category: "Benefits",
    priority: "Medium",
  },
];

interface AnnouncementsModuleProps {
  viewOnly?: boolean;
}

export function AnnouncementsModule({ viewOnly = false }: AnnouncementsModuleProps) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<number | null>(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    category: "General",
    priority: "Medium",
  });

  const handleAdd = () => {
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
      category: "General",
      priority: "Medium",
    });
    toast.success("Announcement published successfully!");
  };

  const handleEdit = (announcement: any) => {
    setEditingAnnouncement({ ...announcement });
  };

  const handleUpdate = () => {
    setAnnouncements(announcements.map(a => a.id === editingAnnouncement.id ? editingAnnouncement : a));
    setEditingAnnouncement(null);
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
        <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-secondary/5">
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
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  {editingAnnouncement?.id === announcement.id ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={editingAnnouncement.title}
                          onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                        />
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
                          <Label>Category</Label>
                          <Input
                            value={editingAnnouncement.category}
                            onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, category: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Priority</Label>
                          <Select
                            value={editingAnnouncement.priority}
                            onValueChange={(value) => setEditingAnnouncement({ ...editingAnnouncement, priority: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setEditingAnnouncement(null)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpdate}>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{announcement.title}</h3>
                          <Badge 
                            variant={announcement.priority === "High" ? "destructive" : "secondary"}
                          >
                            {announcement.priority}
                          </Badge>
                          <Badge variant="outline">{announcement.category}</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">
                          {announcement.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Posted on: {new Date(announcement.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
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
                            <Edit className="size-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(announcement.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="size-4 mr-2" />
                            Delete
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
          )}
        </CardContent>
      </Card>

      {/* Add/Import Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
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
                  <Label>Title</Label>
                  <Input
                    placeholder="Enter announcement title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  />
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
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={newAnnouncement.date}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={newAnnouncement.category}
                      onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Compensation">Compensation</SelectItem>
                        <SelectItem value="Training">Training</SelectItem>
                        <SelectItem value="Performance">Performance</SelectItem>
                        <SelectItem value="Security">Security</SelectItem>
                        <SelectItem value="Benefits">Benefits</SelectItem>
                        <SelectItem value="Expansion">Expansion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={newAnnouncement.priority}
                      onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button className="btn-add-purple" onClick={handleAdd}>
                  <Plus className="size-4 mr-2" />
                  Publish Announcement
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the announcement from the system.
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
