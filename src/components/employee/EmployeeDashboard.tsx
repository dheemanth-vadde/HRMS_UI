import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Calendar, Clock, TrendingUp, FileText, LogOut, Bell, Target, Activity, Award, Settings } from "lucide-react";

export function EmployeeDashboard() {
  const stats = [
    {
      title: "Attendance",
      value: "92%",
      icon: Clock,
      change: "+3%",
      trend: "up",
      color: "primary",
      description: "This month",
    },
    {
      title: "Leave Balance",
      value: "26",
      icon: Calendar,
      change: "Days",
      trend: "neutral",
      color: "secondary",
      description: "Total available",
    },
    {
      title: "Performance",
      value: "3/5",
      icon: TrendingUp,
      change: "60%",
      trend: "up",
      color: "primary",
      description: "Goals completed",
    },
    {
      title: "Documents",
      value: "12",
      icon: FileText,
      change: "2 New",
      trend: "neutral",
      color: "secondary",
      description: "Available docs",
    },
  ];

  const leaveBalance = [
    { type: "Casual Leave", balance: 8, total: 12, color: "primary" },
    { type: "Sick Leave", balance: 6, total: 10, color: "secondary" },
    { type: "Earned Leave", balance: 12, total: 15, color: "primary" },
  ];

  const notifications = [
    { 
      id: 1, 
      message: "You have 2 pending leave approvals", 
      type: "warning",
      time: "2 hours ago",
      icon: Calendar,
    },
    { 
      id: 2, 
      message: "Performance appraisal cycle started", 
      type: "info",
      time: "1 day ago",
      icon: Award,
    },
    { 
      id: 3, 
      message: "Your attendance for last month: 95%", 
      type: "success",
      time: "2 days ago",
      icon: Clock,
    },
    { 
      id: 4, 
      message: "New policy document uploaded", 
      type: "info",
      time: "3 days ago",
      icon: FileText,
    },
  ];

  const performanceGoals = [
    { id: 1, title: "Complete customer service training", progress: 75, status: "On Track" },
    { id: 2, title: "Process 500 loan applications", progress: 60, status: "In Progress" },
    { id: 3, title: "Reduce query resolution time by 20%", progress: 45, status: "In Progress" },
  ];

  const quickActions = [
    {
      title: "Mark Attendance",
      icon: Clock,
      color: "primary",
      description: "Check in/out",
    },
    {
      title: "Apply Leave",
      icon: Calendar,
      color: "secondary",
      description: "Request time off",
    },
    {
      title: "View Payslip",
      icon: FileText,
      color: "primary",
      description: "Download salary",
    },
    {
      title: "Submit Goals",
      icon: Target,
      color: "secondary",
      description: "Update KRAs",
    },
  ];



  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-primary">
            Employee Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your overview</p>
        </div>
        <div className="flex items-center gap-3">
          <Button>
            <Settings className="size-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* AI Insights Alert */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-secondary/10 to-orange-100/50 animate-scale-in">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-secondary to-[#e55a2b]">
              <Bell className="size-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">AI Insights</p>
              <p className="text-sm text-muted-foreground">
                You have 2 pending leave approvals. Your attendance is excellent this month at 95%. Keep up the great work!
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
        {/* Recent Notifications - Takes 2 columns */}
        <Card className="lg:col-span-2 border shadow-lg animate-slide-in-left">
          <CardHeader className="border-b bg-gradient-to-r from-accent/40 to-blue-50/40 pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-[#2171b5]">
                <Bell className="size-5 text-white" />
              </div>
              Recent Notifications
            </CardTitle>
            <CardDescription>Stay updated with your activities</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div 
                  key={notification.id} 
                  className="flex gap-4 p-4 rounded-lg hover:bg-accent/50 transition-all cursor-pointer border border-transparent hover:border-primary/20"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className={`p-2 rounded-lg h-fit ${index % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'}`}>
                    <notification.icon className={`size-5 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  <div className="flex items-start">
                    <Badge variant={notification.type as any} className="text-xs">
                      {notification.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions - Takes 1 column */}
        <Card className="border shadow-lg animate-slide-in-right">
          <CardHeader className="border-b bg-gradient-to-r from-orange-50/40 to-red-50/40 pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-secondary to-[#e55a2b]">
                <Target className="size-5 text-white" />
              </div>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button 
                  key={index}
                  className="w-full p-4 rounded-xl border-2 border-border hover:border-primary/50 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all group text-left"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg shadow-md group-hover:scale-110 transition-transform ${action.color === 'primary' ? 'bg-gradient-to-br from-primary to-[#2171b5]' : 'bg-gradient-to-br from-secondary to-[#e55a2b]'}`}>
                      <action.icon className="size-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{action.title}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Goals & Leave Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Goals */}
        <Card className="border shadow-lg animate-scale-in" style={{animationDelay: '0.2s'}}>
          <CardHeader className="border-b bg-gradient-to-r from-accent/40 to-blue-50/40">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-primary" />
              Performance Goals
            </CardTitle>
            <CardDescription>Track your KRA progress</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {performanceGoals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{goal.title}</p>
                    <Badge variant="outline" className="text-xs">{goal.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={goal.progress} className="h-2 flex-1" />
                    <span className="text-sm font-semibold text-muted-foreground min-w-[3rem] text-right">{goal.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leave Balance Details */}
        <Card className="border shadow-lg bg-gradient-to-br from-orange-50 to-red-50 animate-scale-in" style={{animationDelay: '0.3s'}}>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5 text-secondary" />
              Leave Balance
            </CardTitle>
            <CardDescription>Your available leaves</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {leaveBalance.map((leave, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{leave.type}</p>
                    <p className="text-sm font-bold">
                      <span className={leave.color === 'primary' ? 'text-primary' : 'text-secondary'}>
                        {leave.balance}
                      </span>
                      <span className="text-muted-foreground"> / {leave.total}</span>
                    </p>
                  </div>
                  <Progress 
                    value={(leave.balance / leave.total) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
