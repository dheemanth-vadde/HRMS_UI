// Position.jsx
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../services/apiService";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const Position = () => {
  const [showModal, setShowModal] = useState(false);
  const [positions, setPositions] = useState([]);
  const [jobGrades, setJobGrades] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPosition, setCurrentPosition] = useState({
  masterPositionId: null,
  positionName: "",
  positionDescription: "",
  jobGradeId: "",
  deptId: ""
});

  const [errr, setErrr] = useState({});
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState(null);

  // Fetch Positions + JobGrades
  const fetchData = async () => {
    setLoading(true);
    setDataError(null);
    try {
      const [posRes, gradeRes,deptRes] = await Promise.all([
        apiService.getAllPositions(),
        apiService.getallJobGrade(),
        apiService.getallDepartment()
      ]);
// console.log("Position Response:", deptRes);
      setPositions(posRes.data.data || posRes.data || []);
      setJobGrades(gradeRes.data.data || gradeRes.data || []);
      setDepartments(deptRes.data.data || deptRes.data || []);
    } catch (err) {
      console.error(err);
      setDataError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
// console.log("Position grades:", jobGrades);
  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (
    pos = { id: null, positionName: "", positionDescription: "", jobGradeId: "", deptId: "" },
    index = null
  ) => {
    setCurrentPosition(pos);
    setEditIndex(index);
    setShowModal(true);
  };

  const resetForm = () => {
    setShowModal(false);
    setCurrentPosition({
      masterPositionId: null,
      positionName: "",
      deptId: "",
      jobGradeId: "",
      positionDescription: "",
    });
    setEditIndex(null);
    setErrr({});
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!currentPosition.positionName?.trim()) newErrors.positionName = "Position name is required";
    if (!currentPosition.jobGradeId) newErrors.jobGradeId = "Job Grade is required";
    if (!currentPosition.deptId) newErrors.deptId = "Department is required";
    // Check duplicate name
     const isDuplicate = positions.some((pos, index) => {
  const existingName = (pos?.positionName || "").trim().toLowerCase();
  const currentName = (currentPosition?.positionName || "").trim().toLowerCase();

  return existingName === currentName && index !== editIndex;
});

if (isDuplicate) {
  newErrors.positionName = "Position name already exists";
}

    setErrr(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      if (editIndex !== null && currentPosition.masterPositionId) {
  await apiService.updatePosition(currentPosition.masterPositionId, currentPosition);
  toast.success("Position updated successfully");
}
else {
  // console.log("Adding Position:", currentPosition);
        await apiService.addPosition(currentPosition);
        toast.success("Position added successfully");
      }
      fetchData();
      resetForm();
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save position");
    }
  };

 const handleDelete = async (index) => {
  const idToDelete = positions[index]?.masterPositionId;

  if (!idToDelete) {
    toast.error("Delete failed: No identifier found");
    return;
  }

  try {
    await apiService.deletePosition(idToDelete);
    setPositions(positions.filter((_, i) => i !== index));
    toast.success("Position deleted Sucessfully");
  } catch (err) {
    console.error("Delete Error:", err);
    toast.error("Delete failed");
  }
};



  

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  // if (dataError) return <div className="alert alert-danger mt-5">{dataError}</div>;

  // Add filtered and sorted positions function
  const filteredAndSortedPositions = () => {
    let filteredItems = [...positions];

    if (searchTerm.trim()) {
      const lowerTerm = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(
        (pos) =>
          pos.positionName?.toLowerCase().includes(lowerTerm) ||
          pos.positionDescription?.toLowerCase().includes(lowerTerm) ||
          departments.find(d => d.department_id === pos.deptId)?.department_name.toLowerCase().includes(lowerTerm) ||
          jobGrades.find(g => g.job_grade_id === pos.jobGradeId)?.job_scale.toLowerCase().includes(lowerTerm)
      );
    }

    if (sortConfig.key !== null) {
      filteredItems.sort((a, b) => {
        let aValue, bValue;
        
        if (sortConfig.key === 'department') {
          aValue = departments.find(d => d.department_id === a.deptId)?.department_name || '';
          bValue = departments.find(d => d.department_id === b.deptId)?.department_name || '';
        } else if (sortConfig.key === 'jobGrade') {
          aValue = jobGrades.find(g => g.job_grade_id === a.jobGradeId)?.job_scale || '';
          bValue = jobGrades.find(g => g.job_grade_id === b.jobGradeId)?.job_scale || '';
        } else {
          aValue = a[sortConfig.key] || '';
          bValue = b[sortConfig.key] || '';
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredItems;
  };

  const positionsToDisplay = filteredAndSortedPositions();

  return (
    <div className="space-y-6  py-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Positions</h1>
          <p className="text-muted-foreground mt-1">
            Manage organization positions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search by position, department, or grade"
              className="w-full pl-9 h-9 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => openModal()} 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-add-purple shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3"
          >
            + Add Position
          </button>
        </div>
      </div>

      <div className="border border-[#e5e7eb] rounded-md">
        <div className="rounded-md">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th 
                  className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1"
                  onClick={() => handleSort("positionName")}
                >
                  Position
                  <span className="ml-1">{getSortIndicator("positionName")}</span>
                </th>
                <th 
                  className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1"
                  onClick={() => handleSort("department")}
                >
                  Department
                  <span className="ml-1">{getSortIndicator("department")}</span>
                </th>
                <th 
                  className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1"
                  onClick={() => handleSort("jobGrade")}
                >
                  Job Grade
                  <span className="ml-1">{getSortIndicator("jobGrade")}</span>
                </th>
                <th className="text-foreground h-10 px-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {positionsToDisplay.length > 0 ? (
                positionsToDisplay.map((pos, index) => (
                  <tr key={pos.masterPositionId || index} className="hover:bg-gray-50">
                    <td className="px-2 py-4 whitespace-normal">
                      {pos.positionName}
                    </td>
                    <td className="px-2 py-4 whitespace-normal">
                      {departments.find(d => d.department_id === pos.deptId)?.department_name || '-'}
                    </td>
                    <td className="px-2 py-4 whitespace-normal">
                      {jobGrades.find(g => g.job_grade_id === pos.jobGradeId)?.job_scale || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openModal(pos, index)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FontAwesomeIcon icon={faPencil} className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                    No positions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <Dialog open={showModal} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[#FF7043]">
              {editIndex !== null ? "Edit Position" : "Add Position"}
            </DialogTitle>
            <DialogDescription>
              {editIndex !== null ? "Update the position details" : "Add a new position to the system"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="positionName" className="text-sm font-medium">
                  Position Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="positionName"
                  type="text"
                  placeholder="Enter position title"
                  value={currentPosition.positionName}
                  onChange={(e) => setCurrentPosition({ ...currentPosition, positionName: e.target.value })}
                  className={errr.positionName ? "border-red-500" : ""}
                />
                {errr.positionName && (
                  <p className="mt-1 text-sm text-red-600">{errr.positionName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deptId" className="text-sm font-medium">
                  Department <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={currentPosition.deptId}
                  onValueChange={(value) => setCurrentPosition({ ...currentPosition, deptId: value })}
                >
                  <SelectTrigger className={errr.deptId ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.department_id} value={dept.department_id}>
                        {dept.department_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errr.deptId && (
                  <p className="mt-1 text-sm text-red-600">{errr.deptId}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobGradeId" className="text-sm font-medium">
                  Job Grade <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={currentPosition.jobGradeId}
                  onValueChange={(value) => setCurrentPosition({ ...currentPosition, jobGradeId: value })}
                >
                  <SelectTrigger className={errr.jobGradeId ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select Job Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobGrades.map((grade) => (
                      <SelectItem key={grade.job_grade_id} value={grade.job_grade_id}>
                        {grade.job_grade_code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errr.jobGradeId && (
                  <p className="mt-1 text-sm text-red-600">{errr.jobGradeId}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="positionDescription" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="positionDescription"
                  placeholder="Enter description"
                  value={currentPosition.positionDescription}
                  onChange={(e) => setCurrentPosition({ ...currentPosition, positionDescription: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={resetForm}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-gradient-primary shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3"
            >
              {editIndex !== null ? "Update Position" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Position;
