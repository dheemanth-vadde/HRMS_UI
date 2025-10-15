import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Wallet, Plus, IndianRupee } from "lucide-react";
import { toast } from "sonner";

export function AdvancesModule() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const advances = [
    {
      id: "ADV001",
      purpose: "Business Trip to Mumbai",
      requestedAmount: 20000,
      approvedAmount: 20000,
      status: "Approved",
      requestDate: "2025-10-08",
      approvalDate: "2025-10-09",
      settlementStatus: "Pending",
    },
    {
      id: "ADV002",
      purpose: "Conference Attendance",
      requestedAmount: 15000,
      approvedAmount: 15000,
      status: "Approved",
      requestDate: "2025-09-20",
      approvalDate: "2025-09-21",
      settlementStatus: "Settled",
    },
    {
      id: "ADV003",
      purpose: "Client Meeting Expenses",
      requestedAmount: 10000,
      approvedAmount: 8000,
      status: "Approved",
      requestDate: "2025-09-15",
      approvalDate: "2025-09-16",
      settlementStatus: "Settled",
    },
    {
      id: "ADV004",
      purpose: "Training Program",
      requestedAmount: 12000,
      approvedAmount: 0,
      status: "Pending",
      requestDate: "2025-10-12",
      approvalDate: null,
      settlementStatus: "N/A",
    },
    {
      id: "ADV005",
      purpose: "Equipment Purchase",
      requestedAmount: 5000,
      approvedAmount: 0,
      status: "Rejected",
      requestDate: "2025-10-05",
      approvalDate: "2025-10-06",
      settlementStatus: "N/A",
    },
  ];

  const totalRequested = advances.reduce((sum, a) => sum + a.requestedAmount, 0);
  const totalApproved = advances.reduce((sum, a) => sum + a.approvedAmount, 0);
  const pendingSettlement = advances.filter(a => a.settlementStatus === "Pending").reduce((sum, a) => sum + a.approvedAmount, 0);

  const handleRequestAdvance = () => {
    toast.success("Advance request submitted!", {
      description: "Your manager will review your request",
    });
    setIsDialogOpen(false);
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

  const getSettlementColor = (status: string) => {
    switch (status) {
      case "Settled":
        return "default";
      case "Pending":
        return "secondary";
      case "N/A":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Advances</h1>
          <p className="text-muted-foreground">Request and manage expense advances</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-add-purple">
              <Plus className="size-4 mr-2" />
              Request Advance
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Request Expense Advance</DialogTitle>
              <DialogDescription>Submit a request for advance payment</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Purpose of Advance</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="travel">Business Travel</SelectItem>
                    <SelectItem value="conference">Conference/Training</SelectItem>
                    <SelectItem value="client">Client Meeting</SelectItem>
                    <SelectItem value="equipment">Equipment Purchase</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Detailed Purpose</Label>
                <Textarea placeholder="Provide detailed explanation for the advance request" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Requested Amount (₹)</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label>Expected Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Justification</Label>
                <Textarea placeholder="Explain why this advance is needed" rows={2} />
              </div>
              <Button onClick={handleRequestAdvance} className="w-full">
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Total Requested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRequested.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">All requests</p>
            <Badge variant="default" className="mt-2">{advances.length} Requests</Badge>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Total Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalApproved.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Sanctioned amount</p>
            <Badge variant="default" className="mt-2">Approved</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Pending Settlement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{pendingSettlement.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">To be settled</p>
            <Badge variant="secondary" className="mt-2">Outstanding</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Advances Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">My Advance Requests</CardTitle>
          <CardDescription>View and track all your advance requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Advance ID</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Approved</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Settlement</TableHead>
                <TableHead>Request Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advances.map((advance) => (
                <TableRow key={advance.id}>
                  <TableCell className="font-medium">{advance.id}</TableCell>
                  <TableCell>{advance.purpose}</TableCell>
                  <TableCell className="font-semibold">₹{advance.requestedAmount.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold text-green-600">
                    {advance.approvedAmount > 0 ? `₹${advance.approvedAmount.toLocaleString()}` : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(advance.status)}>
                      {advance.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getSettlementColor(advance.settlementStatus)}>
                      {advance.settlementStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(advance.requestDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Settlement Info */}
      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Wallet className="size-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-bold text-orange-900">Advance Settlement Reminder</h4>
              <p className="text-sm text-orange-700 mt-1">
                Please ensure to settle your approved advances within 30 days by submitting expense receipts.
                Outstanding advances: ₹{pendingSettlement.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
