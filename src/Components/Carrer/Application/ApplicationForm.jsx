import { useCallback, useEffect, useRef, useState } from "react";

import ApplicationHeader from "./ApplicationHeader";
import ApplicationStepper from "./ApplicationStepper";
import ApplicationSidebar from "./ApplicationSidebar";
import ApplicationActions from "./ApplicationActions";
import ApplicationConfirm from "./ApplicationConfirm";
import { APPLICATION_STEPS } from "./applicationSteps";

import BasicInformation from "./steps/BasicInformation";
import { validateBasicInformation } from "./steps/BasicInformation.validation";

import AcademicBackground from "./steps/AcademicBackground";
import {
  createEmptyQualification,
  validateAcademicBackground,
} from "./steps/AcademicBackground";

import LocationPresence from "./steps/LocationPresence";
import { validateLocationPresence } from "./steps/LocationPresence";

import ArchitecturalNarrative from "./steps/ArchitecturalNarrative";
import { validateArchitecturalNarrative } from "./steps/ArchitecturalNarrative";

import {
  loadApplicationDraft,
  saveApplicationDraft,
  deleteApplicationDraft,
  submitCareerApplication,
} from "../../../services/careerApplication.service";

/* -----------------------------------------
   Constants
----------------------------------------- */

const DRAFT_VERSION = 1;
const TOTAL_STEPS = APPLICATION_STEPS.length;
const AUTO_SAVE_DELAY = 800;

function createInitialFormData() {
  return {
    // Step 1: Basic Information
    fullName: "",
    email: "",
    phoneNumber: "",
    whatsappNumber: "",
    dateOfBirth: "",
    gender: "",

    // Step 2: Academic Background
    qualifications: [createEmptyQualification()],
    noticePeriod: "",
    technicalSkills: "",

    // Step 3: Location & Presence
    currentCity: "",
    permanentAddress: "",
    portfolioResumeLink: "",
    linkedInUrl: "",
    professionalProfiles: "",

    // Step 4: Architectural Narrative
    applicationStatement: "",
    acceptedTerms: false,
  };
}

/* -----------------------------------------
   Utility Functions
----------------------------------------- */

function normalizeRestoredFormData(savedData) {
  const initialData = createInitialFormData();

  if (!savedData || typeof savedData !== "object") {
    return initialData;
  }

  const qualifications = Array.isArray(savedData.qualifications)
    ? savedData.qualifications
        .slice(0, 5)
        .filter(
          (qualification) => qualification && typeof qualification === "object",
        )
        .map((qualification) => ({
          ...createEmptyQualification(),
          ...qualification,
        }))
    : [];

  return {
    ...initialData,
    ...savedData,
    qualifications:
      qualifications.length > 0 ? qualifications : initialData.qualifications,
    acceptedTerms: savedData.acceptedTerms === true,
  };
}

function normalizeStep(value) {
  if (!Number.isInteger(value)) return 0;

  return Math.min(Math.max(value, 0), TOTAL_STEPS - 1);
}

function normalizeCompletedSteps(value, currentStep) {
  if (!Array.isArray(value)) return [];

  return [
    ...new Set(
      value.filter(
        (step) => Number.isInteger(step) && step >= 0 && step < currentStep,
      ),
    ),
  ].sort((a, b) => a - b);
}

function getSubmissionError(error) {
  if (typeof error?.userMessage === "string" && error.userMessage.trim()) {
    return error.userMessage;
  }

  return "We couldn't submit your application. Please check your connection and try again.";
}

/* -----------------------------------------
   Step Validation
----------------------------------------- */

const STEP_VALIDATORS = [
  validateBasicInformation,
  validateAcademicBackground,
  validateLocationPresence,
  validateArchitecturalNarrative,
];

function validateAllSteps(formData) {
  const results = STEP_VALIDATORS.map((validator) => validator(formData));

  return {
    results,
    firstInvalidStep: results.findIndex(
      (result) => Object.keys(result).length > 0,
    ),
  };
}

