import React, { useState, useEffect } from "react";
import "../css/CandidateCard.css";
import { useLocation } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
    Form,
    InputGroup,
    Breadcrumb,
    BreadcrumbItem,
    Container,
    Dropdown
} from "react-bootstrap";
import Drawer from "./Drawer";
import InterviewModal from "./InterviewModal";
import OfferModal from "./OfferModal";
import { getJobRequirements, getJobPositions, getCandidatesByPosition, fetchCandidatesByStatus, API_ENDPOINTS } from "../services/getJobRequirements";
import profile from '../../../assets/profile_icon.png';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faPencil,
    faTrash,
    faSearch,
    faCalendarAlt,
    faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import apiService from "../services/apiService";
import CandidatePortalModal from "./CandidatePortal/CandidatePortalModal";
import reschedule from '../../../assets/reschedule.png';
import { OverlayTrigger, Tooltip } from "react-bootstrap";



const CandidateCard = ({ setTriggerDownload }) => {
    const [candidates, setCandidates] = useState([]);
    const [interviewed, setInterviewed] = useState([]);
    const [offered, setOffered] = useState([]);
    const location = useLocation();
    const responseData = location?.state?.responseData || {};
    const [isDescending, setIsDescending] = useState({
        candidates: true,
        interviewed: null,
        offered: null
    });
    const [search, setSearch] = useState("");
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const [jobReqs, setJobReqs] = useState([]);
    const [jobPositions, setJobPositions] = useState([]);
    const [selectedRequisitionCode, setSelectedRequisitionCode] = useState("");
    const [selectedPositionId, setSelectedPositionId] = useState("");
    const [selectedRequisitionId, setSelectedRequisitionId] = useState("");
    const [jobPositionTitle, setJobPositionTitle] = useState("");
    const [selectedPositionTitle, setSelectedPositionTitle] = useState("");

    const [showInterviewModal, setShowInterviewModal] = useState(false);
    const [interviewCandidate, setInterviewCandidate] = useState(null);
    const [interviewDate, setInterviewDate] = useState("");
    const [interviewTime, setInterviewTime] = useState("");
    const [showOfferModal, setShowOfferModal] = useState(false);
    const [offerCandidate, setOfferCandidate] = useState(null);
    const [reqId, setReqId] = useState("");
    const [positionId, setPositionId] = useState("");
    const [salary, setSalary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offerLetterPath, setOfferLetterPath] = useState('');
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [rescheduleCandidate, setRescheduleCandidate] = useState(null);
    const [apiLoading, setApiLoading] = useState(false);
    const [reqSearch, setReqSearch] = useState("");
    const [posSearch, setPosSearch] = useState("");
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [interviewFeedBack, setInterviewFeedBack] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [stackRank, setStackRank] = useState(false);

    const hashString = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    // Filtered lists
    const filteredReqs = jobReqs.filter((req) =>
        `${req.requisition_code} - ${req.requisition_title}`
            .toLowerCase()
            .includes(reqSearch.toLowerCase())
    );

    const filteredPositions = jobPositions.filter((pos) =>
        `${pos.position_code} - ${pos.position_title}`
            .toLowerCase()
            .includes(posSearch.toLowerCase())
    );

    // const requisitionCode = useSelector((state) => state.job.requisitionCode);
    // const positionId = useSelector((state) => state.job.positionId);
    // const dispatch = useDispatch();
    // const showToast = (message, variant) => {
    //     alert(message);
    // };
    const [showCandidatePortal, setShowCandidatePortal] = useState(false);
    const toggleCandidatePortal = () => {
        setShowCandidatePortal(!showCandidatePortal);
    };

    const [shouldRefresh, setShouldRefresh] = useState(0);

    const handleCloseModal = () => {
        // console.log("this called")
        setShouldRefresh(prev => prev + 1);
        setShowCandidatePortal(false);    // Close modal
        // Trigger data refresh
    };



    const showToast = (message, variant = "info") => {
        switch (variant) {
            case "success":
                toast.success(message);
                break;
            case "error":
                toast.error(message);
                break;
            case "warning":
                toast.warn(message);
                break;
            default:
                toast.info(message);
                break;
        }
    };

    useEffect(() => {
        const fetchJobData = async () => {
            const response = await getJobRequirements();
            const data = response?.data || [];
            // console.log(data.filter(req => req.requisition_status === 'Approved'))
            setJobReqs(data.filter(req => req.requisition_status === 'Approved'));

        };
        fetchJobData();
    }, []);

    useEffect(() => {
        const fetchPositions = async () => {
            if (selectedRequisitionId) {
                const positions = await getJobPositions(selectedRequisitionId);
                setJobPositions(positions);
                setSelectedPositionId("");
                setCandidates([]);
            }
        };
        fetchPositions();
    }, [selectedRequisitionId]);

    useEffect(() => {
        // console.log("ravali")
        const fetchCandidates = async () => {
            setCandidates([]);
            setInterviewed([]);
            setOffered([]);
            // console.log("Fetching candidates for position ID:", selectedPositionId);

            if (selectedRequisitionId && selectedPositionId) {
                // Correctly access the data property of the response object
                const fetchedCandidatesResponse = await getCandidatesByPosition(selectedPositionId);
                // console.log("Fetched candidates response:", fetchedCandidatesResponse);
                //  const fetchedCandidates = fetchedCandidatesResponse || fetchedCandidatesResponse?.data || [];//
                //const fetchedCandidatesResponse =  await axios.get('http://192.168.20.111:8081/api/candidates/details-by-position/' + selectedPositionId);
                const fetchedCandidates = fetchedCandidatesResponse?.data || [];
                // console.log("Fetched candidates for position:", fetchedCandidates);

                // Filter for each column based on application_status
                const shortlistedCandidates = fetchedCandidates.filter(
                    candidate => candidate.application_status === 'Shortlisted'
                );
                const interviewedCandidates = fetchedCandidates.filter(
                    (candidate) =>
                        candidate.application_status === "Scheduled" ||
                        candidate.application_status === "Rescheduled" ||
                        candidate.application_status === "Selected for next round" ||
                        candidate.application_status === "Rejected" ||
                        candidate.application_status === "Selected" ||
                        candidate.application_status === "Cancelled"
                );
                const offeredCandidates = fetchedCandidates.filter(
                    candidate => candidate.application_status === 'Offered'
                );
                // console.log("Interviewed Candidates", interviewedCandidates);
                setCandidates(shortlistedCandidates);
                setInterviewed(interviewedCandidates);
                setOffered(offeredCandidates);
            } else {
                setCandidates([]);
                setInterviewed([]);
                setOffered([]);
            }
        };

        fetchCandidates();
    }, [selectedRequisitionId, selectedPositionId, shouldRefresh]);

    const calculateRatings = (candidates, skills) => {
        return candidates.map(candidate => {
            if (!candidate || !candidate.skills) {
                return { ...candidate, rating: '0.0', ratingDescription: 'No skills provided.' };
            }
            const skillsLowerCase = candidate.skills.split(',').map(item => item.toLowerCase().trim());
            const matchedSkills = skills.filter(skill => skillsLowerCase.includes(skill));
            let rating, ratingDescription;

            switch (true) {
                case matchedSkills.length > 5:
                    rating = '5.0';
                    ratingDescription = `${matchedSkills.length} out of ${skillsLowerCase.length} skills matched. This profile may be the best fit.`;
                    break;
                case matchedSkills.length === 4:
                    rating = '4.0';
                    ratingDescription = `${matchedSkills.length} out of ${skillsLowerCase.length} skills matched. This profile may be a good fit.`;
                    break;
                case matchedSkills.length === 3:
                    rating = '3.0';
                    ratingDescription = `${matchedSkills.length} out of ${skillsLowerCase.length} skills matched. This profile may be an average fit.`;
                    break;
                case matchedSkills.length === 2:
                    rating = '2.0';
                    ratingDescription = `${matchedSkills.length} out of ${skillsLowerCase.length} skills matched. This profile may be a below average fit.`;
                    break;
                case matchedSkills.length === 1:
                    rating = '1.0';
                    ratingDescription = `${matchedSkills.length} out of ${skillsLowerCase.length} skills matched. This profile may be a bad fit.`;
                    break;
                default:
                    rating = '0.0';
                    ratingDescription = `${matchedSkills.length} out of ${skillsLowerCase.length} skills matched. This profile may be a very bad fit.`;
                    break;
            }
            return { ...candidate, rating, ratingDescription };
        });
    };

    const jdSkillsLowerCase = responseData[0]?.Skills?.map(item => item.toLowerCase()) || [];
    const ratedCandidates = calculateRatings(candidates, jdSkillsLowerCase);
    const ratedOffered = calculateRatings(offered, jdSkillsLowerCase);
    const ratedInterviewed = calculateRatings(interviewed, jdSkillsLowerCase);

    const handleJobReqChange = (event) => {
        const newRequisitionCode = event.target.value;
        const selectedReq = jobReqs.find(req => req.requisition_code === newRequisitionCode);
        setSelectedRequisitionCode(newRequisitionCode);
        setSelectedRequisitionId(selectedReq ? selectedReq.requisition_id : "");
        setSelectedPositionId("");
        // Set the job position title if a requisition is selected
        setJobPositionTitle(selectedReq ? selectedReq.requisition_title : "");
        setCandidates([]);
        setInterviewed([]);
        setOffered([]);
        setStackRank(false)
    };
    const handleJobPositionChange = (event) => {
        // const positionId = event.target.value;
        // setSelectedPositionId(positionId);

        // const selectedPos = jobPositions.find(pos => pos.position_id === positionId);
        // if (selectedPos) {
        //     setJobPositionTitle(selectedPos.position_title);
        // }


        const positionId = event.target.value;
        setSelectedPositionId(positionId);

        const found = jobPositions.find((pos) => pos.position_id === positionId);
        if (found) {
            setSelectedPositionTitle(found.position_title);
        }

    };

    const toggleCandidateSortOrder = () => {
        setIsDescending((prevState) => ({
            ...prevState,
            candidates: !prevState.candidates
        }));
    };

    const toggleInterviewedSortOrder = () => {
        setIsDescending((prevState) => ({
            ...prevState,
            interviewed: prevState.interviewed === null ? true : !prevState.interviewed,
        }));
    };

    const toggleOfferedSortOrder = () => {
        setIsDescending((prevState) => ({
            ...prevState,
            offered: prevState.offered === null ? true : !prevState.offered,
        }));
    };

    const handleOnDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        // Handle reordering within the same list
        if (source.droppableId === destination.droppableId) {
            const listMap = {
                candidates: [candidates, setCandidates],
                interviewed: [interviewed, setInterviewed],
                offered: [offered, setOffered],
            };
            const [list, setList] = listMap[source.droppableId];
            const updatedList = Array.from(list);
            const [movedItem] = updatedList.splice(source.index, 1);
            updatedList.splice(destination.index, 0, movedItem);
            setList(updatedList);
            return;
        }

        // Find moved item
        const sourceList = {
            candidates,
            interviewed,
            offered,
        }[source.droppableId];
        const movedItem = sourceList[source.index];
        // 🚫 Prevent scheduled/rescheduled → offered
        const status = (movedItem.application_status || "").toLowerCase();
        if (
            destination.droppableId === "offered" &&
            (status === "scheduled" || status === "rescheduled" || status === "cancelled" || status === "selected for next round" || status === "rejected")
        ) {
            return;
        }

        // Column-level disallowed moves
        const disallowedMoves = [
            ["offered", "interviewed"],
            ["offered", "candidates"],
            ["interviewed", "candidates"],
            ["candidates", "offered"], // Prevent direct drag from candidates → offered
        ];
        if (
            disallowedMoves.some(
                ([src, dest]) =>
                    src === source.droppableId && dest === destination.droppableId
            )
        ) {
            return;
        }

        const listMap = {
            candidates: [candidates, setCandidates],
            interviewed: [interviewed, setInterviewed],
            offered: [offered, setOffered],
        };

        const [sourceListState, setSourceList] = listMap[source.droppableId];
        const [destList, setDestList] = listMap[destination.droppableId];

        const newSourceList = Array.from(sourceListState);
        const newDestList = Array.from(destList);

        newSourceList.splice(source.index, 1);
        newDestList.splice(destination.index, 0, movedItem);

        setSourceList(newSourceList);

        // Offered list handled by modal, not direct state
        if (destination.droppableId !== "offered") {
            setDestList(newDestList);
        }

        if (destination.droppableId === "interviewed") {
            setInterviewCandidate(movedItem);
            setShowInterviewModal(true);
        } else if (destination.droppableId === "offered") {
            setOfferCandidate(movedItem);
            setJobPositionTitle(movedItem.jobTitles);
            setReqId(selectedRequisitionCode);
            setPositionId(selectedPositionId);
            setShowOfferModal(true);
        }
    };
    const handleScheduleInterview = async (interviewData) => {
        // this.setState({ isLoading: true });
        // console.log("Scheduling interview with data:", interviewData);
        if (!interviewCandidate || !interviewData.interview_date || !interviewData.interview_time) {
            showToast("Please select both interview date and time.", "warning");
            return;
        }

        const timeHHMM = String(interviewData.interview_time).slice(0, 5);
        // console.log(interviewData)
        const interviewPayload = {
            // candidate_id: interviewCandidate?.candidate_id,
            application_id: interviewCandidate?.application_id,
            date: interviewData?.interview_date,
            time: timeHHMM,
            // userId: 3,
            // position_id: selectedPositionId,
            // interviewer_email: interviewData.interviewerEmail,
            // interviewer_name: interviewData.interviewerName,
            interviewer_id: interviewData?.interviewer_id,
            status: "Scheduled",
            interview_type: interviewData?.interview_type,
            location: interviewData?.interview_type === "In-Person" ? interviewData?.location : "",
            phone: interviewData?.interview_type === "Telephonic" ? interviewData?.phone : "",
            is_panel_interview: interviewData?.is_panel_interview,
        };
        setApiLoading(true);

        try {
            const response = await apiService.scheduleInterview(interviewPayload);
            // console.log("Interview scheduled response:", response);
            // const response = await fetch(API_ENDPOINTS.SCHEDULE_INTERVIEW, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(interviewPayload)
            // });

            // const text = await response.text();
            // console.log("Response text:", text);

            // if (!response.ok) {
            //     throw new Error("Failed to schedule interview");
            // } 

            // Update status locally
            const updatedInterviewed = interviewed.map(candidate =>
                candidate.candidate_id === interviewCandidate.candidate_id
                    ? {
                        ...candidate,
                        application_status: "Scheduled",
                        interview_date: interviewData.interview_date,
                        interview_time: timeHHMM, // use HH:mm in UI
                        profileStatus: "Interview Scheduled",
                        interviewer_email: interviewData.interviewerEmail,
                        interviewer_name: interviewData.interviewerName,
                        interviewer_id: interviewData.interviewerId,
                        application_id: interviewCandidate?.application_id,
                    }
                    : candidate
            );
            // If the candidate isn't in the list, add them. This handles the initial drag and drop.
            if (!updatedInterviewed.some(c => c.candidate_id === interviewCandidate.candidate_id)) {
                updatedInterviewed.push({
                    ...interviewCandidate,
                    application_status: "Scheduled",
                    interview_date: interviewData.interview_date,
                    interview_time: timeHHMM, // use HH:mm in UI
                    interviewer_email: interviewData.interviewerEmail,
                    interviewer_name: interviewData.interviewerName,
                    interviewer_id: interviewData.interviewerId,
                    application_id: interviewCandidate?.application_id,
                });
            }
            setInterviewed(updatedInterviewed);

            setShowInterviewModal(false);
            setInterviewCandidate(null);
            setInterviewDate("");
            setInterviewTime("");
            toast.success("Interview scheduled successfully!");
        } catch (error) {
            console.error("Error scheduling interview:", error);
        } finally {
            setApiLoading(false);
        }
    };

    const handleOffer = async (offerLetterPath, joiningDate) => {
        if (!offerCandidate || !salary || !offerLetterPath) {
            showToast("Please fill in all fields before sending the offer.");
            return;
        }

        setApiLoading(true);
        setLoading(true);
        setError(null);

        try {
            const payload = {
                candidate_id: offerCandidate?.candidate_id,
                position_id: positionId,
                salary: Number(salary),
                offer_letter_path: offerLetterPath,
                designation:
                    selectedPositionTitle ||
                    jobPositionTitle ||
                    jobPositions.find(p => p.position_id === positionId)?.position_title ||
                    "",
                joining_date: joiningDate,
            };
            const response = await apiService.sendOffer(payload);
            // console.log("Offer response:", response?.status);

            if (response?.status === 200) {
                const updatedCandidate = {
                    ...offerCandidate,
                    application_status: 'Offered',
                    profileStatus: "Selected",
                    rating: offerCandidate.rating || 0,
                    offer_letter_path: offerLetterPath,
                    designation: payload.designation,
                    joining_date: joiningDate,
                    // 👈 make sure Drawer can use this
                };

                // Update local state
                const updatedInterviewed = interviewed.filter(
                    (c) => c.candidate_id !== offerCandidate.candidate_id
                );
                setInterviewed(updatedInterviewed);

                const updatedOffered = [...offered, updatedCandidate];
                setOffered(updatedOffered);

                if (selectedCandidate?.candidate_id === offerCandidate.candidate_id) {
                    setSelectedCandidate(updatedCandidate);
                }

                setShowOfferModal(false);
                setOfferCandidate(null);
                setSalary("");
                setReqId("");
                setPositionId("");
                setJobPositionTitle("");

                toast.success("Offer sent successfully!");
            }
            else {
                toast.error("Failed to send offer");
            }
        } catch (err) {
            console.error("Failed to send offer:", err);
            setError(err.message || "Failed to send offer");
        } finally {
            setApiLoading(false);
            setLoading(false);
        }
    };
    // const handleOffer = async (offerLetterPath) => {
    //     if (!offerCandidate || !salary || !offerLetterPath) {
    //         showToast("Please fill in all fields before sending the offer.");
    //         return;
    //     }
    //     setApiLoading(true);
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         console.log("Offer Letter Path:", offerLetterPath);
    //         const response = await fetch(API_ENDPOINTS.OFFER, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 candidate_id: offerCandidate?.candidate_id,
    //                 position_id: positionId,
    //                 salary: Number(salary),
    //                 offer_letter_path: offerLetterPath
    //             })
    //         });

    //         console.log("Offer Candidate:", offerCandidate);
    //         console.log("Salary:", salary);
    //         console.log("Offer Letter Path:", offerLetterPath);

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             console.error("Error sending offer:", errorData);
    //             throw new Error(errorData.message || `Error: ${response.statusText}`);
    //         }

    //         const updatedInterviewed = interviewed.filter(
    //             (c) => c.candidate_id !== offerCandidate.candidate_id
    //         );
    //         setInterviewed(updatedInterviewed);

    //         const updatedOffered = [
    //             ...offered,
    //             { ...offerCandidate, profileStatus: "Selected", rating: offerCandidate.rating || 0 }
    //         ];
    //         setOffered(updatedOffered);

    //         setShowOfferModal(false);
    //         setOfferCandidate(null);
    //         setSalary('');
    //         setReqId('');
    //         setPositionId('');
    //         setJobPositionTitle('');

    //         showToast("Offer sent successfully!", "success");

    //     } catch (err) {
    //         console.error("Failed to send offer:", err);
    //         setError(err.message || 'Failed to send offer');
    //     } finally {
    //         setApiLoading(false);
    //         setLoading(false);
    //     }
    // };

    const handleCancelInterview = () => {
        if (interviewCandidate) {
            const updatedInterviewed = interviewed.filter(candidate => candidate.candidate_id !== interviewCandidate.candidate_id);
            setInterviewed(updatedInterviewed);
            const updatedCandidates = [...candidates, interviewCandidate];
            setCandidates(updatedCandidates);
        }
        setShowInterviewModal(false);
        setInterviewCandidate(null);
        setInterviewDate("");
        setInterviewTime("");
    };

    const handleCancelOffer = () => {
        if (offerCandidate) {
            const updatedOffered = offered.filter(candidate => candidate.candidate_id !== offerCandidate.candidate_id);
            setOffered(updatedOffered);
            const updatedInterviewed = [...interviewed, offerCandidate];
            setInterviewed(updatedInterviewed);
        }
        setShowOfferModal(false);
        setOfferCandidate(null);
        setJobPositionTitle("");
        setReqId("");
        setSalary("");
    };

    const handlePreview = () => {
        // alert(`Offer Preview for ${offerCandidate.full_name}:\nJob Position: ${jobPositionTitle}\nReq ID: ${reqId}\nSalary: ${salary}`);
        showToast(
            `Offer Preview for ${offerCandidate.full_name}: Job Position: ${jobPositionTitle}, Req ID: ${reqId}, Salary: ${salary}`,
            "info"
        );
    };

    // const toggleDrawer = (candidate = null) => {
    //     setIsOpen(!isOpen);
    //     setSelectedCandidate(candidate);
    // };

    const toggleDrawer = async (candidate = null) => {
        if (isOpen) {
            setIsOpen(false);
            return;
        }
        const c = candidate ?? null;        // explicit fallback
        setSelectedCandidate(c);
        setSelectedInterview(null);

        if (c) {
            // console.log("----------------------------", c)
            try {
                const res = await apiService.createInterview(c.application_id);

                // console.log("res111", res);

                if (res && res.data) {
                    setSelectedInterview(res.data);
                    // console.log("SelectedInterview", res.data); // ✅ use res.data directly

                    const feedbackRes = await apiService.getfeedback(c.application_id);
                    // console.log("feedbackRes", feedbackRes);

                    if (feedbackRes) {
                        setInterviewFeedBack(feedbackRes?.data);
                        // setIsOpen(true);
                    } else {
                        setInterviewFeedBack([]);
                    }
                } else {
                    setSelectedInterview(null);
                }
                setIsOpen(true);
            } catch (e) {
                setError("Failed to fetch interview details");
                setSelectedInterview(null);
                setInterviewFeedBack([]);
            } finally {
                setApiLoading(false);
            }
        }

    };




    // Update handleReschedule to fetch data from the API
    const handleReschedule = async (candidate) => {
        setLoading(true);
        setApiLoading(true);
        setError(null);
        try {
            // const payload = {
            //     candidate_id: candidate.candidate_id,
            //     position_id: selectedPositionId,
            // };
            const response = await apiService.createInterview(candidate.application_id);
            // console.log("response", response);

            const interviewDetails = response.data || response;
            // console.log("interviewDetails", interviewDetails);
            if (interviewDetails && interviewDetails.scheduled_at) {
                const scheduleAt = interviewDetails.scheduled_at
                    ? new Date(interviewDetails.scheduled_at)
                    : null;
                const date = scheduleAt ? scheduleAt.toISOString().split("T")[0] : "";
                const time = scheduleAt
                    ? scheduleAt.toTimeString().split(" ")[0].substring(0, 5)
                    : "";

                const updatedCandidate = {
                    ...candidate,
                    interviewDate: date,
                    interviewTime: time,
                    interviewer_id: interviewDetails.interviewer_id,
                    interviewer_email: interviewDetails.interviewer_email,
                    interviewer: interviewDetails.interviewer,
                    interview_type: interviewDetails.interview_type,
                    location: interviewDetails.location,
                    phone: interviewDetails.phone,
                    is_panel_interview: interviewDetails.is_panel_interview,
                    application_id: candidate?.application_id,
                };
                setRescheduleCandidate(updatedCandidate);
            } else {
                setRescheduleCandidate(candidate);
                showToast("Could not retrieve interview details.", "warning");
            }
        } catch (err) {
            console.error("Failed to fetch interview details:", err);
            setRescheduleCandidate(candidate);
            setError("Failed to fetch interview details");
        } finally {
            setLoading(false);
            setApiLoading(false);
            setShowRescheduleModal(true);
        }
    };

    const handleCancelReschedule = () => {
        setShowRescheduleModal(false);
        setRescheduleCandidate(null);
        setShouldRefresh(prev => prev + 1);
    };

    // Function to handle the actual reschedule interview
    const handleRescheduleInterview = async (interviewData) => {
        if (!interviewData.interview_date || !interviewData.interview_time) {
            showToast("Please select both interview date and time.", "warning");
            return;
        }

        const timeHHMM = String(interviewData.interview_time).slice(0, 5);
        setLoading(true);
        setApiLoading(true);
        setError(null);
        try {
            const payload = {
                // candidate_id: rescheduleCandidate.candidate_id,
                application_id: rescheduleCandidate?.application_id,
                date: interviewData.interview_date,
                time: timeHHMM,
                status: "Rescheduled",
                // position_id: selectedPositionId,
                interviewer_id: interviewData.interviewer_id,
                interviewer_email: interviewData.interviewer_email,
                interviewer_name: interviewData.interviewer,
                interview_type: interviewData?.interview_type,
                location: interviewData?.interview_type === "In-Person" ? interviewData?.location : "",
                phone: interviewData?.interview_type === "Telephonic" ? interviewData?.phone : "",
                is_panel_interview: interviewData?.is_panel_interview,
            };
            const response = await apiService.updateInterviewStatus(payload);
            //  const response = await axios.put(`http://192.168.20.111:8081/api/candidates/schedule-interview`,(payload))


            if (response.status === 200) {
                showToast("Interview rescheduled successfully!", "success");
                const updated = interviewed.map((c) =>
                    c.candidate_id === rescheduleCandidate.candidate_id ? {
                        ...c,
                        interview_date: interviewData.interview_date,
                        interview_time: timeHHMM, // keep HH:mm
                        application_status: "Rescheduled",
                        interviewer_id: interviewData.interviewerId,
                        interviewer_email: interviewData.interviewerEmail,
                        interviewer_name: interviewData.interviewerName,
                        application_id: rescheduleCandidate?.application_id,
                    } : c);
                setInterviewed(updated);

                // Update the rescheduleCandidate state with the new data

                setRescheduleCandidate((prev) => ({
                    ...prev,
                    interview_date: interviewData.interview_date,
                    interview_time: timeHHMM,
                    interviewer_id: interviewData.interviewerId,
                    interviewer_email: interviewData.interviewerEmail,
                    interviewer_name: interviewData.interviewerName,
                }));
            }
        } catch (err) {
            console.error("Failed to reschedule interview:", err);
            setError(err.message || 'Failed to reschedule interview');
        } finally {
            setLoading(false);
            setApiLoading(false);
            setShowRescheduleModal(false);
        }
    };

    // Function to handle the cancellation of an interview
    const handleDeleteInterview = async (interviewData) => {
        setLoading(true);
        setApiLoading(true);
        setError(null);
        try {
            // Get the date and time from the rescheduleCandidate object
            const payload = {
                // candidate_id: rescheduleCandidate.candidate_id,
                application_id: rescheduleCandidate?.application_id,
                date: rescheduleCandidate.interviewDate, // 👈 Corrected: Add interview date     
                time: String(rescheduleCandidate.interviewTime).slice(0, 5), // 👈 Corrected: Add interview time
                // position_id: selectedPositionId,
                status: 'Cancelled',
                interviewer_id: interviewData.interviewerId,
                interviewer_email: interviewData.interviewerEmail,
                interviewer_name: interviewData.interviewerName,
            };
            // console.log("myPayload",payload)
            const response = await apiService.updateInterviewStatus(payload);

            if (response.status === 200) {
                showToast("Interview cancelled successfully!", "success");
                // Move candidate to a different column or remove from 'Interviewed'
                const updatedInterviewed = interviewed.filter(c => c.candidate_id !== rescheduleCandidate.candidate_id);
                setInterviewed(updatedInterviewed);
                handleCancelReschedule();
            }
        } catch (err) {
            console.error("Failed to cancel interview:", err);
            setError(err.message || 'Failed to cancel interview');
        } finally {
            setLoading(false);
            setApiLoading(false);

        }
    };


    // Called by Drawer after saving feedback to update status & interviewer fields on the board

    const handleFeedbackSaved = (candidateId, newStatus, interviewer) => {
        setInterviewed((prev) =>
            prev.map((c) =>
                c.candidate_id === candidateId
                    ? {
                        ...c,
                        application_status: newStatus,
                        interviewer_name: interviewer?.name ?? c.interviewer_name,
                        interviewer_email: interviewer?.email ?? c.interviewer_email,
                        interviewer_id: interviewer?.id ?? c.interviewer_id,
                    }
                    : c
            )
        );
        if (selectedCandidate?.candidate_id === candidateId) {

            setSelectedCandidate((prev) =>

                prev

                    ? {

                        ...prev,

                        application_status: newStatus,

                        interviewer_name: interviewer?.name ?? prev.interviewer_name,

                        interviewer_email: interviewer?.email ?? prev.interviewer_email,

                        interviewer_id: interviewer?.id ?? prev.interviewer_id,

                    }

                    : prev

            );

        }

    };

    return (
        <div className="space-y-6">
                    <h1 className="candidateh1">Candidate Shortlist</h1>
            <div className="top-bar">
                <div className="responsive-breadcrumb-container">


                    {/* // CandidateCard.js */}
                    {/* <BreadcrumbItem> */}
                    <Dropdown className="w-100 mb-3" style={{ marginRight: '4%' }}>
                        <Dropdown.Toggle className="w-100 text-start select-drop spaceform d-flex justify-content-between align-items-center" style={{ height: '35px', marginTop: '15px', overflow: 'hidden' }}>
                            <span>  {selectedRequisitionCode
                                ? `${selectedRequisitionCode} - ${jobReqs.find((r) => r.requisition_code === selectedRequisitionCode)
                                    ?.requisition_title || ""
                                }`
                                : "Select Requisition Code"}</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="w-100 p-2 menuopen">
                            <Form.Control
                                type="text"
                                placeholder="Search requisition"
                                value={reqSearch}
                                onChange={(e) => setReqSearch(e.target.value)}
                                className="mb-2 search_req"
                            />
                            <div className="req_dropdown">
                                {filteredReqs.length > 0 ? (
                                    filteredReqs.map((req, idx) => (
                                        <Dropdown.Item
                                            key={idx}
                                            onClick={() =>
                                                handleJobReqChange({
                                                    target: { name: "jobReqDropdown", value: req.requisition_code },
                                                })
                                            }
                                            style={{ fontSize: '14px' }} className="req_item"
                                        >
                                            {req.requisition_code} - {req.requisition_title}
                                        </Dropdown.Item>
                                    ))
                                ) : (
                                    <Dropdown.Item disabled>No job requests available</Dropdown.Item>
                                )}
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Position Dropdown */}
                    {selectedRequisitionCode && (
                        <Dropdown className="w-100">
                            <Dropdown.Toggle className="w-100 text-start select-drop spaceform align-items-center d-flex justify-content-between" style={{ height: '35px', overflow: 'hidden' }}>
                                <span> {selectedPositionId
                                    ? `${jobPositions.find((p) => p.position_id === selectedPositionId)
                                        ?.position_code || ""} - ${jobPositions.find((p) => p.position_id === selectedPositionId)
                                            ?.position_title || ""
                                    }`
                                    : "Select Position Title"}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="w-100 p-2">
                                <Form.Control
                                    type="text"
                                    placeholder="Search position"
                                    value={posSearch}
                                    onChange={(e) => setPosSearch(e.target.value)}
                                    className="mb-2"
                                />
                                <div style={{ overflowX: 'auto' }}>
                                    {filteredPositions.length > 0 ? (
                                        filteredPositions.map((pos, idx) => (
                                            <Dropdown.Item
                                                key={idx}
                                                onClick={() =>
                                                    handleJobPositionChange({
                                                        target: { name: "jobPositionsDropdown", value: pos.position_id },
                                                    })
                                                }
                                                style={{ fontSize: '14px' }}
                                            >
                                                {pos.position_code} - {pos.position_title}
                                            </Dropdown.Item>
                                        ))
                                    ) : (
                                        <Dropdown.Item disabled>No positions available</Dropdown.Item>
                                    )}
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </div>
                <div className="d-flex gap-3 w-50 justify-content-end">
                    <div className="position-relative w-100" style={{ maxWidth: '400px' }}>
                        <InputGroup className="search-container">
                            <InputGroup.Text className="bg-white border-end-0">
                                <FontAwesomeIcon icon={faSearch} className="text-muted" />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Search candidates..."
                                aria-label="Search candidates"
                                className="border-start-0 ps-0"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    boxShadow: 'none',
                                    borderLeft: 'none',
                                    paddingLeft: '0.5rem'
                                }}
                            />
                            {search && (
                                <Button
                                    variant="link"
                                    className="position-absolute end-0 top-50 translate-middle-y me-2 p-0"
                                    style={{
                                        color: '#6c757d',
                                        textDecoration: 'none',
                                        background: 'transparent',
                                        border: 'none',
                                        transform: 'translateY(-50%)',
                                        lineHeight: 1
                                    }}
                                    onClick={() => setSearch('')}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </Button>
                            )}
                        </InputGroup>
                    </div>
                </div>
            </div>
            <div className="row candidate-cards-3">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="review_columns card">
                            <div className="card-body" style={{ maxHeight: 'auto', backgroundColor: '#fff', borderRadius: '15px', overflowY: 'hidden', boxShadow: '0 10px 30px #1a2c7133' }}>
                                <div className="pb-1">
                                    <div className="d-flex justify-content-between align-items-baseline py-2">
                                        <div className="d-flex align-items-baseline">
                                            <h5 className="color_grey card-title">Shortlisted Candidates</h5>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            {selectedPositionId && (
                                                <span
                                                    className="text-info cursor-pointer d-flex align-items-center gap-1 orangeadd"
                                                    onClick={toggleCandidatePortal}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                    Add

                                                </span>
                                            )}
                                            {isDescending.candidates ?
                                                <i className="bi bi-sort-down sort_icon" onClick={toggleCandidateSortOrder}></i> :
                                                <i className="bi bi-sort-up sort_icon" onClick={toggleCandidateSortOrder}></i>
                                            }

                                            {/* { (selectedRequisitionCode=="JREQ-1151" && (selectedPositionTitle=="Manager - Digital Product" || selectedPositionTitle=="Sc Engineer"))&&(         */}
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => setShowPopup(true)}
                                            >
                                                <FontAwesomeIcon icon={faChartBar} />
                                            </button>
                                            {/* )} */}
                                        </div>
                                    </div>
                                    {/* <div className="d-flex justify-content-between">
                                        <div className="d-flex gap-1">
                                            <h5 className="fs-20 px-1">0</h5>
                                            <h6 className="color_light_grey align-content-center">
                                                REJECTED
                                            </h6>
                                        </div>
                                        <div className="d-flex gap-1">
                                            <h5 className="fs-20 px-1">{candidates?.length}</h5>
                                            <h6 className="color_light_grey align-content-center">
                                                TOTAL
                                            </h6>
                                        </div>
                                    </div> */}
                                    <div className="colored_line_blue my-2"></div>
                                    <Droppable droppableId="candidates">
                                        {(provided) => (
                                            <div
                                                className="candidates overflow-auto px-2"
                                                style={{ minHeight: "100px", maxHeight: "60vh" }}
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {candidates
                                                    .filter((candidate) =>
                                                        candidate.full_name.toLowerCase().includes(search.toLowerCase())
                                                    )
                                                    .sort((a, b) => {
                                                        if (stackRank) {
                                                            // Ascending order by rank
                                                            return a.rank - b.rank;
                                                        } else {
                                                            // Shuffle randomly
                                                            //return Math.random() - 0.5;
                                                            return hashString(a.candidate_id.toString()) - hashString(b.candidate_id.toString());
                                                        }
                                                    })
                                                    .map((candidate, index) => (
                                                        <Draggable
                                                            key={candidate.candidate_id}
                                                            draggableId={candidate.candidate_id.toString()}
                                                            index={index}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    className="candidate_card_container card"
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    onClick={() => toggleDrawer(candidate)}
                                                                >
                                                                    <div className="candidate_card card-body d-flex gap-1">
                                                                        <div>
                                                                            <img
                                                                                className="candidate_image"
                                                                                src={profile}
                                                                                alt={candidate.full_name}
                                                                            />
                                                                        </div>
                                                                        <div className="px-1">
                                                                            <h5 className="candidate_text fw-bold">
                                                                                {candidate.full_name}
                                                                            </h5>
                                                                            <h6 className="candidate_sub_text">{candidate.address}</h6>
                                                                            <h6 className="candidate_sub_text">{candidate.phone}</h6>
                                                                        </div>
                                                                        {/* <div className="card-status-label">{candidate.rank}</div> */}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="review_columns card">
                            <div className="card-body" style={{ maxHeight: "auto", backgroundColor: '#fff', borderRadius: '15px', overflowY: 'hidden', boxShadow: '0 10px 30px #1a2c7133' }}>
                                <div>
                                    <div className="d-flex justify-content-between align-items-baseline py-2">
                                        <h5 className="color_grey card-title">Screening/Schedule</h5>
                                        {isDescending.interviewed !== null ? (
                                            <i className="bi bi-sort-down sort_icon" onClick={toggleInterviewedSortOrder}></i>
                                        ) : (
                                            <i className="bi bi-sort-up sort_icon" onClick={toggleInterviewedSortOrder}></i>
                                        )}

                                    </div>
                                    {/* <div className="d-flex justify-content-between">
                                        <div className="d-flex gap-1">
                                            <h5 className="fs-20 px-1">0</h5>
                                            <h6 className="color_light_grey align-content-center">
                                                REJECTED
                                            </h6>
                                        </div>
                                        <div className="d-flex gap-1">
                                            <h5 className="fs-20 px-1">{interviewed?.length}</h5>
                                            <h6 className="color_light_grey align-content-center">
                                                TOTAL
                                            </h6>
                                        </div>
                                    </div> */}
                                    <div className="colored_line_red my-2"></div>
                                    <Droppable droppableId="interviewed">
                                        {(provided) => (
                                            <div className="candidates overflow-auto px-2" style={{ minHeight: '100px', maxHeight: '60vh' }} ref={provided.innerRef} {...provided.droppableProps}>
                                                {interviewed
                                                    .filter((candidate) => candidate.full_name.toLowerCase().includes(search.toLowerCase()))
                                                    .map((candidate, index) => {
                                                        const showReschedule = [

                                                            "Scheduled",

                                                            "Rescheduled",

                                                            "Selected for next round",

                                                            "Rejected",

                                                        ].includes(candidate.application_status);

                                                        return (
                                                            <Draggable key={candidate.candidate_id} draggableId={candidate.candidate_id.toString()} index={index}>
                                                                {(provided) => (
                                                                    <div className="candidate_card_container card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => toggleDrawer(candidate)}>
                                                                        <div className="candidate_card card-body d-flex gap-1" style={{ cursor: "pointer" }}>
                                                                            <div>
                                                                                <img className="candidate_image"
                                                                                    src={profile}
                                                                                    alt={candidate.full_name} />
                                                                            </div>
                                                                            <div className="px-1 fonreg address">
                                                                                <h5 className="candidate_text fw-bold">{candidate.full_name}</h5>
                                                                                <h6 className="candidate_sub_text">{candidate.address}</h6>
                                                                                <h6 className="candidate_sub_text">{candidate.phone}</h6>
                                                                            </div>
                                                                            <div className="d-flex flex-column statusdiv">
                                                                                {/* <p className="status_reschedule text-muted fs-14 fw-semibold">{candidate.application_status}</p> */}
                                                                                <p
                                                                                    className={`text-muted fs-14 fw-semibold
      ${candidate.application_status === "Scheduled" ? "schedule status_schedule" : ""}
      ${candidate.application_status === "Rescheduled" ? "reschedule status_reschedule" : ""}
            ${candidate.application_status === "Selected for next round" ? "selectednext status_selected" : ""}
              ${candidate.application_status === "Selected" ? "selected status_selected" : ""}
                ${candidate.application_status === "Cancelled" ? "cancel status_reject" : ""}
                   ${candidate.application_status === "Rejected" ? "reject status_reject" : ""}
                    ${candidate.application_status === "Not available" ? "not available status_notavailabel" : ""}

    `}
                                                                                >
                                                                                    {candidate.application_status}
                                                                                </p>
                                                                                {/* This is the new "Reschedule" button */}
                                                                                {(candidate.application_status === 'Scheduled' || candidate.application_status === 'Rescheduled' || candidate.application_status === 'Cancelled' || candidate.application_status === 'Selected for next round') && (
                                                                                    <a
                                                                                        variant="warning"
                                                                                        size="sm"
                                                                                        className="mt-2 reschedule-btn"
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation(); // Prevents the card's onClick from firing
                                                                                            handleReschedule(candidate);
                                                                                        }}
                                                                                    >
                                                                                        <OverlayTrigger
                                                                                            placement="bottom"
                                                                                            overlay={
                                                                                                <Tooltip id="tooltip-reschedule">
                                                                                                    Reschedule\Cancel
                                                                                                </Tooltip>
                                                                                            }
                                                                                        >
                                                                                            <img
                                                                                                src={reschedule}
                                                                                                alt="Reschedule Icon"
                                                                                                style={{ width: "32px", cursor: "pointer" }}
                                                                                                onClick={(e) => {
                                                                                                    e.stopPropagation();
                                                                                                    handleReschedule(candidate);
                                                                                                }}
                                                                                            />
                                                                                        </OverlayTrigger>

                                                                                    </a>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    })
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="review_columns card">
                            <div className="card-body" style={{ maxHeight: "auto", backgroundColor: '#fff', borderRadius: '15px', overflowY: 'hidden', boxShadow: '0 10px 30px #1a2c7133' }}>
                                <div>
                                    <div className="d-flex justify-content-between align-items-baseline py-2">
                                        <h5 className="color_grey card-title">Offers</h5>
                                        {isDescending.offered !== null ? (
                                            <i className="bi bi-sort-down sort_icon" onClick={toggleOfferedSortOrder}></i>
                                        ) : (
                                            <i className="bi bi-sort-up sort_icon" onClick={toggleOfferedSortOrder}></i>
                                        )}
                                    </div>
                                    {/* <div className="d-flex justify-content-between">
                                        <div className="d-flex gap-1">
                                            <h5 className="fs-20 px-1">0</h5>
                                            <h6 className="color_light_grey align-content-center">
                                                REJECTED
                                            </h6>
                                        </div>
                                        <div className="d-flex gap-1">
                                            <h5 className="fs-20 px-1">{offered?.length}</h5>
                                            <h6 className="color_light_grey align-content-center">
                                                TOTAL
                                            </h6>
                                        </div>
                                    </div> */}
                                    <div className="colored_line_yellow my-2"></div>
                                    <Droppable droppableId="offered">
                                        {(provided) => (
                                            <div className="candidates overflow-auto px-2" style={{ minHeight: '100px', maxHeight: '60vh' }} ref={provided.innerRef} {...provided.droppableProps}>
                                                {offered
                                                    .filter((candidate) => candidate.full_name.toLowerCase().includes(search.toLowerCase()))
                                                    .map((candidate, index) => (
                                                        <Draggable key={candidate.candidate_id} draggableId={candidate.candidate_id.toString()} index={index}>
                                                            {(provided) => (
                                                                <div className="candidate_card_container card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => toggleDrawer(candidate)}>
                                                                    <div className="candidate_card card-body d-flex gap-1" style={{ cursor: "pointer" }}>
                                                                        <div>
                                                                            <img className="candidate_image"
                                                                                // src={profile_prictures[index % profile_prictures.length]}
                                                                                src={profile}
                                                                            />
                                                                        </div>
                                                                        <div className="px-1 address">
                                                                            <h5 className="candidate_text fw-bold">{candidate.full_name}</h5>
                                                                            <h6 className="candidate_sub_text">{candidate.address}</h6>
                                                                            <h6 className="candidate_sub_text">{candidate.phone}</h6>
                                                                        </div>
                                                                        <div class="statusdiv">
                                                                            <p className="selectednext status_offered">{candidate.application_status}</p>
                                                                        </div>
                                                                        {/* <div className="card-status-label">{candidate.profileStatus}</div> */}
                                                                        {/* <div className="rating_container d-flex align-self-end p-1">
                                                                            <h6 className="rating_text px-1">{ratedOffered?.find(c => c?.candidate_id === candidate?.candidate_id)?.rating}</h6>
                                                                            <i className="bi bi-star-fill" style={{ color: "#f6ca5a" }}></i>
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            </div>
                        </div>
                    </div>
                </DragDropContext >
            </div>
            {selectedCandidate && (
                <Drawer
                    isOpen={isOpen}
                    toggleDrawer={toggleDrawer}
                    candidate={selectedCandidate}
                    ratedCandidates={ratedCandidates}
                    onFeedbackSaved={handleFeedbackSaved}
                    positionId={selectedPositionId}
                    interviewer={selectedInterview}
                    interviewFeedBacks={interviewFeedBack}
                />
            )}
            {/* <InterviewModal
                show={showInterviewModal}
                handleClose={handleCancelInterview}
                candidate={interviewCandidate}
                date={interviewDate}
                setDate={setInterviewDate}
                time={interviewTime}
                setTime={setInterviewTime}
                handleSchedule={handleScheduleInterview}
            /> */}
            <InterviewModal
                show={showInterviewModal}
                handleClose={handleCancelInterview}
                handleSave={handleScheduleInterview}
                candidate={interviewCandidate}
                position_id={positionId}
                isReschedule={false}
            />
            <InterviewModal
                show={showRescheduleModal}
                handleClose={handleCancelReschedule}
                handleSave={handleRescheduleInterview}
                handleCancelInterview={handleDeleteInterview}
                candidate={rescheduleCandidate}
                isReschedule={true}
            />
            <OfferModal
                show={showOfferModal}
                handleClose={handleCancelOffer}
                candidate={offerCandidate}
                position_title={selectedPositionTitle}
                reqId={reqId}
                position_id={positionId}
                salary={salary}
                setSalary={setSalary}
                handleOffer={handleOffer}
                loading={loading}
                error={error}
                offerLetterPath={offerLetterPath} // 👈 Pass the state down
                setOfferLetterPath={setOfferLetterPath}
                setApiLoading={setApiLoading}

            />
            {/* <CandidatePortalModal
                show={showCandidatePortal}
                handleClose={toggleCandidatePortal}
                selectedPositionId={selectedPositionId}
            /> */}

            {showCandidatePortal && (
                <CandidatePortalModal
                    show={showCandidatePortal}
                    handleClose={handleCloseModal}
                    selectedPositionId={selectedPositionId}
                    onSubmitSuccess={handleCloseModal}
                />
            )}

            {apiLoading && (
                <div className="d-flex justify-content-center align-items-center" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(255,255,255,0.5)", zIndex: 9999 }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {showPopup && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75">
                    <div className="bg-white p-3 rounded shadow-lg" style={{ width: "88%" }}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="mb-0 rank">Stack Rank</h6>
                            <button className="pushbtn" onClick={() => {
                                setStackRank(true)
                                setShowPopup(false)
                            }}
                            >Push</button>
                            <button className="btn-close" onClick={() => setShowPopup(false)}></button>
                        </div>
                        <iframe
                            src="https://app.powerbi.com/view?r=eyJrIjoiMDlhYWQyMDItNzhkNS00NzVkLWExNTItODEwOTM5NGMxZTc5IiwidCI6ImE5ODU5ZDU3LWI1MjQtNDE5Ny1hMjNhLWRmOGE2ODc1YjRhOSJ9"
                            width="100%"
                            height="596.5"
                            frameborder="0" allowFullScreen="true"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CandidateCard;