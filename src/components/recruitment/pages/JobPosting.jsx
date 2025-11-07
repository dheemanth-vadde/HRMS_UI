import React, { useState, useEffect } from "react";
import "../css/Recruitment.css";
import { apiService } from "../services/apiService";
import { faE, faEye, faPencil, faPlus, faSearch, faTrash, faClockRotateLeft, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JobCreation from "./JobCreation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import DownloadReqPdfButton from "../components/DownloadReqPdfButton";
import { faDownload } from "@fortawesome/free-solid-svg-icons"; // ensure this import exists
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../../store/authSlice';
import { usePermissions } from "../../../utils/permissionUtils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/dialog";
const EllipsisIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 128 512"
    fill="currentColor"
    className="text-muted"
    style={{ verticalAlign: "middle" }}
  >
    <path d="M64 144a56 56 0 1 1 0-112 56 56 0 1 1 0 112zm0 224c30.9 0 56 25.1 56 56s-25.1 56-56 56-56-25.1-56-56 25.1-56 56-56zm56-112c0 30.9-25.1 56-56 56s-56-25.1-56-56 25.1-56 56-56 56 25.1 56 56z" />
  </svg>
);
const JobPosting = () => {
  const nav = useNavigate();
  const auth = useSelector((state) => state.auth);
  const managerLevels = auth?.managerLevels || 0;
  const [jobBoards, setJobBoards] = useState({
    linkedin: false,
    careerPage: false,
    naukri: false,
    glassDoor: false,
    indeed: false,
    foundit: false,
    freshersWorld: false,
  });
  const [reqPositions, setReqPositions] = useState({}); // { [requisition_id]: positions[] }

  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApproval, setSelectedApproval] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("");
  //const [noOfApprovals, setNoOfApprovals] = useState(""); // New state for number of approvals
  const [activeKey, setActiveKey] = useState(null);
  const [reqs, setReqs] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const [apiData, setApiData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [editRequisitionId, setEditRequisitionId] = useState(null);
  const [editPositionId, setEditPositionId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobIds, setSelectedJobIds] = useState([]);

  const [jobBoardError, setJobBoardError] = useState("");
  const [readOnly, setReadOnly] = useState(false);
  const [jobCreation, setJobCreation] = useState(null);

  const [showTrailModal, setShowTrailModal] = useState(false);
  const [trailLoading, setTrailLoading] = useState(false);
  const [trailData, setTrailData] = useState([]); // [{ username, useremail, status }]
  const [trailError, setTrailError] = useState("");
const { hasPermission } = usePermissions();

  // --------- JOB REQUISITION STATES ---------------

  const [editIndex, setEditIndex] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [showReqModal, setReqShowModal] = useState(false);
  const [errr, setErrr] = useState({});
  const [selectedReq, setSelectedReq] = useState(null);
  // const user = useSelector((state) => state?.user?.user);
  const user = useSelector(selectAuth);
  // console.log("user",user)
  //setNoOfApprovals(user?.manager_depth);
  const manager_dept = user?.manager_depth;
  const [noOfApprovals, setNoOfApprovals] = useState(0);
  const formatDateTime = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value; // fallback if it's not a valid ISO
    // Use user’s locale/timezone; tweak as you like
    return d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  };




  const handleViewApprovalTrail = async (requisitionId, e) => {
    e?.stopPropagation?.();
    setShowTrailModal(true);
    setTrailLoading(true);
    setTrailError("");

    // try {
    //   // ⬇️ hardcoded token for local testing only
    //   const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Inc4elhNR1VPek5zMUFiWnBtcW5XNiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wcmI2aDJvem5id2tvbmh6LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2ODlkYjU1MTBiOTA1OTY1NjdiZWY2M2MiLCJhdWQiOlsiaHR0cHM6Ly9kZXYtMHJiNmgyb3puYndrb25oei51cy5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vZGV2LTByYjZoMm96bmJ3a29uaHoudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTc1NzkxNzgzMCwiZXhwIjoxNzU4MDA0MjMwLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgZGVsZXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBjcmVhdGU6Y3VycmVudF91c2VyX21ldGFkYXRhIGNyZWF0ZTpjdXJyZW50X3VzZXJfZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpjdXJyZW50X3VzZXJfZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpjdXJyZW50X3VzZXJfaWRlbnRpdGllcyBvZmZsaW5lX2FjY2VzcyIsImd0eSI6InBhc3N3b3JkIiwiYXpwIjoiYWlpQzZvWmRwSEs1QmV5TEJVTmsxWThQa3h5WEJZNE0ifQ.l0PtjAXmMF2VlmhPA2Whs93y3wgeqSYcQX7dDnf70IP6KkIm3gF_5SoHbjKlh9pXScp02qwTcoRlM-zC6Ngqct7agzM4VW_frpE6WpqvEdUtSbjbi7fRM2fs-PeH8HvsGtxYbuEIUQHQ275PxUX_XN6OXBuU269St5STFeiiTD-0b9j4PFipxE-4--QGRuWvRsrjJV0xgi_yN0CkWrJCCj-xWONobVUSrj5BWqHz7Qj5ocJxQTJ16Iq93tQgC0AcSp69szOUOSNxdIe8EyUAkqrcqOYnSKGCSmvmZ741-owllBKDPyQ280ae4Dn0GfORp1KyZ6y8tFvfT7wtU8DX_A";

    //   const resp = await axios.get(
    //     `http://192.168.20.111:8081/api/v1/job-requisitions/workflow-approvals-details/${requisitionId}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         Accept: "application/json",
    //       },
    //     }
    //   );
    try {
      const resp = await apiService.getApprovalTrail(requisitionId);
      const raw = resp?.data?.data ?? resp?.data ?? resp ?? [];
      const arr = Array.isArray(raw) ? raw : [raw];

      // normalize keys to what the table expects
      const normalized = arr.map((r) => ({
        username: r?.username ?? r?.userName ?? r?.user_name ?? "-",
        useremail: r?.useremail ?? r?.mail ?? r?.email ?? "-",
        status: r?.status ?? r?.approvalStatus ?? r?.state ?? "-",
        dateTime: r?.dateTime ?? r?.datetime ?? r?.Datetime ?? "-",
        comments: r?.comments ?? r?.comments ?? r?.remark ?? "-",
      }));

      const sortedApprovals = [...normalized].sort(
        (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
      );

      setTrailData(sortedApprovals);
    } catch (err) {
      console.error("Approval trail fetch error:", err);
      setTrailError("Failed to load approval details. Please try again.");
      setTrailData([]);
    } finally {
      setTrailLoading(false);
    }
  };




  const toggleAccordion = async (key, requisition_id) => {
    const newKey = activeKey === key ? null : key;
    setActiveKey(newKey);

    if (newKey !== null && requisition_id) {
      setApiData([]);
      setTableLoading(true);
      try {
        const data = await apiService.getByRequisitionId(requisition_id);
        const arr = data?.data || [];
        setApiData(arr);
        setReqPositions(prev => ({ ...prev, [requisition_id]: arr }));
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setApiData([]);
        } else {
          console.error("Error fetching requisition details:", err);
        }
      } finally {
        setTableLoading(false);
      }
    }
    // If closing, clear data and loading state
    if (newKey === null) {
      setApiData([]);
      setTableLoading(false);
    }
  };

  const fetchJobPostings = async () => {
    setLoading(true);
    setError(null);
    try {
      const responseData = await apiService.getReqData();
      if (responseData && Array.isArray(responseData.data)) {
        setJobPostings(responseData.data);
      } else {
        // console.log("No data")
        setError("No requisitions found.");
      }
    } catch (err) {
      setError("Failed to fetch job postings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const handleCheckboxChange = (e) => {
    setJobBoards({
      ...jobBoards,
      [e.target.name]: e.target.checked,
    });
  };

  const handleJobSelection = (e, requisitionId) => {
    if (e.target.checked) {
      setSelectedJobIds([...selectedJobIds, requisitionId]);
    } else {
      setSelectedJobIds(selectedJobIds.filter((id) => id !== requisitionId));
    }
  };
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });


  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  const fetchRequisitionDetails = async (requisitionId) => {
    try {
      const data = await apiService.getByRequisitionId(requisitionId);
      setApiData(data?.data || []); // ✅ always an array
    } catch (error) {
      console.error("Error fetching requisition details:", error);
      setApiData([]); // fallback to empty array
    }
  };
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };
  const [currentReq, setCurrentReq] = useState({
    title: "",
    description: "",
    positions: "",
    startDate: "",
    endDate: "",
    comments: "",
  });

  const resetForm = () => {
    setShowModal(false);
    setCurrentReq({
      title: "",
      description: "",
      positions: "",
      startDate: "",
      endDate: "",
      comments: "",
    });
    setEditRequisitionId(null);
    setEditPositionId(null);
    setReadOnly(false);

    // 🔥 Reset filters and selections
    setSelectedJobIds([]);
    setApprovalStatus("");
    setNoOfApprovals(manager_dept); // Reset to default value
    setSelectedApproval("");
    setJobBoards({
      linkedin: false,
      careerPage: false,
      naukri: false,
      glassDoor: false,
      indeed: false,
      foundit: false,
      freshersWorld: false,
    });
  };


  const handleSavePostings = async () => {
    const selectedJobBoards = Object.keys(jobBoards).filter((key) => jobBoards[key]);

    // Validation: At least 1 posting must be selected
    // if (selectedJobBoards.length < 1) {
    //   setJobBoardError("Please select at least 1 posting.");
    //   return;
    // } else {
    //   setJobBoardError("");
    // }

    if (approvalStatus === "") {
      toast.error("Please select an approval type.");
      return;
    }

    if (selectedJobIds.length === 0) {
      toast.error("Please select at least one requisition to save.");
      return;
    }

    // console.log("noOfApprovals",noOfApprovals);
    const payload = {
      requisition_id: selectedJobIds,
      job_postings: selectedJobBoards,
      approval_status: approvalStatus,
      noOfApprovals: approvalStatus === "Workflow" ? noOfApprovals : 0, // Include noOfApprovals in payload only if WorkFlow is selected
      userId: user?.userId// Default user ID as per the payload structure
    };

    try {
      // console.log("Saving job postings with payload:", payload);
      await apiService.jobpost(payload);
      toast.success("Job postings updated successfully!");

      // ✅ Reset all filters, selections, and checkboxes
      setSelectedJobIds([]);
      setApprovalStatus("");
      setNoOfApprovals(manager_dept); // Reset to default value
      setSelectedApproval("");
      setJobBoards({
        linkedin: false,
        careerPage: false,
        naukri: false,
        glassDoor: false,
        indeed: false,
        foundit: false,
        freshersWorld: false,
      });

      // ✅ Reload all requisitions
      fetchJobPostings();

    } catch (err) {
      console.error("Error saving job postings:", err);
      toast.error("Failed to save job postings. Please try again.");
    }
  };

  const filteredJobPostings = jobPostings.filter((job) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      (job.requisition_title?.toLowerCase() ?? "").includes(search) ||
      (job.requisition_code?.toLowerCase() ?? "").includes(search);

    let matchesApproval = true;

    if (selectedApproval !== "") {
      if (selectedApproval === "Pending") {
        matchesApproval =
          job.requisition_status === "Pending for Approval"
      } else {
        matchesApproval = job.requisition_status === selectedApproval;
      }
    }
    return matchesSearch && matchesApproval;
  });

  const fetchRequisitions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getReqData();
      setReqs(res?.data);
    } catch (err) {
      setError("Failed to fetch requisitions.");
      console.error("GET Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addRequisitionModal = (req = null, index = null, mode = "edit") => {
    if (req) {
      // console.log("Editing/View Requisition:", req);
      setCurrentReq({ ...req });   // ✅ keeps requisition_id

      setEditIndex(index);
      // console.log("index:", index);
    } else {
      setCurrentReq({
        requisition_id: "",
        requisition_title: "",
        requisition_description: "",
        no_of_positions: "",
        registration_start_date: "",
        registration_end_date: "",
        requisition_comments: "",
      });
      setEditIndex(null);
    }
    setReqShowModal(true);
    setViewMode(mode === "view");
  };

  const handleReqSave = () => {
    const newErrors = {};
    if (!currentReq.requisition_title?.trim()) {
      newErrors.requisition_title = "Title is required";
    }
    if (!currentReq.requisition_description?.trim()) {
      newErrors.requisition_description = "Description is required";
    }
    if (!currentReq.registration_start_date) {
      newErrors.registration_start_date = "Start date is required";
    }
    if (!currentReq.registration_end_date) {
      newErrors.registration_end_date = "End date is required";
    } else if (
      currentReq.registration_start_date &&
      new Date(currentReq.registration_end_date) < new Date(currentReq.registration_start_date)
    ) {
      newErrors.registration_end_date = "End date must be after start date";
    }
    // if (!currentReq.no_of_positions || currentReq.no_of_positions <= 0) {
    //   newErrors.no_of_positions = "Number of Positions must be a positive number";
    // }

    if (
      reqs.some(
        (req) =>
          req.requisition_title.trim().toLowerCase() === currentReq.requisition_title.trim().toLowerCase() &&
          req.requisition_id !== currentReq.requisition_id // ✅ ignore self
      )
    ) {
      newErrors.requisition_title = "Title must be unique";
    }

    setErrr(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleReqSaveCallback();
    }
  };

  const handleReqSaveCallback = async () => {
    try {
      if (editIndex !== null) {
        const updatedReq = { ...currentReq };
        const id = updatedReq.requisition_id;

        const response = await apiService.updateRequisition(id, updatedReq);

        if (response.success === true) {
          toast.success("Requisition updated successfully");

          // Update the list in state
          const updatedReqs = reqs.map((r) =>
            r.requisition_id === updatedReq.requisition_id ? updatedReq : r
          );
          setReqs(updatedReqs);
        }
      } else {
        const response = await apiService.createRequisition({
          ...currentReq,
          comments: "",
          no_of_positions: "1",
        });

        if (response.success === true) {
          toast.success("Requisition added successfully");
        }

        fetchRequisitions();
      }

      resetReqForm();
      fetchJobPostings();
    } catch (err) {
      toast.error("Save failed");
    }
  };



  const resetReqForm = () => {
    setReqShowModal(false);
    setCurrentReq({
      requisition_title: "",
      requisition_description: "",
      no_of_positions: "",
      registration_start_date: "",
      registration_end_date: "",
      requisition_comments: "",
    });
    setEditIndex(null);
    setErrr({});
  };

  const handleDeleteReq = async (req = null) => {
    try {
      if (!req) {
        toast.error("Invalid requisition");
        return;
      }

      const response = await apiService.deleteRequisition(req.requisition_id);

      if (response.success === true) {
        toast.success("Requisition deleted successfully");

        // Remove from local state immediately
        setReqs((prevReqs) =>
          prevReqs.filter((r) => r.requisition_id !== req.requisition_id)
        );
        fetchJobPostings();
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };


  return (

    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-primary">Job Postings</h1>
          <p className="text-muted-foreground mt-1">
            Manage job requisitions and postings
          </p>

        </div>
        <div className="flex items-center gap-2">
          <div className="relative" style={{ width: '320px' }}>
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ fontSize: '14px', color: '#6c757d' }} />
            <input
              className="search-input-modern bg-input-background"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={selectedApproval}
            onChange={(e) => {
              setSelectedApproval(e.target.value);
              setActiveKey(null);
            }}
            className="status-select-modern"
          >
            <option value="">All Requisitions</option>
            <option value="New">New</option>
            <option value="Pending">Pending for Approval</option>
            <option value="Approved">Approved</option>
            <option value="Published">Published</option>
            <option value="Rejected">Rejected</option>
          </select>
         {hasPermission('/recruitment/job-postings', 'create') === true && (
            <button
              onClick={() => addRequisitionModal()}
              className="btn-add-purple"
            >
              <FontAwesomeIcon
                icon={faPlus}
                style={{ marginRight: '8px', fontSize: '14px' }}
              />
              Add Requisition
            </button>
          )}
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-height-200">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="alert-danger">{error}</div>
      ) : filteredJobPostings.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No requisitions found for the selected filter.
        </div>
      ) : (
        <div className="accordion">
          {filteredJobPostings.map((job, index) => (
            <div key={index} className="accordion-item">
              <div
                className={`accordion-header ${activeKey === index.toString() ? 'active' : ''}`}
                onClick={() => toggleAccordion(index.toString(), job.requisition_id)}
              >
                <div className="w-full flex items-center fontreg">

                  {/* Left side: Checkbox + Title + Requisition + Status */}
                  <div className="flex items-start mb-2 md:mb-0 w-full md:w-5/12">
                    <input
                      type="checkbox"
                      className="checkbox-custom"
                      checked={selectedJobIds.includes(job.requisition_id)}
                      onChange={(e) => handleJobSelection(e, job.requisition_id)}
                      onClick={(e) => e.stopPropagation()}
                      disabled={job.count === 0 || job.requisition_status !== "New"}
                    />
                    <div className="fontcard">
                      <div className="mb-1">
                        <b>Title: </b>{job.requisition_title}
                      </div>
                      <div className="mb-1 boldnes d-flex align-items-center gap-2">
                        <b>Requisition: </b>
                        <span>{job.requisition_code}</span>
                        <span>({job.requisition_status})</span>
                        {(job.requisition_status != "New") ?
                          (
                            <span
                              onClick={(e) => { e.stopPropagation(); handleViewApprovalTrail(job.requisition_id, e); }}
                              className="cursor-pointer-inline"
                              title="View Approval Status"
                            >
                              {/* <FontAwesomeIcon icon={faEye} className="approval-eye" /> */}
                              <FontAwesomeIcon icon={faClockRotateLeft} className="approval-eye" />
                            </span>
                          ) : ""
                        }
                      </div>
                    </div>
                  </div>

                  {/* Right side: Expected/Added Positions + Postings */}
                  <div className="flex flex-col fontcard w-full md:w-5/12">
                    {/* Row 1 */}
                    <div className="flex">
                      <div className="boldnes">
                        <b>Postings:</b>{" "}
                        {job.job_postings
                          ? job.job_postings
                            .split(",") // split into array
                            .map(
                              (item) =>
                                item.charAt(0).toUpperCase() + item.slice(1) // capitalize each
                            )
                            .join(", ") // join back with comma + space
                          : "Not Posted"}
                      </div>
                    </div>
                    {/* Row 2 */}
                    <div className="flex mb-1 mt-1">
                      <div className="mr-4 boldnes">
                        <b>Start Date:</b> {job?.registration_start_date}&nbsp;&nbsp;|&nbsp;&nbsp;
                        <b>End Date:</b> {job?.registration_end_date}&nbsp;&nbsp;|&nbsp;&nbsp;
                        <b>Vacancies:</b> {job.count ? job.count : "0"}<br></br>
                        <b>Status:</b> {
                          new Date() > new Date(job?.registration_end_date)
                            ? "Expired"
                            : "Open"
                        }

                      </div>

                    </div>
                  </div>

                  <div className="flex gap-4  md:w-2/12">

                    {job?.requisition_status === "New" ? (
                      <>
                       {hasPermission('/recruitment/job-creation', 'create') === true && (
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="icon-action iconhover"
                          onClick={(e) => {
                            e.stopPropagation();
                            // setJobCreation(job);
                            nav("/recruitment/job-creation", {
                              state: { requisitionId: job.requisition_id }
                            });
                          }}
                          title="Add Position"
                        />
                          )}
                        {hasPermission('/recruitment/job-postings', 'edit') === true && (
                            <FontAwesomeIcon
                              icon={faPencil}
                              className="icon-action iconhover"
                              onClick={(e) => {
                                e.stopPropagation();
                                addRequisitionModal(job, index, "edit");
                              }}
                              title="Edit Requisition"
                            />
                          )}

                          {hasPermission('/recruitment/job-postings', 'delete') === true && (
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="icon-action iconhover"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteReq(job, index);
                              }}
                              title="Delete Requisition"
                            />
                          )}
                        <DownloadReqPdfButton
                          requisition_id={job.requisition_id}
                          requisition={job}
                        >

                        </DownloadReqPdfButton>
                      </>

                    ) : (
                      <div className={!job.canEdit && !job.canDelete ? 'view-only-action' : ''}>
                        {hasPermission('/recruitment/job-postings', 'view') === true && (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="icon-action iconhover viewicon"
                          onClick={(e) => {
                            e.stopPropagation();
                            addRequisitionModal(job, index, "view");
                          }}
                          title="View Requisition"
                        />
                        )}
                      </div>
                    )}
                    <FontAwesomeIcon
                      icon={activeKey === index.toString() ? faChevronUp : faChevronDown}
                      className="ml-2 text-gray-600 transition-transform duration-200"
                    />
                  </div>
                </div>
              </div>
              {activeKey === index.toString() && (
                <div className="accordion-body-table">
                  <div className="table-card">
                    <div className="table-wrapper">
                      <table className="modern-table">
                        <thead>
                          <tr className="table-header-row">
                            <th className="font-semibold text-base mb-1" onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                              Position{getSortIndicator("title")}
                            </th>
                            <th className="font-semibold text-base mb-1" onClick={() => handleSort("positions")} style={{ cursor: "pointer" }}>
                              Position Code{getSortIndicator("positions")}
                            </th>
                            <th className="font-semibold text-base mb-1" onClick={() => handleSort("description")} style={{ cursor: "pointer" }}>
                              Grade{getSortIndicator("description")}
                            </th>
                            <th className="font-semibold text-base mb-1">Vacancies</th>
                            {(hasPermission('/recruitment/job-creation', 'edit') === true ||
                              hasPermission('/recruitment/job-creation', 'view') === true) && (
                              <th className="font-semibold text-base mb-1 text-right">
                                Actions
                              </th>
                            )}  
                          </tr>
                        </thead>
                        <tbody>
                          {tableLoading ? (
                            <tr>
                              <td colSpan="5" className="table-empty-cell">
                                <div className="spinner-small"></div> Loading positions...
                              </td>
                            </tr>
                          ) : (!apiData || apiData.length === 0) ? (
                            <tr>
                              <td colSpan="5" className="table-empty-cell">No positions added yet</td>
                            </tr>
                          ) : (
                            apiData.map((row, index) => (
                              <tr key={row.position_id || index} className="table-body-row">
                                <td>{row.position_title}</td>
                                <td>{row.position_code}</td>
                                <td>{row.grade_name}</td>
                                <td>{row.no_of_vacancies ?? '-'}</td>
                                <td className="text-right">
                                  <div className="table-actions">
                                    {job.requisition_status === 'New' ? (
                                        // ✅ EDIT button - only visible if user has edit permission
                                        hasPermission('/recruitment/job-creation', 'edit') === true && (
                                          <button
                                            className="action-btn"
                                            onClick={() => {
                                              setEditRequisitionId(row.requisition_id);
                                              setEditPositionId(row.position_id);
                                              setShowModal(true);
                                              setReadOnly(false);
                                            }}
                                            title="Edit Position"
                                          >
                                            <FontAwesomeIcon icon={faPencil} className="action-icon" />
                                          </button>
                                        )
                                      ) : (
                                        hasPermission('/recruitment/job-creation', 'view') === true && (
                                          <button
                                            className="action-btn"
                                            onClick={() => {
                                              setEditRequisitionId(row.requisition_id);
                                              setEditPositionId(row.position_id);
                                              setShowModal(true);
                                              setReadOnly(true);
                                            }}
                                            title="View Position"
                                          >
                                            <FontAwesomeIcon icon={faEye} className="action-icon" />
                                          </button>
                                        )
                                      )}

                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {(selectedApproval === "New" || selectedApproval === "") && (
        <>
          <div className="mt-5 mb-3">
            <div className="flex items-start">
              <div className="w-full mt-4">
                <div className="flex flex-wrap">
                  {/* Label + Error */}
                  <div className="flex">
                    <label className="posting-label postingfont mb-0">
                      Job Postings: <br />
                      {jobBoardError && (
                        <span className="error">{jobBoardError}</span>
                      )}
                    </label>

                  </div>

                  {/* Checkboxes */}
                  <div className="flex flex-wrap checkbtnspost flex-1">
                    {Object.entries(jobBoards).map(([key, value], idx) => (
                      <div key={idx} className="mr-4 mb-2">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name={key}
                            checked={value}
                            onChange={handleCheckboxChange}
                          />
                          {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-4">
            {/* Approval Type */}
            <span className="postingfont mr-3">Approval Type</span>
            <select
              value={approvalStatus}
              className="approval-select"
              onChange={(e) => {
                setApprovalStatus(e.target.value);
                if (e.target.value !== "Workflow") {
                  setNoOfApprovals(manager_dept);
                }
              }}
            >
              <option value="">Select Status</option>
              <option value="Direct Approval">Direct Approval</option>

              {/* Show Workflow option only if user is not Admin */}
              {user?.role !== "Admin" && (
                <option value="Workflow">Workflow</option>
              )}
            </select>



            {approvalStatus === "Workflow" && (
              <>
                <span className="postingfont mr-3">Number of Approvals</span>
                <select
                  className="approval-count-select"
                  value={noOfApprovals}
                  onChange={(e) => setNoOfApprovals(parseInt(e.target.value))}
                >
                  {Array.from({ length: managerLevels + 1 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

        </>
      )}

      {(selectedApproval === "New" || selectedApproval === "") && (
        <div className="flex justify-end gap-3">
          <button
            className="px-4 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={resetForm}
          >
            Cancel
          </button>
          {hasPermission('/recruitment/job-postings', 'create') === true && (
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-gradient-primary shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3"
            onClick={handleSavePostings}
          >
            Submit
          </button>
          )}
        </div>
      )}

      <Dialog open={showModal} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent className="max-w-6xl" style={{ maxWidth: '1000px', height: '90vh' }}>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[#746def]">
              {readOnly
                ? "View Job Posting"
                : editRequisitionId !== null
                  ? "Edit Job Posting"
                  : "Add Job Posting"}
            </DialogTitle>
            <DialogDescription>
              {readOnly
                ? "View the job posting details"
                : editRequisitionId !== null
                  ? "Update the job posting details"
                  : "Create a new job posting"}
            </DialogDescription>
          </DialogHeader>

          <div className="h-full overflow-y-auto">
            <JobCreation
              editRequisitionId={editRequisitionId}
              showModal={showModal}
              onClose={() => setShowModal(false)}
              editPositionId={editPositionId}
              readOnly={readOnly}
              onUpdateSuccess={() => {
                if (editRequisitionId) {
                  fetchRequisitionDetails(editRequisitionId);
                  fetchJobPostings();
                } else {
                  fetchJobPostings();
                }
              }}
            />
          </div>
        </DialogContent>
      </Dialog>


      {showTrailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center history_overlay justify-center z-50 p-4" onClick={() => setShowTrailModal(false)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Approval History</h3>
              <button
                onClick={() => setShowTrailModal(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-auto">
              {trailLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : trailError ? (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{trailError}</p>
                    </div>
                  </div>
                </div>
              ) : !trailData || trailData.length === 0 ? (
                <div className="text-center py-12 text-gray-500">

                  <h3 className="mt-2 text-sm font-medium text-gray-700">Direct Approval</h3>
                  {/* <p className="mt-1 text-sm text-gray-500">This request was auto-approved or doesn't require approval.</p> */}
                </div>
              ) : (
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1">User</th>
                        <th scope="col" className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1">Email</th>
                        <th scope="col" className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1">Status</th>
                        <th scope="col" className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1">Date / Time</th>
                        <th scope="col" className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1">Comments</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {trailData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-900">{row?.username || '-'}</td>
                          <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{row?.useremail || '-'}</td>
                          <td className="px-2 py-3 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${(row?.status || '').toLowerCase() === 'approved' ? 'bg-green-100 text-green-800' :
                              (row?.status || '').toLowerCase() === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                              {row?.status || '-'}
                            </span>
                          </td>
                          <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{formatDateTime(row?.dateTime) || '-'}</td>
                          <td className="px-2 py-3 text-sm text-gray-500">{row?.comments || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}



      {/* Add Requistion Modal */}
      {showReqModal && (
        <div className="modal-overlay"
          // onClick={resetReqForm}
        >
          <div className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-2 sm:text-left">

              <h3 className="text-lg leading-none font-semibold">
                {viewMode
                  ? "View Requisition"
                  : editIndex !== null
                    ? "Edit Requisition"
                    : "Add Requisition"}
              </h3>
              <p className="text-muted-foreground text-sm">
                {viewMode
                  ? "View requisition details"
                  : editIndex !== null
                    ? "Update requisition information"
                    : "Create a new job requisition"}
              </p>

            </div>
            <div className="flex flex-col gap-2 w-full">


              <div className="space-y-2">
                <label className="form-label-modern">
                  Requisition Title <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  className="form-input-modern"
                  placeholder="e.g., Software Developer Position"
                  value={currentReq.requisition_title}
                  disabled={viewMode}
                  onChange={(e) => {
                    setCurrentReq({
                      ...currentReq,
                      requisition_id: currentReq.requisition_id,
                      requisition_title: e.target.value,
                    });
                    if (errr.requisition_title) {
                      setErrr({ ...errr, requisition_title: "" });
                    }
                  }}
                />
                {errr.requisition_title && (
                  <p className="error-message">{errr.requisition_title}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="form-label-modern">
                  Description <span className="text-destructive">*</span>
                </label>
                <textarea
                  className="form-textarea-modern"
                  rows={3}
                  placeholder="Enter job requisition description"
                  value={currentReq.requisition_description}
                  disabled={viewMode}
                  onChange={(e) => {
                    setCurrentReq({ ...currentReq, requisition_description: e.target.value });
                    if (errr.requisition_description) {
                      setErrr({ ...errr, requisition_description: "" });
                    }
                  }}
                />
                {errr.requisition_description && (
                  <p className="error-message">{errr.requisition_description}</p>
                )}
              </div>
              <div className="grid grid-columns-three gap-4">
                <div className="space-y-2">
                  <label className="form-label-modern">
                    Start Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-input-modern"
                    value={currentReq.registration_start_date}
                    disabled={viewMode}
                    onChange={(e) => {
                      setCurrentReq({ ...currentReq, registration_start_date: e.target.value });
                      if (errr.registration_start_date) {
                        setErrr({ ...errr, registration_start_date: "" });
                      }
                    }}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errr.registration_start_date && (
                    <p className="error-message">{errr.registration_start_date}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="form-label-modern">
                    End Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-input-modern"
                    value={currentReq.registration_end_date}
                    disabled={viewMode}
                    onChange={(e) => {
                      setCurrentReq({ ...currentReq, registration_end_date: e.target.value });
                      if (errr.registration_end_date) {
                        setErrr({ ...errr, registration_end_date: "" });
                      }
                    }}
                    min={currentReq.registration_start_date || new Date().toISOString().split("T")[0]}
                  />
                  {errr.registration_end_date && (
                    <p className="error-message">{errr.registration_end_date}</p>
                  )}
                </div>
              </div>

              {/* <div className="d-flex gap-1">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="form-label">
                      Number of Positions <span className="required-asterisk">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={currentReq.no_of_positions}
                      isInvalid={!!errr.no_of_positions}
                      disabled={viewMode}
                      onChange={(e) => {
                      setCurrentReq({ ...currentReq, no_of_positions: e.target.value });
                      if (errr.no_of_positions) {
                        setErrr({ ...errr, no_of_positions: "" });
                      }
                    }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errr.no_of_positions}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="form-label">Comments</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={currentReq.requisition_comments}
                      disabled={viewMode}
                      onChange={(e) =>
                        setCurrentReq({ ...currentReq, requisition_comments: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
               </div> */}
              <div className="space-y-4 mt-4">
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button className="btn-outline-modern" onClick={resetReqForm}>
                    {viewMode ? "Close" : "Cancel"}
                  </button>
                  {!viewMode && (
                    <button
                      className="btn-primary-modern"
                      onClick={handleReqSave}
                    >
                      <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px', fontSize: '14px' }} />
                      {editIndex !== null ? "Update Requisition" : "Add Requisition"}
                    </button>
                  )}
                </div>
              </div>

            </div>
            <button onClick={resetReqForm} className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">&times;</button>

          </div>
        </div>
      )}
    </div>
  );
};

export default JobPosting;
