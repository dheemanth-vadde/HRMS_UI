// src/pages/BulkCandidateAssign.jsx
import React, { useEffect, useMemo, useState } from "react";
// Bootstrap components removed in favor of Tailwind CSS
import { toast } from "sonner";
import apiService from "../services/apiService";
import "../css/bulkUpload.css";
import BulkTiles from "./BulkTiles";
import CandidateDetailsModal from "../components/CandidateDetailsModal";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Eye } from "lucide-react";

export default function BulkCandidateAssign() {
  const [loadingReq, setLoadingReq] = useState(false);
  const [loadingPos, setLoadingPos] = useState(false);
  const [loadingCand, setLoadingCand] = useState(false);
  const [assigning, setAssigning] = useState(false);

  const [requisitions, setRequisitions] = useState([]);
  const [positions, setPositions] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const [selectedReq, setSelectedReq] = useState("");
  const [selectedPos, setSelectedPos] = useState("");

  const [selectedCandidates, setSelectedCandidates] = useState(new Set());
  const [query, setQuery] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [candidateDetails, setCandidateDetails] = useState(null);

  const openCandidate = (row) => {
    setCandidateDetails(row);
    setShowDetails(true);
  };

  // load requisitions
  useEffect(() => {
    const run = async () => {
      setLoadingReq(true);
      try {
        const res = await apiService.getReqData();
        const list = Array.isArray(res?.data) ? res.data : [];
        setRequisitions(list);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load requisitions");
      } finally {
        setLoadingReq(false);
      }
    };
    run();
  }, []);

  // load positions for selected requisition
  useEffect(() => {
    const run = async () => {
      setPositions([]);
      setSelectedPos("");
      setCandidates([]);
      setSelectedCandidates(new Set());
      if (!selectedReq) return;
      setLoadingPos(true);
      try {
        const res = await apiService.getByRequisitionId(selectedReq);
        const list = Array.isArray(res?.data) ? res.data : [];
        setPositions(list);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load positions");
      } finally {
        setLoadingPos(false);
      }
    };
    run();
  }, [selectedReq]);

  // load candidates when a position is selected
  useEffect(() => {
    const run = async () => {
      setCandidates([]);
      setSelectedCandidates(new Set());
      if (!selectedPos) return;

      setLoadingCand(true);
      try {
        const res = await apiService.getNotAppliedBulkUploadCandidates(selectedPos);

        // works whether interceptor returns axios.response or response.data
        const body = res?.data ?? res;
        const list = Array.isArray(body)
          ? body
          : (Array.isArray(body?.data) ? body.data : []);

        setCandidates(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load candidates");
      } finally {
        setLoadingCand(false);
      }
    };
    run();
  }, [selectedPos]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return candidates;
    return candidates.filter((c) =>
      [c.name, c.full_name, c.email, c.phone, c.mobile]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [candidates, query]);

  const allVisibleIds = useMemo(
    () => filtered.map((c) => c.id || c.candidate_id || c._id),
    [filtered]
  );

  const isAllVisibleSelected =
    allVisibleIds.length > 0 &&
    allVisibleIds.every((id) => selectedCandidates.has(id));

  const toggleAllVisible = (checked) => {
    setSelectedCandidates((prev) => {
      const next = new Set(prev);
      if (checked) {
        allVisibleIds.forEach((id) => next.add(id));
      } else {
        allVisibleIds.forEach((id) => next.delete(id));
      }
      return next;
    });
  };

  const toggleOne = (id, checked) => {
    setSelectedCandidates((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handleAssign = async () => {
    if (!selectedPos || selectedCandidates.size === 0) return;
    setAssigning(true);
    try {
      // Build candidateIds as the API expects (UUIDs from candidate.candidate_id)
      const ids = Array.from(selectedCandidates)
        .map((selId) => {
          const obj = candidates.find(
            (c) => (c.id || c.candidate_id || c._id) === selId
          );
          return obj?.candidate_id ?? selId; // fallback if we already stored candidate_id
        })
        .filter(Boolean);

      const res = await apiService.bulkShortlistCandidates(selectedPos, ids);
      const body = res?.data ?? res; // works whether interceptor returns response or data
      const ok = body?.success ?? true;

      if (ok) {
        toast.success(`Assigned ${ids.length} candidate(s) to the position.`);
        // Refresh the "not-applied" list so assigned ones disappear
        setSelectedCandidates(new Set());
        setLoadingCand(true);
        try {
          const ref = await apiService.getNotAppliedBulkUploadCandidates(selectedPos);
          const payload = ref?.data ?? ref;
          const list = Array.isArray(payload) ? payload : payload?.data ?? [];
          setCandidates(Array.isArray(list) ? list : []);
        } finally {
          setLoadingCand(false);
        }
      } else {
        toast.error(body?.message || "Assignment failed");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to assign candidates");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="flex flex-col h-screen py-4 px-3 min-h-0">
      <BulkTiles />

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm mb-3 border-0">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">Requisition</label>
              <select
                className="grid px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                value={selectedReq}
                onChange={(e) => setSelectedReq(e.target.value)}
                disabled={loadingReq}
              >
                <option value="" className="text-gray-500">
                  {loadingReq ? "Loading…" : "Select requisition"}
                </option>
                {requisitions.map((r) => (
                  <option
                    key={r.requisition_id || r.id}
                    value={r.requisition_id || r.id}
                  >
                    {r.requisition_title ||
                      r.title ||
                      `REQ-${r.requisition_id || r.id}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <select
                className={`grid px-3 py-2 border ${!selectedReq ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                value={selectedPos}
                onChange={(e) => setSelectedPos(e.target.value)}
                disabled={!selectedReq || loadingPos}
              >
                <option value="" className="text-gray-500">
                  {loadingPos
                    ? "Loading…"
                    : selectedReq
                    ? "Select position"
                    : "Select requisition first"}
                </option>
                {positions.map((p) => (
                  <option key={p.position_id || p.id} value={p.position_id || p.id}>
                    {p.position_title ||
                      p.title ||
                      `POS-${p.position_id || p.id}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Search field - commented out as per original
            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search candidates (name, email, phone)…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={loadingCand || candidates.length === 0}
                />
              </div>
            </div>
            */}
          </div>
        </div>
      </div>

      {/* Candidates table */}
      <div className="bg-white rounded-lg shadow-sm flex-1 overflow-hidden flex flex-col min-h-0">
        <div className="p-0 flex flex-col min-h-0">
          {loadingCand ? (
            <div className="flex items-center justify-center py-5 text-gray-500">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
              Loading candidates…
            </div>
          ) : !selectedPos ? (
            <div className="text-center text-gray-500 py-5">
              Select a position to load candidates.
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center text-gray-500 py-5">
              No candidates found for this position.
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="px-3 py-2 text-sm text-gray-500 flex justify-between items-center">
                <div className="mt-2">
                  <p className="text-gray-500">Showing {filtered.length} of {candidates.length}</p>
                </div>
                <div className="flex gap-3 h-10">
                  <div className="relative flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-3 px-2 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-96 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Search candidates..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      disabled={loadingCand || candidates.length === 0}
                    />
                  </div>
                  <button
                    onClick={handleAssign}
                    disabled={assigning || loadingCand || !selectedPos || !selectedCandidates.size}
                    className={`bg-[#2d2d58] inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                      assigning || loadingCand || !selectedPos || !selectedCandidates.size
                        ? 'bg-blue-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    }`}
                  >
                    {assigning ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Assigning…
                      </>
                    ) : (
                      `Assign to position`
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                <div className="min-w-full overflow-hidden">
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={filtered.length > 0 && filtered.every(c => selectedCandidates.has(c.candidate_id || c.id))}
                            onChange={(e) => toggleAllVisible(e.target.checked)}
                            disabled={filtered.length === 0}
                          />
                        </th>
                        <th scope="col" className="px-6 py-3 text-left font-semibold text-base">Name</th>
                        <th scope="col" className="px-6 py-3 text-left font-semibold text-base">Email</th>
                        <th scope="col" className="px-6 py-3 text-left font-semibold text-base">Phone</th>
                        <th scope="col" className="px-6 py-3 text-left font-semibold text-base w-1/4">Education Qualification</th>
                        <th scope="col" className="px-6 py-3 text-left font-semibold text-base w-24">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filtered.map((candidate) => (
                        <tr key={candidate.candidate_id || candidate.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              checked={selectedCandidates.has(candidate.candidate_id || candidate.id)}
                              onChange={(e) => toggleOne(candidate.candidate_id || candidate.id, e.target.checked)}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {candidate.full_name || candidate.name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {candidate.email || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {candidate.phone || 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700 break-words">
                            {candidate.education_qualification || candidate.highest_qualification || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openCandidate(candidate)}
                              className="text-gray-500 hover:text-gray-700 p-1 transition-colors"
                              title="View Candidate"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-between items-center px-3 py-2 border-t border-gray-200 bg-gray-50">
                <span className="text-sm text-gray-500">
                  Selected: {selectedCandidates.size}
                </span>
              </div>

              <CandidateDetailsModal
                show={showDetails}
                onHide={() => setShowDetails(false)}
                data={candidateDetails}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
