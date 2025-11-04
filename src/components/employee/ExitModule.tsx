import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function ExitModule() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resignationReason, setResignationReason] = useState("");
  const [hasResigned, setHasResigned] = useState(false);

  const clearanceChecklist = [
    { item: "IT Assets Return", department: "IT", status: "Pending", deadline: "Oct 25, 2025" },
    { item: "Finance Clearance", department: "Finance", status: "Pending", deadline: "Oct 26, 2025" },
    { item: "Admin Clearance", department: "Admin", status: "Pending", deadline: "Oct 26, 2025" },
    { item: "HR Exit Interview", department: "HR", status: "Pending", deadline: "Oct 27, 2025" },
  ];

  const handleSubmitResignation = () => {
    if (!resignationReason.trim()) {
      toast.error("Please provide a reason for resignation");
      return;
    }
    setHasResigned(true);
    toast.success("Resignation submitted successfully!", {
      description: "Your manager will review your request",
    });
    setIsDialogOpen(false);
  };

  const completionPercentage = hasResigned ? 0 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Exit Management</h1>
          <p className="text-muted-foreground">Manage your resignation and exit process</p>
        </div>
        {!hasResigned && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Submit Resignation</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Resignation</DialogTitle>
                <DialogDescription>
                  Please provide the details for your resignation
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Reason for Leaving</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="better">Better Opportunity</SelectItem>
                      <SelectItem value="personal">Personal Reasons</SelectItem>
                      <SelectItem value="relocation">Relocation</SelectItem>
                      <SelectItem value="education">Higher Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Last Working Date</Label>
                  <input type="date" className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="space-y-2">
                  <Label>Additional Comments</Label>
                  <Textarea
                    placeholder="Please provide additional details..."
                    value={resignationReason}
                    onChange={(e) => setResignationReason(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-800">
                    ⚠ Notice Period: As per company policy, you are required to serve 60 days notice period unless waived by management.
                  </p>
                </div>
                <Button
                  onClick={handleSubmitResignation}
                  className="w-full"
                  variant="destructive"
                >
                  Submit Resignation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {!hasResigned ? (
        <Card className="border-l-4 border-l-secondary">
          <CardHeader>
            <CardTitle className="font-bold">Exit Process Information</CardTitle>
            <CardDescription>What to expect when you resign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <div>
                  <h4>Submit Resignation</h4>
                  <p className="text-sm text-muted-foreground">
                    Submit your resignation through the online portal
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <div>
                  <h4>Manager Approval</h4>
                  <p className="text-sm text-muted-foreground">
                    Your manager will review and approve your resignation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <div>
                  <h4>Clearance Process</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete clearance from IT, Finance, Admin, and HR departments
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">4</span>
                </div>
                <div>
                  <h4>Exit Interview & Documents</h4>
                  <p className="text-sm text-muted-foreground">
                    Attend exit interview and receive relieving letter, service letter, and F&F
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Exit Status Card */}
          <Card className="border-l-4 border-l-secondary">
            <CardHeader>
              <CardTitle className="font-bold">Exit Process Status</CardTitle>
              <CardDescription>Track your clearance progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-columns-three gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Resignation Status</p>
                  <Badge variant="secondary" className="mt-1">Manager Review Pending</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Working Day</p>
                  <p className="font-medium">Oct 30, 2025</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days Remaining</p>
                  <p className="font-medium text-orange-600">21 days</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Overall Clearance Progress</span>
                  <span className="text-sm font-medium">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Clearance Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">Clearance Checklist</CardTitle>
              <CardDescription>Complete clearance from all departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clearanceChecklist.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-muted flex items-center justify-center">
                        {item.status === "Completed" ? (
                          <CheckCircle className="size-5 text-orange-600" />
                        ) : item.status === "In Progress" ? (
                          <Clock className="size-5 text-orange-600" />
                        ) : (
                          <AlertCircle className="size-5 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.item}</p>
                        <p className="text-sm text-muted-foreground">{item.department} Department</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          item.status === "Completed"
                            ? "default"
                            : item.status === "In Progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {item.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">Due: {item.deadline}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">Exit Documents</CardTitle>
              <CardDescription>Your exit-related documents will appear here once processed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Relieving Letter", status: "Pending", available: false },
                  { name: "Service Certificate", status: "Pending", available: false },
                  { name: "Full & Final Settlement", status: "Pending", available: false },
                  { name: "Form 16", status: "Pending", available: false },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-orange-600" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.status}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" disabled={!doc.available}>
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}