function SaveIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
      <path d="M17 21v-8H7v8M7 3v5h8" />
    </svg>
  );
}

function ArrowIcon({ direction = "right" }) {
  const path =
    direction === "left" ? "M19 12H5m7-7-7 7 7 7" : "M5 12h14m-7-7 7 7-7 7";

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 animate-spin"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function ApplicationActions({
  currentStep = 0,
  onSaveDraft,
  onPrevious,
  onNext,
  onSubmit,
  saveStatus = "idle",
  isSubmitting = false,
  isNavigating = false,
}) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === 3;

  const isSaving = saveStatus === "saving";
  const isSaved = saveStatus === "saved";
  const hasSaveError = saveStatus === "error";

  const actionsDisabled = isSubmitting || isNavigating;

  const saveDisabled = isSaving || actionsDisabled || !onSaveDraft;

  const isLastActionDisabled =
    actionsDisabled || (isLastStep ? !onSubmit : !onNext);

  function handleSaveDraft() {
    if (saveDisabled) return;

    onSaveDraft?.();
  }

  function handleNext() {
    if (isLastActionDisabled || isLastStep) return;

    onNext?.();
  }

  function handlePrevious() {
    if (actionsDisabled || isFirstStep || !onPrevious) return;

    onPrevious();
  }

  function handleSubmit() {
    if (isLastActionDisabled || !isLastStep) return;

    // Parent handles validation and confirmation.
    onSubmit?.();
  }

  return (
    <div className="mt-5 border-t border-slate-100 pt-4">
      <div className="flex flex-col-reverse items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        {/* Save Draft */}
        <div className="flex flex-col items-start gap-1">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={saveDisabled}
            aria-label={
              isSaving
                ? "Saving draft"
                : isSaved
                  ? "Draft saved"
                  : "Save application draft"
            }
            className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm font-bold text-teal-800 transition-colors hover:bg-teal-50 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? <Spinner /> : isSaved ? <CheckIcon /> : <SaveIcon />}

            {isSaving ? "Saving..." : isSaved ? "Draft Saved" : "Save Draft"}
          </button>

          {hasSaveError && (
            <p role="alert" className="px-2 text-xs font-medium text-red-600">
              Could not save draft. Please try again.
            </p>
          )}

          {isSaved && (
            <p role="status" className="px-2 text-[11px] text-slate-500">
              Your progress has been saved.
            </p>
          )}
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          {/* Previous */}
          {!isFirstStep && (
            <button
              type="button"
              onClick={handlePrevious}
              disabled={actionsDisabled || !onPrevious}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-600 hover:bg-teal-50 hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowIcon direction="left" />
              Previous
            </button>
          )}

          {/* Next */}
          {!isLastStep && (
            <button
              type="button"
              onClick={handleNext}
              disabled={isLastActionDisabled}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-800 to-teal-700 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isNavigating ? (
                <>
                  <Spinner />
                  Processing...
                </>
              ) : (
                <>
                  Next
                  <ArrowIcon />
                </>
              )}
            </button>
          )}

          {/* Final Submit */}
          {isLastStep && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLastActionDisabled}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-800 to-teal-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5"
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application Blueprint
                  <ArrowIcon />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
