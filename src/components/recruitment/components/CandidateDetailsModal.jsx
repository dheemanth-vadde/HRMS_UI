import React, { useMemo } from "react";

const V = (v, dash = "-") => (v === 0 || v ? String(v) : dash);

// naive path→URL helper; replace with your own mapping if needed
const resumeLinkFrom = (file_url) => {
  if (!file_url) return null;
  // EXAMPLES: adapt one of these to your backend
  // return `/api/files/stream?path=${encodeURIComponent(file_url)}`;
  // return file_url.replace("E:\\var\\www\\html\\documents", "/documents").replace(/\\/g, "/");
  return file_url; // temporary direct link (works only if server serves it)
};

export default function CandidateDetailsModal({ show, onHide, data = {} }) {
  const {
    candidate_id,
    full_name,
    email,
    phone,
    address,
    created_date,
    skills,
    current_designation,
    current_employer,
    education_qualification,
    total_experience,
    file_url,
    comments,
  } = data || {};

  const resumeURL = resumeLinkFrom(file_url);

  // present skills as pills if possible (but keep raw fallback)
  const skillList = useMemo(() => {
    if (Array.isArray(skills)) return skills.filter(Boolean).map(String);
    if (typeof skills === "string") {
      const arr = skills.split(/[,|]/).map((s) => s.trim()).filter(Boolean);
      return arr;
    }
    return [];
  }, [skills]);

  // nicer labels
  const expLabel =
    total_experience === 0 || total_experience
      ? `${total_experience} ${Number(total_experience) === 1 ? "yr" : "yrs"}`
      : null;

  const createdLabel = created_date
    ? new Date(created_date).toLocaleString()
    : "-";

  // address can stay as-is (string). If object ever comes, join gracefully.
  const addressText = useMemo(() => {
    if (!address) return "-";
    if (typeof address === "string") return address;
    if (typeof address === "object") {
      const parts = [address.street, address.city, address.state, address.country, address.zip]
        .filter(Boolean);
      return parts.length ? parts.join(", ") : "-";
    }
    return "-";
  }, [address]);

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${show ? 'block' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen ptail-4 pxtail-2 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bgcolor" onClick={onHide}></div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white pxtail-2 padtb sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center pab-1 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Candidate Details</h3>
              <button
                onClick={onHide}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Summary */}
            <div className="mt-4 flex flex-col md:flex-row justify-between">
              <div className="md:w-2/3">
                <h5 className="text-lg font-medium text-gray-900 mb-1">{V(full_name)}</h5>
                <div className="text-sm text-gray-500">ID: {V(candidate_id)}</div>
                <div className="text-sm text-gray-500">{V(email)} • {V(phone)}</div>
              </div>
              <div className="mt-2 md:mt-0 md:text-right">
                {expLabel && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                    Exp: {expLabel}
                  </span>
                )}
              </div>
            </div>

            {/* Meta */}
            <div className="p-4 border border-gray-200 rounded-lg mb-4 mt-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Designation</div>
                  <div className="font-medium text-gray-900">{V(current_designation)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Employer</div>
                  <div className="font-medium text-gray-900">{V(current_employer)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Created</div>
                  <div className="font-medium text-gray-900">{createdLabel}</div>
                </div>
              </div>
            </div>

            {/* Address + Education */}
            <div className="p-4 border border-gray-200 rounded-lg mb-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Address</div>
                  <div className="font-medium text-gray-900">{addressText}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Education</div>
                  <div className="font-medium text-gray-900">{V(education_qualification)}</div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Skills</div>
              {skillList.length ? (
                <div className="flex flex-wrap gap-2">
                  {skillList.map((s, i) => (
                    <span 
                      key={`${s}-${i}`} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              ) : (
                <div>{V(skills)}</div>
              )}
            </div>

            {/* Resume */}
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Resume</div>
              {resumeURL ? (
                <a 
                  href={resumeURL} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  View / Download
                </a>
              ) : (
                <span>-</span>
              )}
            </div>

            {/* Comments */}
            {comments && (
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-1">Comments</div>
                <div className="p-2 border border-gray-200 rounded text-sm text-gray-700 whitespace-pre-wrap">
                  {comments}
                </div>
              </div>
            )}
          </div>

          <div className="px-4 py-3 sm:px-6 flex justify-end">
  <button
    type="button"
    onClick={onHide}
    className="bg-[#2d2d58] inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    Close
  </button>
</div>
        </div>
      </div>
    </div>
  );
}
