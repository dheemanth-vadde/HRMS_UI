// JobCreationForm.jsx
import React, { useState, useRef, useEffect } from 'react';
import { OverlayTrigger, Popover, Overlay } from 'react-bootstrap';
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
  requisitionData = [],
  readOnly = false,
  positionList = [],
  showNextButton = false,
  relaxationPolicies = []
}) => {
  const [showGradeInfo, setShowGradeInfo] = useState(false);
  const gradeInfoRef = useRef(null);
  const [showRelaxationModal, setShowRelaxationModal] = useState(false);

  useEffect(() => {
    setShowGradeInfo(false);
  }, [formData.grade_id]);

  const selectedRequisition = requisitionData.find(
    (req) => String(req.requisition_id) === String(formData.requisition_id)
  );

  const selectedRelaxationPolicy = relaxationPolicies.find(
    (p) => String(p.job_relaxation_policy_id) === String(formData.job_relaxation_policy_id)
  );

  return (
    <div className="bg-white rounded-lg shadow-[0_10px_30px_rgba(26,44,113,0.2)] p-6 mx-2">
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" onSubmit={handleSubmit}>
        {/* Requisition ID */}
        <div className="space-y-1">
          <label htmlFor="requisition_id" className="text-[#162b75] text-sm font-medium flex items-center gap-1">
            Requisition ID <span className="text-red-500">*</span>
            {formData.requisition_id && selectedRequisition && (
              <OverlayTrigger
                trigger="click"
                placement="right"
                rootClose
                overlay={
                  <Popover className="min-w-[250px]">
                    <Popover.Header className="text-base font-semibold">
                      {selectedRequisition.requisition_code || selectedRequisition.requisition_title || 'Requisition Details'}
                    </Popover.Header>
                    <Popover.Body className="text-sm space-y-1">
                      <div><span className="font-medium">Position Title:</span> {selectedRequisition.requisition_title || selectedRequisition.requisition_title || '-'}</div>
                      <div><span className="font-medium">Number of positions:</span> {selectedRequisition.no_of_positions || selectedRequisition.no_of_positions || '-'}</div>
                      <div><span className="font-medium">Start date:</span> {selectedRequisition.registration_start_date || selectedRequisition.registration_start_date || '-'}</div>
                      <div><span className="font-medium">End date:</span> {selectedRequisition.registration_end_date || selectedRequisition.registration_end_date || '-'}</div>
                    </Popover.Body>
                  </Popover>
                }
              >
                <span className="inline-block cursor-pointer">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            value={formData.requisition_id || ""}
            onChange={handleInputChange}
            disabled={!!formData.requisition_id}
          >
            <option value="" className="text-gray-400">Select Requisition ID</option>
            {requisitionIdOptions.map((option) => {
              const reqDetails = requisitionData.find(
                (req) => String(req.requisition_id) === String(option.id)
              );
              return (
                <option key={option.id} value={option.id} className="text-gray-900">
                  {option.name}
                  {reqDetails?.requisition_title ? ` - ${reqDetails.requisition_title}` : ""}
                </option>
              );
            })}
          </select>
          {errors.requisition_id && <p className="mt-1 text-sm text-red-600">{errors.requisition_id}</p>}
        </div>

        {/* Position Title */}
        <div className="space-y-1">
          <label htmlFor="position_title" className="text-[#162b75] text-sm font-medium">
            Position Title <span className="text-red-500">*</span>
          </label>
          <select
            id="position_title"
            name="position_title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            value={formData.position_title || ""}
            onChange={(e) => {
              const selectedTitle = e.target.value;
              handleInputChange({ target: { name: "position_title", value: selectedTitle } });
              
              const selectedPosition = (positionList || []).find(
                (pos) => pos.position_title === selectedTitle
              );

              if (selectedPosition) {
                handleInputChange({
                  target: { name: "description", value: selectedPosition.description ?? "" },
                });
              
                handleInputChange({
                  target: { name: "grade_id", value: String(selectedPosition.jobGradeId ?? "") },
                });
              
                handleInputChange({
                  target: { name: "position_code", value: selectedPosition.position_code ?? "" },
                });
              
                if (selectedPosition.jobGradeId && selectedPosition.jobGradeId !== 0) {
                  handleInputChange({ target: { name: "min_salary", value: "" } });
                  handleInputChange({ target: { name: "max_salary", value: "" } });
                }
                handleInputChange({
                  target: { name: "dept_id", value: selectedPosition.deptId ?? "" },
                });
              }
            }}
            disabled={readOnly}
          >
            <option value="" className="text-gray-400">Select Position Title</option>
            {(positionList || []).map((pos, idx) => (
              <option key={idx} value={pos.position_title} className="text-gray-900">
                {pos.position_title}
              </option>
            ))}
          </select>
          {errors.position_title && <p className="mt-1 text-sm text-red-600">{errors.position_title}</p>}
        </div>

        {/* Department */}
        <div className="space-y-1">
          <label htmlFor="department" className="text-[#162b75] text-sm font-medium">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            id="department"
            name="dept_id"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            value={formData.dept_id}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value="" className="text-gray-400">Select Department</option>
            {departmentOptions.map(option => (
              <option 
                key={option.department_id || option.department_name} 
                value={option.department_id}
                className="text-gray-900"
              >
                {option.department_name}
              </option>
            ))}
          </select>
          {errors.dept_id && <p className="mt-1 text-sm text-red-600">{errors.dept_id}</p>}
        </div>

        {/* Country */}
        <div className="space-y-1">
          <label htmlFor="country" className="text-[#162b75] text-sm font-medium">
            Country
          </label>
          <select
            id="country"
            name="country_id"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            value={formData.country_id}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value="" className="text-gray-400">Select Country</option>
            {countryOptions.map(option => (
              <option key={option.id} value={option.id} className="text-gray-900">
                {option.name}
              </option>
            ))}
          </select>
          {errors.country_id && <p className="mt-1 text-sm text-red-600">{errors.country_id}</p>}
        </div>

        {/* State */}
        <div className="space-y-1">
          <label htmlFor="state" className="text-[#162b75] text-sm font-medium">
            State
          </label>
          <select
            id="state"
            name="state_id"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            value={formData.state_id}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value="" className="text-gray-400">Select State</option>
            {stateOptions.map(option => (
              <option key={option.id} value={option.id} className="text-gray-900">
                {option.name}
              </option>
            ))}
          </select>
          {errors.state_id && <p className="mt-1 text-sm text-red-600">{errors.state_id}</p>}
        </div>

        {/* City */}
        <div className="space-y-1">
          <label htmlFor="city" className="text-[#162b75] text-sm font-medium">
            City
          </label>
          <select 
            id="city" 
            name="city_id" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            value={formData.city_id} 
            disabled={readOnly} 
            onChange={handleInputChange}
          >
            <option value="" className="text-gray-400">Select City</option>
            {cityOptions.map(option => (
              <option key={option.id || option.name} value={option.id} className="text-gray-900">
                {option.name}
              </option>
            ))}
          </select>
          {errors.city_id && <p className="mt-1 text-sm text-red-600">{errors.city_id}</p>}
        </div>

        {/* Location */}
        <div className="space-y-1">
          <label htmlFor="location" className="text-[#162b75] text-sm font-medium">
            Location
          </label>
          <select
            id="location"
            name="location_id"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            value={formData.location_id}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value="" className="text-gray-400">Select Location</option>
            {locationOptions.map(option => (
              <option key={option.id || option.name} value={option.id} className="text-gray-900">
                {option.name}
              </option>
            ))}
          </select>
          {errors.location_id && <p className="mt-1 text-sm text-red-600">{errors.location_id}</p>}
        </div>

        {/* Vacancies */}
        <div className="space-y-1">
          <label htmlFor="no_of_vacancies" className="text-[#162b75] text-sm font-medium">
            Vacancies <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            id="no_of_vacancies"
            name="no_of_vacancies"
            value={formData.no_of_vacancies}
            onChange={handleInputChange}
            min="1"
            disabled={readOnly}
          />
          {errors.no_of_vacancies && <p className="mt-1 text-sm text-red-600">{errors.no_of_vacancies}</p>}
        </div>

        {/* Grade/Scale */}
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <label htmlFor="grade_id" className="text-[#162b75] text-sm font-medium">
              Grade/Scale <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              ref={gradeInfoRef}
              className="p-0 bg-transparent border-0 text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-0"
              onClick={(e) => {
                e.stopPropagation();
                setShowGradeInfo(v => !v);
              }}
              aria-label="Show grade details"
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-base"
              />
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
            <Popover className="min-w-[220px]">
              <Popover.Header className="text-base font-semibold">
                Grade Details
              </Popover.Header>
              <Popover.Body className="text-sm space-y-1">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            value={formData.grade_id}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value="" className="text-gray-400">Select Grade ID</option>
            {gradeIdOptions.map(option => (
              <option key={option.id || option.name} value={option.id} className="text-gray-900">
                {option.name}
              </option>
            ))}
          </select>
          {errors.grade_id && <p className="mt-1 text-sm text-red-600">{errors.grade_id}</p>}
        </div>

        {/* Min Salary */}
        <div className="space-y-1">
          <label htmlFor="min_salary" className="text-[#162b75] text-sm font-medium">
            Min Salary <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="min_salary"
            name="min_salary"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            value={
              formData.min_salary
                ? Number(formData.min_salary).toLocaleString("en-IN")
                : ""
            }
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (!isNaN(rawValue)) {
                handleInputChange({
                  target: { name: "min_salary", value: rawValue },
                });
              }
            }}
            disabled={!(formData.grade_id === "0" && !readOnly)}
          />
          {errors.min_salary && <p className="mt-1 text-sm text-red-600">{errors.min_salary}</p>}
        </div>

        {/* Max Salary */}
        <div className="space-y-1">
          <label htmlFor="max_salary" className="text-[#162b75] text-sm font-medium">
            Max Salary <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="max_salary"
            name="max_salary"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            value={
              formData.max_salary
                ? Number(formData.max_salary).toLocaleString("en-IN")
                : ""
            }
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (!isNaN(rawValue)) {
                handleInputChange({
                  target: { name: "max_salary", value: rawValue },
                });
              }
            }}
            disabled={!(formData.grade_id === "0" && !readOnly)}
          />
          {errors.max_salary && <p className="mt-1 text-sm text-red-600">{errors.max_salary}</p>}
        </div>

        {/* Employment Type */}
        <div className="space-y-1">
          <label htmlFor="employment_type" className="text-[#162b75] text-sm font-medium">
            Employment Type <span className="text-red-500">*</span>
          </label>
          <select
            id="employment_type"
            name="employment_type"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            value={formData.employment_type}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value="" className="text-gray-400">Select Employment Type</option>
            {employmentTypeOptions.map((option) => (
              <option key={option.id || option.name} value={option.id || option.name} className="text-gray-900">
                {option.name || option}
              </option>
            ))}
          </select>
          {errors.employment_type && <p className="mt-1 text-sm text-red-600">{errors.employment_type}</p>}
        </div>

        {/* Min Age */}
        <div className="space-y-1">
          <label htmlFor="eligibility_age_min" className="text-[#162b75] text-sm font-medium">
            Min. Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="eligibility_age_min"
            name="eligibility_age_min"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            value={formData.eligibility_age_min}
            onChange={handleInputChange}
            min="18"
            max="100"
            disabled={readOnly}
          />
          {errors.eligibility_age_min && <p className="mt-1 text-sm text-red-600">{errors.eligibility_age_min}</p>}
        </div>

        {/* Max Age */}
        <div className="space-y-1">
          <label htmlFor="eligibility_age_max" className="text-[#162b75] text-sm font-medium">
            Max. Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="eligibility_age_max"
            name="eligibility_age_max"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            value={formData.eligibility_age_max}
            onChange={handleInputChange}
            min="18"
            max="100"
            disabled={readOnly}
          />
          {errors.eligibility_age_max && <p className="mt-1 text-sm text-red-600">{errors.eligibility_age_max}</p>}
        </div>

        {/* Job Description */}
        <div className="col-span-full space-y-1">
          <label htmlFor="description" className="text-[#162b75] text-sm font-medium">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
            disabled={readOnly}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Roles & Responsibilities */}
        <div className="col-span-full space-y-1">
          <label htmlFor="roles_responsibilities" className="text-[#162b75] text-sm font-medium">
            Roles & Responsibilities
          </label>
          <textarea
            id="roles_responsibilities"
            name="roles_responsibilities"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            rows="3"
            value={formData.roles_responsibilities}
            onChange={handleInputChange}
            disabled={readOnly}
          />
          {errors.roles_responsibilities && <p className="mt-1 text-sm text-red-600">{errors.roles_responsibilities}</p>}
        </div>
        <div className="col-span-full space-y-1">
          <label htmlFor="mandatory_experience" className="text-[#162b75] text-sm font-medium">Mandatory Experience(Years) <span className="required-asterisk">*</span></label>
          <input type="number" className="form-control" disabled={readOnly} id="mandatory_experience" name="mandatory_experience" value={formData.mandatory_experience} onChange={handleInputChange} min="1" step="any"/>
          {errors.mandatory_experience && <small className="error">{errors.mandatory_experience}</small>}
        </div>

        {/* Preferred Experience */}
        <div className="col-span-full space-y-1">
          <label htmlFor="preferred_experience" className="text-[#162b75] text-sm font-medium">Preferred Experience(Years)<span className="required-asterisk"></span></label>
          <input type="number" className="form-control" disabled={readOnly} id="preferred_experience" name="preferred_experience" value={formData.preferred_experience} onChange={handleInputChange} min="1" step="any"/>
          {errors.preferred_experience && <small className="error">{errors.preferred_experience}</small>}
        </div>

        {/* Probation Period */}
        <div className="col-span-full space-y-1">
          <label htmlFor="probation_period" className="text-[#162b75] text-sm font-medium">Probation Period(Months) <span className="required-asterisk"></span></label>
          <input type="text" className="form-control" disabled={readOnly} id="probation_period" name="probation_period" value={formData.probation_period} onChange={handleInputChange} />
          {errors.probation_period && <small className="error">{errors.probation_period}</small>}
        </div>

        {/* Min Credit Score */}
        <div className="col-span-full space-y-1">
          <label htmlFor="min_credit_score" className="text-[#162b75] text-sm font-medium">Min Credit Score <span className="required-asterisk"></span></label>
          <input type="text" className="form-control" disabled={readOnly} id="min_credit_score" name="min_credit_score" value={formData.min_credit_score} onChange={handleInputChange} />
          {errors.min_credit_score && <small className="error">{errors.min_credit_score}</small>}
        </div>

        {/* Relaxation Policy */}
        {/* <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label htmlFor="job_relaxation_policy_id" className="text-[#162b75] text-sm font-medium">
              Relaxation Policy
            </label>
            <button
              type="button"
              className="p-0 bg-transparent border-0 text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setShowRelaxationModal(true)}
              disabled={!formData.job_relaxation_policy_id}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-base"
              />
            </button>
          </div>
          <select
            id="job_relaxation_policy_id"
            name="job_relaxation_policy_id"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm text-gray-900"
            value={formData.job_relaxation_policy_id || ""}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value="" className="text-gray-400">Select Relaxation Policy</option>
            {relaxationPolicies.map((policy) => (
              <option 
                key={policy.job_relaxation_policy_id} 
                value={policy.job_relaxation_policy_id}
                className="text-gray-900"
              >
                {policy.policy_name}
              </option>
            ))}
          </select>
          {errors.job_relaxation_policy_id && <p className="mt-1 text-sm text-red-600">{errors.job_relaxation_policy_id}</p>}
        </div> */}

        {/* Form Actions */}
        <div className="col-span-full flex justify-end space-x-3 mt-6">
              
            <button
              type="button"
              onClick={handleCancel}
              variant="outline-secondary"
              className="px-4 mr-15 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-gradient-primary shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3"
          >
                  {formData.position_id ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
            
      {/* Relaxation Policy Modal
      {showRelaxationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">Relaxation Policy Details</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowRelaxationModal(false)}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <RelaxationPolicyDetails policyId={formData.job_relaxation_policy_id} />
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-end border-t border-gray-200">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setShowRelaxationModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default JobCreationForm;