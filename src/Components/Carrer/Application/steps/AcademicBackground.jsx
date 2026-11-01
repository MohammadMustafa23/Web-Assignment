/* oxlint-disable react(only-export-components) -- validation is co-located with its form fields. */

import FormField from "../fields/FormField";
import FormSelect from "../fields/FormSelect";

/* -----------------------------------------
   Constants & Options
----------------------------------------- */

const MAX_QUALIFICATIONS = 5;
const CURRENT_YEAR = new Date().getFullYear();

// oxlint-disable-next-line react/only-export-components
export const createEmptyQualification = () => ({
  highestQualification: "",
  degree: "",
  specialization: "",
  college: "",
  graduationYear: "",
  educationStatus: "",
  scoreSystem: "",
  scoreValue: "",
});

const HIGHEST_QUALIFICATION_OPTIONS = [
  { value: "high-school", label: "High School" },
  { value: "diploma", label: "Diploma" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "graduate", label: "Graduate" },
  { value: "postgraduate", label: "Postgraduate" },
  { value: "doctorate", label: "Doctorate" },
  { value: "other", label: "Other" },
];

const DEGREE_OPTIONS = [
  { value: "btech", label: "B.Tech" },
  { value: "be", label: "B.E." },
  { value: "bca", label: "BCA" },
  { value: "bsc", label: "B.Sc" },
  { value: "bcom", label: "B.Com" },
  { value: "ba", label: "B.A." },
  { value: "mtech", label: "M.Tech" },
  { value: "me", label: "M.E." },
  { value: "mca", label: "MCA" },
  { value: "msc", label: "M.Sc" },
  { value: "mba", label: "MBA" },
  { value: "phd", label: "Ph.D." },
  { value: "diploma", label: "Diploma" },
  { value: "other", label: "Other" },
];

const EDUCATION_STATUS_OPTIONS = [
  { value: "completed", label: "Completed" },
  { value: "pursuing", label: "Currently Pursuing" },
];

const SCORE_SYSTEM_OPTIONS = [
  { value: "percentage", label: "Percentage (%)" },
  { value: "cgpa_10", label: "CGPA (10-point scale)" },
  { value: "gpa_4", label: "GPA (4-point scale)" },
];

const NOTICE_PERIOD_OPTIONS = [
  { value: "immediate", label: "Immediate" },
  { value: "15-days", label: "15 Days" },
  { value: "30-days", label: "30 Days" },
  { value: "45-days", label: "45 Days" },
  { value: "60-days", label: "60 Days" },
  { value: "90-days", label: "90 Days" },
  { value: "negotiable", label: "Negotiable" },
  { value: "not-applicable", label: "Not Applicable" },
];

const GRADUATION_YEAR_OPTIONS = Array.from(
  { length: CURRENT_YEAR - 1965 + 6 },
  (_, index) => {
    const year = CURRENT_YEAR + 5 - index;

    return {
      value: String(year),
      label: String(year),
    };
  },
);

/* -----------------------------------------
   Section Icon
----------------------------------------- */

function GraduationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c3.5 3 8.5 3 12 0v-5M22 9v7" />
    </svg>
  );
}

/* -----------------------------------------
   Dynamic Qualification Validation
----------------------------------------- */

function validateQualification(qualification) {
  const errors = {};

  const degree = qualification.degree?.trim() || "";
  const specialization = qualification.specialization?.trim() || "";
  const college = qualification.college?.trim() || "";
  const graduationYear = qualification.graduationYear || "";
  const scoreValue = qualification.scoreValue?.trim() || "";

  if (!qualification.highestQualification) {
    errors.highestQualification = "Select your highest qualification.";
  } else if (
    !HIGHEST_QUALIFICATION_OPTIONS.some(
      (option) => option.value === qualification.highestQualification,
    )
  ) {
    errors.highestQualification = "Select a valid qualification.";
  }

  if (!degree) {
    errors.degree = "Degree / qualification is required.";
  } else if (!DEGREE_OPTIONS.some((option) => option.value === degree)) {
    errors.degree = "Select a valid degree.";
  }

  if (!specialization) {
    errors.specialization = "Specialization is required.";
  } else if (specialization.length > 100) {
    errors.specialization = "Maximum 100 characters allowed.";
  }

  if (!college) {
    errors.college = "College / university is required.";
  } else if (college.length > 150) {
    errors.college = "Maximum 150 characters allowed.";
  }

  if (!qualification.graduationYear) {
    errors.graduationYear = "Select your graduation year.";
  } else {
    const year = Number(graduationYear);

    if (
      !/^\d{4}$/.test(graduationYear) ||
      year < 1965 ||
      year > CURRENT_YEAR + 5
    ) {
      errors.graduationYear = "Select a valid graduation year.";
    }
  }

  if (!qualification.educationStatus) {
    errors.educationStatus = "Select your education status.";
  } else if (
    !EDUCATION_STATUS_OPTIONS.some(
      (option) => option.value === qualification.educationStatus,
    )
  ) {
    errors.educationStatus = "Select a valid education status.";
  }

  if (!qualification.scoreSystem) {
    errors.scoreSystem = "Select your score system.";
  } else if (
    !SCORE_SYSTEM_OPTIONS.some(
      (option) => option.value === qualification.scoreSystem,
    )
  ) {
    errors.scoreSystem = "Select a valid score system.";
  }

  if (!scoreValue) {
    errors.scoreValue = "Score value is required.";
  } else if (!/^\d{1,3}(\.\d{1,2})?$/.test(scoreValue)) {
    errors.scoreValue = "Enter a valid numeric score.";
  } else {
    const score = Number(scoreValue);

    const maxScore = {
      percentage: 100,
      cgpa_10: 10,
      gpa_4: 4,
    }[qualification.scoreSystem];

    if (!maxScore) {
      errors.scoreValue = "Select a valid score system first.";
    } else if (score < 0 || score > maxScore) {
      errors.scoreValue = `Score must be between 0 and ${maxScore}.`;
    }
  }

  if (
    graduationYear &&
    qualification.educationStatus === "completed" &&
    Number(graduationYear) > CURRENT_YEAR
  ) {
    errors.graduationYear =
      "Completed education cannot have a future graduation year.";
  }

  return errors;
}

