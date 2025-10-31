import { faPencil, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog'
import { Label } from '../../ui/label'
import Select from 'react-select'
import apiService from '../services/apiService'

const InterviewPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [panels, setPanels] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [activeMembers, setActiveMembers] = useState([]);
  const [availableInterviewers, setAvailableInterviewers] = useState([]);
  const [currentPanel, setCurrentPanel] = useState({
    panel_id: null,
    panelName: "",
    panelDescription: "",
    interviewer_ids: [],
  });
  const [errr, setErrr] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingInterviewers, setLoadingInterviewers] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const panelMembers = [
    { value: "Akhil Kumar", label: "Akhil Kumar" },
    { value: "Saketh Rao", label: "Saketh Rao" },
    { value: "Manish Reddy", label: "Manish Reddy" },
    { value: "Nikilesh Sethi", label: "Nikilesh Sethi" },
    { value: "Purvi Nair", label: "Purvi Nair" },
  ];

  const fetchInterviewPanels = async () => {
    try {
      setLoading(true);
      const res = await apiService.getInterviewPanels(); // your GET call
      setPanels(res?.data || []); // adjust according to response structure
      // console.log("Fetched panels:", res?.data);
    } catch (err) {
      console.error("Failed to fetch panels:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInterviewers = async () => {
    try {
      const res = await apiService.getInterviewers();
      const allInterviewers = res?.data || [];
      setInterviewers(allInterviewers);
    } catch (err) {
      console.error("Failed to fetch interviewers:", err);
    }
  };

  const fetchActiveMembers = async () => {
    try {
      const res = await apiService.activeMembers();
      setActiveMembers(res?.data || []); // [2,1]
    } catch (err) {
      console.error("Failed to fetch active members:", err);
    }
  };

  // Compute available interviewers whenever interviewers/activeMembers change
  useEffect(() => {
    const mapped = interviewers.map(i => ({
      value: i.interviewer_id,
      label: i.full_name,
      isDisabled: activeMembers.includes(i.interviewer_id), // mark instead of removing
    }));
    setAvailableInterviewers(mapped);
  }, [interviewers, activeMembers]);

  useEffect(() => {
    fetchInterviewers();
    fetchInterviewPanels();
    fetchActiveMembers();
  }, []);

  const handleDelete = async (panelId) => {
    try {
      await apiService.deleteInterviewPanel(panelId);
      // Refresh list after delete
      fetchInterviewPanels();
    } catch (err) {
      console.error("Failed to delete panel:", err);
    }
  };

  const handleSavePanel = async () => {
    const newErrors = {};

    const trimmedName = currentPanel.panelName?.trim();
    const trimmedDesc = currentPanel.panelDescription?.trim();

    // Validate required fields
    if (!trimmedName) {
      newErrors.panelName = "Panel name is required";
    }
    if (!currentPanel.interviewer_ids || currentPanel.interviewer_ids.length === 0) {
      newErrors.interviewer_ids = "At least one panel member is required";
    }

    setErrr(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const payload = {
          panel_name: currentPanel.panelName,
          panel_description: currentPanel.panelDescription,
          interviewer_ids: currentPanel.interviewer_ids,
        };
        if (editIndex !== null && currentPanel.panel_id) {
          await apiService.updateInterviewPanel(currentPanel.panel_id, payload);
        } else {
          await apiService.addInterviewPanel(payload);
        }
        await fetchInterviewPanels();
        resetForm();
      } catch (err) {
        console.error("Failed to save/update panel:", err);
      }
    }
  };

  const handleEdit = async (panel, index) => {
    setEditIndex(index);

    // fetch interviewers first if not already fetched
    if (interviewers.length === 0) {
      await fetchInterviewers();
    }

    setCurrentPanel({
      panel_id: panel.panel_id,
      panelName: panel.panel_name,
      panelDescription: panel.panel_description,
      interviewer_ids: panel.interviewer_ids || [], // always array
    });

    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentPanel({ panel_id: null, panelName: "", panelDescription: "", interviewer_ids: [] });
    setEditIndex(null);
    setShowModal(false);
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

  const filteredAndSortedPanels = () => {
    let filteredItems = [...panels];

    if (searchTerm.trim()) {
      const lowerTerm = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(
        (panel) =>
          panel.panel_name?.toLowerCase().includes(lowerTerm) ||
          panel.panel_description?.toLowerCase().includes(lowerTerm) ||
          interviewers
            .filter(i => panel.interviewer_ids?.includes(i.interviewer_id))
            .some(i => i.full_name?.toLowerCase().includes(lowerTerm))
      );
    }

    if (sortConfig.key) {
      filteredItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Handle sorting for panel members
        if (sortConfig.key === 'interviewer_ids') {
          aValue = interviewers
            .filter(i => a.interviewer_ids?.includes(i.interviewer_id))
            .map(i => i.full_name)
            .join(', ');
          bValue = interviewers
            .filter(i => b.interviewer_ids?.includes(i.interviewer_id))
            .map(i => i.full_name)
            .join(', ');
        }

        if (aValue == null) return 1;
        if (bValue == null) return -1;
        
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
        
        return sortConfig.direction === "asc"
          ? aValue > bValue ? 1 : -1
          : aValue < bValue ? 1 : -1;
      });
    }

    return filteredItems;
  };

  const panelsToDisplay = filteredAndSortedPanels();

  return (
    <div className="space-y-6 py-3 px-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Interview Panels</h1>
          <p className="text-muted-foreground mt-1">
            Manage interview panels and their members
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
              placeholder="Search by panel name, description, or member"
              className="w-full pl-9 h-9 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowModal(true)} 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-gradient-primary shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3 btn-add-purple"
          >
            + Add Panel
          </button>
        </div>
      </div>

      <div className="border border-[#e5e7eb] rounded-md">
        <div className="rounded-md">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th 
                  className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1 cursor-pointer"
                  onClick={() => handleSort("panel_name")}
                >
                  Panel Name
                  <span className="ml-1">{getSortIndicator("panel_name")}</span>
                </th>
                <th 
                  className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1 cursor-pointer"
                  onClick={() => handleSort("interviewer_ids")}
                >
                  Panel Members
                  <span className="ml-1">{getSortIndicator("interviewer_ids")}</span>
                </th>
                <th className="text-foreground h-10 px-6 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">
                    <Spinner animation="border" size="sm" /> Loading...
                  </td>
                </tr>
              ) : panelsToDisplay.length > 0 ? (
                panelsToDisplay.map((panel, index) => (
                  <tr key={panel.panel_id || index} className="hover:bg-gray-50">
                    <td className="px-2 py-4 whitespace-normal">
                      {panel.panel_name}
                    </td>
                    <td className="px-2 py-4 whitespace-normal">
                      {panel.interviewer_ids
                        .map(id => interviewers.find(i => i.interviewer_id === id)?.full_name)
                        .filter(Boolean)
                        .join(", ") || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(panel, index)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FontAwesomeIcon icon={faPencil} className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(panel.panel_id)}
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
                    {searchTerm ? 'No panels match your search criteria.' : 'No panels found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={showModal} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[#FF7043]">
              {editIndex !== null ? "Edit Interview Panel" : "Add Interview Panel"}
            </DialogTitle>
            <DialogDescription>
              {editIndex !== null ? "Update the interview panel details" : "Add a new interview panel to the system"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="panel_name" className="text-sm font-medium">
                  Panel Name <span className="text-red-500">*</span>
                </Label>
                <input
                  type="text"
                  id="panel_name"
                  placeholder="Enter panel name"
                  value={currentPanel.panelName || ''}
                  onChange={(e) => setCurrentPanel({ ...currentPanel, panelName: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errr.panelName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errr.panelName && (
                  <p className="mt-1 text-sm text-red-600">{errr.panelName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="panel_description" className="text-sm font-medium">
                  Description
                </Label>
                <textarea
                  id="panel_description"
                  rows={3}
                  placeholder="Enter description"
                  value={currentPanel.panelDescription || ''}
                  onChange={(e) =>
                    setCurrentPanel({ ...currentPanel, panelDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div className="space-y-2">
                <Label htmlFor="panel_members" className="text-sm font-medium">
                  Panel Members <span className="text-red-500">*</span>
                </Label>
                <Select
                  isMulti
                  options={availableInterviewers}
                  closeMenuOnSelect={false}
                  value={availableInterviewers.filter(m =>
                    currentPanel.interviewer_ids?.includes(m.value)
                  )}
                  onMenuOpen={async () => {
                    try {
                      const [interviewersRes, activeRes] = await Promise.all([
                        apiService.getInterviewers(),
                        apiService.activeMembers()
                      ]);

                      const allInterviewers = interviewersRes?.data || [];
                      const active = activeRes?.data || [];

                      const mapped = allInterviewers.map(i => ({
                        value: i.interviewer_id,
                        label: i.full_name,
                        isDisabled: active.includes(i.interviewer_id),
                      }));

                      setAvailableInterviewers(mapped);
                    } catch (err) {
                      console.error("Error fetching dropdown data:", err);
                    }
                  }}
                  onChange={(selected) => {
                    const values = selected ? selected.map(opt => opt.value) : [];
                    setCurrentPanel({ ...currentPanel, interviewer_ids: values });
                  }}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minHeight: '40px',
                      borderColor: errr.interviewer_ids ? '#ef4444' : '#d1d5db',
                      '&:hover': {
                        borderColor: errr.interviewer_ids ? '#ef4444' : '#9ca3af',
                      },
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    }),
                  }}
                />
                {errr.interviewer_ids && (
                  <p className="mt-1 text-sm text-red-600">{errr.interviewer_ids}</p>
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
              onClick={handleSavePanel}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-gradient-primary shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3"
            >
              {editIndex !== null ? "Update Panel" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default InterviewPanel