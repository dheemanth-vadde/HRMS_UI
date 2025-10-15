import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AlertCircle, MessageSquare, Clock, CheckCircle2, XCircle, AlertTriangle, FileText, Mail, TrendingUp, Plus, Search, Filter, Download } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function GrievanceModule() {
  const [isGrievanceDialogOpen, setIsGrievanceDialogOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  const grievanceStats = {
    total: 8,
    open: 3,
    inProgress: 2,
    resolved: 3,
    avgResolutionTime: "4.2 days",
  };

  const grievanceCategories = [
    "Workplace Harassment",
    "Salary & Compensation",
    "Work Environment",
    "Leave & Attendance",
    "Performance Appraisal",
    "Transfer & Posting",
    "Training & Development",
    "IT & Infrastructure",
    "Health & Safety",
    "Others",
  ];

  const priorityLevels = [
    { value: "critical", label: "Critical", sla: "24 hours" },
    { value: "high", label: "High", sla: "48 hours" },
    { value: "medium", label: "Medium", sla: "5 days" },
    { value: "low", label: "Low", sla: "10 days" },
  ];

  const myGrievances = [
    {
      id: "GRV-2025-001",
      category: "IT & Infrastructure",
      subject: "System access issue for HRMS portal",
      status: "In Progress",
      priority: "high",
      submittedOn: "Oct 1, 2025",
      slaDeadline: "Oct 3, 2025",
      daysRemaining: 1,
      lastUpdate: "Under review by IT team",
      isAnonymous: false,
      escalationLevel: 1,
      assignedTo: "IT Support Team",
    },
    {
      id: "GRV-2025-002",
      category: "Leave & Attendance",
      subject: "Leave balance discrepancy",
      status: "Resolved",
      priority: "medium",
      submittedOn: "Sep 25, 2025",
      resolvedOn: "Sep 30, 2025",
      slaDeadline: "Sep 30, 2025",
      daysRemaining: 0,
      lastUpdate: "Issue resolved. Leave balance updated.",
      isAnonymous: false,
      escalationLevel: 0,
      assignedTo: "HR Team",
      resolution: "Your leave balance has been corrected. The discrepancy was due to a system sync issue which has been fixed.",
    },
    {
      id: "GRV-2025-003",
      category: "Work Environment",
      subject: "Air conditioning not working in office",
      status: "Open",
      priority: "low",
      submittedOn: "Oct 5, 2025",
      slaDeadline: "Oct 15, 2025",
      daysRemaining: 6,
      lastUpdate: "Complaint registered. Awaiting assignment.",
      isAnonymous: true,
      escalationLevel: 0,
      assignedTo: "Pending",
    },
  ];

  const escalationMatrix = [
    { level: 0, designation: "Immediate Supervisor", timeline: "0-2 days" },
    { level: 1, designation: "Department Head", timeline: "2-4 days" },
    { level: 2, designation: "HR Manager", timeline: "4-6 days" },
    { level: 3, designation: "Chief HR Officer", timeline: "6-8 days" },
    { level: 4, designation: "Management Committee", timeline: "8+ days" },
  ];

  const handleSubmitGrievance = () => {
    if (!selectedCategory || !selectedPriority) {
      toast.error("Please fill all required fields");
      return;
    }

    const grievanceId = `GRV-2025-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    toast.success(
      isAnonymous 
        ? `Anonymous grievance ${grievanceId} submitted successfully!`
        : `Grievance ${grievanceId} submitted successfully!`,
      {
        description: "You will receive email updates on your registered email ID.",
      }
    );

    // Simulate auto-mailer
    setTimeout(() => {
      toast.info("Email Notification", {
        description: `Confirmation email sent. Your grievance ${grievanceId} has been registered and assigned to the concerned team.`,
      });
    }, 2000);

    setIsGrievanceDialogOpen(false);
    setIsAnonymous(false);
    setSelectedCategory("");
    setSelectedPriority("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700 border-green-300";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Open":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Escalated":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive";
      case "high":
        return "warning";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getSLAColor = (daysRemaining: number) => {
    if (daysRemaining < 0) return "text-red-600";
    if (daysRemaining <= 1) return "text-orange-600";
    if (daysRemaining <= 3) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-primary">Grievance Management System</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Submit and track your workplace grievances
          </p>
        </div>
        <Dialog open={isGrievanceDialogOpen} onOpenChange={setIsGrievanceDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-gradient-primary">
              <Plus className="size-4 mr-2" />
              Submit Grievance
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-primary">Submit New Grievance</DialogTitle>
              <DialogDescription>
                Your grievance will be handled confidentially and resolved as per SLA timelines
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Anonymous Option */}
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold">Submit Anonymously</Label>
                  <p className="text-xs text-muted-foreground">
                    Your identity will be kept confidential
                  </p>
                </div>
                <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grievance category" />
                  </SelectTrigger>
                  <SelectContent>
                    {grievanceCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label>Priority Level *</Label>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityLevels.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label} (SLA: {priority.sla})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label>Subject *</Label>
                <Input placeholder="Brief description of your grievance" />
              </div>

              {/* Detailed Description */}
              <div className="space-y-2">
                <Label>Detailed Description *</Label>
                <Textarea 
                  placeholder="Provide detailed information about your grievance..."
                  rows={6}
                />
              </div>

              {/* Attachments */}
              <div className="space-y-2">
                <Label>Supporting Documents (Optional)</Label>
                <Input type="file" multiple />
                <p className="text-xs text-muted-foreground">
                  You can upload images, PDFs, or documents (Max 5 files, 10MB each)
                </p>
              </div>

              {/* Preferred Contact */}
              {!isAnonymous && (
                <div className="space-y-2">
                  <Label>Preferred Contact Method</Label>
                  <Select defaultValue="email">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsGrievanceDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitGrievance}
                className="flex-1 btn-gradient-primary"
              >
                Submit Grievance
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-primary font-bold">Total Grievances</CardTitle>
              <div className="p-2 rounded-full bg-orange-100">
                <MessageSquare className="size-5 text-orange-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-3xl font-bold text-orange-600">{grievanceStats.total}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-primary font-bold">Open</CardTitle>
              <div className="p-2 rounded-full bg-orange-100">
                <AlertCircle className="size-5 text-orange-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-3xl font-bold text-orange-600">{grievanceStats.open}</div>
            <p className="text-xs text-muted-foreground">Awaiting assignment</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-primary font-bold">In Progress</CardTitle>
              <div className="p-2 rounded-full bg-orange-100">
                <Clock className="size-5 text-orange-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-3xl font-bold text-orange-600">{grievanceStats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Being resolved</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-primary font-bold">Resolved</CardTitle>
              <div className="p-2 rounded-full bg-orange-100">
                <CheckCircle2 className="size-5 text-orange-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-3xl font-bold text-orange-600">{grievanceStats.resolved}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-primary font-bold">Avg Resolution</CardTitle>
              <div className="p-2 rounded-full bg-orange-100">
                <TrendingUp className="size-5 text-orange-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-2xl font-bold text-orange-600">{grievanceStats.avgResolutionTime}</div>
            <p className="text-xs text-muted-foreground">Response time</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Grievances and Escalation Matrix */}
      <Tabs defaultValue="grievances" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="grievances">My Grievances</TabsTrigger>
          <TabsTrigger value="escalation">Escalation Matrix</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        </TabsList>

        {/* My Grievances Tab */}
        <TabsContent value="grievances" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-bold">My Grievances</CardTitle>
                  <CardDescription>Track all your submitted grievances</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="size-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="size-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myGrievances.map((grievance) => (
                  <Card key={grievance.id} className="border border-border">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-sm">{grievance.id}</CardTitle>
                            {grievance.isAnonymous && (
                              <Badge variant="outline" className="text-xs">
                                Anonymous
                              </Badge>
                            )}
                            <Badge variant={getPriorityColor(grievance.priority)} className="text-xs">
                              {grievance.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="font-semibold text-foreground">{grievance.subject}</p>
                          <p className="text-xs text-muted-foreground">
                            Category: {grievance.category}
                          </p>
                        </div>
                        <Badge className={getStatusColor(grievance.status)}>
                          {grievance.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Submitted On</p>
                          <p className="text-sm font-medium">{grievance.submittedOn}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">SLA Deadline</p>
                          <p className={`text-sm font-medium ${getSLAColor(grievance.daysRemaining)}`}>
                            {grievance.slaDeadline}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Assigned To</p>
                          <p className="text-sm font-medium">{grievance.assignedTo}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Escalation Level</p>
                          <p className="text-sm font-medium">
                            Level {grievance.escalationLevel}
                            {grievance.escalationLevel > 0 && (
                              <AlertTriangle className="inline size-4 text-orange-600 ml-1" />
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Last Update */}
                      <div className="p-3 bg-muted/50 rounded-lg mb-3">
                        <div className="flex items-start gap-2">
                          <Mail className="size-4 text-primary mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground">Latest Update</p>
                            <p className="text-sm">{grievance.lastUpdate}</p>
                          </div>
                        </div>
                      </div>

                      {/* Resolution (if resolved) */}
                      {grievance.status === "Resolved" && grievance.resolution && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-3">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="size-4 text-green-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-green-700 font-semibold">Resolution</p>
                              <p className="text-sm text-green-900">{grievance.resolution}</p>
                              <p className="text-xs text-green-600 mt-1">
                                Resolved on: {grievance.resolvedOn}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SLA Timer */}
                      {grievance.status !== "Resolved" && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="size-4" />
                            <span className={getSLAColor(grievance.daysRemaining)}>
                              {grievance.daysRemaining > 0
                                ? `${grievance.daysRemaining} days remaining`
                                : grievance.daysRemaining === 0
                                ? "Due today"
                                : `Overdue by ${Math.abs(grievance.daysRemaining)} days`}
                            </span>
                          </div>
                          <Button variant="outline" size="sm">
                            <FileText className="size-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Escalation Matrix Tab */}
        <TabsContent value="escalation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">Escalation Matrix</CardTitle>
              <CardDescription>
                SLA-driven automatic escalation process for grievance resolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {escalationMatrix.map((level, index) => (
                  <div
                    key={level.level}
                    className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30"
                  >
                    <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {level.level}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{level.designation}</p>
                      <p className="text-sm text-muted-foreground">
                        Timeline: {level.timeline}
                      </p>
                    </div>
                    {index < escalationMatrix.length - 1 && (
                      <TrendingUp className="size-5 text-orange-600" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900">Auto-Escalation Process</p>
                    <p className="text-sm text-blue-700 mt-1">
                      If a grievance is not resolved within the SLA timeline at any level, 
                      it will be automatically escalated to the next level. You will receive 
                      email notifications at each escalation stage.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guidelines Tab */}
        <TabsContent value="guidelines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">Grievance Submission Guidelines</CardTitle>
              <CardDescription>
                Follow these guidelines for effective grievance resolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">What can be reported?</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Workplace harassment or discrimination</li>
                    <li>Salary and compensation issues</li>
                    <li>Work environment concerns</li>
                    <li>Leave and attendance disputes</li>
                    <li>Performance appraisal grievances</li>
                    <li>Transfer and posting concerns</li>
                    <li>Any other workplace-related issues</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Anonymous Reporting</h4>
                  <p className="text-sm text-muted-foreground">
                    You can choose to submit your grievance anonymously. Your identity will be 
                    kept completely confidential. However, please note that anonymous grievances 
                    may take longer to investigate as we cannot reach out to you for clarifications.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">SLA Timelines</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {priorityLevels.map((priority) => (
                      <div key={priority.value} className="p-3 border rounded-lg">
                        <p className="font-semibold text-sm">{priority.label} Priority</p>
                        <p className="text-xs text-muted-foreground">SLA: {priority.sla}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    You will receive automatic email notifications for:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Grievance registration confirmation</li>
                    <li>Assignment to concerned team</li>
                    <li>Status updates and progress</li>
                    <li>Escalation notifications</li>
                    <li>Resolution and closure</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="size-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-900">Important Note</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        All grievances are treated with utmost confidentiality. False or 
                        malicious complaints may result in disciplinary action. Please provide 
                        accurate information and supporting evidence where applicable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