/* -----------------------------------------
   Step 2 Validation
----------------------------------------- */

// oxlint-disable-next-line react/only-export-components
export function validateAcademicBackground(formData = {}) {
  const errors = {};

  const qualifications = Array.isArray(formData.qualifications)
    ? formData.qualifications
    : [];

  if (qualifications.length === 0) {
    errors.qualifications = [
      {
        highestQualification: "Add at least one qualification.",
      },
    ];
  } else {
    const qualificationErrors = qualifications.map(validateQualification);

    if (
      qualificationErrors.some(
        (qualificationError) => Object.keys(qualificationError).length > 0,
      )
    ) {
      errors.qualifications = qualificationErrors;
    }
  }

  if (!formData.noticePeriod) {
    errors.noticePeriod = "Select your notice period.";
  } else if (
    !NOTICE_PERIOD_OPTIONS.some(
      (option) => option.value === formData.noticePeriod,
    )
  ) {
    errors.noticePeriod = "Select a valid notice period.";
  }

  const technicalSkills = formData.technicalSkills?.trim() || "";

  if (!technicalSkills) {
    errors.technicalSkills = "Key technical skills are required.";
  } else if (technicalSkills.length < 2) {
    errors.technicalSkills = "Please enter your relevant skills.";
  } else if (technicalSkills.length > 500) {
    errors.technicalSkills = "Maximum 500 characters allowed.";
  }

  return errors;
}

/* -----------------------------------------
   Academic Background Component
----------------------------------------- */