/* -----------------------------------------
   Main Application Form
----------------------------------------- */

export default function ApplicationForm({
  jobId,
  jobTitle = "Selected Position",
  onApplicationSuccess,
  presentation = "page",
  onClose,
  onBusyChange,
}) {
  const isDrawer = presentation === "drawer";

  const draftJobId = jobId?.trim() || "unspecified-role";

  /* ---------------------------------------
     Central Form State
  --------------------------------------- */

  const [formData, setFormData] = useState(createInitialFormData);

  const [currentStep, setCurrentStep] = useState(0);

  const [completedSteps, setCompletedSteps] = useState([]);

  const [errors, setErrors] = useState({});

  /* ---------------------------------------
     Draft State
  --------------------------------------- */

  const [isDraftReady, setIsDraftReady] = useState(false);

  const [isDirty, setIsDirty] = useState(false);

  const [saveStatus, setSaveStatus] = useState("idle");

  const [draftRestored, setDraftRestored] = useState(false);

  const [draftLoadError, setDraftLoadError] = useState(false);

  /* ---------------------------------------
     Submission State
  --------------------------------------- */

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [submissionResult, setSubmissionResult] = useState(null);

  /* ---------------------------------------
     Refs
  --------------------------------------- */

  const saveLockRef = useRef(false);

  const submissionLockRef = useRef(false);

  const revisionRef = useRef(0);

  const draftSnapshotRef = useRef(null);

  /* ---------------------------------------
     Latest Draft Snapshot
  --------------------------------------- */

  // Keep imperative draft data in sync after React commits. Mutating a ref
  // during render can leak an uncommitted render into a saved draft.
  useEffect(() => {
    draftSnapshotRef.current = {
      version: DRAFT_VERSION,
      jobId: draftJobId,
      jobTitle,
      formData,
      currentStep,
      completedSteps,
      updatedAt: new Date().toISOString(),
    };
  }, [draftJobId, jobTitle, formData, currentStep, completedSteps]);

  /* ---------------------------------------
     Notify Parent About Busy State
  --------------------------------------- */

  useEffect(() => {
    onBusyChange?.(isSubmitting);
  }, [isSubmitting, onBusyChange]);

  /* ---------------------------------------
     Mark Form Changes
  --------------------------------------- */

  const markDirty = useCallback(() => {
    revisionRef.current += 1;

    setIsDirty(true);
    setSaveStatus("idle");
  }, []);

  /* ---------------------------------------
     Restore Application Draft
  --------------------------------------- */

  useEffect(() => {
    let active = true;

    async function restoreDraft() {
      setIsDraftReady(false);
      setIsDirty(false);
      setDraftRestored(false);
      setDraftLoadError(false);
      setSaveStatus("idle");

      setFormData(createInitialFormData());
      setCurrentStep(0);
      setCompletedSteps([]);
      setErrors({});

      revisionRef.current = 0;

      try {
        const savedDraft = await loadApplicationDraft(draftJobId);

        if (!active) return;

        if (
          savedDraft &&
          savedDraft.version === DRAFT_VERSION &&
          savedDraft.formData
        ) {
          const restoredData = normalizeRestoredFormData(savedDraft.formData);

          setFormData(restoredData);

          const restoredStep = normalizeStep(savedDraft.currentStep);

          setCurrentStep(restoredStep);

          setCompletedSteps(
            normalizeCompletedSteps(savedDraft.completedSteps, restoredStep),
          );

          setDraftRestored(true);
        }
      } catch {
        if (active) {
          setDraftLoadError(true);
        }
      } finally {
        if (active) {
          setIsDraftReady(true);
        }
      }
    }

    restoreDraft();

    return () => {
      active = false;
    };
  }, [draftJobId]);

  /* ---------------------------------------
     Save Application Draft
  --------------------------------------- */

  const handleSaveDraft = useCallback(async () => {
    if (!isDraftReady || isSubmitted || saveLockRef.current) {
      return;
    }

    saveLockRef.current = true;

    const currentRevision = revisionRef.current;

    const latestSnapshot = draftSnapshotRef.current;

    if (!latestSnapshot) {
      saveLockRef.current = false;
      return;
    }

    const snapshot = {
      ...latestSnapshot,

      formData: {
        ...latestSnapshot.formData,

        qualifications: latestSnapshot.formData.qualifications.map(
          (qualification) => ({ ...qualification }),
        ),
      },

      completedSteps: [...latestSnapshot.completedSteps],
    };

    setSaveStatus("saving");

    try {
      await saveApplicationDraft(draftJobId, snapshot);

      if (revisionRef.current === currentRevision) {
        setIsDirty(false);
        setSaveStatus("saved");
      } else {
        setIsDirty(true);
        setSaveStatus("idle");
      }
    } catch {
      setSaveStatus("error");
    } finally {
      saveLockRef.current = false;
    }
  }, [draftJobId, isDraftReady, isSubmitted]);

  /* ---------------------------------------
     Automatic Draft Saving
  --------------------------------------- */

  useEffect(() => {
    if (
      !isDraftReady ||
      !isDirty ||
      isSubmitted ||
      saveStatus === "saving" ||
      saveStatus === "error"
    ) {
      return;
    }

    const timer = setTimeout(() => {
      handleSaveDraft();
    }, AUTO_SAVE_DELAY);

    return () => clearTimeout(timer);
  }, [
    formData,
    currentStep,
    completedSteps,
    isDraftReady,
    isDirty,
    isSubmitted,
    saveStatus,
    handleSaveDraft,
  ]);

  /* ---------------------------------------
     Standard Field Change Handler
  --------------------------------------- */

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    const fieldValue = type === "checkbox" ? checked : value;

    markDirty();

    setFormData((previous) => ({
      ...previous,
      [name]: fieldValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));

    // Previously completed steps must be revalidated
    // when their information changes.
    setCompletedSteps((previous) =>
      previous.filter((step) => step < currentStep),
    );
  }

  /* ---------------------------------------
     Dynamic Qualification Handler
  --------------------------------------- */

  function handleQualificationsChange(qualifications) {
    markDirty();

    setFormData((previous) => ({
      ...previous,
      qualifications,
    }));

    setErrors((previous) => ({
      ...previous,
      qualifications: undefined,
    }));

    setCompletedSteps((previous) =>
      previous.filter((step) => step < currentStep),
    );
  }

  /* ---------------------------------------
     Next Step
  --------------------------------------- */

  function handleNext() {
    if (currentStep >= TOTAL_STEPS - 1 || isSubmitting || !isDraftReady) {
      return;
    }

    const stepErrors = STEP_VALIDATORS[currentStep](formData);

    setErrors(stepErrors);

    if (Object.keys(stepErrors).length > 0) {
      return;
    }

    markDirty();

    setCompletedSteps((previous) =>
      [...new Set([...previous, currentStep])].sort((a, b) => a - b),
    );

    setErrors({});

    setCurrentStep((previous) => previous + 1);
  }

  /* ---------------------------------------
     Previous Step
  --------------------------------------- */

  function handlePrevious() {
    if (currentStep <= 0 || isSubmitting || !isDraftReady) {
      return;
    }

    markDirty();

    setCurrentStep((previous) => previous - 1);

    setErrors({});
  }

  /* ---------------------------------------
     Direct Step Navigation
  --------------------------------------- */

  function handleStepChange(stepIndex) {
    const isValidIndex =
      Number.isInteger(stepIndex) && stepIndex >= 0 && stepIndex < TOTAL_STEPS;

    const isAccessible = isValidIndex && stepIndex < currentStep;

    if (!isAccessible || isSubmitting || !isDraftReady) {
      return;
    }

    setCurrentStep(stepIndex);
    setErrors({});

    markDirty();
  }

  /* ---------------------------------------
     Request Final Submission
  --------------------------------------- */

  function handleRequestSubmit() {
    if (isSubmitting || isSubmitted || !isDraftReady) {
      return;
    }

    const { results, firstInvalidStep } = validateAllSteps(formData);

    if (firstInvalidStep !== -1) {
      setCurrentStep(firstInvalidStep);

      setErrors(results[firstInvalidStep]);

      setCompletedSteps(
        Array.from({ length: firstInvalidStep }, (_, index) => index),
      );

      markDirty();

      return;
    }

    setCompletedSteps([0, 1, 2, 3]);

    setErrors({});

    setSubmitError(null);

    markDirty();

    setConfirmOpen(true);
  }

  /* ---------------------------------------
     Confirm & Submit Application
  --------------------------------------- */

  async function handleConfirmSubmit() {
    if (submissionLockRef.current || isSubmitting || isSubmitted) {
      return;
    }

    // Run validation again before calling the API.
    const { results, firstInvalidStep } = validateAllSteps(formData);

    if (firstInvalidStep !== -1) {
      setConfirmOpen(false);
      setCurrentStep(firstInvalidStep);
      setErrors(results[firstInvalidStep]);
      setCompletedSteps(
        Array.from({ length: firstInvalidStep }, (_, index) => index),
      );
      return;
    }

    submissionLockRef.current = true;

    setIsSubmitting(true);

    setSubmitError(null);

    try {
      const result = await submitCareerApplication({
        jobId: draftJobId,
        jobTitle,
        applicant: formData,
      });

      setSubmissionResult(result || null);

      setIsSubmitted(true);

      setConfirmOpen(false);

      // The server accepted the application.
      // Draft cleanup is a separate operation.
      try {
        await deleteApplicationDraft(draftJobId);
      } catch {
        // Do not reverse a successful application
        // because local draft cleanup failed.
      }

      onApplicationSuccess?.(result);
    } catch (error) {
      setSubmitError(getSubmissionError(error));
    } finally {
      submissionLockRef.current = false;
      setIsSubmitting(false);
    }
  }

  /* ---------------------------------------
     Successful Submission Screen
  --------------------------------------- */

  if (isSubmitted) {
    return (
      <div
        className={`flex min-h-[60vh] items-center justify-center bg-[#f7fbfb] px-5 py-12 sm:px-8 ${
          isDrawer ? "w-full" : ""
        }`}
      >
        <div className="w-full max-w-xl rounded-3xl border border-teal-100 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-9 w-9"
              aria-hidden="true"
            >
              <path
                d="m5 12 4 4L19 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-950">
            Application Submitted!
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Your application for{" "}
            <strong className="text-slate-900">{jobTitle}</strong> has been
            successfully submitted.
          </p>

          {submissionResult?.applicationId && (
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Application Reference</p>

              <p className="mt-1 font-bold text-teal-800">
                {submissionResult.applicationId}
              </p>
            </div>
          )}

          <p className="mt-5 text-xs leading-6 text-slate-500">
            Thank you for your interest in Cynbit. Keep an eye on your email for
            further communication.
          </p>

          {isDrawer ? (
            <button
              type="button"
              onClick={onClose}
              className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-800 px-7 py-3 text-sm font-bold text-white transition hover:bg-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              Close Application
            </button>
          ) : (
            <a
              href="/careers"
              className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-800 px-7 py-3 text-sm font-bold text-white transition hover:bg-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              Back to Careers
            </a>
          )}
        </div>
      </div>
    );
  }

  /* ---------------------------------------
     Current Step Renderer
  --------------------------------------- */

  function renderCurrentStep() {
    switch (currentStep) {
      case 0:
        return (
          <BasicInformation
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );

      case 1:
        return (
          <AcademicBackground
            formData={formData}
            onChange={handleChange}
            errors={errors}
            onQualificationsChange={handleQualificationsChange}
          />
        );

      case 2:
        return (
          <LocationPresence
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );

      case 3:
        return (
          <ArchitecturalNarrative
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );

      default:
        return null;
    }
  }

  /* ---------------------------------------
     Main Application UI
  --------------------------------------- */

  return (
    <div className="w-full bg-[#f7fbfb]">
      {/* Full-page header only.
          Drawer already has its own header. */}
      {!isDrawer && (
        <ApplicationHeader jobTitle={jobTitle} currentStep={currentStep} />
      )}

      {/* Main Content */}
      <div
        className={
          isDrawer
            ? "w-full px-4 py-6 sm:px-6 lg:px-7"
            : "mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10"
        }
      >
        {/* Draft Restored Message */}
        {draftRestored && isDraftReady && (
          <div
            role="status"
            className="mb-5 flex items-start gap-3 rounded-xl border border-teal-100 bg-teal-50 px-4 py-3"
          >
            <span className="mt-0.5 text-teal-700" aria-hidden="true">
              ✓
            </span>

            <div>
              <p className="text-sm font-bold text-teal-900">
                Previous draft restored
              </p>

              <p className="mt-0.5 text-xs leading-5 text-teal-800">
                Your saved information has been restored. Continue where you
                left off.
              </p>
            </div>
          </div>
        )}

        {/* Draft Loading Error */}
        {draftLoadError && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3"
          >
            <p className="text-sm font-semibold text-amber-900">
              We couldn't restore your previous draft.
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-800">
              You can continue filling in the form. Please save your progress
              again.
            </p>
          </div>
        )}

        {/* Mobile Stepper */}
        <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-4 lg:hidden">
          <ApplicationStepper
            currentStep={currentStep}
            onStepChange={handleStepChange}
          />

          <p className="mt-4 text-center text-xs font-semibold text-teal-800">
            Step {currentStep + 1} of {TOTAL_STEPS}:{" "}
            {APPLICATION_STEPS[currentStep].title}
          </p>
        </div>

        {/* Form and Sidebar Layout */}
        <div
          className={`grid grid-cols-1 items-start gap-7 ${
            isDrawer
              ? "lg:grid-cols-[minmax(0,1fr)_260px]"
              : "lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_350px]"
          }`}
        >
          {/* Form Column */}
          <div className="min-w-0">
            {!isDraftReady ? (
              <div
                role="status"
                className="flex min-h-80 items-center justify-center rounded-2xl border border-slate-200 bg-white"
              >
                <div className="text-center">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-teal-700 border-t-transparent" />

                  <p className="mt-4 text-sm font-semibold text-slate-700">
                    Restoring your application...
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Active Form Step */}
                {renderCurrentStep()}

                {/* Form Actions */}
                <ApplicationActions
                  currentStep={currentStep}
                  onSaveDraft={handleSaveDraft}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onSubmit={handleRequestSubmit}
                  saveStatus={saveStatus}
                  isSubmitting={isSubmitting}
                />

                {/* Autosave Notice */}
                <p className="mt-4 text-center text-[11px] leading-5 text-slate-500">
                  Your draft is saved on this device while you complete the
                  application. Do not use a public or shared device.
                </p>
              </>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:sticky lg:top-5 lg:block">
            <ApplicationSidebar
              currentStep={currentStep}
              onStepChange={handleStepChange}
              completedSteps={completedSteps}
            />
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ApplicationConfirm
        open={confirmOpen}
        jobTitle={jobTitle}
        applicantName={formData.fullName}
        applicantEmail={formData.email}
        onConfirm={handleConfirmSubmit}
        onCancel={() => {
          if (isSubmitting) return;

          setConfirmOpen(false);
        }}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </div>
  );
}
