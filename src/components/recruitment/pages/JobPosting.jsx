import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
  Accordion,
  Table,
  Modal,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "../css/Recruitment.css";
import { apiService } from "../services/apiService";
import { faE, faEye, faPencil, faPlus, faSearch, faTrash,faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JobCreation from "./JobCreation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import DownloadReqPdfButton from "../components/DownloadReqPdfButton";
import { faDownload } from "@fortawesome/free-solid-svg-icons"; // ensure this import exists
import { useDispatch, useSelector } from 'react-redux';
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

  
  // --------- JOB REQUISITION STATES ---------------
  
  const [editIndex, setEditIndex] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [showReqModal, setReqShowModal] = useState(false);
  const [errr, setErrr] = useState({});
  const [selectedReq, setSelectedReq] = useState(null);
  const user = useSelector((state) => state?.user?.user);
  // console.log("user",user)
  //setNoOfApprovals(user?.manager_depth);
  const manager_dept=user?.manager_depth;
  const [noOfApprovals, setNoOfApprovals] = useState(manager_dept);
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
    userId: user?.userid// Default user ID as per the payload structure
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
    
    <Container fluid className="p-4 px-5 fonsty job-postings-page">
      <h5 className="pb-3" style={{ fontFamily: 'Noto Sans', fontWeight: 600, fontSize: '16px', color: '#FF7043', marginBottom: '0px' }}>Job Postings</h5>
      <div className="flex flex-row items-end justify-between mb-3">
        <div className="flex items-end gap-5 mb-2 md:mb-0">
          <Button
            onClick={() => addRequisitionModal()}
            style={{ backgroundColor: '#FF7043', borderColor: '#FF7043', color: '#fff', fontSize: '14px' }}
          >
            + Add Requisition
          </Button>
          <div className="flex flex-row items-center">
            <h5 className="header me-2" style={{ marginBottom: "0.25rem" }}>
            Select Status
            </h5>
            <Form.Select
              value={selectedApproval}
              onChange={(e) => {
                setSelectedApproval(e.target.value);
                setActiveKey(null); // close all accordions when filter changes
              }}
              style={{ width: "200px"}}
              className="fonreg dropdowntext"
            >
              <option value="">All Requisitions</option>
              <option value="New">New</option>
              <option value="Pending">Pending for Approval</option>
              <option value="Approved">Approved</option>
              <option value="Published">Published</option>
              <option value="Rejected">Rejected</option>
            </Form.Select>
          </div>
          
        </div>
  <div className="md:w-1/2 w-full search-container fonreg">
          <InputGroup className="posting-search">
            <InputGroup.Text style={{ backgroundColor: "#FF7043" }}>
              <FontAwesomeIcon icon={faSearch} style={{ color: "#fff" }} />
            </InputGroup.Text>
            <Form.Control className="title"
              type="text"
              placeholder="Search by Title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
      {loading ? (
  <div className="flex justify-center items-center" style={{ minHeight: "200px" }}>
        <Spinner animation="border" variant="primary" />
        </div>
        ) : error ? (
        <Alert variant="danger">{error}</Alert>
        ) : filteredJobPostings.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No requisitions found for the selected filter.
        </div>
        ) :(
        <Accordion activeKey={activeKey}>
          {filteredJobPostings.map((job, index) => (
            <Accordion.Item eventKey={index.toString()} key={index} className="mb-2 border rounded list">
              <Accordion.Header onClick={() => toggleAccordion(index.toString(), job.requisition_id)}>
                <Row className="w-full flex items-center fontreg">
                  
                  {/* Left side: Checkbox + Title + Requisition + Status */}
                  <Col xs={12} md={5} className="flex items-start mb-2 md:mb-0 w-full md:w-5/12">
                    <Form.Check
                      type="checkbox"
                      className="me-2 mt-1"
                      checked={selectedJobIds.includes(job.requisition_id)}
                      onChange={(e) => handleJobSelection(e, job.requisition_id)}
                      onClick={(e) => e.stopPropagation()}
                      disabled={job.count === 0 || job.requisition_status !== "New"} 
                    />
                    <div className="fontcard">
                      <div className=" text-dark mb-1">
                        Title: {job.requisition_title}
                      </div>
                      <div className="text-muted mb-1 boldnes d-flex align-items-center gap-2">
                        <b>Requisition:</b>
                        <span>{job.requisition_code}</span>
                        <span>({job.requisition_status})</span>
                        {(job.requisition_status!="New")?
                        (
                        <OverlayTrigger placement="top" overlay={<Tooltip>View Approval Status</Tooltip>}>
                        <span
                          onClick={(e) => { e.stopPropagation(); handleViewApprovalTrail(job.requisition_id, e); }}
                          style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}
                         
                        >
                          {/* <FontAwesomeIcon icon={faEye} className="approval-eye" /> */}
                          <FontAwesomeIcon icon={faClockRotateLeft} className="approval-eye" />
                        </span>
                      </OverlayTrigger>
                      ):""
                    }
                      </div>
                    </div>
                  </Col>

                  {/* Right side: Expected/Added Positions + Postings */}
                  <Col xs={12} md={5} className="flex flex-col fontcard w-full md:w-5/12">
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
                  </Col>

                  <Col xs={12} md={2} className="flex gap-4 px-2 w-full md:w-2/12">
                    
                    {job?.requisition_status === "New" ? (
                      <>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Add Position</Tooltip>}>
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="iconhover"
                            onClick={(e) => {
                              e.stopPropagation();
                              // setJobCreation(job);
                              nav("/job-creation", {
                                state: { requisitionId: job.requisition_id }
                              });
                            }}
                            style={{ color: '#717178', cursor: 'pointer' }}
                          />
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit Requisition</Tooltip>}>
                          <FontAwesomeIcon
                            icon={faPencil}
                            className="iconhover"
                            onClick={(e) => {
                              e.stopPropagation();
                              addRequisitionModal(job, index, "edit");
                            }}
                            style={{ color: '#717178', cursor: 'pointer' }}
                          />
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete Requisition</Tooltip>}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="required-asterisk cursor-pointer iconhover"
                            style={{ color: '#717178',cursor: 'pointer' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteReq(job,index);
                            }}
                          />
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Download</Tooltip>}>
                          <DownloadReqPdfButton
                            requisition_id={job.requisition_id}
                            requisition={job}
                          >
                            
                          </DownloadReqPdfButton>
                        </OverlayTrigger>
                      </>
                      
                    ) : (
                      <>
                        <OverlayTrigger placement="top" overlay={<Tooltip>View Requisition</Tooltip>}>
                          <FontAwesomeIcon
                            icon={faEye}
                            className="iconhover"
                            onClick={(e) => {
                              e.stopPropagation();
                              addRequisitionModal(job, index, "view");
                            }}
                            style={{ color: '#717178', cursor: 'pointer', textAlign: 'right', right:'80px', position: 'absolute', top:'48px' }}
                          />
                        </OverlayTrigger>
                      </>
                    )}
                  </Col>
                </Row>
              </Accordion.Header>
                  <Accordion.Body>
                <div>
                  <div className="w-full text-gray-600">
                    <Table responsive hover className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-white">
                        <tr>
                          <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                            Position{getSortIndicator("title")}
                          </th>
                          <th onClick={() => handleSort("positions")} style={{ cursor: "pointer" }}>
                            Position Code{getSortIndicator("positions")}
                          </th>
                          <th onClick={() => handleSort("description")} style={{ cursor: "pointer" }}>
                            Grade{getSortIndicator("description")}
                          </th>
                          <th>Vacancies</th>
                          {/* <th onClick={() => handleSort("startDate")} style={{ cursor: "pointer" }}>
                            Experience{getSortIndicator("startDate")}
                          </th> */}
                          {/* <th onClick={() => handleSort("endDate")} style={{ cursor: "pointer" }}>
                            Status{getSortIndicator("endDate")}
                          </th> */}
                          <th>{'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {tableLoading ? (
                          <tr>
                            <td colSpan="6" className="text-center py-3">
                              <Spinner animation="border" size="sm" /> Loading positions...
                            </td>
                          </tr>
                        ) : (!apiData || apiData.length === 0) ? (
                          <tr>
                            <td colSpan="7" className="text-center text-muted py-3">No positions added yet</td>
                          </tr>
                        ) : (
                          apiData.map((row, index) => (
                            <tr key={row.position_id || index} className="odd:bg-white even:bg-gray-50">
                              {/* {console.log(row)} */}
                              <td className="px-3 py-2">{row.position_title}</td>
                              <td className="px-3 py-2">{row.position_code}</td>
                              <td className="px-3 py-2">{row.grade_name}</td>
                              <td className="px-3 py-2">{row.no_of_vacancies ?? '-'}</td>
                              {/* <td>{row.mandatory_experience}</td> */}
                              {/* <td>{row.position_status}</td> */}
                              {/* <td>
                                <FontAwesomeIcon
                                  icon={faPencil}
                                  className="text-info me-3 cursor-pointer"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setEditRequisitionId(job.requisition_id);
                                    setEditPositionId(job.position_id);
                                    setShowModal(true);
                                  }}
                                />
                              </td> */}
                              <td className="px-3 py-2">
                                {job.requisition_status==='New' ? (
                                  <FontAwesomeIcon
                                    icon={faPencil}
                                    className="text-info me-3 cursor-pointer iconhover"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setEditRequisitionId(row.requisition_id);
                                      setEditPositionId(row.position_id);
                                      setShowModal(true);
                                      setReadOnly(false);
                                    }}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    className="text-info me-3 cursor-pointer iconhover"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setEditRequisitionId(row.requisition_id);
                                      setEditPositionId(row.position_id);
                                      setShowModal(true);
                                      setReadOnly(true);
                                    }}
                                  />
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}

      {(selectedApproval === "New" || selectedApproval === "") && (
        <>
          <div className="mt-5 mb-3">
            <div className="flex items-start">
              <div className="w-full">
                <div className="flex flex-wrap">
                  {/* Label + Error */}
                  <div className="flex">
                    <Form.Label
                      className="postingfont mb-0"
                      style={{
                        minWidth: "130px",
                        alignSelf: "flex-start",
                        
                      }}
                    >
                      Job Postings: <br />
                      {jobBoardError && (
                      <span style={{ color: "red", fontSize: "10px" }}>{jobBoardError}</span>
                    )}
                    </Form.Label>
                    
                  </div>

                  {/* Checkboxes */}
                  <div className="flex flex-wrap checkbtnspost flex-1">
                    {Object.entries(jobBoards).map(([key, value], idx) => (
                      <div key={idx} className="mr-4 mb-2">
                        <Form.Check
                          type="checkbox"
                          label={key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                          name={key}
                          checked={value}
                          onChange={handleCheckboxChange}
                          className="inline-block"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-4">
          {/* Approval Type */}
          <span className="postingfont me-3">Approval Type</span>
          <Form.Select
            value={approvalStatus}
            style={{ width: "auto", minWidth: "200px", fontWeight: "300" }}
            className="me-4"
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
          </Form.Select>

         

          {approvalStatus === "Workflow" && (
            <>
              <span className="postingfont mr-3">Number of Approvals</span>
              <Form.Select
                className="w-auto min-w-[200px] font-light mr-2"
                value={noOfApprovals}
                onChange={(e) => {
                  const val = e.target.value === "default" ? manager_dept : parseInt(e.target.value);
                  setNoOfApprovals(val);
                }}
              >
                {/* Default option */}
                {/* <option value="default">Default</option> */}
                {/* <option value={manager_dept}> {manager_dept}</option> */}
                {/* Dynamic options from 1 to manager_dept */}
                {Array.from({ length: manager_dept }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
                {/* {Array.from({ length: manager_dept }, (_, i) => i + 1)
                  .filter((num) => num !== manager_dept) // 👈 skip duplicate
                  .map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))} */}
              </Form.Select>
            </>
          )}
        </div>

        </>
      )}

      {(selectedApproval === "New" || selectedApproval === "") && (
        <div className="flex justify-end gap-3">
         <Button 
            variant="outline-secondary" 
            onClick={resetForm}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#FF7043", borderColor: "#FF7043" }}
            className="text-white"
            onClick={handleSavePostings}
          >
            Submit
          </Button>
        </div>
      )}

  <Modal show={showModal} onHide={resetForm} className="modal_container">
        <Modal.Header closeButton>
        <Modal.Title className="fonall">
  {readOnly
    ? "View Job Posting"
    : editRequisitionId !== null
      ? "Edit Job Posting"
      : "Add Job Posting"}
</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JobCreation
            editRequisitionId={editRequisitionId}
            showModal={showModal}
            onClose={() => setShowModal(false)}
            editPositionId={editPositionId}
            readOnly={readOnly}
            onUpdateSuccess={() => {
              // 🔥 Immediately refresh requisition details after update
              if (editRequisitionId) {
               // toggleAccordion(activeKey, editRequisitionId);
                 // ✅ Re-fetch data but keep accordion open
                  fetchRequisitionDetails(editRequisitionId);
                  fetchJobPostings();
              } else {
                fetchJobPostings();
              }
            }}
          />
        </Modal.Body>
      </Modal>


<Modal
  show={showTrailModal}
  onHide={() => setShowTrailModal(false)}
  centered
  size="xl"
  scrollable
  dialogClassName="approval-trail-modal"
>
  <Modal.Header closeButton>
    <Modal.Title className="fonall" style={{ color: '#FF7043', fontWeight: 700 }}>
      Approval History
    </Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {trailLoading && (
      <div className="d-flex justify-content-center py-3">
        <Spinner animation="border" size="sm" />
      </div>
    )}

    {!trailLoading && trailError && (
      <Alert variant="danger" className="mb-0">{trailError}</Alert>
    )}

    {!trailLoading && !trailError && (!trailData || trailData.length === 0) && (
      <div className="text-muted text-center py-2">Direct Approval</div>
    )}

    {!trailLoading && !trailError && trailData?.length > 0 && (
      <div className="table-responsive">
        <Table bordered hover size="sm" className="mb-0 approval-trail-table">
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Status</th>
              <th>Date / Time</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {trailData.map((row, idx) => (
              <tr key={idx}>
                <td style={{ overflowWrap: 'anywhere' }}>{row?.username ?? '-'}</td>
                <td style={{ overflowWrap: 'anywhere' }}>{row?.useremail ?? '-'}</td>
                <td>{row?.status ?? '-'}</td>
                <td>{formatDateTime(row?.dateTime)}</td>
                <td>{row?.comments ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )}
  </Modal.Body>
</Modal>



      {/* Add Requistion Modal */}
      <Modal
        show={showReqModal}
        onHide={resetReqForm}
        centered
        dialogClassName="wide-modal"
      >
        <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-orange" style={{ fontSize: '18px' }}>
          {viewMode 
            ? "View Requisition" 
            : editIndex !== null 
              ? "Edit Requisition" 
              : "Add Requisition"}
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="requisition-form">
            <Row className="g-4">
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="form-label">
                    Requisition Title <span className="required-asterisk">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={currentReq.requisition_title}
                    isInvalid={!!errr.requisition_title}
                    disabled={viewMode}
                    onChange={(e) => {
                      setCurrentReq({
                        ...currentReq,
                        requisition_id: currentReq.requisition_id, // ✅ explicitly keep ID
                        requisition_title: e.target.value,
                      });
                      if (errr.requisition_title) {
                        setErrr({ ...errr, requisition_title: "" });
                      }
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errr.requisition_title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label className="form-label">
                    Description <span className="required-asterisk">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={currentReq.requisition_description}
                    isInvalid={!!errr.requisition_description}
                    disabled={viewMode}
                    onChange={(e) => {
                      setCurrentReq({ ...currentReq, requisition_description: e.target.value });
                      if (errr.requisition_description) {
                        setErrr({ ...errr, requisition_description: "" });
                      }
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errr.requisition_description}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <div className="d-flex gap-1">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="form-label">
                      Start Date <span className="required-asterisk">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={currentReq.registration_start_date}
                      isInvalid={!!errr.registration_start_date}
                      disabled={viewMode}
                      onChange={(e) => {
                        setCurrentReq({ ...currentReq, registration_start_date: e.target.value });
                        if (errr.registration_start_date) {
                          setErrr({ ...errr, registration_start_date: "" });
                        }
                      }}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errr.registration_start_date}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="form-label">
                      End Date <span className="required-asterisk">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={currentReq.registration_end_date}
                      isInvalid={!!errr.registration_end_date}
                      disabled={viewMode}
                      onChange={(e) => {
                        setCurrentReq({ ...currentReq, registration_end_date: e.target.value });
                        if (errr.registration_end_date) {
                          setErrr({ ...errr, registration_end_date: "" });
                        }
                      }}
                      min={currentReq.registration_start_date || new Date().toISOString().split("T")[0]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errr.registration_end_date}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
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
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer className="justify-content-end gap-2">
          <Button variant="outline-secondary" onClick={resetReqForm}>
            {viewMode ? "Close" : "Cancel"}
          </Button>
          {!viewMode && (
            <Button
              className="text-white"
              onClick={handleReqSave}
              style={{ backgroundColor: "#FF7043", borderColor: "#FF7043" }}
            >
              {editIndex !== null ? "Update Requisition" : "Save"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default JobPosting;
