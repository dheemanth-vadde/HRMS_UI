// JobGrade.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faSearch,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import "../css/JobGrade.css";
import axios from "axios";
import { toast } from "sonner";
import apiService from "../services/apiService";
import { Edit, Eye, Trash2 } from "lucide-react";
import { usePermissions } from "../../../utils/permissionUtils";


const JobGrade = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentGrade, setCurrentGrade] = useState({
    job_grade_code: "",
    job_grade_desc: "",
    job_scale: "",
    min_salary: "",
    max_salary: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  const [grads, setGrads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errr, setErrr] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const { hasPermission } = usePermissions();

  useEffect(() => {
    fetchGrade();
  }, []);

  const fetchGrade = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getallJobGrade();
      setGrads(res.data.data || res.data); // adjust if API returns differently
    } catch (err) {
      setError("Failed to fetch Grade.");
      console.error("GET Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (req = { job_grade_code: "", job_grade_desc: "", job_scale: "", min_salary: "", max_salary: "" }, index = null) => {
    setCurrentGrade(req);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleSave = () => {
    const newErrors = {};

    const trimmedCode = currentGrade.job_grade_code?.trim();
    const trimmedDesc = currentGrade.job_grade_desc?.trim();
    const trimmedScale = currentGrade.job_scale?.trim();
    const minSalary = String(currentGrade.min_salary)?.trim();
    const maxSalary = String(currentGrade.max_salary)?.trim();

    // ---------------------------
    // Required validations
    // ---------------------------
    if (!trimmedScale) newErrors.job_scale = "Scale is required";
    if (!minSalary) newErrors.min_salary = "Minimum salary is required";
    if (!maxSalary) newErrors.max_salary = "Maximum salary is required";
    // Description is now optional, so no required check

    // Numeric validation
    if (minSalary && isNaN(Number(minSalary))) {
      newErrors.min_salary = "Minimum salary must be a number";
    }
    if (maxSalary && isNaN(Number(maxSalary))) {
      newErrors.max_salary = "Maximum salary must be a number";
    }

    // Min ≤ Max validation
    if (
      minSalary &&
      maxSalary &&
      !isNaN(Number(minSalary)) &&
      !isNaN(Number(maxSalary)) &&
      Number(minSalary) > Number(maxSalary)
    ) {
      newErrors.min_salary = "Minimum salary cannot be greater than maximum salary";
      newErrors.max_salary = "Maximum salary cannot be less than minimum salary";
    }

    // ---------------------------
    // Duplicate check (only if field has value)
    // ---------------------------
    if (trimmedScale) {
      const duplicateScale = grads.some(
        (grad, index) =>
          grad.job_scale?.trim().toLowerCase() === trimmedScale.toLowerCase() &&
          index !== editIndex
      );
      if (duplicateScale) newErrors.job_scale = "Job scale already exists";
    }

    if (trimmedDesc) {
      const duplicateDesc = grads.some(
        (grad, index) =>
          grad.job_grade_desc?.trim().toLowerCase() === trimmedDesc.toLowerCase() &&
          index !== editIndex
      );
      if (duplicateDesc) newErrors.job_grade_desc = "Job description already exists";
    }

    if (trimmedCode) {
      const duplicateCode = grads.some(
        (grad, index) =>
          grad.job_grade_code?.trim().toLowerCase() === trimmedCode.toLowerCase() &&
          index !== editIndex
      );
      if (duplicateCode) newErrors.job_grade_code = "Job grade code already exists";
    }

    // ---------------------------
    setErrr(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleSaveCallback();
    }
  };




  const handleSaveCallback = async () => {
    try {
      if (editIndex !== null) {
        const updatedGrad = {
          ...currentGrade,
          job_grade_id: grads[editIndex].job_grade_id,
        };

        await apiService.updateJobGrade(updatedGrad.job_grade_id, updatedGrad);


        toast.success("Grade updated successfully");

        const updatedGrads = [...grads];
        updatedGrads[editIndex] = updatedGrad;
        setGrads(updatedGrads);
      } else {
        // console.log("Adding new Grade:", currentGrade);
        const response = await apiService.addJobGrade(currentGrade);
        const newGrad = response.data?.data || currentGrade;

        toast.success("Grade added successfully");
        setGrads(prev => [...prev, newGrad]);
        await fetchGrade();
      }
      resetForm();
    } catch (err) {
      console.error("Save Error:", err);
      toast.error("Save failed");
    }
  };

  const handleDelete = async (index) => {
    const idToDelete = grads[index]?.job_grade_id;

    try {
      await apiService.deleteJobGrade(idToDelete);
      setGrads(grads.filter((grad) => grad.job_grade_id !== idToDelete));
      toast.success("Grade deleted successfully");
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Delete failed");
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setCurrentGrade({ job_grade_code: "", job_grade_desc: "", job_scale: "", min_salary: "", max_salary: "" });
    setEditIndex(null);
    setErrr({});
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  const filteredAndSortedJobs = () => {
    let filteredItems = [...grads];

    if (searchTerm.trim()) {
      const lowerTerm = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(
        (grad) =>
          grad.job_grade_code?.toLowerCase().includes(lowerTerm) ||
          grad.job_grade_desc?.toLowerCase().includes(lowerTerm) ||
          grad.job_scale?.toLowerCase().includes(lowerTerm) ||
          String(grad.min_salary)?.toLowerCase().includes(lowerTerm) ||
          String(grad.max_salary)?.toLowerCase().includes(lowerTerm)
      );
    }

    if (sortConfig.key !== null) {
      filteredItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (aValue == null || bValue == null) return 0;
        if (sortConfig.key.includes("date")) {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        return sortConfig.direction === "asc"
          ? aValue > bValue ? 1 : -1
          : aValue < bValue ? 1 : -1;
      });
    }

    return filteredItems;
  };

  const jobsToDisplay = filteredAndSortedJobs();

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  // if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="space-y-6 py-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Job Grades</h1>
          <p className="text-muted-foreground mt-1">
            Manage organization job grades
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
              placeholder="Search by scale, description, or salary"
              className="w-full pl-9 h-9 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {hasPermission('/recruitment/master/job-grade', 'create') === true && (
            <button 
              onClick={() => openModal()} 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-add-purple shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3"
            >
              + Add Grade
            </button>
          )}
        </div>
      </div>

      <div className="border border-[#e5e7eb] rounded-md">
        <div className="rounded-md">
          <Table className="w-full caption-bottom text-sm">
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead 
                  className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1"
                  onClick={() => handleSort("job_scale")}
                >
                  Scale
                  <span className="ml-1">{getSortIndicator("job_scale")}</span>
                </TableHead>
                <TableHead 
                  className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1"
                  onClick={() => handleSort("min_salary")}
                >
                  Min Salary
                  <span className="ml-1">{getSortIndicator("min_salary")}</span>
                </TableHead>
                <TableHead 
                  className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1"
                  onClick={() => handleSort("max_salary")}
                >
                  Max Salary
                  <span className="ml-1">{getSortIndicator("max_salary")}</span>
                </TableHead>
                <TableHead 
                  className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1"
                  onClick={() => handleSort("job_grade_desc")}
                >
                  Description
                  <span className="ml-1">{getSortIndicator("job_grade_desc")}</span>
                </TableHead>
                <TableHead className="text-right  text-foreground h-10  pr-35 whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {jobsToDisplay.length > 0 ? (
                jobsToDisplay.map((job, index) => (
                  <TableRow key={job.job_grade_id || index} className="hover:bg-gray-50">
                    <TableCell className="px-2 whitespace-normal">
                      {job.job_scale || '-'}
                    </TableCell>
                    <TableCell className="px-2 whitespace-normal">
                      {job.min_salary ? `₹${parseFloat(job.min_salary).toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell className="px-2 whitespace-normal">
                      {job.max_salary ? `₹${parseFloat(job.max_salary).toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell className="px-2 whitespace-normal">
                      {job.job_grade_desc || '-'}
                    </TableCell>
                    <TableCell className="px-6 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {hasPermission('/recruitment/master/job-grade', 'edit') === true && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openModal(job, index)}
                          >
                            <Edit className="size-4 text-gray-500" />
                          </Button>
                        )}
                        {(hasPermission('/recruitment/master/job-grade', 'view') === true)
                          && (hasPermission('/recruitment/master/job-grade', 'edit') !== true) && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openModal(job, index)}
                          >
                            <Eye className="size-4 text-gray-500" />
                          </Button>
                        )}
                        {hasPermission('/recruitment/master/job-grade', 'delete') === true && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(index)}
                          >
                            <Trash2 className="size-4 text-gray-500" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No job grades found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={showModal} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[#746def]">
              {editIndex !== null ? "Edit Job Grade" : "Add Job Grade"}
            </DialogTitle>
            <DialogDescription>
              {editIndex !== null ? "Update the job grade details" : "Add a new job grade to the system"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="job_scale" className="text-sm font-medium">
                  Scale <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="job_scale"
                  type="text"
                  placeholder="Enter scale"
                  value={currentGrade.job_scale}
                  onChange={(e) => setCurrentGrade({ ...currentGrade, job_scale: e.target.value })}
                  className={errr.job_scale ? "border-red-500" : ""}
                />
                {errr.job_scale && (
                  <p className="mt-1 text-sm text-red-600">{errr.job_scale}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="job_grade_code" className="text-sm font-medium">
                  Grade Code
                </Label>
                <Input
                  id="job_grade_code"
                  type="text"
                  placeholder="Enter grade code"
                  value={currentGrade.job_grade_code}
                  onChange={(e) => setCurrentGrade({ ...currentGrade, job_grade_code: e.target.value })}
                  className={errr.job_grade_code ? "border-red-500" : ""}
                />
                {errr.job_grade_code && (
                  <p className="mt-1 text-sm text-red-600">{errr.job_grade_code}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="min_salary" className="text-sm font-medium">
                  Minimum Salary <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="min_salary"
                  type="number"
                  placeholder="Enter minimum salary"
                  value={currentGrade.min_salary}
                  onChange={(e) => setCurrentGrade({ ...currentGrade, min_salary: e.target.value })}
                  className={errr.min_salary ? "border-red-500" : ""}
                />
                {errr.min_salary && (
                  <p className="mt-1 text-sm text-red-600">{errr.min_salary}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="max_salary" className="text-sm font-medium">
                  Maximum Salary <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="max_salary"
                  type="number"
                  placeholder="Enter maximum salary"
                  value={currentGrade.max_salary}
                  onChange={(e) => setCurrentGrade({ ...currentGrade, max_salary: e.target.value })}
                  className={errr.max_salary ? "border-red-500" : ""}
                />
                {errr.max_salary && (
                  <p className="mt-1 text-sm text-red-600">{errr.max_salary}</p>
                )}
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="job_grade_desc" className="text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="job_grade_desc"
                  rows={3}
                  placeholder="Enter description"
                  value={currentGrade.job_grade_desc}
                  onChange={(e) => setCurrentGrade({ ...currentGrade, job_grade_desc: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errr.job_grade_desc ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errr.job_grade_desc && (
                  <p className="mt-1 text-sm text-red-600">{errr.job_grade_desc}</p>
                )}
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
              {editIndex === null && hasPermission('/recruitment/master/job-grade', 'create') && (
                <Button 
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-gradient-primary shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3"
                >
                  Save
                </Button>
              )}

              {/* Edit job-grade (edit mode) */}
              {editIndex !== null && hasPermission('/recruitment/master/job-grade', 'edit') && (
                <Button 
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-gradient-primary shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3"
                >
                  Update Job Grade
                </Button>
              )}
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobGrade;
