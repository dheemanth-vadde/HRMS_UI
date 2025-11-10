import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, Upload, UserCircle } from "lucide-react";
import { cn } from "../ui/utils";
import api from "../../services/interceptors";
import EMPLOYEE_ENDPOINTS from "../../services/employeeEndpoints";
import DEPARTMENT_ENDPOINTS from "../../services/departmentEndpoints";
import DESIGNATION_ENDPOINTS from "../../services/designationEndpoints";
import ROLES_ENDPOINTS from "../../services/rolesEndpoints";
import BUSSINESSUNIT_ENDPOINTS from "../../services/businessUnitEndpoints";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface Employee {
  id: number;
  employeeId: string;
  fullName: string;
  emailAddress: string;
  contactNumber: string;
  designationId: string;
  deptId: string;
  businessUnit: string;
  userStatus: string;
  selectedDate: string;
  status: string;
  division?: string;
  l1Manager?: string;
  l2Manager?: string;
  coeManager?: string;
  dob?: string;
  dateOfLeaving?: string;
  prefix?: string;
  firstName?: string;
  lastName?: string;
  empRole?: string;
  modeOfEmployment?: string;
  previousExperience?: string;
  workTelephone?: string;
  fax?: string;
  unitId: string;
}

// interface EmployeeDetailsViewProps {
//   employee: Employee;
//   onBack: () => void;
// }

