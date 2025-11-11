import React, { useState, useRef, useEffect } from 'react';
import { Button, OverlayTrigger, Popover, Overlay, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import RelaxationPolicyDetails from './RelaxationPolicyDetails';
const JobCreationForm = ({
  formData,
  errors,
  handleInputChange,
  handleSubmit,
  handleCancel,
  requisitionIdOptions = [],
  positionTitleOptions = [],
  departmentOptions = [],
  countryOptions = [],
  stateOptions = [],
  cityOptions = [],
  locationOptions = [],
  gradeIdOptions = [],
  employmentTypeOptions = [],
  gradeMeta = [],
  // New prop to receive full requisition data
  requisitionData = [],
  readOnly = false,
  positionList = [],
  showNextButton = false,
  relaxationPolicies = []
}) => {
  // Remove modal state, use popover instead

  const [showGradeInfo, setShowGradeInfo] = useState(false);
  const gradeInfoRef = useRef(null);
  const [showRelaxationModal, setShowRelaxationModal] = useState(false);
  // Close popover whenever the selected grade changes or gets cleared
  useEffect(() => {
    setShowGradeInfo(false);
  }, [formData.grade_id]);
  console.log("Position List:", positionList);
  // Find the selected requisition's details (handle both string and number id)
  const selectedRequisition = requisitionData.find(
    (req) => String(req.requisition_id) === String(formData.requisition_id)
  );
  // Debug: log the selected requisition to help diagnose issues
  // console.log('Selected Requisition:', selectedRequisition);

  // Find the selected relaxation policy
  const selectedRelaxationPolicy = relaxationPolicies.find(
    (p) => String(p.job_relaxation_policy_id) === String(formData.job_relaxation_policy_id)
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-[0_10px_30px_rgba(26,44,113,0.2)]">
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm" onSubmit={handleSubmit}>
        {/* Requisition ID */}

        <div className="space-y-1">
          <label htmlFor="requisition_id" className="block text-sm font-medium text-gray-700">
            Requisition ID <span className="text-red-500">*</span>
            {formData.requisition_id && selectedRequisition && (
              <OverlayTrigger
                trigger="click"
                placement="right"
                rootClose
                overlay={
                  <Popover className="min-w-[250px] popbg">
                    <Popover.Header className="text-base font-semibold p-3 bg-gray-100 border-b border-gray-200">
                      {selectedRequisition.requisition_code || selectedRequisition.requisition_title || 'Requisition Details'}
                    </Popover.Header>
                    <Popover.Body className="p-3 text-sm">
                      <div className="mb-1"><span className="font-medium">Position Title:</span> {selectedRequisition.requisition_title || selectedRequisition.requisition_title || '-'}</div>
                      <div className="mb-1"><span className="font-medium">Number of positions:</span> {selectedRequisition.no_of_positions || selectedRequisition.no_of_positions || '-'}</div>
                      <div className="mb-1"><span className="font-medium">Start date:</span> {selectedRequisition.registration_start_date || selectedRequisition.registration_start_date || '-'}</div>
                      <div><span className="font-medium">End date:</span> {selectedRequisition.registration_end_date || selectedRequisition.registration_end_date || '-'}</div>
                    </Popover.Body>
                  </Popover>
                }
              >
                <span className="inline-block ml-1 spadei cursor-pointer">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-blue-500 text-base"
                    tabIndex={0}
                  />
                </span>
              </OverlayTrigger>
            )}
          </label>

          <select
            id="requisition_id"
            name="requisition_id"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-100"
            value={formData.requisition_id || ""}
            onChange={handleInputChange}
            disabled={!!formData.requisition_id}
          >
            <option value="">Select Requisition ID</option>
            {requisitionIdOptions.map((option) => {
              const reqDetails = requisitionData.find(
                (req) => String(req.requisition_id) === String(option.id)
              );
              return (
                <option key={option.id} value={option.id}>
                  {option.name}
                  {reqDetails?.requisition_title ? ` - ${reqDetails.requisition_title}` : ""}
                </option>
              );
            })}
          </select>
          {errors.requisition_id && <p className="mt-1 text-sm text-red-600">{errors.requisition_id}</p>}
        </div>
        {/* The rest of your form fields go here */}

        {/* Position Title */}
        <div className="space-y-1">
          <label htmlFor="position_title" className="block text-sm font-medium text-gray-700">
            Position Title <span className="text-red-500">*</span>
          </label>
          <select
            id="position_title"
            name="position_title"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-100"
            value={formData.position_title || ""}
            onChange={(e) => {
              const selectedTitle = e.target.value;

              // Save selected position title
              handleInputChange({ target: { name: "position_title", value: selectedTitle } });

              // Find the full object from positionList
              const selectedPosition = (positionList || []).find(
                (pos) => pos.position_title === selectedTitle
              );

              if (selectedPosition) {
                handleInputChange({
                  target: { name: "description", value: selectedPosition.description ?? "" },
                });

                handleInputChange({
                  target: { name: "grade_id", value: String(selectedPosition.job_grade_id ?? "") },
                });

                handleInputChange({
                  target: { name: "position_code", value: selectedPosition.position_code ?? "" },
                });

                // If grade_id is not 0 → reset salary
                if (selectedPosition.jobGradeId && selectedPosition.jobGradeId !== 0) {
                  handleInputChange({ target: { name: "min_salary", value: "" } });
                  handleInputChange({ target: { name: "max_salary", value: "" } });
                }
                handleInputChange({
                  target: { name: "dept_id", value: selectedPosition.dept_id ?? "" },
                });
              }
            }}
            disabled={readOnly}
          >
            <option value="">Select Position Title</option>
            {(positionList || []).map((pos, idx) => (
              <option key={idx} value={pos.position_title}>
                {pos.position_title}
              </option>
            ))}
          </select>
          {errors.position_title && <p className="mt-1 text-sm text-red-600">{errors.position_title}</p>}
        </div>

        {/* Department */}
        <div className="space-y-1">
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            id="department"
            name="dept_id"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-100"
            value={formData.dept_id}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value="">Select Department</option>
            {departmentOptions.map(option => (
              <option key={option.department_id || option.department_name} value={option.department_id}>{option.department_name}</option>
            ))}
          </select>
          {errors.dept_id && <p className="mt-1 text-sm text-red-600">{errors.dept_id}</p>}
        </div>

        {/* Country */}
        <div className="space-y-1">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            name="country_id"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-100"
            value={formData.country_id}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value="">Select Country</option>
            {countryOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
          {errors.country_id && <p className="mt-1 text-sm text-red-600">{errors.country_id}</p>}
        </div>

        {/* State */}
        <div className="space-y-1">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <select
            id="state"
            name="state_id"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-100"
            value={formData.state_id}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value="">Select State</option>
            {stateOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
          {errors.state_id && <p className="mt-1 text-sm text-red-600">{errors.state_id}</p>}
        </div>

        {/* City */}
        <div className="space-y-1">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <select
            id="city"
            name="city_id"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-100"
            value={formData.city_id}
            disabled={readOnly}
            onChange={handleInputChange}
          >
            <option value="">Select City</option>
            {cityOptions.map(option => (
              <option key={option.id || option.name} value={option.id}>{option.name}</option>
            ))}
          </select>
          {errors.city_id && <p className="mt-1 text-sm text-red-600">{errors.city_id}</p>}
        </div>

        {/* Location */}
        <div className="space-y-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <select
            id="location"
            name="location_id"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-100"
            value={formData.location_id}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value="">Select Location</option>
            {locationOptions.map(option => (
              <option key={option.id || option.name} value={option.id}>{option.name}</option>
            ))}
          </select>
          {errors.location_id && <p className="mt-1 text-sm text-red-600">{errors.location_id}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="no_of_vacancies" className="block text-sm font-medium text-gray-700">
            Vacancies <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
            id="no_of_vacancies"
            name="no_of_vacancies"
            value={formData.no_of_vacancies}
            onChange={handleInputChange}
            min="1"
            disabled={readOnly}
          />
          {errors.no_of_vacancies && <p className="mt-1 text-sm text-red-600">{errors.no_of_vacancies}</p>}
        </div>

        {/* Grade ID */}
        <div className="space-y-1">
          <div className="flex items-center">
            <label htmlFor="grade_id" className="block text-sm font-medium text-gray-700">
              Grade/Scale <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              ref={gradeInfoRef}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                setShowGradeInfo(v => !v);
              }}
              aria-label="Show grade details"
            >
             <span className="inline-block spadei ml-1 cursor-pointer">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-blue-500 text-base"
                    tabIndex={0}
                  />
                </span>
            </button>
          </div>

          <Overlay
            target={gradeInfoRef.current}
            show={showGradeInfo}
            placement="right"
            rootClose
            onHide={() => setShowGradeInfo(false)}
            transition={false}
            container={typeof document !== 'undefined' ? document.body : undefined}
            popperConfig={{
              strategy: 'fixed',
              modifiers: [
                { name: 'flip', enabled: false },
                { name: 'preventOverflow', options: { altAxis: true } },
              ],
            }}
          >
            <Popover className="min-w-[220px] popbg">
              <Popover.Header className="text-base font-semibold p-3 bg-gray-100 border-b border-gray-200">
                Grade Details
              </Popover.Header>
              <Popover.Body className="p-3 text-sm">
                {(() => {
                  const g = (gradeMeta || []).find(
                    x => String(x.job_grade_id) === String(formData.grade_id)
                  );
                  if (!g) return <div>No details available</div>;
                  return (
                    <div className="space-y-1">
                      <div><span className="font-medium">Scale:</span> {g.job_scale ?? '-'}</div>
                      <div><span className="font-medium">Min Salary:</span> {g.min_salary ?? '-'}</div>
                      <div><span className="font-medium">Max Salary:</span> {g.max_salary ?? '-'}</div>
                    </div>
                  );
                })()}
              </Popover.Body>
            </Popover>
          </Overlay>






          <select
            id="grade_id"
            name="grade_id"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-100"
            value={formData.grade_id}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value="">Select Grade ID</option>
            {gradeIdOptions.map(option => (
              <option key={option.id || option.name} value={option.id}>{option.name}</option>
            ))}
          </select>
          {errors.grade_id && <p className="pmt-1 text-sm text-red-600">{errors.grade_id}</p>}
        </div>


        <div className="space-y-1">
          <label htmlFor="min_salary" className="block text-sm font-medium text-gray-700">
            Min Salary <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="min_salary"
            name="min_salary"
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${formData.grade_id !== "0" ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'
              }`}
            value={
              formData.min_salary
                ? Number(formData.min_salary).toLocaleString("en-IN") // Indian format commas
                : ""
            }
            onChange={(e) => {
              // remove commas before storing in state
              const rawValue = e.target.value.replace(/,/g, "");
              if (!isNaN(rawValue) && formData.grade_id === "0") {
                handleInputChange({
                  target: { name: "min_salary", value: rawValue },
                });
              }
            }}
            disabled={formData.grade_id !== "0" || readOnly}
          />
          {errors.min_salary && <div className="mt-1 text-sm text-red-600">{errors.min_salary}</div>}
        </div>

        <div className="space-y-1">
          <label htmlFor="max_salary" className="block text-sm font-medium text-gray-700">
            Max Salary <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="max_salary"
            name="max_salary"
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${formData.grade_id !== "0" ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'
              }`}
            value={
              formData.max_salary
                ? Number(formData.max_salary).toLocaleString("en-IN") // comma formatting
                : ""
            }
            onChange={(e) => {
              // remove commas before storing
              const rawValue = e.target.value.replace(/,/g, "");
              if (!isNaN(rawValue) && formData.grade_id === "0") {
                handleInputChange({
                  target: { name: "max_salary", value: rawValue },
                });
              }
            }}
            disabled={!(formData.grade_id === "0" && !readOnly)}
          />
          {errors.max_salary && <div className="pmt-1 text-sm text-red-600">{errors.max_salary}</div>}
        </div>



        {/* Employment Type */}
        <div className="space-y-1">
          <label htmlFor="employment_type" className="block text-sm font-medium text-gray-700">
            Employment Type <span className="text-red-500">*</span>
          </label>
          <select
            id="employment_type"
            name="employment_type"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-100"
            value={formData.employment_type}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value="">Select Employment Type</option>
            {employmentTypeOptions.map(option => (
              <option key={option.id || option.name} value={option.name}>{option.name}</option>
            ))}
          </select>
          {errors.employment_type && <p className="mt-1 text-sm text-red-600">{errors.employment_type}</p>}
        </div>

        {/* Eligibility Age Min */}
        <div className="space-y-1">
          <label htmlFor="eligibility_age_min" className="block text-sm font-medium text-gray-700">
            Eligibility Age Min <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="eligibility_age_min"
            name="eligibility_age_min"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
            value={formData.eligibility_age_min}
            onChange={handleInputChange}
            min="1"
            disabled={readOnly}
          />
          {errors.eligibility_age_min && <p className="mt-1 text-sm text-red-600">{errors.eligibility_age_min}</p>}
        </div>

        {/* Eligibility Age Max */}
        <div className="space-y-1">
          <label htmlFor="eligibility_age_max" className="block text-sm font-medium text-gray-700">
            Eligibility Age Max <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="eligibility_age_max"
            name="eligibility_age_max"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
            value={formData.eligibility_age_max}
            onChange={handleInputChange}
            min="1"
            disabled={readOnly}
          />
          {errors.eligibility_age_max && <p className="mt-1 text-sm text-red-600">{errors.eligibility_age_max}</p>}
        </div>

        {/* Mandatory Experience */}
        <div className="space-y-1">
          <label htmlFor="mandatory_experience" className="block text-sm font-medium text-gray-700">
            Mandatory Experience (Years) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="mandatory_experience"
            name="mandatory_experience"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
            value={formData.mandatory_experience}
            onChange={handleInputChange}
            min="1"
            step="any"
            disabled={readOnly}
          />
          {errors.mandatory_experience && <p className="mt-1 text-sm text-red-600">{errors.mandatory_experience}</p>}
        </div>

        {/* Preferred Experience */}
        <div className="space-y-1">
          <label htmlFor="preferred_experience" className="block text-sm font-medium text-gray-700">
            Preferred Experience (Years)
          </label>
          <input
            type="number"
            id="preferred_experience"
            name="preferred_experience"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
            value={formData.preferred_experience}
            onChange={handleInputChange}
            min="1"
            step="any"
            disabled={readOnly}
          />
          {errors.preferred_experience && <p className="mt-1 text-sm text-red-600">{errors.preferred_experience}</p>}
        </div>

        {/* Probation Period */}
        <div className="space-y-1">
          <label htmlFor="probation_period" className="block text-sm font-medium text-gray-700">
            Probation Period (Months)
          </label>
          <input
            type="text"
            id="probation_period"
            name="probation_period"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
            value={formData.probation_period}
            onChange={handleInputChange}
            disabled={readOnly}
          />
          {errors.probation_period && <p className="mt-1 text-sm text-red-600">{errors.probation_period}</p>}
        </div>

        {/* Min Credit Score */}
        <div className="space-y-1">
          <label htmlFor="min_credit_score" className="block text-sm font-medium text-gray-700">
            Min Credit Score
          </label>
          <input
            type="text"
            id="min_credit_score"
            name="min_credit_score"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
            value={formData.min_credit_score}
            onChange={handleInputChange}
            disabled={readOnly}
          />
          {errors.min_credit_score && <p className="mt-1 text-sm text-red-600">{errors.min_credit_score}</p>}
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 col-span-2">
          {/* Left Column */}

          {/* Description */}
          <div className="space-y-1">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
              rows={6}
              disabled={readOnly}
              value={formData.description || ''}
              onChange={handleInputChange}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>
          {/* Roles & Responsibilities */}
          <div className="space-y-2">
            <label htmlFor="roles_responsibilities" className="block text-sm font-medium text-gray-700">
              Roles & Responsibilities <span className="text-red-500">*</span>
            </label>
            <textarea
              id="roles_responsibilities"
              name="roles_responsibilities"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
              value={formData.roles_responsibilities || ''}
              onChange={handleInputChange}
              disabled={readOnly}
              rows={6}
            />
            {errors.roles_responsibilities && <p className="mt-1 text-sm text-red-600">{errors.roles_responsibilities}</p>}
          </div>
 </div>
          {/* Documents Required */}
          <div className="space-y-2">
            <label htmlFor="documents_required" className="block text-sm font-medium text-gray-700">
              Documents Required <span className="text-red-500">*</span>
            </label>
            <textarea
              id="documents_required"
              name="documents_required"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
              rows={6}
              disabled={readOnly}
              value={formData.documents_required || ''}
              onChange={handleInputChange}
            />
            {errors.documents_required && <p className="mt-1 text-sm text-red-600">{errors.documents_required}</p>}
          </div>
          {/* Selection Process */}
          <div className="space-y-2">
            <label htmlFor="selection_procedure" className="block text-sm font-medium text-gray-700">
              Selection Process
            </label>
            <textarea
              id="selection_procedure"
              name="selection_procedure"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
              value={formData.selection_procedure || ''}
              onChange={handleInputChange}
              disabled={readOnly}
              rows={6}
            />
            {errors.selection_procedure && <p className="mt-1 text-sm text-red-600">{errors.selection_procedure}</p>}
          </div>

          {/* Mandatory Qualification */}
          <div className="space-y-2">
            <label htmlFor="mandatory_qualification" className="block text-sm font-medium text-gray-700">
              Mandatory Qualification <span className="text-red-500">*</span>
            </label>
            <textarea
              id="mandatory_qualification"
              name="mandatory_qualification"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
              value={formData.mandatory_qualification || ''}
              onChange={handleInputChange}
              disabled={readOnly}
              rows={6}
            />
            {errors.mandatory_qualification && <p className="mt-1 text-sm text-red-600">{errors.mandatory_qualification}</p>}
          </div>

          {/* Preferred Qualification */}
          <div className="space-y-2">
            <label htmlFor="preferred_qualification" className="block text-sm font-medium text-gray-700">
              Preferred Qualification
            </label>
            <textarea
              id="preferred_qualification"
              name="preferred_qualification"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
              value={formData.preferred_qualification || ''}
              onChange={handleInputChange}
              disabled={readOnly}
              rows={6}
            />
            {errors.preferred_qualification && <p className="mt-1 text-sm text-red-600">{errors.preferred_qualification}</p>}
          </div>

        {/* Close the grid container */}

        {!readOnly
          // <div className="d-flex justify-content-end mt-1 gap-2 col-12" style={{ fontSize: '0.9rem' }}>
          //   {/* <Button variant="outline-secondary" onClick={handleCancel}>Clear</Button> */}
          //   <Button type="submit" className="text-white" style={{ backgroundColor: '#746def', borderColor: '#746def' }}>
          // { formData.position_id ? 'Update' : 'Save' }
          //   </Button>
          // </div>
        }

        {!readOnly && (
          <div className="">


            <div>
              <Button
                onClick={handleCancel}
                className=" mr-15 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 btn"
                style={{ backgroundColor: '#fff', borderColor: '#000', color: '#000', padding:'8px' }}

              >
                Cancel
              </Button>
              {showNextButton ? (
                <Button
                  type="submit"
                  className="text-white rounded btn"
                  style={{ backgroundColor: '#2d2d58', borderColor: '#2d2d58', padding:'8px' }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="text-white rounded btn"
                  style={{ backgroundColor: '#2d2d58', borderColor: '#2d2d58', padding:'8px' }}
                >
                  {formData.position_id ? 'Update' : 'Save'}
                </Button>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default JobCreationForm;