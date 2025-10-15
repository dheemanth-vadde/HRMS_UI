import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Building2, Users, Briefcase, Megaphone, TrendingUp, UserPlus, Activity, Clock, Shield, Settings, BarChart3, Award } from "lucide-react";
import { Button } from "../ui/button";

 function SuperAdminDashboard() {
  const stats = [
    {
      title: "Total Employees",
      value: "85,000+",
      icon: Users,
      change: "+2.5%",
      trend: "up",
      color: "primary",
    },
    {
      title: "Business Units",
      value: "8",
      icon: Building2,
      change: "+1",
      trend: "up",
      color: "secondary",
    },
    {
      title: "Departments",
      value: "15",
      icon: Briefcase,
      change: "+2",
      trend: "up",
      color: "primary",
    },
    {
      title: "Active Announcements",
      value: "6",
      icon: Megaphone,
      change: "+3",
      trend: "up",
      color: "secondary",
    },
  ];

  const recentActivities = [
    {
      action: "New Department Created",
      description: "Priority Banking Services department added",
      timestamp: "2 hours ago",
      type: "create",
      icon: Briefcase,
    },
    {
      action: "Business Unit Expanded",
      description: "Ahmedabad Regional Office inaugurated",
      timestamp: "5 hours ago",
      type: "update",
      icon: Building2,
    },
    {
      action: "Announcement Published",
      description: "Festival Bonus announcement for all employees",
      timestamp: "1 day ago",
      type: "announce",
      icon: Megaphone,
    },
    {
      action: "Employee Milestone",
      description: "PNB crosses 85,000 employee mark nationwide",
      timestamp: "2 days ago",
      type: "milestone",
      icon: Award,
    },
    {
      action: "Department Head Updated",
      description: "New head appointed for Digital Banking division",
      timestamp: "3 days ago",
      type: "update",
      icon: Users,
    },
  ];

  const quickActions = [
    {
      title: "Add Business Unit",
      icon: Building2,
      color: "primary",
      description: "Create new unit",
    },
    {
      title: "Add Department",
      icon: Briefcase,
      color: "secondary",
      description: "Setup department",
    },
    {
      title: "New Announcement",
      icon: Megaphone,
      color: "primary",
      description: "Broadcast message",
    },
    {
      title: "Manage Users",
      icon: Users,
      color: "secondary",
      description: "User settings",
    },
  ];



  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-primary">
            Super Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Organization overview and management</p>
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
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-black">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities - Takes 2 columns */}
        <Card className="lg:col-span-2 border shadow-lg animate-slide-in-left">
          <CardHeader className="border-b bg-gradient-to-r from-accent/40 to-blue-50/40 pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-[#2171b5]">
                <TrendingUp className="size-5 text-white" />
              </div>
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 p-4 rounded-lg hover:bg-accent/50 transition-all cursor-pointer border border-transparent hover:border-primary/20"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className={`p-2 rounded-lg h-fit ${index % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'}`}>
                    <activity.icon className={`size-5 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-xs text-muted-foreground whitespace-nowrap bg-muted/50 px-2 py-1 rounded">
                      {activity.timestamp}
                    </span>
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
                <UserPlus className="size-5 text-white" />
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

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 animate-scale-in" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Regions</p>
                <p className="text-2xl font-bold text-primary">28</p>
                <p className="text-xs text-success mt-1">Pan India Coverage</p>
              </div>
              <BarChart3 className="size-12 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-lg bg-gradient-to-br from-orange-50 to-red-50 animate-scale-in" style={{animationDelay: '0.3s'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Branches</p>
                <p className="text-2xl font-bold text-secondary">11,000+</p>
                <p className="text-xs text-warning mt-1">Nationwide Network</p>
              </div>
              <Building2 className="size-12 text-secondary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 animate-scale-in" style={{animationDelay: '0.4s'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Users</p>
                <p className="text-2xl font-bold text-primary">78,420</p>
                <p className="text-xs text-info mt-1">92% Online Rate</p>
              </div>
              <Users className="size-12 text-primary/20" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
