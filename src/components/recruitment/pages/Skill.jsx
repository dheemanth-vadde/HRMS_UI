// Skill.js
import React, { useState, useEffect } from "react";
import { Button } from '../../ui/button'
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
import "../css/Skill.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faSearch,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import { Label } from "../../ui/label";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { toast } from "sonner";
import apiService from "../services/apiService";
import { Edit, Eye, Trash2 } from "lucide-react";
import { usePermissions } from "../../../utils/permissionUtils";


const Skill = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({
    skill_name: "",
    skill_desc: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errr, setErrr] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const { hasPermission } = usePermissions();

  useEffect(() => {
    fetchSkill();
  }, []);

  const fetchSkill = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getallSkills();
      setSkills(res.data.data || res.data); // adjust if API returns differently
    } catch (err) {
      setError("Failed to fetch Skill.");
      console.error("GET Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (req = { skill_name: "", skill_desc: "" }, index = null) => {
    setCurrentSkill(req);
    setEditIndex(index);
    setShowModal(true);
  };

 const handleSave = () => {
  const newErrors = {};

  const trimmedName = currentSkill.skill_name?.trim();
  const trimmedDesc = currentSkill.skill_desc?.trim();

  // Step 1: Required fields
  if (!trimmedName) {
    newErrors.skill_name = "Name is required";
  }
  // if (!trimmedDesc) {
  //   newErrors.skill_desc = "Description is required";
  // }

  // Step 2: Only check duplicate name (description can repeat)
  if (trimmedName) {
    const isDuplicateName = skills.some(
      (skill, index) =>
        skill.skill_name?.trim().toLowerCase() === trimmedName.toLowerCase() &&
        index !== editIndex
    );

    if (isDuplicateName) {
      newErrors.skill_name = "Skill name already exists";
    }
  }

  // ✅ Description is not checked for duplicates (can repeat)

  setErrr(newErrors);

  if (Object.keys(newErrors).length === 0) {
    handleSaveCallback();
  }
};



  const handleSaveCallback = async () => {
    try {
      if (editIndex !== null) {
        const updatedSkill = {
          ...currentSkill,
          skill_id: skills[editIndex].skill_id,
        };
        await apiService.updateSkill(updatedSkill.skill_id, updatedSkill);
        // console.log("Updating Skill:", updatedSkill);

        toast.success("Skill updated successfully");

        const updatedSkills = [...skills];
        updatedSkills[editIndex] = updatedSkill;
        setSkills(updatedSkills);
      } else {
        // console.log("Adding new Skill:", currentSkill);
        const response = await apiService.addSkill(currentSkill);
        const newSkill = response.data?.data || currentSkill;

        toast.success("Skill added successfully");
        setSkills(prev => [...prev, newSkill]);
        await fetchSkill();
      }
      resetForm();
    } catch (err) {
      console.error("Save Error:", err);
      toast.error("Save failed");
    }
  };

  const handleDelete = async (index) => {
    const idToDelete = skills[index]?.skill_id;

    try {
      await apiService.deleteSkill(idToDelete);
      // console.log("Deleting Skill ID:", idToDelete);
      setSkills(skills.filter((skill) => skill.skill_id !== idToDelete));
      toast.success("Skill deleted");
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Delete failed");
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setCurrentSkill({ skill_name: "", skill_desc: "" });
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
    let filteredItems = [...skills];

    if (searchTerm.trim()) {
      const lowerTerm = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(
        (skill) =>
          skill.skill_name?.toLowerCase().includes(lowerTerm) ||
          skill.skill_desc?.toLowerCase().includes(lowerTerm)
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
    <div className="space-y-6 py-3 skills">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Skills</h1>
          <p className="text-muted-foreground mt-1">
            Manage organization skills
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
              placeholder="Search by skill or description"
              className="w-full pl-9 h-9 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {hasPermission('/recruitment/master/skill', 'create') === true && (
            <button 
              onClick={() => openModal()} 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-gradient-primary shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3 btn-add-purple"
            >
              + Add Skill
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
                  onClick={() => handleSort("skill_name")}
                >
                  
                    Skill
                    <span className="ml-1">{getSortIndicator("skill_name")}</span>
                  
                </TableHead>
                <TableHead 
                  className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1"
                  onClick={() => handleSort("skill_desc")}
                >
                 
                    Description
                    <span className="ml-1">{getSortIndicator("skill_desc")}</span>
                 
                </TableHead>
                <TableHead className="text-right  text-foreground h-10  pr-35 whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {jobsToDisplay.length > 0 ? (
                jobsToDisplay.map((job, index) => (
                  <TableRow key={job.skill_id || index} className="hover:bg-gray-50">
                    <TableCell className="px-2 py-4 whitespace-normal">
                      {job.skill_name}
                    </TableCell>
                    <TableCell className="px-2 py-4 whitespace-normal">
                      {job.skill_desc || '-'}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {hasPermission('/recruitment/master/skill', 'edit') === true && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openModal(job, index)}
                          >
                            <Edit className="size-4 text-gray-500" />
                          </Button>
                        )}
                        {(hasPermission('/recruitment/master/skill', 'view') === true)
                          && (hasPermission('/recruitment/master/skill', 'edit') !== true) && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openModal(job, index)}
                          >
                            <Eye className="size-4 text-gray-500" />
                          </Button>
                        )}
                        {hasPermission('/recruitment/master/skill', 'delete') === true && (
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
                  <TableCell colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                    No skills found matching your criteria.
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
              {editIndex !== null ? "Edit Skill" : "Add Skill"}
            </DialogTitle>
            <DialogDescription>
              {editIndex !== null ? "Update the skill details" : "Add a new skill to the system"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gp-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skill_name" className="text-sm font-medium">
                  Skill <span className="text-red-500">*</span>
                </Label>
                <input
                  type="text"
                  id="skill_name"
                  placeholder="Enter skill"
                  value={currentSkill.skill_name}
                  onChange={(e) =>
                    setCurrentSkill({ ...currentSkill, skill_name: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errr.skill_name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errr.skill_name && (
                  <p className="mt-1 text-sm text-red-600">{errr.skill_name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skill_desc" className="text-sm font-medium">
                  Description
                </Label>
                <textarea
                  id="skill_desc"
                  rows={3}
                  placeholder="Enter description"
                  value={currentSkill.skill_desc}
                  onChange={(e) =>
                    setCurrentSkill({ ...currentSkill, skill_desc: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errr.skill_desc ? "border-red-500" : "border-gray-300"
                  }`}
                ></textarea>
                {errr.skill_desc && (
                  <p className="mt-1 text-sm text-red-600">{errr.skill_desc}</p>
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
              
              {editIndex === null && hasPermission('/recruitment/master/skill', 'create') && (
                <Button 
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-gradient-primary shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3"
                >
                  Save
                </Button>
              )}

              {/* Edit Skill (edit mode) */}
              {editIndex !== null && hasPermission('/recruitment/master/skill', 'edit') && (
                <Button 
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-gradient-primary shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3"
                >
                  Update Skill
                </Button>
              )}
            </DialogFooter>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Skill;
