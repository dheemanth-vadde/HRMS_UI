import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import {
  User,
  FileText,
  Upload,
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Home,
  Phone,
  Mail,
  Calendar,
  Award,
  CreditCard,
  Shield,
  PartyPopper,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { cn } from "../ui/utils";

const steps = [
  { id: 1, title: "Welcome", icon: PartyPopper, description: "Get started with PNB" },
  { id: 2, title: "Personal Info", icon: User, description: "Basic details" },
  { id: 3, title: "Contact", icon: Phone, description: "Address & contacts" },
  { id: 4, title: "Documents", icon: FileText, description: "ID & certificates" },
  { id: 5, title: "Banking", icon: CreditCard, description: "Salary account" },
  { id: 6, title: "Emergency", icon: Shield, description: "Emergency contacts" },
  { id: 7, title: "Policies", icon: Award, description: "Acknowledgments" },
  { id: 8, title: "Complete", icon: CheckCircle2, description: "All done!" },
];

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    bloodGroup: "",
    nationality: "Indian",
    // Contact Info
    permanentAddress: "",
    currentAddress: "",
    city: "",
    state: "",
    pincode: "",
    personalEmail: "",
    personalPhone: "",
    alternatePhone: "",
    // Documents
    aadharNumber: "",
    panNumber: "",
    passportNumber: "",
    // Banking
    bankName: "Punjab National Bank",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
    // Emergency Contact
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
    emergencyAddress: "",
    // Policies
    codeOfConductAccepted: false,
    privacyPolicyAccepted: false,
    itPolicyAccepted: false,
    compensationDetailsAcknowledged: false,
  });

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleComplete = () => {
    if (validateCurrentStep()) {
      toast.success("Onboarding completed successfully! Welcome to PNB!");
      // In a real app, this would submit the data to the backend
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 2: // Personal Info
        if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.gender) {
          toast.error("Please fill all required fields");
          return false;
        }
        break;
      case 3: // Contact Info
        if (!formData.permanentAddress || !formData.city || !formData.state || !formData.pincode || !formData.personalEmail || !formData.personalPhone) {
          toast.error("Please fill all required fields");
          return false;
        }
        break;
      case 4: // Documents
        if (!formData.aadharNumber || !formData.panNumber) {
          toast.error("Please fill all required document details");
          return false;
        }
        break;
      case 5: // Banking
        if (!formData.accountNumber || !formData.ifscCode || !formData.branchName) {
          toast.error("Please fill all banking details");
          return false;
        }
        break;
      case 6: // Emergency
        if (!formData.emergencyName || !formData.emergencyRelation || !formData.emergencyPhone) {
          toast.error("Please fill all emergency contact details");
          return false;
        }
        break;
      case 7: // Policies
        if (!formData.codeOfConductAccepted || !formData.privacyPolicyAccepted || !formData.itPolicyAccepted || !formData.compensationDetailsAcknowledged) {
          toast.error("Please accept all policies and acknowledgments");
          return false;
        }
        break;
    }
    return true;
  };

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 text-center py-8">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(162,10,58,1)] to-[rgba(253,189,48,1)] rounded-full blur-xl opacity-30 animate-pulse"></div>
                <PartyPopper className="size-24 text-primary relative z-10" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl">Welcome to Punjab National Bank!</h2>
              <p className="text-xl text-muted-foreground">We're excited to have you join our team</p>
            </div>
            <Card className="max-w-2xl mx-auto border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Complete Your Profile</p>
                      <p className="text-sm text-muted-foreground">Provide your personal and contact information</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Upload Documents</p>
                      <p className="text-sm text-muted-foreground">Submit required identification and certificates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Banking Details</p>
                      <p className="text-sm text-muted-foreground">Setup your salary account for seamless payments</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Review Policies</p>
                      <p className="text-sm text-muted-foreground">Read and acknowledge company policies</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground">This process takes about 10-15 minutes to complete</p>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl mb-2">Personal Information</h2>
              <p className="text-muted-foreground">Please provide your basic details</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name *</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label>Middle Name</Label>
                <Input
                  value={formData.middleName}
                  onChange={(e) => updateFormData("middleName", e.target.value)}
                  placeholder="Enter middle name"
                />
              </div>
              <div className="space-y-2">
                <Label>Last Name *</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth *</Label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Marital Status</Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => updateFormData("maritalStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
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
                <Label>Blood Group</Label>
                <Select value={formData.bloodGroup} onValueChange={(value) => updateFormData("bloodGroup", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Nationality</Label>
                <Input
                  value={formData.nationality}
                  onChange={(e) => updateFormData("nationality", e.target.value)}
                  placeholder="Enter nationality"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl mb-2">Contact Information</h2>
              <p className="text-muted-foreground">Your address and contact details</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Permanent Address *</Label>
                <Textarea
                  value={formData.permanentAddress}
                  onChange={(e) => updateFormData("permanentAddress", e.target.value)}
                  placeholder="Enter permanent address"
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="sameAddress"
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFormData("currentAddress", formData.permanentAddress);
                    }
                  }}
                />
                <Label htmlFor="sameAddress" className="cursor-pointer">
                  Current address same as permanent address
                </Label>
              </div>
              <div className="space-y-2">
                <Label>Current Address *</Label>
                <Textarea
                  value={formData.currentAddress}
                  onChange={(e) => updateFormData("currentAddress", e.target.value)}
                  placeholder="Enter current address"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>City *</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    placeholder="Enter city"
                  />
                </div>
                <div className="space-y-2">
                  <Label>State *</Label>
                  <Input
                    value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)}
                    placeholder="Enter state"
                  />
                </div>
                <div className="space-y-2">
                  <Label>PIN Code *</Label>
                  <Input
                    value={formData.pincode}
                    onChange={(e) => updateFormData("pincode", e.target.value)}
                    placeholder="Enter PIN code"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Personal Email *</Label>
                  <Input
                    type="email"
                    value={formData.personalEmail}
                    onChange={(e) => updateFormData("personalEmail", e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Personal Phone *</Label>
                  <Input
                    type="tel"
                    value={formData.personalPhone}
                    onChange={(e) => updateFormData("personalPhone", e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Alternate Phone</Label>
                  <Input
                    type="tel"
                    value={formData.alternatePhone}
                    onChange={(e) => updateFormData("alternatePhone", e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl mb-2">Document Upload</h2>
              <p className="text-muted-foreground">Provide your identification details</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Aadhar Number *</Label>
                <Input
                  value={formData.aadharNumber}
                  onChange={(e) => updateFormData("aadharNumber", e.target.value)}
                  placeholder="1234 5678 9012"
                  maxLength={12}
                />
              </div>
              <div className="space-y-2">
                <Label>PAN Number *</Label>
                <Input
                  value={formData.panNumber}
                  onChange={(e) => updateFormData("panNumber", e.target.value)}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </div>
              <div className="space-y-2">
                <Label>Passport Number (if applicable)</Label>
                <Input
                  value={formData.passportNumber}
                  onChange={(e) => updateFormData("passportNumber", e.target.value)}
                  placeholder="A1234567"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="size-12 mx-auto mb-3 text-muted-foreground" />
                <p className="font-medium mb-1">Upload Aadhar Card</p>
                <p className="text-sm text-muted-foreground">PDF, JPG, or PNG (Max 5MB)</p>
                <Button variant="outline" className="mt-3">
                  <Upload className="size-4 mr-2" />
                  Choose File
                </Button>
              </div>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="size-12 mx-auto mb-3 text-muted-foreground" />
                <p className="font-medium mb-1">Upload PAN Card</p>
                <p className="text-sm text-muted-foreground">PDF, JPG, or PNG (Max 5MB)</p>
                <Button variant="outline" className="mt-3">
                  <Upload className="size-4 mr-2" />
                  Choose File
                </Button>
              </div>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="size-12 mx-auto mb-3 text-muted-foreground" />
                <p className="font-medium mb-1">Upload Educational Certificates</p>
                <p className="text-sm text-muted-foreground">PDF, JPG, or PNG (Max 10MB)</p>
                <Button variant="outline" className="mt-3">
                  <Upload className="size-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl mb-2">Banking Information</h2>
              <p className="text-muted-foreground">Setup your salary account details</p>
            </div>
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="size-8 text-primary" />
                  <div>
                    <p className="font-semibold">Preferred Bank: Punjab National Bank</p>
                    <p className="text-sm text-muted-foreground">Your salary will be credited to PNB account</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label>Bank Name</Label>
                <Input
                  value={formData.bankName}
                  onChange={(e) => updateFormData("bankName", e.target.value)}
                  placeholder="Punjab National Bank"
                />
              </div>
              <div className="space-y-2">
                <Label>Account Number *</Label>
                <Input
                  value={formData.accountNumber}
                  onChange={(e) => updateFormData("accountNumber", e.target.value)}
                  placeholder="Enter account number"
                />
              </div>
              <div className="space-y-2">
                <Label>Confirm Account Number *</Label>
                <Input
                  placeholder="Re-enter account number"
                />
              </div>
              <div className="space-y-2">
                <Label>IFSC Code *</Label>
                <Input
                  value={formData.ifscCode}
                  onChange={(e) => updateFormData("ifscCode", e.target.value)}
                  placeholder="PUNB0123456"
                />
              </div>
              <div className="space-y-2">
                <Label>Branch Name *</Label>
                <Input
                  value={formData.branchName}
                  onChange={(e) => updateFormData("branchName", e.target.value)}
                  placeholder="Enter branch name"
                />
              </div>
            </div>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="size-12 mx-auto mb-3 text-muted-foreground" />
              <p className="font-medium mb-1">Upload Cancelled Cheque or Bank Statement</p>
              <p className="text-sm text-muted-foreground">PDF, JPG, or PNG (Max 5MB)</p>
              <Button variant="outline" className="mt-3">
                <Upload className="size-4 mr-2" />
                Choose File
              </Button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl mb-2">Emergency Contact</h2>
              <p className="text-muted-foreground">Person to contact in case of emergency</p>
            </div>
            <Card className="border-2 border-orange-200 bg-orange-50/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="size-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-orange-900 mb-1">Important Information</p>
                    <p className="text-orange-700">
                      This person will be contacted in case of any emergency. Please ensure the contact details are accurate and up-to-date.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Contact Name *</Label>
                <Input
                  value={formData.emergencyName}
                  onChange={(e) => updateFormData("emergencyName", e.target.value)}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label>Relationship *</Label>
                <Select value={formData.emergencyRelation} onValueChange={(value) => updateFormData("emergencyRelation", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Sibling">Sibling</SelectItem>
                    <SelectItem value="Child">Child</SelectItem>
                    <SelectItem value="Friend">Friend</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Phone Number *</Label>
                <Input
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => updateFormData("emergencyPhone", e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="space-y-2">
                <Label>Alternate Phone</Label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Address</Label>
                <Textarea
                  value={formData.emergencyAddress}
                  onChange={(e) => updateFormData("emergencyAddress", e.target.value)}
                  placeholder="Enter emergency contact address"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl mb-2">Policies & Acknowledgments</h2>
              <p className="text-muted-foreground">Please review and accept the following</p>
            </div>
            <div className="space-y-4">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Code of Conduct</CardTitle>
                  <CardDescription>Employee behavior and ethics guidelines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-lg mb-4 max-h-40 overflow-y-auto text-sm">
                    <p className="mb-2">
                      As an employee of Punjab National Bank, you are expected to:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Maintain highest standards of integrity and professional conduct</li>
                      <li>Comply with all applicable laws, regulations, and bank policies</li>
                      <li>Protect confidential information and customer data</li>
                      <li>Avoid conflicts of interest in all business dealings</li>
                      <li>Treat colleagues and customers with respect and dignity</li>
                    </ul>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="codeOfConduct"
                      checked={formData.codeOfConductAccepted}
                      onCheckedChange={(checked) => updateFormData("codeOfConductAccepted", checked)}
                    />
                    <Label htmlFor="codeOfConduct" className="cursor-pointer">
                      I have read and agree to abide by the Code of Conduct *
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Privacy Policy</CardTitle>
                  <CardDescription>Data protection and privacy guidelines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-lg mb-4 max-h-40 overflow-y-auto text-sm">
                    <p className="mb-2 text-muted-foreground">
                      Your personal information will be processed in accordance with applicable data protection laws.
                      We collect and use your data for employment purposes, payroll processing, and statutory compliance.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacyPolicy"
                      checked={formData.privacyPolicyAccepted}
                      onCheckedChange={(checked) => updateFormData("privacyPolicyAccepted", checked)}
                    />
                    <Label htmlFor="privacyPolicy" className="cursor-pointer">
                      I consent to the collection and processing of my personal data *
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">IT & Security Policy</CardTitle>
                  <CardDescription>Information technology usage guidelines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-lg mb-4 max-h-40 overflow-y-auto text-sm">
                    <p className="mb-2 text-muted-foreground">
                      You agree to use bank's IT resources responsibly and in compliance with security policies,
                      including password protection, data encryption, and acceptable use guidelines.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="itPolicy"
                      checked={formData.itPolicyAccepted}
                      onCheckedChange={(checked) => updateFormData("itPolicyAccepted", checked)}
                    />
                    <Label htmlFor="itPolicy" className="cursor-pointer">
                      I agree to comply with IT and Security policies *
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Compensation Details</CardTitle>
                  <CardDescription>Salary and benefits acknowledgment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-lg mb-4 text-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-muted-foreground text-xs">Designation</p>
                        <p className="font-medium">Officer</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Department</p>
                        <p className="font-medium">Retail Banking</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Gross Salary (Annual)</p>
                        <p className="font-medium">₹6,00,000</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Joining Date</p>
                        <p className="font-medium">November 1, 2025</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="compensationAck"
                      checked={formData.compensationDetailsAcknowledged}
                      onCheckedChange={(checked) => updateFormData("compensationDetailsAcknowledged", checked)}
                    />
                    <Label htmlFor="compensationAck" className="cursor-pointer">
                      I acknowledge the compensation details and terms of employment *
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6 text-center py-8">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative z-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full p-6">
                  <CheckCircle2 className="size-24 text-white" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl">Onboarding Complete!</h2>
              <p className="text-xl text-muted-foreground">Welcome to the PNB family</p>
            </div>
            <Card className="max-w-2xl mx-auto border-2 border-green-200 bg-green-50/50">
              <CardContent className="pt-6">
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Profile Completed</p>
                      <p className="text-sm text-muted-foreground">Your personal information has been saved</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Documents Uploaded</p>
                      <p className="text-sm text-muted-foreground">All required documents have been submitted</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Banking Setup</p>
                      <p className="text-sm text-muted-foreground">Salary account details configured</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Policies Acknowledged</p>
                      <p className="text-sm text-muted-foreground">All policies have been accepted</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold mb-2 text-blue-900">What's Next?</h3>
              <ul className="text-sm text-left space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">→</span>
                  <span>HR team will review your documents within 2-3 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">→</span>
                  <span>You will receive your employee ID card and login credentials via email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">→</span>
                  <span>Attend the orientation session on your joining date</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">→</span>
                  <span>Check your email for further instructions and welcome materials</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              For any queries, contact HR at hr@pnb.co.in or call +91 11 4174 1000
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background py-8">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Badge className="bg-gradient-to-r from-[rgba(162,10,58,1)] to-[rgba(253,189,48,1)] text-white border-0 px-4 py-1.5">
              Employee Onboarding
            </Badge>
          </div>
          <h1 className="text-3xl mb-2">Join Punjab National Bank</h1>
          <p className="text-muted-foreground">Complete your onboarding in {steps.length} simple steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "relative z-10 flex items-center justify-center size-12 rounded-full border-2 transition-all duration-300",
                        isActive && "bg-gradient-to-br from-[rgba(162,10,58,1)] to-[rgba(253,189,48,1)] border-transparent text-white shadow-lg scale-110",
                        isCompleted && "bg-green-600 border-green-600 text-white",
                        !isActive && !isCompleted && "bg-background border-border text-muted-foreground"
                      )}
                    >
                      {isCompleted ? <CheckCircle2 className="size-5" /> : <Icon className="size-5" />}
                    </div>
                    <p className={cn(
                      "text-xs mt-2 text-center transition-all duration-300",
                      isActive && "font-semibold text-primary",
                      !isActive && "text-muted-foreground"
                    )}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "absolute top-6 left-1/2 w-full h-0.5 transition-all duration-300",
                        isCompleted ? "bg-green-600" : "bg-border"
                      )}
                      style={{ zIndex: 0 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Content Card */}
        <Card className="border-2 shadow-xl">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Previous
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </div>

          {currentStep < steps.length ? (
            <Button onClick={handleNext} className="btn-gradient-primary gap-2">
              Next
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="btn-gradient-primary gap-2">
              <CheckCircle2 className="size-4" />
              Complete Onboarding
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
