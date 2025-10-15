import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MapPin, Clock, Calendar, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function AttendanceModule() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const attendanceHistory = [
    { date: "2025-10-08", checkIn: "09:15 AM", checkOut: "06:20 PM", status: "Present", location: "Main Branch, Delhi" },
    { date: "2025-10-07", checkIn: "09:10 AM", checkOut: "06:15 PM", status: "Present", location: "Main Branch, Delhi" },
    { date: "2025-10-06", checkIn: "09:25 AM", checkOut: "06:30 PM", status: "Present", location: "Main Branch, Delhi" },
    { date: "2025-10-05", checkIn: "-", checkOut: "-", status: "Leave", location: "-" },
    { date: "2025-10-04", checkIn: "09:20 AM", checkOut: "06:10 PM", status: "Present", location: "Main Branch, Delhi" },
  ];

  const calculateTotalHours = (checkIn: string, checkOut: string) => {
    if (checkIn === "-" || checkOut === "-") return "-";
    
    const parseTime = (timeStr: string) => {
      const [time, period] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      
      return hours * 60 + minutes;
    };
    
    const checkInMinutes = parseTime(checkIn);
    const checkOutMinutes = parseTime(checkOut);
    const totalMinutes = checkOutMinutes - checkInMinutes;
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };

  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setCheckInTime(timeString);
    setIsCheckedIn(true);
    toast.success("Checked in successfully!", {
      description: `Time: ${timeString} | Location verified`,
    });
  };

  const handleCheckOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    toast.success("Checked out successfully!", {
      description: `Time: ${timeString}`,
    });
    setIsCheckedIn(false);
    setCheckInTime(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Attendance Management</h1>
        <p className="text-muted-foreground">Mark and track your attendance</p>
      </div>

      {/* Mark Attendance */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="font-bold">Mark Attendance</CardTitle>
          <CardDescription>Use geo-tagged mobile app or biometric</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 text-orange-600" />
            <span>Location: Main Branch, Connaught Place, Delhi</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-4 text-orange-600" />
            <span>Date: Thursday, October 9, 2025</span>
          </div>
          {checkInTime && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="size-4 text-orange-600" />
              <span>Check-in Time: {checkInTime}</span>
            </div>
          )}
          <div className="flex gap-3">
            <Button
              onClick={handleCheckIn}
              disabled={isCheckedIn}
            >
              <MapPin className="size-4 mr-2" />
              Check In
            </Button>
            <Button
              onClick={handleCheckOut}
              disabled={!isCheckedIn}
              variant="outline"
            >
              <Clock className="size-4 mr-2" />
              Check Out
            </Button>
          </div>
          {isCheckedIn && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✓ You are currently checked in. Don't forget to check out at the end of your shift.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21/23</div>
            <p className="text-sm text-muted-foreground">Days present</p>
            <Badge variant="default" className="mt-2">91.3%</Badge>
          </CardContent>
        </Card>
        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Average Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9h 15m</div>
            <p className="text-sm text-muted-foreground">Daily average</p>
            <Badge variant="secondary" className="mt-2">On Time</Badge>
          </CardContent>
        </Card>
        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Late Arrivals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">This month</p>
            <Badge variant="outline" className="mt-2">Acceptable</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Attendance History</CardTitle>
          <CardDescription>Last 5 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {attendanceHistory.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-orange-600" />
                    <span className="font-medium">{record.date}</span>
                    <Badge
                      variant={record.status === "Present" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {record.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground ml-6">
                    <span>In: {record.checkIn}</span>
                    <span>Out: {record.checkOut}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3 text-orange-600" />
                      Total: {calculateTotalHours(record.checkIn, record.checkOut)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3 text-orange-600" />
                      {record.location}
                    </span>
                  </div>
                </div>
                {record.status === "Present" ? (
                  <CheckCircle className="size-5 text-orange-600" />
                ) : (
                  <XCircle className="size-5 text-orange-600" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}