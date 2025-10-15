import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Receipt, Plane, Wallet, TrendingUp, Calendar, DollarSign, Download } from "lucide-react";

export function MyEmployeeExpenses() {
  const expenseSummary = {
    totalExpenses: 48599,
    receipts: 5,
    trips: 4,
    advances: 5,
    pendingAmount: 2500,
    approvedAmount: 36299,
    rejectedAmount: 850,
    settledAdvances: 23000,
    pendingAdvances: 20000,
  };

  const monthlyExpenses = [
    { month: "January", amount: 4500 },
    { month: "February", amount: 6200 },
    { month: "March", amount: 5800 },
    { month: "April", amount: 7100 },
    { month: "May", amount: 5500 },
    { month: "June", amount: 6800 },
    { month: "July", amount: 4200 },
    { month: "August", amount: 5900 },
    { month: "September", amount: 11200 },
    { month: "October", amount: 2500 },
  ];

  const categoryBreakdown = [
    { category: "Travel", amount: 15850, percentage: 33 },
    { category: "Meals", amount: 8500, percentage: 17 },
    { category: "Accommodation", amount: 12000, percentage: 25 },
    { category: "Supplies", amount: 3450, percentage: 7 },
    { category: "Communication", amount: 2599, percentage: 5 },
    { category: "Others", amount: 6200, percentage: 13 },
  ];

  const recentActivity = [
    { type: "Receipt", description: "Business Lunch", amount: 2500, date: "2025-10-10", status: "Pending" },
    { type: "Trip", description: "Mumbai Trip", amount: 15000, date: "2025-10-08", status: "Approved" },
    { type: "Advance", description: "Conference Advance", amount: 20000, date: "2025-10-08", status: "Approved" },
    { type: "Receipt", description: "Taxi Charges", amount: 850, date: "2025-10-05", status: "Approved" },
    { type: "Receipt", description: "Parking", amount: 200, date: "2025-10-03", status: "Rejected" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>My Employee Expenses</h1>
          <p className="text-muted-foreground">Complete overview of all your expenses</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="size-4" />
          Export Report
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{expenseSummary.totalExpenses.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">This year</p>
            <Badge variant="default" className="mt-2">Active</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Receipts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expenseSummary.receipts}</div>
            <p className="text-sm text-muted-foreground">Submitted</p>
            <Badge variant="secondary" className="mt-2">Pending</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expenseSummary.trips}</div>
            <p className="text-sm text-muted-foreground">Business trips</p>
            <Badge variant="default" className="mt-2">Completed</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Advances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expenseSummary.advances}</div>
            <p className="text-sm text-muted-foreground">Requested</p>
            <Badge variant="outline" className="mt-2">Outstanding</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expense Status */}
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Expense Status</CardTitle>
            <CardDescription>Current status breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Approved</span>
                <span className="text-sm font-bold text-green-600">₹{expenseSummary.approvedAmount.toLocaleString()}</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pending</span>
                <span className="text-sm font-bold text-orange-600">₹{expenseSummary.pendingAmount.toLocaleString()}</span>
              </div>
              <Progress value={5} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Rejected</span>
                <span className="text-sm font-bold text-red-600">₹{expenseSummary.rejectedAmount.toLocaleString()}</span>
              </div>
              <Progress value={2} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Advance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Advance Status</CardTitle>
            <CardDescription>Settlement tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Settled Advances</span>
                <span className="text-sm font-bold text-green-600">₹{expenseSummary.settledAdvances.toLocaleString()}</span>
              </div>
              <Progress value={53} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pending Settlement</span>
                <span className="text-sm font-bold text-orange-600">₹{expenseSummary.pendingAdvances.toLocaleString()}</span>
              </div>
              <Progress value={47} className="h-2" />
            </div>
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                <Wallet className="size-4 mr-2" />
                Settle Advances
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Expense by Category</CardTitle>
          <CardDescription>Year to date breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryBreakdown.map((category) => (
              <div key={category.category}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{category.category}</Badge>
                    <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                  </div>
                  <span className="text-sm font-bold">₹{category.amount.toLocaleString()}</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Recent Activity</CardTitle>
          <CardDescription>Latest expense submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-full flex items-center justify-center ${
                    activity.type === "Receipt" ? "bg-blue-100" :
                    activity.type === "Trip" ? "bg-purple-100" :
                    "bg-green-100"
                  }`}>
                    {activity.type === "Receipt" && <Receipt className="size-5 text-blue-600" />}
                    {activity.type === "Trip" && <Plane className="size-5 text-purple-600" />}
                    {activity.type === "Advance" && <Wallet className="size-5 text-green-600" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{activity.description}</p>
                      <Badge variant={
                        activity.status === "Approved" ? "default" :
                        activity.status === "Pending" ? "secondary" :
                        "destructive"
                      }>
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.type} • {new Date(activity.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{activity.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Monthly Expense Trend</CardTitle>
          <CardDescription>Last 10 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {monthlyExpenses.map((month) => (
              <div key={month.month} className="flex items-center gap-4">
                <span className="text-sm font-medium w-24">{month.month}</span>
                <div className="flex-1">
                  <Progress value={(month.amount / 120) * 100} className="h-6" />
                </div>
                <span className="text-sm font-bold w-20 text-right">₹{month.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
