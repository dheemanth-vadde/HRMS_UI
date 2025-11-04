import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { BarChart3, Download, TrendingUp, TrendingDown, Users, Calendar } from "lucide-react";

export function ReportsModule() {
  const reportCategories = [
    {
      category: "Headcount Reports",
      reports: [
        { name: "Department-wise Headcount", lastGenerated: "Oct 8, 2025" },
        { name: "Location-wise Distribution", lastGenerated: "Oct 8, 2025" },
        { name: "Grade-wise Analysis", lastGenerated: "Oct 1, 2025" },
      ],
    },
    {
      category: "Attendance & Leave",
      reports: [
        { name: "Monthly Attendance Summary", lastGenerated: "Oct 9, 2025" },
        { name: "Leave Utilization Report", lastGenerated: "Oct 5, 2025" },
        { name: "Absence & Exception Report", lastGenerated: "Oct 9, 2025" },
      ],
    },
    {
      category: "Performance Management",
      reports: [
        { name: "Appraisal Completion Status", lastGenerated: "Oct 6, 2025" },
        { name: "Rating Distribution", lastGenerated: "Sep 30, 2025" },
        { name: "Goal Achievement Analysis", lastGenerated: "Sep 30, 2025" },
      ],
    },
    {
      category: "Payroll & Compensation",
      reports: [
        { name: "Monthly Payroll Register", lastGenerated: "Oct 1, 2025" },
        { name: "Increment Analysis", lastGenerated: "Sep 15, 2025" },
        { name: "Compensation Benchmarking", lastGenerated: "Sep 1, 2025" },
      ],
    },
  ];

  const aiInsights = [
    {
      title: "Attrition Alert",
      insight: "Technology department showing 5% higher attrition than org average",
      trend: "up",
      impact: "High",
    },
    {
      title: "Leave Pattern",
      insight: "23% increase in sick leave applications this month",
      trend: "up",
      impact: "Medium",
    },
    {
      title: "Recruitment Efficiency",
      insight: "Time-to-hire reduced by 15% compared to last quarter",
      trend: "down",
      impact: "Positive",
    },
    {
      title: "Performance Trend",
      insight: "87% employees rated 'Good' or above in current cycle",
      trend: "up",
      impact: "Positive",
    },
  ];

  const keyMetrics = [
    { label: "Total Employees", value: "1,247", change: "+2.5%", trend: "up" },
    { label: "Avg Attendance", value: "94.2%", change: "+1.2%", trend: "up" },
    { label: "Attrition Rate", value: "3.2%", change: "-0.5%", trend: "down" },
    { label: "Open Positions", value: "8", change: "-3", trend: "down" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive HR insights and reports</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="oct2025">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oct2025">October 2025</SelectItem>
              <SelectItem value="sep2025">September 2025</SelectItem>
              <SelectItem value="aug2025">August 2025</SelectItem>
              <SelectItem value="q3-2025">Q3 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-primary">{metric.value}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="size-3 text-green-600" />
                    ) : (
                      <TrendingDown className="size-3 text-green-600" />
                    )}
                    <span className="text-xs text-green-600">{metric.change}</span>
                  </div>
                </div>
                <Users className="size-8 text-muted-foreground/20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      <Card className="border-l-4 border-l-secondary">
        <CardHeader>
          <CardTitle>AI-Driven Insights</CardTitle>
          <CardDescription>Automated trend analysis and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.map((item, index) => (
              <div key={index} className="p-4 rounded-lg border bg-muted/30">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{item.title}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      item.impact === "High"
                        ? "bg-red-100 text-red-700"
                        : item.impact === "Medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.impact}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{item.insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reportCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{category.category}</CardTitle>
                  <CardDescription>{category.reports.length} reports available</CardDescription>
                </div>
                <BarChart3 className="size-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.reports.map((report, reportIndex) => (
                  <div
                    key={reportIndex}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium">{report.name}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Calendar className="size-3" />
                        <span>Last: {report.lastGenerated}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="size-3 mr-1" />
                        Excel
                      </Button>
                      <Button variant="outline" size="sm">
                        PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Custom Report Builder</CardTitle>
          <CardDescription>Create custom reports with specific parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-columns-three gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="headcount">Headcount</SelectItem>
                  <SelectItem value="attendance">Attendance</SelectItem>
                  <SelectItem value="leave">Leave</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="payroll">Payroll</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="retail">Retail Banking</SelectItem>
                  <SelectItem value="corporate">Corporate Banking</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="ops">Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Month</SelectItem>
                  <SelectItem value="last">Last Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="mt-4 bg-primary hover:bg-primary/90">
            <BarChart3 className="size-4 mr-2" />
            Generate Report
          </Button>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Bulk Export</CardTitle>
          <CardDescription>Download multiple reports at once</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Download className="size-4 mr-2" />
              Export All Reports (ZIP)
            </Button>
            <Button variant="outline">
              <Download className="size-4 mr-2" />
              Monthly MIS Pack
            </Button>
            <Button variant="outline">
              <Download className="size-4 mr-2" />
              Quarterly Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}