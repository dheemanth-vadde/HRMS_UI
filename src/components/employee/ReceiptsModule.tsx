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
import { Receipt, Plus, Search, Calendar, DollarSign, Upload } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function ReceiptsModule() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const receipts = [
    {
      id: "REC001",
      date: "2025-10-10",
      category: "Travel",
      description: "Taxi to Client Meeting",
      amount: 850,
      status: "Approved",
      submittedOn: "2025-10-11",
    },
    {
      id: "REC002",
      date: "2025-10-09",
      category: "Meals",
      description: "Business Lunch with Client",
      amount: 2500,
      status: "Pending",
      submittedOn: "2025-10-10",
    },
    {
      id: "REC003",
      date: "2025-10-08",
      category: "Supplies",
      description: "Office Stationery",
      amount: 450,
      status: "Approved",
      submittedOn: "2025-10-09",
    },
    {
      id: "REC004",
      date: "2025-10-05",
      category: "Travel",
      description: "Parking Charges",
      amount: 200,
      status: "Rejected",
      submittedOn: "2025-10-06",
    },
    {
      id: "REC005",
      date: "2025-10-03",
      category: "Communication",
      description: "Mobile Recharge",
      amount: 599,
      status: "Approved",
      submittedOn: "2025-10-04",
    },
  ];

  const totalAmount = receipts.reduce((sum, r) => sum + r.amount, 0);
  const approvedAmount = receipts.filter(r => r.status === "Approved").reduce((sum, r) => sum + r.amount, 0);
  const pendingAmount = receipts.filter(r => r.status === "Pending").reduce((sum, r) => sum + r.amount, 0);

  const handleSubmitReceipt = () => {
    toast.success("Receipt submitted successfully!", {
      description: "Your receipt is under review",
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Receipts</h1>
          <p className="text-muted-foreground">Submit and track your expense receipts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-add-purple">
              <Plus className="size-4 mr-2" />
              Add Receipt
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit New Receipt</DialogTitle>
              <DialogDescription>Fill in the receipt details</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Receipt Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="meals">Meals</SelectItem>
                    <SelectItem value="supplies">Supplies</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="accommodation">Accommodation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Description</Label>
                <Textarea placeholder="Enter expense description" />
              </div>
              <div className="space-y-2">
                <Label>Amount (₹)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Upload Receipt</Label>
                <div className="flex items-center gap-2">
                  <Input type="file" accept="image/*,application/pdf" />
                  <Upload className="size-4 text-muted-foreground" />
                </div>
              </div>
              <div className="col-span-2">
                <Button onClick={handleSubmitReceipt} className="w-full">
                  Submit Receipt
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Total Receipts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">All submissions</p>
            <Badge variant="default" className="mt-2">{receipts.length} Receipts</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{approvedAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Ready for reimbursement</p>
            <Badge variant="default" className="mt-2">Processed</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Under review</p>
            <Badge variant="secondary" className="mt-2">In Progress</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Receipts Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-bold">My Receipts</CardTitle>
              <CardDescription>View and manage all your receipts</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search receipts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receipts.map((receipt) => (
                <TableRow key={receipt.id}>
                  <TableCell className="font-medium">{receipt.id}</TableCell>
                  <TableCell>{new Date(receipt.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{receipt.category}</Badge>
                  </TableCell>
                  <TableCell>{receipt.description}</TableCell>
                  <TableCell className="font-semibold">₹{receipt.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(receipt.status)}>
                      {receipt.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(receipt.submittedOn).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
