import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FileText, Download, Search, Book, Shield, FileCheck, HelpCircle } from "lucide-react";

export function PoliciesModule() {
  const policyCategories = [
    {
      category: "HR Policies",
      icon: Shield,
      documents: [
        { name: "Employee Handbook 2025", size: "2.5 MB", lastUpdated: "Jan 1, 2025" },
        { name: "Code of Conduct", size: "1.2 MB", lastUpdated: "Jan 1, 2025" },
        { name: "Leave Policy", size: "850 KB", lastUpdated: "Jan 1, 2025" },
        { name: "Work from Home Policy", size: "650 KB", lastUpdated: "Mar 15, 2025" },
      ],
    },
    {
      category: "Attendance & Leave",
      icon: FileCheck,
      documents: [
        { name: "Attendance Guidelines", size: "450 KB", lastUpdated: "Jan 1, 2025" },
        { name: "Leave Application Process", size: "320 KB", lastUpdated: "Jan 1, 2025" },
        { name: "Holiday Calendar 2025", size: "280 KB", lastUpdated: "Dec 15, 2024" },
      ],
    },
    {
      category: "Performance Management",
      icon: FileText,
      documents: [
        { name: "PMS Guidelines 2025", size: "1.8 MB", lastUpdated: "Jan 5, 2025" },
        { name: "Goal Setting Framework", size: "950 KB", lastUpdated: "Jan 5, 2025" },
        { name: "Appraisal Process Manual", size: "1.1 MB", lastUpdated: "Jan 5, 2025" },
      ],
    },
    {
      category: "User Guides",
      icon: Book,
      documents: [
        { name: "HRMS User Guide - Employee", size: "3.2 MB", lastUpdated: "Feb 1, 2025" },
        { name: "Self-Service Portal Guide", size: "1.5 MB", lastUpdated: "Feb 1, 2025" },
        { name: "Payslip Access Guide", size: "420 KB", lastUpdated: "Feb 1, 2025" },
      ],
    },
  ];

  const faqs = [
    {
      question: "How do I apply for leave?",
      answer: "Go to Leave Management > Apply for Leave. Select the leave type, dates, and submit with reason.",
    },
    {
      question: "What is the notice period?",
      answer: "The standard notice period is 60 days for all positions unless specified differently in your offer letter.",
    },
    {
      question: "How can I view my payslips?",
      answer: "Payslips are available in the Payroll section. Click on Payroll from the menu and select View Payslips.",
    },
    {
      question: "Who do I contact for IT support?",
      answer: "For IT-related queries, please raise a ticket through the IT Service Desk portal or email itsupport@pnb.com",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>HR Policies</h1>
        <p className="text-muted-foreground">Access policies, manuals, and guides</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-orange-600" />
              <Input placeholder="Search policies, documents, or FAQs..." className="pl-9" />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Quick Access</CardTitle>
          <CardDescription>Frequently accessed documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2">
              <Shield className="size-6 text-orange-600" />
              <span className="text-sm">Employee Handbook</span>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2">
              <FileCheck className="size-6 text-orange-600" />
              <span className="text-sm">Leave Policy</span>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2">
              <Book className="size-6 text-orange-600" />
              <span className="text-sm">HRMS User Guide</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Policy Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {policyCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <category.icon className="size-5 text-orange-600" />
                <CardTitle className="text-base font-bold">{category.category}</CardTitle>
              </div>
              <CardDescription>{category.documents.length} documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.documents.map((doc, docIndex) => (
                  <div
                    key={docIndex}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="size-4 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Updated: {doc.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="size-5 text-orange-600" />
            <CardTitle className="font-bold">Frequently Asked Questions</CardTitle>
          </div>
          <CardDescription>Common queries and their answers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <h4 className="font-medium mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>Contact HR support for assistance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <HelpCircle className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">HR Helpdesk</p>
                <p className="text-sm text-muted-foreground">Email: hr.support@pnb.com | Phone: 1800-123-4567</p>
              </div>
            </div>
            <Button>
              Raise Support Ticket
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}