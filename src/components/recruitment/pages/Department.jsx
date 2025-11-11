// Jobdepartment.js
import React, { useState, useEffect } from "react";
import { Table, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'sonner';
//import 'react-toastify/dist/ReactToastify.css';
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


const Department = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentDept, setCurrentDept] = useState({
    deptName: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [depts, setDepts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errr, setErrr] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () => {
    setLoading(true);
    setError(null);
    try {
     const res = await apiService.getallDepartment();
      setDepts(res.data.data || res.data); // adjust if API returns differently
    } catch (err) {
      setError("Failed to fetch Department.");
      console.error("GET Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (req = { deptName: "", description: "" }, index = null) => {
    setCurrentDept(req);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleSave = () => {
    const newErrors = {};

    const trimmedName = currentDept.deptName?.trim();
    const trimmedDesc = currentDept.description?.trim();

    if (!trimmedName) {
      newErrors.deptName = "Name is required";
    }
   

    // Check if either name or description already exists
    const isDuplicate = depts.some((dept, index) =>
      (dept.deptName?.trim().toLowerCase() === trimmedName?.toLowerCase() ||
        dept.description?.trim().toLowerCase() === trimmedDesc?.toLowerCase()) &&
      index !== editIndex
    );

    if (isDuplicate) {
      newErrors.deptName = "Department name already exists";
      newErrors.description = "Department description already exists";
    }

    setErrr(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleSaveCallback();
    }
  };



  const handleSaveCallback = async () => {
    try {
      if (editIndex !== null) {
        const updatedDept = {
          ...currentDept,
          department_id: depts[editIndex].department_id,
        };
       await apiService.updateDepartment(updatedDept.department_id, updatedDept);

        toast.success("Department updated successfully");

        const updatedDepts = [...depts];
        updatedDepts[editIndex] = updatedDept;
        setDepts(updatedDepts);
      } else {
        // console.log("Adding new department:", currentDept);
        const response = await apiService.addDepartment(currentDept);
        const newDept = response.data?.data || currentDept;

        toast.success("Department added successfully");
        setDepts(prev => [...prev, newDept]);
        await fetchDepartment();
      }
      resetForm();
    } catch (err) {
      console.error("Save Error:", err);
      toast.error("Save failed");
    }
  };

  const handleDelete = async (index) => {
    const idToDelete = depts[index]?.department_id;

    try {
      await apiService.deleteDepartment(idToDelete);
      setDepts(depts.filter((dept) => dept.department_id !== idToDelete));
      toast.success("Department deleted Successfully");
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Delete failed");
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setCurrentDept({ deptName: "", description: "" });
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
    let filteredItems = [...depts];

    if (searchTerm.trim()) {
      const lowerTerm = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(
        (dept) =>
          dept.deptName?.toLowerCase().includes(lowerTerm) ||
          dept.description?.toLowerCase().includes(lowerTerm)
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
          <h1 className="text-lg font-semibold">Departments</h1>
          <p className="text-muted-foreground mt-1">
            Manage organization departments
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
              placeholder="Search by department or description"
              className="w-full pl-9 h-9 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => openModal()} 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-add-purple shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3"
          >
            + Add Department
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
                  onClick={() => handleSort("deptName")}
                >
                  Department
                  <span className="ml-1">{getSortIndicator("deptName")}</span>
                </th>
                <th 
                  className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1"
                  onClick={() => handleSort("description")}
                >
                  Description
                  <span className="ml-1">{getSortIndicator("description")}</span>
                </th>
                <th className="text-foreground h-10 px-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobsToDisplay.length > 0 ? (
                jobsToDisplay.map((job, index) => (
                  <tr key={job.department_id || index} className="hover:bg-gray-50">
                    <td className="px-2 py-4 whitespace-normal">
                      {job.deptName}
                    </td>
                    <td className="px-2 py-4 whitespace-normal">
                      {job.description || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openModal(job, index)}
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
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                    No departments found matching your criteria.
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
            <DialogTitle className="text-lg font-semibold text-[#746def]">
              {editIndex !== null ? "Edit Department" : "Add Department"}
            </DialogTitle>
            <DialogDescription>
              {editIndex !== null ? "Update the department details" : "Add a new department to the system"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="departmentName" className="text-sm font-medium">
                  Department Name <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="departmentName"
                  placeholder="Enter department name"
                  value={currentDept.deptName}
                  onChange={(e) => 
                    setCurrentDept({ ...currentDept, deptName: e.target.value })
                  }
                  className={errr.deptName ? "border-red-500 min-h-[100px]" : "min-h-[100px]"}
                />
                {errr.deptName && (
                  <p className="mt-1 text-sm text-red-600">{errr.deptName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="departmentDesc" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="departmentDesc"
                  placeholder="Enter description"
                  value={currentDept.description}
                  onChange={(e) => 
                    setCurrentDept({ ...currentDept, description: e.target.value })
                  }
                  className={errr.description ? "border-red-500 min-h-[100px]" : "min-h-[100px]"}
                />
                {errr.description && (
                  <p className="mt-1 text-sm text-red-600">{errr.description}</p>
                )}
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
              {editIndex !== null ? "Update Department" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Department;
