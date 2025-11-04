import {
  Users,
  UserPlus,
  TrendingUp,
  TrendingDown,
  Briefcase,
  Calendar,
  Clock,
  FileText,
  Building2,
  Target,
  Award,
  AlertCircle,
  Settings,
  Activity,
  CheckCircle,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

export function HRDashboard() {
  const stats = [
    {
      title: "Total Employees",
      value: "1,247",
      icon: Users,
      change: "+2.5%",
      trend: "up",
      color: "primary",
      description: "Active headcount",
    },
    {
      title: "New Joiners",
      value: "15",
      icon: UserPlus,
      change: "This month",
      trend: "neutral",
      color: "secondary",
      description: "5 Onboarding",
    },
    {
      title: "Attrition Rate",
      value: "3.2%",
      icon: TrendingDown,
      change: "-0.5%",
      trend: "down",
      color: "primary",
      description: "Last 12 months",
    },
    {
      title: "Open Positions",
      value: "8",
      icon: Briefcase,
      change: "3 Critical",
      trend: "neutral",
      color: "secondary",
      description: "Vacancies",
    },
  ];

  const quickActions = [
    { icon: UserPlus, label: "Add Employee", color: "primary", description: "New hire" },
    { icon: Briefcase, label: "Post Vacancy", color: "secondary", description: "Job opening" },
    { icon: Calendar, label: "Configure Leaves", color: "primary", description: "Leave setup" },
    { icon: Award, label: "Start PMS Cycle", color: "secondary", description: "Appraisal" },
  ];

  const pendingTasks = [
    { type: "Onboarding", count: 5, priority: "High", icon: UserPlus },
    { type: "Exit Clearance", count: 3, priority: "Medium", icon: FileText },
    { type: "Confirmation Reviews", count: 7, priority: "High", icon: CheckCircle },
    { type: "Payroll Processing", count: 1, priority: "Critical", icon: Activity },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New employee onboarded",
      name: "Rahul Mehta - Software Engineer",
      time: "2 hours ago",
      type: "success",
      icon: UserPlus,
    },
    {
      id: 2,
      action: "Exit process completed",
      name: "Sneha Reddy - Manager",
      time: "5 hours ago",
      type: "info",
      icon: FileText,
    },
    {
      id: 3,
      action: "Appraisal cycle started",
      name: "Q4 2025 Performance Review",
      time: "1 day ago",
      type: "info",
      icon: Award,
    },
    {
      id: 4,
      action: "Bulk salary update",
      name: "Annual increment processed for 150 employees",
      time: "2 days ago",
      type: "success",
      icon: TrendingUp,
    },
  ];

  const upcomingEvents = [
    { event: "Probation Confirmations Due", count: 7, date: "Oct 15, 2025" },
    { event: "PMS Cycle Deadline", count: 1, date: "Oct 31, 2025" },
    { event: "Holiday Calendar Update", count: 1, date: "Nov 1, 2025" },
  ];

  const departmentStats = [
    { dept: "Retail Banking", count: 450, percentage: 36, color: "primary" },
    { dept: "Corporate Banking", count: 280, percentage: 22, color: "secondary" },
    { dept: "Operations", count: 220, percentage: 18, color: "primary" },
    { dept: "Technology", count: 150, percentage: 12, color: "secondary" },
    { dept: "Support Functions", count: 147, percentage: 12, color: "primary" },
  ];



  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-primary">
            HR Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Central command for all HR operations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button>
            <Settings className="size-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

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
      <div className="grid grid-cols-1 lg:grid-columns-three gap-6">
        {/* Recent Activities - Takes 2 columns */}
        <Card className="lg:col-span-2 border shadow-lg animate-slide-in-left">
          <CardHeader className="border-b bg-gradient-to-r from-accent/40 to-blue-50/40 pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-[#2171b5]">
                <Activity className="size-5 text-white" />
              </div>
              Recent Activities
            </CardTitle>
            <CardDescription>Latest HR operations</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="flex gap-4 p-4 rounded-lg hover:bg-accent/50 transition-all cursor-pointer border border-transparent hover:border-primary/20"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className={`p-2 rounded-lg h-fit ${index % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'}`}>
                    <activity.icon className={`size-5 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground truncate">{activity.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
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
            <CardDescription>Frequently used operations</CardDescription>
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
                      <p className="font-semibold text-foreground">{action.label}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Tasks & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <Card className="border shadow-lg bg-gradient-to-br from-orange-50 to-red-50 animate-scale-in" style={{animationDelay: '0.2s'}}>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="size-5 text-secondary" />
              Pending Tasks
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {pendingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border-2 border-white/50 bg-white/30 hover:bg-white/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${index % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'}`}>
                      <task.icon className={`size-5 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{task.type}</p>
                      <p className="text-sm text-muted-foreground">{task.count} pending</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      task.priority === "Critical" || task.priority === "High"
                        ? "destructive"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 animate-scale-in" style={{animationDelay: '0.3s'}}>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5 text-primary" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Scheduled HR activities</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border-2 border-white/50 bg-white/30 hover:bg-white/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="size-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{event.event}</p>
                      <p className="text-xs text-muted-foreground">{event.count} item(s)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Overview */}
      <Card className="border shadow-lg animate-scale-in" style={{animationDelay: '0.4s'}}>
        <CardHeader className="border-b bg-gradient-to-r from-accent/40 to-blue-50/40">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="size-5 text-primary" />
            Department Overview
          </CardTitle>
          <CardDescription>Headcount by department</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{dept.dept}</p>
                  <span className="text-sm text-muted-foreground">
                    <span className={dept.color === 'primary' ? 'text-primary font-bold' : 'text-secondary font-bold'}>
                      {dept.count}
                    </span> ({dept.percentage}%)
                  </span>
                </div>
                <Progress value={dept.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
