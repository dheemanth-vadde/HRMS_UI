import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Calendar, FileText, CheckCircle, XCircle, Clock, UserCircle, Paperclip } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function LeaveApprovals() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remarks, setRemarks] = useState("");

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeName: "Bagus Fikri",
      employeeId: "PNB10234",
      position: "Senior Officer",
      leaveType: "Public Holiday",
      fromDate: "26 Dec 2023",
      toDate: "27 Dec 2023",
      days: 2,
      reason: "To participate in family gathering...",
      appliedOn: "Oct 9, 2025 10:30 AM",
      balance: { available: 8, total: 12 },
      status: "Pending",
      attachment: "Public-Holiday-Lea...",
    },
    {
      id: 2,
      employeeName: "Indazin",
      employeeId: "PNB10567",
      position: "Officer",
      leaveType: "Sick Leave",
      fromDate: "18 Sep 2023",
      toDate: "20 Sep 2023",
      days: 3,
      reason: "Dealing with migraine attacks ch...",
      appliedOn: "Oct 9, 2025 02:15 PM",
      balance: { available: 6, total: 10 },
      status: "Pending",
      attachment: "Sick-Leave.pdf",
    },
    {
      id: 3,
      employeeName: "Mufti Hidayat",
      employeeId: "PNB10892",
      position: "Clerk",
      leaveType: "Maternity Leave",
      fromDate: "17 Sep 2023",
      toDate: "21 Sep 2023",
      days: 5,
      reason: "To prepare for childbirth and ens...",
      appliedOn: "Oct 8, 2025 04:45 PM",
      balance: { available: 12, total: 15 },
      status: "Pending",
      attachment: "Maternity-Leave.pdf",
    },
    {
      id: 4,
      employeeName: "Fauzan Andriansyah",
      employeeId: "PNB10145",
      position: "Senior Officer",
      leaveType: "Annual Leave",
      fromDate: "26 Aug 2023",
      toDate: "29 Aug 2023",
      days: 4,
      reason: "To take a planned vacation and t...",
      appliedOn: "Oct 7, 2025 09:20 AM",
      balance: { available: 10, total: 18 },
      status: "Rejected",
      attachment: "Annual-Leave.pdf",
    },
    {
      id: 5,
      employeeName: "Raihan Fikri",
      employeeId: "PNB10298",
      position: "Officer",
      leaveType: "Annual Leave",
      fromDate: "26 Aug 2023",
      toDate: "29 Aug 2023",
      days: 4,
      reason: "To prioritize personal health and...",
      appliedOn: "Oct 7, 2025 11:45 AM",
      balance: { available: 9, total: 18 },
      status: "Approved",
      attachment: "Annual-Leave.pdf",
    },
    {
      id: 6,
      employeeName: "Ifan",
      employeeId: "PNB10456",
      position: "Clerk",
      leaveType: "Annual Leave",
      fromDate: "26 Aug 2023",
      toDate: "29 Aug 2023",
      days: 4,
      reason: "To spend quality time with family...",
      appliedOn: "Oct 6, 2025 03:30 PM",
      balance: { available: 11, total: 18 },
      status: "Rejected",
      attachment: "Annual-Leave.pdf",
    },
    {
      id: 7,
      employeeName: "Panji Dwi",
      employeeId: "PNB10523",
      position: "Senior Officer",
      leaveType: "Sick Leave",
      fromDate: "18 Aug 2023",
      toDate: "19 Aug 2023",
      days: 2,
      reason: "Unexpected project deadlines th...",
      appliedOn: "Oct 6, 2025 01:15 PM",
      balance: { available: 7, total: 10 },
      status: "Approved",
      attachment: "Sick-Leave.pdf",
    },
    {
      id: 8,
      employeeName: "Laoksa Roymartey",
      employeeId: "PNB10634",
      position: "Officer",
      leaveType: "Sick Leave",
      fromDate: "20 Aug 2023",
      toDate: "22 Aug 2023",
      days: 3,
      reason: "Sustaining a physical injury such...",
      appliedOn: "Oct 5, 2025 04:50 PM",
      balance: { available: 5, total: 10 },
      status: "Pending",
      attachment: "Sick-Leave.pdf",
    },
    {
      id: 9,
      employeeName: "Bryan",
      employeeId: "PNB10745",
      position: "Clerk",
      leaveType: "Maternity Leave",
      fromDate: "17 Aug 2023",
      toDate: "20 Aug 2023",
      days: 4,
      reason: "Maternity leave allows mothers t...",
      appliedOn: "Oct 5, 2025 10:25 AM",
      balance: { available: 13, total: 15 },
      status: "Rejected",
      attachment: "Maternity-Leave.pdf",
    },
    {
      id: 10,
      employeeName: "Ardhi",
      employeeId: "PNB10856",
      position: "Senior Officer",
      leaveType: "Public Holiday",
      fromDate: "08 Aug 2023",
      toDate: "08 Aug 2023",
      days: 1,
      reason: "Holiday weekend for travel purpo...",
      appliedOn: "Oct 4, 2025 02:40 PM",
      balance: { available: 6, total: 12 },
      status: "Rejected",
      attachment: "Public-Holiday-Lea...",
    },
    {
      id: 11,
      employeeName: "Tea Sidiq",
      employeeId: "PNB10967",
      position: "Officer",
      leaveType: "Sick Leave",
      fromDate: "05 Aug 2023",
      toDate: "09 Aug 2023",
      days: 5,
      reason: "Feeling extremely tired and drain...",
      appliedOn: "Oct 4, 2025 09:30 AM",
      balance: { available: 4, total: 10 },
      status: "Pending",
      attachment: "Sick-Leave.pdf",
    },
    {
      id: 12,
      employeeName: "Rijal Jatnika",
      employeeId: "PNB11078",
      position: "Clerk",
      leaveType: "Public Holiday",
      fromDate: "08 Aug 2023",
      toDate: "08 Aug 2023",
      days: 1,
      reason: "To attend cultural events, festival...",
      appliedOn: "Oct 3, 2025 11:20 AM",
      balance: { available: 8, total: 12 },
      status: "Approved",
      attachment: "Public-Holiday-Lea...",
    },
  ]);

  const handleApprove = (request: any) => {
    setLeaveRequests(leaveRequests.map(req => 
      req.id === request.id ? { ...req, status: "Approved" } : req
    ));
    toast.success("Leave request approved!", {
      description: `${request.employeeName}'s leave has been approved`,
    });
    setIsDialogOpen(false);
    setRemarks("");
  };

  const handleReject = (request: any) => {
    if (!remarks.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    setLeaveRequests(leaveRequests.map(req => 
      req.id === request.id ? { ...req, status: "Rejected" } : req
    ));
    toast.success("Leave request rejected", {
      description: `${request.employeeName} will be notified`,
    });
    setIsDialogOpen(false);
    setRemarks("");
  };

  const openRequestDetails = (request: any) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Leave Approvals</h1>
        <p className="text-muted-foreground">Review and approve team leave requests</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-columns-three gap-4">
        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveRequests.filter(r => r.status === "Pending").length}</div>
            <p className="text-sm text-muted-foreground">Awaiting approval</p>
            <Badge variant="secondary" className="mt-2">Action Required</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveRequests.filter(r => r.status === "Approved").length}</div>
            <p className="text-sm text-muted-foreground">This month</p>
            <Badge variant="default" className="mt-2">Completed</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveRequests.filter(r => r.status === "Rejected").length}</div>
            <p className="text-sm text-muted-foreground">This month</p>
            <Badge variant="outline" className="mt-2">Declined</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Pending Leave Requests</CardTitle>
          <CardDescription>Review requests and check leave balance before approving</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[200px]">Employee</TableHead>
                  <TableHead className="w-[160px]">Time Off Type</TableHead>
                  <TableHead className="w-[240px]">Start Date & End Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="w-[140px] text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-muted/30">
                    <TableCell>
                      <span className="font-medium text-sm">{request.employeeName}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{request.leaveType}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{request.fromDate} <span className="text-muted-foreground">⋯</span> {request.toDate}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground line-clamp-2">{request.reason}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1.5">
                        {request.status === "Pending" ? (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 hover:bg-red-50 text-red-600 hover:text-red-700"
                              onClick={() => {
                                setSelectedRequest(request);
                                setIsDialogOpen(true);
                              }}
                            >
                              <XCircle className="size-5" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 hover:bg-green-50 text-green-600 hover:text-green-700"
                              onClick={() => handleApprove(request)}
                            >
                              <CheckCircle className="size-5" />
                            </Button>
                          </>
                        ) : request.status === "Approved" ? (
                          <span className="text-sm font-medium text-green-600">Approved</span>
                        ) : (
                          <span className="text-sm font-medium text-red-600">Rejected</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Approval Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
            <DialogDescription>
              Review and take action on this leave request
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Employee:</span>
                  <span className="text-sm font-medium">{selectedRequest.employeeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Leave Type:</span>
                  <span className="text-sm font-medium">{selectedRequest.leaveType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Days:</span>
                  <span className="text-sm font-medium">{selectedRequest.days}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Balance:</span>
                  <span className="text-sm font-medium">
                    {selectedRequest.balance.available} / {selectedRequest.balance.total}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Remarks (Optional for approval, Required for rejection)</label>
                <Textarea
                  placeholder="Add your comments..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 text-red-600 hover:text-red-700"
                  onClick={() => handleReject(selectedRequest)}
                >
                  <XCircle className="size-4 mr-2" />
                  Reject
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={() => handleApprove(selectedRequest)}
                >
                  <CheckCircle className="size-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}