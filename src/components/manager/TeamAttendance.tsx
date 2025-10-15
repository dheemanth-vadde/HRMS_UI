import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Users, TrendingUp, Calendar, Clock, Download, Filter, Search, MapPin } from "lucide-react";
import { Input } from "../ui/input";

export function TeamAttendance() {
  const teamMembers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "Senior Officer",
      status: "Present",
      checkIn: "09:15 AM",
      location: "Main Branch, Delhi",
      coordinates: { lat: 28.6139, lng: 77.2090 },
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Officer",
      status: "Present",
      checkIn: "09:10 AM",
      location: "Main Branch, Delhi",
      coordinates: { lat: 28.6139, lng: 77.2090 },
    },
    {
      id: 3,
      name: "Amit Verma",
      position: "Clerk",
      status: "On Leave",
      checkIn: "-",
      location: "-",
      coordinates: null,
    },
    {
      id: 4,
      name: "Neha Gupta",
      position: "Senior Officer",
      status: "Present",
      checkIn: "09:20 AM",
      location: "Main Branch, Delhi",
      coordinates: { lat: 28.6139, lng: 77.2090 },
    },
    {
      id: 5,
      name: "Vikram Singh",
      position: "Officer",
      status: "Present",
      checkIn: "09:05 AM",
      location: "Main Branch, Delhi",
      coordinates: { lat: 28.6139, lng: 77.2090 },
    },
    {
      id: 6,
      name: "Anita Rao",
      position: "Clerk",
      status: "Late",
      checkIn: "09:35 AM",
      location: "Main Branch, Delhi",
      coordinates: { lat: 28.6139, lng: 77.2090 },
    },
    {
      id: 7,
      name: "Suresh Patel",
      position: "Officer",
      status: "Present",
      checkIn: "09:18 AM",
      location: "Main Branch, Delhi",
      coordinates: { lat: 28.6139, lng: 77.2090 },
    },
    {
      id: 8,
      name: "Kavita Singh",
      position: "Senior Clerk",
      status: "On Leave",
      checkIn: "-",
      location: "-",
      coordinates: null,
    },
  ];

  const attendanceSummary = {
    present: teamMembers.filter((m) => m.status === "Present" || m.status === "Late").length,
    onLeave: teamMembers.filter((m) => m.status === "On Leave").length,
    late: teamMembers.filter((m) => m.status === "Late").length,
    total: teamMembers.length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "default";
      case "Late":
        return "secondary";
      case "On Leave":
        return "outline";
      case "Absent":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Team Attendance</h1>
        <p className="text-muted-foreground">Monitor your team's attendance in real-time</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Total Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceSummary.total}</div>
            <p className="text-sm text-muted-foreground">Team members</p>
            <Badge variant="default" className="mt-2">Active</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceSummary.present}</div>
            <p className="text-sm text-muted-foreground">Checked in today</p>
            <Badge variant="default" className="mt-2">On Time</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">On Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceSummary.onLeave}</div>
            <p className="text-sm text-muted-foreground">Approved leaves</p>
            <Badge variant="secondary" className="mt-2">Absent</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Late Arrivals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceSummary.late}</div>
            <p className="text-sm text-muted-foreground">Today</p>
            <Badge variant="outline" className="mt-2">Delayed</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Map View Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Map View</CardTitle>
              <CardDescription>Real-time geo-tagged check-ins</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <MapPin className="size-4 mr-2" />
              Full Map
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center border">
            <div className="text-center space-y-2">
              <MapPin className="size-12 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Interactive map view</p>
              <p className="text-xs text-muted-foreground">
                Shows geo-coordinates of team member check-ins
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Attendance List */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Today's Attendance</CardTitle>
          <CardDescription>Thursday, October 9, 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.position}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="size-3" />
                      <span>Check-in</span>
                    </div>
                    <p className="text-sm font-medium">{member.checkIn}</p>
                  </div>

                  <div className="text-right min-w-[200px]">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="size-3" />
                      <span>Location</span>
                    </div>
                    <p className="text-sm font-medium">{member.location}</p>
                  </div>

                  <Badge variant={getStatusColor(member.status)}>{member.status}</Badge>

                  <Button variant="ghost" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Attendance Trend</CardTitle>
          <CardDescription>Last 5 working days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { day: "Monday", date: "Oct 7", present: 10, total: 12, percentage: 83 },
              { day: "Tuesday", date: "Oct 8", present: 11, total: 12, percentage: 92 },
              { day: "Wednesday", date: "Oct 9", present: 10, total: 12, percentage: 83 },
              { day: "Thursday", date: "Oct 10", present: 9, total: 12, percentage: 75 },
              { day: "Friday", date: "Oct 11", present: 12, total: 12, percentage: 100 },
            ].map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-24">
                  <p className="text-sm font-medium">{day.day}</p>
                  <p className="text-xs text-muted-foreground">{day.date}</p>
                </div>
                <div className="flex-1">
                  <Progress value={day.percentage} variant="primary" />
                </div>
                <div className="w-32 text-right">
                  <p className="text-sm font-medium">
                    {day.present}/{day.total}
                  </p>
                  <p className="text-xs text-muted-foreground">{day.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}