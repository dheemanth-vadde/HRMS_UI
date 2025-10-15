import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Download,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Send,
  CheckCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner@2.0.3";

export function PayrollModule() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [querySubject, setQuerySubject] = useState("");
  const [queryMessage, setQueryMessage] = useState("");

  const payslips = [
    {
      month: "September 2025",
      date: "Sept 30, 2025",
      grossSalary: "₹85,000",
      netSalary: "₹72,450",
      status: "Paid",
    },
    {
      month: "August 2025",
      date: "Aug 31, 2025",
      grossSalary: "₹85,000",
      netSalary: "₹72,450",
      status: "Paid",
    },
    {
      month: "July 2025",
      date: "Jul 31, 2025",
      grossSalary: "₹85,000",
      netSalary: "₹72,450",
      status: "Paid",
    },
    {
      month: "June 2025",
      date: "Jun 30, 2025",
      grossSalary: "₹85,000",
      netSalary: "₹72,450",
      status: "Paid",
    },
    {
      month: "May 2025",
      date: "May 31, 2025",
      grossSalary: "₹85,000",
      netSalary: "₹72,450",
      status: "Paid",
    },
    {
      month: "April 2025",
      date: "Apr 30, 2025",
      grossSalary: "₹85,000",
      netSalary: "₹72,450",
      status: "Paid",
    },
  ];

  const taxForms = [
    {
      name: "Form 16 - FY 2024-25",
      description: "Annual tax certificate for salary income",
      year: "2024-25",
      uploadDate: "May 31, 2025",
      type: "Tax Certificate",
    },
    {
      name: "Form 16 - FY 2023-24",
      description: "Annual tax certificate for salary income",
      year: "2023-24",
      uploadDate: "May 31, 2024",
      type: "Tax Certificate",
    },
    {
      name: "Investment Declaration - FY 2025-26",
      description: "Tax-saving investment declaration form",
      year: "2025-26",
      uploadDate: "Apr 1, 2025",
      type: "Declaration",
    },
    {
      name: "Investment Proof Submission - FY 2024-25",
      description: "Submitted investment proofs",
      year: "2024-25",
      uploadDate: "Feb 28, 2025",
      type: "Proof",
    },
  ];

  const salaryBreakdown = [
    { component: "Basic Salary", amount: "₹42,500" },
    { component: "House Rent Allowance", amount: "₹21,250" },
    { component: "Special Allowance", amount: "₹12,750" },
    { component: "Transport Allowance", amount: "₹5,000" },
    { component: "Medical Allowance", amount: "₹3,500" },
  ];

  const deductions = [
    { component: "Provident Fund", amount: "₹5,100" },
    { component: "Professional Tax", amount: "₹200" },
    { component: "Income Tax (TDS)", amount: "₹7,250" },
  ];

  const handleDownloadPayslip = (month: string) => {
    toast.success(`Downloading payslip for ${month}`);
  };

  const handleDownloadForm = (formName: string) => {
    toast.success(`Downloading ${formName}`);
  };

  const handleSubmitQuery = () => {
    if (!querySubject || !queryMessage) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Your query has been submitted successfully. We'll respond within 2 business days.");
    setQuerySubject("");
    setQueryMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Payroll & Compensation</h1>
        <p className="text-muted-foreground">View payslips, tax forms, and submit payroll queries</p>
      </div>

      {/* Salary Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardDescription>Gross Salary</CardDescription>
            <CardTitle className="text-2xl">₹85,000</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="size-4" />
              <span>Per month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="pb-3">
            <CardDescription>Net Salary</CardDescription>
            <CardTitle className="text-2xl">₹72,450</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="size-4" />
              <span>After deductions</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardDescription>Annual CTC</CardDescription>
            <CardTitle className="text-2xl">₹12.8 L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="size-4" />
              <span>FY 2025-26</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payslips" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="payslips">Payslips</TabsTrigger>
          <TabsTrigger value="tax-forms">Tax & Forms</TabsTrigger>
          <TabsTrigger value="queries">Submit Query</TabsTrigger>
        </TabsList>

        {/* Payslips Tab */}
        <TabsContent value="payslips" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-bold">Salary Payslips</CardTitle>
                  <CardDescription>Download your monthly payslips</CardDescription>
                </div>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payslips.map((payslip, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-secondary/10 flex items-center justify-center">
                        <FileText className="size-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">{payslip.month}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>Paid on {payslip.date}</span>
                          <span>•</span>
                          <span>Net: {payslip.netSalary}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                        <CheckCircle className="size-3 mr-1" />
                        {payslip.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadPayslip(payslip.month)}
                      >
                        <Download className="size-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Salary Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Earnings Breakdown</CardTitle>
                <CardDescription>Monthly salary components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {salaryBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <span className="text-sm text-muted-foreground">{item.component}</span>
                      <span className="font-medium">{item.amount}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-3 border-t-2">
                    <span className="font-medium">Total Earnings</span>
                    <span className="font-semibold text-lg text-primary">₹85,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Deductions</CardTitle>
                <CardDescription>Monthly deductions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deductions.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <span className="text-sm text-muted-foreground">{item.component}</span>
                      <span className="font-medium">{item.amount}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-3 border-t-2">
                    <span className="font-medium">Total Deductions</span>
                    <span className="font-semibold text-lg text-destructive">₹12,550</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tax & Forms Tab */}
        <TabsContent value="tax-forms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">Tax Documents & Forms</CardTitle>
              <CardDescription>Access your tax certificates and declaration forms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {taxForms.map((form, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-[#FF6F00]/10 flex items-center justify-center">
                        <FileText className="size-5 text-[#FF6F00]" />
                      </div>
                      <div>
                        <p className="font-medium">{form.name}</p>
                        <p className="text-sm text-muted-foreground">{form.description}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span>Uploaded: {form.uploadDate}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {form.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadForm(form.name)}
                    >
                      <Download className="size-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tax Saving Info */}
          <Card className="border-l-4 border-l-secondary">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="size-5 text-secondary" />
                <CardTitle>Investment Declaration Reminder</CardTitle>
              </div>
              <CardDescription>Submit your tax-saving investment proofs by February 28, 2026</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm">
                  Don't forget to submit your investment proofs for tax deduction under Section 80C, 80D, and other applicable sections.
                </p>
                <Button className="bg-secondary hover:bg-secondary/90">
                  Upload Investment Proofs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Queries Tab */}
        <TabsContent value="queries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">Submit Payroll Query</CardTitle>
              <CardDescription>Have questions about your salary or tax? Submit your query here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="query-subject">Query Subject</Label>
                  <Select value={querySubject} onValueChange={setQuerySubject}>
                    <SelectTrigger id="query-subject">
                      <SelectValue placeholder="Select query type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary-component">Salary Component Query</SelectItem>
                      <SelectItem value="payslip-error">Payslip Error/Discrepancy</SelectItem>
                      <SelectItem value="tax-deduction">Tax Deduction Query</SelectItem>
                      <SelectItem value="form16">Form 16 Related</SelectItem>
                      <SelectItem value="reimbursement">Reimbursement Query</SelectItem>
                      <SelectItem value="arrears">Arrears/Bonus Query</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="query-message">Query Details</Label>
                  <Textarea
                    id="query-message"
                    placeholder="Describe your query in detail..."
                    value={queryMessage}
                    onChange={(e) => setQueryMessage(e.target.value)}
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Please provide as much detail as possible to help us resolve your query quickly
                  </p>
                </div>

                <Button
                  className="w-full"
                  onClick={handleSubmitQuery}
                >
                  Submit Query
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Queries */}
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">Recent Queries</CardTitle>
              <CardDescription>Track your submitted queries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Tax Deduction Query</p>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Resolved</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Query regarding 80C deduction limit for the current FY
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    <span>Submitted: Sept 15, 2025</span>
                    <span>•</span>
                    <span>Resolved: Sept 16, 2025</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Salary Component Query</p>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">In Progress</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Question about special allowance calculation
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    <span>Submitted: Oct 1, 2025</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}