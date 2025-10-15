import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, UserCircle } from "lucide-react";
import { cn } from "../ui/utils";

interface Employee {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  businessUnit: string;
  employmentType: string;
  joiningDate: string;
  status: string;
  division?: string;
  l1Manager?: string;
  l2Manager?: string;
  cupManager?: string;
  dob?: string;
  dateOfLeaving?: string;
  prefix?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  modeOfEmployment?: string;
  previousExperience?: string;
  workTelephone?: string;
  fax?: string;
}

interface EmployeeDetailsViewProps {
  employee: Employee;
  onBack: () => void;
}

export function EmployeeDetailsView({ employee, onBack }: EmployeeDetailsViewProps) {
  const [activeTab, setActiveTab] = useState("official");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (id: number) => {
    const colors = [
      "from-blue-400 to-cyan-300",
      "from-purple-400 to-pink-300",
      "from-green-400 to-emerald-300",
      "from-orange-400 to-amber-300",
      "from-pink-400 to-rose-300",
    ];
    return colors[id % colors.length];
  };

  const renderOfficialTab = () => (
    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Employee Id</label>
        <p className="text-sm font-medium text-primary">{employee.employeeId}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">First Name</label>
        <p className="text-sm">{employee.firstName || employee.name.split(" ")[0]}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Prefix</label>
        <p className="text-sm">{employee.prefix || "Mr"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Last Name</label>
        <p className="text-sm">{employee.lastName || employee.name.split(" ").slice(1).join(" ")}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Role</label>
        <p className="text-sm">{employee.role || "Employee"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Mode of Employment</label>
        <p className="text-sm">{employee.modeOfEmployment || employee.employmentType}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Email</label>
        <p className="text-sm text-primary">{employee.email}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Department</label>
        <p className="text-sm">{employee.department}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Division</label>
        <p className="text-sm">{employee.division || "CORP-FIN-DIV"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Exit Type</label>
        <p className="text-sm">{employee.status === "Active" ? "-" : "Voluntary"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Business Unit</label>
        <p className="text-sm">{employee.businessUnit}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">L1 Manager</label>
        <p className="text-sm">{employee.l1Manager || "Rajesh Sharma"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">L2 Manager</label>
        <p className="text-sm">{employee.l2Manager || "Amit Verma"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Date of Joining</label>
        <p className="text-sm">{employee.joiningDate}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">CUP Manager</label>
        <p className="text-sm">{employee.cupManager || "Sunil Kapoor"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Extension</label>
        <p className="text-sm">-</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Designation</label>
        <p className="text-sm">{employee.designation}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">DOB skills</label>
        <p className="text-sm">{employee.dob || "Tax"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Employment Status</label>
        <p className="text-sm">{employee.employmentType}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Date of Leaving</label>
        <p className="text-sm">{employee.dateOfLeaving || "--"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Previous Experience(months)</label>
        <p className="text-sm">{employee.previousExperience || "--"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Work Telephone Number</label>
        <p className="text-sm">{employee.workTelephone || employee.phone}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Extension</label>
        <p className="text-sm">-</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Fax</label>
        <p className="text-sm">{employee.fax || "-"}</p>
      </div>
    </div>
  );

  const renderProfessionalTab = () => (
    <div className="text-center text-muted-foreground py-12">
      Professional information will be displayed here
    </div>
  );

  const renderContactTab = () => (
    <div className="text-center text-muted-foreground py-12">
      Contact information will be displayed here
    </div>
  );

  const renderSkillsTab = () => (
    <div className="text-center text-muted-foreground py-12">
      Skills information will be displayed here
    </div>
  );

  const renderTrainingTab = () => (
    <div className="text-center text-muted-foreground py-12">
      Training & Certification information will be displayed here
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button className="hover:text-primary transition-colors">Home</button>
        <span>/</span>
        <button className="hover:text-primary transition-colors">HR</button>
        <span>/</span>
        <button className="hover:text-primary transition-colors">Employees</button>
        <span>/</span>
        <span className="text-foreground">View</span>
      </div>

      {/* Back Button */}
      <Button variant="outline" onClick={onBack} className="gap-2" style={{ color: '#454545' }}>
        <ArrowLeft className="size-4" />
        Back to Employees
      </Button>

      {/* Employee Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <UserCircle className="size-12 text-primary" />
            </div>

            {/* Employee Info */}
            <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-3">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Employee Name</p>
                <p className="font-medium">: {employee.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Employee Id</p>
                <p className="font-medium text-primary">: {employee.employeeId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Email Id</p>
                <p className="font-medium text-primary">: {employee.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Contact Number</p>
                <p className="font-medium">: {employee.phone}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-[200px_1fr] gap-6">
        {/* Left Sidebar Navigation */}
        <div className="space-y-1">
          <button
            onClick={() => setActiveTab("official")}
            className={cn(
              "w-full text-left px-4 py-2.5 rounded-md transition-all text-sm",
              activeTab === "official"
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Official
          </button>
          <button
            onClick={() => setActiveTab("professional")}
            className={cn(
              "w-full text-left px-4 py-2.5 rounded-md transition-all text-sm",
              activeTab === "professional"
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Professional
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={cn(
              "w-full text-left px-4 py-2.5 rounded-md transition-all text-sm",
              activeTab === "contact"
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Contact
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={cn(
              "w-full text-left px-4 py-2.5 rounded-md transition-all text-sm",
              activeTab === "skills"
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab("training")}
            className={cn(
              "w-full text-left px-4 py-2.5 rounded-md transition-all text-sm",
              activeTab === "training"
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Training & Certification
          </button>
        </div>

        {/* Right Content Area */}
        <Card>
          <CardContent className="p-6">
            {activeTab === "official" && renderOfficialTab()}
            {activeTab === "professional" && renderProfessionalTab()}
            {activeTab === "contact" && renderContactTab()}
            {activeTab === "skills" && renderSkillsTab()}
            {activeTab === "training" && renderTrainingTab()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
