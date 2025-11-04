import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Target, TrendingUp, Award, FileCheck, Star, CheckCircle2, AlertCircle, Download } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { toast } from "sonner@2.0.3";
import { ScrollArea } from "../ui/scroll-area";

export function PerformanceModule() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentData, setAssessmentData] = useState<{
    [key: number]: {
      rating: string;
      achievements: string;
      challenges: string;
    };
  }>({});
  const [overallComments, setOverallComments] = useState({
    majorAchievements: "",
    areasOfImprovement: "",
    trainingNeeds: "",
    careerAspirations: "",
  });

  const currentCycle = {
    name: "Annual Appraisal 2025",
    period: "Jan 2025 - Dec 2025",
    status: "In Progress",
    deadline: "Dec 31, 2025",
  };

  const goals = [
    {
      id: 1,
      title: "Customer Service Excellence",
      description: "Maintain customer satisfaction rating above 4.5/5",
      weightage: 30,
      progress: 85,
      status: "On Track",
    },
    {
      id: 2,
      title: "Loan Processing Efficiency",
      description: "Process 500+ loan applications with <5% rejection rate",
      weightage: 25,
      progress: 60,
      status: "In Progress",
    },
    {
      id: 3,
      title: "Digital Banking Adoption",
      description: "Help 200 customers transition to digital banking",
      weightage: 20,
      progress: 75,
      status: "On Track",
    },
    {
      id: 4,
      title: "Team Collaboration",
      description: "Lead 2 cross-functional projects successfully",
      weightage: 15,
      progress: 45,
      status: "Needs Attention",
    },
    {
      id: 5,
      title: "Training & Development",
      description: "Complete 40 hours of professional training",
      weightage: 10,
      progress: 90,
      status: "On Track",
    },
  ];

  const appraisalHistory = [
    { year: "2024", rating: "Excellent", score: 4.5, increment: "12%" },
    { year: "2023", rating: "Very Good", score: 4.2, increment: "10%" },
    { year: "2022", rating: "Good", score: 3.8, increment: "8%" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "default";
      case "In Progress":
        return "secondary";
      case "Needs Attention":
        return "destructive";
      default:
        return "outline";
    }
  };

  const overallProgress = Math.round(
    goals.reduce((acc, goal) => acc + (goal.progress * goal.weightage) / 100, 0)
  );

  const handleRatingChange = (goalId: number, rating: string) => {
    setAssessmentData((prev) => ({
      ...prev,
      [goalId]: {
        ...prev[goalId],
        rating,
      },
    }));
  };

  const handleAchievementsChange = (goalId: number, achievements: string) => {
    setAssessmentData((prev) => ({
      ...prev,
      [goalId]: {
        ...prev[goalId],
        achievements,
      },
    }));
  };

  const handleChallengesChange = (goalId: number, challenges: string) => {
    setAssessmentData((prev) => ({
      ...prev,
      [goalId]: {
        ...prev[goalId],
        challenges,
      },
    }));
  };

  const handleSaveDraft = () => {
    toast.success("Assessment saved as draft", {
      description: "You can continue editing later",
    });
  };

  const handleSubmitAssessment = () => {
    // Check if all goals have ratings
    const allRated = goals.every((goal) => assessmentData[goal.id]?.rating);
    
    if (!allRated) {
      toast.error("Incomplete Assessment", {
        description: "Please provide ratings for all KRAs before submitting",
      });
      return;
    }

    toast.success("Self-Assessment Submitted Successfully", {
      description: "Your manager will review your assessment shortly",
    });
    setShowAssessment(false);
  };

  const getRatingLabel = (rating: string) => {
    const labels: { [key: string]: string } = {
      "1": "Poor",
      "2": "Below Expectations",
      "3": "Meets Expectations",
      "4": "Exceeds Expectations",
      "5": "Outstanding",
    };
    return labels[rating] || "";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Performance Management</h1>
        <p className="text-muted-foreground">Track your KRAs and appraisal progress</p>
      </div>

      {/* Current Cycle */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="font-bold">{currentCycle.name}</CardTitle>
              <CardDescription>
                Period: {currentCycle.period} | Deadline: {currentCycle.deadline}
              </CardDescription>
            </div>
            <Badge variant="secondary">{currentCycle.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Overall Progress</span>
                <span className="text-sm font-medium">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setShowAssessment(true)}>
                <FileCheck className="size-4 mr-2" />
                Complete Self-Assessment
              </Button>
              <Button variant="outline">
                <Download className="size-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals & KRAs */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Goals & KRAs</CardTitle>
          <CardDescription>Your key result areas for this appraisal cycle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 rounded-lg border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="size-4 text-orange-600" />
                      <h4 className="font-medium">{goal.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">{goal.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Weightage</div>
                    <div className="text-lg font-bold text-primary">{goal.weightage}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-columns-three gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Current Rating</CardTitle>
              <TrendingUp className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">4.3</div>
            <p className="text-sm text-muted-foreground">Out of 5.0</p>
            <Badge variant="default" className="mt-2">Excellent</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Goals Completed</CardTitle>
              <Target className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">3/5</div>
            <p className="text-sm text-muted-foreground">This cycle</p>
            <Badge variant="secondary" className="mt-2">60%</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Training Hours</CardTitle>
              <Award className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">36</div>
            <p className="text-sm text-muted-foreground">Of 40 hours target</p>
            <Badge variant="default" className="mt-2">90%</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Appraisal History */}
      <Card>
        <CardHeader>
          <CardTitle>Appraisal History</CardTitle>
          <CardDescription>Your performance over the years</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {appraisalHistory.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="size-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Year {record.year}</div>
                    <div className="text-sm text-muted-foreground">Rating: {record.rating}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Score</div>
                  <div className="text-xl font-bold text-primary">{record.score}/5.0</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Increment</div>
                  <div className="text-xl font-bold text-secondary">{record.increment}</div>
                </div>
                <Button variant="outline" size="sm">View Letter</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Self-Assessment Dialog */}
      <Dialog open={showAssessment} onOpenChange={setShowAssessment}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Complete Self-Assessment</DialogTitle>
            <DialogDescription>
              Annual Appraisal 2025 | Please rate yourself on each KRA and provide detailed comments
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              {/* Instructions */}
              <div className="bg-muted/50 p-4 rounded-lg border border-primary/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-5 text-orange-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">Assessment Guidelines</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Rate yourself honestly on a scale of 1-5 for each KRA</li>
                      <li>• Provide specific achievements and examples</li>
                      <li>• Mention challenges faced and how you overcame them</li>
                      <li>• Be detailed in your responses for better evaluation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Goal-wise Assessment */}
              {goals.map((goal, index) => (
                <div key={goal.id} className="space-y-4 p-4 border rounded-lg bg-card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="font-medium">{goal.title}</h4>
                          <p className="text-sm text-muted-foreground">{goal.description}</p>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Weightage: {goal.weightage}%
                    </Badge>
                  </div>

                  <Separator />

                  {/* Rating */}
                  <div className="space-y-3">
                    <Label>Self-Rating *</Label>
                    <RadioGroup
                      value={assessmentData[goal.id]?.rating || ""}
                      onValueChange={(value) => handleRatingChange(goal.id, value)}
                    >
                      <div className="grid grid-cols-5 gap-3">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <div key={rating} className="space-y-2">
                            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                              <RadioGroupItem value={rating.toString()} id={`${goal.id}-${rating}`} />
                              <Label
                                htmlFor={`${goal.id}-${rating}`}
                                className="flex items-center gap-2 cursor-pointer flex-1"
                              >
                                <Star
                                  className={`size-4 ${
                                    assessmentData[goal.id]?.rating >= rating.toString()
                                      ? "fill-secondary text-secondary"
                                      : "text-muted-foreground"
                                  }`}
                                />
                                <span className="text-sm">{rating}</span>
                              </Label>
                            </div>
                            <p className="text-xs text-center text-muted-foreground">
                              {getRatingLabel(rating.toString())}
                            </p>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2">
                    <Label htmlFor={`achievements-${goal.id}`}>
                      Key Achievements & Examples *
                    </Label>
                    <Textarea
                      id={`achievements-${goal.id}`}
                      placeholder="Describe your major achievements for this KRA with specific examples, metrics, and outcomes..."
                      value={assessmentData[goal.id]?.achievements || ""}
                      onChange={(e) => handleAchievementsChange(goal.id, e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Challenges */}
                  <div className="space-y-2">
                    <Label htmlFor={`challenges-${goal.id}`}>
                      Challenges Faced & How You Overcame Them
                    </Label>
                    <Textarea
                      id={`challenges-${goal.id}`}
                      placeholder="Describe any challenges or obstacles you faced and the steps you took to address them..."
                      value={assessmentData[goal.id]?.challenges || ""}
                      onChange={(e) => handleChallengesChange(goal.id, e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              ))}

              <Separator className="my-6" />

              {/* Overall Assessment */}
              <div className="space-y-6 p-4 border rounded-lg bg-muted/30">
                <h3 className="font-medium">Overall Assessment</h3>

                <div className="space-y-2">
                  <Label htmlFor="major-achievements">
                    Major Accomplishments This Year *
                  </Label>
                  <Textarea
                    id="major-achievements"
                    placeholder="Summarize your top 3-5 major accomplishments across all KRAs this year..."
                    value={overallComments.majorAchievements}
                    onChange={(e) =>
                      setOverallComments({ ...overallComments, majorAchievements: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="improvements">
                    Areas for Improvement & Development Goals
                  </Label>
                  <Textarea
                    id="improvements"
                    placeholder="What areas would you like to improve? What are your development goals for next year?"
                    value={overallComments.areasOfImprovement}
                    onChange={(e) =>
                      setOverallComments({ ...overallComments, areasOfImprovement: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="training-needs">
                    Training & Skill Development Needs
                  </Label>
                  <Textarea
                    id="training-needs"
                    placeholder="What training programs or skills would help you perform better in your role?"
                    value={overallComments.trainingNeeds}
                    onChange={(e) =>
                      setOverallComments({ ...overallComments, trainingNeeds: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="career-aspirations">
                    Career Aspirations & Future Goals
                  </Label>
                  <Textarea
                    id="career-aspirations"
                    placeholder="Where do you see yourself in the next 3-5 years? What are your career goals?"
                    value={overallComments.careerAspirations}
                    onChange={(e) =>
                      setOverallComments({ ...overallComments, careerAspirations: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </div>

              {/* Submission Note */}
              <div className="bg-muted/50 p-4 rounded-lg border">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-orange-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">Before Submitting</p>
                    <p className="text-sm text-muted-foreground">
                      Please review your responses carefully. Once submitted, you won't be able to edit
                      the assessment. You can save as draft to continue later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowAssessment(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button onClick={handleSubmitAssessment}>
              <CheckCircle2 className="size-4 mr-2" />
              Submit Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}