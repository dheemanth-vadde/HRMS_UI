import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { Calendar, Plus, Clock, FileText, Coffee, Heart, Plane, CalendarClock, Edit, X, Eye } from "lucide-react";
import { toast } from "sonner@2.0.3";
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

type LeaveHistoryItem = {
  id: number;
  type: string;
  dates: string;
  days: number;
  status: string;
  appliedOn: string;
  reason: string;
};

export function LeaveModule() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveHistoryItem | null>(null);
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");

  const leaveBalance = [
    { type: "Casual Leave", balance: 8, total: 12 },
    { type: "Sick Leave", balance: 6, total: 10 },
    { type: "Earned Leave", balance: 12, total: 15 },
    { type: "Comp Off", balance: 2, total: 5 },
  ];

  const leaveHistory = [
    {
      id: 1,
      type: "Casual Leave",
      dates: "Oct 15-16, 2025",
      days: 2,
      status: "Pending",
      appliedOn: "Oct 9, 2025",
      reason: "Family function",
    },
    {
      id: 2,
      type: "Sick Leave",
      dates: "Oct 5, 2025",
      days: 1,
      status: "Approved",
      appliedOn: "Oct 4, 2025",
      reason: "Medical checkup",
    },
    {
      id: 3,
      type: "Earned Leave",
      dates: "Sep 20-24, 2025",
      days: 5,
      status: "Approved",
      appliedOn: "Sep 10, 2025",
      reason: "Vacation",
    },
    {
      id: 4,
      type: "Casual Leave",
      dates: "Aug 12, 2025",
      days: 1,
      status: "Rejected",
      appliedOn: "Aug 10, 2025",
      reason: "Personal work",
    },
  ];

  const handleApplyLeave = () => {
    if (!leaveType || !reason) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Leave application submitted!", {
      description: "Your manager will review your request",
    });
    setIsDialogOpen(false);
    setLeaveType("");
    setReason("");
  };

  const handleEditLeave = (leave: LeaveHistoryItem) => {
    setSelectedLeave(leave);
    setLeaveType(leave.type.toLowerCase().replace(" ", ""));
    setReason(leave.reason);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    toast.success("Leave request updated!", {
      description: "Your changes have been saved successfully",
    });
    setIsEditDialogOpen(false);
    setSelectedLeave(null);
    setLeaveType("");
    setReason("");
  };

  const handleCancelLeave = (leave: LeaveHistoryItem) => {
    setSelectedLeave(leave);
    setIsCancelDialogOpen(true);
  };

  const confirmCancelLeave = () => {
    toast.success("Leave request cancelled", {
      description: "Your leave application has been cancelled",
    });
    setIsCancelDialogOpen(false);
    setSelectedLeave(null);
  };

  const handleViewLeave = (leave: LeaveHistoryItem) => {
    setSelectedLeave(leave);
    setIsViewDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "default";
      case "Pending":
        return "secondary";
      case "Rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Leave Management</h1>
          <p className="text-muted-foreground">Apply and track your leave requests</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Apply for Leave
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for Leave</DialogTitle>
              <DialogDescription>Fill in the details to submit your leave request</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Leave Type</Label>
                <Select value={leaveType} onValueChange={setLeaveType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual Leave</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="earned">Earned Leave</SelectItem>
                    <SelectItem value="compoff">Comp Off</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>From Date</Label>
                <input type="date" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="space-y-2">
                <Label>To Date</Label>
                <input type="date" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="space-y-2">
                <Label>Reason</Label>
                <Textarea
                  placeholder="Enter reason for leave"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Attachment (Optional)</Label>
                <input type="file" className="w-full text-sm" />
              </div>
              <Button onClick={handleApplyLeave} className="w-full">
                Submit Application
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {leaveBalance.map((leave, index) => {
          const icons = [Coffee, Heart, Plane, CalendarClock];
          const IconComponent = icons[index];
          
          return (
            <Card key={index} className="border border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-primary font-bold">{leave.type}</CardTitle>
                  <div className="p-2 rounded-full bg-orange-100">
                    <IconComponent className="size-5 text-orange-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="text-3xl font-bold text-orange-600">{leave.balance}</div>
                <div className="text-sm text-muted-foreground">
                  of {leave.total} days available
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Leave History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary font-bold">Leave History</CardTitle>
          <CardDescription>Track all your leave applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaveHistory.map((leave) => (
              <div
                key={leave.id}
                className="flex items-start justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-orange-600" />
                    <span className="font-medium">{leave.type}</span>
                    <Badge 
                      variant={getStatusColor(leave.status)}
                      className={leave.status === "Approved" ? "bg-green-600 text-white border-transparent hover:bg-green-700" : ""}
                    >
                      {leave.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground ml-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3 text-orange-600" />
                      {leave.dates}
                    </span>
                    <span>{leave.days} day{leave.days > 1 ? "s" : ""}</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">Reason: {leave.reason}</p>
                  <p className="text-xs text-muted-foreground ml-6">Applied on: {leave.appliedOn}</p>
                </div>
                <div className="flex items-center gap-2">
                  {leave.status === "Pending" && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditLeave(leave)}
                        className="gap-1"
                      >
                        <Edit className="size-3" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCancelLeave(leave)}
                        className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="size-3" />
                        Cancel
                      </Button>
                    </>
                  )}
                  {(leave.status === "Approved" || leave.status === "Rejected") && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewLeave(leave)}
                      className="gap-1"
                    >
                      <Eye className="size-3" />
                      View
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leave Policy */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-primary font-bold">Leave Policy Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Casual Leave: Apply at least 2 days in advance (except emergencies)</li>
            <li>• Sick Leave: Medical certificate required for 3+ consecutive days</li>
            <li>• Earned Leave: Apply at least 7 days in advance</li>
            <li>• Negative leave balance is not permitted by the system</li>
            <li>• All leave requests are subject to manager approval</li>
          </ul>
        </CardContent>
      </Card>

      {/* Edit Leave Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Leave Request</DialogTitle>
            <DialogDescription>Update your leave request details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Leave Type</Label>
              <Select value={leaveType} onValueChange={setLeaveType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="earned">Earned Leave</SelectItem>
                  <SelectItem value="compoff">Comp Off</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>From Date</Label>
              <input type="date" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              <Label>To Date</Label>
              <input type="date" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
              <Label>Reason</Label>
              <Textarea
                placeholder="Enter reason for leave"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Attachment (Optional)</Label>
              <input type="file" className="w-full text-sm" />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveEdit} className="flex-1">
                Save Changes
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setSelectedLeave(null);
                  setLeaveType("");
                  setReason("");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Leave Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
            <DialogDescription>View your leave request information</DialogDescription>
          </DialogHeader>
          {selectedLeave && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Leave Type</Label>
                  <p className="font-medium mt-1">{selectedLeave.type}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    <Badge 
                      variant={getStatusColor(selectedLeave.status)}
                      className={selectedLeave.status === "Approved" ? "bg-green-600 text-white border-transparent" : ""}
                    >
                      {selectedLeave.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Duration</Label>
                <p className="font-medium mt-1">{selectedLeave.dates} ({selectedLeave.days} day{selectedLeave.days > 1 ? "s" : ""})</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Applied On</Label>
                <p className="font-medium mt-1">{selectedLeave.appliedOn}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Reason</Label>
                <p className="font-medium mt-1">{selectedLeave.reason}</p>
              </div>
              {selectedLeave.status === "Rejected" && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <Label className="text-red-900">Rejection Reason</Label>
                  <p className="text-sm text-red-700 mt-1">
                    Insufficient manpower during the requested period. Please plan your leave during non-peak hours.
                  </p>
                </div>
              )}
              {selectedLeave.status === "Approved" && (
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <Label className="text-green-900">Approval Note</Label>
                  <p className="text-sm text-green-700 mt-1">
                    Leave approved by Manager. Enjoy your time off!
                  </p>
                </div>
              )}
              <Button 
                onClick={() => {
                  setIsViewDialogOpen(false);
                  setSelectedLeave(null);
                }}
                className="w-full"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Leave Confirmation Dialog */}
      <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Leave Request?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this leave request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {selectedLeave && (
            <div className="p-3 rounded-lg bg-muted">
              <p className="font-medium text-foreground">{selectedLeave.type}</p>
              <p className="text-sm mt-1">{selectedLeave.dates} ({selectedLeave.days} day{selectedLeave.days > 1 ? "s" : ""})</p>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedLeave(null)}>
              No, Keep It
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmCancelLeave}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, Cancel Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}