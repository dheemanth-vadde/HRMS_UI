import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Briefcase, UserPlus, CheckCircle, XCircle, Send } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function RecruitmentModule() {
  const [isRequisitionDialogOpen, setIsRequisitionDialogOpen] = useState(false);

  const openRequisitions = [
    {
      id: 1,
      position: "Senior Officer",
      department: "Retail Banking",
      count: 2,
      status: "Approved",
      candidates: 12,
      shortlisted: 3,
      raisedOn: "Sep 20, 2025",
    },
    {
      id: 2,
      position: "Clerk",
      department: "Operations",
      count: 1,
      status: "Pending HR Review",
      candidates: 0,
      shortlisted: 0,
      raisedOn: "Oct 5, 2025",
    },
  ];

  const shortlistedCandidates = [
    {
      id: 1,
      name: "Arjun Malhotra",
      position: "Senior Officer",
      experience: "4 years",
      education: "MBA Finance, IIM",
      currentCompany: "ICICI Bank",
      noticePeriod: "60 days",
      expectedSalary: "₹10 LPA",
      status: "Pending Review",
    },
    {
      id: 2,
      name: "Divya Nair",
      position: "Senior Officer",
      experience: "3.5 years",
      education: "MBA Marketing, XLRI",
      currentCompany: "HDFC Bank",
      noticePeriod: "30 days",
      expectedSalary: "₹9.5 LPA",
      status: "Pending Review",
    },
    {
      id: 3,
      name: "Rohit Sharma",
      position: "Senior Officer",
      experience: "5 years",
      education: "B.Com, CA",
      currentCompany: "Axis Bank",
      noticePeriod: "90 days",
      expectedSalary: "₹11 LPA",
      status: "Pending Review",
    },
  ];

  const handleRaiseRequisition = () => {
    toast.success("Requisition raised successfully!", {
      description: "HR will review your request",
    });
    setIsRequisitionDialogOpen(false);
  };

  const handleRecommendCandidate = (candidateName: string) => {
    toast.success(`Candidate recommended!`, {
      description: `${candidateName} has been forwarded to HR for offer processing`,
    });
  };

  const handleRejectCandidate = (candidateName: string) => {
    toast.info(`Candidate rejected`, {
      description: `${candidateName} will not proceed further`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Recruitment Management</h1>
          <p className="text-muted-foreground">Raise requisitions and review candidates</p>
        </div>
        <Dialog open={isRequisitionDialogOpen} onOpenChange={setIsRequisitionDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="size-4 mr-2" />
              Raise Requisition
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Raise Vacancy Requisition</DialogTitle>
              <DialogDescription>Submit a request for new position</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Position Title</Label>
                <Input placeholder="e.g., Senior Officer" />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Input placeholder="e.g., Retail Banking" value="Retail Banking" disabled />
              </div>
              <div className="space-y-2">
                <Label>Number of Positions</Label>
                <Input type="number" placeholder="1" defaultValue="1" />
              </div>
              <div className="space-y-2">
                <Label>Justification</Label>
                <Textarea placeholder="Reason for hiring (e.g., business expansion, replacement, etc.)" />
              </div>
              <div className="space-y-2">
                <Label>Required Skills</Label>
                <Textarea placeholder="Key skills and qualifications required" />
              </div>
              <Button onClick={handleRaiseRequisition} className="w-full bg-primary hover:bg-primary/90">
                Submit Requisition
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Open Requisitions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Active requests</p>
            <Badge variant="default" className="mt-2">Active</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Total Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">Applications received</p>
            <Badge variant="secondary" className="mt-2">In Review</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Shortlisted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">For your review</p>
            <Badge variant="default" className="mt-2">Qualified</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Offers Extended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-sm text-muted-foreground">This quarter</p>
            <Badge variant="outline" className="mt-2">Pending</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Open Requisitions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">My Requisitions</CardTitle>
          <CardDescription>Track your hiring requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {openRequisitions.map((req) => (
              <div key={req.id} className="p-4 rounded-lg border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{req.position}</h4>
                      <Badge
                        variant={req.status === "Approved" ? "default" : "secondary"}
                      >
                        {req.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span>{req.department}</span>
                      <span>•</span>
                      <span>{req.count} position(s)</span>
                      <span>•</span>
                      <span>Raised: {req.raisedOn}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Candidates</p>
                    <p className="text-lg font-bold text-primary">{req.candidates}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Shortlisted by HR</p>
                    <p className="text-lg font-bold text-green-600">{req.shortlisted}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Conversion Rate</p>
                    <p className="text-lg font-bold">
                      {req.candidates > 0 ? Math.round((req.shortlisted / req.candidates) * 100) : 0}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shortlisted Candidates */}
      <Card>
        <CardHeader>
          <CardTitle>Candidates for Review</CardTitle>
          <CardDescription>HR has shortlisted these candidates for your review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shortlistedCandidates.map((candidate) => (
              <div key={candidate.id} className="p-4 rounded-lg border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{candidate.name}</h4>
                      <Badge variant="secondary">{candidate.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Applying for: {candidate.position}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">View Resume</Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-3 bg-muted/50 rounded-lg mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="text-sm font-medium">{candidate.experience}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Education</p>
                    <p className="text-sm font-medium">{candidate.education}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Current Company</p>
                    <p className="text-sm font-medium">{candidate.currentCompany}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Notice Period</p>
                    <p className="text-sm font-medium">{candidate.noticePeriod}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Expected CTC</p>
                    <p className="text-sm font-medium">{candidate.expectedSalary}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-sm text-muted-foreground">
                    Recommended by HR for final interview
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleRejectCandidate(candidate.name)}
                    >
                      <XCircle className="size-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRecommendCandidate(candidate.name)}
                    >
                      Recommend
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recruitment Guidelines */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle>Recruitment Process</CardTitle>
          <CardDescription>Steps in the hiring workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div>
                <p className="text-sm font-medium">Raise Requisition</p>
                <p className="text-sm text-muted-foreground">Submit hiring request with justification</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <div>
                <p className="text-sm font-medium">HR Screening</p>
                <p className="text-sm text-muted-foreground">HR reviews applications and shortlists candidates</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <div>
                <p className="text-sm font-medium">Manager Review</p>
                <p className="text-sm text-muted-foreground">Review shortlisted candidates and recommend for offer</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">4</span>
              </div>
              <div>
                <p className="text-sm font-medium">Offer & Onboarding</p>
                <p className="text-sm text-muted-foreground">HR issues offer letter and manages onboarding</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}