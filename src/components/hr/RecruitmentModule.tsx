import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, UserPlus, Users, Clock, CheckCircle2, XCircle, FileText, Calendar } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function RecruitmentModule() {
  const [isVacancyDialogOpen, setIsVacancyDialogOpen] = useState(false);

  const openPositions = [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Technology",
      location: "Delhi",
      type: "Full-time",
      status: "Active",
      applicants: 45,
      shortlisted: 12,
      interviewed: 5,
      posted: "Sep 20, 2025",
    },
    {
      id: 2,
      title: "Relationship Manager",
      department: "Retail Banking",
      location: "Mumbai",
      type: "Full-time",
      status: "Active",
      applicants: 78,
      shortlisted: 20,
      interviewed: 8,
      posted: "Sep 25, 2025",
    },
    {
      id: 3,
      title: "Credit Analyst",
      department: "Corporate Banking",
      location: "Bangalore",
      type: "Full-time",
      status: "On Hold",
      applicants: 32,
      shortlisted: 8,
      interviewed: 2,
      posted: "Oct 1, 2025",
    },
  ];

  const recentCandidates = [
    {
      id: 1,
      name: "Rahul Mehta",
      position: "Senior Software Engineer",
      experience: "5 years",
      status: "Interview Scheduled",
      stage: "Technical Round",
      date: "Oct 12, 2025",
    },
    {
      id: 2,
      name: "Sneha Desai",
      position: "Relationship Manager",
      experience: "3 years",
      status: "Shortlisted",
      stage: "Resume Review",
      date: "Oct 10, 2025",
    },
    {
      id: 3,
      name: "Vikram Choudhary",
      position: "Credit Analyst",
      experience: "4 years",
      status: "Offer Extended",
      stage: "Final Round",
      date: "Oct 8, 2025",
    },
  ];

  const onboardingQueue = [
    {
      id: 1,
      name: "Anjali Kapoor",
      position: "Officer",
      department: "Retail Banking",
      joiningDate: "Oct 15, 2025",
      status: "Documents Pending",
      completion: 60,
    },
    {
      id: 2,
      name: "Karthik Reddy",
      position: "Software Engineer",
      department: "Technology",
      joiningDate: "Oct 18, 2025",
      status: "Pre-boarding",
      completion: 80,
    },
  ];

  const handlePostVacancy = () => {
    toast.success("Vacancy posted successfully!", {
      description: "Managers have been notified",
    });
    setIsVacancyDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "On Hold":
        return "secondary";
      case "Closed":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Recruitment & Onboarding</h1>
          <p className="text-muted-foreground">Manage vacancies and candidate pipeline</p>
        </div>
        <Dialog open={isVacancyDialogOpen} onOpenChange={setIsVacancyDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Post Vacancy
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Post New Vacancy</DialogTitle>
              <DialogDescription>Create a new job requisition</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input placeholder="e.g., Senior Officer" />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail Banking</SelectItem>
                    <SelectItem value="corporate">Corporate Banking</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="ops">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="e.g., Delhi" />
              </div>
              <div className="space-y-2">
                <Label>Number of Positions</Label>
                <Input type="number" placeholder="1" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Job Description</Label>
                <Textarea placeholder="Enter job description and requirements" rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Experience Required</Label>
                <Input placeholder="e.g., 3-5 years" />
              </div>
              <div className="space-y-2">
                <Label>Salary Range</Label>
                <Input placeholder="e.g., ₹8-12 LPA" />
              </div>
            </div>
            <Button onClick={handlePostVacancy} className="w-full bg-primary hover:bg-primary/90">
              Post Vacancy
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Open Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Active vacancies</p>
            <Badge variant="default" className="mt-2">Active</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Total Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">155</div>
            <p className="text-sm text-muted-foreground">This month</p>
            <Badge variant="secondary" className="mt-2">In Review</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-sm text-muted-foreground">Scheduled</p>
            <Badge variant="default" className="mt-2">Upcoming</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Onboarding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">In progress</p>
            <Badge variant="outline" className="mt-2">Processing</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Open Positions */}
      <Card>
        <CardHeader>
          <CardTitle>Open Positions</CardTitle>
          <CardDescription>Active job requisitions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {openPositions.map((position) => (
              <div key={position.id} className="p-4 rounded-lg border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{position.title}</h4>
                      <Badge variant={getStatusColor(position.status)}>{position.status}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span>{position.department}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>Posted: {position.posted}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <div className="grid grid-cols-4 gap-4 p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Applicants</p>
                    <p className="text-lg font-bold text-primary">{position.applicants}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Shortlisted</p>
                    <p className="text-lg font-bold text-green-600">{position.shortlisted}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Interviewed</p>
                    <p className="text-lg font-bold text-orange-600">{position.interviewed}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Conversion</p>
                    <p className="text-lg font-bold">
                      {Math.round((position.interviewed / position.applicants) * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Candidates */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Candidates</CardTitle>
            <CardDescription>Latest applicants in pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentCandidates.map((candidate) => (
                <div key={candidate.id} className="p-3 rounded-lg border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate.position}</p>
                    </div>
                    <Badge variant="secondary">{candidate.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Experience: {candidate.experience}</span>
                    <span className="text-muted-foreground">{candidate.stage}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Onboarding Queue */}
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Queue</CardTitle>
            <CardDescription>New joiners in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {onboardingQueue.map((item) => (
                <div key={item.id} className="p-3 rounded-lg border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.position} - {item.department}
                      </p>
                    </div>
                    <Badge variant="secondary">{item.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Joining: {item.joiningDate}</span>
                      <span>{item.completion}% Complete</span>
                    </div>
                    <Progress value={item.completion} variant="primary" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}