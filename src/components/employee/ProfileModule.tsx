import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  Building2,
  Save,
  Edit,
  UserCircle,
  FileText,
  Upload,
  Download,
  Trash2,
  Eye,
  FolderOpen,
  FilePlus,
  X,
  Plus,
  CalendarDays,
  Clock,
  MoreVertical,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Textarea } from "../ui/textarea";

export function ProfileModule() {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingProfessional, setIsEditingProfessional] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<number | null>(null);
  const [selectedSkills, setSelectedSkills] = useState([
    "Customer Service",
    "Banking Operations",
    "Risk Management",
    "Microsoft Excel",
    "Financial Analysis",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [resumeFile, setResumeFile] = useState<string | null>("Resume_Sanjay_Kumar.pdf");

  // Personal Details
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "Sanjay",
    lastName: "Kumar",
    email: "sanjay.kumar@pnb.com",
    phone: "+91 98765 43210",
    alternatePhone: "+91 87654 32109",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    maritalStatus: "Married",
    bloodGroup: "O+",
    address: "123, MG Road, Connaught Place",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    emergencyContact: "Priya Kumar",
    emergencyPhone: "+91 98765 11111",
    emergencyRelation: "Spouse",
  });

  // Professional Details
  const [professionalDetails, setProfessionalDetails] = useState({
    employeeId: "PNB12345",
    designation: "Officer",
    department: "Retail Banking",
    branch: "Connaught Place Branch",
    reportingManager: "Pradeep Singh",
    dateOfJoining: "2018-06-01",
    employmentType: "Permanent",
    workLocation: "New Delhi",
    grade: "Officer Scale I",
    ctc: "₹12.8 Lakhs",
    panNumber: "ABCDE1234F",
    aadharNumber: "1234 5678 9012",
    uanNumber: "101234567890",
    pfAccountNumber: "DL/DEL/12345/6789",
    bankAccount: "1234567890123456",
    ifscCode: "PUNB0123456",
  });

  const handleSavePersonal = () => {
    setIsEditingPersonal(false);
    toast.success("Personal details updated successfully");
  };

  const handleSaveProfessional = () => {
    setIsEditingProfessional(false);
    toast.success("Professional details updated successfully");
  };

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Aadhar Card.pdf",
      category: "Identity Proof",
      uploadedOn: "Jan 15, 2024",
      size: "1.2 MB",
      status: "Verified",
    },
    {
      id: 2,
      name: "PAN Card.pdf",
      category: "Identity Proof",
      uploadedOn: "Jan 15, 2024",
      size: "856 KB",
      status: "Verified",
    },
    {
      id: 3,
      name: "Degree Certificate.pdf",
      category: "Educational",
      uploadedOn: "Feb 10, 2024",
      size: "2.4 MB",
      status: "Verified",
    },
    {
      id: 4,
      name: "Experience Letter.pdf",
      category: "Employment",
      uploadedOn: "Mar 5, 2024",
      size: "1.8 MB",
      status: "Pending Review",
    },
    {
      id: 5,
      name: "Bank Statement.pdf",
      category: "Financial",
      uploadedOn: "Apr 1, 2024",
      size: "3.5 MB",
      status: "Verified",
    },
  ]);

  const holidays = [
    { date: "Jan 26, 2025", day: "Sunday", occasion: "Republic Day", type: "National Holiday" },
    { date: "Mar 14, 2025", day: "Friday", occasion: "Holi", type: "Festival Holiday" },
    { date: "Mar 31, 2025", day: "Monday", occasion: "Eid-ul-Fitr", type: "Festival Holiday" },
    { date: "Apr 10, 2025", day: "Thursday", occasion: "Mahavir Jayanti", type: "Festival Holiday" },
    { date: "Apr 14, 2025", day: "Monday", occasion: "Dr. Ambedkar Jayanti", type: "National Holiday" },
    { date: "Apr 18, 2025", day: "Friday", occasion: "Good Friday", type: "Festival Holiday" },
    { date: "May 1, 2025", day: "Thursday", occasion: "May Day", type: "National Holiday" },
    { date: "Aug 15, 2025", day: "Friday", occasion: "Independence Day", type: "National Holiday" },
    { date: "Aug 16, 2025", day: "Saturday", occasion: "Janmashtami", type: "Festival Holiday" },
    { date: "Oct 2, 2025", day: "Thursday", occasion: "Gandhi Jayanti", type: "National Holiday" },
    { date: "Oct 22, 2025", day: "Wednesday", occasion: "Dussehra", type: "Festival Holiday" },
    { date: "Nov 1, 2025", day: "Saturday", occasion: "Diwali", type: "Festival Holiday" },
    { date: "Nov 5, 2025", day: "Wednesday", occasion: "Guru Nanak Jayanti", type: "Festival Holiday" },
    { date: "Dec 25, 2025", day: "Thursday", occasion: "Christmas", type: "Festival Holiday" },
  ];

  const handleAddSkill = () => {
    if (newSkill.trim() && !selectedSkills.includes(newSkill.trim())) {
      setSelectedSkills([...selectedSkills, newSkill.trim()]);
      setNewSkill("");
      toast.success("Skill added successfully");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    toast.success("Skill removed successfully");
  };

  const handleUploadDocument = () => {
    toast.success("Document uploaded successfully");
    setIsUploadDialogOpen(false);
  };

  const handleDeleteDocumentClick = (id: number) => {
    setDocumentToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteDocumentConfirm = () => {
    if (documentToDelete !== null) {
      setDocuments(documents.filter((doc) => doc.id !== documentToDelete));
      toast.success("Document deleted successfully");
      setDeleteConfirmOpen(false);
      setDocumentToDelete(null);
    }
  };

  const handleResumeUpload = () => {
    setResumeFile("Resume_Sanjay_Kumar_Updated.pdf");
    toast.success("Resume uploaded successfully");
  };

  const getStatusColor = (status: string) => {
    if (status === "Verified") return "bg-green-100 text-green-700 border-green-300";
    if (status === "Pending Review") return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-gray-100 text-gray-700 border-gray-300";
  };

  const getHolidayTypeColor = (type: string) => {
    if (type === "National Holiday") return "bg-orange-100 text-orange-700 border-orange-300";
    return "bg-blue-100 text-blue-700 border-blue-300";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>My Profile</h1>
          <p className="text-muted-foreground">Manage your personal and professional information</p>
        </div>
        <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center">
          <UserCircle className="size-12 text-primary" />
        </div>
      </div>

      {/* Profile Summary */}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="size-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{personalDetails.firstName} {personalDetails.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-[#FF6F00]/10 flex items-center justify-center">
                <Briefcase className="size-6 text-[#FF6F00]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Designation</p>
                <p className="font-medium">{professionalDetails.designation}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-green-100 flex items-center justify-center">
                <Building2 className="size-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium">{professionalDetails.department}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Details</TabsTrigger>
          <TabsTrigger value="professional">Professional Details</TabsTrigger>
          <TabsTrigger value="documents">Documents Vault</TabsTrigger>
          <TabsTrigger value="holidays">My Holiday Calendar</TabsTrigger>
        </TabsList>

        {/* Personal Details Tab */}
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your personal details and contact information</CardDescription>
                </div>
                {!isEditingPersonal ? (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingPersonal(true)}
                  >
                    <Edit className="size-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditingPersonal(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSavePersonal}>
                      <Save className="size-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={personalDetails.firstName}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, firstName: e.target.value })}
                    disabled={!isEditingPersonal}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={personalDetails.lastName}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, lastName: e.target.value })}
                    disabled={!isEditingPersonal}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-orange-600" />
                    <Input
                      id="email"
                      type="email"
                      value={personalDetails.email}
                      disabled
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Email cannot be changed. Contact HR for updates.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={personalDetails.phone}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
                      disabled={!isEditingPersonal}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone</Label>
                  <Input
                    id="alternatePhone"
                    value={personalDetails.alternatePhone}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, alternatePhone: e.target.value })}
                    disabled={!isEditingPersonal}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={personalDetails.dateOfBirth}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">Date of birth cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={personalDetails.gender} onValueChange={(value) => setPersonalDetails({ ...personalDetails, gender: value })} disabled={!isEditingPersonal}>
                    <SelectTrigger id="gender">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select value={personalDetails.maritalStatus} onValueChange={(value) => setPersonalDetails({ ...personalDetails, maritalStatus: value })} disabled={!isEditingPersonal}>
                    <SelectTrigger id="maritalStatus">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Input
                    id="bloodGroup"
                    value={personalDetails.bloodGroup}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, bloodGroup: e.target.value })}
                    disabled={!isEditingPersonal}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                <CardTitle className="text-base">Address Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={personalDetails.address}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, address: e.target.value })}
                    disabled={!isEditingPersonal}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={personalDetails.city}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, city: e.target.value })}
                    disabled={!isEditingPersonal}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={personalDetails.state}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, state: e.target.value })}
                    disabled={!isEditingPersonal}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={personalDetails.pincode}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, pincode: e.target.value })}
                    disabled={!isEditingPersonal}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Phone className="size-5 text-orange-600" />
                <CardTitle className="text-base">Emergency Contact</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    value={personalDetails.emergencyContact}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, emergencyContact: e.target.value })}
                    disabled={!isEditingPersonal}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={personalDetails.emergencyPhone}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, emergencyPhone: e.target.value })}
                    disabled={!isEditingPersonal}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelation">Relationship</Label>
                  <Input
                    id="emergencyRelation"
                    value={personalDetails.emergencyRelation}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, emergencyRelation: e.target.value })}
                    disabled={!isEditingPersonal}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Professional Details Tab */}
        <TabsContent value="professional" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Professional Information</CardTitle>
                  <CardDescription>Your employment and work-related details</CardDescription>
                </div>
                {!isEditingProfessional ? (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingProfessional(true)}
                  >
                    <Edit className="size-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditingProfessional(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfessional}>
                      <Save className="size-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    value={professionalDetails.employeeId}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">Employee ID cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={professionalDetails.designation}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">Contact HR to update</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={professionalDetails.department}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Input
                    id="branch"
                    value={professionalDetails.branch}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportingManager">Reporting Manager</Label>
                  <Input
                    id="reportingManager"
                    value={professionalDetails.reportingManager}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfJoining">Date of Joining</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-orange-600" />
                    <Input
                      id="dateOfJoining"
                      type="date"
                      value={professionalDetails.dateOfJoining}
                      disabled
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Input
                    id="employmentType"
                    value={professionalDetails.employmentType}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workLocation">Work Location</Label>
                  <Input
                    id="workLocation"
                    value={professionalDetails.workLocation}
                    onChange={(e) => setProfessionalDetails({ ...professionalDetails, workLocation: e.target.value })}
                    disabled={!isEditingProfessional}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Input
                    id="grade"
                    value={professionalDetails.grade}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctc">Annual CTC</Label>
                  <Input
                    id="ctc"
                    value={professionalDetails.ctc}
                    disabled
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Skills Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="size-5 text-primary" />
                <CardTitle className="text-base">My Skills</CardTitle>
              </div>
              <CardDescription>Add and manage your professional skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                  />
                  <Button onClick={handleAddSkill} className="btn-gradient-primary">
                    <Plus className="size-4 mr-2" />
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 text-primary"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resume Upload Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-primary" />
                <CardTitle className="text-base">My Resume</CardTitle>
              </div>
              <CardDescription>Upload and manage your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resumeFile ? (
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-accent/20">
                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="size-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{resumeFile}</p>
                        <p className="text-sm text-muted-foreground">Last updated: Sep 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="size-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleResumeUpload}>
                        <Upload className="size-4 mr-2" />
                        Replace
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="size-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No resume uploaded yet</p>
                    <Button onClick={handleResumeUpload} className="btn-gradient-primary">
                      <Upload className="size-4 mr-2" />
                      Upload Resume
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Statutory Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="size-5 text-primary" />
                <CardTitle className="text-base">Statutory Information</CardTitle>
              </div>
              <CardDescription>PAN, Aadhar, PF, and bank account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input
                    id="panNumber"
                    value={professionalDetails.panNumber}
                    onChange={(e) => setProfessionalDetails({ ...professionalDetails, panNumber: e.target.value })}
                    disabled={!isEditingProfessional}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadharNumber">Aadhar Number</Label>
                  <Input
                    id="aadharNumber"
                    value={professionalDetails.aadharNumber}
                    onChange={(e) => setProfessionalDetails({ ...professionalDetails, aadharNumber: e.target.value })}
                    disabled={!isEditingProfessional}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uanNumber">UAN Number</Label>
                  <Input
                    id="uanNumber"
                    value={professionalDetails.uanNumber}
                    onChange={(e) => setProfessionalDetails({ ...professionalDetails, uanNumber: e.target.value })}
                    disabled={!isEditingProfessional}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pfAccountNumber">PF Account Number</Label>
                  <Input
                    id="pfAccountNumber"
                    value={professionalDetails.pfAccountNumber}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankAccount">Bank Account Number</Label>
                  <Input
                    id="bankAccount"
                    value={professionalDetails.bankAccount}
                    onChange={(e) => setProfessionalDetails({ ...professionalDetails, bankAccount: e.target.value })}
                    disabled={!isEditingProfessional}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    value={professionalDetails.ifscCode}
                    onChange={(e) => setProfessionalDetails({ ...professionalDetails, ifscCode: e.target.value })}
                    disabled={!isEditingProfessional}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Period */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-base">Service Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Date of Joining</p>
                  <p className="font-medium">June 1, 2018</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Years of Service</p>
                  <p className="font-medium">7 years 4 months</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Vault Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Documents Vault</CardTitle>
                  <CardDescription>Manage all your important documents in one place</CardDescription>
                </div>
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="btn-gradient-primary">
                      <FilePlus className="size-4 mr-2" />
                      Upload Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload New Document</DialogTitle>
                      <DialogDescription>
                        Upload a new document to your vault
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="docCategory">Document Category</Label>
                        <Select>
                          <SelectTrigger id="docCategory">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="identity">Identity Proof</SelectItem>
                            <SelectItem value="educational">Educational</SelectItem>
                            <SelectItem value="employment">Employment</SelectItem>
                            <SelectItem value="financial">Financial</SelectItem>
                            <SelectItem value="medical">Medical</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="docFile">Choose File</Label>
                        <Input id="docFile" type="file" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="docDescription">Description (Optional)</Label>
                        <Textarea
                          id="docDescription"
                          placeholder="Add a brief description..."
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleUploadDocument} className="btn-gradient-primary">
                        <Upload className="size-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {/* Document Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Documents</p>
                        <p className="text-orange-600 font-semibold">{documents.length}</p>
                      </div>
                      <FolderOpen className="size-8 text-primary/30" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Verified</p>
                        <p className="text-orange-600 font-semibold">
                          {documents.filter((d) => d.status === "Verified").length}
                        </p>
                      </div>
                      <FileText className="size-8 text-green-500/30" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Pending</p>
                        <p className="text-orange-600 font-semibold">
                          {documents.filter((d) => d.status === "Pending Review").length}
                        </p>
                      </div>
                      <Clock className="size-8 text-yellow-500/30" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Size</p>
                        <p className="text-orange-600 font-semibold">9.7 MB</p>
                      </div>
                      <FolderOpen className="size-8 text-blue-500/30" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Documents List */}
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow bg-card"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="size-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{doc.name}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-sm text-muted-foreground">{doc.category}</p>
                          <p className="text-sm text-muted-foreground">•</p>
                          <p className="text-sm text-muted-foreground">{doc.size}</p>
                          <p className="text-sm text-muted-foreground">•</p>
                          <p className="text-sm text-muted-foreground">Uploaded on {doc.uploadedOn}</p>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(doc.status)} border`}>
                        {doc.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="size-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="size-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteDocumentClick(doc.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="size-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Holiday Calendar Tab */}
        <TabsContent value="holidays" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Holiday Calendar 2025</CardTitle>
                  <CardDescription>View all public holidays for the year</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="size-4 mr-2" />
                  Download Calendar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Holiday Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Holidays</p>
                        <p className="text-orange-600 font-semibold">{holidays.length}</p>
                      </div>
                      <CalendarDays className="size-8 text-primary/30" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-orange-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">National Holidays</p>
                        <p className="text-orange-600 font-semibold">
                          {holidays.filter((h) => h.type === "National Holiday").length}
                        </p>
                      </div>
                      <Award className="size-8 text-orange-500/30" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Festival Holidays</p>
                        <p className="text-orange-600 font-semibold">
                          {holidays.filter((h) => h.type === "Festival Holiday").length}
                        </p>
                      </div>
                      <Calendar className="size-8 text-blue-500/30" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Holidays List */}
              <div className="space-y-3">
                {holidays.map((holiday, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow bg-card"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="size-16 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
                        <CalendarDays className="size-6 text-primary mb-1" />
                        <p className="text-xs font-medium text-primary">
                          {holiday.date.split(" ")[1].replace(",", "")}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{holiday.occasion}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-sm text-muted-foreground">{holiday.date}</p>
                          <p className="text-sm text-muted-foreground">•</p>
                          <p className="text-sm text-muted-foreground">{holiday.day}</p>
                        </div>
                      </div>
                      <Badge className={`${getHolidayTypeColor(holiday.type)} border`}>
                        {holiday.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the document from your vault.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDocumentConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
