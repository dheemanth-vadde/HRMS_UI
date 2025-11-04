import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { TrendingUp, Users, Award, Target, FileCheck, Download, AlertCircle, Clock, CheckCircle, Star, ArrowLeft, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner@2.0.3";
import { cn } from "../ui/utils";

export function PerformanceManagement() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [reviewData, setReviewData] = useState({
    overallRating: 0,
    technicalSkills: 0,
    communication: 0,
    teamwork: 0,
    leadership: 0,
    problemSolving: 0,
    managerComments: "",
    strengths: "",
    areasOfImprovement: "",
    trainingRecommendations: "",
  });

  const currentCycle = {
    name: "Annual Appraisal 2025",
    period: "Jan 2025 - Dec 2025",
    deadline: "Dec 31, 2025",
    status: "In Progress",
  };

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "Senior Officer",
      employeeId: "PNB10234",
      selfAssessment: "Completed",
      managerReview: "Pending",
      overallProgress: 50,
      goalsCompleted: 4,
      totalGoals: 5,
      rating: null,
      dueDate: "Oct 15, 2025",
      selfRating: 4.0,
      selfComments: "Successfully completed all major projects assigned. Led the digital banking initiative which resulted in 30% increase in online transactions.",
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Officer",
      employeeId: "PNB10567",
      selfAssessment: "Completed",
      managerReview: "Pending",
      overallProgress: 50,
      goalsCompleted: 3,
      totalGoals: 5,
      rating: null,
      dueDate: "Oct 16, 2025",
      selfRating: 3.5,
      selfComments: "Made significant contributions to customer service improvement. Handled complex cases efficiently.",
    },
    {
      id: 3,
      name: "Amit Verma",
      position: "Clerk",
      employeeId: "PNB10892",
      selfAssessment: "Completed",
      managerReview: "Completed",
      overallProgress: 100,
      goalsCompleted: 5,
      totalGoals: 5,
      rating: 4.2,
      dueDate: "Oct 10, 2025",
      selfRating: 4.0,
      selfComments: "Exceeded all performance targets. Maintained 100% accuracy in all transactions.",
    },
    {
      id: 4,
      name: "Neha Gupta",
      position: "Senior Officer",
      employeeId: "PNB10145",
      selfAssessment: "Pending",
      managerReview: "Pending",
      overallProgress: 0,
      goalsCompleted: 3,
      totalGoals: 5,
      rating: null,
      dueDate: "Oct 18, 2025",
      selfRating: null,
      selfComments: "",
    },
  ]);

  const pendingReviews = teamMembers.filter((m) => m.managerReview === "Pending");
  const completedReviews = teamMembers.filter((m) => m.managerReview === "Completed");

  const handleStartReview = (employee: any) => {
    if (employee.selfAssessment !== "Completed") {
      toast.error("Employee must complete self-assessment first!");
      return;
    }
    setSelectedEmployee(employee);
    setReviewData({
      overallRating: 0,
      technicalSkills: 0,
      communication: 0,
      teamwork: 0,
      leadership: 0,
      problemSolving: 0,
      managerComments: "",
      strengths: "",
      areasOfImprovement: "",
      trainingRecommendations: "",
    });
    setShowReviewDialog(true);
  };

  const handleRatingChange = (field: string, value: number) => {
    setReviewData({ ...reviewData, [field]: value });
  };

  const calculateAverageRating = () => {
    const ratings = [
      reviewData.technicalSkills,
      reviewData.communication,
      reviewData.teamwork,
      reviewData.leadership,
      reviewData.problemSolving,
    ];
    const sum = ratings.reduce((a, b) => a + b, 0);
    return sum > 0 ? (sum / ratings.length).toFixed(1) : 0;
  };

  const handleSubmitReview = () => {
    if (reviewData.overallRating === 0) {
      toast.error("Please provide an overall rating!");
      return;
    }
    if (!reviewData.managerComments.trim()) {
      toast.error("Please provide manager comments!");
      return;
    }
    
    // Update the team member data
    setTeamMembers(teamMembers.map(member => 
      member.id === selectedEmployee.id 
        ? { 
            ...member, 
            managerReview: "Completed", 
            overallProgress: 100,
            rating: reviewData.overallRating 
          } 
        : member
    ));

    toast.success(`Performance review submitted for ${selectedEmployee.name}!`);
    setShowReviewDialog(false);
    setSelectedEmployee(null);
  };

  const RatingStars = ({ rating, onRate, editable = true }: { rating: number; onRate?: (value: number) => void; editable?: boolean }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!editable}
            onClick={() => editable && onRate && onRate(star)}
            className={cn(
              "transition-colors",
              editable && "hover:scale-110 cursor-pointer"
            )}
          >
            <Star
              className={cn(
                "size-6",
                star <= rating
                  ? "fill-secondary text-secondary"
                  : "fill-gray-200 text-gray-200"
              )}
            />
          </button>
        ))}
      </div>
    );
  };

  // If viewing employee details
  if (selectedEmployee && !showReviewDialog) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedEmployee(null)} className="gap-2">
            <ArrowLeft className="size-4" />
            Back to Team
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{selectedEmployee.name}</CardTitle>
                <CardDescription>{selectedEmployee.position} • {selectedEmployee.employeeId}</CardDescription>
              </div>
              <Badge variant={selectedEmployee.managerReview === "Completed" ? "default" : "secondary"}>
                {selectedEmployee.managerReview}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Self-Assessment Comments</Label>
                <p className="text-sm mt-2 p-4 bg-muted rounded-lg">
                  {selectedEmployee.selfComments || "No comments provided"}
                </p>
              </div>
              {selectedEmployee.selfRating && (
                <div>
                  <Label>Self Rating</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <RatingStars rating={selectedEmployee.selfRating} editable={false} />
                    <span className="text-sm text-muted-foreground">({selectedEmployee.selfRating}/5.0)</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1>Performance Review</h1>
        <p className="text-muted-foreground">Manage team appraisals and provide ratings</p>
      </div>

      {/* Current Cycle Info */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{currentCycle.name}</CardTitle>
              <CardDescription>
                {currentCycle.period} | Deadline: {currentCycle.deadline}
              </CardDescription>
            </div>
            <Badge variant="secondary">{currentCycle.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-columns-three gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Team Size</p>
              <p className="text-2xl font-bold text-primary">{teamMembers.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Reviews</p>
              <p className="text-2xl font-bold text-orange-600">{pendingReviews.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedReviews.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-sm text-muted-foreground">Team members</p>
            <Badge variant="default" className="mt-2">Active</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReviews.length}</div>
            <p className="text-sm text-muted-foreground">Awaiting review</p>
            <Badge variant="secondary" className="mt-2">In Progress</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedReviews.length}</div>
            <p className="text-sm text-muted-foreground">Reviews done</p>
            <Badge variant="default" className="mt-2">Done</Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-sm text-muted-foreground">Out of 5.0</p>
            <Badge variant="outline" className="mt-2">Excellent</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Reviews</CardTitle>
          <CardDescription>Review and rate your team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="p-4 rounded-lg border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="size-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{member.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {member.employeeId}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{member.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        member.managerReview === "Completed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {member.managerReview}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">Due: {member.dueDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-columns-three gap-4 p-3 bg-muted/50 rounded-lg mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Self-Assessment</p>
                    <Badge
                      variant={
                        member.selfAssessment === "Completed"
                          ? "default"
                          : "outline"
                      }
                      className="mt-1 text-xs"
                    >
                      {member.selfAssessment}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Goals Achieved</p>
                    <p className="text-sm font-medium mt-1">
                      {member.goalsCompleted} / {member.totalGoals}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Current Rating</p>
                    <p className="text-sm font-medium mt-1">
                      {member.rating ? `${member.rating} / 5.0` : "Not Rated"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Review Progress</span>
                    <span className="font-medium">{member.overallProgress}%</span>
                  </div>
                  <Progress value={member.overallProgress} className="h-2" />
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedEmployee(member)}
                  >
                    View Details
                  </Button>
                  <div className="flex gap-2">
                    {member.managerReview === "Pending" ? (
                      <Button
                        className="btn-gradient-primary"
                        size="sm"
                        onClick={() => handleStartReview(member)}
                      >
                        Start Review
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <FileCheck className="size-4 mr-2" />
                        View Review
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Performance Review - {selectedEmployee?.name}</DialogTitle>
            <DialogDescription>
              Provide ratings and feedback for {selectedEmployee?.position}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 py-3">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Overall Rating */}
              <div className="space-y-2">
                <Label className="text-base">Overall Rating *</Label>
                <div className="flex items-center gap-4">
                  <RatingStars 
                    rating={reviewData.overallRating} 
                    onRate={(value) => handleRatingChange("overallRating", value)} 
                  />
                  <span className="text-sm text-muted-foreground">
                    {reviewData.overallRating > 0 ? `${reviewData.overallRating}/5.0` : "Not rated"}
                  </span>
                </div>
              </div>

              {/* Competency Ratings */}
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium">Competency Assessment</h4>
                
                <div className="space-y-2">
                  <Label>Technical Skills</Label>
                  <RatingStars 
                    rating={reviewData.technicalSkills} 
                    onRate={(value) => handleRatingChange("technicalSkills", value)} 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Communication</Label>
                  <RatingStars 
                    rating={reviewData.communication} 
                    onRate={(value) => handleRatingChange("communication", value)} 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Teamwork & Collaboration</Label>
                  <RatingStars 
                    rating={reviewData.teamwork} 
                    onRate={(value) => handleRatingChange("teamwork", value)} 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Leadership</Label>
                  <RatingStars 
                    rating={reviewData.leadership} 
                    onRate={(value) => handleRatingChange("leadership", value)} 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Problem Solving</Label>
                  <RatingStars 
                    rating={reviewData.problemSolving} 
                    onRate={(value) => handleRatingChange("problemSolving", value)} 
                  />
                </div>

                {calculateAverageRating() > 0 && (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">
                      Competency Average: <span className="font-semibold text-foreground">{calculateAverageRating()}/5.0</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Key Strengths */}
              <div className="space-y-2">
                <Label htmlFor="strengths">Key Strengths</Label>
                <Textarea
                  id="strengths"
                  placeholder="Highlight employee's strengths..."
                  rows={5}
                  value={reviewData.strengths}
                  onChange={(e) => setReviewData({ ...reviewData, strengths: e.target.value })}
                />
              </div>

              {/* Manager Comments */}
              <div className="space-y-2">
                <Label htmlFor="managerComments">Manager Comments *</Label>
                <Textarea
                  id="managerComments"
                  placeholder="Provide detailed feedback on performance..."
                  rows={5}
                  value={reviewData.managerComments}
                  onChange={(e) => setReviewData({ ...reviewData, managerComments: e.target.value })}
                />
              </div>

              {/* Areas of Improvement */}
              <div className="space-y-2">
                <Label htmlFor="areasOfImprovement">Areas of Improvement</Label>
                <Textarea
                  id="areasOfImprovement"
                  placeholder="Suggest areas for development..."
                  rows={5}
                  value={reviewData.areasOfImprovement}
                  onChange={(e) => setReviewData({ ...reviewData, areasOfImprovement: e.target.value })}
                />
              </div>

              {/* Training Recommendations */}
              <div className="space-y-2">
                <Label htmlFor="trainingRecommendations">Training Recommendations</Label>
                <Textarea
                  id="trainingRecommendations"
                  placeholder="Recommend training programs or skills development..."
                  rows={5}
                  value={reviewData.trainingRecommendations}
                  onChange={(e) => setReviewData({ ...reviewData, trainingRecommendations: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              Cancel
            </Button>
            <Button className="btn-gradient-primary" onClick={handleSubmitReview}>
              <Send className="size-4 mr-2" />
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
