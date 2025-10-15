import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Users, Calendar, TrendingUp, UserX, Clock, AlertCircle, Settings, CheckCircle, FileCheck, UserCheck } from "lucide-react";

type ActiveModule =
  | "team-leave"
  | "performance"
  | "recruitment"
  | "exit";

interface ManagerDashboardProps {
  onNavigate: (module: ActiveModule) => void;
}

function ManagerDashboard({ onNavigate }: ManagerDashboardProps) {
  const stats = [
    {
      title: "Team Size",
      value: "12",
      icon: Users,
      change: "Direct reports",
      color: "primary",
      description: "Active members",
    },
    {
      title: "Present Today",
      value: "10",
      icon: Clock,
      change: "Out of 12",
      color: "secondary",
      description: "Team present",
    },
    {
      title: "On Leave",
      value: "2",
      icon: Calendar,
      change: "Team members",
      color: "primary",
      description: "Currently away",
    },
    {
      title: "Avg Attendance",
      value: "94%",
      icon: TrendingUp,
      change: "This month",
      color: "secondary",
      description: "Team average",
    },
  ];

  const pendingApprovals = [
    { type: "Leave Request", count: 3, urgency: "high", module: "team-leave" as ActiveModule, icon: Calendar },
    { type: "Performance Review", count: 5, urgency: "medium", module: "performance" as ActiveModule, icon: TrendingUp },
    { type: "Confirmation", count: 1, urgency: "high", module: "recruitment" as ActiveModule, icon: UserCheck },
    { type: "Exit Clearance", count: 2, urgency: "low", module: "exit" as ActiveModule, icon: UserX },
  ];

  const performanceDue = [
    { name: "Neha Gupta", position: "Senior Officer", dueDate: "Oct 12, 2025", status: "Pending Review" },
    { name: "Vikram Singh", position: "Officer", dueDate: "Oct 13, 2025", status: "Self-Assessment Done" },
    { name: "Anita Rao", position: "Clerk", dueDate: "Oct 14, 2025", status: "Pending Review" },
    { name: "Rahul Mehta", position: "Senior Officer", dueDate: "Oct 15, 2025", status: "Pending Review" },
    { name: "Deepa Nair", position: "Assistant Manager", dueDate: "Oct 16, 2025", status: "Self-Assessment Done" },
  ];



  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-primary">
            Manager Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Manage your team and approvals</p>
        </div>
        <div className="flex items-center gap-3">
          <Button>
            <Settings className="size-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Alert for pending items */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-secondary/10 to-orange-100/50 animate-scale-in">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-secondary to-[#e55a2b]">
              <AlertCircle className="size-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Action Required</p>
              <p className="text-sm text-muted-foreground">
                You have {pendingApprovals.reduce((sum, item) => sum + item.count, 0)} items awaiting your approval. Click on any item below to review.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="stat-card-sagarsoft relative overflow-hidden border shadow-lg animate-scale-in" 
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className={`absolute inset-0 ${stat.color === 'primary' ? 'bg-gradient-to-br from-blue-50 to-cyan-50' : 'bg-gradient-to-br from-orange-50 to-red-50'} opacity-40`}></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color === 'primary' ? 'bg-gradient-to-br from-primary to-[#2171b5]' : 'bg-gradient-to-br from-secondary to-[#e55a2b]'} shadow-lg`}>
                  <stat.icon className="size-6 text-white" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-muted/80">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-black">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Reviews Due - Takes 2 columns */}
        <Card className="lg:col-span-2 border shadow-lg animate-slide-in-left">
          <CardHeader className="border-b bg-gradient-to-r from-accent/40 to-blue-50/40 pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-[#2171b5]">
                <TrendingUp className="size-5 text-white" />
              </div>
              Performance Reviews Due
            </CardTitle>
            <CardDescription>Team members pending appraisal - Click to review</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {performanceDue.map((member, index) => (
                <div
                  key={index}
                  onClick={() => onNavigate("performance")}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 transition-all cursor-pointer border border-transparent hover:border-primary/20"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center gap-3">
                    <div className={`size-10 rounded-full flex items-center justify-center ${index % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'}`}>
                      <Users className={`size-5 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-xs text-muted-foreground">Due Date</p>
                      <p className="text-sm font-medium">{member.dueDate}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">{member.status}</Badge>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={(e:any) => {
                        e.stopPropagation();
                        onNavigate("performance");
                      }}
                      className="hidden sm:flex"
                    >
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals - Takes 1 column */}
        <Card className="border shadow-lg animate-slide-in-right">
          <CardHeader className="border-b bg-gradient-to-r from-orange-50/40 to-red-50/40 pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-secondary to-[#e55a2b]">
                <FileCheck className="size-5 text-white" />
              </div>
              Pending Approvals
            </CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {pendingApprovals.map((item, index) => (
                <button
                  key={index}
                  onClick={() => onNavigate(item.module)}
                  className="w-full p-4 rounded-xl border-2 border-border hover:border-primary/50 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all group text-left"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg shadow-md group-hover:scale-110 transition-transform ${index % 2 === 0 ? 'bg-gradient-to-br from-primary to-[#2171b5]' : 'bg-gradient-to-br from-secondary to-[#e55a2b]'}`}>
                        <item.icon className="size-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.type}</p>
                        <p className="text-xs text-muted-foreground">{item.count} pending</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        item.urgency === "high"
                          ? "destructive"
                          : item.urgency === "medium"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {item.urgency}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ManagerDashboard;
