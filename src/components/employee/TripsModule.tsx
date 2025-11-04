import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plane, Plus, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function TripsModule() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const trips = [
    {
      id: "TRP001",
      destination: "Mumbai",
      purpose: "Client Meeting",
      startDate: "2025-10-15",
      endDate: "2025-10-17",
      status: "Approved",
      totalExpense: 15000,
      submittedOn: "2025-10-10",
    },
    {
      id: "TRP002",
      destination: "Bangalore",
      purpose: "Training Program",
      startDate: "2025-10-20",
      endDate: "2025-10-22",
      status: "Pending",
      totalExpense: 12500,
      submittedOn: "2025-10-12",
    },
    {
      id: "TRP003",
      destination: "Kolkata",
      purpose: "Branch Inspection",
      startDate: "2025-09-25",
      endDate: "2025-09-27",
      status: "Completed",
      totalExpense: 9800,
      submittedOn: "2025-09-20",
    },
    {
      id: "TRP004",
      destination: "Chennai",
      purpose: "Regional Meeting",
      startDate: "2025-09-10",
      endDate: "2025-09-12",
      status: "Completed",
      totalExpense: 11200,
      submittedOn: "2025-09-05",
    },
  ];

  const totalTrips = trips.length;
  const pendingTrips = trips.filter(t => t.status === "Pending").length;
  const totalExpenses = trips.reduce((sum, t) => sum + t.totalExpense, 0);

  const handleSubmitTrip = () => {
    toast.success("Trip request submitted!", {
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
      case "Completed":
        return "outline";
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
          <h1>Business Trips</h1>
          <p className="text-muted-foreground">Manage your business travel and expenses</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-add-purple">
              <Plus className="size-4 mr-2" />
              New Trip Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit Trip Request</DialogTitle>
              <DialogDescription>Provide details for your business trip</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Destination</Label>
                <Input placeholder="City name" />
              </div>
              <div className="space-y-2">
                <Label>Trip Purpose</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client Meeting</SelectItem>
                    <SelectItem value="training">Training Program</SelectItem>
                    <SelectItem value="inspection">Branch Inspection</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Trip Details</Label>
                <Textarea placeholder="Enter trip details and agenda" rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Estimated Budget (₹)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Mode of Travel</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flight">Flight</SelectItem>
                    <SelectItem value="train">Train</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Button onClick={handleSubmitTrip} className="w-full">
                  Submit Trip Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-columns-three gap-4">
        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Total Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTrips}</div>
            <p className="text-sm text-muted-foreground">This year</p>
            <Badge variant="default" className="mt-2">Active</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTrips}</div>
            <p className="text-sm text-muted-foreground">Awaiting approval</p>
            <Badge variant="secondary" className="mt-2">In Review</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">All trips</p>
            <Badge variant="outline" className="mt-2">Cumulative</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Trips List */}
      <div className="grid gap-4">
        {trips.map((trip) => (
          <Card key={trip.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Plane className="size-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{trip.destination}</h3>
                      <Badge variant={getStatusColor(trip.status)}>{trip.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{trip.purpose}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="size-4" />
                        <span>Trip ID: {trip.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">₹{trip.totalExpense.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Total Expense</p>
                  <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