export default function AcademicBackground({
  formData = {},
  onChange,
  errors = {},
  onQualificationsChange,
}) {
  const qualifications =
    Array.isArray(formData.qualifications) && formData.qualifications.length > 0
      ? formData.qualifications
      : [createEmptyQualification()];

  const canAddQualification = qualifications.length < MAX_QUALIFICATIONS;

  // Update a particular qualification field.
  function handleQualificationChange(index, fieldName) {
    return (event) => {
      const updatedQualifications = qualifications.map(
        (qualification, qualificationIndex) =>
          qualificationIndex === index
            ? {
                ...qualification,
                [fieldName]: event.target.value,
              }
            : qualification,
      );

      onQualificationsChange?.(updatedQualifications);
    };
  }

  // Add a new qualification.
  function handleAddQualification() {
    if (!canAddQualification) return;

    onQualificationsChange?.([...qualifications, createEmptyQualification()]);
  }

  // Remove an additional qualification.
  function handleRemoveQualification(index) {
    if (index === 0) return;

    const updatedQualifications = qualifications.filter(
      (_, qualificationIndex) => qualificationIndex !== index,
    );

    onQualificationsChange?.(updatedQualifications);
  }

  return (
    <section
      aria-labelledby="academic-background-heading"
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.035)] sm:p-6"
    >
      {/* Section Heading */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e5f5f3] text-teal-800">
          <GraduationIcon />
        </div>

        <div>
          <h2
            id="academic-background-heading"
            className="text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl"
          >
            Academic &amp; Professional Background
          </h2>

          <p className="mt-0.5 text-xs leading-5 text-slate-600 sm:text-sm">
            Tell us about your education, skills, and relevant experience.
          </p>
        </div>
      </div>

      {/* Qualification Entries */}
      <div className="space-y-6">
        {qualifications.map((qualification, index) => {
          const qualificationErrors = errors.qualifications?.[index] || {};

          return (
            <div key={index} className="relative">
              {/* Qualification Header */}
              <div className="mb-4 flex items-center justify-between gap-3 rounded-lg bg-[#eaf7f6] px-4 py-2.5">
                <h3 className="text-xs font-bold text-slate-900 sm:text-sm">
                  Qualification {index + 1}
                  {index === 0 ? " (Highest / Latest)" : ""}
                </h3>

                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveQualification(index)}
                    aria-label={`Remove qualification ${index + 1}`}
                    className="rounded px-2 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Qualification Fields */}
              <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                <FormSelect
                  label="Highest Qualification"
                  name={`qualifications.${index}.highestQualification`}
                  value={qualification.highestQualification || ""}
                  onChange={handleQualificationChange(
                    index,
                    "highestQualification",
                  )}
                  options={HIGHEST_QUALIFICATION_OPTIONS}
                  placeholder="Select qualification"
                  required
                  error={qualificationErrors.highestQualification}
                />

                <FormSelect
                  label="Degree / Qualification"
                  name={`qualifications.${index}.degree`}
                  value={qualification.degree || ""}
                  onChange={handleQualificationChange(index, "degree")}
                  options={DEGREE_OPTIONS}
                  placeholder="Select degree / qualification"
                  required
                  error={qualificationErrors.degree}
                />

                <FormField
                  label="Specialization / Major"
                  name={`qualifications.${index}.specialization`}
                  value={qualification.specialization || ""}
                  onChange={handleQualificationChange(index, "specialization")}
                  placeholder="e.g. Computer Science"
                  maxLength={100}
                  required
                  error={qualificationErrors.specialization}
                />

                <FormField
                  label="College / University"
                  name={`qualifications.${index}.college`}
                  value={qualification.college || ""}
                  onChange={handleQualificationChange(index, "college")}
                  placeholder="Enter your college / university"
                  maxLength={150}
                  required
                  error={qualificationErrors.college}
                />

                <FormSelect
                  label="Graduation Year"
                  name={`qualifications.${index}.graduationYear`}
                  value={qualification.graduationYear || ""}
                  onChange={handleQualificationChange(index, "graduationYear")}
                  options={GRADUATION_YEAR_OPTIONS}
                  placeholder="Select year"
                  required
                  error={qualificationErrors.graduationYear}
                />

                <FormSelect
                  label="Education Status"
                  name={`qualifications.${index}.educationStatus`}
                  value={qualification.educationStatus || ""}
                  onChange={handleQualificationChange(index, "educationStatus")}
                  options={EDUCATION_STATUS_OPTIONS}
                  placeholder="Select status"
                  required
                  error={qualificationErrors.educationStatus}
                />

                <FormSelect
                  label="Score System"
                  name={`qualifications.${index}.scoreSystem`}
                  value={qualification.scoreSystem || ""}
                  onChange={handleQualificationChange(index, "scoreSystem")}
                  options={SCORE_SYSTEM_OPTIONS}
                  placeholder="Select score system"
                  required
                  error={qualificationErrors.scoreSystem}
                />

                <FormField
                  label="Score Value"
                  name={`qualifications.${index}.scoreValue`}
                  type="text"
                  value={qualification.scoreValue || ""}
                  onChange={handleQualificationChange(index, "scoreValue")}
                  placeholder={
                    qualification.scoreSystem === "percentage"
                      ? "e.g. 85"
                      : "e.g. 8.4"
                  }
                  inputMode="decimal"
                  maxLength={6}
                  required
                  error={qualificationErrors.scoreValue}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Qualification */}
      <div className="mt-4 border-b border-slate-100 pb-5">
        <button
          type="button"
          disabled={!canAddQualification}
          onClick={handleAddQualification}
          className="inline-flex items-center gap-2 rounded-md text-sm font-bold text-teal-800 transition hover:text-teal-600 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
        >
          <span className="text-xl leading-none" aria-hidden="true">
            +
          </span>
          Add another qualification
        </button>

        <p className="mt-1 text-xs text-slate-500">
          You can add up to {MAX_QUALIFICATIONS} qualifications.
        </p>
      </div>

      {/* Professional Details */}
      <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        <FormSelect
          label="Notice Period"
          name="noticePeriod"
          value={formData.noticePeriod || ""}
          onChange={onChange}
          options={NOTICE_PERIOD_OPTIONS}
          placeholder="Select notice period"
          required
          error={errors.noticePeriod}
        />

        <FormField
          label="Key Technical Skills"
          name="technicalSkills"
          value={formData.technicalSkills || ""}
          onChange={onChange}
          placeholder="e.g. React, Node.js, Python..."
          helperText="Separate multiple skills using commas."
          maxLength={500}
          required
          error={errors.technicalSkills}
        />
      </div>
    </section>
  );
}