export function ProfileModule() {
  const [employeeDetails, setEmployeeDetails] = useState<Employee | null>();
  const [activeTab, setActiveTab] = useState("official");
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [designations, setDesignations] = useState<{ id: string; name: string }[]>([]);
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const [businessUnits, setBusinessUnits] = useState<{ id: string; name: string }[]>([]);
  const employee = useSelector((state: any) => state.auth);
  const [hovered, setHovered] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


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

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        setLoading(true);
        console.log("Fetching details for employee ID:", employee);
        const response = await api.get(EMPLOYEE_ENDPOINTS.GET_EMPLOYEE_BY_ID(employee.userId));
        setEmployeeDetails(response.data.data); // ensure backend returns employee object
        setProfilePicUrl(response.data.data?.profileImg || null);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
        toast.error("Failed to load employee details.");
      } finally {
        setLoading(false);
      }
    };

    if (employee && employee.userId) {
      fetchEmployeeDetails();
    }
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get(DEPARTMENT_ENDPOINTS.GET_DEPARTMENTS);
        const deptData = response?.data?.data || [];
        // map to { id, name } for Select usage
        const mappedDepartments = deptData.map((d: any) => ({ id: d.id, name: d.deptName }));
        setDepartments(mappedDepartments);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setDepartments([]); // fallback empty
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await api.get(DESIGNATION_ENDPOINTS.GET_DESIGNATIONS);
        const designationData = response?.data?.data || [];
        // map to { id, name } for Select usage
        const mappedDesignations = designationData.map((d: any) => ({ id: d.id, name: d.designationName }));
        setDesignations(mappedDesignations);
      } catch (err) {
        console.error("Error fetching designations:", err);
        setDesignations([]); // fallback empty
      }
    };
    fetchDesignations();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get(ROLES_ENDPOINTS.GET_ROLES);
        const rolesData = response?.data?.data || [];
        // map to { id, name } for Select usage
        const mappedRoles = rolesData.map((d: any) => ({ id: d.id, name: d.roleName }));
        setRoles(mappedRoles);
      } catch (err) {
        console.error("Error fetching roles:", err);
        setRoles([]); // fallback empty
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchBusinessUnits = async () => {
      try {
        const response = await api.get(BUSSINESSUNIT_ENDPOINTS.GET_BUSSINESSUNIT);
        const buData = response?.data?.data || [];
        // map to { id, name } for Select usage
        const mappedBusinessUnits = buData.map((d: any) => ({ id: d.id, name: d.unitName }));
        setBusinessUnits(mappedBusinessUnits);
      } catch (err) {
        console.error("Error fetching business units:", err);
        setBusinessUnits([]); // fallback empty
      }
    };
    fetchBusinessUnits();
  }, []);

  const getDepartmentName = (deptId: any) => {
    if (!deptId) return "-";
    const dept = departments.find((d) => d.id === deptId);
    return dept?.name || "-";
  };

  const getDesignationName = (designationId: any) => {
    if (!designationId) return "-";
    const designation = designations.find((d) => d.id === designationId);
    return designation?.name || "-";
  };

  const getRolesName = (roleId: any) => {
    if (!roleId) return "-";
    const role = roles.find((d) => d.id === roleId);
    return role?.name || "-";
  };

  const getBuinessUnitName = (unitId: any) => {
    if (!unitId) return "-";
    const bu = businessUnits.find((b) => b.id === unitId);
    return bu?.name || "-";
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    toast.error("Please select a valid image file.");
    return;
  }

  const formData = new FormData();
    formData.append("profilePic", file);
    // formData.append("employeeId", employee.userId);

    try {
      toast.info("Uploading profile picture...");
      const response = await api.post(
        EMPLOYEE_ENDPOINTS.PROFILE_PICTURE_UPLOAD(employee.userId),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log("Upload response:", response);
      setProfilePicUrl(response.data.data);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading image.");
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Loading employee details...
      </div>
    );
  }

  if (!employeeDetails) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No employee details found.
      </div>
    );
  }
  console.log("Rendering details for employee:", employeeDetails);

  const renderOfficialTab = () => (
    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
      {/* <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Employee Id</label>
        <p className="text-sm font-medium text-primary">{employeeDetails.employeeId}</p>
      </div> */}
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">First Name</label>
        <p className="text-sm">{employeeDetails.firstName || employeeDetails.fullName.split(" ")[0]}</p>
      </div>
      {/* <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Prefix</label>
        <p className="text-sm">{employee.prefix || "Mr"}</p>
      </div> */}
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Last Name</label>
        <p className="text-sm">{employeeDetails.lastName || employeeDetails.fullName.split(" ").slice(1).join(" ")}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Role</label>
        <p className="text-sm">{getRolesName(employeeDetails.empRole) || "-"}</p>
      </div>
      {/* <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Mode of Employment</label>
        <p className="text-sm">{employee.modeOfEmployment || employee.employmentType}</p>
      </div> */}
      {/* <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Email</label>
        <p className="text-sm text-primary">{employeeDetails.emailAddress || '-'}</p>
      </div> */}
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Department</label>
        <p className="text-sm">{getDepartmentName(employeeDetails.deptId) || '-'}</p>
      </div>
      {/* <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Division</label>
        <p className="text-sm">{employee.division || "CORP-FIN-DIV"}</p>
      </div> */}
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Exit Type</label>
        <p className="text-sm">{employeeDetails.userStatus === "Active" ? "-" : "Voluntary"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Business Unit</label>
        <p className="text-sm">{getBuinessUnitName(employeeDetails.unitId) || '-'}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">L1 Manager</label>
        <p className="text-sm">{employeeDetails.l1Manager || "-"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">L2 Manager</label>
        <p className="text-sm">{employeeDetails.l2Manager || "-"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Date of Joining</label>
        <p className="text-sm">{employeeDetails.selectedDate}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">COE Manager</label>
        <p className="text-sm">{employeeDetails.coeManager || "-"}</p>
      </div>
      {/* <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Extension</label>
        <p className="text-sm">-</p>
      </div> */}
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Designation</label>
        <p className="text-sm">{getDesignationName(employeeDetails.designationId) || '-'}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Date of Birth</label>
        <p className="text-sm">{employeeDetails.dob || "-"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Employment Status</label>
        <p className="text-sm">{employeeDetails.userStatus || '-'}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Date of Leaving</label>
        <p className="text-sm">{employeeDetails.dateOfLeaving || "--"}</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Previous Experience (months)</label>
        <p className="text-sm">{employeeDetails.previousExperience || "--"}</p>
      </div>
      {/* <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Work Telephone Number</label>
        <p className="text-sm">{employeeDetails.workTelephone || employeeDetails.contactNumber || '-'}</p>
      </div> */}
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Extension</label>
        <p className="text-sm">-</p>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Fax</label>
        <p className="text-sm">{employeeDetails.fax || "-"}</p>
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
      <div>
        <h1>My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal and professional information
        </p>
      </div>
      {/* Employee Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div
              className="relative size-24 rounded-full overflow-hidden group cursor-pointer"
              onClick={handleAvatarClick}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {profilePicUrl ? (
                <img src={profilePicUrl} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <div className="bg-primary/10 flex items-center justify-center h-full">
                  <UserCircle className="size-12 text-primary" />
                </div>
              )}

              {hovered && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-xs font-medium transition-all">
                  <Upload className="size-4 mb-1" />
                  Click to Upload
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Employee Info */}
            <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-3">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Employee Name</p>
                <p className="font-medium">{employeeDetails.fullName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Employee Id</p>
                <p className="font-medium text-primary">{employeeDetails.employeeId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Email Id</p>
                <p className="font-medium text-primary">{employeeDetails.emailAddress}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Contact Number</p>
                <p className="font-medium">{employeeDetails.contactNumber}</p>
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
